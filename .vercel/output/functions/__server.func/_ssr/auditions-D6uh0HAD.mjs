import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as AUDITION_STATUSES, c as cn, d as formatDate, o as useEntitlements, s as useOsStore } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { t as LimitToastCopy } from "./plan-gate-CIXhpuhg.mjs";
import { n as PageHead, t as EmptyState } from "./page-head-uYu-SD86.mjs";
import { t as AuditionFormDialog } from "./audition-form-Dx03dwzk.mjs";
import { t as StatusBadge } from "./badge-DMDVkyT6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auditions-D6uh0HAD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = ["All", ...AUDITION_STATUSES];
function AuditionsPage() {
	const auditions = useOsStore((s) => s.auditions);
	const { canAddAudition } = useEntitlements();
	const navigate = useNavigate();
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [edit, setEdit] = (0, import_react.useState)(null);
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const items = (0, import_react.useMemo)(() => auditions.filter((a) => filter === "All" || a.status === filter).slice().sort((a, b) => a.date.localeCompare(b.date)), [auditions, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: "Pipeline",
				title: "Auditions",
				description: "Every opportunity, one board. Status changes write themselves into health and analytics.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						if (!canAddAudition) {
							toast.message(LimitToastCopy("audition"));
							navigate({
								to: "/pricing",
								search: { highlight: "studio" }
							});
							return;
						}
						setAddOpen(true);
					},
					children: "Add audition"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-1 flex gap-1 overflow-x-auto pb-1",
				children: FILTERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: cn("h-10 shrink-0 rounded-full px-3 text-sm", filter === s ? "bg-fg text-bg" : "text-muted-fg hover:bg-muted hover:text-fg"),
					onClick: () => setFilter(s),
					children: [s, s !== "All" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5 font-mono text-xs opacity-70",
						children: auditions.filter((a) => a.status === s).length
					}) : null]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex min-h-16 items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left shadow-soft hover:border-accent/40",
					onClick: () => setEdit(a),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted-fg",
							children: [
								a.role,
								" · ",
								a.type,
								" · ",
								formatDate(a.date),
								" ",
								a.time
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status })]
				}, a.id)), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { children: filter === "All" ? "No auditions yet. Add one to start the board." : `Nothing in ${filter}. Try another filter or add a role.` }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditionFormDialog, {
				open: addOpen,
				onOpenChange: setAddOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditionFormDialog, {
				open: Boolean(edit),
				onOpenChange: (o) => !o && setEdit(null),
				initial: edit
			})
		]
	});
}
//#endregion
export { AuditionsPage as component };
