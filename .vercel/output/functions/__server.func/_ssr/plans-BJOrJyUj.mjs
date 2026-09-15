import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plans-BJOrJyUj.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-B40BzJxt.mjs").then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-moD-vTfO.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var PLAN_IDS = [
	"free",
	"studio",
	"pro"
];
var BILLING_INTERVALS = ["monthly", "yearly"];
var PLANS = {
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
			"Studio Light and Carbon Noir",
			"3 coach asks each month"
		]
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
		themes: [
			"studio",
			"noir",
			"cobalt",
			"daylight",
			"greenroom"
		],
		analytics: true,
		arrange: true,
		featured: true,
		features: [
			"Unlimited auditions, tapes, notes, training",
			"Five looks and a modular command center",
			"Full analytics — pipeline mix and craft minutes",
			"20 coach asks each month",
			"Everything in Call Sheet"
		]
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
		themes: [
			"studio",
			"noir",
			"cobalt",
			"daylight",
			"greenroom"
		],
		analytics: true,
		arrange: true,
		features: [
			"80 coach asks each month",
			"Deeper board reads",
			"Everything in Studio"
		]
	}
};
var PLAN_LABEL = {
	free: "Free",
	studio: "Studio",
	pro: "Pro"
};
function isPlanId(value) {
	return PLAN_IDS.includes(value);
}
function isBillingInterval(value) {
	return BILLING_INTERVALS.includes(value);
}
function liveAuditionCount(auditions) {
	return auditions.filter((a) => a.status !== "Closed" && a.status !== "Booked").length;
}
function priceLabel(plan, interval) {
	if (plan.monthly === 0) return "Free";
	if (interval === "yearly") return `$${plan.yearly}/year`;
	return `$${plan.monthly}/mo`;
}
function yearlySave(plan) {
	if (plan.monthly === 0) return 0;
	return plan.monthly * 12 - plan.yearly;
}
function formatLimit(n) {
	return Number.isFinite(n) ? String(n) : "Unlimited";
}
function coachPeriodNow() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}
function withCoachWindow(row) {
	const period = coachPeriodNow();
	const count = row.coachPeriod !== period ? 0 : row.coachCount;
	const limit = PLANS[row.plan].coach;
	return {
		userId: row.userId,
		plan: row.plan,
		billingInterval: row.billingInterval,
		displayName: row.displayName,
		coachCount: count,
		coachPeriod: period,
		coachRemaining: Math.max(0, limit - count),
		coachLimit: limit
	};
}
//#endregion
export { coachPeriodNow as a, isPlanId as c, withCoachWindow as d, yearlySave as f, authMiddleware as i, liveAuditionCount as l, PLAN_IDS as n, formatLimit as o, PLAN_LABEL as r, isBillingInterval as s, PLANS as t, priceLabel as u };
