import fs from "node:fs";
import vm from "node:vm";

const code = fs.readFileSync("public/js/process-engine.js", "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code.replace("(window)", "(window)"), sandbox);

const sample = `Validacion
30 min
4 h
Control interno
No valor agregado
Recepcion
15 min
10 min
Operaciones
Valor agregado`;

const steps = sandbox.window.ProcessEngine.parseProcessSteps(sample, "test.txt");
console.log(JSON.stringify(steps, null, 2));
