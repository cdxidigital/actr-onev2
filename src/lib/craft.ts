import { daysAgo, todayISO, uid } from "@/lib/utils";

export const CRAFT_KINDS = [
  "train",
  "tape.add",
  "tape.step",
  "tape.done",
  "note.add",
  "audition.add",
  "audition.submit",
  "audition.callback",
  "audition.book",
  "coach.ask",
] as const;

export type CraftKind = (typeof CRAFT_KINDS)[number];

export type CraftEvent = {
  id: string;
  kind: CraftKind;
  at: number;
  xp: number;
  ref?: string;
};

export type CraftState = {
  events: CraftEvent[];
  seenMarks: string[];
  seenRank: string;
};

export const EMPTY_CRAFT: CraftState = {
  events: [],
  seenMarks: [],
  seenRank: "extra",
};

export const RANKS = [
  { id: "extra", name: "Extra", min: 0, copy: "Show up. Credit comes later." },
  { id: "day-player", name: "Day Player", min: 60, copy: "One scene, fully. Then the next." },
  { id: "guest-star", name: "Guest Star", min: 180, copy: "The week has a shape." },
  { id: "recurring", name: "Recurring", min: 400, copy: "They already know the instrument." },
  { id: "series-regular", name: "Series Regular", min: 750, copy: "The book is working." },
  { id: "lead", name: "Lead", min: 1200, copy: "The room waits for you." },
] as const;

export type RankId = (typeof RANKS)[number]["id"];

const UNIQUE = new Set<CraftKind>([
  "tape.done",
  "audition.add",
  "audition.submit",
  "audition.callback",
  "audition.book",
]);

export function isCraftKind(value: unknown): value is CraftKind {
  return (CRAFT_KINDS as readonly string[]).includes(value as string);
}

export function xpFor(kind: CraftKind, extra = 0) {
  switch (kind) {
    case "train":
      return Math.min(24, 8 + Math.round(Math.max(0, extra) / 10));
    case "tape.add":
      return 6;
    case "tape.step":
      return 4;
    case "tape.done":
      return 18;
    case "note.add":
      return 8;
    case "audition.add":
      return 10;
    case "audition.submit":
      return 12;
    case "audition.callback":
      return 18;
    case "audition.book":
      return 40;
    case "coach.ask":
      return 5;
  }
}

export function makeCraftEvent(kind: CraftKind, ref?: string, extra = 0): CraftEvent {
  return { id: uid("xp"), kind, at: Date.now(), xp: xpFor(kind, extra), ref };
}

export function appendCraft(craft: CraftState, kind: CraftKind, ref?: string, extra = 0): CraftState {
  if (ref && UNIQUE.has(kind) && craft.events.some((e) => e.kind === kind && e.ref === ref)) {
    return craft;
  }
  return { ...craft, events: [...craft.events, makeCraftEvent(kind, ref, extra)].slice(-500) };
}

export function rankFor(xp: number) {
  let current: (typeof RANKS)[number] = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.min) current = rank;
  }
  const idx = RANKS.findIndex((r) => r.id === current.id);
  const next = RANKS[idx + 1] ?? null;
  const floor = current.min;
  const ceil = next?.min ?? floor + 1;
  const into = Math.max(0, xp - floor);
  const span = Math.max(1, ceil - floor);
  return {
    ...current,
    next,
    progress: next ? Math.min(1, into / span) : 1,
    into,
    need: next ? ceil - xp : 0,
    index: idx,
  };
}

export type MarkDef = {
  id: string;
  name: string;
  detail: string;
  earned: boolean;
};

function dayStart(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function weekStart(ts = Date.now()) {
  const d = new Date(ts);
  const day = d.getDay();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((day + 6) % 7));
  return d.getTime();
}

type BoardSlice = {
  auditions: { id: string; status: string; date: string }[];
  tapes: { id: string; due: string; checklist: { id: string; done: boolean }[] }[];
  notes: { id: string; updated: number }[];
  training: { id: string; minutes: number; date: string }[];
  coach: { id: string; from: string }[];
  craft: CraftState;
};

function stamp(iso: string, hour = 12) {
  const t = new Date(`${iso}T${String(hour).padStart(2, "0")}:00:00`).getTime();
  return Number.isFinite(t) ? t : Date.now();
}

