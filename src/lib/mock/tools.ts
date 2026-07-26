import type { LucideIcon } from "lucide-react";
import {
  Workflow,
  GitBranch,
  FileText,
  ScanSearch,
  FolderKanban,
  ShieldAlert,
  CircleUserRound,
} from "lucide-react";

export type ToolAccent =
  | "yellow"
  | "violet"
  | "blue"
  | "teal"
  | "pink"
  | "cyan"
  | "linkedin";

export interface Tool {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: ToolAccent;
}

export const tools: Tool[] = [
  {
    id: "diagramador",
    title: "Diagramador de procesos",
    description:
      "Convierte descripciones o notas de voz en diagramas BPMN listos para usar.",
    href: "#",
    icon: Workflow,
    accent: "yellow",
  },
  {
    id: "vsm",
    title: "Mapeo de Flujo de Valor",
    description:
      "Analiza tus procesos y genera diagramas VSM estableciendo tiempos y variables.",
    href: "#",
    icon: GitBranch,
    accent: "violet",
  },
  {
    id: "procedimientos",
    title: "Generador de Procedimientos",
    description:
      "Suite completa interactiva para transformación Lean, matriz de priorización y más.",
    href: "#",
    icon: FileText,
    accent: "blue",
  },
  {
    id: "gap-analyzer",
    title: "BPM Gap Analyzer",
    description:
      "Analiza e identifica brechas en diagramas proporcionados y extrae métricas.",
    href: "#",
    icon: ScanSearch,
    accent: "teal",
  },
  {
    id: "project-ai",
    title: "Project AI",
    description:
      "Arquitecto de proyectos. Genera alcance preliminar, stack tecnológico y dependencias.",
    href: "#",
    icon: FolderKanban,
    accent: "pink",
  },
  {
    id: "riskguard-ai",
    title: "RiskGuard AI",
    description:
      "Identificador y calificador de riesgos para asegurar entregas y mitigar eventos.",
    href: "#",
    icon: ShieldAlert,
    accent: "cyan",
  },
  {
    id: "linkedin-360",
    title: "LinkedIn 360",
    description:
      "Auditoría integral de perfil profesional con generación de tácticas y mejoras SEO.",
    href: "#",
    icon: CircleUserRound,
    accent: "linkedin",
  },
];

export const accentStyles: Record<
  ToolAccent,
  { iconBg: string; iconColor: string }
> = {
  yellow: {
    iconBg: "bg-[#221c0c]",
    iconColor: "text-[#e8c547]",
  },
  violet: {
    iconBg: "bg-[#18122a]",
    iconColor: "text-[#b794f6]",
  },
  blue: {
    iconBg: "bg-[#12162a]",
    iconColor: "text-[#8b9cf7]",
  },
  teal: {
    iconBg: "bg-[#0c1e1c]",
    iconColor: "text-[#3dceb4]",
  },
  pink: {
    iconBg: "bg-[#22101c]",
    iconColor: "text-[#f072b6]",
  },
  cyan: {
    iconBg: "bg-[#0b1c20]",
    iconColor: "text-[#3ec9d6]",
  },
  linkedin: {
    iconBg: "bg-[#0c1728]",
    iconColor: "text-[#4d9feb]",
  },
};
