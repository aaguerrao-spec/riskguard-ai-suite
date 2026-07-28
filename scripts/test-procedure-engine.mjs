import fs from "node:fs";
import vm from "node:vm";

const code = fs.readFileSync("public/js/procedure-engine.js", "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const proc = sandbox.window.ProcedureEngine.buildProcedure({
  nombre: "Gestion de incidentes",
  responsable: "Oficial de cumplimiento",
  objetivo: "Registrar y tratar incidentes.",
  alcance: "Todas las areas.",
  entradas: "Reporte, evidencia",
  salidas: "Incidente cerrado",
  pasos: "1. Recibir reporte\n2. Validar informacion\n3. Cerrar incidente",
});

console.log("errors", sandbox.window.ProcedureEngine.validateProcedure(proc));
console.log("pasos", proc.pasos.length);
console.log("flow", sandbox.window.ProcedureEngine.buildFlowNodes(proc).length);
