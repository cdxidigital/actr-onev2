import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyState, PageHead } from "@/components/page-head";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ui/confirm-button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input, NativeSelect } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { craftLine } from "@/lib/craft";
import { trainingStreak, weekBars } from "@/lib/health";
import { TRAINING_KINDS, type TrainingKind } from "@/lib/os-types";
import { useOsStore } from "@/lib/os-store";
import { daysAgo, todayISO, uid } from "@/lib/utils";

export const Route = createFileRoute("/studio/training")({
  component: TrainingPage,
});

function TrainingPage() {
  const state = useOsStore();
  const addTraining = useOsStore((s) => s.addTraining);
  const deleteTraining = useOsStore((s) => s.deleteTraining);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    kind: "Scene study" as TrainingKind,
    minutes: 30,
    date: todayISO(),
  });
  const rows = [...state.training].sort((a, b) => b.date.localeCompare(a.date));
  const weekMins = state.training
    .filter((t) => daysAgo(t.date) <= 7)
    .reduce((s, t) => s + Number(t.minutes || 0), 0);
  const bars = weekBars(state);
  const maxBar = Math.max(30, ...bars.map((b) => b.mins));

  return (
    <div className="grid gap-5">
      <PageHead
        kicker="The instrument"
        title="Training"
        description={`${weekMins} minutes in the last 7 days. Streak ${trainingStreak(state)}.`}
        action={<Button onClick={() => setOpen(true)}>Log session</Button>}
      />

      <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">This week</p>
        <div className="mt-4 flex h-28 items-end gap-1.5">
          {bars.map((b, i) => (
            <div key={b.iso} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-sm ${i === 6 ? "bg-accent" : "bg-muted-fg/25"}`}
                style={{ height: `${Math.max(10, (b.mins / maxBar) * 100)}%` }}
              />
              <span className="font-mono text-xs text-muted-fg">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-2">
        {rows.map((t) => (
          <div
            key={t.id}
            className="flex min-h-16 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-soft"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium">{t.title}</p>
              <p className="text-sm text-muted-fg">
                {t.kind} · {t.minutes} min · {t.date}
              </p>
            </div>
            <ConfirmButton
              label="Remove"
              confirmLabel="Remove session"
              variant="ghost"
              onConfirm={() => {
                deleteTraining(t.id);
                toast.success("Session removed");
              }}
            />
          </div>
        ))}
        {rows.length === 0 ? (
          <EmptyState>Log your first session to start a streak.</EmptyState>
        ) : null}
      </div>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (next)
            setForm({ title: "", kind: "Scene study", minutes: 30, date: todayISO() });
          setOpen(next);
        }}
      >
        <DialogContent title="Log a session">
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.title.trim() || form.minutes < 1) return;
              addTraining({
                id: uid("tr"),
                title: form.title.trim(),
                kind: form.kind,
                minutes: Number(form.minutes),
                date: form.date,
              });
              toast.success(`Session logged · ${craftLine("train", Number(form.minutes))}`);
              setOpen(false);
            }}
          >
            <Label>
              Session
              <Input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Cold read drills"
              />
            </Label>
            <div className="grid gap-4 sm:grid-cols-2">
              <Label>
                Kind
                <NativeSelect
                  value={form.kind}
                  onChange={(e) =>
                    setForm({ ...form, kind: e.target.value as TrainingKind })
                  }
                >
                  {TRAINING_KINDS.map((k) => (
                    <option key={k}>{k}</option>
                  ))}
                </NativeSelect>
              </Label>
              <Label>
                Minutes
                <Input
                  type="number"
                  min={1}
                  max={480}
                  value={form.minutes}
                  onChange={(e) =>
                    setForm({ ...form, minutes: Number(e.target.value) })
                  }
                />
              </Label>
            </div>
            <Label>
              Date
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Label>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Log session</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
