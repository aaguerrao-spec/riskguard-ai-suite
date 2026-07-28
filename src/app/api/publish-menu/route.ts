import { getGitHubToken } from "@/lib/site-config";
import { publishMenuOnServer } from "@/lib/github/publish-server";
import type { MenuData, PendingUpload } from "@/lib/menu/types";

/** Serverless: requiere GITHUB_TOKEN, GITHUB_REPO y GITHUB_BRANCH en Vercel. */
export const runtime = "nodejs";

interface PublishBody {
  menu: MenuData;
  uploads?: PendingUpload[];
}

export async function POST(request: Request) {
  const token = getGitHubToken();
  if (!token) {
    return Response.json(
      {
        error:
          "GITHUB_TOKEN no configurado en Vercel. Anade la variable en Project → Settings → Environment Variables.",
      },
      { status: 501 }
    );
  }

  let body: PublishBody;
  try {
    body = (await request.json()) as PublishBody;
  } catch {
    return Response.json({ error: "JSON invalido." }, { status: 400 });
  }

  if (!body.menu?.items?.length) {
    return Response.json({ error: "Menu invalido." }, { status: 400 });
  }

  try {
    await publishMenuOnServer(body.menu, body.uploads ?? [], token);
    return Response.json({
      ok: true,
      message:
        "Menu publicado en GitHub. Vercel redeployara automaticamente si el repo esta conectado.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al publicar.";
    return Response.json({ error: message }, { status: 500 });
  }
}
