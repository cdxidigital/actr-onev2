import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, ChevronUp, Eye, EyeOff, GripVertical } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { CraftCard } from "@/components/craft-panel";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  dueSoonCount,
  healthScore,
  pipeline,
  trainingStreak,
  upcomingAuditions,
  weekBars,
} from "@/lib/health";
import { useOsStore } from "@/lib/os-store";
import {
  DASHBOARD_MODULES,
  type Audition,
  type DashboardModuleId,
} from "@/lib/os-types";
import { cn, formatDate } from "@/lib/utils";

export function DashboardBoard({
  arranging,
  onEdit,
}: {
  arranging: boolean;
  onEdit: (audition: Audition) => void;
}) {
  const dashboard = useOsStore((s) => s.dashboard);
  const setOrder = useOsStore((s) => s.setDashboardOrder);
  const toggle = useOsStore((s) => s.toggleDashboardModule);
  const [dragId, setDragId] = useState<DashboardModuleId | null>(null);
  const [overId, setOverId] = useState<DashboardModuleId | null>(null);

  const visible = dashboard.order.filter((id) => !dashboard.hidden.includes(id));
  const hidden = dashboard.order.filter((id) => dashboard.hidden.includes(id));

  function move(from: DashboardModuleId, to: DashboardModuleId) {
    if (from === to) return;
    const next = [...dashboard.order];
    const i = next.indexOf(from);
    const j = next.indexOf(to);
    if (i < 0 || j < 0) return;
    next.splice(i, 1);
    next.splice(j, 0, from);
    setOrder(next);
  }

  function moveBy(id: DashboardModuleId, dir: -1 | 1) {
    const i = visible.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= visible.length) return;
    move(id, visible[j]);
  }

  return (
    <div className="grid gap-4">
      {visible.length === 0 ? (
        <section className="rounded-xl border border-dashed border-border px-4 py-10 text-center">
          <p className="font-medium">Every module is hidden.</p>
          <p className="mt-1 text-sm text-muted-fg">
            Restore one below, or reset the layout from the header.
          </p>
        </section>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((id, index) => {
          const meta = DASHBOARD_MODULES.find((m) => m.id === id)!;
          return (
            <ModuleFrame
              key={id}
              id={id}
              label={meta.label}
              span={meta.span}
              arranging={arranging}
              dragging={dragId === id}
              over={overId === id && dragId !== id}
              canUp={index > 0}
              canDown={index < visible.length - 1}
              onMoveUp={() => moveBy(id, -1)}
              onMoveDown={() => moveBy(id, 1)}
              onDragStart={() => setDragId(id)}
              onDragEnd={() => {
                setDragId(null);
                setOverId(null);
              }}
              onDragOver={() => {
                if (dragId && dragId !== id) setOverId(id);
              }}
              onDropOn={() => {
                if (dragId) move(dragId, id);
                setDragId(null);
                setOverId(null);
              }}
              onHide={() => toggle(id)}
            >
              <ModuleBody id={id} onEdit={onEdit} />
            </ModuleFrame>
          );
        })}
      </div>
      {arranging && hidden.length > 0 ? (
        <section className="rounded-xl border border-dashed border-border p-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-fg">
            Hidden modules
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {hidden.map((id) => {
              const meta = DASHBOARD_MODULES.find((m) => m.id === id)!;
              return (
                <Button key={id} type="button" variant="outline" size="sm" onClick={() => toggle(id)}>
                  <Eye className="size-3.5" />
                  {meta.label}
                </Button>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ModuleFrame({
  id,
  label,
  span,
  arranging,
  dragging,
  over,
  canUp,
  canDown,
  children,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDropOn,
  onHide,
}: {
  id: DashboardModuleId;
  label: string;
  span: "full" | "half";
  arranging: boolean;
  dragging: boolean;
  over: boolean;
  canUp: boolean;
  canDown: boolean;
  children: ReactNode;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: () => void;
  onDropOn: () => void;
  onHide: () => void;
}) {
  return (
    <div
      className={cn(
        span === "full" ? "md:col-span-2" : "",
        arranging && "rounded-xl border border-dashed border-border bg-muted/30 p-2",
        over && "border-accent bg-accent/10",
        dragging && "opacity-40",
      )}
      onDragOver={
        arranging
          ? (e) => {
              e.preventDefault();
              onDragOver();
            }
          : undefined
      }
      onDrop={
        arranging
          ? (e) => {
              e.preventDefault();
              onDropOn();
            }
          : undefined
      }
    >
      {arranging ? (
        <div className="mb-2 flex items-center gap-1">
          <button
            type="button"
            draggable
            aria-label={`Move ${label}`}
            className="grid size-11 shrink-0 place-items-center rounded-md border border-border bg-card text-muted-fg"
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", id);
              onDragStart();
            }}
            onDragEnd={onDragEnd}
          >
            <GripVertical className="size-4" />
          </button>
          <span className="min-w-0 flex-1 truncate px-1 text-sm">{label}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Move ${label} up`}
            disabled={!canUp}
            onClick={onMoveUp}
          >
            <ChevronUp className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Move ${label} down`}
            disabled={!canDown}
            onClick={onMoveDown}
          >
            <ChevronDown className="size-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" aria-label={`Hide ${label}`} onClick={onHide}>
            <EyeOff className="size-4" />
          </Button>
        </div>
      ) : null}
      <div className={arranging ? "pointer-events-none" : undefined}>{children}</div>
    </div>
  );
}

function ModuleBody({
  id,
  onEdit,
}: {
  id: DashboardModuleId;
  onEdit: (audition: Audition) => void;
}) {
  const state = useOsStore();
  const h = useMemo(() => healthScore(state), [state]);
  const upcoming = upcomingAuditions(state, 3);
  const focus = upcoming[0];
  const due = dueSoonCount(state);
  const bars = weekBars(state);
  const maxBar = Math.max(30, ...bars.map((b) => b.mins));
  const cols = pipeline(state);

  switch (id) {
    case "focus":
      return (
        <section className="flex flex-col gap-3 rounded-lg border border-accent/30 bg-accent/8 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Today's focus</p>
            <p className="mt-1 font-medium">
              {focus ? `Prepare ${focus.title}` : "Protect the instrument"}
            </p>
            <p className="text-sm text-muted-fg">
              {focus
                ? `${focus.type} · ${formatDate(focus.date)} ${focus.time}`
                : "No urgent deadline. Log training or add a role."}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/studio/coach">
              Open focus plan <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </section>
      );
    case "craft":
      return <CraftCard />;
    case "stats":
      return (
        <div className="grid overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          <div className="bg-card p-4">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Due soon</p>
            <p className="mt-1 text-lg font-semibold">
              {due} call{due === 1 ? "" : "s"}
            </p>
            <p className="text-xs text-muted-fg">{focus ? focus.title : "Clear board"}</p>
          </div>
          <div className="bg-card p-4">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">In motion</p>
            <p className="mt-1 text-lg font-semibold">
              {state.auditions.filter((a) => a.status !== "Closed").length} auditions
            </p>
            <p className="text-xs text-muted-fg">
              Across {cols.filter((c) => c.items.length).length} active stages
            </p>
          </div>
          <div className="bg-card p-4">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Streak</p>
            <p className="mt-1 text-lg font-semibold">{trainingStreak(state)} days</p>
            <p className="text-xs text-muted-fg">Preparation rhythm</p>
          </div>
        </div>
      );
    case "health":
      return (
        <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Career health</p>
          <h2 className="font-display mt-1 text-2xl tracking-tight">
            Looking {h.total >= 80 ? "strong" : h.total >= 60 ? "steady" : "thin"}
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <div
              className="grid size-28 place-items-center rounded-full"
              style={{
                background: `conic-gradient(var(--accent) ${h.total * 3.6}deg, var(--muted) 0)`,
              }}
            >
              <div className="grid size-[5.5rem] place-items-center rounded-full bg-card text-center">
                <span className="font-display text-3xl tracking-tight">{h.total}</span>
              </div>
            </div>
            <ul className="min-w-40 flex-1 space-y-2 text-sm text-muted-fg">
              <li className="flex justify-between">
                Consistency <strong className="font-mono text-fg">{h.consistency}</strong>
              </li>
              <li className="flex justify-between">
                Readiness <strong className="font-mono text-fg">{h.readiness}</strong>
              </li>
              <li className="flex justify-between">
                Momentum <strong className="font-mono text-fg">{h.momentum}</strong>
              </li>
            </ul>
          </div>
        </section>
      );
    case "next":
      return (
        <section className="rounded-xl bg-accent p-5 text-accent-fg">
          <p className="font-mono text-xs uppercase tracking-[0.16em] opacity-70">Your next move</p>
          <h2 className="font-display mt-2 text-2xl tracking-tight">Turn preparation into presence.</h2>
          <p className="mt-3 text-sm opacity-80">
            {focus
              ? `A focused rehearsal before ${focus.title} is the highest-leverage move on your board.`
              : "Use the quiet to train. Momentum is a practice, not a mood."}
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-5 border-accent-fg/30 bg-transparent text-accent-fg hover:bg-accent-fg/10"
          >
            <Link to="/studio/coach">Ask your coach</Link>
          </Button>
        </section>
      );
    case "pipeline":
      return (
        <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Pipeline</p>
              <h2 className="font-display mt-1 text-2xl tracking-tight">Audition board</h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/studio/auditions">View all</Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {cols.map((col) => (
              <div key={col.label}>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-fg">
                  {col.label} · {col.items.length}
                </p>
                <div className="mt-2 grid gap-2">
                  {col.items.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="rounded-md border border-border bg-bg px-3 py-3 text-left text-sm hover:border-accent/40"
                      onClick={() => onEdit(item)}
                    >
                      <span className="block font-medium">{item.title}</span>
                      <span className="text-xs text-muted-fg">{item.role}</span>
                    </button>
                  ))}
                  {col.items.length === 0 ? (
                    <p className="rounded-md border border-dashed border-border px-3 py-4 text-sm text-muted-fg">
                      None yet
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    case "upcoming":
      return (
        <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">On deck</p>
          <h2 className="font-display mt-1 text-2xl tracking-tight">Upcoming</h2>
          <div className="mt-3 grid gap-2">
            {upcoming.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-3 rounded-md border border-border bg-bg px-3 py-3 text-left"
                onClick={() => onEdit(item)}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-muted-fg">
                    {item.role} · {formatDate(item.date)}
                  </span>
                </span>
                <StatusBadge status={item.status} />
              </button>
            ))}
            {upcoming.length === 0 ? (
              <p className="rounded-md border border-dashed border-border px-3 py-4 text-sm text-muted-fg">
                Nothing on deck. Add a role or enjoy the quiet.
              </p>
            ) : null}
          </div>
        </section>
      );
    case "coach":
      return (
        <section className="relative overflow-hidden rounded-xl bg-fg p-5 text-bg">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-bg/60">Studio</p>
          <h2 className="font-display mt-3 text-3xl tracking-tight">Meet your career coach.</h2>
          <p className="mt-3 max-w-xs text-sm text-bg/70">
            A second set of eyes on your patterns, choices, and next best move.
          </p>
          <Button asChild className="mt-6">
            <Link to="/studio/coach">Start a conversation</Link>
          </Button>
        </section>
      );
    case "rhythm":
      return (
        <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">This week</p>
          <h2 className="font-display mt-1 text-2xl tracking-tight">Your rhythm</h2>
          <div className="mt-4 flex h-24 items-end gap-1.5">
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
      );
  }
}
