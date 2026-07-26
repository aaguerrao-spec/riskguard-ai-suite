import fs from "node:fs";
import vm from "node:vm";

const code = fs.readFileSync("public/js/vsm-engine.js", "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const { VsmEngine } = sandbox.window;

const stages = VsmEngine.parseStages(VsmEngine.DEFAULT_STAGES);
const metrics = VsmEngine.calculateMetrics(stages);
const bottleneck = VsmEngine.detectBottleneck(stages);

console.log("stages", stages.length);
console.log("leadTime", metrics.leadTimeLabel);
console.log("va", metrics.valueAddedLabel, metrics.valueAddedPctLabel);
console.log("bottleneck", bottleneck.label);
