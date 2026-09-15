import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useEntitlements } from "@/components/account-provider";
import { PageHead } from "@/components/page-head";
import { ThemeGrid } from "@/components/theme-picker";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ui/confirm-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatLimit, priceLabel } from "@/lib/plans";
import { useOsStore } from "@/lib/os-store";

export const Route = createFileRoute("/studio/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const profile = useOsStore((s) => s.profile);
  const setProfile = useOsStore((s) => s.setProfile);
  const clearBoard = useOsStore((s) => s.clearBoard);
  const resetDashboard = useOsStore((s) => s.resetDashboard);
  const { account, plan } = useAccount();
  const { live } = useEntitlements();
  const [name, setName] = useState(profile.name);

  useEffect(() => {
    setName(profile.name);
  }, [profile.name]);

  return (
    <div className="grid gap-5">
      <PageHead
        kicker="Studio · beta"
        title="Settings"
        description="The board lives on this device, on your account. Plan and coach quota live on the server."
      />
      <section className="max-w-lg rounded-xl border border-border bg-card p-5 shadow-soft">
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setProfile({ name: name.trim() || profile.name, plan: profile.plan });
            toast.success("Profile saved");
          }}
        >
          <Label>
            Name
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Label>
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="submit">Save profile</Button>
          </div>
        </form>
      </section>

      <section className="max-w-lg rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Plan</p>
        <h2 className="font-display mt-1 text-2xl tracking-tight">{plan.name}</h2>
        <p className="mt-1 text-sm text-muted-fg">
          {priceLabel(plan, account?.billingInterval ?? "monthly")}
          {account?.billingInterval === "yearly" && plan.monthly > 0 ? " · yearly" : null}
        </p>
        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-fg">Live roles</dt>
            <dd className="tabular-nums">
              {live} / {formatLimit(plan.liveAuditions)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-fg">Coach this month</dt>
            <dd className="tabular-nums">
              {account ? `${account.coachCount} / ${account.coachLimit}` : `0 / ${plan.coach}`}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-fg">Analytics</dt>
            <dd>{plan.analytics ? "On" : "Studio"}</dd>
          </div>
        </dl>
        <Button asChild className="mt-5">
          <Link to="/pricing">Change plan</Link>
        </Button>
      </section>

      <section className="max-w-2xl rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Look</p>
        <h2 className="font-display mt-1 text-2xl tracking-tight">Themes</h2>
        <p className="mt-1 text-sm text-muted-fg">
          Call Sheet includes Studio Light and Carbon Noir. Studio unlocks the rest.
        </p>
        <div className="mt-4">
          <ThemeGrid />
        </div>
      </section>
      <section className="max-w-lg rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Overview</p>
        <h2 className="font-display mt-1 text-2xl tracking-tight">Dashboard layout</h2>
        <p className="mt-2 text-sm text-muted-fg">
          Reorder and hide modules from the command center. Arrange is a Studio feature.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => {
            resetDashboard();
            toast.success("Dashboard restored");
          }}
        >
          Reset dashboard layout
        </Button>
      </section>
      <section className="max-w-lg rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Board data</p>
        <h2 className="font-display mt-1 text-2xl tracking-tight">Reset</h2>
        <p className="mt-2 text-sm text-muted-fg">
          Clears auditions, tapes, notes, training, and the run on this device. Plan and coach quota
          stay on the account.
        </p>
        <div className="mt-4">
          <ConfirmButton
            label="Clear board"
            confirmLabel="Clear everything"
            variant="outline"
            onConfirm={() => {
              clearBoard();
              toast.success("Board cleared");
            }}
          />
        </div>
      </section>
    </div>
  );
}
