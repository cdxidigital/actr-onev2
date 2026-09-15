import { daysAgo, todayISO } from "@/lib/utils";
import type { Audition, OsState } from "@/lib/os-types";

export function trainingStreak(state: OsState) {
  const days = new Set(state.training.map((t) => t.date));
  let n = 0;
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (days.has(key)) n += 1;
    else if (i > 0) break;
  }
  return n;
}

export function weekBars(state: OsState) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i - 6);
    const iso = d.toISOString().slice(0, 10);
    const mins = state.training
      .filter((t) => t.date === iso)
      .reduce((s, t) => s + Number(t.minutes || 0), 0);
    return {
      iso,
      mins,
      label: d.toLocaleDateString(undefined, { weekday: "narrow" }),
    };
  });
}

export function healthScore(state: OsState) {
  const active = state.auditions.filter((a) => a.status !== "Closed").length;
  const booked = state.auditions.filter((a) => a.status === "Booked").length;
  const trainWeek = state.training.filter((t) => daysAgo(t.date) <= 7).length;
  const checks = state.tapes.flatMap((t) => t.checklist);
  const tapesDone = checks.filter((c) => c.done).length;
  const tapesAll = Math.max(1, checks.length);
  const consistency = Math.min(100, 55 + trainWeek * 8 + trainingStreak(state) * 3);
  const readiness = Math.min(
    100,
    40 + Math.round((tapesDone / tapesAll) * 40) + state.notes.length * 4,
  );
  const momentum = Math.min(100, 45 + active * 5 + booked * 12);
  const total = Math.round(consistency * 0.4 + readiness * 0.3 + momentum * 0.3);
  return { total, consistency, readiness, momentum };
}

export function upcomingAuditions(state: OsState, n = 3): Audition[] {
  const today = todayISO();
  return state.auditions
    .filter((a) => a.status !== "Closed" && a.status !== "Booked")
    .slice()
    .sort((a, b) => {
      const aRank = a.date >= today ? 0 : 1;
      const bRank = b.date >= today ? 0 : 1;
      if (aRank !== bRank) return aRank - bRank;
      return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
    })
    .slice(0, n);
}

export function dueSoonCount(state: OsState) {
  const today = todayISO();
  return state.auditions.filter(
    (a) => a.status !== "Closed" && a.status !== "Booked" && a.date <= today,
  ).length;
}

export function pipeline(state: OsState) {
  const groups = [
    { label: "Submitted", statuses: ["Submitted", "New"] },
    { label: "In play", statuses: ["Callback", "Preparing", "Confirmed"] },
    { label: "Booked", statuses: ["Booked"] },
  ] as const;
  return groups.map((g) => ({
    label: g.label,
    items: state.auditions.filter((a) =>
      (g.statuses as readonly string[]).includes(a.status),
    ),
  }));
}

export function boardDigest(state: OsState) {
  const h = healthScore(state);
  return [
    `Actor: ${state.profile.name} (${state.profile.plan})`,
    `Health ${h.total} — consistency ${h.consistency}, readiness ${h.readiness}, momentum ${h.momentum}, streak ${trainingStreak(state)}`,
    `Craft ${state.craft.events.reduce((n, e) => n + e.xp, 0)} from ${state.craft.events.length} logged moves`,
    "Auditions:",
    ...state.auditions.map(
      (a) =>
        `- ${a.title} / ${a.role} / ${a.type} / ${a.status} / ${a.date} ${a.time} ${a.notes ? "— " + a.notes : ""}`,
    ),
    "Tapes:",
    ...state.tapes.map(
      (t) =>
        `- ${t.title} due ${t.due}: ${t.checklist.map((c) => `${c.done ? "[x]" : "[ ]"} ${c.label}`).join("; ")}`,
    ),
    "Notes:",
    ...state.notes.map((n) => `- ${n.title}: ${n.body}`),
    "Training:",
    ...state.training.map((t) => `- ${t.date} ${t.minutes}m ${t.kind} ${t.title}`),
  ].join("\n");
}
