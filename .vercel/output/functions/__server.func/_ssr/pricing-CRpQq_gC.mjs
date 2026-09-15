import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Route$11 } from "./router-ByLt-HX2.mjs";
import { t as MarketingPage } from "./marketing-shell-o79zAWrF.mjs";
import { t as PricingTable } from "./pricing-table-C-1ATXHo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-CRpQq_gC.js
var import_jsx_runtime = require_jsx_runtime();
var FAQ = [
	["Why is Call Sheet free?", "Actors already pay for sides, classes, and submissions. The board has to earn a daily place before a coach does. Limits are real so a working week still fits — they are not a demo with the lights off."],
	["What actually costs money to run?", "The career coach. Each ask reads your board and spends model time. Call Sheet includes three a month so you can feel the difference. Studio is twenty. Pro is eighty, with a longer read."],
	["Where does my board live?", "Auditions, tapes, notes, and training stay on this device. The account holds your name, plan, and coach quota so the same desk can travel. Sign-in is required to open the studio."],
	["Can I leave Studio later?", "Yes. Switching to Call Sheet keeps the work; it hides what the free desk does not include until you come back. Live roles over the cap stay — you just cannot add another until one closes."]
];
function PricingPage() {
	const { highlight } = Route$11.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingPage, {
		current: "pricing",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-5xl px-5 py-16 md:px-10 md:py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-[0.18em] text-accent",
					children: "Plans"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-4 max-w-[16ch] text-5xl leading-[0.95] tracking-tight md:text-6xl",
					children: "Pay when the pipeline is live."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xl text-base leading-relaxed text-muted-fg",
					children: "Call Sheet is the daily OS. Studio is for a working board and a coach you actually use. Pro is for the weeks you cannot afford a generic pep talk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingTable, { highlight })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-20 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
							children: "Why these numbers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl tracking-tight",
							children: "Priced against a working week, not a SaaS catalog."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-4 md:grid-cols-3",
							children: [
								["$14 Studio", "Less than one paid self-tape reader. Unlimited board plus 20 grounded asks."],
								["3 free asks", "Enough to feel a coach that has read your board. Not enough to lean on it unpaid."],
								["Yearly −2 months", "If the season is booked, pay for ten. If it is not, stay on Call Sheet."]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-xl border border-border bg-card p-5 shadow-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-semibold tracking-tight",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-fg",
									children: v
								})]
							}, k))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16 grid gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs uppercase tracking-[0.16em] text-accent",
						children: "Questions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "grid gap-4",
						children: FAQ.map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card p-5 shadow-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-lg font-semibold tracking-tight",
								children: q
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-sm leading-relaxed text-muted-fg",
								children: a
							})]
						}, q))
					})]
				})
			]
		})
	});
}
//#endregion
export { PricingPage as component };
