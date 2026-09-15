import { createFileRoute, Navigate } from "@tanstack/react-router";
import { LoginForm, SocialButtons } from "@/components/auth-panel";
import { useAuthView } from "@/components/auth-slot";
import { MarketingPage } from "@/components/marketing-shell";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { signedIn, user } = useAuthView();
  if (signedIn && user) return <Navigate to="/studio" />;

  return (
    <MarketingPage current="login">
      <main className="mx-auto grid min-h-[70svh] max-w-md content-center px-5 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Sign in</p>
        <h1 className="font-display mt-3 text-4xl tracking-tight">Back to the desk.</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-fg">
          Google, X, or the email you registered. Your plan lives on the account. The board lives on
          this device, keyed to you.
        </p>
        {signedIn && !user ? (
          <div className="mt-8 h-40 animate-pulse rounded-xl bg-muted" />
        ) : (
          <div className="mt-8 grid gap-6">
            <SocialButtons />
            <p className="text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-fg">
              or email
            </p>
            <LoginForm />
          </div>
        )}
      </main>
    </MarketingPage>
  );
}
