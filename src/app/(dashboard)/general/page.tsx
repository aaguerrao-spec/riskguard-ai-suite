import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ToolCard } from "@/components/dashboard/tool-card";
import { tools } from "@/lib/mock/tools";

export default function GeneralPage() {
  return (
    <DashboardShell breadcrumb={["Dashboard", "General"]}>
      <div className="px-6 pb-10 pt-7 md:px-8">
        <header className="mb-7">
          <h1 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.035em] text-[#f4f7fc]">
            Menú de Herramientas
          </h1>
          <p className="mt-[6px] text-[11.5px] leading-normal text-[#4f6078]">
            Bienvenido de nuevo,{" "}
            <span className="font-semibold text-[#8fa0b8]">
              ana.alejandra@email.com
            </span>
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-[22px] xl:gap-y-[22px]">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
