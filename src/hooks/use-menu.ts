"use client";

import { useEffect, useState } from "react";
import type { MenuData } from "@/lib/menu/types";
import { fetchMenu } from "@/lib/menu/load-menu";

export function useMenu() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMenu();
      setMenu(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar el menú.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  return { menu, error, loading, reload, setMenu };
}
