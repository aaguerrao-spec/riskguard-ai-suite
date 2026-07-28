import {
  CircleUserRound,
  FileText,
  FolderKanban,
  GitBranch,
  LayoutGrid,
  ScanSearch,
  ShieldAlert,
  Upload,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { MenuIconName } from "@/lib/menu/types";

export const menuIconMap: Record<MenuIconName, LucideIcon> = {
  Workflow,
  GitBranch,
  FileText,
  ScanSearch,
  FolderKanban,
  ShieldAlert,
  CircleUserRound,
  LayoutGrid,
  Upload,
};

export const accentStyles = {
  yellow: { iconBg: "bg-[#1a160a]", iconColor: "text-[#d4b63a]" },
  violet: { iconBg: "bg-[#14101f]", iconColor: "text-[#a78bfa]" },
  blue: { iconBg: "bg-[#101325]", iconColor: "text-[#818cf8]" },
  teal: { iconBg: "bg-[#0a1716]", iconColor: "text-[#2dd4bf]" },
  pink: { iconBg: "bg-[#1a0e16]", iconColor: "text-[#ec4899]" },
  cyan: { iconBg: "bg-[#0a161a]", iconColor: "text-[#22d3ee]" },
  linkedin: { iconBg: "bg-[#0a1420]", iconColor: "text-[#3b9eff]" },
} as const;
