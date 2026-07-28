import type { MenuData } from "@/lib/menu/types";
import { siteUrl } from "@/lib/site-path";

function menuUrl() {
  return siteUrl("data/menu.json");
}
const DRAFT_KEY = "riskguard-menu-draft";

export async function fetchMenu(): Promise<MenuData> {
  const draft = readDraft();
  if (draft) return draft;

  const response = await fetch(`${menuUrl()}?t=${Date.now()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudo cargar el menú.");
  }

  return response.json() as Promise<MenuData>;
}

export function readDraft(): MenuData | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MenuData;
  } catch {
    return null;
  }
}

export function saveDraft(menu: MenuData) {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(menu));
}

export function clearDraft() {
  sessionStorage.removeItem(DRAFT_KEY);
}

export function publishedItems(menu: MenuData) {
  return menu.items.filter((item) => item.published);
}
