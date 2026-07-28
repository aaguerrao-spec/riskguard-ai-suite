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
    id: "riskguard",
    title: "RiskGuard AI",
    description:
      "Identificador y calificador de riesgos para asegurar entregas y mitigar eventos.",
    href: "/riskguard",
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
    iconBg: "bg-[#1a160a]",
    iconColor: "text-[#d4b63a]",
  },
  violet: {
    iconBg: "bg-[#14101f]",
    iconColor: "text-[#a78bfa]",
  },
  blue: {
    iconBg: "bg-[#101325]",
    iconColor: "text-[#818cf8]",
  },
  teal: {
    iconBg: "bg-[#0a1716]",
    iconColor: "text-[#2dd4bf]",
  },
  pink: {
    iconBg: "bg-[#1a0e16]",
    iconColor: "text-[#ec4899]",
  },
  cyan: {
    iconBg: "bg-[#0a161a]",
    iconColor: "text-[#22d3ee]",
  },
  linkedin: {
    iconBg: "bg-[#0a1420]",
    iconColor: "text-[#3b9eff]",
  },
};
