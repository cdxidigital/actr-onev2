import type { ReactNode } from "react";

export function PageHead({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{kicker}</p>
        <h1 className="font-display mt-2 text-4xl tracking-tight md:text-5xl">
          {title}
          <span className="text-accent">.</span>
        </h1>
        {description ? (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-fg">{description}</p>
        ) : null}
      </div>
      {action}
    </header>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-fg">
      {children}
    </p>
  );
}
