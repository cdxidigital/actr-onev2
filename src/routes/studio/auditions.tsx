import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useEntitlements } from "@/components/account-provider";
import { AuditionFormDialog } from "@/components/audition-form";
import { EmptyState, PageHead } from "@/components/page-head";
import { LimitToastCopy } from "@/components/plan-gate";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AUDITION_STATUSES, type Audition, type AuditionStatus } from "@/lib/os-types";
import { useOsStore } from "@/lib/os-store";
import { cn, formatDate } from "@/lib/utils";

export const Route = createFileRoute("/studio/auditions")({
  component: AuditionsPage,
});

const FILTERS = ["All", ...AUDITION_STATUSES] as const;

function AuditionsPage() {
  const auditions = useOsStore((s) => s.auditions);
  const { canAddAudition } = useEntitlements();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [edit, setEdit] = useState<Audition | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const items = useMemo(
    () =>
      auditions
        .filter((a) => filter === "All" || a.status === filter)
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date)),
    [auditions, filter],
  );

  return (
    <div className="grid gap-5">
      <PageHead
        kicker="Pipeline"
        title="Auditions"
        description="Every opportunity, one board. Status changes write themselves into health and analytics."
        action={
          <Button
            onClick={() => {
              if (!canAddAudition) {
                toast.message(LimitToastCopy("audition"));
                void navigate({ to: "/pricing", search: { highlight: "studio" } });
                return;
              }
              setAddOpen(true);
            }}
          >
            Add audition
          </Button>
        }
      />
      <div className="-mx-1 flex gap-1 overflow-x-auto pb-1">
        {FILTERS.map((s) => (
          <button
            key={s}
            type="button"
            className={cn(
              "h-10 shrink-0 rounded-full px-3 text-sm",
              filter === s ? "bg-fg text-bg" : "text-muted-fg hover:bg-muted hover:text-fg",
            )}
            onClick={() => setFilter(s)}
          >
            {s}
            {s !== "All" ? (
              <span className="ml-1.5 font-mono text-xs opacity-70">
                {auditions.filter((a) => a.status === (s as AuditionStatus)).length}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <div className="grid gap-2">
        {items.map((a) => (
          <button
            key={a.id}
            type="button"
            className="flex min-h-16 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left shadow-soft hover:border-accent/40"
            onClick={() => setEdit(a)}
          >
            <span className="min-w-0 flex-1">
              <span className="block font-medium">{a.title}</span>
              <span className="text-sm text-muted-fg">
                {a.role} · {a.type} · {formatDate(a.date)} {a.time}
              </span>
            </span>
            <StatusBadge status={a.status} />
          </button>
        ))}
        {items.length === 0 ? (
          <EmptyState>
            {filter === "All"
              ? "No auditions yet. Add one to start the board."
              : `Nothing in ${filter}. Try another filter or add a role.`}
          </EmptyState>
        ) : null}
      </div>
      <AuditionFormDialog open={addOpen} onOpenChange={setAddOpen} />
      <AuditionFormDialog
        open={Boolean(edit)}
        onOpenChange={(o) => !o && setEdit(null)}
        initial={edit}
      />
    </div>
  );
}
