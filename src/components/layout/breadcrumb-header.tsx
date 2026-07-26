import { ChevronRight } from "lucide-react";

interface BreadcrumbHeaderProps {
  segments: string[];
}

export function BreadcrumbHeader({ segments }: BreadcrumbHeaderProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1">
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;

        return (
          <span key={segment} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight
                className="h-[10px] w-[10px] text-[#3f4f66]"
                strokeWidth={1.5}
              />
            )}
            <span
              className={
                isLast
                  ? "text-[11px] font-medium text-[#8a9bb2]"
                  : "text-[11px] font-normal text-[#556780]"
              }
            >
              {segment}
            </span>
          </span>
        );
      })}
    </nav>
  );
}
