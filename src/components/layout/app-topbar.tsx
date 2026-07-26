import { BreadcrumbHeader } from "@/components/layout/breadcrumb-header";

interface AppTopbarProps {
  segments?: string[];
}

export function AppTopbar({
  segments = ["Dashboard", "General"],
}: AppTopbarProps) {
  return (
    <header className="flex h-[38px] shrink-0 items-center justify-between border-b border-white/[0.045] bg-[#04070f] px-6 md:px-8">
      <BreadcrumbHeader segments={segments} />

      <div className="flex items-center gap-2">
        <span className="inline-flex h-[20px] items-center rounded-full border border-violet-400/20 bg-violet-500/[0.10] px-2 text-[10px] font-medium tracking-[0.01em] text-[#c4b5fd]">
          235 Tokens
        </span>
        <span className="inline-flex h-[20px] items-center rounded-full border border-white/[0.07] bg-white/[0.025] px-1.5 text-[10px] font-medium text-[#7d8ea6]">
          Hub
        </span>
        <div className="ml-0.5 flex h-[24px] w-[24px] items-center justify-center rounded-full border border-white/[0.07] bg-[#0e1626] text-[10px] font-medium text-[#b8c4d6]">
          A
        </div>
      </div>
    </header>
  );
}
