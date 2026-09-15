import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as yearlySave, n as PLAN_IDS, t as PLANS, u as priceLabel } from "./plans-BJOrJyUj.mjs";
import { v as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useAccount, c as cn, w as useCurrentUserState } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-table-C-1ATXHo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PricingTable({ highlight, compact = false }) {
	const [interval, setInterval] = (0, import_react.useState)("monthly");
	const { user, isPending } = useCurrentUserState();
	const { account, activate, loading } = useAccount();
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function choose(id) {
		if (isPending) return;
		if (!user) {
			navigate({
				to: "/register",
				search: id === "free" ? {} : { plan: id }
			});
			return;
		}
		if (account?.plan === id) {
			navigate({ to: "/studio" });
			return;
		}
		setBusy(id);
		try {
			await activate(id, id === "free" ? "monthly" : interval);
			toast.success(id === "free" ? "Back on Call Sheet." : `${PLANS[id].name} is live on this account.`);
			navigate({ to: "/studio" });
		} catch {
			toast.error("Could not change the plan. Try again.");
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inline-flex rounded-lg border border-border bg-card p-1",
				children: ["monthly", "yearly"].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("h-10 rounded-md px-4 text-sm", interval === opt ? "bg-fg text-bg" : "text-muted-fg hover:text-fg"),
					onClick: () => setInterval(opt),
					children: opt === "monthly" ? "Monthly" : "Yearly"
				}, opt))
			}), interval === "yearly" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-fg",
				children: "Two months free on Studio and Pro."
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4 lg:grid-cols-3",
			children: PLAN_IDS.map((id) => {
				const plan = PLANS[id];
				const current = account?.plan === id;
				const featured = plan.featured || highlight === id;
				const save = yearlySave(plan);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: cn("flex flex-col rounded-xl border bg-card p-6 shadow-soft", featured ? "border-accent ring-2 ring-accent/20" : "border-border"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
							children: plan.eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display mt-2 text-3xl tracking-tight",
							children: plan.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 min-h-10 text-sm text-muted-fg",
							children: plan.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 font-display text-4xl tracking-tight tabular-nums",
							children: priceLabel(plan, interval)
						}),
						plan.monthly > 0 && interval === "yearly" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-fg",
							children: [
								"Save $",
								save,
								" versus monthly."
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-fg",
							children: plan.monthly === 0 ? "No card. Keep the board on this device." : "Cancel whenever the season ends."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 grid flex-1 gap-2",
							children: plan.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "mt-0.5 size-4 shrink-0 text-accent",
									strokeWidth: 1.75
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
							}, f))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6",
							variant: featured ? "default" : "outline",
							disabled: busy !== null || loading && !account,
							onClick: () => void choose(id),
							children: busy === id ? "Activating…" : current ? "This is your plan" : !user ? id === "free" ? "Get Call Sheet" : `Start ${plan.name}` : id === "free" ? "Switch to Call Sheet" : `Activate ${plan.name}`
						})
					]
				}, id);
			})
		}),
		!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-center text-sm text-muted-fg",
			children: [
				"Plans apply to this account instantly in preview — nothing is charged here.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/register",
					className: "text-fg underline-offset-4 hover:underline",
					children: "Create a Call Sheet"
				}),
				" ",
				"to keep the desk."
			]
		}) : null
	] });
}
//#endregion
export { PricingTable as t };
