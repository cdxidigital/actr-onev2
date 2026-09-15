import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-IYuMUV8b.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { t as Input } from "./input-D10Dt2gF.mjs";
import { t as Label } from "./label-DpXd25sS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-panel-BV-rs65s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function callbackFor(plan) {
	if (plan === "studio" || plan === "pro") return `/studio?upgrade=${plan}`;
	return "/studio";
}
function SocialButtons({ plan }) {
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			disabled: busy !== null,
			onClick: () => {
				setError(null);
				setBusy(p.providerId);
				signIn(p.providerId, {
					callbackURL: callbackFor(plan),
					errorCallbackURL: "/login"
				}).catch((err) => {
					setBusy(null);
					setError(err instanceof Error ? err.message : "Sign-in failed");
				});
			},
			children: ["Continue with ", p.label]
		}, p.providerId)), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-warn",
			children: error
		}) : null]
	});
}
function RegisterForm({ plan }) {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		const { error: err } = await authClient.signUp.email({
			name: name.trim(),
			email: email.trim(),
			password,
			callbackURL: callbackFor(plan)
		});
		if (err) {
			setBusy(false);
			setError(err.message ?? "Could not create the account.");
			return;
		}
		navigate({
			to: "/studio",
			search: plan === "studio" || plan === "pro" ? { upgrade: plan } : {}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-4",
		onSubmit: (e) => void onSubmit(e),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				required: true,
				autoComplete: "name",
				value: name,
				onChange: (e) => setName(e.target.value),
				placeholder: "Jordan Mitchell"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				required: true,
				type: "email",
				autoComplete: "email",
				value: email,
				onChange: (e) => setEmail(e.target.value),
				placeholder: "you@studio.actor"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				required: true,
				type: "password",
				autoComplete: "new-password",
				minLength: 8,
				value: password,
				onChange: (e) => setPassword(e.target.value),
				placeholder: "At least 8 characters"
			})] }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-warn",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: busy,
				children: busy ? "Creating account…" : "Create Call Sheet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-sm text-muted-fg",
				children: [
					"Already have a desk?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "text-fg underline-offset-4 hover:underline",
						children: "Sign in"
					})
				]
			})
		]
	});
}
function LoginForm() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		const { error: err } = await authClient.signIn.email({
			email: email.trim(),
			password,
			callbackURL: "/studio"
		});
		if (err) {
			setBusy(false);
			setError(err.message ?? "Could not sign in.");
			return;
		}
		navigate({ to: "/studio" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-4",
		onSubmit: (e) => void onSubmit(e),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				required: true,
				type: "email",
				autoComplete: "email",
				value: email,
				onChange: (e) => setEmail(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				required: true,
				type: "password",
				autoComplete: "current-password",
				value: password,
				onChange: (e) => setPassword(e.target.value)
			})] }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-warn",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: busy,
				children: busy ? "Signing in…" : "Sign in"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-sm text-muted-fg",
				children: [
					"New here?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						className: "text-fg underline-offset-4 hover:underline",
						children: "Create a Call Sheet"
					})
				]
			})
		]
	});
}
//#endregion
export { RegisterForm as n, SocialButtons as r, LoginForm as t };
