import { ChevronRight } from "lucide-react";

interface BreadcrumbHeaderProps {
  segments: string[];
}

export function BreadcrumbHeader({ segments }: BreadcrumbHeaderProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-[3px]">
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;

        return (
          <span key={segment} className="flex items-center gap-[3px]">
            {index > 0 && (
              <ChevronRight
                className="h-[9px] w-[9px] text-[#364657]"
                strokeWidth={1.5}
              />
            )}
            <span
              className={
                isLast
                  ? "text-[10.5px] font-medium text-[#7d8fa6]"
                  : "text-[10.5px] font-normal text-[#4a5b70]"
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
