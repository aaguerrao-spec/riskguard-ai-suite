import { BreadcrumbHeader } from "@/components/layout/breadcrumb-header";

interface AppTopbarProps {
  segments?: string[];
}

export function AppTopbar({
  segments = ["Dashboard", "General"],
}: AppTopbarProps) {
  return (
    <header className="flex h-[34px] shrink-0 items-center justify-between border-b border-white/[0.035] bg-[#02050b] px-6 md:px-8">
      <BreadcrumbHeader segments={segments} />

      <div className="flex items-center gap-[7px]">
        <span className="inline-flex h-[18px] items-center rounded-full border border-violet-400/18 bg-violet-500/[0.09] px-[9px] text-[9.5px] font-medium tracking-[0.01em] text-[#c4b5fd]">
          235 Tokens
        </span>
        <span className="inline-flex h-[18px] items-center rounded-full border border-white/[0.055] bg-white/[0.02] px-[7px] text-[9.5px] font-medium text-[#6e8098]">
          Hub
        </span>
        <div className="ml-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white/[0.06] bg-[#0a1220] text-[9.5px] font-medium text-[#a8b6c9]">
          A
        </div>
      </div>
    </header>
  );
}
