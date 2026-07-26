"use client";

import { ToolCard } from "@/components/dashboard/tool-card";
import { useMenu } from "@/hooks/use-menu";
import { publishedItems } from "@/lib/menu/load-menu";

export function ToolsGrid() {
  const { menu, loading, error } = useMenu();

  if (loading) {
    return (
      <div className="rounded-[14px] border border-white/[0.035] bg-[#080f1a] px-5 py-8 text-[12px] text-[#5a6b84]">
        Cargando menú de herramientas...
      </div>
    );
  }

  if (error || !menu) {
    return (
      <div className="rounded-[14px] border border-rose-500/20 bg-[#080f1a] px-5 py-8 text-[12px] text-[#c97586]">
        {error ?? "No se pudo cargar el menú."}
      </div>
    );
  }

  const items = publishedItems(menu);

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-[22px] xl:gap-y-[22px]">
      {items.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
