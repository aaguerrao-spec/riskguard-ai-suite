export type ToolAccent =
  | "yellow"
  | "violet"
  | "blue"
  | "teal"
  | "pink"
  | "cyan"
  | "linkedin";

export type MenuIconName =
  | "Workflow"
  | "GitBranch"
  | "FileText"
  | "ScanSearch"
  | "FolderKanban"
  | "ShieldAlert"
  | "CircleUserRound"
  | "LayoutGrid"
  | "Upload";

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: MenuIconName;
  accent: ToolAccent;
  published: boolean;
  sourceFile?: string;
}

export interface MenuData {
  version: number;
  updatedAt: string;
  items: MenuItem[];
}

export interface PendingUpload {
  fileName: string;
  content: string;
}
