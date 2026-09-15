import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { a as coachPeriodNow, c as isPlanId, d as withCoachWindow, i as authMiddleware, s as isBillingInterval, t as PLANS } from "./plans-BJOrJyUj.mjs";
import { r as getSql } from "./db-DiDvY6i0.mjs";
import { gn as object, yn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach.functions-ZN_Hvztm.js
var askCoach_createServerFn_handler = createServerRpc({
	id: "0071272795c9a221527a7a562cf38040d03ef1b9a4823b9669e9929e1a8187c5",
	name: "askCoach",
	filename: "src/lib/coach.functions.ts"
}, (opts) => askCoach.__executeServer(opts));
var askCoach = createServerFn({ method: "POST" }).validator(object({
	question: string().min(1).max(800),
	board: string().max(8e3)
})).middleware([authMiddleware]).handler(askCoach_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const period = coachPeriodNow();
	await sql`
      insert into accounts (user_id, plan, billing_interval, coach_count, coach_period)
      values (${context.userId}, 'free', 'monthly', 0, ${period})
      on conflict (user_id) do nothing
    `;
	const row = (await sql`
      select plan, billing_interval, display_name, coach_count, coach_period
      from accounts
      where user_id = ${context.userId}
    `)[0];
	if (!row) return {
		ok: false,
		error: "Account missing.",
		code: "account"
	};
	const plan = isPlanId(row.plan) ? row.plan : "free";
	const account = withCoachWindow({
		userId: context.userId,
		plan,
		billingInterval: isBillingInterval(row.billing_interval) ? row.billing_interval : "monthly",
		displayName: row.display_name,
		coachCount: Number(row.coach_count) || 0,
		coachPeriod: row.coach_period
	});
	if (account.coachRemaining <= 0) return {
		ok: false,
		error: `Call Sheet includes ${account.coachLimit} coach asks a month. Studio lifts that to 20.`,
		code: "quota",
		remaining: 0,
		limit: account.coachLimit
	};
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Coach is not available in this environment.",
		code: "env"
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: PLANS[plan].coachTokens,
			temperature: .6,
			messages: [{
				role: "system",
				content: "You are the actr.one career coach for working actors. Speak in short, grounded sentences. Use only the actor's board. No pep talk, no generic industry clichés, no emoji. Give one next move they can do in the next 20 minutes."
			}, {
				role: "user",
				content: `BOARD\n${data.board}\n\nQUESTION\n${data.question}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Coach could not answer (${res.status}).`,
		code: "api"
	};
	await sql`
      update accounts
      set coach_count = ${account.coachCount + 1},
          coach_period = ${account.coachPeriod},
          updated_at = now()
      where user_id = ${context.userId}
    `;
	return {
		ok: true,
		text: (await res.json()).choices[0]?.message.content ?? "",
		remaining: account.coachRemaining - 1,
		limit: account.coachLimit
	};
});
//#endregion
export { askCoach_createServerFn_handler };
