import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as formatLimit, u as priceLabel } from "./plans-BJOrJyUj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useAccount, o as useEntitlements, s as useOsStore } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { n as PageHead } from "./page-head-uYu-SD86.mjs";
import { t as Input } from "./input-D10Dt2gF.mjs";
import { t as Label } from "./label-DpXd25sS.mjs";
import { t as ThemeGrid } from "./theme-picker-BBanNJ4_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Bc1epp92.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const profile = useOsStore((s) => s.profile);
	const setProfile = useOsStore((s) => s.setProfile);
	const resetDemo = useOsStore((s) => s.resetDemo);
	const resetDashboard = useOsStore((s) => s.resetDashboard);
	const { account, plan } = useAccount();
	const { live } = useEntitlements();
	const [name, setName] = (0, import_react.useState)(profile.name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: "Studio",
				title: "Settings",
				description: "The board lives on this device. Plan and coach quota live on your account."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "max-w-lg rounded-xl border border-border bg-card p-5 shadow-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (e) => {
						e.preventDefault();
						setProfile({
							name: name.trim() || profile.name,
							plan: profile.plan
						});
						toast.success("Profile saved");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => {
								resetDemo();
								setName("Jordan Mitchell");
								toast.success("Demo board restored");
							},
							children: "Reset demo data"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Save profile"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-lg rounded-xl border border-border bg-card p-5 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
						children: "Plan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-1 text-2xl tracking-tight",
						children: plan.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-fg",
						children: [priceLabel(plan, account?.billingInterval ?? "monthly"), account?.billingInterval === "yearly" && plan.monthly > 0 ? " · yearly" : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-fg",
									children: "Live roles"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "tabular-nums",
									children: [
										live,
										" / ",
										formatLimit(plan.liveAuditions)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-fg",
									children: "Coach this month"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums",
									children: account ? `${account.coachCount} / ${account.coachLimit}` : `0 / ${plan.coach}`
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-fg",
									children: "Analytics"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: plan.analytics ? "On" : "Studio" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pricing",
							children: "Change plan"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-2xl rounded-xl border border-border bg-card p-5 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
						children: "Look"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-1 text-2xl tracking-tight",
						children: "Themes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-fg",
						children: "Call Sheet includes Studio Light and Carbon Noir. Studio unlocks the rest."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeGrid, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-lg rounded-xl border border-border bg-card p-5 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
						children: "Overview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-1 text-2xl tracking-tight",
						children: "Dashboard layout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-fg",
						children: "Reorder and hide modules from the command center. Arrange is a Studio feature."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						className: "mt-4",
						onClick: () => {
							resetDashboard();
							toast.success("Dashboard restored");
						},
						children: "Reset dashboard layout"
					})
				]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
