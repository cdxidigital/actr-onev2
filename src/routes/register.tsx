import { createFileRoute, Navigate } from "@tanstack/react-router";
import { RegisterForm, SocialButtons } from "@/components/auth-panel";
import { useAuthView } from "@/components/auth-slot";
import { MarketingPage } from "@/components/marketing-shell";
import { PLANS, type PlanId } from "@/lib/plans";

type RegisterSearch = { plan?: PlanId };

export const Route = createFileRoute("/register")({
  validateSearch: (s: Record<string, unknown>): RegisterSearch => ({
    plan: s.plan === "studio" || s.plan === "pro" ? s.plan : undefined,
  }),
  component: Register,
});

function Register() {
  const { plan } = Route.useSearch();
  const { signedIn, user } = useAuthView();
  if (signedIn && user) {
    return (
      <Navigate
        to="/studio"
        search={plan === "studio" || plan === "pro" ? { upgrade: plan } : {}}
      />
    );
  }

  const intended = plan ? PLANS[plan] : PLANS.free;

  return (
    <MarketingPage current="register">
      <main className="mx-auto grid min-h-[70svh] max-w-md content-center px-5 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {intended.id === "free" ? "Create account" : `Start ${intended.name}`}
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight">Take the desk.</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-fg">
          {intended.id === "free"
            ? "Call Sheet is free. Eight live roles, notes, tapes, and three coach asks a month — no card. The board stays on this device, on your account."
            : `You'll land on ${intended.name} after this. Nothing is charged in this preview.`}
        </p>
        {signedIn && !user ? (
          <div className="mt-8 h-40 animate-pulse rounded-xl bg-muted" />
        ) : (
          <div className="mt-8 grid gap-6">
            <SocialButtons plan={plan} />
            <p className="text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-fg">
              or email
            </p>
            <RegisterForm plan={plan} />
          </div>
        )}
      </main>
    </MarketingPage>
  );
}
