import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { a as useAuthView, i as UserButton, n as BrandLockup, t as AuthPulse } from "./gates-CA7xeqkI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketing-shell-o79zAWrF.js
var import_jsx_runtime = require_jsx_runtime();
function MarketingNav({ current }) {
	const { signedIn, user, resolving } = useAuthView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "site-header sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-bg/85 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "flex min-w-0 shrink-0 items-center rounded-sm transition-opacity duration-150 hover:opacity-80",
			"aria-label": "actr.one home",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, { size: "header" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1 sm:gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					className: "hidden sm:inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/#desk",
						children: "The desk"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					className: "hidden md:inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/#stages",
						children: "Stages"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: current === "pricing" ? "subtle" : "ghost",
					size: "sm",
					className: "hidden sm:inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						children: "Plans"
					})
				}),
				signedIn ? resolving || !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPulse, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						children: "Open studio"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [current !== "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Sign in"
					})
				}) : null, current !== "register" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						children: "Get Call Sheet"
					})
				}) : null] })
			]
		})]
	});
}
function MarketingFooter() {
	const { signedIn } = useAuthView();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "site-footer border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, {
				alt: "actr.one",
				size: "footer"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-sm text-sm text-muted-fg",
				children: "From first self-tape to a full book. Call Sheet is free. Studio is the live pipeline. Pro is the coach you use every week."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-muted-fg hover:text-fg",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						className: "text-muted-fg hover:text-fg",
						children: "Plans"
					}),
					signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						className: "text-muted-fg hover:text-fg",
						children: "Studio"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "text-muted-fg hover:text-fg",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						className: "text-muted-fg hover:text-fg",
						children: "Create account"
					})] })
				]
			})]
		})
	});
}
function MarketingPage({ children, current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingNav, { current }),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingFooter, {})
		]
	});
}
//#endregion
export { MarketingPage as t };
