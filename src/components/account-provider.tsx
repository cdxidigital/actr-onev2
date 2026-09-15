import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { activatePlan, getAccount } from "@/lib/account.functions";
import { normalizeCraft } from "@/lib/craft";
import { seedOs, DEFAULT_ACTOR, useOsStore } from "@/lib/os-store";
import { isTheme, normalizeDashboard } from "@/lib/os-types";
import { PLANS, PLAN_LABEL, liveAuditionCount, type Account, type BillingInterval, type PlanDef, type PlanId } from "@/lib/plans";

type AccountCtx = {
  account: Account | null;
  loading: boolean;
  plan: PlanDef;
  refresh: () => Promise<void>;
  activate: (plan: PlanId, interval: BillingInterval) => Promise<Account>;
};

const Ctx = createContext<AccountCtx | null>(null);

function boardKey(userId: string | null) {
  return userId ? `actr-one-os-v3:${userId}` : "actr-one-os-v3:guest";
}

function readStoredBoard(key: string) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: Record<string, unknown> };
    return parsed.state ?? null;
  } catch {
    return null;
  }
}

function adoptBoard(userId: string | null) {
  const key = boardKey(userId);
  useOsStore.persist.setOptions({ name: key });
  const stored = readStoredBoard(key);
  const base = seedOs();
  if (stored) {
    const merged = {
      ...base,
      ...stored,
      theme: isTheme(stored.theme) ? stored.theme : base.theme,
      dashboard: normalizeDashboard(
        stored.dashboard as Parameters<typeof normalizeDashboard>[0],
      ),
    };
    useOsStore.setState({
      ...merged,
      craft: normalizeCraft(
        stored.craft as Parameters<typeof normalizeCraft>[0],
        merged,
      ),
    });
  } else {
    useOsStore.setState(base);
  }
  void useOsStore.persist.rehydrate();
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  const userId = user?.id ?? null;
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const setProfile = useOsStore((s) => s.setProfile);
  const setTheme = useOsStore((s) => s.setTheme);
  const failedToast = useRef(false);
  const boardUser = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (isPending) return;
    if (boardUser.current === userId) return;
    boardUser.current = userId;
    adoptBoard(userId);
  }, [isPending, userId]);

  const refresh = useCallback(async () => {
    if (isPending) return;
    if (!userId) {
      setAccount(null);
      setLoading(false);
      return;
    }
    try {
      const next = await getAccount();
      setAccount(next);
      failedToast.current = false;
    } catch {
      setAccount(null);
      if (!failedToast.current) {
        failedToast.current = true;
        toast.error("Could not load your plan. Working as Call Sheet until it recovers.");
      }
    } finally {
      setLoading(false);
    }
  }, [isPending, userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!account) return;
    const current = useOsStore.getState().profile;
    const name =
      current.name === DEFAULT_ACTOR && (account.displayName || user?.displayName)
        ? (account.displayName || user?.displayName || current.name)
        : current.name;
    const plan = PLAN_LABEL[account.plan];
    if (current.name !== name || current.plan !== plan) {
      setProfile({ name, plan });
    }
    const allowed = PLANS[account.plan].themes;
    const theme = useOsStore.getState().theme;
    if (!allowed.includes(theme)) setTheme("studio");
  }, [account, setProfile, setTheme, user?.displayName]);

  const activate = useCallback(async (plan: PlanId, interval: BillingInterval) => {
    const next = await activatePlan({ data: { plan, interval } });
    setAccount(next);
    return next;
  }, []);

  const value = useMemo<AccountCtx>(
    () => ({
      account,
      loading: isPending || loading,
      plan: PLANS[account?.plan ?? "free"],
      refresh,
      activate,
    }),
    [account, activate, isPending, loading, refresh],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAccount() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}

export function useEntitlements() {
  const { plan, account, loading } = useAccount();
  const auditions = useOsStore((s) => s.auditions);
  const notes = useOsStore((s) => s.notes);
  const tapes = useOsStore((s) => s.tapes);
  const theme = useOsStore((s) => s.theme);
  const live = liveAuditionCount(auditions);
  return {
    plan,
    account,
    loading,
    live,
    canAddAudition: live < plan.liveAuditions,
    canAddNote: notes.length < plan.notes,
    canAddTape: tapes.length < plan.tapes,
    canArrange: plan.arrange,
    canAnalytics: plan.analytics,
    canUseTheme: (t: string) => plan.themes.includes(t as never),
    themeAllowed: plan.themes.includes(theme),
    coachRemaining: account?.coachRemaining ?? plan.coach,
    coachLimit: account?.coachLimit ?? plan.coach,
  };
}
