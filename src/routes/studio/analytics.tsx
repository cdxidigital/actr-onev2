import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEntitlements } from "@/components/account-provider";
import { useCraft } from "@/components/craft-panel";
import { PageHead } from "@/components/page-head";
import { PlanGate } from "@/components/plan-gate";
import { AUDITION_STATUSES } from "@/lib/os-types";
import { healthScore, trainingStreak, weekBars } from "@/lib/health";
import { useOsStore } from "@/lib/os-store";

export const Route = createFileRoute("/studio/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const state = useOsStore();
  const { canAnalytics, loading } = useEntitlements();
  const craft = useCraft();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const h = useMemo(() => healthScore(state), [state]);
  const mix = AUDITION_STATUSES.map((s) => ({
    name: s.slice(0, 3),
    full: s,
    n: state.auditions.filter((a) => a.status === s).length,
  }));
  const week = weekBars(state).map((b) => ({ ...b, name: b.label }));
  const booked = state.auditions.filter((a) => a.status === "Booked").length;

  return (
    <div className="grid gap-5">
      <PageHead
        kicker="Signal"
        title="Analytics"
        description="Not vanity charts. A readable picture of how you actually work."
      />
      {loading ? (
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
      ) : !canAnalytics ? (
        <PlanGate
          title="See the week, not just the next call."
          description="Call Sheet keeps health on the overview. Studio opens pipeline mix, craft minutes, and the breakdown that tells you where the instrument actually is."
        />
      ) : (
        <>
          <div className="grid overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            <Stat kicker="Health" value={String(h.total)} detail="Weighted across craft and pipeline" />
            <Stat kicker="Booked" value={String(booked)} detail="Roles currently held" />
            <Stat
              kicker="Streak"
              value={`${trainingStreak(state)}d`}
              detail={`${state.notes.length} living character files`}
            />
            <Stat kicker="The run" value={craft.rank.name} detail={`${craft.xp} craft this career`} />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Pipeline mix</p>
              <h2 className="font-display mt-1 text-2xl tracking-tight">Where the work sits</h2>
              <div className="mt-4 h-56">
                {ready ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mix} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: "var(--muted-fg)", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} tick={{ fill: "var(--muted-fg)", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        cursor={{ fill: "color-mix(in oklab, var(--accent) 10%, transparent)" }}
                        contentStyle={{
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          color: "var(--fg)",
                        }}
                        formatter={(value) => [Number(value ?? 0), "roles"]}
                      />
                      <Bar dataKey="n" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full rounded-md bg-muted" />
                )}
              </div>
            </section>
            <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Craft minutes</p>
              <h2 className="font-display mt-1 text-2xl tracking-tight">Last seven days</h2>
              <div className="mt-4 h-56">
                {ready ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={week} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: "var(--muted-fg)", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} tick={{ fill: "var(--muted-fg)", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        cursor={{ fill: "color-mix(in oklab, var(--accent) 10%, transparent)" }}
                        contentStyle={{
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          color: "var(--fg)",
                        }}
                        formatter={(value) => [Number(value ?? 0), "minutes"]}
                      />
                      <Bar dataKey="mins" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full rounded-md bg-muted" />
                )}
              </div>
            </section>
          </div>
          <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Breakdown</p>
            <h2 className="font-display mt-1 text-2xl tracking-tight">Health ingredients</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["Consistency", h.consistency, "Training rhythm and streak"],
                ["Readiness", h.readiness, "Tape progress and notes"],
                ["Momentum", h.momentum, "Live roles and bookings"],
              ].map(([label, value, detail]) => (
                <li key={String(label)} className="rounded-md bg-muted px-4 py-4">
                  <p className="text-sm text-muted-fg">{label}</p>
                  <p className="font-display mt-1 text-3xl tracking-tight tabular-nums">{value}</p>
                  <p className="mt-1 text-xs text-muted-fg">{detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

function Stat({ kicker, value, detail }: { kicker: string; value: string; detail: string }) {
  return (
    <div className="bg-card p-4">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{kicker}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-muted-fg">{detail}</p>
    </div>
  );
}
