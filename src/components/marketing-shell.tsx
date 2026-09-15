import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AuthPulse, useAuthView } from "@/components/auth-slot";
import { BrandLockup } from "@/components/brand-lockup";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/lib/auth/gates";

export function MarketingNav({ current }: { current?: "home" | "pricing" | "login" | "register" }) {
  const { signedIn, user, resolving } = useAuthView();
  return (
    <nav className="site-header sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-bg/85 backdrop-blur-md">
      <Link
        to="/"
        className="flex min-w-0 shrink-0 items-center rounded-sm transition-opacity duration-150 hover:opacity-80"
        aria-label="actr.one home"
      >
        <BrandLockup size="header" />
      </Link>
      <div className="flex items-center gap-1 sm:gap-2">
        <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
          <a href="/#desk">The desk</a>
        </Button>
        <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
          <a href="/#run">The run</a>
        </Button>
        <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
          <a href="/#stages">Stages</a>
        </Button>
        <Button asChild variant={current === "pricing" ? "subtle" : "ghost"} size="sm" className="hidden sm:inline-flex">
          <Link to="/pricing">Plans</Link>
        </Button>
        {signedIn ? (
          resolving || !user ? (
            <AuthPulse />
          ) : (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to="/studio">Open studio</Link>
              </Button>
              <div className="hidden md:block">
                <UserButton />
              </div>
            </>
          )
        ) : (
          <>
            {current !== "login" ? (
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
            ) : null}
            {current !== "register" ? (
              <Button asChild size="sm">
                <Link to="/register">Get Call Sheet</Link>
              </Button>
            ) : null}
          </>
        )}
      </div>
    </nav>
  );
}

export function MarketingFooter() {
  const { signedIn } = useAuthView();
  return (
    <footer className="site-footer border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <BrandLockup alt="actr.one" size="footer" />
          <p className="mt-3 max-w-sm text-sm text-muted-fg">
            From first self-tape to a full book. Call Sheet is free. Studio is the live pipeline.
            Pro is the coach you use every week. Beta — plans activate instantly here, nothing is
            charged.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/" className="text-muted-fg hover:text-fg">
            Home
          </Link>
          <Link to="/pricing" className="text-muted-fg hover:text-fg">
            Plans
          </Link>
          {signedIn ? (
            <Link to="/studio" className="text-muted-fg hover:text-fg">
              Studio
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-muted-fg hover:text-fg">
                Sign in
              </Link>
              <Link to="/register" className="text-muted-fg hover:text-fg">
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}

export function MarketingPage({
  children,
  current,
}: {
  children: ReactNode;
  current?: "home" | "pricing" | "login" | "register";
}) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <MarketingNav current={current} />
      {children}
      <MarketingFooter />
    </div>
  );
}
