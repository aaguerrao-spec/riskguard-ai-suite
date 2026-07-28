"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Shield, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMenu } from "@/hooks/use-menu";
import { menuIconMap } from "@/lib/menu/icons";
import { publishedItems } from "@/lib/menu/load-menu";

export function AppSidebar() {
  const pathname = usePathname();
  const { menu } = useMenu();
  const items = menu ? publishedItems(menu) : [];

  const navItems = items.filter(
    (item) =>
      item.href.startsWith("/") &&
      !item.href.startsWith("/tools/") &&
      item.href !== "#"
  );

  return (
    <aside className="hidden h-full w-[228px] shrink-0 flex-col border-r border-white/[0.028] bg-[#050a12] md:flex">
      <div className="px-5 pb-0 pt-6">
        <Link href="/general" className="flex items-center gap-[9px]">
          <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-violet-500/[0.11]">
            <ShieldAlert className="h-[11px] w-[11px] text-violet-300/85" strokeWidth={1.65} />
          </div>
          <div className="leading-[1.1]">
            <p className="text-[11.5px] font-semibold tracking-[-0.01em] text-[#dce3ef]">
              RiskGuard
            </p>
            <p className="text-[9px] font-medium tracking-[0.06em] text-[#445368]">
              AI Suite
            </p>
          </div>
        </Link>
      </div>

      <nav className="mt-7 flex flex-1 flex-col px-2.5">
        <ul className="space-y-[2px]">
          <li>
            <Link
              href="/general"
              className={cn(
                "flex items-center gap-2.5 rounded-[8px] px-[10px] py-[8px] text-[12px] leading-none transition-colors duration-150",
                pathname === "/general"
                  ? "bg-violet-500/[0.14] font-medium text-[#c4b5fd]"
                  : "font-normal text-[#5c6d84] hover:bg-white/[0.015] hover:text-[#7a8ba3]"
              )}
            >
              <LayoutGrid
                className={cn(
                  "h-[13px] w-[13px] shrink-0",
                  pathname === "/general" ? "text-[#c4b5fd]" : "text-[#4a5b70]"
                )}
                strokeWidth={1.5}
              />
              <span className="truncate">General</span>
            </Link>
          </li>

          {navItems.map((item) => {
            const Icon = menuIconMap[item.icon] ?? ShieldAlert;
            const active = pathname.startsWith(item.href);

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[8px] px-[10px] py-[8px] text-[12px] leading-none transition-colors duration-150",
                    active
                      ? "bg-violet-500/[0.14] font-medium text-[#c4b5fd]"
                      : "font-normal text-[#5c6d84] hover:bg-white/[0.015] hover:text-[#7a8ba3]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[13px] w-[13px] shrink-0",
                      active ? "text-[#c4b5fd]" : "text-[#4a5b70]"
                    )}
                    strokeWidth={1.5}
                  />
                  <span className="truncate">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pb-3.5 pt-6">
          <div className="mb-3 h-px bg-white/[0.035]" />
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-2.5 rounded-[8px] px-[10px] py-[8px] text-[12px] font-normal leading-none transition-colors duration-150",
              pathname.startsWith("/admin")
                ? "bg-rose-500/[0.08] text-[#c97586]"
                : "text-[#b85f72] hover:bg-rose-500/[0.04] hover:text-[#c97586]"
            )}
          >
            <Shield
              className="h-[13px] w-[13px] shrink-0 text-[#a34f61]"
              strokeWidth={1.5}
            />
            <span>Admin Panel</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
