import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { authClient, GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PlanId } from "@/lib/plans";

function callbackFor(plan?: PlanId) {
  if (plan === "studio" || plan === "pro") return `/studio?upgrade=${plan}`;
  return "/studio";
}

export function SocialButtons({ plan }: { plan?: PlanId }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="grid gap-2">
      {GROK_PROVIDERS.map((p) => (
        <Button
          key={p.providerId}
          type="button"
          variant="outline"
          disabled={busy !== null}
          onClick={() => {
            setError(null);
            setBusy(p.providerId);
            void signIn(p.providerId, { callbackURL: callbackFor(plan), errorCallbackURL: "/login" }).catch(
              (err: unknown) => {
                setBusy(null);
                setError(err instanceof Error ? err.message : "Sign-in failed");
              },
            );
          }}
        >
          Continue with {p.label}
        </Button>
      ))}
      {error ? <p className="text-sm text-warn">{error}</p> : null}
    </div>
  );
}

export function RegisterForm({ plan }: { plan?: PlanId }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: err } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      callbackURL: callbackFor(plan),
    });
    if (err) {
      setBusy(false);
      setError(err.message ?? "Could not create the account.");
      return;
    }
    setBusy(false);
    void navigate({
      to: "/studio",
      search: plan === "studio" || plan === "pro" ? { upgrade: plan } : {},
    });
  }

  return (
    <form className="grid gap-4" onSubmit={(e) => void onSubmit(e)}>
      <Label>
        Name
        <Input
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </Label>
      <Label>
        Email
        <Input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.actor"
        />
      </Label>
      <Label>
        Password
        <Input
          required
          type="password"
          autoComplete="new-password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />
      </Label>
      {error ? <p className="text-sm text-warn">{error}</p> : null}
      <Button type="submit" disabled={busy}>
        {busy ? "Creating account…" : "Create Call Sheet"}
      </Button>
      <p className="text-center text-sm text-muted-fg">
        Already have a desk?{" "}
        <Link to="/login" className="text-fg underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: err } = await authClient.signIn.email({
      email: email.trim(),
      password,
      callbackURL: "/studio",
    });
    if (err) {
      setBusy(false);
      setError(err.message ?? "Could not sign in.");
      return;
    }
    setBusy(false);
    void navigate({ to: "/studio" });
  }

  return (
    <form className="grid gap-4" onSubmit={(e) => void onSubmit(e)}>
      <Label>
        Email
        <Input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Label>
      <Label>
        Password
        <Input
          required
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Label>
      {error ? <p className="text-sm text-warn">{error}</p> : null}
      <Button type="submit" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-sm text-muted-fg">
        New here?{" "}
        <Link to="/register" className="text-fg underline-offset-4 hover:underline">
          Create a Call Sheet
        </Link>
      </p>
    </form>
  );
}