export function reconstructCraft(state: Omit<BoardSlice, "craft">): CraftEvent[] {
  const events: CraftEvent[] = [];
  const push = (kind: CraftKind, at: number, ref?: string, extra = 0) => {
    events.push({ id: uid("xp"), kind, at, xp: xpFor(kind, extra), ref });
  };
  for (const a of state.auditions) {
    const at = stamp(a.date, 9);
    push("audition.add", at - 3600e3, a.id);
    if (a.status === "Submitted" || a.status === "Callback" || a.status === "Booked") {
      push("audition.submit", at, a.id);
    }
    if (a.status === "Callback" || a.status === "Booked") {
      push("audition.callback", at + 1800e3, a.id);
    }
    if (a.status === "Booked") push("audition.book", at + 3600e3, a.id);
  }
  for (const tape of state.tapes) {
    const at = stamp(tape.due, 15);
    push("tape.add", at - 7200e3, tape.id);
    const done = tape.checklist.filter((c) => c.done);
    done.forEach((c, i) => push("tape.step", at + i * 60e3, c.id));
    if (tape.checklist.length > 0 && done.length === tape.checklist.length) {
      push("tape.done", at + 3600e3, tape.id);
    }
  }
  for (const n of state.notes) {
    push("note.add", n.updated || Date.now(), n.id);
  }
  for (const tr of state.training) {
    push("train", stamp(tr.date, 18), tr.id, tr.minutes);
  }
  return events;
}

export function normalizeCraft(
  input: Partial<CraftState> | null | undefined,
  board?: Omit<BoardSlice, "craft">,
): CraftState {
  const events = Array.isArray(input?.events)
    ? input.events.filter(
        (e): e is CraftEvent =>
          Boolean(e) &&
          isCraftKind((e as CraftEvent).kind) &&
          typeof (e as CraftEvent).xp === "number",
      )
    : [];
  const seenMarks = Array.isArray(input?.seenMarks)
    ? input.seenMarks.filter((id): id is string => typeof id === "string")
    : [];
  const seenRank = RANKS.some((r) => r.id === input?.seenRank) ? (input!.seenRank as string) : "extra";
  if (events.length === 0 && board) {
    const rec = reconstructCraft(board);
    const xp = rec.reduce((n, e) => n + e.xp, 0);
    return {
      events: rec,
      seenMarks,
      seenRank: RANKS.some((r) => r.id === input?.seenRank) ? seenRank : rankFor(xp).id,
    };
  }
  return { events, seenMarks, seenRank };
}

export type DailyMission = {
  id: string;
  name: string;
  detail: string;
  href: "/studio/training" | "/studio/tapes" | "/studio/notes" | "/studio/auditions";
  done: boolean;
};

export type WeeklyQuest = {
  id: string;
  name: string;
  detail: string;
  current: number;
  goal: number;
};

export type CraftSnapshot = {
  xp: number;
  weekXp: number;
  todayXp: number;
  rank: ReturnType<typeof rankFor>;
  marks: MarkDef[];
  dailies: DailyMission[];
  weeklies: WeeklyQuest[];
  dailyDone: number;
  streak: number;
};

