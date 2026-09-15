import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useRouter, _ as createRootRoute, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { i as authMiddleware, l as liveAuditionCount, r as PLAN_LABEL, t as PLANS } from "./plans-BJOrJyUj.mjs";
import { bn as union, cn as _enum, gn as object, hn as number, pn as literal, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as authClient } from "./client-B40BzJxt.mjs";
import { n as auth } from "./server-IYuMUV8b.mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ByLt-HX2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var getAccount = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("42d3d3d7c5da8c3606b6f6bb01d5a2468982684501464f1133a9e48c3c43c27c"));
var activatePlan = createServerFn({ method: "POST" }).validator(object({
	plan: _enum([
		"free",
		"studio",
		"pro"
	]),
	interval: _enum(["monthly", "yearly"])
})).middleware([authMiddleware]).handler(createSsrRpc("bae4b4c93119cf8fbfec2081d3e2b3f6041d16dcd2d8d913f31fb3d071adb14d"));
var AUDITION_STATUSES = [
	"New",
	"Preparing",
	"Confirmed",
	"Submitted",
	"Callback",
	"Booked",
	"Closed"
];
var AUDITION_TYPES = [
	"Self-tape",
	"In-person",
	"Callback",
	"Chemistry"
];
var TRAINING_KINDS = [
	"Scene study",
	"Voice",
	"Physicality",
	"Camera",
	"Cold read"
];
var THEMES = [
	"studio",
	"noir",
	"cobalt",
	"daylight",
	"greenroom"
];
var THEME_META = {
	studio: {
		label: "Studio Light",
		detail: "Warm paper, cobalt ink",
		dark: false
	},
	noir: {
		label: "Carbon Noir",
		detail: "Deep work, tungsten",
		dark: true
	},
	cobalt: {
		label: "Electric Cobalt",
		detail: "Night desk, high signal",
		dark: true
	},
	daylight: {
		label: "Daylight Call",
		detail: "Cool sides, morning teal",
		dark: false
	},
	greenroom: {
		label: "Green Room",
		detail: "Backstage olive, lime tungsten",
		dark: true
	}
};
function isTheme(value) {
	return THEMES.includes(value);
}
var DASHBOARD_MODULES = [
	{
		id: "focus",
		label: "Today's focus",
		span: "full"
	},
	{
		id: "stats",
		label: "Pulse",
		span: "full"
	},
	{
		id: "health",
		label: "Career health",
		span: "half"
	},
	{
		id: "next",
		label: "Next move",
		span: "half"
	},
	{
		id: "pipeline",
		label: "Audition board",
		span: "full"
	},
	{
		id: "upcoming",
		label: "Upcoming",
		span: "half"
	},
	{
		id: "coach",
		label: "Career coach",
		span: "half"
	},
	{
		id: "rhythm",
		label: "This week",
		span: "half"
	}
];
var DEFAULT_DASHBOARD = {
	order: DASHBOARD_MODULES.map((m) => m.id),
	hidden: []
};
function normalizeDashboard(input) {
	const known = DASHBOARD_MODULES.map((m) => m.id);
	const seen = /* @__PURE__ */ new Set();
	const order = [];
	for (const id of [...input?.order ?? [], ...known]) {
		if (!known.includes(id) || seen.has(id)) continue;
		seen.add(id);
		order.push(id);
	}
	return {
		order,
		hidden: [...new Set((input?.hidden ?? []).filter((id) => seen.has(id)))]
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}
function todayISO() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function offsetISO(days) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + days);
	return d.toISOString().slice(0, 10);
}
function formatDate(iso) {
	if (!iso) return "TBD";
	const d = /* @__PURE__ */ new Date(`${iso}T12:00:00`);
	const t = /* @__PURE__ */ new Date();
	const tom = new Date(t);
	tom.setDate(t.getDate() + 1);
	if (d.toDateString() === t.toDateString()) return "Today";
	if (d.toDateString() === tom.toDateString()) return "Tomorrow";
	return d.toLocaleDateString(void 0, {
		weekday: "short",
		month: "short",
		day: "numeric"
	});
}
function weekdayLabel() {
	return (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
		weekday: "long",
		month: "long",
		day: "numeric"
	});
}
function greeting() {
	const h = (/* @__PURE__ */ new Date()).getHours();
	if (h < 12) return "Good morning";
	if (h < 17) return "Good afternoon";
	return "Good evening";
}
function initials(name) {
	return name.split(" ").filter(Boolean).map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "YO";
}
function firstName(name) {
	return name.trim().split(" ")[0] || "there";
}
function daysAgo(iso) {
	return Math.round((Date.now() - (/* @__PURE__ */ new Date(`${iso}T12:00:00`)).getTime()) / 864e5);
}
var SEED = {
	profile: {
		name: "Jordan Mitchell",
		plan: "Free"
	},
	theme: "studio",
	dashboard: DEFAULT_DASHBOARD,
	auditions: [
		{
			id: "a1",
			title: "The Last Signal",
			role: "Mara / Lead",
			type: "Self-tape",
			date: todayISO(),
			time: "16:00",
			status: "Preparing",
			notes: "Keep the first beat quiet. Let the static do the work."
		},
		{
			id: "a2",
			title: "North Star",
			role: "Detective Ellis",
			type: "In-person",
			date: offsetISO(1),
			time: "10:30",
			status: "Confirmed",
			notes: "Callback chemistry read."
		},
		{
			id: "a3",
			title: "Cedar House",
			role: "Alex / Recurring",
			type: "Callback",
			date: offsetISO(5),
			time: "14:15",
			status: "Callback",
			notes: "Series regular energy, not guest."
		},
		{
			id: "a4",
			title: "The Orchard",
			role: "Sam",
			type: "Self-tape",
			date: offsetISO(-3),
			time: "12:00",
			status: "Submitted",
			notes: ""
		},
		{
			id: "a5",
			title: "Glass Animals",
			role: "Riley",
			type: "Self-tape",
			date: offsetISO(-6),
			time: "09:00",
			status: "Submitted",
			notes: ""
		},
		{
			id: "a6",
			title: "Quiet Hours",
			role: "Jordan",
			type: "In-person",
			date: offsetISO(-20),
			time: "11:00",
			status: "Booked",
			notes: "Booked. Hold dates through August."
		}
	],
	tapes: [{
		id: "t1",
		auditionId: "a1",
		title: "The Last Signal — sides 12–16",
		due: todayISO(),
		checklist: [
			{
				id: "c1",
				label: "Mark sides and beats",
				done: true
			},
			{
				id: "c2",
				label: "20 min silent run",
				done: false
			},
			{
				id: "c3",
				label: "Light and frame check",
				done: false
			},
			{
				id: "c4",
				label: "Record two full takes",
				done: false
			}
		]
	}],
	notes: [{
		id: "n1",
		title: "Mara — inner life",
		body: "She hears the signal before anyone else. Not gifted. Just unwilling to look away. Play the listening, not the knowing.",
		updated: Date.now() - 36e5
	}, {
		id: "n2",
		title: "Ellis — physical score",
		body: "Weight in the heels. Hands stay empty. The badge is a last resort, not an identity.",
		updated: Date.now() - 864e5
	}],
	training: [
		{
			id: "tr1",
			title: "Cold read drills",
			kind: "Scene study",
			minutes: 45,
			date: todayISO()
		},
		{
			id: "tr2",
			title: "Vocal warm-up",
			kind: "Voice",
			minutes: 20,
			date: offsetISO(-1)
		},
		{
			id: "tr3",
			title: "Movement class",
			kind: "Physicality",
			minutes: 60,
			date: offsetISO(-3)
		}
	],
	coach: [{
		id: "m0",
		from: "ai",
		text: "I'm already looking at your board. The highest-leverage move today is finishing The Last Signal with a quiet first take. Want a 20-minute focus plan?"
	}]
};
var useOsStore = create()(persist((set) => ({
	...SEED,
	setTheme: (theme) => set({ theme: isTheme(theme) ? theme : "studio" }),
	setProfile: (profile) => set({ profile }),
	setDashboardOrder: (order) => set((s) => ({ dashboard: normalizeDashboard({
		...s.dashboard,
		order
	}) })),
	toggleDashboardModule: (id) => set((s) => {
		const hidden = s.dashboard.hidden.includes(id) ? s.dashboard.hidden.filter((h) => h !== id) : [...s.dashboard.hidden, id];
		return { dashboard: normalizeDashboard({
			...s.dashboard,
			hidden
		}) };
	}),
	resetDashboard: () => set({ dashboard: DEFAULT_DASHBOARD }),
	upsertAudition: (audition) => set((s) => {
		const idx = s.auditions.findIndex((a) => a.id === audition.id);
		const next = [...s.auditions];
		if (idx >= 0) next[idx] = audition;
		else next.unshift(audition);
		return { auditions: next };
	}),
	deleteAudition: (id) => set((s) => ({ auditions: s.auditions.filter((a) => a.id !== id) })),
	upsertNote: (note) => set((s) => {
		const idx = s.notes.findIndex((n) => n.id === note.id);
		const next = [...s.notes];
		if (idx >= 0) next[idx] = note;
		else next.unshift(note);
		return { notes: next };
	}),
	deleteNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
	addTraining: (log) => set((s) => ({ training: [log, ...s.training] })),
	deleteTraining: (id) => set((s) => ({ training: s.training.filter((t) => t.id !== id) })),
	addTape: (tape) => set((s) => ({ tapes: [tape, ...s.tapes] })),
	toggleCheck: (tapeId, checkId) => set((s) => ({ tapes: s.tapes.map((t) => t.id !== tapeId ? t : {
		...t,
		checklist: t.checklist.map((c) => c.id === checkId ? {
			...c,
			done: !c.done
		} : c)
	}) })),
	addCheck: (tapeId, label) => set((s) => ({ tapes: s.tapes.map((t) => t.id !== tapeId ? t : {
		...t,
		checklist: [...t.checklist, {
			id: uid("c"),
			label,
			done: false
		}]
	}) })),
	pushCoach: (messages) => set((s) => ({ coach: [...s.coach, ...messages] })),
	resetDemo: () => set({ ...SEED })
}), {
	name: "actr-one-os-v2",
	skipHydration: true,
	merge: (persisted, current) => {
		const p = persisted ?? {};
		return {
			...current,
			...p,
			theme: isTheme(p.theme) ? p.theme : current.theme,
			dashboard: normalizeDashboard(p.dashboard)
		};
	}
}));
var Ctx = (0, import_react.createContext)(null);
function AccountProvider({ children }) {
	const { user, isPending } = useCurrentUserState();
	const userId = user?.id ?? null;
	const [account, setAccount] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const setProfile = useOsStore((s) => s.setProfile);
	const refresh = (0, import_react.useCallback)(async () => {
		if (isPending) return;
		if (!userId) {
			setAccount(null);
			setLoading(false);
			return;
		}
		try {
			const next = await getAccount();
			setAccount(next);
		} catch {
			setAccount(null);
		} finally {
			setLoading(false);
		}
	}, [isPending, userId]);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	(0, import_react.useEffect)(() => {
		if (!account) return;
		const current = useOsStore.getState().profile;
		const name = current.name === "Jordan Mitchell" && (account.displayName || user?.displayName) ? account.displayName || user?.displayName || current.name : current.name;
		const plan = PLAN_LABEL[account.plan];
		if (current.name !== name || current.plan !== plan) setProfile({
			name,
			plan
		});
	}, [
		account,
		setProfile,
		user?.displayName
	]);
	const activate = (0, import_react.useCallback)(async (plan, interval) => {
		const next = await activatePlan({ data: {
			plan,
			interval
		} });
		setAccount(next);
		return next;
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		account,
		loading: isPending || loading,
		plan: PLANS[account?.plan ?? "free"],
		refresh,
		activate
	}), [
		account,
		activate,
		isPending,
		loading,
		refresh
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useAccount() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useAccount must be used within AccountProvider");
	return ctx;
}
function useEntitlements() {
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
		canUseTheme: (t) => plan.themes.includes(t),
		themeAllowed: plan.themes.includes(theme),
		coachRemaining: account?.coachRemaining ?? plan.coach,
		coachLimit: account?.coachLimit ?? plan.coach
	};
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function ThemeSync() {
	const theme = useOsStore((s) => s.theme);
	(0, import_react.useEffect)(() => {
		useOsStore.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.dataset.theme = theme;
		const color = getComputedStyle(document.documentElement).getPropertyValue("--theme-color").trim();
		if (!color) return;
		let meta = document.querySelector("meta[name=\"theme-color\"]");
		if (!meta) {
			meta = document.createElement("meta");
			meta.setAttribute("name", "theme-color");
			document.head.appendChild(meta);
		}
		meta.setAttribute("content", color);
	}, [theme]);
	return null;
}
var styles_default = "/assets/styles-B4YnCudE.css";
var APP_NAME = "actr.one";
var fetchSessionUser = createServerFn({ method: "GET" }).handler(createSsrRpc("2c4985e96c199268f7f639534cb5e8e31d6b19d43286bf77416413db60ffde26"));
var Route$14 = createRootRoute({
	beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: `${APP_NAME} — Your career, directed` },
			{
				name: "description",
				content: "Run the work. Book the room. actr.one is the career command center for actors — from first self-tape to a full book. Call Sheet is free."
			},
			{
				name: "application-name",
				content: APP_NAME
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: APP_NAME
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "theme-color",
				content: "#F4F1EA"
			},
			{
				name: "format-detection",
				content: "telephone=no"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
			}
		]
	}),
	component: Root
});
var THEME_BOOT = `(function(){try{var r=localStorage.getItem("actr-one-os-v2");if(!r)return;var t=JSON.parse(r).state.theme;if(t)document.documentElement.dataset.theme=t;}catch(e){}})();`;
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_BOOT } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccountProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSync, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, { position: "bottom-right" })
				] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$12 = () => import("./routes-NNcKHm82.mjs");
