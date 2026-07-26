"use client";

import { useEffect, useState } from "react";
import { Upload, Trash2, Plus, Save, CloudUpload, Download } from "lucide-react";
import { useMenu } from "@/hooks/use-menu";
import {
  clearDraft,
  fetchMenu,
  saveDraft,
} from "@/lib/menu/load-menu";
import { downloadDeployBundle, publishMenuToGitHub } from "@/lib/github/publish";
import type { MenuItem, MenuIconName, PendingUpload, ToolAccent } from "@/lib/menu/types";

const ICONS: MenuIconName[] = [
  "Workflow",
  "GitBranch",
  "FileText",
  "ScanSearch",
  "FolderKanban",
  "ShieldAlert",
  "CircleUserRound",
  "LayoutGrid",
  "Upload",
];

const ACCENTS: ToolAccent[] = [
  "yellow",
  "violet",
  "blue",
  "teal",
  "pink",
  "cyan",
  "linkedin",
];

const TOKEN_KEY = "riskguard-github-token";

const emptyItem = (): MenuItem => ({
  id: crypto.randomUUID(),
  title: "Nueva herramienta",
  description: "Descripción breve de la herramienta.",
  href: "#",
  icon: "FileText",
  accent: "blue",
  published: true,
});

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\.html$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminPage() {
  const { menu, setMenu, loading, reload } = useMenu();
  const [uploads, setUploads] = useState<PendingUpload[]>([]);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (saved) setToken(saved);
  }, []);

  const updateItem = (id: string, patch: Partial<MenuItem>) => {
    if (!menu) return;
    setMenu({
      ...menu,
      items: menu.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  };

  const removeItem = (id: string) => {
    if (!menu) return;
    setMenu({ ...menu, items: menu.items.filter((item) => item.id !== id) });
  };

  const addItem = () => {
    if (!menu) return;
    setMenu({ ...menu, items: [...menu.items, emptyItem()] });
  };

  const handleHtmlUpload = async (files: FileList | null) => {
    if (!files?.length || !menu) return;

    const nextUploads = [...uploads];
    const nextItems = [...menu.items];

    for (const file of Array.from(files)) {
      if (!file.name.toLowerCase().endsWith(".html")) continue;
      const content = await file.text();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const slug = slugify(safeName);

      nextUploads.push({ fileName: safeName, content });
      nextItems.unshift({
        id: slug,
        title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description: `Herramienta publicada desde ${safeName}.`,
        href: `/tools/${safeName}`,
        icon: "Upload",
        accent: "teal",
        published: true,
        sourceFile: safeName,
      });
    }

    setUploads(nextUploads);
    setMenu({ ...menu, items: nextItems });
    setStatus(`${files.length} archivo(s) HTML preparados para publicación.`);
  };

  const saveLocalDraft = () => {
    if (!menu) return;
    saveDraft(menu);
    setStatus("Borrador guardado en esta sesión. Recarga /general para previsualizar.");
  };

  const resetMenu = async () => {
    clearDraft();
    setUploads([]);
    await reload();
    setStatus("Menú restaurado desde el servidor.");
  };

  const exportBundle = () => {
    if (!menu) return;
    downloadDeployBundle(menu, uploads);
    setStatus("Descargados menu.json y archivos HTML. Copia menu.json a public/data/ y los HTML a public/tools/, luego ejecuta npm run deploy.");
  };

  const publishOnline = async () => {
    if (!menu || !token.trim()) {
      setStatus("Necesitas un token de GitHub con permiso repo.");
      return;
    }

    setBusy(true);
    setStatus("Publicando en GitHub Pages...");
    try {
      sessionStorage.setItem(TOKEN_KEY, token.trim());
      await publishMenuToGitHub(menu, uploads, token.trim());
      clearDraft();
      setUploads([]);
      setStatus("Publicado. El menú se actualizará en https://aaguerrao-spec.github.io/ en unos segundos.");
      await reload();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Error al publicar.");
    } finally {
      setBusy(false);
    }
  };

  if (loading || !menu) {
    return (
      <div className="px-6 pb-10 pt-7 md:px-8">
        <p className="text-[12px] text-[#5a6b84]">Cargando panel de administración...</p>
      </div>
    );
  }

  return (
    <div className="px-6 pb-10 pt-7 md:px-8">
      <header className="mb-7">
        <h1 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.035em] text-[#f4f7fc]">
          Administración del menú
        </h1>
        <p className="mt-[6px] max-w-3xl text-[11.5px] leading-normal text-[#4f6078]">
          Sube archivos HTML, edita el menú y publícalo en{" "}
          <a
            href="https://aaguerrao-spec.github.io/"
            className="text-[#8fa0b8] underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            https://aaguerrao-spec.github.io/
          </a>
          . Ya no necesitas abrir el dashboard como archivo local (<code className="text-[#6e8098]">file:///</code>).
        </p>
      </header>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[14px] border border-dashed border-cyan-500/25 bg-[#080f1a] p-5">
          <div className="mb-3 flex items-center gap-2 text-[#22d3ee]">
            <Upload className="h-4 w-4" />
            <h2 className="text-[14px] font-semibold text-[#f2f5fa]">Subir herramientas HTML</h2>
          </div>
          <p className="mb-4 text-[11.5px] leading-relaxed text-[#4f6078]">
            Arrastra uno o varios archivos <strong>.html</strong>. Se agregarán al menú con enlace público en{" "}
            <code className="text-[#6e8098]">/tools/nombre.html</code>.
          </p>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[12px] border border-white/[0.06] bg-[#050a12] px-4 py-8 text-center transition hover:border-cyan-500/30">
            <input
              type="file"
              accept=".html,text/html"
              multiple
              className="hidden"
              onChange={(event) => void handleHtmlUpload(event.target.files)}
            />
            <Upload className="mb-2 h-5 w-5 text-[#4a5b70]" />
            <span className="text-[12px] font-medium text-[#8fa0b8]">
              Seleccionar o soltar archivos HTML
            </span>
          </label>
          {uploads.length > 0 && (
            <ul className="mt-4 space-y-2 text-[11px] text-[#6a7b93]">
              {uploads.map((file) => (
                <li key={file.fileName} className="rounded-[8px] bg-white/[0.02] px-3 py-2">
                  {file.fileName}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-[14px] border border-white/[0.035] bg-[#080f1a] p-5">
          <h2 className="mb-3 text-[14px] font-semibold text-[#f2f5fa]">Publicación HTTPS</h2>
          <p className="mb-4 text-[11.5px] leading-relaxed text-[#4f6078]">
            Para publicar sin usar terminal, pega un{" "}
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noreferrer"
              className="text-[#8fa0b8] underline-offset-2 hover:underline"
            >
              Personal Access Token
            </a>{" "}
            con permiso <code className="text-[#6e8098]">repo</code>.
          </p>
          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="ghp_..."
            className="mb-4 w-full rounded-[10px] border border-white/[0.06] bg-[#050a12] px-3 py-2 text-[12px] text-[#dce3ef] outline-none focus:border-violet-400/30"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={saveLocalDraft}
              className="inline-flex items-center gap-2 rounded-[10px] border border-white/[0.08] bg-[#050a12] px-3 py-2 text-[11px] text-[#8fa0b8] hover:bg-white/[0.03]"
            >
              <Save className="h-3.5 w-3.5" />
              Guardar borrador
            </button>
            <button
              type="button"
              onClick={exportBundle}
              className="inline-flex items-center gap-2 rounded-[10px] border border-white/[0.08] bg-[#050a12] px-3 py-2 text-[11px] text-[#8fa0b8] hover:bg-white/[0.03]"
            >
              <Download className="h-3.5 w-3.5" />
              Descargar paquete
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void publishOnline()}
              className="inline-flex items-center gap-2 rounded-[10px] bg-violet-500/20 px-3 py-2 text-[11px] font-medium text-[#c4b5fd] hover:bg-violet-500/30 disabled:opacity-50"
            >
              <CloudUpload className="h-3.5 w-3.5" />
              Publicar en GitHub Pages
            </button>
          </div>
        </section>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[14px] font-semibold text-[#f2f5fa]">Entradas del menú</h2>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded-[10px] border border-white/[0.08] px-3 py-2 text-[11px] text-[#8fa0b8] hover:bg-white/[0.03]"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar entrada
        </button>
      </div>

      <div className="space-y-4">
        {menu.items.map((item) => (
          <article
            key={item.id}
            className="rounded-[14px] border border-white/[0.035] bg-[#080f1a] p-4"
          >
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block text-[11px] text-[#6a7b93]">
                Título
                <input
                  value={item.title}
                  onChange={(event) => updateItem(item.id, { title: event.target.value })}
                  className="mt-1 w-full rounded-[10px] border border-white/[0.06] bg-[#050a12] px-3 py-2 text-[12px] text-[#dce3ef]"
                />
              </label>
              <label className="block text-[11px] text-[#6a7b93]">
                Enlace
                <input
                  value={item.href}
                  onChange={(event) => updateItem(item.id, { href: event.target.value })}
                  className="mt-1 w-full rounded-[10px] border border-white/[0.06] bg-[#050a12] px-3 py-2 text-[12px] text-[#dce3ef]"
                />
              </label>
              <label className="block text-[11px] text-[#6a7b93] md:col-span-2">
                Descripción
                <textarea
                  value={item.description}
                  onChange={(event) =>
                    updateItem(item.id, { description: event.target.value })
                  }
                  rows={2}
                  className="mt-1 w-full rounded-[10px] border border-white/[0.06] bg-[#050a12] px-3 py-2 text-[12px] text-[#dce3ef]"
                />
              </label>
              <label className="block text-[11px] text-[#6a7b93]">
                Icono
                <select
                  value={item.icon}
                  onChange={(event) =>
                    updateItem(item.id, { icon: event.target.value as MenuIconName })
                  }
                  className="mt-1 w-full rounded-[10px] border border-white/[0.06] bg-[#050a12] px-3 py-2 text-[12px] text-[#dce3ef]"
                >
                  {ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-[11px] text-[#6a7b93]">
                Acento
                <select
                  value={item.accent}
                  onChange={(event) =>
                    updateItem(item.id, { accent: event.target.value as ToolAccent })
                  }
                  className="mt-1 w-full rounded-[10px] border border-white/[0.06] bg-[#050a12] px-3 py-2 text-[12px] text-[#dce3ef]"
                >
                  {ACCENTS.map((accent) => (
                    <option key={accent} value={accent}>
                      {accent}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <label className="flex items-center gap-2 text-[11px] text-[#8fa0b8]">
                <input
                  type="checkbox"
                  checked={item.published}
                  onChange={(event) =>
                    updateItem(item.id, { published: event.target.checked })
                  }
                />
                Visible en el menú público
              </label>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="inline-flex items-center gap-1 text-[11px] text-[#c97586] hover:text-[#e08a9a]"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void resetMenu()}
          className="text-[11px] text-[#6a7b93] underline-offset-2 hover:underline"
        >
          Restaurar menú del servidor
        </button>
        <button
          type="button"
          onClick={() => void fetchMenu().then(setMenu)}
          className="text-[11px] text-[#6a7b93] underline-offset-2 hover:underline"
        >
          Recargar menú
        </button>
      </div>

      {status && (
        <p className="mt-4 rounded-[10px] border border-white/[0.06] bg-[#050a12] px-4 py-3 text-[11.5px] leading-relaxed text-[#8fa0b8]">
          {status}
        </p>
      )}
    </div>
  );
}
