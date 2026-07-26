import { ToolsGrid } from "@/components/dashboard/tools-grid";

export default function GeneralPage() {
  return (
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

      <ToolsGrid />
    </div>
  );
}
