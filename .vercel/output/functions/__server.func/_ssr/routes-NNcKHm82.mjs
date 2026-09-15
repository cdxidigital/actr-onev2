import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Activity, S as ArrowRight, f as FileText, h as Clapperboard, n as Video, s as MessageCircle, y as ChartColumn } from "../_libs/lucide-react.mjs";
import { c as cn } from "./router-ByLt-HX2.mjs";
import { t as Button } from "./button-NTHUvzD8.mjs";
import { a as useAuthView, t as AuthPulse } from "./gates-CA7xeqkI.mjs";
import { t as MarketingPage } from "./marketing-shell-o79zAWrF.mjs";
import { t as PricingTable } from "./pricing-table-C-1ATXHo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-NNcKHm82.js
var import_jsx_runtime = require_jsx_runtime();
function LandingHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pain, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desk, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stages, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Voices, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plans, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {})
	] });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "land-wrap land-stagger grid items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.18em] text-accent",
				children: "Actor operating system"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-4 max-w-[16ch] text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl",
				children: "Run the work. Book the room."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-fg md:text-lg",
				children: "Sides, tapes, callbacks, and training used to live in five places. actr.one is one desk — useful on your first self-tape and still useful when the week is three holds deep."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctas, { className: "mt-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg",
				children: "Call Sheet is free · no card · two minutes to a live board"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskPreview, {})]
	});
}
function Ctas({ className }) {
	const { signedIn, user, resolving } = useAuthView();
	if (signedIn && (resolving || !user)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPulse, { className: "h-12 w-40" });
	if (signedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/studio",
				children: ["Open command center", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			size: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/pricing",
				children: "Manage plan"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/register",
				children: ["Get Call Sheet free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			size: "lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#desk",
				children: "See the desk"
			})
		})]
	});
}
function DeskPreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-border bg-card p-2 shadow-soft",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg bg-muted p-4 md:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xs uppercase tracking-[0.16em] text-muted-fg",
						children: "Today · command center"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-2xs uppercase tracking-[0.12em] text-accent",
						children: "Live"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display mt-2 text-2xl tracking-tight",
					children: ["Three honest moves", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 grid gap-2",
					children: [
						["Cut the last beat of Mara", "Tape due 4:00"],
						["Warm the dialect 20 min", "Instrument"],
						["Confirm Ellis sides", "Callback Thu"]
					].map(([t, m], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3 rounded-md bg-card px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-0 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tabular-nums text-muted-fg",
								children: String(i + 1).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm font-medium",
								children: t
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 font-mono text-2xs uppercase tracking-[0.12em] text-muted-fg",
							children: m
						})]
					}, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-3 overflow-hidden rounded-md border border-border bg-border",
					children: [
						["Health", "74"],
						["Streak", "3d"],
						["Asks", "3 left"]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-semibold tabular-nums",
							children: v
						})]
					}, k))
				})
			]
		})
	});
}
function Pain() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "land-wrap grid gap-8 py-12 md:grid-cols-[0.9fr_1.1fr] md:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
				children: "The leak"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-2 text-3xl tracking-tight text-balance md:text-4xl",
				children: "Your career is already a job. Your tools should not be a scavenger hunt."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					["Sides in email", "Buried under a casting thread you will not find at 11pm."],
					["Deadlines in Notes", "A list that never tells you what is actually live."],
					["Tapes named FINAL_v7", "No checklist. No note. No idea if you sent it."],
					["Training when you remember", "The instrument drops the week the board fills up."]
				].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-bg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted-fg",
						children: d
					})]
				}, t))
			})]
		})
	});
}
function Desk() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "desk",
		className: "land-wrap scroll-mt-20 py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
				children: "The desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-2 max-w-[18ch] text-3xl tracking-tight text-balance md:text-5xl",
				children: "Status that changes the score."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base",
				children: "A submitted tape is not a booked hold. Health is computed from consistency, readiness, and momentum — not a badge you buy. The coach only speaks to what you logged."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-3",
				children: [
					[
						"The Last Signal",
						"Mara / Lead",
						"Preparing",
						"Self-tape · today 16:00"
					],
					[
						"North Star",
						"Detective Ellis",
						"Confirmed",
						"In-person · Thu 10:30"
					],
					[
						"Cedar House",
						"Alex / Recurring",
						"Callback",
						"Chemistry · Fri 14:00"
					]
				].map(([title, role, status, meta]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-card p-5 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-2xs uppercase tracking-[0.14em] text-accent",
							children: status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-lg font-semibold tracking-tight",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-fg",
							children: role
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-mono text-2xs uppercase tracking-[0.12em] text-muted-fg",
							children: meta
						})
					]
				}, title))
			})
		]
	});
}
var STAGES = [
	{
		id: "emerging",
		k: "01 / First tapes",
		h: "Drama school to first bookings.",
		p: "Eight live roles, character notes for class, three tape checklists, and three coach asks. Enough to build the habit before the industry notices.",
		f: [
			"Know what to prep tonight",
			"Stop losing sides",
			"A free desk you will actually open"
		],
		cta: "Get Call Sheet",
		to: "/register",
		search: {}
	},
	{
		id: "working",
		k: "02 / Working week",
		h: "Three live jobs. One instrument.",
		p: "Unlimited board, tapes, and notes. Analytics so the week is readable. Twenty coach asks that have already seen your pipeline.",
		f: [
			"Hold the board without dropping craft",
			"See mix and minutes",
			"A coach on the actual week"
		],
		cta: "Start Studio",
		to: "/register",
		search: { plan: "studio" },
		featured: true
	},
	{
		id: "busy",
		k: "03 / Full book",
		h: "The weeks that stack.",
		p: "Eighty deeper reads. Recurring, holds, and a calendar that does not wait. Pro is for the desk you already run every day.",
		f: [
			"Deeper board reads",
			"Eighty asks a month",
			"Same OS, more attention"
		],
		cta: "Start Pro",
		to: "/register",
		search: { plan: "pro" }
	}
];
function Stages() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "stages",
		className: "border-y border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "land-wrap py-16 md:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
					children: "Every stage"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-2 max-w-[16ch] text-3xl tracking-tight text-balance md:text-5xl",
					children: "Same OS. Different job, depending on the year you are in."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base",
					children: "Students need a board they will open. Working actors need a pipeline that does not drop craft. Busy desks need a coach that has read the week. One product, three honest plans."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 lg:grid-cols-3",
					children: STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: s.featured ? "flex flex-col rounded-xl border border-accent bg-bg p-6 shadow-soft ring-2 ring-accent/20" : "flex flex-col rounded-xl border border-border bg-bg p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
								children: s.k
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display mt-2 text-2xl tracking-tight",
								children: s.h
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 flex-1 text-sm leading-relaxed text-muted-fg",
								children: s.p
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 grid gap-2",
								children: s.f.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-sm",
									children: line
								}, line))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-6",
								variant: s.featured ? "default" : "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: s.to,
									search: s.search,
									children: [s.cta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							})
						]
					}, s.id))
				})
			]
		})
	});
}
var FEATURES = [
	{
		icon: Clapperboard,
		k: "Audition board",
		h: "Stop losing roles in threads.",
		p: "Every live job has a home: role, type, time, and an honest status. New is not submitted. Callback is not booked.",
		emerging: "Eight live roles is enough to learn the week.",
		working: "Unlimited pipeline when the agent starts stacking."
	},
	{
		icon: Video,
		k: "Self-tapes",
		h: "A tape you can actually send.",
		p: "Checklists for slate, sides, reader, and file. Know what is done before you hit upload.",
		emerging: "Three tapes while you learn the craft of the frame.",
		working: "Unlimited tapes across a busy self-tape week."
	},
	{
		icon: FileText,
		k: "Character notes",
		h: "The work you need the morning of.",
		p: "Given circumstances, actions, and the one note that still matters at call time — next to the role, not in another notebook.",
		emerging: "Notes for scene class and the first sides.",
		working: "A look per role when you are holding two characters at once."
	},
	{
		icon: Activity,
		k: "Training",
		h: "The instrument is a streak, not a mood.",
		p: "Scene study, voice, physicality, camera, cold read. Minutes log. Health notices when the week goes silent.",
		emerging: "Build the habit before the industry asks.",
		working: "Protect craft on the weeks the board is loud."
	},
	{
		icon: MessageCircle,
		k: "Career coach",
		h: "A read that has seen your board.",
		p: "Ask for a focus plan or a tape note. It only speaks to what you logged — not a generic pep talk.",
		emerging: "Three asks a month on Call Sheet.",
		working: "Twenty on Studio. Eighty on Pro, with a longer read."
	},
	{
		icon: ChartColumn,
		k: "Career health",
		h: "A score you cannot buy.",
		p: "Consistency, readiness, momentum — computed from training, tapes, and the live board. Analytics on Studio make the mix readable.",
		emerging: "See whether the habit is real.",
		working: "See whether the week is actually moving."
	}
];
function Features() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "rooms",
		className: "land-wrap py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
				children: "The rooms"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-2 max-w-[16ch] text-3xl tracking-tight text-balance md:text-5xl",
				children: "Every tool earns a daily place."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base",
				children: "Nothing here is a badge. If it does not change how you prep, tape, or train, it does not ship."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 md:grid-cols-2",
				children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-card p-6 shadow-soft md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, {
							className: "size-5 text-accent",
							strokeWidth: 1.6
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-mono text-xs uppercase tracking-[0.16em] text-accent",
							children: f.k
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display mt-2 text-2xl tracking-tight md:text-3xl",
							children: f.h
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-fg md:text-base",
							children: f.p
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 grid gap-3 border-t border-border pt-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg",
								children: "First tapes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm",
								children: f.emerging
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg",
								children: "Working week"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm",
								children: f.working
							})] })]
						})
					]
				}, f.k))
			})
		]
	});
}
function Voices() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "land-wrap py-16 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
					children: "From the desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-2 text-3xl tracking-tight md:text-4xl",
					children: "Built like a rehearsal, not a feed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-3",
					children: [
						["I used to prep from a thread. The morning of is one card now.", "Third year · scene program"],
						["Three live tapes and a callback. The board told me what to cut.", "Working actor · self-tape week"],
						["The coach named the risk on the board. Not a pep talk — a cut list.", "Recurring · two shows"]
					].map(([q, who]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "rounded-xl border border-border bg-bg p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed md:text-base",
							children: q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
							className: "mt-4 font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg",
							children: who
						})]
					}, who))
				})
			]
		})
	});
}
function Plans() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "plans",
		className: "land-wrap py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
				children: "Freemium"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mt-2 max-w-[16ch] text-3xl tracking-tight text-balance md:text-5xl",
				children: "Free to stay in rhythm. Paid when the week is full."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base",
				children: "Actors already pay for classes and submissions. The OS should not. The coach should, because it costs real attention."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingTable, {})
			})
		]
	});
}
function Close() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "land-wrap py-16 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display max-w-[16ch] text-3xl tracking-tight text-balance md:text-5xl",
					children: "Take the desk before the next sides land."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base",
					children: "Call Sheet is free. Open it tonight. When the pipeline is live, Studio is waiting. When the coach is a weekly partner, that is Pro."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctas, { className: "mt-8" })
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingPage, {
		current: "home",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHome, {})
	});
}
//#endregion
export { Home as component };
