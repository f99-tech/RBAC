/* AttendHub — role switching, access rules, check-in, rendering */

const STORE_USER = "attendhub_user";
const STORE_LIVE = "attendhub_live_records";
const STORE_THEME = "attendhub_theme";

function getUserId() {
  return localStorage.getItem(STORE_USER) || "mgr";
}

function setUserId(id) {
  localStorage.setItem(STORE_USER, id);
}

function getUser() {
  return STAFF.find((s) => s.id === getUserId()) || STAFF[0];
}

function getLiveRecords() {
  try {
    return JSON.parse(localStorage.getItem(STORE_LIVE) || "[]");
  } catch {
    return [];
  }
}

function saveLiveRecords(list) {
  localStorage.setItem(STORE_LIVE, JSON.stringify(list));
}

function todayISO() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function nowHM() {
  const d = new Date();
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}

/** Merge seed history with live punches from this browser. */
function allRecords() {
  const live = getLiveRecords();
  const map = new Map();
  SEED_RECORDS.forEach((r) => map.set(r.id, r));
  live.forEach((r) => map.set(r.id, r));
  return Array.from(map.values()).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.staffId.localeCompare(b.staffId)));
}

function recordsFor(staffId) {
  return allRecords().filter((r) => r.staffId === staffId);
}

function todayRecord(staffId) {
  return allRecords().find((r) => r.staffId === staffId && r.date === todayISO());
}

function visibleStaff(user) {
  if (user.access === "admin") return STAFF.slice();
  if (user.access === "supervisor") {
    return STAFF.filter((s) => s.dept === user.dept || s.id === user.id);
  }
  return STAFF.filter((s) => s.id === user.id);
}

function canSeePerson(user, personId) {
  return visibleStaff(user).some((s) => s.id === personId);
}

function accessLabel(access) {
  if (access === "admin") return "Manager \u00b7 sees everyone";
  if (access === "supervisor") return "Supervisor \u00b7 sees own department";
  return "Staff \u00b7 sees own attendance only";
}

function statusMeta(status) {
  const map = {
    "on-time": { label: "On time", emoji: "\u2705", cls: "ok" },
    late: { label: "Late", emoji: "\u23f0", cls: "late" },
    "early-leave": { label: "Left early", emoji: "\ud83d\udeaa", cls: "warn" },
    absent: { label: "Absent", emoji: "\u274c", cls: "bad" },
    weekend: { label: "Weekend", emoji: "\ud83c\udf19", cls: "mute" },
    "checked-in": { label: "Checked in", emoji: "\ud83d\udfe2", cls: "live" },
    complete: { label: "Complete", emoji: "\ud83c\udfc1", cls: "ok" },
  };
  return map[status] || { label: status, emoji: "\u2022", cls: "mute" };
}

function formatDate(iso) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

function hoursBetween(a, b) {
  if (!a || !b) return "\u2014";
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  const mins = bh * 60 + bm - (ah * 60 + am);
  if (mins <= 0) return "\u2014";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h + "h " + String(m).padStart(2, "0") + "m";
}

function punchStatus(inn) {
  if (!inn) return "absent";
  const [h, m] = inn.split(":").map(Number);
  return h * 60 + m > 9 * 60 ? "late" : "on-time";
}

function applyTheme() {
  const t = localStorage.getItem(STORE_THEME) || "light";
  document.documentElement.dataset.theme = t;
}

function toggleTheme() {
  const next = (localStorage.getItem(STORE_THEME) || "light") === "light" ? "dark" : "light";
  localStorage.setItem(STORE_THEME, next);
  applyTheme();
}

function pageName() {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!file || file === "/") return "index.html";
  return file;
}

