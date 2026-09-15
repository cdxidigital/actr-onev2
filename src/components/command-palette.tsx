import { Command } from "cmdk";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useEntitlements } from "@/components/account-provider";
import { useOsStore } from "@/lib/os-store";
import { THEME_META, THEMES } from "@/lib/os-types";

export function CommandPalette({
  open,
  onOpenChange,
  onAddAudition,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAudition: () => void;
}) {
  const navigate = useNavigate();
  const auditions = useOsStore((s) => s.auditions);
  const notes = useOsStore((s) => s.notes);
  const setTheme = useOsStore((s) => s.setTheme);
  const { canUseTheme } = useEntitlements();
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) {
      setQ("");
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const query = q.trim().toLowerCase();
  const filtered = useMemo(() => {
    const match = (s: string) => !query || s.toLowerCase().includes(query);
    return {
      actions: [
        { id: "add", label: "Add an audition", run: onAddAudition },
        { id: "ov", label: "Go to overview", run: () => navigate({ to: "/studio" }) },
        { id: "au", label: "Go to auditions", run: () => navigate({ to: "/studio/auditions" }) },
        { id: "tp", label: "Go to self-tapes", run: () => navigate({ to: "/studio/tapes" }) },
        { id: "nt", label: "Go to notes", run: () => navigate({ to: "/studio/notes" }) },
        { id: "tr", label: "Go to training", run: () => navigate({ to: "/studio/training" }) },
        { id: "run", label: "Open the run", run: () => navigate({ to: "/studio/run" }) },
        { id: "an", label: "Go to analytics", run: () => navigate({ to: "/studio/analytics" }) },
        { id: "co", label: "Ask career coach", run: () => navigate({ to: "/studio/coach" }) },
        { id: "st", label: "Go to settings", run: () => navigate({ to: "/studio/settings" }) },
        { id: "pr", label: "See plans", run: () => navigate({ to: "/pricing" }) },
        ...THEMES.map((t) => ({
          id: `theme-${t}`,
          label: `Theme: ${THEME_META[t].label}`,
          run: () => {
            if (!canUseTheme(t)) {
              toast.message("Studio unlocks the other three looks.");
              void navigate({ to: "/pricing", search: { highlight: "studio" } });
              return;
            }
            setTheme(t);
          },
        })),
      ].filter((a) => match(a.label)),
      auditions: auditions.filter((a) => match(`${a.title} ${a.role}`)),
      notes: notes.filter((n) => match(n.title)),
    };
  }, [auditions, canUseTheme, notes, navigate, onAddAudition, query, setTheme]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-command flex items-start justify-center bg-fg/40 p-4 pt-24 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <Command
        className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-soft"
        shouldFilter={false}
      >
        <Command.Input
          autoFocus
          value={q}
          onValueChange={setQ}
          placeholder="Search auditions, notes, actions"
          className="h-12 w-full border-b border-border bg-transparent px-4 text-sm outline-none"
        />
        <Command.List className="max-h-80 overflow-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-muted-fg">
            No matches
          </Command.Empty>
          {filtered.actions.map((a) => (
            <Command.Item
              key={a.id}
              value={a.label}
              className="flex h-10 cursor-pointer items-center rounded-md px-3 text-sm aria-selected:bg-muted"
              onSelect={() => {
                onOpenChange(false);
                a.run();
              }}
            >
              {a.label}
            </Command.Item>
          ))}
          {filtered.auditions.map((a) => (
            <Command.Item
              key={a.id}
              value={a.title}
              className="flex h-10 cursor-pointer items-center justify-between rounded-md px-3 text-sm aria-selected:bg-muted"
              onSelect={() => {
                onOpenChange(false);
                void navigate({ to: "/studio/auditions" });
              }}
            >
              <span>{a.title}</span>
              <span className="font-mono text-xs text-muted-fg">{a.status}</span>
            </Command.Item>
          ))}
          {filtered.notes.map((n) => (
            <Command.Item
              key={n.id}
              value={n.title}
              className="flex h-10 cursor-pointer items-center rounded-md px-3 text-sm aria-selected:bg-muted"
              onSelect={() => {
                onOpenChange(false);
                void navigate({ to: "/studio/notes" });
              }}
            >
              {n.title}
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}
