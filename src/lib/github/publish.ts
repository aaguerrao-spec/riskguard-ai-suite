import type { MenuData, PendingUpload } from "@/lib/menu/types";

const REPO = "aaguerrao-spec/aaguerrao-spec.github.io";
const BRANCH = "main";

interface GitHubFileResponse {
  sha?: string;
}

async function getFileSha(path: string, token: string): Promise<string | undefined> {
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
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
  const sha = await getFileSha(path, token);
  const response = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: btoa(unescape(encodeURIComponent(content))),
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error al publicar ${path}: ${error}`);
  }
}

export async function publishMenuToGitHub(
  menu: MenuData,
  uploads: PendingUpload[],
  token: string
) {
  const payload: MenuData = {
    ...menu,
    updatedAt: new Date().toISOString(),
  };

  await upsertFile(
    "data/menu.json",
    JSON.stringify(payload, null, 2),
    "Actualizar menú dinámico",
    token
  );

  for (const upload of uploads) {
    await upsertFile(
      `tools/${upload.fileName}`,
      upload.content,
      `Subir herramienta ${upload.fileName}`,
      token
    );
  }
}

export function downloadDeployBundle(menu: MenuData, uploads: PendingUpload[]) {
  const payload: MenuData = {
    ...menu,
    updatedAt: new Date().toISOString(),
  };

  const menuBlob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  triggerDownload(menuBlob, "menu.json");

  uploads.forEach((upload) => {
    const blob = new Blob([upload.content], { type: "text/html" });
    triggerDownload(blob, upload.fileName);
  });
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}
