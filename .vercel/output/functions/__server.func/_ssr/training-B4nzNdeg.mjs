import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as TRAINING_KINDS, h as uid, l as daysAgo, m as todayISO, s as useOsStore } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { n as PageHead, t as EmptyState } from "./page-head-uYu-SD86.mjs";
import { a as trainingStreak, s as weekBars } from "./health-C1SyHF50.mjs";
import { n as NativeSelect, t as Input } from "./input-D10Dt2gF.mjs";
import { t as Label } from "./label-DpXd25sS.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BD9foKxg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/training-B4nzNdeg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrainingPage() {
	const state = useOsStore();
	const addTraining = useOsStore((s) => s.addTraining);
	const deleteTraining = useOsStore((s) => s.deleteTraining);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		kind: "Scene study",
		minutes: 30,
		date: todayISO()
	});
	const rows = [...state.training].sort((a, b) => b.date.localeCompare(a.date));
	const weekMins = state.training.filter((t) => daysAgo(t.date) <= 7).reduce((s, t) => s + Number(t.minutes || 0), 0);
	const bars = weekBars(state);
	const maxBar = Math.max(30, ...bars.map((b) => b.mins));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: "The instrument",
				title: "Training",
				description: `${weekMins} minutes in the last 7 days. Streak ${trainingStreak(state)}.`,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setOpen(true),
					children: "Log session"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-5 shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
					children: "This week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex h-28 items-end gap-1.5",
					children: bars.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-full rounded-t-sm ${i === 6 ? "bg-accent" : "bg-muted-fg/25"}`,
							style: { height: `${Math.max(10, b.mins / maxBar * 100)}%` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted-fg",
							children: b.label
						})]
					}, b.iso))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-16 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: t.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-fg",
							children: [
								t.kind,
								" · ",
								t.minutes,
								" min · ",
								t.date
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => {
							deleteTraining(t.id);
							toast.success("Session removed");
						},
						children: "Remove"
					})]
				}, t.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { children: "Log your first session to start a streak." }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: (next) => {
					if (next) setForm({
						title: "",
						kind: "Scene study",
						minutes: 30,
						date: todayISO()
					});
					setOpen(next);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					title: "Log a session",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-4",
						onSubmit: (e) => {
							e.preventDefault();
							if (!form.title.trim() || form.minutes < 1) return;
							addTraining({
								id: uid("tr"),
								title: form.title.trim(),
								kind: form.kind,
								minutes: Number(form.minutes),
								date: form.date
							});
							toast.success("Session logged");
							setOpen(false);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Session", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								value: form.title,
								onChange: (e) => setForm({
									...form,
									title: e.target.value
								}),
								placeholder: "Cold read drills"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Kind", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: form.kind,
									onChange: (e) => setForm({
										...form,
										kind: e.target.value
									}),
									children: TRAINING_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: k }, k))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Minutes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									max: 480,
									value: form.minutes,
									onChange: (e) => setForm({
										...form,
										minutes: Number(e.target.value)
									})
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: form.date,
								onChange: (e) => setForm({
									...form,
									date: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									onClick: () => setOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									children: "Log session"
								})]
							})
						]
					})
				})
			})
		]
	});
}
//#endregion
export { TrainingPage as component };
