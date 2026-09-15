import { l as daysAgo, m as todayISO } from "./router-ByLt-HX2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/health-C1SyHF50.js
function trainingStreak(state) {
	const days = new Set(state.training.map((t) => t.date));
	let n = 0;
	const today = /* @__PURE__ */ new Date();
	for (let i = 0; i < 30; i++) {
		const d = new Date(today);
		d.setDate(today.getDate() - i);
		const key = d.toISOString().slice(0, 10);
		if (days.has(key)) n += 1;
		else if (i > 0) break;
	}
	return n;
}
function weekBars(state) {
	return Array.from({ length: 7 }, (_, i) => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() + i - 6);
		const iso = d.toISOString().slice(0, 10);
		return {
			iso,
			mins: state.training.filter((t) => t.date === iso).reduce((s, t) => s + Number(t.minutes || 0), 0),
			label: d.toLocaleDateString(void 0, { weekday: "narrow" })
		};
	});
}
function healthScore(state) {
	const active = state.auditions.filter((a) => a.status !== "Closed").length;
	const booked = state.auditions.filter((a) => a.status === "Booked").length;
	const trainWeek = state.training.filter((t) => daysAgo(t.date) <= 7).length;
	const checks = state.tapes.flatMap((t) => t.checklist);
	const tapesDone = checks.filter((c) => c.done).length;
	const tapesAll = Math.max(1, checks.length);
	const consistency = Math.min(100, 55 + trainWeek * 8 + trainingStreak(state) * 3);
	const readiness = Math.min(100, 40 + Math.round(tapesDone / tapesAll * 40) + state.notes.length * 4);
	const momentum = Math.min(100, 45 + active * 5 + booked * 12);
	return {
		total: Math.round(consistency * .4 + readiness * .3 + momentum * .3),
		consistency,
		readiness,
		momentum
	};
}
function upcomingAuditions(state, n = 3) {
	const today = todayISO();
	return state.auditions.filter((a) => a.status !== "Closed" && a.status !== "Booked").slice().sort((a, b) => {
		const aRank = a.date >= today ? 0 : 1;
		const bRank = b.date >= today ? 0 : 1;
		if (aRank !== bRank) return aRank - bRank;
		return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
	}).slice(0, n);
}
function dueSoonCount(state) {
	const today = todayISO();
	return state.auditions.filter((a) => a.status !== "Closed" && a.status !== "Booked" && a.date <= today).length;
}
function pipeline(state) {
	return [
		{
			label: "Submitted",
			statuses: ["Submitted", "New"]
		},
		{
			label: "In play",
			statuses: [
				"Callback",
				"Preparing",
				"Confirmed"
			]
		},
		{
			label: "Booked",
			statuses: ["Booked"]
		}
	].map((g) => ({
		label: g.label,
		items: state.auditions.filter((a) => g.statuses.includes(a.status))
	}));
}
function boardDigest(state) {
	const h = healthScore(state);
	return [
		`Actor: ${state.profile.name} (${state.profile.plan})`,
		`Health ${h.total} — consistency ${h.consistency}, readiness ${h.readiness}, momentum ${h.momentum}, streak ${trainingStreak(state)}`,
		"Auditions:",
		...state.auditions.map((a) => `- ${a.title} / ${a.role} / ${a.type} / ${a.status} / ${a.date} ${a.time} ${a.notes ? "— " + a.notes : ""}`),
		"Tapes:",
		...state.tapes.map((t) => `- ${t.title} due ${t.due}: ${t.checklist.map((c) => `${c.done ? "[x]" : "[ ]"} ${c.label}`).join("; ")}`),
		"Notes:",
		...state.notes.map((n) => `- ${n.title}: ${n.body}`),
		"Training:",
		...state.training.map((t) => `- ${t.date} ${t.minutes}m ${t.kind} ${t.title}`)
	].join("\n");
}
//#endregion
export { trainingStreak as a, pipeline as i, dueSoonCount as n, upcomingAuditions as o, healthScore as r, weekBars as s, boardDigest as t };
