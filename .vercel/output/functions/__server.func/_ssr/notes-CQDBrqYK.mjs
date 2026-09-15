import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as uid, o as useEntitlements, s as useOsStore } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { t as LimitToastCopy } from "./plan-gate-CIXhpuhg.mjs";
import { n as PageHead, t as EmptyState } from "./page-head-uYu-SD86.mjs";
import { r as Textarea, t as Input } from "./input-D10Dt2gF.mjs";
import { t as Label } from "./label-DpXd25sS.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BD9foKxg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notes-CQDBrqYK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotesPage() {
	const notes = useOsStore((s) => s.notes);
	const upsert = useOsStore((s) => s.upsertNote);
	const remove = useOsStore((s) => s.deleteNote);
	const { canAddNote } = useEntitlements();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [current, setCurrent] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		body: ""
	});
	const sorted = [...notes].sort((a, b) => b.updated - a.updated);
	const isEdit = Boolean(current);
	function openNew() {
		if (!canAddNote) {
			toast.message(LimitToastCopy("note"));
			navigate({
				to: "/pricing",
				search: { highlight: "studio" }
			});
			return;
		}
		setCurrent(null);
		setForm({
			title: "",
			body: ""
		});
		setOpen(true);
	}
	function openEdit(note) {
		setCurrent(note);
		setForm({
			title: note.title,
			body: note.body
		});
		setOpen(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: "Inner life",
				title: "Scripts & notes",
				description: "Keep the private score close. One true sentence is enough.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: openNew,
					children: "New note"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: sorted.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "rounded-xl border border-border bg-card p-5 text-left shadow-soft hover:border-accent/40",
					onClick: () => openEdit(n),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.16em] text-muted-fg",
							children: new Date(n.updated).toLocaleString(void 0, {
								month: "short",
								day: "numeric",
								hour: "numeric",
								minute: "2-digit"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-lg font-semibold tracking-tight",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-4 text-sm leading-relaxed text-muted-fg",
							children: n.body
						})
					]
				}, n.id))
			}),
			sorted.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { children: "No notes yet. Capture the inner life before the result." }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					title: isEdit ? "Edit note" : "New note",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-4",
						onSubmit: (e) => {
							e.preventDefault();
							if (!form.title.trim() || !form.body.trim()) return;
							if (!isEdit && !canAddNote) {
								toast.message(LimitToastCopy("note"));
								setOpen(false);
								navigate({
									to: "/pricing",
									search: { highlight: "studio" }
								});
								return;
							}
							upsert({
								id: current?.id ?? uid("n"),
								title: form.title.trim(),
								body: form.body.trim(),
								updated: Date.now()
							});
							toast.success(isEdit ? "Note saved" : "Note created");
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
								placeholder: "Mara — inner life"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Body", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								required: true,
								value: form.body,
								onChange: (e) => setForm({
									...form,
									body: e.target.value
								}),
								placeholder: "Play the listening, not the knowing."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap justify-end gap-2",
								children: [
									isEdit && current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "danger",
										onClick: () => {
											remove(current.id);
											toast.success("Note removed");
											setOpen(false);
										},
										children: "Delete"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										onClick: () => setOpen(false),
										children: "Cancel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										children: isEdit ? "Save" : "Create"
									})
								]
							})
						]
					})
				})
			})
		]
	});
}
//#endregion
export { NotesPage as component };