var Route$13 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./login-DnRnQ7XU.mjs");
var Route$12 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./pricing-CRpQq_gC.mjs");
var Route$11 = createFileRoute("/pricing")({
	validateSearch: (s) => ({ highlight: s.highlight === "studio" || s.highlight === "pro" || s.highlight === "free" ? s.highlight : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./register-Da9h2TwY.mjs");
var Route$10 = createFileRoute("/register")({
	validateSearch: (s) => ({ plan: s.plan === "studio" || s.plan === "pro" ? s.plan : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./studio-KsoNWFhi.mjs");
var Route$9 = createFileRoute("/studio")({
	validateSearch: (s) => ({ upgrade: s.upgrade === "studio" || s.upgrade === "pro" ? s.upgrade : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./studio-D1C66H5o.mjs");
var Route$8 = createFileRoute("/studio/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./analytics-TGq30yOH.mjs");
var Route$7 = createFileRoute("/studio/analytics")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./auditions-D6uh0HAD.mjs");
var Route$6 = createFileRoute("/studio/auditions")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./coach-Dh6e4T84.mjs");
var Route$5 = createFileRoute("/studio/coach")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./notes-CQDBrqYK.mjs");
var Route$4 = createFileRoute("/studio/notes")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./settings-Bc1epp92.mjs");
var Route$3 = createFileRoute("/studio/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./tapes-DUwD8pWQ.mjs");
var Route$2 = createFileRoute("/studio/tapes")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./training-B4nzNdeg.mjs");
var Route$1 = createFileRoute("/studio/training")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var LoginRoute = Route$12.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$14
});
var PricingRoute = Route$11.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$14
});
var RegisterRoute = Route$10.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$14
});
var StudioRoute = Route$9.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$14
});
var StudioIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => StudioRoute
});
var StudioAnalyticsRoute = Route$7.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => StudioRoute
});
var StudioAuditionsRoute = Route$6.update({
	id: "/auditions",
	path: "/auditions",
	getParentRoute: () => StudioRoute
});
var StudioCoachRoute = Route$5.update({
	id: "/coach",
	path: "/coach",
	getParentRoute: () => StudioRoute
});
var StudioNotesRoute = Route$4.update({
	id: "/notes",
	path: "/notes",
	getParentRoute: () => StudioRoute
});
var StudioSettingsRoute = Route$3.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => StudioRoute
});
var StudioTapesRoute = Route$2.update({
	id: "/tapes",
	path: "/tapes",
	getParentRoute: () => StudioRoute
});
var StudioTrainingRoute = Route$1.update({
	id: "/training",
	path: "/training",
	getParentRoute: () => StudioRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$14
});
var StudioRouteChildren = {
	StudioAnalyticsRoute,
	StudioAuditionsRoute,
	StudioCoachRoute,
	StudioNotesRoute,
	StudioSettingsRoute,
	StudioTapesRoute,
	StudioTrainingRoute,
	StudioIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	LoginRoute,
	PricingRoute,
	RegisterRoute,
	StudioRoute: StudioRoute._addFileChildren(StudioRouteChildren),
	ApiAuthSplatRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { useCurrentUser as C, TRAINING_KINDS as S, createSsrRpc as T, AUDITION_STATUSES as _, useAccount as a, THEMES as b, cn as c, formatDate as d, greeting as f, weekdayLabel as g, uid as h, Route$11 as i, daysAgo as l, todayISO as m, Route$9 as n, useEntitlements as o, initials as p, Route$10 as r, useOsStore as s, router_exports as t, firstName as u, AUDITION_TYPES as v, useCurrentUserState as w, THEME_META as x, DASHBOARD_MODULES as y };
