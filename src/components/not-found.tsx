import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="font-display text-4xl tracking-tight">This page is not on the call sheet.</h1>
      <p className="max-w-md text-sm leading-relaxed text-muted-fg">
        The link is stale, or the scene moved. Head back to the desk.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/studio">Open studio</Link>
        </Button>
      </div>
    </main>
  );
}