function buildHeader() {
  const user = getUser();
  const page = pageName();
  const canTeam = user.access !== "staff";

  const options = STAFF.map((s) => {
    const tag = s.access === "admin" ? "\ud83d\udc51 Manager" : s.access === "supervisor" ? "\u2b50 Lead" : "\ud83d\udc64 Staff";
    return `<option value="${s.id}" ${s.id === user.id ? "selected" : ""}>${s.emoji} ${s.name} \u2014 ${tag}</option>`;
  }).join("");

  return `
    <header class="topbar">
      <a class="brand" href="index.html">
        <span class="brand-mark">\u23f0</span>
        <span>
          <strong>AttendHub</strong>
          <small>Simple RBAC attendance</small>
        </span>
      </a>
      <nav class="nav">
        <a href="index.html" class="${page === "index.html" ? "on" : ""}">\ud83c\udfe0 Home</a>
        <a href="records.html" class="${page === "records.html" ? "on" : ""}">\ud83d\udcc5 Records</a>
        <a href="people.html" class="${page === "people.html" ? "on" : ""}">${canTeam ? "\ud83d\udc65 People" : "\ud83d\udc64 My card"}</a>
      </nav>
      <div class="top-actions">
        <button class="icon-btn" type="button" data-theme-toggle title="Switch theme">\ud83c\udf13</button>
        <div class="role-box">
          <label for="roleSwitch">Switch role</label>
          <select id="roleSwitch">${options}</select>
        </div>
      </div>
    </header>
  `;
}

function buildFooter() {
  return `
    <footer class="foot">
      <p>AttendHub demo \u00b7 no server \u00b7 roles change what you can see \u00b7 30 employees + 1 manager</p>
    </footer>
  `;
}

function mountChrome() {
  applyTheme();
  const hold = document.getElementById("app-header");
  const foot = document.getElementById("app-footer");
  if (hold) hold.innerHTML = buildHeader();
  if (foot) foot.innerHTML = buildFooter();

  const sel = document.getElementById("roleSwitch");
  if (sel) {
    sel.addEventListener("change", () => {
      setUserId(sel.value);
      location.reload();
    });
  }
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });

  const banner = document.getElementById("role-banner");
  if (banner) {
    const u = getUser();
    banner.innerHTML = `
      <span class="who-emoji">${u.emoji}</span>
      <div>
        <strong>Signed in as ${u.name}</strong>
        <p>${u.title} \u00b7 ${u.dept} \u00b7 ${accessLabel(u.access)}</p>
      </div>
    `;
    banner.style.setProperty("--accent", u.color);
  }
}

function checkIn() {
  const u = getUser();
  const iso = todayISO();
  const id = u.id + "-" + iso;
  const live = getLiveRecords().filter((r) => r.id !== id);
  live.push({
    id,
    staffId: u.id,
    date: iso,
    in: nowHM(),
    out: null,
    status: "checked-in",
  });
  saveLiveRecords(live);
  location.reload();
}

function checkOut() {
  const u = getUser();
  const iso = todayISO();
  const id = u.id + "-" + iso;
  const existing = todayRecord(u.id);
  const inn = existing && existing.in ? existing.in : nowHM();
  const out = nowHM();
  const late = punchStatus(inn) === "late";
  const [oh, om] = out.split(":").map(Number);
  const early = oh * 60 + om < 17 * 60 + 15;
  let status = "complete";
  if (late) status = "late";
  else if (early) status = "early-leave";
  else status = "on-time";

  const live = getLiveRecords().filter((r) => r.id !== id);
  live.push({ id, staffId: u.id, date: iso, in: inn, out, status });
  saveLiveRecords(live);
  location.reload();
}

function resetDemo() {
  localStorage.removeItem(STORE_LIVE);
  location.reload();
}

