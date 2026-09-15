import { Outlet, createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useEntitlements } from "@/components/account-provider";
import { AuthPulse, useAuthView } from "@/components/auth-slot";
import { AuditionFormDialog } from "@/components/audition-form";
import { BrandLockup } from "@/components/brand-lockup";
import { CommandPalette } from "@/components/command-palette";
import { CraftWatcher, useCraft } from "@/components/craft-panel";
import { LimitToastCopy } from "@/components/plan-gate";
import { StudioNav } from "@/components/studio-nav";
import { ThemeMenu } from "@/components/theme-picker";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useOsStore } from "@/lib/os-store";
import { daysAgo } from "@/lib/utils";

type StudioSearch = { upgrade?: "studio" | "pro" };

export const Route = createFileRoute("/studio")({
  validateSearch: (s: Record<string, unknown>): StudioSearch => ({
    upgrade: s.upgrade === "studio" || s.upgrade === "pro" ? s.upgrade : undefined,
  }),
  component: StudioLayout,
});

function StudioLayout() {
  const { user, signedIn } = useAuthView();
  const { upgrade } = Route.useSearch();
  const { activate, account } = useAccount();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [cmd, setCmd] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const auditions = useOsStore((s) => s.auditions);
  const { canAddAudition } = useEntitlements();
  const craft = useCraft();

  useEffect(() => {
    if (!user || !upgrade) return;
    if (account?.plan === upgrade) {
      void navigate({ to: "/studio", search: {}, replace: true });
      return;
    }
    if (account == null) return;
    void activate(upgrade, "monthly")
      .then(() => {
        toast.success(`${upgrade === "pro" ? "Pro" : "Studio"} is live on this account.`);
        void navigate({ to: "/studio", search: {}, replace: true });
      })
      .catch(() => toast.error("Could not activate the plan."));
  }, [account, activate, navigate, upgrade, user]);

  if (!signedIn) return <RedirectToSignIn />;
  if (!user) {
    return (
      <div className="flex min-h-dvh bg-bg text-fg">
        <aside className="studio-aside hidden w-60 shrink-0 border-r border-border bg-[var(--sidebar)] p-5 lg:block" />
        <div className="flex-1">
          <div className="h-14 border-b border-border" />
          <div className="mx-auto max-w-6xl px-4 py-8">
            <AuthPulse className="h-10 w-64" />
            <div className="mt-6 h-48 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-bg text-fg">
      <aside className="studio-aside hidden w-60 shrink-0 border-r border-border bg-[var(--sidebar)] p-5 lg:sticky lg:top-0 lg:flex lg:h-dvh">
        <StudioNav />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="studio-header sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-bg/90 backdrop-blur-md">
          <Sheet open={menu} onOpenChange={setMenu}>
            <Button
              variant="outline"
              size="icon-sm"
              className="lg:hidden"
              aria-label="Open menu"
              onClick={() => setMenu(true)}
            >
              <Menu className="size-4" />
            </Button>
            <SheetContent>
              <StudioNav onNavigate={() => setMenu(false)} />
            </SheetContent>
          </Sheet>
          <Link
            to="/"
            className="flex shrink-0 items-center lg:hidden"
            aria-label="actr.one home"
          >
            <BrandLockup size="compact" />
          </Link>
          <Link
            to="/studio/run"
            className="hidden min-w-0 items-center gap-2 text-sm text-muted-fg sm:flex"
          >
            <span className="size-2 shrink-0 rounded-full bg-accent" />
            <span className="truncate">
              {craft.rank.name} · {craft.streak}d
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setCmd(true)}
            >
              <Search className="size-3.5" />
              Search
              <kbd className="rounded border border-border px-1.5 font-mono text-xs">⌘K</kbd>
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              className="sm:hidden"
              aria-label="Search"
              onClick={() => setCmd(true)}
            >
              <Search className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Notifications"
              onClick={() => {
                const due = auditions.filter(
                  (a) =>
                    daysAgo(a.date) <= 1 &&
                    a.status !== "Closed" &&
                    a.status !== "Booked",
                );
                toast.message(
                  due.length
                    ? `${due.length} upcoming — ${due[0].title}`
                    : "No alerts right now",
                );
              }}
            >
              <Bell className="size-4" />
            </Button>
            <ThemeMenu />
            <Button
              size="sm"
              onClick={() => {
                if (!canAddAudition) {
                  toast.message(LimitToastCopy("audition"));
                  void navigate({ to: "/pricing", search: { highlight: "studio" } });
                  return;
                }
                setAddOpen(true);
              }}
            >
              Add audition
            </Button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">
          <CraftWatcher />
          <Outlet />
        </main>
      </div>
      <CommandPalette
        open={cmd}
        onOpenChange={setCmd}
        onAddAudition={() => {
          if (!canAddAudition) {
            toast.message(LimitToastCopy("audition"));
            void navigate({ to: "/pricing", search: { highlight: "studio" } });
            return;
          }
          setAddOpen(true);
        }}
      />
      <AuditionFormDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
