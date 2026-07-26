"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Workflow,
  GitBranch,
  FileText,
  ScanSearch,
  FolderKanban,
  ShieldAlert,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "General", href: "/general", icon: LayoutGrid },
  { label: "Diagramador de procesos", href: "#", icon: Workflow },
  { label: "Mapeo de Flujo de Valor", href: "#", icon: GitBranch },
  { label: "Generador de Procedimientos", href: "#", icon: FileText },
  { label: "BPM Gap Analyzer", href: "#", icon: ScanSearch },
  { label: "Project AI", href: "#", icon: FolderKanban },
  { label: "RiskGuard AI", href: "#", icon: ShieldAlert },
] as const;

const adminNav = {
  label: "Admin Panel",
  href: "#",
  icon: Shield,
} as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-full w-[224px] shrink-0 flex-col border-r border-white/[0.035] bg-[#070c16] md:flex">
      <div className="px-[18px] pb-1 pt-[22px]">
        <Link href="/general" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-violet-500/12">
            <ShieldAlert className="h-3 w-3 text-violet-300/90" strokeWidth={1.7} />
          </div>
          <div className="leading-[1.15]">
            <p className="text-[12px] font-semibold tracking-[-0.01em] text-[#e4eaf4]">
              RiskGuard
            </p>
            <p className="text-[9.5px] font-medium tracking-[0.05em] text-[#4f5f76]">
              AI Suite
            </p>
          </div>
        </Link>
      </div>

      <nav className="mt-6 flex flex-1 flex-col px-2.5">
        <ul className="space-y-[3px]">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const active = item.href !== "#" && pathname.startsWith(item.href);

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[7px] px-2.5 py-[7px] text-[12px] leading-none transition-colors",
                    active
                      ? "bg-violet-500/[0.13] font-medium text-[#c4b5fd]"
                      : "font-normal text-[#657890] hover:bg-white/[0.02] hover:text-[#8496ae]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[14px] w-[14px] shrink-0",
                      active ? "text-[#c4b5fd]" : "text-[#536478]"
                    )}
                    strokeWidth={1.55}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pb-4 pt-8">
          <div className="mb-3.5 h-px bg-white/[0.045]" />
          <Link
            href={adminNav.href}
            className="flex items-center gap-2.5 rounded-[7px] px-2.5 py-[7px] text-[12px] font-normal leading-none text-[#c96d7f] transition-colors hover:bg-rose-500/[0.05] hover:text-[#d88494]"
          >
            <adminNav.icon
              className="h-[14px] w-[14px] shrink-0 text-[#b85a6e]"
              strokeWidth={1.55}
            />
            <span>{adminNav.label}</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
