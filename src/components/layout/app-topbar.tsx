"use client";

import { usePathname } from "next/navigation";
import { BreadcrumbHeader } from "@/components/layout/breadcrumb-header";

const breadcrumbsByPath: Record<string, string[]> = {
  "/general": ["Dashboard", "General"],
  "/riskguard": ["Dashboard", "RiskGuard AI"],
  "/admin": ["Dashboard", "Administración"],
};

interface AppTopbarProps {
  segments?: string[];
}

export function AppTopbar({ segments }: AppTopbarProps) {
  const pathname = usePathname();
  const resolved =
    segments ?? breadcrumbsByPath[pathname] ?? ["Dashboard", "General"];

  return (
    <header className="flex h-[34px] shrink-0 items-center justify-between border-b border-white/[0.035] bg-[#02050b] px-6 md:px-8">
      <BreadcrumbHeader segments={resolved} />

      <div className="flex items-center gap-[7px]">
        <span className="inline-flex h-[18px] items-center rounded-full border border-white/[0.055] bg-white/[0.02] px-[7px] text-[9.5px] font-medium text-[#6e8098]">
          Hub
        </span>
      </div>
    </header>
  );
}
