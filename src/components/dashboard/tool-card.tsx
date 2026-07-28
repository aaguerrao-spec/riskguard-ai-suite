"use client";

import Link from "next/link";
import { sitePath } from "@/lib/site-path";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentStyles, menuIconMap } from "@/lib/menu/icons";
import type { MenuItem } from "@/lib/menu/types";

interface ToolCardProps {
  tool: MenuItem;
}

export function ToolCard({ tool }: ToolCardProps) {
  const accent = accentStyles[tool.accent];
  const Icon = menuIconMap[tool.icon] ?? menuIconMap.FileText;
  const resolvedHref = (() => {
    if (tool.href.startsWith("http") || tool.href === "#") return tool.href;
    const clean = tool.href.replace(/^\.\//, "");
    return sitePath(clean);
  })();
  const isToolFile =
    tool.href.includes("/tools/") || tool.href.startsWith("tools/");
  const useAnchor =
    tool.href.startsWith("http") ||
    tool.href.endsWith(".html") ||
    tool.href.startsWith("./") ||
    isToolFile ||
    tool.href.startsWith("/dashboard");

  const cardContent = (
    <>
      <div
        className={cn(
          "mb-[11px] flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[6px]",
          accent.iconBg
        )}
      >
        <Icon className={cn("h-[13px] w-[13px]", accent.iconColor)} strokeWidth={1.55} />
      </div>

      <h3 className="mb-[5px] text-[14px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#f2f5fa]">
        {tool.title}
      </h3>

      <p className="line-clamp-2 text-[11.5px] leading-[1.45] text-[#4f6078]">
        {tool.description}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-white/[0.035] pt-[10px]">
        <span className="text-[9.5px] font-medium tracking-[0.16em] text-[#6a7b93]">
          ACCEDER
        </span>
        <ArrowRight
          className="h-[11px] w-[11px] text-[#445568] transition-[color,transform] duration-200 group-hover:translate-x-[0.5px] group-hover:text-[#5a6b82]"
          strokeWidth={1.25}
        />
      </div>
    </>
  );

  const className = cn(
    "group flex h-[178px] flex-col rounded-[14px] border border-white/[0.035]",
    "bg-[#080f1a] px-[15px] pb-[11px] pt-[14px]",
    "shadow-none transition-[border-color,background-color] duration-200 ease-out",
    "hover:border-white/[0.055] hover:bg-[#09111d]",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400/25"
  );

  if (useAnchor) {
    return (
      <a
        href={resolvedHref}
        className={className}
        {...(tool.href.startsWith("http") || isToolFile
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={resolvedHref} className={className}>
      {cardContent}
    </Link>
  );
}
