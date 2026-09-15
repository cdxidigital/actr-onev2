import type { CraftState } from "@/lib/craft";

export const AUDITION_STATUSES = [
  "New",
  "Preparing",
  "Confirmed",
  "Submitted",
  "Callback",
  "Booked",
  "Closed",
] as const;

export type AuditionStatus = (typeof AUDITION_STATUSES)[number];

export const AUDITION_TYPES = [
  "Self-tape",
  "In-person",
  "Callback",
  "Chemistry",
] as const;

export type AuditionType = (typeof AUDITION_TYPES)[number];

export const TRAINING_KINDS = [
  "Scene study",
  "Voice",
  "Physicality",
  "Camera",
  "Cold read",
] as const;

export type TrainingKind = (typeof TRAINING_KINDS)[number];

export const THEMES = ["studio", "noir", "cobalt", "daylight", "greenroom"] as const;
export type ThemeName = (typeof THEMES)[number];

export const THEME_META: Record<
  ThemeName,
  { label: string; detail: string; dark: boolean }
> = {
  studio: {
    label: "Studio Light",
    detail: "Warm paper, cobalt ink",
    dark: false,
  },
  noir: {
    label: "Carbon Noir",
    detail: "Deep work, tungsten",
    dark: true,
  },
  cobalt: {
    label: "Electric Cobalt",
    detail: "Night desk, high signal",
    dark: true,
  },
  daylight: {
    label: "Daylight Call",
    detail: "Cool sides, morning teal",
    dark: false,
  },
  greenroom: {
    label: "Green Room",
    detail: "Backstage olive, lime tungsten",
    dark: true,
  },
};

export function isTheme(value: unknown): value is ThemeName {
  return (THEMES as readonly string[]).includes(value as string);
}

export const DASHBOARD_MODULES = [
  { id: "focus", label: "Today's focus", span: "full" },
  { id: "craft", label: "The run", span: "full" },
  { id: "stats", label: "Pulse", span: "full" },
  { id: "health", label: "Career health", span: "half" },
  { id: "next", label: "Next move", span: "half" },
  { id: "pipeline", label: "Audition board", span: "full" },
  { id: "upcoming", label: "Upcoming", span: "half" },
  { id: "coach", label: "Career coach", span: "half" },
  { id: "rhythm", label: "This week", span: "half" },
] as const;

export type DashboardModuleId = (typeof DASHBOARD_MODULES)[number]["id"];

export type DashboardLayout = {
  order: DashboardModuleId[];
  hidden: DashboardModuleId[];
};

export const DEFAULT_DASHBOARD: DashboardLayout = {
  order: DASHBOARD_MODULES.map((m) => m.id),
  hidden: [],
};

export function normalizeDashboard(input?: Partial<DashboardLayout> | null): DashboardLayout {
  const known = DASHBOARD_MODULES.map((m) => m.id);
  const seen = new Set<DashboardModuleId>();
  const order: DashboardModuleId[] = [];
  for (const id of [...(input?.order ?? []), ...known]) {
    if (!known.includes(id) || seen.has(id)) continue;
    seen.add(id);
    order.push(id);
  }
  const hidden = [...new Set((input?.hidden ?? []).filter((id) => seen.has(id)))];
  return { order, hidden };
}

export type Audition = {
  id: string;
  title: string;
  role: string;
  type: AuditionType;
  date: string;
  time: string;
  status: AuditionStatus;
  notes: string;
};

export type CheckItem = { id: string; label: string; done: boolean };

export type Tape = {
  id: string;
  auditionId: string | null;
  title: string;
  due: string;
  checklist: CheckItem[];
};

export type ScriptNote = {
  id: string;
  title: string;
  body: string;
  updated: number;
};

export type TrainingLog = {
  id: string;
  title: string;
  kind: TrainingKind;
  minutes: number;
  date: string;
};

export type CoachMessage = {
  id: string;
  from: "me" | "ai" | "sys";
  text: string;
};

export type Profile = {
  name: string;
  plan: "Free" | "Studio" | "Pro";
};

export type OsState = {
  profile: Profile;
  theme: ThemeName;
  dashboard: DashboardLayout;
  auditions: Audition[];
  tapes: Tape[];
  notes: ScriptNote[];
  training: TrainingLog[];
  coach: CoachMessage[];
  craft: CraftState;
};
