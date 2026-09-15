import { Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "@/components/account-provider";
import { Button } from "@/components/ui/button";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  PLANS,
  PLAN_IDS,
  priceLabel,
  yearlySave,
  type BillingInterval,
  type PlanId,
} from "@/lib/plans";
import { cn } from "@/lib/utils";

export function PricingTable({
  highlight,
  compact = false,
}: {
  highlight?: PlanId;
  compact?: boolean;
}) {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const { user, isPending } = useCurrentUserState();
  const { account, activate, loading } = useAccount();
  const navigate = useNavigate();
  const [busy, setBusy] = useState<PlanId | null>(null);

  async function choose(id: PlanId) {
    if (isPending) return;
    if (!user) {
      void navigate({
        to: "/register",
        search: id === "free" ? {} : { plan: id },
      });
      return;
    }
    if (account?.plan === id) {
      void navigate({ to: "/studio" });
      return;
    }
    setBusy(id);
    try {
      await activate(id, id === "free" ? "monthly" : interval);
      toast.success(
        id === "free" ? "Back on Call Sheet." : `${PLANS[id].name} is live on this account.`,
      );
      void navigate({ to: "/studio" });
    } catch {
      toast.error("Could not change the plan. Try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          {(["monthly", "yearly"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              className={cn(
                "h-10 rounded-md px-4 text-sm",
                interval === opt ? "bg-fg text-bg" : "text-muted-fg hover:text-fg",
              )}
              onClick={() => setInterval(opt)}
            >
              {opt === "monthly" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>
        {interval === "yearly" ? (
          <p className="text-sm text-muted-fg">Two months free on Studio and Pro.</p>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {PLAN_IDS.map((id) => {
          const plan = PLANS[id];
          const current = account?.plan === id;
          const featured = plan.featured || highlight === id;
          const save = yearlySave(plan);
          return (
            <article
              key={id}
              className={cn(
                "flex flex-col rounded-xl border bg-card p-6 shadow-soft",
                featured ? "border-accent ring-2 ring-accent/20" : "border-border",
              )}
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{plan.eyebrow}</p>
              <h3 className="font-display mt-2 text-3xl tracking-tight">{plan.name}</h3>
              <p className="mt-2 min-h-10 text-sm text-muted-fg">{plan.tagline}</p>
              <p className="mt-5 font-display text-4xl tracking-tight tabular-nums">
                {priceLabel(plan, interval)}
              </p>
              {plan.monthly > 0 && interval === "yearly" ? (
                <p className="mt-1 text-xs text-muted-fg">Save ${save} versus monthly.</p>
              ) : (
                <p className="mt-1 text-xs text-muted-fg">
                  {plan.monthly === 0 ? "No card. Keep the board on this device." : "Cancel whenever the season ends."}
                </p>
              )}
              <ul className="mt-6 grid flex-1 gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.75} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6"
                variant={featured ? "default" : "outline"}
                disabled={busy !== null || (loading && !account)}
                onClick={() => void choose(id)}
              >
                {busy === id
                  ? "Activating…"
                  : current
                    ? "This is your plan"
                    : !user
                      ? id === "free"
                        ? "Get Call Sheet"
                        : `Start ${plan.name}`
                      : id === "free"
                        ? "Switch to Call Sheet"
                        : `Activate ${plan.name}`}
              </Button>
            </article>
          );
        })}
      </div>

      {!compact ? (
        <p className="mt-6 text-center text-sm text-muted-fg">
          Plans apply to this account instantly in preview — nothing is charged here.{" "}
          <Link to="/register" className="text-fg underline-offset-4 hover:underline">
            Create a Call Sheet
          </Link>{" "}
          to keep the desk.
        </p>
      ) : null}
    </div>
  );
}
