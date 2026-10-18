(() => {
  const SITES = { en: window.SITE, tr: window.SITE_TR || window.SITE };
  const UI = {
    en: {
      title: "Efe Demirer · RF & Microwave Systems, Test Automation",
      description: "Efe Demirer, Electrical and Electronics Engineering student. Antenna near-field scanning, spectrum analyzer automation, acoustic link DSP and the SolarOPA solar fleet monitoring platform.",
      skip: "Skip to projects", nav_projects: "Projects", nav_experience: "Experience", nav_skills: "Skills", nav_certs: "Certificates", nav_contact: "Contact",
      cv: "Download CV", see_projects: "See projects",
      scope_title: "Areas of work", markers: (n) => `${n} markers`, scope_aria: "Areas of work shown as markers on a spectrum trace", facts_aria: "Key facts",
      projects_h: "Projects", projects_p: "Each one opens a full write-up with screenshots.",
      experience_h: "Experience", education_h: "Education", skills_h: "Skills", languages_h: "Languages",
      certs_h: "Certificates", certs_p: "Select one to open the original document.",
      contact_h: "Get in touch", contact_p: "Open to RF, test automation and embedded engineering roles and internships.",
      read_more: "Read the full project", images: (n, v) => `${n} images${v ? ", video" : ""}`, open_project: (x) => `Open ${x}`,
      built_with: "Built with", live_recording: "Live panel recording", close: "Close project", prev: "Previous image", next: "Next image",
      open_full: "Open full size", show_image: (n) => `Show image ${n}`, open_cert: (x) => `Open certificate: ${x}`, portrait: (n) => `Portrait of ${n}`,
      switch_label: "Türkçe", switch_aria: "Sayfayı Türkçe göster"
    },
    tr: {
      title: "Efe Demirer · RF ve Mikrodalga Sistemleri, Test Otomasyonu",
      description: "Efe Demirer, Elektrik-Elektronik Mühendisliği öğrencisi. Anten yakın alan tarama, spektrum analizörü otomasyonu, akustik link DSP ve SolarOPA güneş filosu izleme platformu.",
      skip: "Projelere geç", nav_projects: "Projeler", nav_experience: "Deneyim", nav_skills: "Beceriler", nav_certs: "Sertifikalar", nav_contact: "İletişim",
      cv: "CV indir", see_projects: "Projelere göz at",
      scope_title: "Çalışma alanları", markers: (n) => `${n} işaretçi`, scope_aria: "Spektrum izi üzerinde işaretçilerle gösterilen çalışma alanları", facts_aria: "Öne çıkanlar",
      projects_h: "Projeler", projects_p: "Her biri ekran görüntüleriyle ayrıntılı bir anlatım açar.",
      experience_h: "Deneyim", education_h: "Eğitim", skills_h: "Beceriler", languages_h: "Diller",
      certs_h: "Sertifikalar", certs_p: "Belgenin aslını açmak için birine tıklayın.",
      contact_h: "İletişim", contact_p: "RF, test otomasyonu ve gömülü sistemler alanındaki iş ve staj fırsatlarına açığım.",
      read_more: "Projenin tamamını oku", images: (n, v) => `${n} görsel${v ? ", video" : ""}`, open_project: (x) => `${x} projesini aç`,
      built_with: "Kullanılanlar", live_recording: "Canlı panel kaydı", close: "Projeyi kapat", prev: "Önceki görsel", next: "Sonraki görsel",
      open_full: "Tam boyutta aç", show_image: (n) => `${n}. görseli göster`, open_cert: (x) => `Sertifikayı aç: ${x}`, portrait: (n) => `${n} portresi`,
      switch_label: "English", switch_aria: "Show this page in English"
    }
  };

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };

  const pickLang = () => {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "tr" || q === "en") return q;
    const saved = store.get("lang");
    if (saved === "tr" || saved === "en") return saved;
    return (navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en";
  };
  let lang = pickLang();
  let d = SITES[lang], t = UI[lang], byId = {};

  /* ---------- Spectrum "instrument" (drawn once; geometry does not depend on language) ---------- */
  const markers = window.SITE.markers;
  const W = 800, H = 340, FLOOR = 0.12, N = 260;
  const svg = $("scope-svg");
  const seeded = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const rand = seeded(42);
  const peaksAt = (x) => markers.reduce((acc, m) => acc + 0.66 * m.level * Math.exp(-Math.pow((x - m.pos) / 0.012, 2)) + 0.12 * m.level * Math.exp(-Math.pow((x - m.pos) / 0.05, 2)), 0);
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
  const markerSvg = markers.map((m, i) => {
    const x = m.pos * W, y = yOf(base[Math.round(m.pos * (N - 1))] + peaksAt(m.pos));
    return `<g class="mk" data-i="${i}" transform="translate(${x.toFixed(1)} ${(y - 12).toFixed(1)})">
      <path d="M0 0 L-7 -11 L7 -11 Z"/><text y="-18" text-anchor="middle">M${i + 1}</text></g>`;
  }).join("");
  svg.innerHTML = `
    <g class="scope-grid">${grid}</g>
    <line class="scope-floor" x1="0" x2="${W}" y1="${yOf(FLOOR + 0.06)}" y2="${yOf(FLOOR + 0.06)}"/>
    <path class="scope-trace" id="scope-trace" d="${tracePath(0.05)}"/>
    <g class="scope-mks">${markerSvg}</g>`;
  const trace = $("scope-trace");
  const goLive = () => {
    $("scope").classList.add("live");
    if (reduceMotion) return;
    let visible = true;
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(svg);
    setInterval(() => { if (visible && !document.hidden) trace.setAttribute("d", tracePath(0.05)); }, 700);
  };
  if (!reduceMotion) {
    const len = trace.getTotalLength();
    trace.style.strokeDasharray = `${len}`;
    trace.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      trace.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.4,.1,.2,1)";
      trace.style.strokeDashoffset = "0";
    });
    trace.addEventListener("transitionend", () => { trace.style.strokeDasharray = ""; goLive(); }, { once: true });
  } else {
    goLive();
  }
  const markerHover = (i, on) => svg.querySelector(`.mk[data-i="${i}"]`)?.classList.toggle("on", on);
  $("scope-markers").addEventListener("pointerover", (e) => { const b = e.target.closest("button"); if (b) markerHover(b.dataset.i, true); });
  $("scope-markers").addEventListener("pointerout", (e) => { const b = e.target.closest("button"); if (b) markerHover(b.dataset.i, false); });
  $("scope-markers").addEventListener("focusin", (e) => { const b = e.target.closest("button"); if (b) markerHover(b.dataset.i, true); });
  $("scope-markers").addEventListener("focusout", (e) => { const b = e.target.closest("button"); if (b) markerHover(b.dataset.i, false); });

  /* ---------- Render everything that has text ---------- */
  const render = () => {
    d = SITES[lang]; t = UI[lang];
    byId = Object.fromEntries(d.projects.map((p) => [p.id, p]));
    document.documentElement.lang = lang;
    document.title = t.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.description);
    document.querySelectorAll("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (typeof v === "string") el.textContent = v; });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t[el.dataset.i18nAria]));
    $("scope").setAttribute("aria-label", t.scope_aria);
    $("facts-section").setAttribute("aria-label", t.facts_aria);
    const sw = $("lang-switch");
    sw.innerHTML = '<span lang="tr"' + (lang === "tr" ? ' class="on"' : "") + '>TR</span><span class="sep" aria-hidden="true">|</span><span lang="en"' + (lang === "en" ? ' class="on"' : "") + '>EN</span>';
    sw.setAttribute("aria-label", t.switch_aria);

    const cv = d.documents.find((x) => x.primary) || d.documents[0];
    $("nav-cv").href = cv.href;

    // Hero
    $("hero-name").textContent = d.name;
    $("hero-role").textContent = `${d.role}. ${d.focus}.`;
    $("hero-summary").textContent = d.summary;
    $("hero-photo").src = d.photo;
    $("hero-photo").alt = t.portrait(d.name);
    $("hero-actions").innerHTML = `
      <a class="btn btn-solid" href="${esc(cv.href)}" target="_blank" rel="noopener">${esc(t.cv)}</a>
      <a class="btn" href="#work">${esc(t.see_projects)}</a>
      <a class="btn btn-quiet" href="${esc(d.contact.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
      <a class="btn btn-quiet" href="${esc(d.contact.github)}" target="_blank" rel="noopener">GitHub</a>`;
    $("scope-count").textContent = t.markers(d.markers.length);
    $("scope-markers").innerHTML = d.markers.map((m, i) => `
      <li><button type="button" data-open="${esc(m.project)}" data-i="${i}">
        <span class="mk-id">M${i + 1}</span>
        <span class="mk-label">${esc(m.label)}</span>
        <span class="mk-detail">${esc(m.detail)}</span>
      </button></li>`).join("");

    // Facts
    $("facts").innerHTML = d.facts.map((f) => `<div><dt>${esc(f.value)}</dt><dd>${esc(f.label)}</dd></div>`).join("");

    // Projects
    $("projects").innerHTML = d.projects.map((p, i) => `
      <article class="project${i === 0 ? " project-lead" : ""}">
        <button type="button" class="project-media" data-open="${esc(p.id)}" aria-label="${esc(t.open_project(p.title))}">
          ${p.video && i === 0
            ? `<video muted loop playsinline autoplay preload="metadata" poster="${esc(p.poster || p.cover)}">
                 <source src="${esc(p.video.replace(/\.mp4$/i, ".webm"))}" type="video/webm"><source src="${esc(p.video)}" type="video/mp4"></video>`
            : `<img src="${esc(p.cover)}" alt="" loading="lazy">`}
          <span class="project-count">${esc(t.images(p.gallery.length, !!p.video))}</span>
        </button>
        <div class="project-text">
          <p class="project-org">${esc(p.org)}<span>${esc(p.period)}</span></p>
          <h3><button type="button" data-open="${esc(p.id)}">${esc(p.title)}</button></h3>
          <p class="project-sub">${esc(p.subtitle)}</p>
          <p class="project-short">${esc(p.short)}</p>
          ${p.metrics ? `<dl class="project-metrics">${p.metrics.slice(0, 3).map((m) => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div>`).join("")}</dl>` : ""}
          <p class="project-stack">${p.stack.map(esc).join(", ")}</p>
          <button type="button" class="btn" data-open="${esc(p.id)}">${esc(t.read_more)}</button>
        </div>
      </article>`).join("");

    // Experience & education
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

    // Skills & languages
    $("skills-list").innerHTML = d.skills.map((s) => `
      <div><h3>${esc(s.group)}</h3><ul>${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");
    $("languages").innerHTML = `<h3>${esc(t.languages_h)}</h3><p>${d.languages.map((l) => `<span><strong>${esc(l.name)}</strong> ${esc(l.level)}</span>`).join("")}</p>`;

    // Certificates: thumbnails for the main ones, a compact list for the course series
    $("cert-list").innerHTML = d.certifications.map((c) => c.list
      ? `<div class="cert-group cert-group-list">
          <h3>${esc(c.issuer)} <span>${c.items.length}</span></h3>
          <ul>${c.items.map((i) => `<li><a href="${esc(i.href)}" target="_blank" rel="noopener">${esc(i.title)}</a><span>${esc(i.date)}</span></li>`).join("")}</ul>
        </div>`
      : `<div class="cert-group">
          <h3>${esc(c.issuer)} <span>${c.items.length}</span></h3>
          <ul class="cert-cards">${c.items.map((i) => `
            <li><a href="${esc(i.href)}" target="_blank" rel="noopener" aria-label="${esc(t.open_cert(i.title))}">
              <img src="${esc(i.thumb)}" alt="" loading="lazy">
              <span class="cert-title">${esc(i.title)}</span>
              <span class="cert-date">${esc(i.date)}</span>
            </a></li>`).join("")}</ul>
        </div>`).join("");

    // Contact
    const mail = $("contact-mail");
    mail.href = `mailto:${d.contact.email}`;
    mail.textContent = d.contact.email;
    $("contact-links").innerHTML = `
      <a href="${esc(d.contact.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
      <a href="${esc(d.contact.github)}" target="_blank" rel="noopener">GitHub</a>
      ${d.documents.map((doc) => `<a href="${esc(doc.href)}" target="_blank" rel="noopener">${esc(doc.label)}</a>`).join("")}`;
    $("year").textContent = new Date().getFullYear();
    $("foot-location").textContent = d.location;
  };

  /* ---------- Project dialog ---------- */
  const dlg = $("case");
  let cur = null, idx = 0, lastFocus = null;

  const showSlide = (i) => {
    const items = cur.slides;
    idx = (i + items.length) % items.length;
    const s = items[idx];
    $("viewer-stage").innerHTML = s.video
      ? `<video controls muted loop playsinline autoplay poster="${esc(s.poster)}"><source src="${esc(s.video.replace(/\.mp4$/i, ".webm"))}" type="video/webm"><source src="${esc(s.video)}" type="video/mp4"></video>`
      : `<a href="${esc(s.src)}" target="_blank" rel="noopener" title="${esc(t.open_full)}"><img src="${esc(s.src)}" alt="${esc(s.caption)}"></a>`;
    $("viewer-caption").textContent = `${idx + 1} / ${items.length}  ${s.caption}`;
    document.querySelectorAll("#viewer-thumbs button").forEach((b, j) => b.setAttribute("aria-current", j === idx ? "true" : "false"));
    document.querySelector(`#viewer-thumbs button[data-j="${idx}"]`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const openProject = (id, push = true, keepSlide = false) => {
    const p = byId[id];
    if (!p) return;
    const prevIdx = idx;
    cur = p;
    cur.slides = [...(p.video ? [{ video: p.video, poster: p.poster, caption: t.live_recording }] : []), ...p.gallery];
    $("case-org").textContent = [p.org, p.period, p.role].filter(Boolean).join(", ");
    $("case-title").textContent = p.title;
    $("case-sub").textContent = p.subtitle;
    $("case-metrics").innerHTML = (p.metrics || []).map((m) => `<div><dt>${esc(m.value)}</dt><dd>${esc(m.label)}</dd></div>`).join("");
    $("case-summary").textContent = p.summary;
    $("case-bullets").innerHTML = p.bullets.map((b) => `<li>${b}</li>`).join("");
    $("case-stack").innerHTML = `<h3>${esc(t.built_with)}</h3><p>${p.stack.map(esc).join(", ")}</p>`;
    $("case-links").innerHTML = (p.links || []).map((l) => `<a class="btn" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("");
    $("case-links").hidden = !(p.links || []).length;
    $("case-note").textContent = p.note || "";
    $("viewer-thumbs").innerHTML = cur.slides.map((s, j) => `
      <button type="button" data-j="${j}" aria-label="${esc(t.show_image(j + 1))}">
        <img src="${esc(s.video ? s.poster : s.src)}" alt="" loading="lazy">${s.video ? "<span>▶</span>" : ""}
      </button>`).join("");
    showSlide(keepSlide ? prevIdx : 0);
    if (!dlg.open) {
      lastFocus = document.activeElement;
      dlg.showModal();
      dlg.querySelector(".case-inner").scrollTop = 0;
    }
    document.body.classList.add("locked");
    if (push && location.hash !== `#project/${id}`) history.pushState({ project: id }, "", `${location.pathname}${location.search}#project/${id}`);
  };

  dlg.addEventListener("close", () => {
    document.body.classList.remove("locked");
    $("viewer-stage").innerHTML = "";
    cur = null;
    if (location.hash.startsWith("#project/")) history.replaceState({}, "", `${location.pathname}${location.search}#work`);
    lastFocus?.focus?.();
  });
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  $("case-close").addEventListener("click", () => dlg.close());
  $("viewer-prev").addEventListener("click", () => showSlide(idx - 1));
  $("viewer-next").addEventListener("click", () => showSlide(idx + 1));
  $("viewer-thumbs").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-j]");
    if (b) showSlide(+b.dataset.j);
  });
  dlg.addEventListener("keydown", (e) => {
    if (e.target.closest("video")) return;
    if (e.key === "ArrowRight") showSlide(idx + 1);
    if (e.key === "ArrowLeft") showSlide(idx - 1);
  });
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-open]");
    if (el) { e.preventDefault(); openProject(el.dataset.open); }
  });

  /* ---------- Language switch ---------- */
  $("lang-switch").addEventListener("click", () => {
    lang = lang === "tr" ? "en" : "tr";
    store.set("lang", lang);
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(history.state, "", url);
    const openId = dlg.open && cur ? cur.id : null;
    render();
    if (openId) openProject(openId, false, true);
  });

  const fromHash = () => {
    const m = location.hash.match(/^#project\/([\w-]+)/);
    if (m) openProject(m[1], false); else if (dlg.open) dlg.close();
  };
  window.addEventListener("popstate", fromHash);

  render();
  fromHash();
})();
