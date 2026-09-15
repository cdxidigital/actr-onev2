import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as AUDITION_STATUSES, o as useEntitlements, s as useOsStore } from "./router-ByLt-HX2.mjs";
import { n as PlanGate } from "./plan-gate-CIXhpuhg.mjs";
import { n as PageHead } from "./page-head-uYu-SD86.mjs";
import { a as trainingStreak, r as healthScore, s as weekBars } from "./health-C1SyHF50.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-TGq30yOH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsPage() {
	const state = useOsStore();
	const { canAnalytics, loading } = useEntitlements();
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const h = (0, import_react.useMemo)(() => healthScore(state), [state]);
	const mix = AUDITION_STATUSES.map((s) => ({
		name: s.slice(0, 3),
		full: s,
		n: state.auditions.filter((a) => a.status === s).length
	}));
	const week = weekBars(state).map((b) => ({
		...b,
		name: b.label
	}));
	const booked = state.auditions.filter((a) => a.status === "Booked").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: "Signal",
			title: "Analytics",
			description: "Not vanity charts. A readable picture of how you actually work."
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-xl bg-muted" }) : !canAnalytics ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanGate, {
			title: "See the week, not just the next call.",
			description: "Call Sheet keeps health on the overview. Studio opens pipeline mix, craft minutes, and the breakdown that tells you where the instrument actually is."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						kicker: "Health",
						value: String(h.total),
						detail: "Weighted across craft and pipeline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						kicker: "Booked",
						value: String(booked),
						detail: "Roles currently held"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						kicker: "Streak",
						value: `${trainingStreak(state)}d`,
						detail: `${state.notes.length} living character files`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-5 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
							children: "Pipeline mix"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-1 text-2xl tracking-tight",
							children: "Where the work sits"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-56",
							children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: mix,
									margin: {
										top: 8,
										right: 4,
										left: 0,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "var(--border)",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											tick: {
												fill: "var(--muted-fg)",
												fontSize: 12
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											allowDecimals: false,
											tick: {
												fill: "var(--muted-fg)",
												fontSize: 12
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											cursor: { fill: "color-mix(in oklab, var(--accent) 10%, transparent)" },
											contentStyle: {
												background: "var(--card)",
												border: "1px solid var(--border)",
												borderRadius: 12,
												color: "var(--fg)"
											},
											formatter: (value) => [Number(value ?? 0), "roles"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "n",
											fill: "var(--accent)",
											radius: [
												4,
												4,
												0,
												0
											]
										})
									]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-md bg-muted" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-5 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
							children: "Craft minutes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-1 text-2xl tracking-tight",
							children: "Last seven days"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-56",
							children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: week,
									margin: {
										top: 8,
										right: 4,
										left: 0,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "var(--border)",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											tick: {
												fill: "var(--muted-fg)",
												fontSize: 12
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											allowDecimals: false,
											tick: {
												fill: "var(--muted-fg)",
												fontSize: 12
											},
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											cursor: { fill: "color-mix(in oklab, var(--accent) 10%, transparent)" },
											contentStyle: {
												background: "var(--card)",
												border: "1px solid var(--border)",
												borderRadius: 12,
												color: "var(--fg)"
											},
											formatter: (value) => [Number(value ?? 0), "minutes"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "mins",
											fill: "var(--accent)",
											radius: [
												4,
												4,
												0,
												0
											]
										})
									]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-md bg-muted" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
						children: "Breakdown"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-1 text-2xl tracking-tight",
						children: "Health ingredients"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3 sm:grid-cols-3",
						children: [
							[
								"Consistency",
								h.consistency,
								"Training rhythm and streak"
							],
							[
								"Readiness",
								h.readiness,
								"Tape progress and notes"
							],
							[
								"Momentum",
								h.momentum,
								"Live roles and bookings"
							]
						].map(([label, value, detail]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md bg-muted px-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-fg",
									children: label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display mt-1 text-3xl tracking-tight tabular-nums",
									children: value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-fg",
									children: detail
								})
							]
						}, String(label)))
					})
				]
			})
		] })]
	});
}
function Stat({ kicker, value, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-lg font-semibold tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-fg",
				children: detail
			})
		]
	});
}
//#endregion
export { AnalyticsPage as component };
