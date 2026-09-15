import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Award,
  BarChart3,
  Clapperboard,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Video,
} from "lucide-react";
import { useAccount } from "@/components/account-provider";
import { BrandLockup } from "@/components/brand-lockup";
import { useCraft } from "@/components/craft-panel";
import { UserButton } from "@/lib/auth/gates";
import { cn, initials } from "@/lib/utils";
import { useOsStore } from "@/lib/os-store";

const ITEMS = [
  { to: "/studio", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/studio/auditions", label: "Auditions", icon: Clapperboard },
  { to: "/studio/tapes", label: "Self-tapes", icon: Video },
  { to: "/studio/notes", label: "Scripts & notes", icon: FileText },
  { to: "/studio/training", label: "Training", icon: Activity },
  { to: "/studio/analytics", label: "Analytics", icon: BarChart3 },
] as const;

export function StudioNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const profile = useOsStore((s) => s.profile);
  const live = useOsStore(
    (s) => s.auditions.filter((a) => a.status !== "Closed" && a.status !== "Booked").length,
  );
  const { plan } = useAccount();
  const snap = useCraft();

  return (
    <div className="flex h-full flex-col">
      <Link
        to="/"
        className="mb-6 flex shrink-0 items-center px-0.5 transition-opacity duration-150 hover:opacity-80"
        onClick={onNavigate}
        aria-label="actr.one home"
      >
        <BrandLockup size="sidebar" />
      </Link>
      <nav className="flex flex-col gap-1">
        {ITEMS.map((item) => {
          const active =
            "exact" in item && item.exact
              ? pathname === item.to
              : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex h-11 items-center gap-3 rounded-md px-3 text-sm",
                active ? "bg-card text-fg shadow-soft" : "text-muted-fg hover:bg-muted hover:text-fg",
              )}
            >
              <Icon className="size-4" strokeWidth={1.75} />
              <span>{item.label}</span>
              {item.to === "/studio/auditions" ? (
                <span className="ml-auto font-mono text-xs text-muted-fg">{live}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-1">
        <Link
          to="/studio/run"
          onClick={onNavigate}
          className={cn(
            "flex h-11 items-center gap-3 rounded-md px-3 text-sm",
            pathname.startsWith("/studio/run")
              ? "bg-card text-fg shadow-soft"
              : "text-muted-fg hover:bg-muted hover:text-fg",
          )}
        >
          <Award className="size-4" strokeWidth={1.75} />
          The run
          <span className="ml-auto font-mono text-2xs text-muted-fg">{snap.dailyDone}/3</span>
        </Link>
        <Link
          to="/studio/coach"
          onClick={onNavigate}
          className={cn(
            "flex h-11 items-center gap-3 rounded-md px-3 text-sm",
            pathname.startsWith("/studio/coach")
              ? "bg-card text-fg shadow-soft"
              : "text-muted-fg hover:bg-muted hover:text-fg",
          )}
        >
          <MessageCircle className="size-4" strokeWidth={1.75} />
          Career coach
        </Link>
        <Link
          to="/studio/settings"
          onClick={onNavigate}
          className={cn(
            "flex h-11 items-center gap-3 rounded-md px-3 text-sm",
            pathname.startsWith("/studio/settings")
              ? "bg-card text-fg shadow-soft"
              : "text-muted-fg hover:bg-muted hover:text-fg",
          )}
        >
          <Settings className="size-4" strokeWidth={1.75} />
          Settings
        </Link>
        <Link
          to="/studio/run"
          onClick={onNavigate}
          className="mt-3 flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted"
        >
          <span className="grid size-8 place-items-center rounded-md bg-fg font-mono text-2xs text-bg">
            {initials(profile.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm">{profile.name}</span>
            <span className="font-mono text-2xs text-muted-fg">
              {snap.rank.name} · {plan.name}
            </span>
          </span>
        </Link>
        <div className="px-1 pt-2">
          <UserButton />
        </div>
        <p className="px-3 pb-3 font-mono text-2xs uppercase tracking-[0.14em] text-muted-fg">
          Beta
        </p>
      </div>
    </div>
  );
}
