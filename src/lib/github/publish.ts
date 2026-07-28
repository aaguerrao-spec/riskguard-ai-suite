import type { MenuData, PendingUpload } from "@/lib/menu/types";
import { getGitHubBranch } from "@/lib/site-config";

const LEGACY_REPO = "aaguerrao-spec/aaguerrao-spec.github.io";

interface GitHubFileResponse {
  sha?: string;
}

async function getFileSha(path: string, token: string, repo = LEGACY_REPO): Promise<string | undefined> {
  const branch = getGitHubBranch();
  const response = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`,
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
  token: string,
  repo = LEGACY_REPO
) {
  const branch = getGitHubBranch();
  const sha = await getFileSha(path, token, repo);
  const response = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
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

export async function publishMenuViaApi(menu: MenuData, uploads: PendingUpload[]) {
  const response = await fetch("/api/publish-menu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ menu, uploads }),
  });

  const data = (await response.json()) as { ok?: boolean; error?: string; message?: string };

  if (response.status === 501) {
    return { mode: "fallback" as const };
  }

  if (!response.ok) {
    throw new Error(data.error || "Error al publicar via API.");
  }

  return { mode: "api" as const, message: data.message || "Publicado." };
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
