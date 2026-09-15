import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LayoutGrid } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useEntitlements } from "@/components/account-provider";
import { AuditionFormDialog } from "@/components/audition-form";
import { DashboardBoard } from "@/components/dashboard-board";
import { Button } from "@/components/ui/button";
import { isEmptyBoard, useOsStore } from "@/lib/os-store";
import type { Audition } from "@/lib/os-types";
import { firstName, greeting } from "@/lib/utils";

export const Route = createFileRoute("/studio/")({
  component: Overview,
});

function Overview() {
  const name = useOsStore((s) => s.profile.name);
  const auditions = useOsStore((s) => s.auditions);
  const tapes = useOsStore((s) => s.tapes);
  const notes = useOsStore((s) => s.notes);
  const training = useOsStore((s) => s.training);
  const empty = isEmptyBoard({ auditions, tapes, notes, training });
  const resetDashboard = useOsStore((s) => s.resetDashboard);
  const { canArrange } = useEntitlements();
  const navigate = useNavigate();
  const [edit, setEdit] = useState<Audition | null>(null);
  const [arranging, setArranging] = useState(false);

  return (
    <div className="grid gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Command center
          </p>
          <h1 className="font-display mt-2 text-4xl tracking-tight md:text-5xl">
            {greeting()}, {firstName(name)}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-fg">
            {arranging
              ? "Drag the grip, or use the arrows. Hide what you don't need — the layout stays on this device."
              : empty
                ? "Your desk is empty. Add a role, log a session, or write a note — the run starts with one honest move."
                : "Three honest moves will keep the instrument ahead of the industry."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {arranging ? (
            <Button type="button" variant="ghost" size="sm" onClick={() => resetDashboard()}>
              Reset layout
            </Button>
          ) : null}
          <Button
            type="button"
            variant={arranging ? "default" : "outline"}
            size="sm"
            aria-pressed={arranging}
            onClick={() => {
              if (!canArrange) {
                toast.message("Modular command center is a Studio feature.");
                void navigate({ to: "/pricing", search: { highlight: "studio" } });
                return;
              }
              setArranging((v) => !v);
            }}
          >
            <LayoutGrid className="size-3.5" />
            {arranging ? "Done" : "Arrange"}
          </Button>
        </div>
      </header>
      {empty ? (
        <aside className="rounded-xl border border-dashed border-border bg-card px-4 py-3 text-sm shadow-soft">
          <p className="font-medium">Nothing on the board yet. That's correct for a new desk.</p>
          <p className="mt-1 text-muted-fg">
            Start with an audition, a self-tape checklist, or today's training.
          </p>
        </aside>
      ) : null}
      <DashboardBoard arranging={arranging} onEdit={setEdit} />
      <AuditionFormDialog
        open={Boolean(edit)}
        onOpenChange={(o) => !o && setEdit(null)}
        initial={edit}
      />
    </div>
  );
}
