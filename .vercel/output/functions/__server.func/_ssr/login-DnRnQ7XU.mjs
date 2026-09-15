import { b as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useAuthView } from "./gates-CA7xeqkI.mjs";
import { t as MarketingPage } from "./marketing-shell-o79zAWrF.mjs";
import { r as SocialButtons, t as LoginForm } from "./auth-panel-BV-rs65s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DnRnQ7XU.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { signedIn, user } = useAuthView();
	if (signedIn && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/studio" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingPage, {
		current: "login",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto grid min-h-[70svh] max-w-md content-center px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.18em] text-accent",
					children: "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-3 text-4xl tracking-tight",
					children: "Back to the desk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-fg",
					children: "Google, X, or the email you registered. Your plan lives on the account; the board lives on this device."
				}),
				signedIn && !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-40 animate-pulse rounded-xl bg-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialButtons, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-fg",
							children: "or email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {})
					]
				})
			]
		})
	});
}
//#endregion
export { Login as component };