function renderDashboard() {
  const root = document.getElementById("dash");
  if (!root) return;
  const u = getUser();
  const today = todayRecord(u.id);
  const mine = recordsFor(u.id).filter((r) => r.status !== "weekend");
  const presentish = mine.filter((r) => r.in);
  const late = mine.filter((r) => r.status === "late").length;
  const absent = mine.filter((r) => r.status === "absent").length;
  const team = visibleStaff(u);
  const teamToday = team.map((p) => ({ p, r: todayRecord(p.id) }));

  const inOffice = teamToday.filter((x) => x.r && (x.r.status === "checked-in" || x.r.in) && x.r.status !== "absent" && x.r.status !== "weekend").length;

  let actions = "";
  if (!today || !today.in) {
    actions = `<button class="btn primary" data-checkin>\ud83d\udfe2 Check in now</button>`;
  } else if (!today.out && today.status === "checked-in") {
    actions = `<button class="btn warm" data-checkout>\ud83c\udfc1 Check out now</button>`;
  } else if (today.in && today.out) {
    actions = `<p class="done-note">You already closed today's shift. Nice work. \ud83c\udf89</p>`;
  } else if (today.in) {
    actions = `<button class="btn warm" data-checkout>\ud83c\udfc1 Check out now</button>`;
  }

  const todayCard = today
    ? `<div class="punch-times">
        <div><span>In</span><b>${today.in || "\u2014"}</b></div>
        <div><span>Out</span><b>${today.out || "\u2014"}</b></div>
        <div><span>Hours</span><b>${hoursBetween(today.in, today.out)}</b></div>
      </div>`
    : `<p class="hint">No punch yet today. Use the button below.</p>`;

  const scopeNote =
    u.access === "admin"
      ? "You can see every department."
      : u.access === "supervisor"
      ? `You can see the ${u.dept} team (${team.length} people).`
      : "You can only see your own punches.";

  const teamBlock =
    u.access === "staff"
      ? ""
      : `<section class="panel">
          <div class="panel-head">
            <h2>${u.access === "admin" ? "\ud83c\udfe2 Who is in today" : "\ud83d\udc65 My team today"}</h2>
            <span class="chip">${inOffice} punched in</span>
          </div>
          <div class="person-grid mini">
            ${teamToday
              .map(({ p, r }) => {
                const st = r ? statusMeta(r.status) : statusMeta("absent");
                return `<article class="person-card slim" style="--accent:${p.color}">
                  <div class="avatar">${p.emoji}</div>
                  <div>
                    <strong>${p.name}</strong>
                    <p>${p.title}</p>
                    <span class="badge ${st.cls}">${st.emoji} ${r && r.in ? r.in : st.label}</span>
                  </div>
                </article>`;
              })
              .join("")}
          </div>
        </section>`;

  root.innerHTML = `
    <section class="hero" style="--accent:${u.color}">
      <div>
        <p class="kicker">Good day \u2600\ufe0f</p>
        <h1>${u.emoji} ${u.name}</h1>
        <p class="lede">${u.title} \u00b7 ${u.dept}<br>${scopeNote}</p>
      </div>
      <div class="hero-clock">
        <div id="live-clock">--:--:--</div>
        <small>${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</small>
      </div>
    </section>

    <section class="stats">
      <article class="stat" style="--accent:#0d9488"><span>\ud83d\udcc5</span><div><b>${presentish.length}</b><p>Days present (14-day sample)</p></div></article>
      <article class="stat" style="--accent:#d97706"><span>\u23f0</span><div><b>${late}</b><p>Late days</p></div></article>
      <article class="stat" style="--accent:#e11d48"><span>\u274c</span><div><b>${absent}</b><p>Absent days</p></div></article>
      <article class="stat" style="--accent:${u.color}"><span>\ud83d\udc40</span><div><b>${team.length}</b><p>People in your view</p></div></article>
    </section>

    <section class="panel punch">
      <div class="panel-head">
        <h2>\ud83d\udccd Today's punch</h2>
        <span class="badge ${(today && statusMeta(today.status).cls) || "mute"}">${today ? statusMeta(today.status).emoji + " " + statusMeta(today.status).label : "Not started"}</span>
      </div>
      ${todayCard}
      <div class="actions">${actions}
        <button class="btn ghost" data-reset>\u267b\ufe0f Reset demo punches</button>
      </div>
    </section>
    ${teamBlock}
  `;

  root.querySelector("[data-checkin]")?.addEventListener("click", checkIn);
  root.querySelector("[data-checkout]")?.addEventListener("click", checkOut);
  root.querySelector("[data-reset]")?.addEventListener("click", resetDemo);

  const clock = document.getElementById("live-clock");
  const tick = () => {
    if (!clock) return;
    clock.textContent = new Date().toLocaleTimeString("en-GB");
  };
  tick();
  setInterval(tick, 1000);
}

