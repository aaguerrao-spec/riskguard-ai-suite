import { ShieldAlert } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function RiskGuardPage() {
  return (
    <DashboardShell breadcrumb={["Dashboard", "RiskGuard AI"]}>
      <div className="px-6 pb-10 pt-7 md:px-8">
        <header className="mb-7">
          <div className="mb-3 flex h-[28px] w-[28px] items-center justify-center rounded-[6px] bg-[#0a161a]">
            <ShieldAlert className="h-[13px] w-[13px] text-[#22d3ee]" strokeWidth={1.55} />
          </div>
          <h1 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.035em] text-[#f4f7fc]">
            RiskGuard AI
          </h1>
          <p className="mt-[6px] max-w-xl text-[11.5px] leading-normal text-[#4f6078]">
            Identificador y calificador de riesgos para asegurar entregas y
            mitigar eventos.
          </p>
        </header>

        <div className="rounded-[14px] border border-white/[0.035] bg-[#080f1a] px-5 py-8">
          <p className="text-[12px] leading-relaxed text-[#5a6b84]">
            Módulo listo para conectar. Desde aquí podrás registrar, evaluar y
            priorizar riesgos del portafolio con apoyo de IA.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
