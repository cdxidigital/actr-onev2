import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import {
  coachPeriodNow,
  coachQuotaCopy,
  isBillingInterval,
  isPlanId,
  PLANS,
  withCoachWindow,
  type PlanId,
} from "@/lib/plans";

export const askCoach = createServerFn({ method: "POST" })
  .validator(
    z.object({
      question: z.string().min(1).max(800),
      board: z.string().max(8000),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const period = coachPeriodNow();
    await sql`
      insert into accounts (user_id, plan, billing_interval, coach_count, coach_period)
      values (${context.userId}, 'free', 'monthly', 0, ${period})
      on conflict (user_id) do nothing
    `;
    const rows = await sql<{
      plan: string;
      billing_interval: string;
      display_name: string | null;
      coach_count: number;
      coach_period: string;
    }>`
      select plan, billing_interval, display_name, coach_count, coach_period
      from accounts
      where user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) {
      return { ok: false as const, error: "Account missing.", code: "account" as const };
    }
    const plan: PlanId = isPlanId(row.plan) ? row.plan : "free";
    const account = withCoachWindow({
      userId: context.userId,
      plan,
      billingInterval: isBillingInterval(row.billing_interval) ? row.billing_interval : "monthly",
      displayName: row.display_name,
      coachCount: Number(row.coach_count) || 0,
      coachPeriod: row.coach_period,
    });
    if (account.coachRemaining <= 0) {
      return {
        ok: false as const,
        error: coachQuotaCopy(plan, account.coachLimit),
        code: "quota" as const,
        remaining: 0,
        limit: account.coachLimit,
      };
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Coach is not available in this environment.", code: "env" as const };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: PLANS[plan].coachTokens,
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content:
              "You are the actr.one career coach for working actors. Speak in short, grounded sentences. Use only the actor's board. No pep talk, no generic industry clichés, no emoji. Give one next move they can do in the next 20 minutes.",
          },
          {
            role: "user",
            content: `BOARD\n${data.board}\n\nQUESTION\n${data.question}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `Coach could not answer (${res.status}).`, code: "api" as const };
    }

    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    const text = body.choices[0]?.message.content?.trim() ?? "";
    if (!text) {
      return { ok: false as const, error: "Coach returned an empty read. Try again.", code: "api" as const };
    }

    const billed = await sql<{ coach_count: number }>`
      update accounts
      set coach_count = case
            when coach_period = ${account.coachPeriod} then coach_count + 1
            else 1
          end,
          coach_period = ${account.coachPeriod},
          updated_at = now()
      where user_id = ${context.userId}
        and (
          coach_period is distinct from ${account.coachPeriod}
          or coach_count < ${account.coachLimit}
        )
      returning coach_count
    `;
    if (!billed[0]) {
      return {
        ok: false as const,
        error: coachQuotaCopy(plan, account.coachLimit),
        code: "quota" as const,
        remaining: 0,
        limit: account.coachLimit,
      };
    }

    return {
      ok: true as const,
      text,
      remaining: Math.max(0, account.coachLimit - billed[0].coach_count),
      limit: account.coachLimit,
    };
  });
