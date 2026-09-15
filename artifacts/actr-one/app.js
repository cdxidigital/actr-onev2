const STORAGE_KEY = "actr-one-os-v2";

const SEED = {
  profile: { name: "Jordan Mitchell", plan: "Studio", initials: "JM" },
  theme: "studio",
  auditions: [
    { id: "a1", title: "The Last Signal", role: "Mara / Lead", type: "Self-tape", date: todayISO(), time: "16:00", status: "Preparing", notes: "Keep the first beat quiet. Let the static do the work." },
    { id: "a2", title: "North Star", role: "Detective Ellis", type: "In-person", date: offsetISO(1), time: "10:30", status: "Confirmed", notes: "Callback chemistry read." },
    { id: "a3", title: "Cedar House", role: "Alex / Recurring", type: "Callback", date: offsetISO(5), time: "14:15", status: "Callback", notes: "Series regular energy, not guest." },
    { id: "a4", title: "The Orchard", role: "Sam", type: "Self-tape", date: offsetISO(-3), time: "12:00", status: "Submitted", notes: "" },
    { id: "a5", title: "Glass Animals", role: "Riley", type: "Self-tape", date: offsetISO(-6), time: "09:00", status: "Submitted", notes: "" },
    { id: "a6", title: "Quiet Hours", role: "Jordan", type: "In-person", date: offsetISO(-20), time: "11:00", status: "Booked", notes: "Booked. Hold dates through August." }
  ],
  tapes: [
    { id: "t1", auditionId: "a1", title: "The Last Signal — sides 12–16", due: todayISO(), checklist: [
      { id: "c1", label: "Mark sides and beats", done: true },
      { id: "c2", label: "20 min silent run", done: false },
      { id: "c3", label: "Light and frame check", done: false },
      { id: "c4", label: "Record two full takes", done: false }
    ]}
  ],
  notes: [
    { id: "n1", title: "Mara — inner life", body: "She hears the signal before anyone else. Not gifted. Just unwilling to look away. Play the listening, not the knowing.", updated: Date.now() - 3600e3 },
    { id: "n2", title: "Ellis — physical score", body: "Weight in the heels. Hands stay empty. The badge is a last resort, not an identity.", updated: Date.now() - 86400e3 }
  ],
  training: [
    { id: "tr1", title: "Cold read drills", kind: "Scene study", minutes: 45, date: todayISO() },
    { id: "tr2", title: "Vocal warm-up", kind: "Voice", minutes: 20, date: offsetISO(-1) },
    { id: "tr3", title: "Movement class", kind: "Physicality", minutes: 60, date: offsetISO(-3) }
  ],
  coach: [
    { from: "ai", text: "I'm already looking at your board. The highest-leverage move today is finishing The Last Signal with a quiet first take. Want a 20-minute focus plan?" }
  ]
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
function offsetISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function uid(prefix) {
  return prefix + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
}
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(SEED);
    return { ...structuredClone(SEED), ...JSON.parse(raw) };
  } catch {
    return structuredClone(SEED);
  }
}
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = load();
let view = "overview";
let pipelineFilter = "All";
let auditionFilter = "All";
let selectedId = null;
let commandQuery = "";
let commandIndex = 0;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function applyTheme() {
  document.documentElement.dataset.theme = state.theme || "studio";
}
function initials(name) {
  return name.split(" ").filter(Boolean).map(p => p[0]).join("").slice(0, 2).toUpperCase() || "YO";
}
function formatDate(iso) {
  if (!iso) return "TBD";
  const d = new Date(iso + "T12:00:00");
  const t = new Date();
  const same = d.toDateString() === t.toDateString();
  const tom = new Date(t); tom.setDate(t.getDate() + 1);
  if (same) return "Today";
  if (d.toDateString() === tom.toDateString()) return "Tomorrow";
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}
function weekdayLabel() {
  return new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function firstName() {
  return (state.profile.name || "there").split(" ")[0];
}

function healthScore() {
  const active = state.auditions.filter(a => !["Closed"].includes(a.status)).length;
  const booked = state.auditions.filter(a => a.status === "Booked").length;
  const trainWeek = state.training.filter(t => daysAgo(t.date) <= 7).length;
  const tapesDone = state.tapes.flatMap(t => t.checklist).filter(c => c.done).length;
  const tapesAll = Math.max(1, state.tapes.flatMap(t => t.checklist).length);
  const consistency = Math.min(100, 55 + trainWeek * 8 + streak() * 3);
  const readiness = Math.min(100, 40 + Math.round((tapesDone / tapesAll) * 40) + (state.notes.length * 4));
  const momentum = Math.min(100, 45 + active * 5 + booked * 12);
  const total = Math.round(consistency * 0.4 + readiness * 0.3 + momentum * 0.3);
  return { total, consistency, readiness, momentum };
}
function daysAgo(iso) {
  return Math.round((Date.now() - new Date(iso + "T12:00:00").getTime()) / 86400000);
}
function streak() {
  const days = new Set(state.training.map(t => t.date));
  let n = 0;
  for (let i = 0; i < 30; i++) {
    const key = offsetISO(-i);
    if (days.has(key)) n++;
    else if (i > 0) break;
  }
  return n;
}
function weekBars() {
  return Array.from({ length: 7 }, (_, i) => {
    const iso = offsetISO(i - 6);
    const mins = state.training.filter(t => t.date === iso).reduce((s, t) => s + Number(t.minutes || 0), 0);
    return { iso, mins, label: new Date(iso + "T12:00:00").toLocaleDateString(undefined, { weekday: "narrow" }) };
  });
}
function pipeline() {
  const groups = [
    { label: "Submitted", statuses: ["Submitted", "New"] },
    { label: "Callback", statuses: ["Callback", "Preparing", "Confirmed"] },
    { label: "Booked", statuses: ["Booked"] }
  ];
  return groups.map(g => ({
    ...g,
    items: state.auditions.filter(a => g.statuses.includes(a.status))
  }));
}

function toast(msg) {
  const wrap = $("#toasts");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

function setView(next) {
  view = next;
  closeMenus();
  render();
}

function closeMenus() {
  $("#themeMenu")?.classList.add("hidden");
  $("#drawer")?.classList.remove("open");
  $("#drawerBack")?.classList.add("hidden");
  $("#modal")?.classList.add("hidden");
  $("#command")?.classList.add("hidden");
}

function openModal(html) {
  const modal = $("#modal");
  modal.innerHTML = html;
  modal.classList.remove("hidden");
  modal.querySelector("input,textarea,select")?.focus();
}

function coachReply(question) {
  const q = question.toLowerCase();
  const next = [...state.auditions].sort((a, b) => a.date.localeCompare(b.date)).find(a => ["Preparing", "Confirmed", "New"].includes(a.status));
  const h = healthScore();
  if (q.includes("focus") || q.includes("today") || q.includes("plan")) {
    return next
      ? `Twenty minutes on ${next.title}. Do a silent run of the first page, then one full take without judging it. Your board is strongest when preparation stays unfinished until the tape is in.`
      : "No deadline is burning. Log a 25-minute cold-read drill so the instrument stays warm.";
  }
  if (q.includes("health") || q.includes("score") || q.includes("analytic")) {
    return `Career health is ${h.total}. Consistency ${h.consistency}, readiness ${h.readiness}, momentum ${h.momentum}. The fastest lift is another training mark this week — streaks compound faster than submissions.`;
  }
  if (q.includes("tape") || q.includes("self")) {
    const tape = state.tapes[0];
    const left = tape ? tape.checklist.filter(c => !c.done).map(c => c.label) : [];
    return left.length
      ? `On ${tape.title}, still open: ${left.join("; ")}. Finish lighting and two full takes. Send the quieter one.`
      : "Your self-tape checklist is clear. If a new side lands, build the checklist before you rehearse.";
  }
  if (q.includes("note") || q.includes("character") || q.includes("mara") || q.includes("ellis")) {
    const note = state.notes[0];
    return note ? `Keep this close: “${note.body}” That’s enough. Don’t decorate it.` : "Open a character note before the next tape. One sentence of inner life beats a page of result-oriented direction.";
  }
  if (q.includes("book") || q.includes("pipeline") || q.includes("audition")) {
    const booked = state.auditions.filter(a => a.status === "Booked").length;
    const live = state.auditions.filter(a => !["Closed", "Booked"].includes(a.status)).length;
    return `${live} live opportunities, ${booked} booked. Protect the booked hold and treat ${next ? next.title : "the next tape"} as the only urgent craft problem.`;
  }
  return next
    ? `I would spend the next block on ${next.title} (${next.role}). Ask a more specific question — focus plan, tape notes, or career health — and I’ll go deeper on your actual board.`
    : "Your slate is quiet. Add an audition or log training so I have a real pattern to work with.";
}

function renderLanding() {
  $("#landing").classList.toggle("hidden", location.hash.startsWith("#app"));
  $("#app").classList.toggle("hidden", !location.hash.startsWith("#app"));
}

function enterApp() {
  location.hash = "#app/overview";
  view = "overview";
  render();
}

function render() {
  applyTheme();
  renderLanding();
  if (!location.hash.startsWith("#app")) return;

  const hashView = location.hash.split("/")[1];
  if (hashView && hashView !== view) view = hashView;

  $("#liveDate").textContent = weekdayLabel();
  $("#profileName").textContent = state.profile.name;
  $("#profilePlan").textContent = state.profile.plan + " plan";
  $("#avatar").textContent = initials(state.profile.name);
  $("#auditionCount").textContent = state.auditions.filter(a => !["Closed", "Booked"].includes(a.status)).length;
  $$("[data-nav]").forEach(btn => btn.classList.toggle("active", btn.dataset.nav === view));

  const root = $("#viewRoot");
  const pages = {
    overview: renderOverview,
    auditions: renderAuditions,
    tapes: renderTapes,
    notes: renderNotes,
    training: renderTraining,
    analytics: renderAnalytics,
    coach: renderCoach,
    settings: renderSettings
  };
  root.innerHTML = (pages[view] || renderOverview)();
  bindViewEvents();
}

function renderOverview() {
  const h = healthScore();
  const upcoming = [...state.auditions].filter(a => !["Closed"].includes(a.status)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  const focus = upcoming[0];
  const bars = weekBars();
  const max = Math.max(30, ...bars.map(b => b.mins));
  const cols = pipeline();
  return `
    <div class="page-head">
      <div>
        <div class="eyebrow">Command center / ${weekdayLabel()}</div>
        <h1>${greeting()}, ${firstName()}<span style="color:var(--primary)">.</span></h1>
        <p>Three honest moves will keep the instrument ahead of the industry.</p>
      </div>
      <button class="btn btn-primary" data-action="add-audition">+ Add audition</button>
    </div>
    <section class="focus-rail">
      <div>
        <span class="eyebrow">Today's focus</span>
        <strong>${focus ? `Prepare ${focus.title}` : "Protect the instrument"}</strong>
        <small>${focus ? `${focus.type} · ${formatDate(focus.date)} ${focus.time || ""}` : "No urgent deadline. Log training or add a role."}</small>
      </div>
      <button class="btn btn-ghost" data-nav-goto="coach">Open focus plan →</button>
    </section>
    <div class="stats">
      <div><span class="eyebrow">Due soon</span><strong>${upcoming.filter(a => daysAgo(a.date) <= 0).length} call${upcoming.filter(a => daysAgo(a.date) <= 0).length === 1 ? "" : "s"}</strong><small>${focus ? focus.title : "Clear board"}</small></div>
      <div><span class="eyebrow">In motion</span><strong>${state.auditions.filter(a => !["Closed"].includes(a.status)).length} auditions</strong><small>Across ${cols.filter(c => c.items.length).length} active stages</small></div>
      <div><span class="eyebrow">Streak</span><strong>${streak()} day${streak() === 1 ? "" : "s"}</strong><small>Preparation rhythm</small></div>
    </div>
    <div class="grid g-main">
      <div class="grid">
        <div class="grid g-2">
          <section class="card">
            <div class="eyebrow">Career health</div>
            <h2>Looking ${h.total >= 80 ? "strong" : h.total >= 60 ? "steady" : "thin"}</h2>
            <div class="score-wrap">
              <div class="ring" style="--score:${h.total * 3.6}deg"><div class="ring-inner"><b>${h.total}</b><div class="eyebrow">/ 100</div></div></div>
              <div class="metrics">
                <div><span class="dot"></span>Consistency <strong>${h.consistency}</strong></div>
                <div><span class="dot" style="background:var(--chart-2)"></span>Readiness <strong>${h.readiness}</strong></div>
                <div><span class="dot" style="background:var(--chart-3)"></span>Momentum <strong>${h.momentum}</strong></div>
              </div>
            </div>
          </section>
          <section class="card move-card">
            <div class="eyebrow">Your next move</div>
            <h2>Turn preparation into presence.</h2>
            <p>${focus ? `A focused rehearsal before ${focus.title} is the highest-leverage move on your board.` : "Use the quiet to train. Momentum is a practice, not a mood."}</p>
            <button class="btn btn-ghost" style="margin-top:16px;border-color:color-mix(in oklab, currentColor 30%, transparent)" data-nav-goto="coach">Ask your coach →</button>
          </section>
        </div>
        <section class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
            <div><div class="eyebrow">Your pipeline</div><h2>Audition board</h2></div>
            <button class="btn btn-ghost" data-nav-goto="auditions">View all</button>
          </div>
          <div class="grid g-3" style="margin-top:16px">
            ${cols.map(col => `
              <div>
                <div class="eyebrow">${col.label} · ${col.items.length}</div>
                <div class="list">
                  ${col.items.slice(0, 3).map(item => `
                    <button class="row" data-open-audition="${item.id}">
                      <div><strong>${item.title}</strong><div class="meta">${item.role}</div></div>
                    </button>`).join("") || `<div class="empty">None yet</div>`}
                </div>
              </div>`).join("")}
          </div>
        </section>
      </div>
      <aside class="grid">
        <section class="card">
          <div class="eyebrow">On deck</div>
          <h2>Upcoming</h2>
          <div class="list">
            ${upcoming.map(item => `
              <button class="row" data-open-audition="${item.id}">
                <div><strong>${item.title}</strong><div class="meta">${item.role} · ${item.type}</div></div>
                <span class="pill st-${item.status}">${item.status}</span>
              </button>`).join("") || `<div class="empty">Nothing on deck</div>`}
          </div>
          <button class="btn btn-ghost" style="width:100%;margin-top:10px" data-action="add-audition">+ Add to pipeline</button>
        </section>
        <section class="coach-card">
          <div class="eyebrow">Studio feature</div>
          <h2>Meet your career coach.</h2>
          <p>A second set of eyes on your patterns, choices, and next best move.</p>
          <button class="btn btn-primary" style="margin-top:16px" data-nav-goto="coach">Start a conversation</button>
          <div class="coach-orb"></div>
        </section>
        <section class="card">
          <div class="eyebrow">This week</div>
          <h2>Your rhythm</h2>
          <div class="bars">
            ${bars.map((b, i) => `<span><i class="${i === 6 ? "on" : ""}" style="height:${Math.max(8, (b.mins / max) * 100)}%"></i>${b.label}</span>`).join("")}
          </div>
        </section>
      </aside>
    </div>
  `;
}

function renderAuditions() {
  const items = state.auditions.filter(a => auditionFilter === "All" || a.status === auditionFilter);
  const statuses = ["All", "Preparing", "Confirmed", "Submitted", "Callback", "Booked", "Closed"];
  return `
    <div class="page-head">
      <div>
        <div class="eyebrow">Pipeline</div>
        <h1>Auditions<span style="color:var(--primary)">.</span></h1>
        <p>Every opportunity, one board. Status changes write themselves into health and analytics.</p>
      </div>
      <button class="btn btn-primary" data-action="add-audition">+ Add audition</button>
    </div>
    <div class="tabs" style="margin-bottom:16px">
      ${statuses.map(s => `<button class="tab ${auditionFilter === s ? "on" : ""}" data-aud-filter="${s}">${s}</button>`).join("")}
    </div>
    <div class="list">
      ${items.map(a => `
        <button class="row" data-open-audition="${a.id}">
          <div>
            <strong>${a.title}</strong>
            <div class="meta">${a.role} · ${a.type} · ${formatDate(a.date)} ${a.time || ""}</div>
          </div>
          <span class="pill st-${a.status}">${a.status}</span>
        </button>`).join("") || `<div class="empty">No auditions in this filter. Add one to start the board.</div>`}
    </div>
  `;
}

function renderTapes() {
  return `
    <div class="page-head">
      <div>
        <div class="eyebrow">Craft room</div>
        <h1>Self-tapes<span style="color:var(--primary)">.</span></h1>
        <p>Checklists that survive the day you actually have to press record.</p>
      </div>
      <button class="btn btn-primary" data-action="add-tape">+ New tape</button>
    </div>
    <div class="grid g-2">
      ${state.tapes.map(tape => {
        const done = tape.checklist.filter(c => c.done).length;
        return `<section class="card">
          <div class="eyebrow">${done}/${tape.checklist.length} complete</div>
          <h2>${tape.title}</h2>
          <p class="meta" style="color:var(--muted-fg)">Due ${formatDate(tape.due)}</p>
          <div style="margin-top:12px">
            ${tape.checklist.map(c => `
              <label class="check">
                <input type="checkbox" data-toggle-check="${tape.id}:${c.id}" ${c.done ? "checked" : ""}>
                <span class="${c.done ? "done" : ""}">${c.label}</span>
              </label>`).join("")}
          </div>
          <div class="actions" style="margin-top:12px;justify-content:flex-start">
            <button class="btn btn-ghost" data-add-check="${tape.id}">+ Step</button>
          </div>
        </section>`;
      }).join("") || `<div class="empty">No tapes yet. Create one from an upcoming self-tape audition.</div>`}
    </div>
  `;
}

function renderNotes() {
  const notes = [...state.notes].sort((a, b) => b.updated - a.updated);
  return `
    <div class="page-head">
      <div>
        <div class="eyebrow">Inner life</div>
        <h1>Scripts & notes<span style="color:var(--primary)">.</span></h1>
        <p>Keep the private score close. One true sentence is enough.</p>
      </div>
      <button class="btn btn-primary" data-action="add-note">+ New note</button>
    </div>
    <div class="note-list">
      ${notes.map(n => `
        <button class="note" data-open-note="${n.id}">
          <div class="eyebrow">${new Date(n.updated).toLocaleString()}</div>
          <h3>${n.title}</h3>
          <p style="color:var(--muted-fg);margin:8px 0 0">${escapeHtml(n.body).slice(0, 180)}${n.body.length > 180 ? "…" : ""}</p>
        </button>`).join("") || `<div class="empty">No notes yet. Capture the inner life before the result.</div>`}
    </div>
  `;
}

function renderTraining() {
  const rows = [...state.training].sort((a, b) => b.date.localeCompare(a.date));
  const weekMins = state.training.filter(t => daysAgo(t.date) <= 7).reduce((s, t) => s + Number(t.minutes || 0), 0);
  return `
    <div class="page-head">
      <div>
        <div class="eyebrow">The instrument</div>
        <h1>Training<span style="color:var(--primary)">.</span></h1>
        <p>${weekMins} minutes logged in the last 7 days. Streak ${streak()}.</p>
      </div>
      <button class="btn btn-primary" data-action="add-training">+ Log session</button>
    </div>
    <div class="list">
      ${rows.map(t => `
        <div class="row">
          <div>
            <strong>${t.title}</strong>
            <div class="meta">${t.kind} · ${t.minutes} min · ${formatDate(t.date)}</div>
          </div>
          <button class="btn btn-ghost" data-del-training="${t.id}">Remove</button>
        </div>`).join("") || `<div class="empty">Log your first session to start a streak.</div>`}
    </div>
  `;
}

function renderAnalytics() {
  const h = healthScore();
  const byStatus = ["Preparing", "Confirmed", "Submitted", "Callback", "Booked", "Closed"].map(s => ({
    s, n: state.auditions.filter(a => a.status === s).length
  }));
  const max = Math.max(1, ...byStatus.map(x => x.n));
  return `
    <div class="page-head">
      <div>
        <div class="eyebrow">Signal</div>
        <h1>Analytics<span style="color:var(--primary)">.</span></h1>
        <p>Not vanity charts. A readable picture of how you actually work.</p>
      </div>
    </div>
    <div class="stats">
      <div><span class="eyebrow">Health</span><strong>${h.total}</strong><small>Weighted across craft and pipeline</small></div>
      <div><span class="eyebrow">Booked</span><strong>${state.auditions.filter(a => a.status === "Booked").length}</strong><small>Roles currently held</small></div>
      <div><span class="eyebrow">Notes</span><strong>${state.notes.length}</strong><small>Living character files</small></div>
    </div>
    <section class="card">
      <div class="eyebrow">Pipeline mix</div>
      <h2>Where the work sits</h2>
      <div class="bars" style="height:140px">
        ${byStatus.map(x => `<span><i class="on" style="height:${Math.max(8, (x.n / max) * 100)}%"></i>${x.s.slice(0, 3)}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderCoach() {
  return `
    <div class="page-head">
      <div>
        <div class="eyebrow">Second set of eyes</div>
        <h1>Career coach<span style="color:var(--primary)">.</span></h1>
        <p>Grounded in your board — auditions, tapes, notes, and training — not generic pep.</p>
      </div>
    </div>
    <section class="card">
      <div class="chat" id="chatLog">
        ${state.coach.map(m => `<div class="bubble ${m.from}">${escapeHtml(m.text)}</div>`).join("")}
      </div>
      <form id="coachForm" class="form-grid">
        <input name="q" placeholder="Ask about today, a tape, or your health score" autocomplete="off">
        <div class="actions">
          <button class="btn btn-ghost" type="button" data-coach-prompt="Give me a 20 minute focus plan">Focus plan</button>
          <button class="btn btn-primary" type="submit">Send</button>
        </div>
      </form>
    </section>
  `;
}

function renderSettings() {
  return `
    <div class="page-head">
      <div>
        <div class="eyebrow">Studio</div>
        <h1>Settings<span style="color:var(--primary)">.</span></h1>
      </div>
    </div>
    <section class="card form-grid" style="max-width:560px">
      <label>Name<input id="setName" value="${escapeAttr(state.profile.name)}"></label>
      <label>Plan
        <select id="setPlan">
          ${["Free", "Studio", "Pro"].map(p => `<option ${p === state.profile.plan ? "selected" : ""}>${p}</option>`).join("")}
        </select>
      </label>
      <div class="actions">
        <button class="btn btn-ghost" data-action="reset">Reset demo data</button>
        <button class="btn btn-primary" data-action="save-profile">Save profile</button>
      </div>
    </section>
  `;
}

function escapeHtml(s = "") {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function escapeAttr(s = "") { return escapeHtml(s); }

function auditionForm(existing) {
  const a = existing || { title: "", role: "", type: "Self-tape", date: todayISO(), time: "10:00", status: "New", notes: "" };
  return `
    <div style="display:flex;justify-content:space-between;gap:12px">
      <div><div class="eyebrow">${existing ? "Edit" : "New entry"}</div><h2 style="margin:6px 0 0">${existing ? existing.title : "Add an audition"}</h2></div>
      <button class="icon-btn" data-close>×</button>
    </div>
    <form id="audForm" class="form-grid" style="margin-top:18px">
      <label>Project<input name="title" required value="${escapeAttr(a.title)}" placeholder="The Glass House"></label>
      <label>Role<input name="role" required value="${escapeAttr(a.role)}" placeholder="Lead / Guest / Recurring"></label>
      <div class="grid g-2">
        <label>Type
          <select name="type">${["Self-tape", "In-person", "Callback", "Chemistry"].map(t => `<option ${t === a.type ? "selected" : ""}>${t}</option>`).join("")}</select>
        </label>
        <label>Status
          <select name="status">${["New", "Preparing", "Confirmed", "Submitted", "Callback", "Booked", "Closed"].map(t => `<option ${t === a.status ? "selected" : ""}>${t}</option>`).join("")}</select>
        </label>
      </div>
      <div class="grid g-2">
        <label>Date<input type="date" name="date" value="${a.date || todayISO()}"></label>
        <label>Time<input type="time" name="time" value="${a.time || "10:00"}"></label>
      </div>
      <label>Notes<textarea name="notes">${escapeHtml(a.notes || "")}</textarea></label>
      <div class="actions">
        ${existing ? `<button type="button" class="btn btn-danger" data-del-audition="${existing.id}">Delete</button>` : ""}
        <button type="button" class="btn btn-ghost" data-close>Cancel</button>
        <button class="btn btn-primary" type="submit">${existing ? "Save" : "Add audition"}</button>
      </div>
    </form>
  `;
}

function noteForm(existing) {
  const n = existing || { title: "", body: "" };
  return `
    <div style="display:flex;justify-content:space-between"><div class="eyebrow">${existing ? "Edit note" : "New note"}</div><button class="icon-btn" data-close>×</button></div>
    <form id="noteForm" class="form-grid" style="margin-top:16px">
      <label>Title<input name="title" required value="${escapeAttr(n.title)}"></label>
      <label>Body<textarea name="body" required>${escapeHtml(n.body)}</textarea></label>
      <div class="actions">
        ${existing ? `<button type="button" class="btn btn-danger" data-del-note="${existing.id}">Delete</button>` : ""}
        <button type="button" class="btn btn-ghost" data-close>Cancel</button>
        <button class="btn btn-primary">${existing ? "Save" : "Create"}</button>
      </div>
    </form>
  `;
}

function bindViewEvents() {
  $$("[data-nav-goto]").forEach(btn => btn.onclick = () => {
    view = btn.dataset.navGoto;
    location.hash = "#app/" + view;
    render();
  });
  $$("[data-aud-filter]").forEach(btn => btn.onclick = () => { auditionFilter = btn.dataset.audFilter; render(); });
  $$("[data-open-audition]").forEach(btn => btn.onclick = () => {
    const a = state.auditions.find(x => x.id === btn.dataset.openAudition);
    if (a) openModal(auditionForm(a));
  });
  $$("[data-open-note]").forEach(btn => btn.onclick = () => {
    const n = state.notes.find(x => x.id === btn.dataset.openNote);
    if (n) openModal(noteForm(n));
  });
  $$("[data-toggle-check]").forEach(box => box.onchange = () => {
    const [tid, cid] = box.dataset.toggleCheck.split(":");
    const tape = state.tapes.find(t => t.id === tid);
    const item = tape?.checklist.find(c => c.id === cid);
    if (item) { item.done = box.checked; save(); toast(item.done ? "Step complete" : "Step reopened"); render(); }
  });
  $$("[data-add-check]").forEach(btn => btn.onclick = () => {
    const label = prompt("Checklist step");
    if (!label) return;
    const tape = state.tapes.find(t => t.id === btn.dataset.addCheck);
    tape.checklist.push({ id: uid("c"), label, done: false });
    save(); render();
  });
  $$("[data-del-training]").forEach(btn => btn.onclick = () => {
    state.training = state.training.filter(t => t.id !== btn.dataset.delTraining);
    save(); toast("Session removed"); render();
  });
  const coachForm = $("#coachForm");
  if (coachForm) coachForm.onsubmit = (e) => {
    e.preventDefault();
    const q = new FormData(coachForm).get("q").toString().trim();
    if (!q) return;
    pushCoach(q);
  };
  $$("[data-coach-prompt]").forEach(btn => btn.onclick = () => pushCoach(btn.dataset.coachPrompt));
  $$("[data-action='save-profile']").forEach(btn => btn.onclick = () => {
    state.profile.name = $("#setName").value.trim() || state.profile.name;
    state.profile.plan = $("#setPlan").value;
    save(); toast("Profile saved"); render();
  });
}

function pushCoach(q) {
  state.coach.push({ from: "me", text: q });
  state.coach.push({ from: "ai", text: coachReply(q) });
  save(); render();
  const log = $("#chatLog");
  if (log) log.scrollTop = log.scrollHeight;
}

function commandItems() {
  const q = commandQuery.trim().toLowerCase();
  const actions = [
    { kind: "Action", label: "Add an audition", run: () => openModal(auditionForm()) },
    { kind: "Action", label: "Log training session", run: () => openAddTraining() },
    { kind: "Action", label: "Ask career coach", run: () => setViewHash("coach") },
    { kind: "Action", label: "New character note", run: () => openModal(noteForm()) },
    { kind: "Go", label: "Overview", run: () => setViewHash("overview") },
    { kind: "Go", label: "Auditions", run: () => setViewHash("auditions") },
    { kind: "Go", label: "Self-tapes", run: () => setViewHash("tapes") },
    { kind: "Go", label: "Analytics", run: () => setViewHash("analytics") }
  ];
  const entities = [
    ...state.auditions.map(a => ({ kind: "Audition", label: `${a.title} · ${a.role}`, run: () => { setViewHash("auditions"); openModal(auditionForm(a)); } })),
    ...state.notes.map(n => ({ kind: "Note", label: n.title, run: () => { setViewHash("notes"); openModal(noteForm(n)); } }))
  ];
  return [...actions, ...entities].filter(i => !q || (i.label + i.kind).toLowerCase().includes(q)).slice(0, 12);
}
function setViewHash(v) {
  view = v;
  location.hash = "#app/" + v;
  $("#command").classList.add("hidden");
  render();
}
function renderCommand() {
  const items = commandItems();
  commandIndex = Math.max(0, Math.min(commandIndex, items.length - 1));
  $("#commandList").innerHTML = items.map((i, idx) => `
    <button class="${idx === commandIndex ? "active" : ""}" data-cmd="${idx}"><span>${escapeHtml(i.label)}</span><small>${i.kind}</small></button>
  `).join("") || `<div class="empty">No matches</div>`;
  $$("[data-cmd]").forEach(btn => btn.onclick = () => items[+btn.dataset.cmd].run());
}
function openCommand() {
  commandQuery = "";
  commandIndex = 0;
  $("#command").classList.remove("hidden");
  $("#commandInput").value = "";
  $("#commandInput").focus();
  renderCommand();
}

function openAddTraining() {
  openModal(`
    <div style="display:flex;justify-content:space-between"><div class="eyebrow">Instrument</div><button class="icon-btn" data-close>×</button></div>
    <h2 style="margin:6px 0 16px">Log training</h2>
    <form id="trainForm" class="form-grid">
      <label>Session<input name="title" required placeholder="Meisner repetition"></label>
      <label>Discipline
        <select name="kind">${["Scene study", "Voice", "Physicality", "Camera", "Cold read"].map(k => `<option>${k}</option>`).join("")}</select>
      </label>
      <div class="grid g-2">
        <label>Minutes<input type="number" min="5" name="minutes" value="30"></label>
        <label>Date<input type="date" name="date" value="${todayISO()}"></label>
      </div>
      <div class="actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save session</button></div>
    </form>
  `);
}

function bindGlobal() {
  document.body.addEventListener("click", (e) => {
    const t = e.target.closest("[data-action],[data-nav],[data-close],[data-del-audition],[data-del-note]");
    if (!t) {
      if (!e.target.closest(".theme-wrap")) $("#themeMenu")?.classList.add("hidden");
      return;
    }
    if (t.dataset.nav) {
      view = t.dataset.nav;
      location.hash = "#app/" + view;
      render();
    }
    if (t.dataset.close != null) $("#modal").classList.add("hidden");
    if (t.dataset.action === "add-audition") openModal(auditionForm());
    if (t.dataset.action === "add-note") openModal(noteForm());
    if (t.dataset.action === "add-training") openAddTraining();
    if (t.dataset.action === "add-tape") {
      const title = prompt("Tape title", "New self-tape");
      if (!title) return;
      state.tapes.unshift({
        id: uid("t"), auditionId: null, title, due: todayISO(),
        checklist: [
          { id: uid("c"), label: "Mark sides", done: false },
          { id: uid("c"), label: "Light and frame", done: false },
          { id: uid("c"), label: "Two full takes", done: false }
        ]
      });
      save(); toast("Tape created"); render();
    }
    if (t.dataset.action === "reset") {
      if (confirm("Reset to demo data?")) { state = structuredClone(SEED); save(); toast("Demo restored"); render(); }
    }
    if (t.dataset.delAudition) {
      state.auditions = state.auditions.filter(a => a.id !== t.dataset.delAudition);
      save(); $("#modal").classList.add("hidden"); toast("Audition removed"); render();
    }
    if (t.dataset.delNote) {
      state.notes = state.notes.filter(n => n.id !== t.dataset.delNote);
      save(); $("#modal").classList.add("hidden"); toast("Note removed"); render();
    }
  });

  document.body.addEventListener("submit", (e) => {
    if (e.target.id === "audForm") {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(e.target));
      const existing = selectedEditFromTitle(fd.title) && e.target.querySelector("[data-del-audition]");
      const id = existing ? existing.dataset.delAudition : uid("a");
      const rec = { id, title: fd.title.trim(), role: fd.role.trim(), type: fd.type, status: fd.status, date: fd.date, time: fd.time, notes: fd.notes };
      const idx = state.auditions.findIndex(a => a.id === id);
      if (idx >= 0) state.auditions[idx] = rec;
      else state.auditions.unshift(rec);
      save(); $("#modal").classList.add("hidden"); toast(idx >= 0 ? "Audition updated" : "Audition added"); render();
    }
    if (e.target.id === "noteForm") {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(e.target));
      const del = e.target.querySelector("[data-del-note]");
      const id = del ? del.dataset.delNote : uid("n");
      const rec = { id, title: fd.title.trim(), body: fd.body.trim(), updated: Date.now() };
      const idx = state.notes.findIndex(n => n.id === id);
      if (idx >= 0) state.notes[idx] = rec;
      else state.notes.unshift(rec);
      save(); $("#modal").classList.add("hidden"); toast("Note saved"); render();
    }
    if (e.target.id === "trainForm") {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(e.target));
      state.training.unshift({ id: uid("tr"), title: fd.title.trim(), kind: fd.kind, minutes: Number(fd.minutes || 0), date: fd.date });
      save(); $("#modal").classList.add("hidden"); toast("Session logged"); render();
    }
  });

  $("#openApp")?.addEventListener("click", enterApp);
  $("#openAppHero")?.addEventListener("click", enterApp);
  $("#menuBtn")?.addEventListener("click", () => {
    $("#drawer").classList.add("open");
    $("#drawerBack").classList.remove("hidden");
  });
  $("#drawerBack")?.addEventListener("click", closeMenus);
  $("#themeBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    $("#themeMenu").classList.toggle("hidden");
  });
  $$("[data-theme-set]").forEach(btn => btn.addEventListener("click", () => {
    state.theme = btn.dataset.themeSet;
    save(); applyTheme(); toast("Theme · " + btn.dataset.themeSet);
    $("#themeMenu").classList.add("hidden");
  }));
  $("#commandBtn")?.addEventListener("click", openCommand);
  $("#command")?.addEventListener("click", (e) => {
    if (e.target.id === "command") $("#command").classList.add("hidden");
  });
  $("#modal")?.addEventListener("click", (e) => {
    if (e.target.id === "modal") $("#modal").classList.add("hidden");
  });
  $("#commandInput")?.addEventListener("input", (e) => {
    commandQuery = e.target.value;
    commandIndex = 0;
    renderCommand();
  });
  $("#notifyBtn")?.addEventListener("click", () => {
    const due = state.auditions.filter(a => daysAgo(a.date) <= 1 && !["Closed", "Booked"].includes(a.status));
    toast(due.length ? `${due.length} upcoming: ${due[0].title}` : "No alerts right now");
  });

  window.addEventListener("hashchange", () => {
    if (location.hash.startsWith("#app")) {
      view = location.hash.split("/")[1] || "overview";
    }
    render();
  });
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (!location.hash.startsWith("#app")) enterApp();
      openCommand();
    }
    if (e.key === "Escape") closeMenus();
    if (!$("#command").classList.contains("hidden")) {
      const items = commandItems();
      if (e.key === "ArrowDown") { e.preventDefault(); commandIndex = (commandIndex + 1) % Math.max(1, items.length); renderCommand(); }
      if (e.key === "ArrowUp") { e.preventDefault(); commandIndex = (commandIndex - 1 + items.length) % Math.max(1, items.length); renderCommand(); }
      if (e.key === "Enter") { e.preventDefault(); items[commandIndex]?.run(); }
    }
  });
}

function selectedEditFromTitle() { return true; }

applyTheme();
document.addEventListener("DOMContentLoaded", () => {
  if (!location.hash) location.hash = "#home";
  bindGlobal();
  render();
});
