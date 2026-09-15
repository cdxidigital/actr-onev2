import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, m as Outlet, v as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogPortal, i as DialogOverlay, o as DialogTitle, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { C as Activity, a as Search, b as Bell, c as Menu, f as FileText, h as Clapperboard, i as Settings, n as Video, s as MessageCircle, u as LayoutDashboard, y as ChartColumn } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useAccount, b as THEMES, c as cn, g as weekdayLabel, l as daysAgo, n as Route$9, o as useEntitlements, p as initials, s as useOsStore, x as THEME_META } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { t as LimitToastCopy } from "./plan-gate-CIXhpuhg.mjs";
import { t as AuditionFormDialog } from "./audition-form-Dx03dwzk.mjs";
import { a as useAuthView, i as UserButton, n as BrandLockup, r as RedirectToSignIn, t as AuthPulse } from "./gates-CA7xeqkI.mjs";
import { n as ThemeMenu } from "./theme-picker-BBanNJ4_.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-KsoNWFhi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommandPalette({ open, onOpenChange, onAddAudition }) {
	const navigate = useNavigate();
	const auditions = useOsStore((s) => s.auditions);
	const notes = useOsStore((s) => s.notes);
	const setTheme = useOsStore((s) => s.setTheme);
	const { canUseTheme } = useEntitlements();
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				onOpenChange(!open);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onOpenChange]);
	const query = q.trim().toLowerCase();
	const filtered = (0, import_react.useMemo)(() => {
		const match = (s) => !query || s.toLowerCase().includes(query);
		return {
			actions: [
				{
					id: "add",
					label: "Add an audition",
					run: onAddAudition
				},
				{
					id: "ov",
					label: "Go to overview",
					run: () => navigate({ to: "/studio" })
				},
				{
					id: "au",
					label: "Go to auditions",
					run: () => navigate({ to: "/studio/auditions" })
				},
				{
					id: "tp",
					label: "Go to self-tapes",
					run: () => navigate({ to: "/studio/tapes" })
				},
				{
					id: "nt",
					label: "Go to notes",
					run: () => navigate({ to: "/studio/notes" })
				},
				{
					id: "tr",
					label: "Go to training",
					run: () => navigate({ to: "/studio/training" })
				},
				{
					id: "an",
					label: "Go to analytics",
					run: () => navigate({ to: "/studio/analytics" })
				},
				{
					id: "co",
					label: "Ask career coach",
					run: () => navigate({ to: "/studio/coach" })
				},
				{
					id: "st",
					label: "Go to settings",
					run: () => navigate({ to: "/studio/settings" })
				},
				{
					id: "pr",
					label: "See plans",
					run: () => navigate({ to: "/pricing" })
				},
				...THEMES.map((t) => ({
					id: `theme-${t}`,
					label: `Theme: ${THEME_META[t].label}`,
					run: () => {
						if (!canUseTheme(t)) {
							toast.message("Studio unlocks the other three looks.");
							navigate({
								to: "/pricing",
								search: { highlight: "studio" }
							});
							return;
						}
						setTheme(t);
					}
				}))
			].filter((a) => match(a.label)),
			auditions: auditions.filter((a) => match(`${a.title} ${a.role}`)),
			notes: notes.filter((n) => match(n.title))
		};
	}, [
		auditions,
		canUseTheme,
		notes,
		navigate,
		onAddAudition,
		query,
		setTheme
	]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-command flex items-start justify-center bg-fg/40 p-4 pt-24 backdrop-blur-[2px]",
		onMouseDown: (e) => {
			if (e.target === e.currentTarget) onOpenChange(false);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
			className: "w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-soft",
			shouldFilter: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
				autoFocus: true,
				value: q,
				onValueChange: setQ,
				placeholder: "Search auditions, notes, actions",
				className: "h-12 w-full border-b border-border bg-transparent px-4 text-sm outline-none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
				className: "max-h-80 overflow-auto p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
						className: "px-3 py-8 text-center text-sm text-muted-fg",
						children: "No matches"
					}),
					filtered.actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
						value: a.label,
						className: "flex h-10 cursor-pointer items-center rounded-md px-3 text-sm aria-selected:bg-muted",
						onSelect: () => {
							onOpenChange(false);
							a.run();
						},
						children: a.label
					}, a.id)),
					filtered.auditions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
						value: a.title,
						className: "flex h-10 cursor-pointer items-center justify-between rounded-md px-3 text-sm aria-selected:bg-muted",
						onSelect: () => {
							onOpenChange(false);
							navigate({ to: "/studio/auditions" });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted-fg",
							children: a.status
						})]
					}, a.id)),
					filtered.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
						value: n.title,
						className: "flex h-10 cursor-pointer items-center rounded-md px-3 text-sm aria-selected:bg-muted",
						onSelect: () => {
							onOpenChange(false);
							navigate({ to: "/studio/notes" });
						},
						children: n.title
					}, n.id))
				]
			})]
		})
	});
}
var ITEMS = [
	{
		to: "/studio",
		label: "Overview",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/studio/auditions",
		label: "Auditions",
		icon: Clapperboard
	},
	{
		to: "/studio/tapes",
		label: "Self-tapes",
		icon: Video
	},
	{
		to: "/studio/notes",
		label: "Scripts & notes",
		icon: FileText
	},
	{
		to: "/studio/training",
		label: "Training",
		icon: Activity
	},
	{
		to: "/studio/analytics",
		label: "Analytics",
		icon: ChartColumn
	}
];
function StudioNav({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const profile = useOsStore((s) => s.profile);
	const live = useOsStore((s) => s.auditions.filter((a) => a.status !== "Closed" && a.status !== "Booked").length);
	const { plan } = useAccount();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mb-6 flex shrink-0 items-center px-0.5 transition-opacity duration-150 hover:opacity-80",
				onClick: onNavigate,
				"aria-label": "actr.one home",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, { size: "sidebar" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-col gap-1",
				children: ITEMS.map((item) => {
					const active = "exact" in item && item.exact ? pathname === item.to : pathname.startsWith(item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						onClick: onNavigate,
						className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm", active ? "bg-card text-fg shadow-soft" : "text-muted-fg hover:bg-muted hover:text-fg"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4",
								strokeWidth: 1.75
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
							item.to === "/studio/auditions" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto font-mono text-xs text-muted-fg",
								children: live
							}) : null
						]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex flex-col gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/studio/coach",
						onClick: onNavigate,
						className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm", pathname.startsWith("/studio/coach") ? "bg-card text-fg shadow-soft" : "text-muted-fg hover:bg-muted hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							className: "size-4",
							strokeWidth: 1.75
						}), "Career coach"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/studio/settings",
						onClick: onNavigate,
						className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm", pathname.startsWith("/studio/settings") ? "bg-card text-fg shadow-soft" : "text-muted-fg hover:bg-muted hover:text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {
							className: "size-4",
							strokeWidth: 1.75
						}), "Settings"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pricing",
						onClick: onNavigate,
						className: "mt-3 flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 place-items-center rounded-md bg-fg font-mono text-2xs text-bg",
							children: initials(profile.name)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm",
								children: profile.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-2xs text-muted-fg",
								children: [plan.name, " plan"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-1 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
					})
				]
			})
		]
	});
}
var Sheet = Dialog;
function SheetContent({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-fg/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("studio-sheet fixed inset-y-0 left-0 z-50 w-[min(100%,18rem)] border-r border-border bg-card p-5 shadow-soft", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
			className: "sr-only",
			children: "Navigation"
		}), children]
	})] });
}
function StudioLayout() {
	const { user, signedIn } = useAuthView();
	const { upgrade } = Route$9.useSearch();
	const { activate, account } = useAccount();
	const navigate = useNavigate();
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [cmd, setCmd] = (0, import_react.useState)(false);
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const auditions = useOsStore((s) => s.auditions);
	const { canAddAudition } = useEntitlements();
	(0, import_react.useEffect)(() => {
		if (!user || !upgrade) return;
		if (account?.plan === upgrade) {
			navigate({
				to: "/studio",
				search: {},
				replace: true
			});
			return;
		}
		if (account == null) return;
		activate(upgrade, "monthly").then(() => {
			toast.success(`${upgrade === "pro" ? "Pro" : "Studio"} is live on this account.`);
			navigate({
				to: "/studio",
				search: {},
				replace: true
			});
		}).catch(() => toast.error("Could not activate the plan."));
	}, [
		account,
		activate,
		navigate,
		upgrade,
		user
	]);
	if (!signedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", { className: "studio-aside hidden w-60 shrink-0 border-r border-border bg-[var(--sidebar)] p-5 lg:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 border-b border-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPulse, { className: "h-10 w-64" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-48 animate-pulse rounded-xl bg-muted" })]
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "studio-aside hidden w-60 shrink-0 border-r border-border bg-[var(--sidebar)] p-5 lg:sticky lg:top-0 lg:flex lg:h-dvh",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioNav, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "studio-header sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-bg/90 backdrop-blur-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open: menu,
							onOpenChange: setMenu,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "icon-sm",
								className: "lg:hidden",
								"aria-label": "Open menu",
								onClick: () => setMenu(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioNav, { onNavigate: () => setMenu(false) }) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "flex shrink-0 items-center lg:hidden",
							"aria-label": "actr.one home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLockup, { size: "compact" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "hidden items-center gap-2 text-sm text-muted-fg md:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-accent" }), weekdayLabel()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "hidden sm:inline-flex",
									onClick: () => setCmd(true),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }),
										"Search",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
											className: "rounded border border-border px-1.5 font-mono text-xs",
											children: "⌘K"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "icon-sm",
									className: "sm:hidden",
									"aria-label": "Search",
									onClick: () => setCmd(true),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "icon-sm",
									"aria-label": "Notifications",
									onClick: () => {
										const due = auditions.filter((a) => daysAgo(a.date) <= 1 && a.status !== "Closed" && a.status !== "Booked");
										toast.message(due.length ? `${due.length} upcoming — ${due[0].title}` : "No alerts right now");
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeMenu, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
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
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {
				open: cmd,
				onOpenChange: setCmd,
				onAddAudition: () => {
					if (!canAddAudition) {
						toast.message(LimitToastCopy("audition"));
						navigate({
							to: "/pricing",
							search: { highlight: "studio" }
						});
						return;
					}
					setAddOpen(true);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditionFormDialog, {
				open: addOpen,
				onOpenChange: setAddOpen
			})
		]
	});
}
//#endregion
export { StudioLayout as component };
