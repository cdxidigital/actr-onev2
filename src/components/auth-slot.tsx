import { useRouteContext } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

/**
 * SSR-stable auth view. Do not branch on `isPending` alone — Better Auth's
 * session hook is pending on the server and often resolved on the client,
 * which hydrates as a mismatch.
 */
export function useAuthView() {
  const sessionUser = useRouteContext({ from: "__root__", select: (c) => c.sessionUser });
  const { user, isPending } = useCurrentUserState();
  const signedIn = Boolean(user || sessionUser);
  const resolving = Boolean(sessionUser && !user);
  return { user, sessionUser, signedIn, resolving, isPending };
}

export function AuthPulse({ className = "h-9 w-24" }: { className?: string }) {
  return <span className={`animate-pulse rounded-md bg-muted ${className}`} aria-hidden />;
}
