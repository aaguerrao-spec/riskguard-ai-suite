import { getGitHubBranch, getGitHubRepo } from "@/lib/site-config";
import type { MenuData, PendingUpload } from "@/lib/menu/types";

interface GitHubFileResponse {
  sha?: string;
}

async function getFileSha(path: string, token: string): Promise<string | undefined> {
  const repo = getGitHubRepo();
  const branch = getGitHubBranch();
  const response = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(`GitHub no pudo leer ${path}.`);
  }

  const data = (await response.json()) as GitHubFileResponse;
  return data.sha;
}

async function upsertFile(
  path: string,
  content: string,
  message: string,
  token: string
) {
  const repo = getGitHubRepo();
  const branch = getGitHubBranch();
  const sha = await getFileSha(path, token);
  const response = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content, "utf8").toString("base64"),
        branch,
        ...(sha ? { sha } : {}),
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error al publicar ${path}: ${error}`);
  }
}

export async function publishMenuOnServer(
  menu: MenuData,
  uploads: PendingUpload[],
  token: string
) {
  const payload: MenuData = {
    ...menu,
    updatedAt: new Date().toISOString(),
  };

  await upsertFile(
    "public/data/menu.json",
    JSON.stringify(payload, null, 2),
    "Actualizar menu dinamico",
    token
  );

  for (const upload of uploads) {
    await upsertFile(
      `public/tools/${upload.fileName}`,
      upload.content,
      `Subir herramienta ${upload.fileName}`,
      token
    );
  }
}
