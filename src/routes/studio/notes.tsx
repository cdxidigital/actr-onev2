import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useEntitlements } from "@/components/account-provider";
import { EmptyState, PageHead } from "@/components/page-head";
import { LimitToastCopy } from "@/components/plan-gate";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ui/confirm-button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { craftLine } from "@/lib/craft";
import type { ScriptNote } from "@/lib/os-types";
import { useOsStore } from "@/lib/os-store";
import { uid } from "@/lib/utils";

export const Route = createFileRoute("/studio/notes")({
  component: NotesPage,
});

function NotesPage() {
  const notes = useOsStore((s) => s.notes);
  const upsert = useOsStore((s) => s.upsertNote);
  const remove = useOsStore((s) => s.deleteNote);
  const { canAddNote } = useEntitlements();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ScriptNote | null>(null);
  const [form, setForm] = useState({ title: "", body: "" });
  const sorted = [...notes].sort((a, b) => b.updated - a.updated);
  const isEdit = Boolean(current);

  function openNew() {
    if (!canAddNote) {
      toast.message(LimitToastCopy("note"));
      void navigate({ to: "/pricing", search: { highlight: "studio" } });
      return;
    }
    setCurrent(null);
    setForm({ title: "", body: "" });
    setOpen(true);
  }

  function openEdit(note: ScriptNote) {
    setCurrent(note);
    setForm({ title: note.title, body: note.body });
    setOpen(true);
  }

  return (
    <div className="grid gap-5">
      <PageHead
        kicker="Inner life"
        title="Scripts & notes"
        description="Keep the private score close. One true sentence is enough."
        action={<Button onClick={openNew}>New note</Button>}
      />
      <div className="grid gap-3 md:grid-cols-2">
        {sorted.map((n) => (
          <button
            key={n.id}
            type="button"
            className="rounded-xl border border-border bg-card p-5 text-left shadow-soft hover:border-accent/40"
            onClick={() => openEdit(n)}
          >
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-fg">
              {new Date(n.updated).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">{n.title}</h2>
            <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted-fg">{n.body}</p>
          </button>
        ))}
      </div>
      {sorted.length === 0 ? (
        <EmptyState>No notes yet. Capture the inner life before the result.</EmptyState>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title={isEdit ? "Edit note" : "New note"}>
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!form.title.trim() || !form.body.trim()) return;
              if (!isEdit && !canAddNote) {
                toast.message(LimitToastCopy("note"));
                setOpen(false);
                void navigate({ to: "/pricing", search: { highlight: "studio" } });
                return;
              }
              upsert({
                id: current?.id ?? uid("n"),
                title: form.title.trim(),
                body: form.body.trim(),
                updated: Date.now(),
              });
              toast.success(isEdit ? "Note saved" : `Note created · ${craftLine("note.add")}`);
              setOpen(false);
            }}
          >
            <Label>
              Title
              <Input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Mara — inner life"
              />
            </Label>
            <Label>
              Body
              <Textarea
                required
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="Play the listening, not the knowing."
              />
            </Label>
            <div className="flex flex-wrap justify-end gap-2">
              {isEdit && current ? (
                <ConfirmButton
                  label="Delete"
                  confirmLabel="Delete note"
                  onConfirm={() => {
                    remove(current.id);
                    toast.success("Note removed");
                    setOpen(false);
                  }}
                />
              ) : null}
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEdit ? "Save" : "Create"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
