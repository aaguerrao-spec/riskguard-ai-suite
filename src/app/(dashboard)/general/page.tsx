import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ToolCard } from "@/components/dashboard/tool-card";
import { tools } from "@/lib/mock/tools";

export default function GeneralPage() {
  return (
    <DashboardShell breadcrumb={["Dashboard", "General"]}>
      <div className="px-6 pb-8 pt-6 md:px-8">
        <header className="mb-6">
          <h1 className="text-[24px] font-semibold leading-tight tracking-[-0.03em] text-[#f3f6fb]">
            Menú de Herramientas
          </h1>
          <p className="mt-1 text-[12px] leading-normal text-[#5a6b84]">
            Bienvenido de nuevo,{" "}
            <span className="font-semibold text-[#9aabc2]">
              ana.alejandra@email.com
            </span>
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
