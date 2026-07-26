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
  { label: "RiskGuard AI", href: "/riskguard", icon: ShieldAlert },
] as const;

const adminNav = {
  label: "Admin Panel",
  href: "#",
  icon: Shield,
} as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-full w-[228px] shrink-0 flex-col border-r border-white/[0.028] bg-[#050a12] md:flex">
      <div className="px-5 pb-0 pt-6">
        <Link href="/general" className="flex items-center gap-[9px]">
          <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-violet-500/[0.11]">
            <ShieldAlert className="h-[11px] w-[11px] text-violet-300/85" strokeWidth={1.65} />
          </div>
          <div className="leading-[1.1]">
            <p className="text-[11.5px] font-semibold tracking-[-0.01em] text-[#dce3ef]">
              RiskGuard
            </p>
            <p className="text-[9px] font-medium tracking-[0.06em] text-[#445368]">
              AI Suite
            </p>
          </div>
        </Link>
      </div>

      <nav className="mt-7 flex flex-1 flex-col px-2.5">
        <ul className="space-y-[2px]">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const active = item.href !== "#" && pathname.startsWith(item.href);

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[8px] px-[10px] py-[8px] text-[12px] leading-none transition-colors duration-150",
                    active
                      ? "bg-violet-500/[0.14] font-medium text-[#c4b5fd]"
                      : "font-normal text-[#5c6d84] hover:bg-white/[0.015] hover:text-[#7a8ba3]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[13px] w-[13px] shrink-0",
                      active ? "text-[#c4b5fd]" : "text-[#4a5b70]"
                    )}
                    strokeWidth={1.5}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pb-3.5 pt-6">
          <div className="mb-3 h-px bg-white/[0.035]" />
          <Link
            href={adminNav.href}
            className="flex items-center gap-2.5 rounded-[8px] px-[10px] py-[8px] text-[12px] font-normal leading-none text-[#b85f72] transition-colors duration-150 hover:bg-rose-500/[0.04] hover:text-[#c97586]"
          >
            <adminNav.icon
              className="h-[13px] w-[13px] shrink-0 text-[#a34f61]"
              strokeWidth={1.5}
            />
            <span>{adminNav.label}</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
