import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import {
  coachPeriodNow,
  isBillingInterval,
  isPlanId,
  withCoachWindow,
  type Account,
  type BillingInterval,
  type PlanId,
} from "@/lib/plans";

type AccountRow = {
  user_id: string;
  plan: string;
  billing_interval: string;
  display_name: string | null;
  coach_count: number;
  coach_period: string;
};

function toAccount(row: AccountRow): Account {
  const plan: PlanId = isPlanId(row.plan) ? row.plan : "free";
  const billingInterval: BillingInterval = isBillingInterval(row.billing_interval)
    ? row.billing_interval
    : "monthly";
  return withCoachWindow({
    userId: row.user_id,
    plan,
    billingInterval,
    displayName: row.display_name,
    coachCount: Number(row.coach_count) || 0,
    coachPeriod: row.coach_period,
  });
}

async function loadOrCreate(userId: string, displayName?: string | null): Promise<Account> {
  const sql = await getSql();
  const period = coachPeriodNow();
  await sql`
    insert into accounts (user_id, plan, billing_interval, display_name, coach_count, coach_period)
    values (${userId}, 'free', 'monthly', ${displayName ?? null}, 0, ${period})
    on conflict (user_id) do nothing
  `;
  const rows = await sql<AccountRow>`
    select user_id, plan, billing_interval, display_name, coach_count, coach_period
    from accounts
    where user_id = ${userId}
  `;
  const row = rows[0];
  if (!row) throw new Error("Account missing");
  const account = toAccount(row);
  if (account.coachPeriod !== row.coach_period || account.coachCount !== Number(row.coach_count)) {
    await sql`
      update accounts
      set coach_count = ${account.coachCount},
          coach_period = ${account.coachPeriod},
          updated_at = now()
      where user_id = ${userId}
    `;
  }
  return account;
}

export const getAccount = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => loadOrCreate(context.userId));

export const activatePlan = createServerFn({ method: "POST" })
  .validator(
    z.object({
      plan: z.enum(["free", "studio", "pro"]),
      interval: z.enum(["monthly", "yearly"]),
    }),
  )
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    await loadOrCreate(context.userId);
    const sql = await getSql();
    await sql`
      update accounts
      set plan = ${data.plan},
          billing_interval = ${data.interval},
          updated_at = now()
      where user_id = ${context.userId}
    `;
    return loadOrCreate(context.userId);
  });
