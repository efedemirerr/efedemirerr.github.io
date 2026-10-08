const d = window.SITE;
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const list = (items) => (items && items.length) ? `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>` : "";

// Hero
$("name").textContent = d.name;
$("title").textContent = d.title;
$("summary").textContent = d.summary;

let actionButtons = `
  <a class="btn primary" href="assets/Efe_Demirer_CV.pdf" target="_blank">Download CV (PDF)</a>
  <a class="btn" href="${d.contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
  <a class="btn" href="mailto:${d.contact.email}">Email</a>`;
if (d.contact.github) {
  actionButtons += `<a class="btn" href="${d.contact.github}" target="_blank" rel="noopener">GitHub</a>`;
}
$("actions").innerHTML = actionButtons;

// Timeline cards
const card = (title, sub, date, loc, bullets) => `
  <article class="card">
    <div class="row"><h3>${esc(title)}</h3><span class="meta">${esc(date)}</span></div>
    <div class="row meta"><span>${esc(sub)}</span><span>${esc(loc)}</span></div>
    ${list(bullets)}
  </article>`;

$("experience-list").innerHTML = d.experience.map((e) => card(e.role, e.org, e.date, e.location, e.bullets)).join("");
$("education-list").innerHTML = d.education.map((e) => card(e.degree, e.school, e.date, e.location, e.bullets)).join("");

// Skills (Featured Highlights)
const featuredCard = () => d.featured ? `
  <div class="card wide animated-frame">
    <div class="row">
      <h3>${esc(d.featured.title)}</h3>
      <span class="meta featured-stats">${d.featured.stats.map(esc).join(" · ")}</span>
    </div>
    <div class="tags" style="margin-top: 14px;">
      ${d.featured.tags.map((m) => `<span class="tag done">${esc(m)}</span>`).join("")}
    </div>
  </div>` : "";

$("skills-list").innerHTML = featuredCard() + d.skills.map((s) => `
  <div class="card">
    <h3>${esc(s.group)}</h3>
    <div class="tags">${s.items.map((i) => `<span class="tag">${esc(i)}</span>`).join("")}</div>
  </div>`).join("");

// Projects: with structured bullets and animated frames
$("projects-list").innerHTML = d.projects.map((p) => {
  let media = "";
  if (p.youtube) {
    media = `<button class="video" data-yt="${esc(p.youtube)}" aria-label="Play video: ${esc(p.title)}">
      <img src="https://i.ytimg.com/vi/${esc(p.youtube)}/hqdefault.jpg" alt="" loading="lazy"><span>▶</span></button>`;
  } else if (p.images && p.images.length) {
    media = `<img class="cover zoom" src="${esc(p.images[0])}" alt="${esc(p.title)}" loading="lazy">`;
  }
  const thumbs = (p.images && p.images.length > (p.youtube ? 0 : 1))
    ? `<div class="thumbs">${p.images.slice(p.youtube ? 0 : 1).map((src) => `<img class="zoom" src="${esc(src)}" alt="" loading="lazy">`).join("")}</div>`
    : "";

  const bulletContent = (p.bullets && p.bullets.length)
    ? `<ul class="project-bullets">${p.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`
    : (p.description ? `<p>${esc(p.description)}</p>` : "");

  return `<article class="card project animated-hover">
    ${media}${thumbs}
    <div class="body">
      <div class="row"><h3>${esc(p.title)}</h3><span class="meta">${esc(p.date)}</span></div>
      ${p.summary ? `<p class="project-summary">${esc(p.summary)}</p>` : ""}
      ${bulletContent}
      <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      ${p.link ? `<p><a href="${esc(p.link)}" target="_blank" rel="noopener">View project →</a></p>` : ""}
    </div></article>`;
}).join("");

// Lightbox & Video interaction
document.addEventListener("click", (e) => {
  const v = e.target.closest(".video");
  if (v && !v.querySelector("iframe")) {
    v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.yt}?autoplay=1" title="Project video"
      allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    return;
  }
  const z = e.target.closest(".zoom");
  if (z) {
    const lb = $("lightbox");
    lb.querySelector("img").src = z.src;
    lb.hidden = false;
  }
});
const closeLb = () => ($("lightbox").hidden = true);
$("lightbox").addEventListener("click", closeLb);
document.addEventListener("keydown", (e) => e.key === "Escape" && closeLb());

// Extras
$("cert-list").innerHTML = d.certifications.map((c) => `<li>${c}</li>`).join("");
$("lang-list").innerHTML = d.languages.map((l) => `<li>${l}</li>`).join("");
$("contact-list").innerHTML = `
  <a class="btn primary" href="assets/Efe_Demirer_CV.pdf" target="_blank">Download CV (PDF)</a>
  <a class="btn" href="mailto:${d.contact.email}">${esc(d.contact.email)}</a>
  <a class="btn" href="${d.contact.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
  ${d.contact.github ? `<a class="btn" href="${d.contact.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
  <span class="btn">${esc(d.contact.location)}</span>`;
$("year").textContent = new Date().getFullYear();
