import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Clapperboard,
  FileText,
  MessageCircle,
  Video,
} from "lucide-react";
import { AuthPulse, useAuthView } from "@/components/auth-slot";
import { RankTrack } from "@/components/craft-panel";
import { PricingTable } from "@/components/pricing-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingHome() {
  return (
    <>
      <Hero />
      <Pain />
      <Desk />
      <Stages />
      <Run />
      <Features />
      <Voices />
      <Plans />
      <Close />
    </>
  );
}

function Hero() {
  return (
    <header className="land-wrap land-stagger grid items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Actor operating system
        </p>
        <h1 className="font-display mt-4 max-w-[16ch] text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl">
          Run the work. Book the room.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-fg md:text-lg">
          Sides, tapes, callbacks, and training used to live in five places. actr.one is one desk —
          useful on your first self-tape and still useful when the week is three holds deep.
        </p>
        <Ctas className="mt-8" />
        <p className="mt-4 font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg">
          Call Sheet is free · no card · two minutes to a live board
        </p>
      </div>
      <DeskPreview />
    </header>
  );
}

function Ctas({ className }: { className?: string }) {
  const { signedIn, user, resolving } = useAuthView();
  if (signedIn && (resolving || !user)) {
    return <AuthPulse className="h-12 w-40" />;
  }
  if (signedIn) {
    return (
      <div className={cn("flex flex-wrap gap-3", className)}>
        <Button asChild size="lg">
          <Link to="/studio">
            Open command center
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/pricing">Manage plan</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Button asChild size="lg">
        <Link to="/register">
          Get Call Sheet free
          <ArrowRight className="size-4" />
        </Link>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a href="#desk">See the desk</a>
      </Button>
    </div>
  );
}

function DeskPreview() {
  return (
    <div className="rounded-xl border border-border bg-card p-2 shadow-soft">
      <div className="rounded-lg bg-muted p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted-fg">
            Today · command center
          </p>
          <span className="font-mono text-2xs uppercase tracking-[0.12em] text-accent">Live</span>
        </div>
        <p className="font-display mt-2 text-2xl tracking-tight">
          Three honest moves<span className="text-accent">.</span>
        </p>
        <ol className="mt-4 grid gap-2">
          {[
            ["Cut the last beat of Mara", "Tape due 4:00"],
            ["Warm the dialect 20 min", "Instrument"],
            ["Confirm Ellis sides", "Callback Thu"],
          ].map(([t, m], i) => (
            <li key={t} className="flex items-start justify-between gap-3 rounded-md bg-card px-3 py-3">
              <span className="flex min-w-0 gap-3">
                <span className="font-mono text-xs tabular-nums text-muted-fg">{String(i + 1).padStart(2, "0")}</span>
                <span className="truncate text-sm font-medium">{t}</span>
              </span>
              <span className="shrink-0 font-mono text-2xs uppercase tracking-[0.12em] text-muted-fg">
                {m}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-md border border-border bg-border">
          {[
            ["Health", "74"],
            ["Streak", "3d"],
            ["Asks", "3 left"],
          ].map(([k, v]) => (
            <div key={k} className="bg-card px-3 py-3">
              <p className="font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg">{k}</p>
              <p className="mt-1 text-sm font-semibold tabular-nums">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pain() {
  return (
    <section className="border-y border-border bg-card">
      <div className="land-wrap grid gap-8 py-12 md:grid-cols-[0.9fr_1.1fr] md:py-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">The leak</p>
          <h2 className="font-display mt-2 text-3xl tracking-tight text-balance md:text-4xl">
            Your career is already a job. Your tools should not be a scavenger hunt.
          </h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            ["Sides in email", "Buried under a casting thread you will not find at 11pm."],
            ["Deadlines in Notes", "A list that never tells you what is actually live."],
            ["Tapes named FINAL_v7", "No checklist. No note. No idea if you sent it."],
            ["Training when you remember", "The instrument drops the week the board fills up."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-lg border border-border bg-bg p-4">
              <p className="text-sm font-medium">{t}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-fg">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Desk() {
  return (
    <section id="desk" className="land-wrap scroll-mt-20 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">The desk</p>
      <h2 className="font-display mt-2 max-w-[18ch] text-3xl tracking-tight text-balance md:text-5xl">
        Status that changes the score.
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base">
        A submitted tape is not a booked hold. Health is computed from consistency, readiness, and
        momentum — not a badge you buy. The coach only speaks to what you logged.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["The Last Signal", "Mara / Lead", "Preparing", "Self-tape · today 16:00"],
          ["North Star", "Detective Ellis", "Confirmed", "In-person · Thu 10:30"],
          ["Cedar House", "Alex / Recurring", "Callback", "Chemistry · Fri 14:00"],
        ].map(([title, role, status, meta]) => (
          <article key={title} className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="font-mono text-2xs uppercase tracking-[0.14em] text-accent">{status}</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-1 text-sm text-muted-fg">{role}</p>
            <p className="mt-4 font-mono text-2xs uppercase tracking-[0.12em] text-muted-fg">{meta}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const STAGES = [
  {
    id: "emerging",
    k: "01 / First tapes",
    h: "Drama school to first bookings.",
    p: "Eight live roles, character notes for class, three tape checklists, and three coach asks. Enough to build the habit before the industry notices.",
    f: ["Know what to prep tonight", "Stop losing sides", "A free desk you will actually open"],
    cta: "Get Call Sheet",
    to: "/register" as const,
    search: {},
  },
  {
    id: "working",
    k: "02 / Working week",
    h: "Three live jobs. One instrument.",
    p: "Unlimited board, tapes, and notes. Analytics so the week is readable. Twenty coach asks that have already seen your pipeline.",
    f: ["Hold the board without dropping craft", "See mix and minutes", "A coach on the actual week"],
    cta: "Start Studio",
    to: "/register" as const,
    search: { plan: "studio" as const },
    featured: true,
  },
  {
    id: "busy",
    k: "03 / Full book",
    h: "The weeks that stack.",
    p: "Eighty deeper reads. Recurring, holds, and a calendar that does not wait. Pro is for the desk you already run every day.",
    f: ["Deeper board reads", "Eighty asks a month", "Same OS, more attention"],
    cta: "Start Pro",
    to: "/register" as const,
    search: { plan: "pro" as const },
  },
];

function Stages() {
  return (
    <section id="stages" className="border-y border-border bg-card">
      <div className="land-wrap py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Every stage</p>
        <h2 className="font-display mt-2 max-w-[16ch] text-3xl tracking-tight text-balance md:text-5xl">
          Same OS. Different job, depending on the year you are in.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base">
          Students need a board they will open. Working actors need a pipeline that does not drop
          craft. Busy desks need a coach that has read the week. One product, three honest plans.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {STAGES.map((s) => (
            <article
              key={s.id}
              className={
                s.featured
                  ? "flex flex-col rounded-xl border border-accent bg-bg p-6 shadow-soft ring-2 ring-accent/20"
                  : "flex flex-col rounded-xl border border-border bg-bg p-6 shadow-soft"
              }
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{s.k}</p>
              <h3 className="font-display mt-2 text-2xl tracking-tight">{s.h}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-fg">{s.p}</p>
              <ul className="mt-5 grid gap-2">
                {s.f.map((line) => (
                  <li key={line} className="text-sm">
                    {line}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6" variant={s.featured ? "default" : "outline"}>
                <Link to={s.to} search={s.search}>
                  {s.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Run() {
  return (
    <section id="run" className="land-wrap py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">The run</p>
      <h2 className="font-display mt-2 max-w-[16ch] text-3xl tracking-tight text-balance md:text-5xl">
        Rank is a record of the work. Not a toy.
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base">
        Extra, Day Player, Guest Star, Recurring, Series Regular, Lead. You climb by logging tapes,
        notes, training, and status — three daily sides, a weekly quota, marks that only unlock from
        the board.
      </p>
      <div className="mt-8">
        <RankTrack active="day-player" />
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["Daily sides", "Warm the instrument. One honest take. Keep the file alive."],
          ["Marks", "First callback. First booking. Seven days. The book."],
          ["On every plan", "The run is free. Unlimited pipeline is Studio."],
        ].map(([h, p]) => (
          <li key={h} className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="font-medium">{h}</p>
            <p className="mt-2 text-sm text-muted-fg">{p}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const FEATURES = [
  {
    icon: Clapperboard,
    k: "Audition board",
    h: "Stop losing roles in threads.",
    p: "Every live job has a home: role, type, time, and an honest status. New is not submitted. Callback is not booked.",
    emerging: "Eight live roles is enough to learn the week.",
    working: "Unlimited pipeline when the agent starts stacking.",
  },
  {
    icon: Video,
    k: "Self-tapes",
    h: "A tape you can actually send.",
    p: "Checklists for slate, sides, reader, and file. Know what is done before you hit upload.",
    emerging: "Three tapes while you learn the craft of the frame.",
    working: "Unlimited tapes across a busy self-tape week.",
  },
  {
    icon: FileText,
    k: "Character notes",
    h: "The work you need the morning of.",
    p: "Given circumstances, actions, and the one note that still matters at call time — next to the role, not in another notebook.",
    emerging: "Notes for scene class and the first sides.",
    working: "A look per role when you are holding two characters at once.",
  },
  {
    icon: Activity,
    k: "Training",
    h: "The instrument is a streak, not a mood.",
    p: "Scene study, voice, physicality, camera, cold read. Minutes log. Health notices when the week goes silent.",
    emerging: "Build the habit before the industry asks.",
    working: "Protect craft on the weeks the board is loud.",
  },
  {
    icon: MessageCircle,
    k: "Career coach",
    h: "A read that has seen your board.",
    p: "Ask for a focus plan or a tape note. It only speaks to what you logged — not a generic pep talk.",
    emerging: "Three asks a month on Call Sheet.",
    working: "Twenty on Studio. Eighty on Pro, with a longer read.",
  },
  {
    icon: Award,
    k: "The run",
    h: "A game that only scores real work.",
    p: "Craft points, ranks, daily sides, and marks — computed from what you logged. No opening-the-app bonus. No guilt streak that yells.",
    emerging: "Make the first week visible.",
    working: "See whether the instrument is actually compounding.",
  },
  {
    icon: BarChart3,
    k: "Career health",
    h: "A score you cannot buy.",
    p: "Consistency, readiness, momentum — computed from training, tapes, and the live board. Analytics on Studio make the mix readable.",
    emerging: "See whether the habit is real.",
    working: "See whether the week is actually moving.",
  },
];

function Features() {
  return (
    <section id="rooms" className="land-wrap py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">The rooms</p>
      <h2 className="font-display mt-2 max-w-[16ch] text-3xl tracking-tight text-balance md:text-5xl">
        Every tool earns a daily place.
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base">
        Nothing here is a badge. If it does not change how you prep, tape, or train, it does not
        ship.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {FEATURES.map((f) => (
          <article key={f.k} className="rounded-xl border border-border bg-card p-6 shadow-soft md:p-8">
            <f.icon className="size-5 text-accent" strokeWidth={1.6} />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-accent">{f.k}</p>
            <h3 className="font-display mt-2 text-2xl tracking-tight md:text-3xl">{f.h}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-fg md:text-base">{f.p}</p>
            <dl className="mt-5 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg">
                  First tapes
                </dt>
                <dd className="mt-1 text-sm">{f.emerging}</dd>
              </div>
              <div>
                <dt className="font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg">
                  Working week
                </dt>
                <dd className="mt-1 text-sm">{f.working}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="border-y border-border bg-card">
      <div className="land-wrap py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">How a week should feel</p>
        <h2 className="font-display mt-2 text-3xl tracking-tight md:text-4xl">
          Built like a rehearsal, not a feed.
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted-fg">
          Scenes from the desk — not customer reviews.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            [
              "I used to prep from a thread. The morning of is one card now.",
              "Third year · scene program",
            ],
            [
              "Three live tapes and a callback. The board told me what to cut.",
              "Working actor · self-tape week",
            ],
            [
              "The coach named the risk on the board. Not a pep talk — a cut list.",
              "Recurring · two shows",
            ],
          ].map(([q, who]) => (
            <blockquote key={who} className="rounded-xl border border-border bg-bg p-6">
              <p className="text-sm leading-relaxed md:text-base">{q}</p>
              <footer className="mt-4 font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg">
                {who}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section id="plans" className="land-wrap py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Freemium</p>
      <h2 className="font-display mt-2 max-w-[16ch] text-3xl tracking-tight text-balance md:text-5xl">
        Free to stay in rhythm. Paid when the week is full.
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base">
        Actors already pay for classes and submissions. The OS should not. The coach should, because
        it costs real attention.
      </p>
      <div className="mt-10">
        <PricingTable />
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="border-t border-border bg-card">
      <div className="land-wrap py-16 md:py-20">
        <h2 className="font-display max-w-[16ch] text-3xl tracking-tight text-balance md:text-5xl">
          Take the desk before the next sides land.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-fg md:text-base">
          Call Sheet is free. Open it tonight. When the pipeline is live, Studio is waiting. When
          the coach is a weekly partner, that is Pro.
        </p>
        <Ctas className="mt-8" />
      </div>
    </section>
  );
}
