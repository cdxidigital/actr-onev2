import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as AUDITION_STATUSES, h as uid, m as todayISO, o as useEntitlements, s as useOsStore, v as AUDITION_TYPES } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { t as LimitToastCopy } from "./plan-gate-CIXhpuhg.mjs";
import { n as NativeSelect, r as Textarea, t as Input } from "./input-D10Dt2gF.mjs";
import { t as Label } from "./label-DpXd25sS.mjs";
import { n as DialogContent, t as Dialog } from "./dialog-BD9foKxg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audition-form-Dx03dwzk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = () => ({
	id: uid("a"),
	title: "",
	role: "",
	type: "Self-tape",
	date: todayISO(),
	time: "10:00",
	status: "New",
	notes: ""
});
function AuditionFormDialog({ open, onOpenChange, initial }) {
	const upsert = useOsStore((s) => s.upsertAudition);
	const remove = useOsStore((s) => s.deleteAudition);
	const { canAddAudition } = useEntitlements();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)(initial ?? empty());
	const isEdit = Boolean(initial);
	(0, import_react.useEffect)(() => {
		if (open) setForm(initial ?? empty());
	}, [open, initial]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (next) setForm(initial ?? empty());
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			title: isEdit ? "Edit audition" : "Add an audition",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					if (!form.title.trim() || !form.role.trim()) return;
					if (!isEdit && !canAddAudition) {
						toast.message(LimitToastCopy("audition"));
						onOpenChange(false);
						navigate({
							to: "/pricing",
							search: { highlight: "studio" }
						});
						return;
					}
					upsert({
						...form,
						title: form.title.trim(),
						role: form.role.trim()
					});
					toast.success(isEdit ? "Audition saved" : "Audition added");
					onOpenChange(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Project", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						placeholder: "The Glass House"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Role", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						value: form.role,
						onChange: (e) => setForm({
							...form,
							role: e.target.value
						}),
						placeholder: "Lead / Guest / Recurring"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Type", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: form.type,
							onChange: (e) => setForm({
								...form,
								type: e.target.value
							}),
							children: AUDITION_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: form.status,
							onChange: (e) => setForm({
								...form,
								status: e.target.value
							}),
							children: AUDITION_STATUSES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: form.date,
							onChange: (e) => setForm({
								...form,
								date: e.target.value
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Time", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "time",
							value: form.time,
							onChange: (e) => setForm({
								...form,
								time: e.target.value
							})
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Notes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: form.notes,
						onChange: (e) => setForm({
							...form,
							notes: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-end gap-2",
						children: [
							isEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "danger",
								onClick: () => {
									remove(form.id);
									toast.success("Audition removed");
									onOpenChange(false);
								},
								children: "Delete"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => onOpenChange(false),
								children: "Cancel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								children: isEdit ? "Save" : "Add audition"
							})
						]
					})
				]
			})
		})
	});
}
//#endregion
export { AuditionFormDialog as t };
