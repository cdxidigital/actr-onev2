import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as formatDate, h as uid, m as todayISO, o as useEntitlements, s as useOsStore } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { t as LimitToastCopy } from "./plan-gate-CIXhpuhg.mjs";
import { n as PageHead, t as EmptyState } from "./page-head-uYu-SD86.mjs";
import { n as NativeSelect, t as Input } from "./input-D10Dt2gF.mjs";
import { t as Label } from "./label-DpXd25sS.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BD9foKxg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tapes-DUwD8pWQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TapesPage() {
	const tapes = useOsStore((s) => s.tapes);
	const auditions = useOsStore((s) => s.auditions);
	const toggleCheck = useOsStore((s) => s.toggleCheck);
	const addCheck = useOsStore((s) => s.addCheck);
	const addTape = useOsStore((s) => s.addTape);
	const { canAddTape } = useEntitlements();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [stepDraft, setStepDraft] = (0, import_react.useState)({});
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		due: todayISO(),
		auditionId: ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: "Craft room",
				title: "Self-tapes",
				description: "Checklists that survive the day you actually have to press record.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						if (!canAddTape) {
							toast.message(LimitToastCopy("tape"));
							navigate({
								to: "/pricing",
								search: { highlight: "studio" }
							});
							return;
						}
						setOpen(true);
					},
					children: "New tape"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: tapes.map((tape) => {
					const done = tape.checklist.filter((c) => c.done).length;
					const linked = auditions.find((a) => a.id === tape.auditionId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-border bg-card p-5 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
								children: [
									done,
									"/",
									tape.checklist.length,
									" complete"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display mt-1 text-2xl tracking-tight",
								children: tape.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-fg",
								children: [
									"Due ",
									formatDate(tape.due),
									linked ? ` · ${linked.title}` : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 grid gap-2",
								children: tape.checklist.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-1 hover:bg-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: c.done,
										onChange: () => {
											toggleCheck(tape.id, c.id);
											toast.message(c.done ? "Step reopened" : "Step complete");
										},
										className: "size-4 accent-[var(--accent)]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: c.done ? "text-sm text-muted-fg line-through" : "text-sm",
										children: c.label
									})]
								}) }, c.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-3 flex gap-2",
								onSubmit: (e) => {
									e.preventDefault();
									const label = (stepDraft[tape.id] ?? "").trim();
									if (!label) return;
									addCheck(tape.id, label);
									setStepDraft((d) => ({
										...d,
										[tape.id]: ""
									}));
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: stepDraft[tape.id] ?? "",
									onChange: (e) => setStepDraft((d) => ({
										...d,
										[tape.id]: e.target.value
									})),
									placeholder: "Add a step",
									className: "h-10"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "outline",
									size: "sm",
									className: "h-10",
									children: "Add"
								})]
							})
						]
					}, tape.id);
				})
			}),
			tapes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { children: "No tapes yet. Create one from an upcoming self-tape." }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: (next) => {
					if (next) setForm({
						title: "",
						due: todayISO(),
						auditionId: ""
					});
					setOpen(next);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					title: "New self-tape",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-4",
						onSubmit: (e) => {
							e.preventDefault();
							if (!form.title.trim()) return;
							if (!canAddTape) {
								toast.message(LimitToastCopy("tape"));
								setOpen(false);
								navigate({
									to: "/pricing",
									search: { highlight: "studio" }
								});
								return;
							}
							addTape({
								id: uid("t"),
								auditionId: form.auditionId || null,
								title: form.title.trim(),
								due: form.due,
								checklist: [
									{
										id: uid("c"),
										label: "Mark sides and beats",
										done: false
									},
									{
										id: uid("c"),
										label: "Light and frame check",
										done: false
									},
									{
										id: uid("c"),
										label: "Record two full takes",
										done: false
									}
								]
							});
							toast.success("Tape added");
							setOpen(false);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								value: form.title,
								onChange: (e) => setForm({
									...form,
									title: e.target.value
								}),
								placeholder: "The Last Signal — sides 12–16"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Due", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: form.due,
								onChange: (e) => setForm({
									...form,
									due: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Linked audition", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								value: form.auditionId,
								onChange: (e) => setForm({
									...form,
									auditionId: e.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "None"
								}), auditions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: a.id,
									children: a.title
								}, a.id))]
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
									children: "Create tape"
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
export { TapesPage as component };