export function craftSnapshot(state: BoardSlice): CraftSnapshot {
  const events = state.craft.events;
  const xp = events.reduce((s, e) => s + e.xp, 0);
  const today = dayStart();
  const week = weekStart();
  const todayEvents = events.filter((e) => e.at >= today);
  const weekEvents = events.filter((e) => e.at >= week);
  const todayXp = todayEvents.reduce((s, e) => s + e.xp, 0);
  const weekXp = weekEvents.reduce((s, e) => s + e.xp, 0);
  const trainedToday =
    todayEvents.some((e) => e.kind === "train") ||
    state.training.some((t) => t.date === todayISO());
  const takeToday = todayEvents.some((e) => e.kind === "tape.step" || e.kind === "tape.done");
  const fileToday =
    todayEvents.some(
      (e) => e.kind === "note.add" || e.kind === "audition.add" || e.kind === "audition.submit",
    ) || state.notes.some((n) => n.updated >= today);
  const trainDays = new Set(
    weekEvents.filter((e) => e.kind === "train").map((e) => new Date(e.at).toISOString().slice(0, 10)),
  );
  state.training
    .filter((t) => daysAgo(t.date) <= 7)
    .forEach((t) => trainDays.add(t.date));
  const dailies: DailyMission[] = [
    {
      id: "warm",
      name: "Warm the instrument",
      detail: "Log a session today",
      href: "/studio/training",
      done: trainedToday,
    },
    {
      id: "take",
      name: "One honest take",
      detail: "Tick a tape step",
      href: "/studio/tapes",
      done: takeToday,
    },
    {
      id: "file",
      name: "Keep the file alive",
      detail: "Add a note or a role",
      href: "/studio/notes",
      done: fileToday,
    },
  ];
  const booked = state.auditions.filter((a) => a.status === "Booked").length;
  const callbacks = state.auditions.filter((a) => a.status === "Callback" || a.status === "Booked").length;
  const tapeDone = state.tapes.filter(
    (t) => t.checklist.length > 0 && t.checklist.every((c) => c.done),
  ).length;
  const weekMins = state.training
    .filter((t) => daysAgo(t.date) <= 7)
    .reduce((s, t) => s + t.minutes, 0);
  const streakDays = (() => {
    const days = new Set(state.training.map((t) => t.date));
    events
      .filter((e) => e.kind === "train")
      .forEach((e) => days.add(new Date(e.at).toISOString().slice(0, 10)));
    let n = 0;
    const now = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (days.has(key)) n += 1;
      else if (i > 0) break;
    }
    return n;
  })();

  const marks: MarkDef[] = [
    {
      id: "first-sides",
      name: "Sides on the desk",
      detail: "Log the first audition",
      earned: state.auditions.length >= 1,
    },
    {
      id: "first-take",
      name: "Press record",
      detail: "Open a self-tape checklist",
      earned: state.tapes.length >= 1,
    },
    {
      id: "inner-life",
      name: "Inner life",
      detail: "Write the first character file",
      earned: state.notes.length >= 1,
    },
    {
      id: "instrument",
      name: "The instrument",
      detail: "Log a training session",
      earned: state.training.length >= 1,
    },
    {
      id: "callback",
      name: "They called back",
      detail: "Move a role to callback",
      earned: callbacks >= 1,
    },
    {
      id: "booked",
      name: "Booked",
      detail: "Hold a role",
      earned: booked >= 1,
    },
    {
      id: "full-tape",
      name: "Two takes in the can",
      detail: "Finish a tape checklist",
      earned: tapeDone >= 1,
    },
    {
      id: "week-one",
      name: "Seven days",
      detail: "Keep a training streak of 7",
      earned: streakDays >= 7,
    },
    {
      id: "hour-floor",
      name: "Hour on the floor",
      detail: "Train 60 minutes in a week",
      earned: weekMins >= 60,
    },
    {
      id: "five-roles",
      name: "Five in play",
      detail: "Hold five auditions on the board",
      earned: state.auditions.length >= 5,
    },
    {
      id: "the-book",
      name: "The book",
      detail: "Keep twelve living notes",
      earned: state.notes.length >= 12,
    },
    {
      id: "daily-clean",
      name: "Clean sides",
      detail: "Clear all three daily missions in a day",
      earned: events.some((_, i, all) => {
        const e = all[i];
        const start = dayStart(e.at);
        const end = start + 86400000;
        const slice = all.filter((x) => x.at >= start && x.at < end);
        const train = slice.some((x) => x.kind === "train");
        const take = slice.some((x) => x.kind === "tape.step" || x.kind === "tape.done");
        const file = slice.some(
          (x) => x.kind === "note.add" || x.kind === "audition.add" || x.kind === "audition.submit",
        );
        return train && take && file;
      }),
    },
  ];

  const weeklies: WeeklyQuest[] = [
    {
      id: "days",
      name: "Three training days",
      detail: "Rhythm beats a heroic Sunday",
      current: Math.min(3, trainDays.size),
      goal: 3,
    },
    {
      id: "steps",
      name: "Five tape steps",
      detail: "The craft room, used",
      current: Math.min(5, weekEvents.filter((e) => e.kind === "tape.step").length),
      goal: 5,
    },
    {
      id: "move",
      name: "One status move",
      detail: "Submit, callback, or book",
      current: Math.min(
        1,
        weekEvents.filter((e) =>
          e.kind === "audition.submit" || e.kind === "audition.callback" || e.kind === "audition.book",
        ).length,
      ),
      goal: 1,
    },
  ];

  return {
    xp,
    weekXp,
    todayXp,
    rank: rankFor(xp),
    marks,
    dailies,
    weeklies,
    dailyDone: dailies.filter((d) => d.done).length,
    streak: streakDays,
  };
}

export function craftLine(kind: CraftKind, extra = 0) {
  return `+${xpFor(kind, extra)} craft`;
}
