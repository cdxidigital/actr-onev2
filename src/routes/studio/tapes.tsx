import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useEntitlements } from "@/components/account-provider";
import { EmptyState, PageHead } from "@/components/page-head";
import { LimitToastCopy } from "@/components/plan-gate";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input, NativeSelect } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { craftLine } from "@/lib/craft";
import { useOsStore } from "@/lib/os-store";
import { formatDate, todayISO, uid } from "@/lib/utils";

export const Route = createFileRoute("/studio/tapes")({
  component: TapesPage,
});

function TapesPage() {
  const tapes = useOsStore((s) => s.tapes);
  const auditions = useOsStore((s) => s.auditions);
  const toggleCheck = useOsStore((s) => s.toggleCheck);
  const addCheck = useOsStore((s) => s.addCheck);
  const addTape = useOsStore((s) => s.addTape);
  const { canAddTape } = useEntitlements();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [stepDraft, setStepDraft] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    title: "",
    due: todayISO(),
    auditionId: "",
  });

  return (
    <div className="grid gap-5">
      <PageHead
        kicker="Craft room"
        title="Self-tapes"
        description="Checklists that survive the day you actually have to press record."
        action={
          <Button
            onClick={() => {
              if (!canAddTape) {
                toast.message(LimitToastCopy("tape"));
                void navigate({ to: "/pricing", search: { highlight: "studio" } });
                return;
              }
              setOpen(true);
            }}
          >
            New tape
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {tapes.map((tape) => {
          const done = tape.checklist.filter((c) => c.done).length;
          const linked = auditions.find((a) => a.id === tape.auditionId);
          return (
            <section
              key={tape.id}
              className="rounded-xl border border-border bg-card p-5 shadow-soft"
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                {done}/{tape.checklist.length} complete
              </p>
              <h2 className="font-display mt-1 text-2xl tracking-tight">{tape.title}</h2>
              <p className="mt-1 text-sm text-muted-fg">
                Due {formatDate(tape.due)}
                {linked ? ` · ${linked.title}` : ""}
              </p>
              <ul className="mt-4 grid gap-2">
                {tape.checklist.map((c) => (
                  <li key={c.id}>
                    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-1 hover:bg-muted">
                      <input
                        type="checkbox"
                        checked={c.done}
                        onChange={() => {
                          toggleCheck(tape.id, c.id);
                          toast.message(c.done ? "Step reopened" : `Step complete · ${craftLine("tape.step")}`);
                        }}
                        className="size-4 accent-[var(--accent)]"
                      />
                      <span className={c.done ? "text-sm text-muted-fg line-through" : "text-sm"}>
                        {c.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const label = (stepDraft[tape.id] ?? "").trim();
                  if (!label) return;
                  addCheck(tape.id, label);
                  setStepDraft((d) => ({ ...d, [tape.id]: "" }));
                }}
              >
                <Input
                  value={stepDraft[tape.id] ?? ""}
                  onChange={(e) =>
                    setStepDraft((d) => ({ ...d, [tape.id]: e.target.value }))
                  }
                  placeholder="Add a step"
                  className="h-10"
                />
                <Button type="submit" variant="outline" size="sm" className="h-10">
                  Add
                </Button>
              </form>
            </section>
          );
        })}
      </div>
      {tapes.length === 0 ? (
        <EmptyState>No tapes yet. Create one from an upcoming self-tape.</EmptyState>
      ) : null}

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (next) setForm({ title: "", due: todayISO(), auditionId: "" });
          setOpen(next);
        }}
      >
        <DialogContent title="New self-tape">
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.title.trim()) return;
              if (!canAddTape) {
                toast.message(LimitToastCopy("tape"));
                setOpen(false);
                void navigate({ to: "/pricing", search: { highlight: "studio" } });
                return;
              }
              addTape({
                id: uid("t"),
                auditionId: form.auditionId || null,
                title: form.title.trim(),
                due: form.due,
                checklist: [
                  { id: uid("c"), label: "Mark sides and beats", done: false },
                  { id: uid("c"), label: "Light and frame check", done: false },
                  { id: uid("c"), label: "Record two full takes", done: false },
                ],
              });
              toast.success(`Tape added · ${craftLine("tape.add")}`);
              setOpen(false);
            }}
          >
            <Label>
              Title
              <Input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="The Last Signal — sides 12–16"
              />
            </Label>
            <Label>
              Due
              <Input
                type="date"
                value={form.due}
                onChange={(e) => setForm({ ...form, due: e.target.value })}
              />
            </Label>
            <Label>
              Linked audition
              <NativeSelect
                value={form.auditionId}
                onChange={(e) => setForm({ ...form, auditionId: e.target.value })}
              >
                <option value="">None</option>
                {auditions.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </NativeSelect>
            </Label>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create tape</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
