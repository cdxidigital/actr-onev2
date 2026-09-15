import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useAccount, useEntitlements } from "@/components/account-provider";
import { PageHead } from "@/components/page-head";
import { PlanGate } from "@/components/plan-gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { askCoach } from "@/lib/coach.functions";
import { boardDigest } from "@/lib/health";
import { useOsStore } from "@/lib/os-store";
import { cn, uid } from "@/lib/utils";

export const Route = createFileRoute("/studio/coach")({
  component: CoachPage,
});

const PROMPTS = [
  "Give me a 20 minute focus plan",
  "What should I cut from today's tape?",
  "Name the risk on my board",
];

function CoachPage() {
  const messages = useOsStore((s) => s.coach);
  const pushCoach = useOsStore((s) => s.pushCoach);
  const { refresh } = useAccount();
  const { coachRemaining, coachLimit, plan, loading } = useEntitlements();
  const navigate = useNavigate();
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const exhausted = !loading && coachRemaining <= 0;

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, pending]);

  async function send(question: string) {
    const q = question.trim();
    if (!q || pending) return;
    if (exhausted) {
      void navigate({ to: "/pricing", search: { highlight: plan.id === "studio" ? "pro" : "studio" } });
      return;
    }
    setPending(true);
    setDraft("");
    pushCoach([{ id: uid("m"), from: "me", text: q }]);
    try {
      const res = await askCoach({
        data: { question: q, board: boardDigest(useOsStore.getState()) },
      });
      pushCoach([
        {
          id: uid("m"),
          from: res.ok ? "ai" : "sys",
          text: res.ok ? res.text || "No answer." : res.error,
        },
      ]);
      await refresh();
    } catch (err) {
      const message =
        err instanceof Error && /unauthorized/i.test(err.message)
          ? "Sign in to ask the coach."
          : "Coach could not be reached. Try again in a moment.";
      pushCoach([{ id: uid("m"), from: "sys", text: message }]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-5">
      <PageHead
        kicker="Second set of eyes"
        title="Career coach"
        description={`Grounded in your board. ${plan.name} includes ${coachLimit} asks this month · ${coachRemaining} left.`}
      />
      {exhausted ? (
        <PlanGate
          need={plan.id === "pro" ? "pro" : plan.id === "studio" ? "pro" : "studio"}
          title="That's this month's reads."
          description={
            plan.id === "free"
              ? "Call Sheet includes three grounded asks. Studio is twenty. The coach only speaks to work you actually logged."
              : "Studio includes twenty. Pro is eighty, with a longer read of the board."
          }
        />
      ) : null}
      <section className="flex min-h-[28rem] flex-col rounded-xl border border-border bg-card shadow-soft">
        <div ref={logRef} className="flex-1 space-y-3 overflow-auto p-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}
            >
              <p
                className={cn(
                  "max-w-[42rem] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                  m.from === "me"
                    ? "rounded-br-xs bg-accent text-accent-fg"
                    : m.from === "sys"
                      ? "rounded-bl-xs border border-warn/30 bg-muted text-warn"
                      : "rounded-bl-xs bg-muted text-fg",
                )}
              >
                {m.text}
              </p>
            </div>
          ))}
          {pending ? (
            <p className="max-w-xs rounded-lg rounded-bl-xs bg-muted px-3.5 py-2.5 text-sm text-muted-fg">
              Reading your board…
            </p>
          ) : null}
        </div>
        <form
          className="grid gap-3 border-t border-border p-4"
          onSubmit={(e) => {
            e.preventDefault();
            void send(draft);
          }}
        >
          <div className="flex flex-wrap gap-2">
            {PROMPTS.map((p) => (
              <Button
                key={p}
                type="button"
                variant="outline"
                size="sm"
                disabled={pending || exhausted || loading}
                onClick={() => void send(p)}
              >
                {p}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={draft}
              disabled={pending || exhausted || loading}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={exhausted ? "Upgrade for more asks this month" : "Ask about today, a tape, or your health score"}
              maxLength={800}
            />
            <Button type="submit" disabled={pending || exhausted || loading || !draft.trim()}>
              Send
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
