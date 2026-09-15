import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { a as coachPeriodNow, c as isPlanId, d as withCoachWindow, i as authMiddleware, s as isBillingInterval } from "./plans-BJOrJyUj.mjs";
import { r as getSql } from "./db-DiDvY6i0.mjs";
import { cn as _enum, gn as object } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.functions-BU6y-OSP.js
function toAccount(row) {
	const plan = isPlanId(row.plan) ? row.plan : "free";
	const billingInterval = isBillingInterval(row.billing_interval) ? row.billing_interval : "monthly";
	return withCoachWindow({
		userId: row.user_id,
		plan,
		billingInterval,
		displayName: row.display_name,
		coachCount: Number(row.coach_count) || 0,
		coachPeriod: row.coach_period
	});
}
async function loadOrCreate(userId, displayName) {
	const sql = await getSql();
	const period = coachPeriodNow();
	await sql`
    insert into accounts (user_id, plan, billing_interval, display_name, coach_count, coach_period)
    values (${userId}, 'free', 'monthly', ${displayName ?? null}, 0, ${period})
    on conflict (user_id) do nothing
  `;
	const row = (await sql`
    select user_id, plan, billing_interval, display_name, coach_count, coach_period
    from accounts
    where user_id = ${userId}
  `)[0];
	if (!row) throw new Error("Account missing");
	const account = toAccount(row);
	if (account.coachPeriod !== row.coach_period || account.coachCount !== Number(row.coach_count)) await sql`
      update accounts
      set coach_count = ${account.coachCount},
          coach_period = ${account.coachPeriod},
          updated_at = now()
      where user_id = ${userId}
    `;
	return account;
}
var getAccount_createServerFn_handler = createServerRpc({
	id: "42d3d3d7c5da8c3606b6f6bb01d5a2468982684501464f1133a9e48c3c43c27c",
	name: "getAccount",
	filename: "src/lib/account.functions.ts"
}, (opts) => getAccount.__executeServer(opts));
var getAccount = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getAccount_createServerFn_handler, async ({ context }) => loadOrCreate(context.userId));
var activatePlan_createServerFn_handler = createServerRpc({
	id: "bae4b4c93119cf8fbfec2081d3e2b3f6041d16dcd2d8d913f31fb3d071adb14d",
	name: "activatePlan",
	filename: "src/lib/account.functions.ts"
}, (opts) => activatePlan.__executeServer(opts));
var activatePlan = createServerFn({ method: "POST" }).validator(object({
	plan: _enum([
		"free",
		"studio",
		"pro"
	]),
	interval: _enum(["monthly", "yearly"])
})).middleware([authMiddleware]).handler(activatePlan_createServerFn_handler, async ({ context, data }) => {
	await loadOrCreate(context.userId);
	await (await getSql())`
      update accounts
      set plan = ${data.plan},
          billing_interval = ${data.interval},
          updated_at = now()
      where user_id = ${context.userId}
    `;
	return loadOrCreate(context.userId);
});
//#endregion
export { activatePlan_createServerFn_handler, getAccount_createServerFn_handler };