function renderRecords() {
  const root = document.getElementById("records");
  if (!root) return;
  const u = getUser();
  const people = visibleStaff(u);
  const filterId = new URLSearchParams(location.search).get("who");
  const selected = people.find((p) => p.id === filterId) || (u.access === "staff" ? u : null);

  const options = people
    .map((p) => `<option value="${p.id}" ${selected && selected.id === p.id ? "selected" : ""}>${p.emoji} ${p.name}</option>`)
    .join("");

  const rowsSource = selected ? recordsFor(selected.id) : allRecords().filter((r) => people.some((p) => p.id === r.staffId));

  const rows = rowsSource
    .map((r) => {
      const person = STAFF.find((s) => s.id === r.staffId);
      const st = statusMeta(r.status);
      return `<tr>
        <td>${formatDate(r.date)}</td>
        ${selected ? "" : `<td><span class="mini-who">${person.emoji} ${person.name}</span></td>`}
        <td>${r.in || "\u2014"}</td>
        <td>${r.out || "\u2014"}</td>
        <td>${hoursBetween(r.in, r.out)}</td>
        <td><span class="badge ${st.cls}">${st.emoji} ${st.label}</span></td>
      </tr>`;
    })
    .join("");

  const title = selected
    ? `${selected.emoji} ${selected.name}'s attendance`
    : u.access === "admin"
    ? "\ud83d\udccb All check-in / check-out"
    : `\ud83d\udccb ${u.dept} team attendance`;

  root.innerHTML = `
    <section class="panel">
      <div class="panel-head wrap">
        <div>
          <h1>${title}</h1>
          <p class="hint">${accessLabel(u.access)}. Seed data covers the last 14 days. Live punches you make stay in this browser.</p>
        </div>
        ${
          u.access === "staff"
            ? ""
            : `<label class="filter">Filter person
                <select id="whoFilter">
                  <option value="">Everyone I can see</option>
                  ${options}
                </select>
              </label>`
        }
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              ${selected ? "" : "<th>Employee</th>"}
              <th>Check in</th>
              <th>Check out</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${rows || `<tr><td colspan="6">No rows in this view.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;

  const who = document.getElementById("whoFilter");
  if (who) {
    who.addEventListener("change", () => {
      const url = new URL(location.href);
      if (who.value) url.searchParams.set("who", who.value);
      else url.searchParams.delete("who");
      location.href = url.toString();
    });
  }
}

function renderPeople() {
  const root = document.getElementById("people");
  if (!root) return;
  const u = getUser();
  const list = visibleStaff(u);
  const locked = STAFF.length - list.length;

  const cards = list
    .map((p) => {
      const recs = recordsFor(p.id).filter((r) => r.status !== "weekend");
      const present = recs.filter((r) => r.in).length;
      const today = todayRecord(p.id);
      const st = today ? statusMeta(today.status) : statusMeta("absent");
      return `<article class="person-card" style="--accent:${p.color}">
        <div class="avatar lg">${p.emoji}</div>
        <div class="person-body">
          <strong>${p.name}</strong>
          <p>${p.title}</p>
          <p class="muted">${p.dept} \u00b7 ${p.access}</p>
          <p class="mail">${p.email}</p>
          <div class="card-meta">
            <span class="badge ${st.cls}">${st.emoji} Today: ${today && today.in ? today.in : st.label}</span>
            <span class="chip">${present} days present</span>
          </div>
          <a class="btn slim" href="records.html?who=${p.id}">Open records \u2192</a>
        </div>
      </article>`;
    })
    .join("");

  root.innerHTML = `
    <section class="intro">
      <h1>${u.access === "staff" ? "\ud83d\udc64 Your staff card" : "\ud83d\udc65 People in your access"}</h1>
      <p class="hint">
        ${accessLabel(u.access)}.
        Showing <b>${list.length}</b> of 31 people.
        ${locked ? locked + " profiles are hidden because of your role." : "Manager view \u2014 nothing is hidden."}
      </p>
    </section>
    <div class="person-grid">${cards}</div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  mountChrome();
  renderDashboard();
  renderRecords();
  renderPeople();
});
