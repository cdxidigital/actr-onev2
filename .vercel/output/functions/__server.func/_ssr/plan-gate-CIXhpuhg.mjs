import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as PLANS } from "./plans-BJOrJyUj.mjs";
import { x as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plan-gate-CIXhpuhg.js
var import_jsx_runtime = require_jsx_runtime();
function PlanGate({ title, description, need = "studio" }) {
	const plan = PLANS[need];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-dashed border-border bg-card px-5 py-10 text-center shadow-soft md:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
				children: plan.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-2 text-3xl tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-fg",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pricing",
						search: { highlight: need },
						children: [
							"See ",
							plan.name,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						children: "Compare plans"
					})
				})]
			})
		]
	});
}
function LimitToastCopy(kind) {
	return {
		audition: "Call Sheet holds 8 live roles. Archive one, or move to Studio for an open board.",
		note: "Call Sheet holds 6 character files. Studio is unlimited notes.",
		tape: "Call Sheet holds 3 self-tape checklists. Studio lifts the cap."
	}[kind];
}
//#endregion
export { PlanGate as n, LimitToastCopy as t };
