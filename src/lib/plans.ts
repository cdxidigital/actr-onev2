import type { Audition, ThemeName } from "@/lib/os-types";

export const PLAN_IDS = ["free", "studio", "pro"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export const BILLING_INTERVALS = ["monthly", "yearly"] as const;
export type BillingInterval = (typeof BILLING_INTERVALS)[number];

export type PlanDef = {
  id: PlanId;
  name: string;
  eyebrow: string;
  tagline: string;
  monthly: number;
  yearly: number;
  liveAuditions: number;
  notes: number;
  tapes: number;
  coach: number;
  coachTokens: number;
  themes: readonly ThemeName[];
  analytics: boolean;
  arrange: boolean;
  featured?: boolean;
  features: string[];
};

export const PLANS: Record<PlanId, PlanDef> = {
  free: {
    id: "free",
    name: "Call Sheet",
    eyebrow: "Free forever",
    tagline: "The daily desk while you build the habit.",
    monthly: 0,
    yearly: 0,
    liveAuditions: 8,
    notes: 6,
    tapes: 3,
    coach: 3,
    coachTokens: 420,
    themes: ["studio", "noir"],
    analytics: false,
    arrange: false,
    features: [
      "8 live roles on the board",
      "6 character notes",
      "3 self-tape checklists",
      "Career health, computed from the work",
      "The run — ranks, daily sides, marks",
      "Studio Light and Carbon Noir",
      "3 coach asks each month",
    ],
  },
  studio: {
    id: "studio",
    name: "Studio",
    eyebrow: "Working actor",
    tagline: "Unlimited pipeline, every look, a coach that has read the board.",
    monthly: 14,
    yearly: 140,
    liveAuditions: Number.POSITIVE_INFINITY,
    notes: Number.POSITIVE_INFINITY,
    tapes: Number.POSITIVE_INFINITY,
    coach: 20,
    coachTokens: 420,
    themes: ["studio", "noir", "cobalt", "daylight", "greenroom"],
    analytics: true,
    arrange: true,
    featured: true,
    features: [
      "Unlimited auditions, tapes, notes, training",
      "Five looks and a modular command center",
      "Full analytics — pipeline mix and craft minutes",
      "The run, with a longer week in view",
      "20 coach asks each month",
      "Everything in Call Sheet",
    ],
  },
  pro: {
    id: "pro",
    name: "Pro",
    eyebrow: "Busy desk",
    tagline: "The coach as a rehearsal partner. Deeper reads, more asks.",
    monthly: 28,
    yearly: 280,
    liveAuditions: Number.POSITIVE_INFINITY,
    notes: Number.POSITIVE_INFINITY,
    tapes: Number.POSITIVE_INFINITY,
    coach: 80,
    coachTokens: 720,
    themes: ["studio", "noir", "cobalt", "daylight", "greenroom"],
    analytics: true,
    arrange: true,
    features: [
      "80 coach asks each month",
      "Deeper board reads",
      "Everything in Studio",
    ],
  },
};

export const PLAN_LABEL: Record<PlanId, "Free" | "Studio" | "Pro"> = {
  free: "Free",
  studio: "Studio",
  pro: "Pro",
};

export function isPlanId(value: unknown): value is PlanId {
  return (PLAN_IDS as readonly string[]).includes(value as string);
}

export function isBillingInterval(value: unknown): value is BillingInterval {
  return (BILLING_INTERVALS as readonly string[]).includes(value as string);
}

export function liveAuditionCount(auditions: Audition[]) {
  return auditions.filter((a) => a.status !== "Closed" && a.status !== "Booked").length;
}

export function priceLabel(plan: PlanDef, interval: BillingInterval) {
  if (plan.monthly === 0) return "Free";
  if (interval === "yearly") return `$${plan.yearly}/year`;
  return `$${plan.monthly}/mo`;
}

export function yearlySave(plan: PlanDef) {
  if (plan.monthly === 0) return 0;
  return plan.monthly * 12 - plan.yearly;
}

export function formatLimit(n: number) {
  return Number.isFinite(n) ? String(n) : "Unlimited";
}

export function coachPeriodNow() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function coachQuotaCopy(plan: PlanId, limit: number) {
  if (plan === "free") {
    return `Call Sheet includes ${limit} coach asks a month. Studio lifts that to 20.`;
  }
  if (plan === "studio") {
    return `Studio includes ${limit} asks a month. Pro is 80, with a longer read.`;
  }
  return `That's all ${limit} Pro asks for this month.`;
}

export type Account = {
  userId: string;
  plan: PlanId;
  billingInterval: BillingInterval;
  displayName: string | null;
  coachCount: number;
  coachPeriod: string;
  coachRemaining: number;
  coachLimit: number;
};

export function withCoachWindow(row: {
  plan: PlanId;
  billingInterval: BillingInterval;
  displayName: string | null;
  coachCount: number;
  coachPeriod: string;
  userId: string;
}): Account {
  const period = coachPeriodNow();
  const reset = row.coachPeriod !== period;
  const count = reset ? 0 : row.coachCount;
  const limit = PLANS[row.plan].coach;
  return {
    userId: row.userId,
    plan: row.plan,
    billingInterval: row.billingInterval,
    displayName: row.displayName,
    coachCount: count,
    coachPeriod: period,
    coachRemaining: Math.max(0, limit - count),
    coachLimit: limit,
  };
}
