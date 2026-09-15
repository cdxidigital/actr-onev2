import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-shell";
import { PricingTable } from "@/components/pricing-table";
import type { PlanId } from "@/lib/plans";

type PricingSearch = { highlight?: PlanId };

export const Route = createFileRoute("/pricing")({
  validateSearch: (s: Record<string, unknown>): PricingSearch => ({
    highlight:
      s.highlight === "studio" || s.highlight === "pro" || s.highlight === "free"
        ? s.highlight
        : undefined,
  }),
  component: PricingPage,
});

const FAQ = [
  [
    "Why is Call Sheet free?",
    "Actors already pay for sides, classes, and submissions. The board has to earn a daily place before a coach does. Limits are real so a working week still fits — they are not a demo with the lights off.",
  ],
  [
    "What actually costs money to run?",
    "The career coach. Each ask reads your board and spends model time. Call Sheet includes three a month so you can feel the difference. Studio is twenty. Pro is eighty, with a longer read.",
  ],
  [
    "Where does my board live?",
    "Auditions, tapes, notes, and training stay on this device, keyed to your account. Sign-in is required to open the studio. Plan and coach quota live on the server.",
  ],
  [
    "Can I leave Studio later?",
    "Yes. Switching to Call Sheet keeps the work; it hides what the free desk does not include until you come back. Live roles over the cap stay — you just cannot add another until one closes.",
  ],
];

function PricingPage() {
  const { highlight } = Route.useSearch();
  return (
    <MarketingPage current="pricing">
      <main className="mx-auto max-w-5xl px-5 py-16 md:px-10 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Plans</p>
        <h1 className="font-display mt-4 max-w-[16ch] text-5xl leading-[0.95] tracking-tight md:text-6xl">
          Pay when the pipeline is live.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-fg">
          Call Sheet is the daily OS. Studio is for a working board and a coach you actually use.
          Pro is for the weeks you cannot afford a generic pep talk.
        </p>
        <div className="mt-12">
          <PricingTable highlight={highlight} />
        </div>

        <section className="mt-20 grid gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Why these numbers</p>
          <h2 className="font-display text-3xl tracking-tight">Priced against a working week, not a SaaS catalog.</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              ["$14 Studio", "Less than one paid self-tape reader. Unlimited board plus 20 grounded asks."],
              ["3 free asks", "Enough to feel a coach that has read your board. Not enough to lean on it unpaid."],
              ["Yearly −2 months", "If the season is booked, pay for ten. If it is not, stay on Call Sheet."],
            ].map(([k, v]) => (
              <article key={k} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="text-lg font-semibold tracking-tight">{k}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-fg">{v}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Questions</p>
          <dl className="grid gap-4">
            {FAQ.map(([q, a]) => (
              <div key={q} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <dt className="text-lg font-semibold tracking-tight">{q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-fg">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </MarketingPage>
  );
}
