(() => {
  const d = window.SITE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const byId = Object.fromEntries(d.projects.map((p) => [p.id, p]));

  /* ---------- Hero ---------- */
  $("hero-name").textContent = d.name;
  $("hero-role").textContent = `${d.role}. ${d.focus}.`;
  $("hero-summary").textContent = d.summary;
  const photo = $("hero-photo");
  photo.src = d.photo;
  photo.alt = `Portrait of ${d.name}`;
  const cv = d.documents.find((x) => x.primary) || d.documents[0];
  $("hero-actions").innerHTML = `
    <a class="btn btn-solid" href="${esc(cv.href)}" target="_blank" rel="noopener">Download CV</a>
    <a class="btn" href="#work">See projects</a>
    <a class="btn btn-quiet" href="${esc(d.contact.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
    <a class="btn btn-quiet" href="${esc(d.contact.github)}" target="_blank" rel="noopener">GitHub</a>`;

  /* ---------- Spectrum "instrument" ---------- */
  const W = 800, H = 340, FLOOR = 0.12, N = 260;
  const svg = $("scope-svg");
  const seeded = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const rand = seeded(42);
  const peaksAt = (x) => d.markers.reduce((acc, m) => acc + 0.66 * m.level * Math.exp(-Math.pow((x - m.pos) / 0.012, 2)) + 0.12 * m.level * Math.exp(-Math.pow((x - m.pos) / 0.05, 2)), 0);
  const base = Array.from({ length: N }, (_, i) => FLOOR + 0.05 * Math.sin(i / 9) * Math.sin(i / 23));
  const yOf = (v) => H - 18 - v * (H - 60);
  const tracePath = (jitter) => base.map((b, i) => {
    const x = i / (N - 1);
    const v = Math.max(0.02, b + peaksAt(x) + (rand() - 0.5) * jitter);
    return `${i ? "L" : "M"}${(x * W).toFixed(1)} ${yOf(v).toFixed(1)}`;
  }).join(" ");

  let grid = "";
  for (let i = 1; i < 10; i++) grid += `<line x1="${i * W / 10}" y1="0" x2="${i * W / 10}" y2="${H}"/>`;
  for (let i = 1; i < 8; i++) grid += `<line x1="0" y1="${i * H / 8}" x2="${W}" y2="${i * H / 8}"/>`;
  const markerSvg = d.markers.map((m, i) => {
    const x = m.pos * W, y = yOf(base[Math.round(m.pos * (N - 1))] + peaksAt(m.pos));
    return `<g class="mk" data-i="${i}" transform="translate(${x.toFixed(1)} ${(y - 12).toFixed(1)})">
      <path d="M0 0 L-7 -11 L7 -11 Z"/><text y="-18" text-anchor="middle">M${i + 1}</text></g>`;
  }).join("");
  svg.innerHTML = `
    <g class="scope-grid">${grid}</g>
    <line class="scope-floor" x1="0" x2="${W}" y1="${yOf(FLOOR + 0.06)}" y2="${yOf(FLOOR + 0.06)}"/>
    <path class="scope-trace" id="scope-trace" d="${tracePath(0.05)}"/>
    <g class="scope-mks">${markerSvg}</g>`;
  $("scope-count").textContent = `${d.markers.length} markers`;

  const trace = $("scope-trace");
  if (!reduceMotion) {
    const len = trace.getTotalLength();
    trace.style.strokeDasharray = `${len}`;
    trace.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      trace.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.4,.1,.2,1)";
      trace.style.strokeDashoffset = "0";
    });
    trace.addEventListener("transitionend", () => {
      trace.style.strokeDasharray = "";
      document.querySelector(".scope").classList.add("live");
      let visible = true;
      new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(svg);
      setInterval(() => { if (visible && !document.hidden) trace.setAttribute("d", tracePath(0.05)); }, 700);
    }, { once: true });
  } else {
    document.querySelector(".scope").classList.add("live");
  }

  $("scope-markers").innerHTML = d.markers.map((m, i) => `
    <li><button type="button" data-open="${esc(m.project)}" data-i="${i}">
      <span class="mk-id">M${i + 1}</span>
      <span class="mk-label">${esc(m.label)}</span>
      <span class="mk-detail">${esc(m.detail)}</span>
    </button></li>`).join("");
  const markerHover = (i, on) => svg.querySelector(`.mk[data-i="${i}"]`)?.classList.toggle("on", on);
  document.querySelectorAll("#scope-markers button").forEach((b) => {
    ["mouseenter", "focus"].forEach((ev) => b.addEventListener(ev, () => markerHover(b.dataset.i, true)));
    ["mouseleave", "blur"].forEach((ev) => b.addEventListener(ev, () => markerHover(b.dataset.i, false)));
  });

  /* ---------- Facts ---------- */
  $("facts").innerHTML = d.facts.map((f) => `<div><dt>${esc(f.value)}</dt><dd>${esc(f.label)}</dd></div>`).join("");

  /* ---------- Projects ---------- */
  $("projects").innerHTML = d.projects.map((p, i) => `
    <article class="project${i === 0 ? " project-lead" : ""}">
      <button type="button" class="project-media" data-open="${esc(p.id)}" aria-label="Open ${esc(p.title)}">
        ${p.video && i === 0
          ? `<video muted loop playsinline autoplay preload="metadata" poster="${esc(p.poster || p.cover)}">
               <source src="${esc(p.video.replace(/\.mp4$/i, ".webm"))}" type="video/webm"><source src="${esc(p.video)}" type="video/mp4"></video>`
          : `<img src="${esc(p.cover)}" alt="" loading="lazy">`}
        <span class="project-count">${p.gallery.length} images${p.video ? ", video" : ""}</span>
      </button>
      <div class="project-text">
        <p class="project-org">${esc(p.org)}<span>${esc(p.period)}</span></p>
        <h3><button type="button" data-open="${esc(p.id)}">${esc(p.title)}</button></h3>
        <p class="project-sub">${esc(p.subtitle)}</p>
        <p class="project-short">${esc(p.short)}</p>
        ${p.metrics ? `<dl class="project-metrics">${p.metrics.slice(0, 3).map((m) => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div>`).join("")}</dl>` : ""}
        <p class="project-stack">${p.stack.map(esc).join(", ")}</p>
        <button type="button" class="btn" data-open="${esc(p.id)}">Read the full project</button>
      </div>
    </article>`).join("");

  if (d.sideProjects?.length) {
    $("side-projects").innerHTML = "Side project: " + d.sideProjects.map((s) =>
      `<a href="${esc(s.href)}">${esc(s.title)}</a>, ${esc(s.text.charAt(0).toLowerCase() + s.text.slice(1))}`).join(" ");
  }

  /* ---------- Experience & education ---------- */
  $("experience-list").innerHTML = d.experience.map((e) => `
    <li>
      <p class="tl-when">${esc(e.period)}<span>${esc(e.location)}</span></p>
      <div class="tl-body">
        <h3>${esc(e.org)}</h3>
        <p class="tl-role">${esc(e.role)}</p>
        <ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </div>
    </li>`).join("");
  $("education-list").innerHTML = d.education.map((e) => `
    <li>
      <p class="tl-when">${esc(e.period)}<span>${esc(e.location)}</span></p>
      <div class="tl-body">
        <h3>${esc(e.school)}</h3>
        <p class="tl-role">${esc(e.degree)}</p>
        <p>${esc(e.detail)}</p>
      </div>
    </li>`).join("");

  /* ---------- Skills, languages, certificates ---------- */
  $("skills-list").innerHTML = d.skills.map((s) => `
    <div><h3>${esc(s.group)}</h3><ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");
  $("languages").innerHTML = `<h3>Languages</h3><p>${d.languages.map((l) => `<span><strong>${esc(l.name)}</strong> ${esc(l.level)}</span>`).join("")}</p>`;
  $("cert-list").innerHTML = d.certifications.map((c) => `
    <div><h3>${esc(c.issuer)} <span>${c.items.length}</span></h3><ul>${c.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");

  /* ---------- Contact ---------- */
  const mail = $("contact-mail");
  mail.href = `mailto:${d.contact.email}`;
  mail.textContent = d.contact.email;
  $("contact-links").innerHTML = `
    <a href="${esc(d.contact.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
    <a href="${esc(d.contact.github)}" target="_blank" rel="noopener">GitHub</a>
    ${d.documents.map((doc) => `<a href="${esc(doc.href)}" target="_blank" rel="noopener">${esc(doc.label)}</a>`).join("")}`;
  $("year").textContent = new Date().getFullYear();
  $("foot-location").textContent = d.location;

  /* ---------- Project dialog ---------- */
  const dlg = $("case");
  let cur = null, idx = 0, lastFocus = null;

  const showSlide = (i) => {
    const items = cur.slides;
    idx = (i + items.length) % items.length;
    const s = items[idx];
    $("viewer-stage").innerHTML = s.video
      ? `<video controls muted loop playsinline autoplay poster="${esc(s.poster)}"><source src="${esc(s.video.replace(/\.mp4$/i, ".webm"))}" type="video/webm"><source src="${esc(s.video)}" type="video/mp4"></video>`
      : `<a href="${esc(s.src)}" target="_blank" rel="noopener" title="Open full size"><img src="${esc(s.src)}" alt="${esc(s.caption)}"></a>`;
    $("viewer-caption").textContent = `${idx + 1} / ${items.length}  ${s.caption}`;
    document.querySelectorAll("#viewer-thumbs button").forEach((b, j) => b.setAttribute("aria-current", j === idx ? "true" : "false"));
    document.querySelector(`#viewer-thumbs button[data-j="${idx}"]`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const openProject = (id, push = true) => {
    const p = byId[id];
    if (!p) return;
    cur = p;
    cur.slides = [...(p.video ? [{ video: p.video, poster: p.poster, caption: "Live panel recording" }] : []), ...p.gallery];
    $("case-org").textContent = [p.org, p.period, p.role].filter(Boolean).join(", ");
    $("case-title").textContent = p.title;
    $("case-sub").textContent = p.subtitle;
    $("case-metrics").innerHTML = (p.metrics || []).map((m) => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div>`).join("");
    $("case-summary").textContent = p.summary;
    $("case-bullets").innerHTML = p.bullets.map((b) => `<li>${b}</li>`).join("");
    $("case-stack").innerHTML = `<h3>Built with</h3><p>${p.stack.map(esc).join(", ")}</p>`;
    $("case-note").textContent = p.note || "";
    $("viewer-thumbs").innerHTML = cur.slides.map((s, j) => `
      <button type="button" data-j="${j}" aria-label="Show image ${j + 1}">
        <img src="${esc(s.video ? s.poster : s.src)}" alt="" loading="lazy">${s.video ? "<span>▶</span>" : ""}
      </button>`).join("");
    showSlide(0);
    lastFocus = document.activeElement;
    if (!dlg.open) dlg.showModal();
    dlg.querySelector(".case-inner").scrollTop = 0;
    document.body.classList.add("locked");
    if (push && location.hash !== `#project/${id}`) history.pushState({ project: id }, "", `#project/${id}`);
  };

  const closeProject = () => {
    if (dlg.open) dlg.close();
  };
  dlg.addEventListener("close", () => {
    document.body.classList.remove("locked");
    $("viewer-stage").innerHTML = "";
    if (location.hash.startsWith("#project/")) history.replaceState({}, "", location.pathname + location.search + "#work");
    lastFocus?.focus?.();
  });
  dlg.addEventListener("click", (e) => { if (e.target === dlg) closeProject(); });
  $("case-close").addEventListener("click", closeProject);
  $("viewer-prev").addEventListener("click", () => showSlide(idx - 1));
  $("viewer-next").addEventListener("click", () => showSlide(idx + 1));
  $("viewer-thumbs").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-j]");
    if (b) showSlide(+b.dataset.j);
  });
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") showSlide(idx + 1);
    if (e.key === "ArrowLeft") showSlide(idx - 1);
  });

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open]");
    if (t) { e.preventDefault(); openProject(t.dataset.open); }
  });

  const fromHash = () => {
    const m = location.hash.match(/^#project\/([\w-]+)/);
    if (m) openProject(m[1], false); else if (dlg.open) dlg.close();
  };
  window.addEventListener("popstate", fromHash);
  fromHash();
})();
