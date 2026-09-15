import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Audition,
  CoachMessage,
  DashboardModuleId,
  OsState,
  ScriptNote,
  Tape,
  ThemeName,
  TrainingLog,
} from "@/lib/os-types";
import { appendCraft, EMPTY_CRAFT, normalizeCraft } from "@/lib/craft";
import { DEFAULT_DASHBOARD, isTheme, normalizeDashboard } from "@/lib/os-types";
import { uid } from "@/lib/utils";

export const DEFAULT_ACTOR = "Actor";

const EMPTY_COACH: OsState["coach"] = [
  {
    id: "m0",
    from: "ai",
    text: "Your board is empty. Add a role, log a session, or ask for a first-week plan.",
  },
];

const SEED: OsState = {
  profile: { name: DEFAULT_ACTOR, plan: "Free" },
  theme: "studio",
  dashboard: DEFAULT_DASHBOARD,
  auditions: [],
  tapes: [],
  notes: [],
  training: [],
  coach: EMPTY_COACH,
  craft: EMPTY_CRAFT,
};

type Actions = {
  setTheme: (theme: ThemeName) => void;
  setProfile: (profile: OsState["profile"]) => void;
  setDashboardOrder: (order: DashboardModuleId[]) => void;
  toggleDashboardModule: (id: DashboardModuleId) => void;
  resetDashboard: () => void;
  upsertAudition: (audition: Audition) => void;
  deleteAudition: (id: string) => void;
  upsertNote: (note: ScriptNote) => void;
  deleteNote: (id: string) => void;
  addTraining: (log: TrainingLog) => void;
  deleteTraining: (id: string) => void;
  addTape: (tape: Tape) => void;
  toggleCheck: (tapeId: string, checkId: string) => void;
  addCheck: (tapeId: string, label: string) => void;
  pushCoach: (messages: CoachMessage[]) => void;
  clearBoard: () => void;
  seeCraft: (marks: string[], rank: string) => void;
};

export const useOsStore = create<OsState & Actions>()(
  persist(
    (set) => ({
      ...SEED,
      setTheme: (theme) => set({ theme: isTheme(theme) ? theme : "studio" }),
      setProfile: (profile) => set({ profile }),
      setDashboardOrder: (order) =>
        set((s) => ({ dashboard: normalizeDashboard({ ...s.dashboard, order }) })),
      toggleDashboardModule: (id) =>
        set((s) => {
          const hidden = s.dashboard.hidden.includes(id)
            ? s.dashboard.hidden.filter((h) => h !== id)
            : [...s.dashboard.hidden, id];
          return { dashboard: normalizeDashboard({ ...s.dashboard, hidden }) };
        }),
      resetDashboard: () => set({ dashboard: DEFAULT_DASHBOARD }),
      upsertAudition: (audition) =>
        set((s) => {
          const idx = s.auditions.findIndex((a) => a.id === audition.id);
          const next = [...s.auditions];
          let craft = s.craft;
          if (idx >= 0) {
            const prev = next[idx];
            next[idx] = audition;
            if (prev.status !== audition.status) {
              if (audition.status === "Submitted") craft = appendCraft(craft, "audition.submit", audition.id);
              if (audition.status === "Callback") craft = appendCraft(craft, "audition.callback", audition.id);
              if (audition.status === "Booked") craft = appendCraft(craft, "audition.book", audition.id);
            }
          } else {
            next.unshift(audition);
            craft = appendCraft(craft, "audition.add", audition.id);
            if (audition.status === "Submitted") craft = appendCraft(craft, "audition.submit", audition.id);
            if (audition.status === "Callback") craft = appendCraft(craft, "audition.callback", audition.id);
            if (audition.status === "Booked") craft = appendCraft(craft, "audition.book", audition.id);
          }
          return { auditions: next, craft };
        }),
      deleteAudition: (id) =>
        set((s) => ({
          auditions: s.auditions.filter((a) => a.id !== id),
          tapes: s.tapes.map((t) => (t.auditionId === id ? { ...t, auditionId: null } : t)),
        })),
      upsertNote: (note) =>
        set((s) => {
          const idx = s.notes.findIndex((n) => n.id === note.id);
          const next = [...s.notes];
          if (idx >= 0) {
            next[idx] = note;
            return { notes: next };
          }
          next.unshift(note);
          return { notes: next, craft: appendCraft(s.craft, "note.add", note.id) };
        }),
      deleteNote: (id) =>
        set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
      addTraining: (log) =>
        set((s) => ({
          training: [log, ...s.training],
          craft: appendCraft(s.craft, "train", log.id, log.minutes),
        })),
      deleteTraining: (id) =>
        set((s) => ({ training: s.training.filter((t) => t.id !== id) })),
      addTape: (tape) =>
        set((s) => ({
          tapes: [tape, ...s.tapes],
          craft: appendCraft(s.craft, "tape.add", tape.id),
        })),
      toggleCheck: (tapeId, checkId) =>
        set((s) => {
          const tape = s.tapes.find((t) => t.id === tapeId);
          const item = tape?.checklist.find((c) => c.id === checkId);
          const becomingDone = item ? !item.done : false;
          const tapes = s.tapes.map((t) =>
            t.id !== tapeId
              ? t
              : {
                  ...t,
                  checklist: t.checklist.map((c) =>
                    c.id === checkId ? { ...c, done: !c.done } : c,
                  ),
                },
          );
          const nextTape = tapes.find((t) => t.id === tapeId);
          let craft = s.craft;
          if (becomingDone) {
            craft = appendCraft(craft, "tape.step", checkId);
            if (
              nextTape &&
              nextTape.checklist.length > 0 &&
              nextTape.checklist.every((c) => c.done)
            ) {
              craft = appendCraft(craft, "tape.done", tapeId);
            }
          }
          return { tapes, craft };
        }),
      addCheck: (tapeId, label) =>
        set((s) => ({
          tapes: s.tapes.map((t) =>
            t.id !== tapeId
              ? t
              : {
                  ...t,
                  checklist: [...t.checklist, { id: uid("c"), label, done: false }],
                },
          ),
        })),
      pushCoach: (messages) =>
        set((s) => {
          let craft = s.craft;
          for (const m of messages) {
            if (m.from === "me") craft = appendCraft(craft, "coach.ask", m.id);
          }
          return { coach: [...s.coach, ...messages], craft };
        }),
      clearBoard: () =>
        set((s) => ({
          auditions: [],
          tapes: [],
          notes: [],
          training: [],
          coach: EMPTY_COACH,
          craft: EMPTY_CRAFT,
          profile: s.profile,
          theme: s.theme,
          dashboard: s.dashboard,
        })),
      seeCraft: (marks, rank) =>
        set((s) => ({
          craft: { ...s.craft, seenMarks: marks, seenRank: rank },
        })),
    }),
    {
      name: "actr-one-os-v3:guest",
      skipHydration: true,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<OsState>;
        const merged = {
          ...current,
          ...p,
          theme: isTheme(p.theme) ? p.theme : current.theme,
          dashboard: normalizeDashboard(p.dashboard),
        };
        return {
          ...merged,
          craft: normalizeCraft(p.craft, merged),
        };
      },
    },
  ),
);

export function seedOs(): OsState {
  return structuredClone(SEED);
}

export function isEmptyBoard(state: Pick<OsState, "auditions" | "tapes" | "notes" | "training">) {
  return (
    state.auditions.length === 0 &&
    state.tapes.length === 0 &&
    state.notes.length === 0 &&
    state.training.length === 0
  );
}
