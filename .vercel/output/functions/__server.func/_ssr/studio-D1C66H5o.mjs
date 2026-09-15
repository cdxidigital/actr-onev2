import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as ChevronDown, d as GripVertical, g as ChevronUp, l as LayoutGrid, m as EyeOff, p as Eye, x as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as cn, d as formatDate, f as greeting, o as useEntitlements, s as useOsStore, u as firstName, y as DASHBOARD_MODULES } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { a as trainingStreak, i as pipeline, n as dueSoonCount, o as upcomingAuditions, r as healthScore, s as weekBars } from "./health-C1SyHF50.mjs";
import { t as AuditionFormDialog } from "./audition-form-Dx03dwzk.mjs";
import { t as StatusBadge } from "./badge-DMDVkyT6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-D1C66H5o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardBoard({ arranging, onEdit }) {
	const dashboard = useOsStore((s) => s.dashboard);
	const setOrder = useOsStore((s) => s.setDashboardOrder);
	const toggle = useOsStore((s) => s.toggleDashboardModule);
	const [dragId, setDragId] = (0, import_react.useState)(null);
	const [overId, setOverId] = (0, import_react.useState)(null);
	const visible = dashboard.order.filter((id) => !dashboard.hidden.includes(id));
	const hidden = dashboard.order.filter((id) => dashboard.hidden.includes(id));
	function move(from, to) {
		if (from === to) return;
		const next = [...dashboard.order];
		const i = next.indexOf(from);
		const j = next.indexOf(to);
		if (i < 0 || j < 0) return;
		next.splice(i, 1);
		next.splice(j, 0, from);
		setOrder(next);
	}
	function moveBy(id, dir) {
		const i = visible.indexOf(id);
		const j = i + dir;
		if (i < 0 || j < 0 || j >= visible.length) return;
		move(id, visible[j]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-dashed border-border px-4 py-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Every module is hidden."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-fg",
					children: "Restore one below, or reset the layout from the header."
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: visible.map((id, index) => {
					const meta = DASHBOARD_MODULES.find((m) => m.id === id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleFrame, {
						id,
						label: meta.label,
						span: meta.span,
						arranging,
						dragging: dragId === id,
						over: overId === id && dragId !== id,
						canUp: index > 0,
						canDown: index < visible.length - 1,
						onMoveUp: () => moveBy(id, -1),
						onMoveDown: () => moveBy(id, 1),
						onDragStart: () => setDragId(id),
						onDragEnd: () => {
							setDragId(null);
							setOverId(null);
						},
						onDragOver: () => {
							if (dragId && dragId !== id) setOverId(id);
						},
						onDropOn: () => {
							if (dragId) move(dragId, id);
							setDragId(null);
							setOverId(null);
						},
						onHide: () => toggle(id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleBody, {
							id,
							onEdit
						})
					}, id);
				})
			}),
			arranging && hidden.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-dashed border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-muted-fg",
					children: "Hidden modules"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: hidden.map((id) => {
						const meta = DASHBOARD_MODULES.find((m) => m.id === id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => toggle(id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }), meta.label]
						}, id);
					})
				})]
			}) : null
		]
	});
}
function ModuleFrame({ id, label, span, arranging, dragging, over, canUp, canDown, children, onMoveUp, onMoveDown, onDragStart, onDragEnd, onDragOver, onDropOn, onHide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn(span === "full" ? "md:col-span-2" : "", arranging && "rounded-xl border border-dashed border-border bg-muted/30 p-2", over && "border-accent bg-accent/10", dragging && "opacity-40"),
		onDragOver: arranging ? (e) => {
			e.preventDefault();
			onDragOver();
		} : void 0,
		onDrop: arranging ? (e) => {
			e.preventDefault();
			onDropOn();
		} : void 0,
		children: [arranging ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					draggable: true,
					"aria-label": `Move ${label}`,
					className: "grid size-11 shrink-0 place-items-center rounded-md border border-border bg-card text-muted-fg",
					onDragStart: (e) => {
						e.dataTransfer.effectAllowed = "move";
						e.dataTransfer.setData("text/plain", id);
						onDragStart();
					},
					onDragEnd,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate px-1 text-sm",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": `Move ${label} up`,
					disabled: !canUp,
					onClick: onMoveUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": `Move ${label} down`,
					disabled: !canDown,
					onClick: onMoveDown,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					"aria-label": `Hide ${label}`,
					onClick: onHide,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" })
				})
			]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: arranging ? "pointer-events-none" : void 0,
			children
		})]
	});
}
function ModuleBody({ id, onEdit }) {
	const state = useOsStore();
	const h = (0, import_react.useMemo)(() => healthScore(state), [state]);
	const upcoming = upcomingAuditions(state, 3);
	const focus = upcoming[0];
	const due = dueSoonCount(state);
	const bars = weekBars(state);
	const maxBar = Math.max(30, ...bars.map((b) => b.mins));
	const cols = pipeline(state);
	switch (id) {
		case "focus": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col gap-3 rounded-lg border border-accent/30 bg-accent/8 px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
					children: "Today's focus"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-medium",
					children: focus ? `Prepare ${focus.title}` : "Protect the instrument"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-fg",
					children: focus ? `${focus.type} · ${formatDate(focus.date)} ${focus.time}` : "No urgent deadline. Log training or add a role."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/studio/coach",
					children: ["Open focus plan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
				})
			})]
		});
		case "stats": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
							children: "Due soon"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-lg font-semibold",
							children: [
								due,
								" call",
								due === 1 ? "" : "s"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-fg",
							children: focus ? focus.title : "Clear board"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
							children: "In motion"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-lg font-semibold",
							children: [state.auditions.filter((a) => a.status !== "Closed").length, " auditions"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-fg",
							children: [
								"Across ",
								cols.filter((c) => c.items.length).length,
								" active stages"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
							children: "Streak"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-lg font-semibold",
							children: [trainingStreak(state), " days"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-fg",
							children: "Preparation rhythm"
						})
					]
				})
			]
		});
		case "health": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-card p-5 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
					children: "Career health"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display mt-1 text-2xl tracking-tight",
					children: ["Looking ", h.total >= 80 ? "strong" : h.total >= 60 ? "steady" : "thin"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-28 place-items-center rounded-full",
						style: { background: `conic-gradient(var(--accent) ${h.total * 3.6}deg, var(--muted) 0)` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-[5.5rem] place-items-center rounded-full bg-card text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl tracking-tight",
								children: h.total
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "min-w-40 flex-1 space-y-2 text-sm text-muted-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between",
								children: ["Consistency ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-mono text-fg",
									children: h.consistency
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between",
								children: ["Readiness ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-mono text-fg",
									children: h.readiness
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between",
								children: ["Momentum ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-mono text-fg",
									children: h.momentum
								})]
							})
						]
					})]
				})
			]
		});
		case "next": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl bg-accent p-5 text-accent-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] opacity-70",
					children: "Your next move"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-2 text-2xl tracking-tight",
					children: "Turn preparation into presence."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm opacity-80",
					children: focus ? `A focused rehearsal before ${focus.title} is the highest-leverage move on your board.` : "Use the quiet to train. Momentum is a practice, not a mood."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "mt-5 border-accent-fg/30 bg-transparent text-accent-fg hover:bg-accent-fg/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio/coach",
						children: "Ask your coach"
					})
				})
			]
		});
		case "pipeline": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-card p-5 shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
					children: "Pipeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-1 text-2xl tracking-tight",
					children: "Audition board"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio/auditions",
						children: "View all"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 md:grid-cols-3",
				children: cols.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs uppercase tracking-[0.14em] text-muted-fg",
					children: [
						col.label,
						" · ",
						col.items.length
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid gap-2",
					children: [col.items.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "rounded-md border border-border bg-bg px-3 py-3 text-left text-sm hover:border-accent/40",
						onClick: () => onEdit(item),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-fg",
							children: item.role
						})]
					}, item.id)), col.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-md border border-dashed border-border px-3 py-4 text-sm text-muted-fg",
						children: "None yet"
					}) : null]
				})] }, col.label))
			})]
		});
		case "upcoming": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-card p-5 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
					children: "On deck"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-1 text-2xl tracking-tight",
					children: "Upcoming"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2",
					children: upcoming.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex items-center gap-3 rounded-md border border-border bg-bg px-3 py-3 text-left",
						onClick: () => onEdit(item),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm font-medium",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-fg",
								children: [
									item.role,
									" · ",
									formatDate(item.date)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: item.status })]
					}, item.id))
				})
			]
		});
		case "coach": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden rounded-xl bg-fg p-5 text-bg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-bg/60",
					children: "Studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-3 text-3xl tracking-tight",
					children: "Meet your career coach."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm text-bg/70",
					children: "A second set of eyes on your patterns, choices, and next best move."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio/coach",
						children: "Start a conversation"
					})
				})
			]
		});
		case "rhythm": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-card p-5 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
					children: "This week"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-1 text-2xl tracking-tight",
					children: "Your rhythm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex h-24 items-end gap-1.5",
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
				})
			]
		});
	}
}
function Overview() {
	const name = useOsStore((s) => s.profile.name);
	const resetDashboard = useOsStore((s) => s.resetDashboard);
	const { canArrange } = useEntitlements();
	const navigate = useNavigate();
	const [edit, setEdit] = (0, import_react.useState)(null);
	const [arranging, setArranging] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
						children: "Command center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display mt-2 text-4xl tracking-tight md:text-5xl",
						children: [
							greeting(),
							", ",
							firstName(name),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-accent",
								children: "."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-sm text-muted-fg",
						children: arranging ? "Drag the grip, or use the arrows. Hide what you don't need — the layout stays on this device." : "Three honest moves will keep the instrument ahead of the industry."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [arranging ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => resetDashboard(),
						children: "Reset layout"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: arranging ? "default" : "outline",
						size: "sm",
						"aria-pressed": arranging,
						onClick: () => {
							if (!canArrange) {
								toast.message("Modular command center is a Studio feature.");
								navigate({
									to: "/pricing",
									search: { highlight: "studio" }
								});
								return;
							}
							setArranging((v) => !v);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-3.5" }), arranging ? "Done" : "Arrange"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardBoard, {
				arranging,
				onEdit: setEdit
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
export { Overview as component };
