import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { DailyList, RankTrack, useCraft, XpBar } from "@/components/craft-panel";
import { PageHead } from "@/components/page-head";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/studio/run")({
  component: RunPage,
});

function RunPage() {
  const snap = useCraft();
  const earned = snap.marks.filter((m) => m.earned).length;

  return (
    <div className="grid gap-5">
      <PageHead
        kicker="The run"
        title={snap.rank.name}
        description={`${snap.xp} craft from work you actually logged. Rank is how the week compounds — not a streak guilt trip.`}
      />
      <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Today's sides</p>
        <h2 className="font-display mt-1 text-2xl tracking-tight">
          {snap.dailyDone}/3 cleared
        </h2>
        <p className="mt-1 text-sm text-muted-fg">
          Today {snap.todayXp} craft · {snap.streak}d streak
        </p>
        <div className="mt-4">
          <DailyList snap={snap} />
        </div>
      </section>
      <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Ladder</p>
        <h2 className="font-display mt-1 text-2xl tracking-tight">Six rooms, one instrument.</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-fg">
          Extra through Lead. You move by logging tapes, notes, training, and status — not by opening
          the app.
        </p>
        <div className="mt-5">
          <RankTrack active={snap.rank.id} />
        </div>
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between font-mono text-xs text-muted-fg">
            <span>{snap.rank.name}</span>
            <span>
              {snap.rank.next ? `${snap.rank.need} craft to ${snap.rank.next.name}` : "Top of the ladder"}
            </span>
          </div>
          <XpBar value={snap.rank.progress} />
        </div>
      </section>
      <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">This week</p>
        <h2 className="font-display mt-1 text-2xl tracking-tight">Three honest quotas.</h2>
        <ul className="mt-4 grid gap-3">
          {snap.weeklies.map((q) => (
            <li key={q.id}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span>{q.name}</span>
                <span className="font-mono text-xs text-muted-fg">
                  {q.current}/{q.goal}
                </span>
              </div>
              <XpBar value={q.current / q.goal} />
              <p className="mt-1 text-xs text-muted-fg">{q.detail}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Marks</p>
        <h2 className="font-display mt-1 text-2xl tracking-tight">
          {earned}/{snap.marks.length} on the wall
        </h2>
        <p className="mt-2 text-sm text-muted-fg">Earned from the board. Nothing here is decorative.</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {snap.marks.map((m) => (
            <li
              key={m.id}
              className={cn(
                "flex items-start gap-3 rounded-md border border-border px-3 py-3",
                m.earned && "bg-muted/40",
              )}
            >
              <span className="mission-check mt-0.5" data-done={m.earned}>
                {m.earned ? <Check className="size-3" strokeWidth={2.5} /> : null}
              </span>
              <span>
                <span className="block text-sm font-medium">{m.name}</span>
                <span className="block text-xs text-muted-fg">{m.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <p className="text-sm text-muted-fg">
        Stuck?{" "}
        <Button asChild variant="ghost" size="sm" className="px-1">
          <Link to="/studio/coach">Ask the coach for a 20-minute plan</Link>
        </Button>
      </p>
    </div>
  );
}

