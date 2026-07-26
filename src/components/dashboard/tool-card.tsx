import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentStyles, type Tool } from "@/lib/mock/tools";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const accent = accentStyles[tool.accent];
  const Icon = tool.icon;

  return (
    <Link
      href={tool.href}
      className={cn(
        "group flex h-[188px] flex-col rounded-[12px] border border-white/[0.04]",
        "bg-[#0a1220] px-4 pb-3 pt-[15px]",
        "transition-[border-color,background-color] duration-150 ease-out",
        "hover:border-white/[0.065] hover:bg-[#0b1424]",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400/30"
      )}
    >
      <div
        className={cn(
          "mb-3 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[7px]",
          accent.iconBg
        )}
      >
        <Icon className={cn("h-[14px] w-[14px]", accent.iconColor)} strokeWidth={1.65} />
      </div>

      <h3 className="mb-1 text-[14.5px] font-semibold leading-snug tracking-[-0.015em] text-[#f0f3f9]">
        {tool.title}
      </h3>

      <p className="line-clamp-2 text-[12px] leading-[1.4] text-[#5a6b84]">
        {tool.description}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-white/[0.04] pt-2.5">
        <span className="text-[10px] font-medium tracking-[0.14em] text-[#7a8ba3]">
          ACCEDER
        </span>
        <ArrowRight
          className="h-[12px] w-[12px] text-[#4f5f76] transition-[color,transform] duration-150 group-hover:translate-x-[1px] group-hover:text-[#64768e]"
          strokeWidth={1.4}
        />
      </div>
    </Link>
  );
}
