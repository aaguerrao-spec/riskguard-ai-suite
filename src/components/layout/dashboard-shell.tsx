import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";

interface DashboardShellProps {
  children: React.ReactNode;
  breadcrumb?: string[];
}

export function DashboardShell({
  children,
  breadcrumb = ["Dashboard", "General"],
}: DashboardShellProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#02050b]">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar segments={breadcrumb} />
        <main className="flex-1 overflow-y-auto bg-[#02050b]">{children}</main>
      </div>
    </div>
  );
}
