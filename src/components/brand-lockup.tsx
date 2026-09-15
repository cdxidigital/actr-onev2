import { cn } from "@/lib/utils";
import {
  BRAND_LOCKUP_D,
  BRAND_LOCKUP_PERIOD,
  BRAND_LOCKUP_VIEWBOX,
} from "@/components/brand-lockup-path";

export function BrandLockup({
  className,
  alt = "",
  size = "header",
}: {
  className?: string;
  alt?: string;
  size?: "header" | "sidebar" | "compact" | "footer";
}) {
  const labelled = Boolean(alt);
  return (
    <svg
      viewBox={BRAND_LOCKUP_VIEWBOX}
      data-size={size}
      className={cn("brand-lockup", className)}
      role={labelled ? "img" : undefined}
      aria-label={labelled ? alt : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      <path fill="currentColor" fillRule="evenodd" d={BRAND_LOCKUP_D} />
      <circle
        cx={BRAND_LOCKUP_PERIOD.cx}
        cy={BRAND_LOCKUP_PERIOD.cy}
        r={BRAND_LOCKUP_PERIOD.r}
        className="brand-lockup-period"
      />
    </svg>
  );
}
