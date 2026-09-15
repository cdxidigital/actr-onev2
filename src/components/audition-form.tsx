import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useEntitlements } from "@/components/account-provider";
import { LimitToastCopy } from "@/components/plan-gate";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ui/confirm-button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input, NativeSelect, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { craftLine } from "@/lib/craft";
import { AUDITION_STATUSES, AUDITION_TYPES, type Audition } from "@/lib/os-types";
import { useOsStore } from "@/lib/os-store";
import { todayISO, uid } from "@/lib/utils";

const empty = (): Audition => ({
  id: uid("a"),
  title: "",
  role: "",
  type: "Self-tape",
  date: todayISO(),
  time: "10:00",
  status: "New",
  notes: "",
});

export function AuditionFormDialog({
  open,
  onOpenChange,
  initial,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Audition | null;
}) {
  const upsert = useOsStore((s) => s.upsertAudition);
  const remove = useOsStore((s) => s.deleteAudition);
  const { canAddAudition } = useEntitlements();
  const navigate = useNavigate();
  const [form, setForm] = useState<Audition>(initial ?? empty());
  const isEdit = Boolean(initial);

  useEffect(() => {
    if (open) setForm(initial ?? empty());
  }, [open, initial]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setForm(initial ?? empty());
        onOpenChange(next);
      }}
    >
      <DialogContent title={isEdit ? "Edit audition" : "Add an audition"}>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.title.trim() || !form.role.trim()) return;
            if (!isEdit && !canAddAudition) {
              toast.message(LimitToastCopy("audition"));
              onOpenChange(false);
              void navigate({ to: "/pricing", search: { highlight: "studio" } });
              return;
            }
            upsert({ ...form, title: form.title.trim(), role: form.role.trim() });
            toast.success(isEdit ? "Audition saved" : `Audition added · ${craftLine("audition.add")}`);
            onOpenChange(false);
          }}
        >
          <Label>
            Project
            <Input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="The Glass House"
            />
          </Label>
          <Label>
            Role
            <Input
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="Lead / Guest / Recurring"
            />
          </Label>
          <div className="grid gap-4 sm:grid-cols-2">
            <Label>
              Type
              <NativeSelect
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as Audition["type"] })
                }
              >
                {AUDITION_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </NativeSelect>
            </Label>
            <Label>
              Status
              <NativeSelect
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as Audition["status"] })
                }
              >
                {AUDITION_STATUSES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </NativeSelect>
            </Label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Label>
              Date
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </Label>
            <Label>
              Time
              <Input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </Label>
          </div>
          <Label>
            Notes
            <Textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </Label>
          <div className="flex flex-wrap justify-end gap-2">
            {isEdit ? (
              <ConfirmButton
                label="Delete"
                confirmLabel="Delete audition"
                onConfirm={() => {
                  remove(form.id);
                  toast.success("Audition removed");
                  onOpenChange(false);
                }}
              />
            ) : null}
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save" : "Add audition"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
