import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { i as authMiddleware } from "./plans-BJOrJyUj.mjs";
import { gn as object, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { T as createSsrRpc, a as useAccount, c as cn, h as uid, o as useEntitlements, s as useOsStore } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { n as PlanGate } from "./plan-gate-CIXhpuhg.mjs";
import { n as PageHead } from "./page-head-uYu-SD86.mjs";
import { t as boardDigest } from "./health-C1SyHF50.mjs";
import { t as Input } from "./input-D10Dt2gF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-Dh6e4T84.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var askCoach = createServerFn({ method: "POST" }).validator(object({
	question: string().min(1).max(800),
	board: string().max(8e3)
})).middleware([authMiddleware]).handler(createSsrRpc("0071272795c9a221527a7a562cf38040d03ef1b9a4823b9669e9929e1a8187c5"));
var PROMPTS = [
	"Give me a 20 minute focus plan",
	"What should I cut from today's tape?",
	"Name the risk on my board"
];
function CoachPage() {
	const messages = useOsStore((s) => s.coach);
	const pushCoach = useOsStore((s) => s.pushCoach);
	const { refresh } = useAccount();
	const { coachRemaining, coachLimit, plan } = useEntitlements();
	const navigate = useNavigate();
	const [draft, setDraft] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const logRef = (0, import_react.useRef)(null);
	const exhausted = coachRemaining <= 0;
	(0, import_react.useEffect)(() => {
		logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
	}, [messages, pending]);
	async function send(question) {
		const q = question.trim();
		if (!q || pending) return;
		if (exhausted) {
			navigate({
				to: "/pricing",
				search: { highlight: plan.id === "studio" ? "pro" : "studio" }
			});
			return;
		}
		setPending(true);
		setDraft("");
		pushCoach([{
			id: uid("m"),
			from: "me",
			text: q
		}]);
		try {
			const res = await askCoach({ data: {
				question: q,
				board: boardDigest(useOsStore.getState())
			} });
			pushCoach([{
				id: uid("m"),
				from: "ai",
				text: res.ok ? res.text || "No answer." : res.error
			}]);
			await refresh();
		} catch (err) {
			const message = err instanceof Error && err.message === "Unauthorized" ? "Sign in to ask the coach." : "Coach could not be reached. Try again in a moment.";
			pushCoach([{
				id: uid("m"),
				from: "ai",
				text: message
			}]);
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: "Second set of eyes",
				title: "Career coach",
				description: `Grounded in your board. ${plan.name} includes ${coachLimit} asks this month · ${coachRemaining} left.`
			}),
			exhausted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanGate, {
				need: plan.id === "pro" ? "pro" : plan.id === "studio" ? "pro" : "studio",
				title: "That's this month's reads.",
				description: plan.id === "free" ? "Call Sheet includes three grounded asks. Studio is twenty. The coach only speaks to work you actually logged." : "Studio includes twenty. Pro is eighty, with a longer read of the board."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex min-h-[28rem] flex-col rounded-xl border border-border bg-card shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: logRef,
					className: "flex-1 space-y-3 overflow-auto p-5",
					children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex", m.from === "me" ? "justify-end" : "justify-start"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("max-w-[42rem] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap", m.from === "me" ? "rounded-br-xs bg-accent text-accent-fg" : "rounded-bl-xs bg-muted text-fg"),
							children: m.text
						})
					}, m.id)), pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xs rounded-lg rounded-bl-xs bg-muted px-3.5 py-2.5 text-sm text-muted-fg",
						children: "Reading your board…"
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-3 border-t border-border p-4",
					onSubmit: (e) => {
						e.preventDefault();
						send(draft);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: PROMPTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							disabled: pending || exhausted,
							onClick: () => void send(p),
							children: p
						}, p))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft,
							disabled: pending || exhausted,
							onChange: (e) => setDraft(e.target.value),
							placeholder: exhausted ? "Upgrade for more asks this month" : "Ask about today, a tape, or your health score",
							maxLength: 800
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: pending || exhausted || !draft.trim(),
							children: "Send"
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { CoachPage as component };
