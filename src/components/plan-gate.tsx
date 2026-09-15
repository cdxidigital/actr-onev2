import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS, type PlanId } from "@/lib/plans";

export function PlanGate({
  title,
  description,
  need = "studio",
}: {
  title: string;
  description: string;
  need?: PlanId;
}) {
  const plan = PLANS[need];
  return (
    <section className="rounded-xl border border-dashed border-border bg-card px-5 py-10 text-center shadow-soft md:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{plan.name}</p>
      <h2 className="font-display mt-2 text-3xl tracking-tight">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-fg">{description}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button asChild>
          <Link to="/pricing" search={{ highlight: need }}>
            See {plan.name}
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/pricing">Compare plans</Link>
        </Button>
      </div>
    </section>
  );
}

export function LimitToastCopy(kind: "audition" | "note" | "tape") {
  const copy = {
    audition: "Call Sheet holds 8 live roles. Archive one, or move to Studio for an open board.",
    note: "Call Sheet holds 6 character files. Studio is unlimited notes.",
    tape: "Call Sheet holds 3 self-tape checklists. Studio lifts the cap.",
  } as const;
  return copy[kind];
}
