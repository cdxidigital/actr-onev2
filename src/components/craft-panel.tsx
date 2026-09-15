import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { craftSnapshot, RANKS, type CraftSnapshot } from "@/lib/craft";
import { useOsStore } from "@/lib/os-store";
import { cn } from "@/lib/utils";

export function XpBar({ value, className }: { value: number; className?: string }) {
  return (
    <div
      className={cn("xp-track", className)}
      style={{ ["--xp" as string]: `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%` }}
    >
      <i />
    </div>
  );
}

export function useCraft() {
  const auditions = useOsStore((s) => s.auditions);
  const tapes = useOsStore((s) => s.tapes);
  const notes = useOsStore((s) => s.notes);
  const training = useOsStore((s) => s.training);
  const coach = useOsStore((s) => s.coach);
  const craft = useOsStore((s) => s.craft);
  return useMemo(
    () => craftSnapshot({ auditions, tapes, notes, training, coach, craft }),
    [auditions, tapes, notes, training, coach, craft],
  );
}

export function CraftWatcher() {
  const snap = useCraft();
  const seenMarks = useOsStore((s) => s.craft.seenMarks);
  const seenRank = useOsStore((s) => s.craft.seenRank);
  const seeCraft = useOsStore((s) => s.seeCraft);
  const [ready, setReady] = useState(() => useOsStore.persist.hasHydrated());
  const booted = useRef(false);

  useEffect(() => {
    const unsub = useOsStore.persist.onFinishHydration(() => setReady(true));
    if (useOsStore.persist.hasHydrated()) setReady(true);
    return unsub;
  }, []);

  useEffect(() => {
    if (!ready) return;
    const earned = snap.marks.filter((m) => m.earned).map((m) => m.id);
    if (!booted.current) {
      booted.current = true;
      seeCraft(
        earned.length ? [...new Set([...seenMarks, ...earned])] : seenMarks,
        snap.rank.id,
      );
      return;
    }
    const fresh = snap.marks.filter((m) => m.earned && !seenMarks.includes(m.id));
    const prevIdx = RANKS.findIndex((r) => r.id === seenRank);
    const rankedUp = snap.rank.index > (prevIdx < 0 ? 0 : prevIdx);
    if (fresh.length === 1) toast.success(`Mark unlocked · ${fresh[0].name}`);
    else if (fresh.length > 1 && fresh.length <= 3) {
      toast.success(`${fresh.length} marks unlocked`);
    }
    if (rankedUp) toast.success(`Rank up · ${snap.rank.name}`);
    if (fresh.length || snap.rank.id !== seenRank) {
      seeCraft([...new Set([...seenMarks, ...fresh.map((m) => m.id)])], snap.rank.id);
    }
  }, [ready, seeCraft, seenMarks, seenRank, snap]);

  return null;
}

export function DailyList({ snap }: { snap: CraftSnapshot }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-3">
      {snap.dailies.map((d) => (
        <li key={d.id}>
          <Link
            to={d.href}
            className="flex min-h-11 items-center gap-3 rounded-md border border-border px-3 py-2 hover:border-accent/40"
          >
            <span className="mission-check" data-done={d.done}>
              {d.done ? <Check className="size-3" strokeWidth={2.5} /> : null}
            </span>
            <span className="min-w-0">
              <span className="block text-sm">{d.name}</span>
              <span className="block text-xs text-muted-fg">{d.detail}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CraftCard() {
  const snap = useCraft();
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">The run</p>
          <h2 className="font-display mt-1 text-2xl tracking-tight">{snap.rank.name}</h2>
          <p className="mt-1 text-sm text-muted-fg">{snap.rank.copy}</p>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link to="/studio/run">Open the run</Link>
        </Button>
      </div>
      <div className="mt-4">
        <div className="mb-1.5 flex justify-between font-mono text-xs text-muted-fg">
          <span>{snap.xp} craft</span>
          <span>
            {snap.rank.next ? `${snap.rank.need} to ${snap.rank.next.name}` : "Lead"}
          </span>
        </div>
        <XpBar value={snap.rank.progress} />
      </div>
      <div className="mt-5">
        <DailyList snap={snap} />
      </div>
      <p className="mt-4 font-mono text-xs text-muted-fg">
        Today {snap.todayXp} · week {snap.weekXp} · streak {snap.streak}d · {snap.dailyDone}/3 sides
      </p>
    </section>
  );
}

export function RankTrack({ active }: { active: string }) {
  return (
    <ol className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {RANKS.map((r, i) => {
        const on = r.id === active;
        const passed = RANKS.findIndex((x) => x.id === active) >= i;
        return (
          <li
            key={r.id}
            className={cn(
              "min-w-0 rounded-md border px-2 py-3 text-center",
              on ? "border-accent bg-accent/10" : "border-border",
            )}
          >
            <p className="font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg">
              {on ? "Here" : passed ? "Hit" : "—"}
            </p>
            <p className="mt-1 text-xs font-medium leading-snug sm:text-sm">{r.name}</p>
          </li>
        );
      })}
    </ol>
  );
}
