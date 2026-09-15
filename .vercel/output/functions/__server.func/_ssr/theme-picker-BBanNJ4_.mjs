import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as Palette } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as THEMES, c as cn, o as useEntitlements, s as useOsStore, x as THEME_META } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-picker-BBanNJ4_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ThemeChip({ t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-theme": t,
		className: "flex size-8 overflow-hidden rounded-md border border-border",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1/2 bg-bg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1/4 bg-accent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1/4 bg-fg" })
		]
	});
}
function ThemeMenu() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const theme = useOsStore((s) => s.theme);
	const setTheme = useOsStore((s) => s.setTheme);
	const { canUseTheme } = useEntitlements();
	const navigate = useNavigate();
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDown = (e) => {
			if (!ref.current?.contains(e.target)) setOpen(false);
		};
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", onDown);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			size: "icon-sm",
			"aria-label": "Change theme",
			"aria-expanded": open,
			"aria-haspopup": "listbox",
			onClick: () => setOpen((v) => !v),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-4" })
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "listbox",
			"aria-label": "Themes",
			className: "absolute right-0 top-11 z-40 max-h-[min(24rem,70vh)] w-64 overflow-auto rounded-lg border border-border bg-card p-1.5 shadow-soft",
			children: THEMES.map((t) => {
				const locked = !canUseTheme(t);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "option",
					"aria-selected": theme === t,
					className: "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted",
					onClick: () => {
						if (locked) {
							toast.message("Studio unlocks the other three looks.");
							setOpen(false);
							navigate({
								to: "/pricing",
								search: { highlight: "studio" }
							});
							return;
						}
						setTheme(t);
						setOpen(false);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeChip, { t }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm",
								children: THEME_META[t].label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted-fg",
								children: locked ? "Studio" : THEME_META[t].detail
							})]
						}),
						theme === t ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-accent",
							children: "On"
						}) : null
					]
				}, t);
			})
		}) : null]
	});
}
function ThemeGrid() {
	const theme = useOsStore((s) => s.theme);
	const setTheme = useOsStore((s) => s.setTheme);
	const { canUseTheme } = useEntitlements();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-2 sm:grid-cols-2",
		children: THEMES.map((t) => {
			const locked = !canUseTheme(t);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"data-theme": t,
				onClick: () => {
					if (locked) {
						toast.message("Studio unlocks the other three looks.");
						navigate({
							to: "/pricing",
							search: { highlight: "studio" }
						});
						return;
					}
					setTheme(t);
				},
				className: cn("rounded-lg border bg-card p-3 text-left text-fg", theme === t ? "border-accent ring-2 ring-accent/30" : "border-border hover:bg-muted"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex h-10 overflow-hidden rounded-md border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 bg-bg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-10 bg-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-7 bg-fg" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-3 block text-sm font-medium",
						children: THEME_META[t].label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-xs text-muted-fg",
						children: locked ? "Studio look" : THEME_META[t].detail
					})
				]
			}, t);
		})
	});
}
//#endregion
export { ThemeMenu as n, ThemeGrid as t };
