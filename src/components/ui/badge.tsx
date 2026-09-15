import { cn } from "@/lib/utils";
import type { AuditionStatus } from "@/lib/os-types";

const STATUS: Record<AuditionStatus, string> = {
  New: "bg-accent/12 text-accent",
  Preparing: "bg-accent/12 text-accent",
  Confirmed: "bg-ok/15 text-ok",
  Submitted: "bg-ok/15 text-ok",
  Callback: "bg-warn/15 text-warn",
  Booked: "bg-ok/20 text-ok",
  Closed: "bg-muted text-muted-fg",
};

export function StatusBadge({ status }: { status: AuditionStatus }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 font-mono text-2xs tracking-wide",
        STATUS[status],
      )}
    >
      {status}
    </span>
  );
}
