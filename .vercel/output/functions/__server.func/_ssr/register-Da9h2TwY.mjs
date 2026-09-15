import { b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as PLANS } from "./plans-BJOrJyUj.mjs";
import { r as Route$10 } from "./router-ByLt-HX2.mjs";
import { a as useAuthView } from "./gates-CA7xeqkI.mjs";
import { t as MarketingPage } from "./marketing-shell-o79zAWrF.mjs";
import { n as RegisterForm, r as SocialButtons } from "./auth-panel-BV-rs65s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-Da9h2TwY.js
var import_jsx_runtime = require_jsx_runtime();
function Register() {
	const { plan } = Route$10.useSearch();
	const { signedIn, user } = useAuthView();
	if (signedIn && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/studio",
		search: plan === "studio" || plan === "pro" ? { upgrade: plan } : {}
	});
	const intended = plan ? PLANS[plan] : PLANS.free;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingPage, {
		current: "register",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto grid min-h-[70svh] max-w-md content-center px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.18em] text-accent",
					children: intended.id === "free" ? "Create account" : `Start ${intended.name}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-3 text-4xl tracking-tight",
					children: "Take the desk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-fg",
					children: intended.id === "free" ? "Call Sheet is free. Eight live roles, notes, tapes, and three coach asks a month — no card." : `You'll land on ${intended.name} after this. Nothing is charged in this preview.`
				}),
				signedIn && !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-40 animate-pulse rounded-xl bg-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialButtons, { plan }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-fg",
							children: "or email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterForm, { plan })
					]
				})
			]
		})
	});
}
//#endregion
export { Register as component };
