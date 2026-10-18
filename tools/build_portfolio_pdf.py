"""Build the downloadable portfolio PDFs (English and Turkish) from data.js and data_tr.js.

Usage:  python tools/build_portfolio_pdf.py [--fonts DIR]
Needs:  node, playwright (chromium). Fonts: Barlow + Barlow Condensed woff2 files
        (fontsource layout) in --fonts, otherwise Google Fonts is used.
Output: assets/Efe_Demirer_Portfolio.pdf, assets/Efe_Demirer_Portfolyo.pdf
"""
import argparse, html, json, os, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

UI = {
    "en": {
        "doc_title": "Efe Demirer · Engineering portfolio",
        "footer": "Efe Demirer · Engineering portfolio",
        "areas": "Areas of work", "status": "Availability",
        "status_items": [
            "Internship: Spring 2027 semester (1 Feb – 22 May 2027), at least three full days a week on site.",
            "Military service postponed until 31 Dec 2031.",
            "Class B driving licence.",
        ],
        "contents": "Contents", "projects": "Projects", "built_with": "Built with",
        "experience": "Experience", "education": "Education", "skills": "Skills",
        "languages": "Languages", "certs": "Certificates", "refs": "References",
        "refs_note": "Contact details for references are available on request.",
        "contact": "Contact", "site": "Live portfolio", "report": "Full report",
        "more_online": "Every certificate opens as the original document on the live portfolio.",
        "page": "Page",
    },
    "tr": {
        "doc_title": "Efe Demirer · Mühendislik portfolyosu",
        "footer": "Efe Demirer · Mühendislik portfolyosu",
        "areas": "Çalışma alanları", "status": "Uygunluk",
        "status_items": [
            "Staj: 2027 bahar dönemi (1 Şubat – 22 Mayıs 2027), haftada en az üç tam gün yerinde.",
            "Askerlik 31 Aralık 2031'e kadar tecilli.",
            "B sınıfı sürücü belgesi.",
        ],
        "contents": "İçindekiler", "projects": "Projeler", "built_with": "Kullanılanlar",
        "experience": "Deneyim", "education": "Eğitim", "skills": "Beceriler",
        "languages": "Diller", "certs": "Sertifikalar", "refs": "Referanslar",
        "refs_note": "Referansların iletişim bilgileri talep üzerine paylaşılır.",
        "contact": "İletişim", "site": "Canlı portfolyo", "report": "Raporun tamamı",
        "more_online": "Her sertifika canlı portfolyoda belgenin aslı olarak açılır.",
        "page": "Sayfa",
    },
}

REFS = {
    "en": [
        ("Prof. Dr. Mustafa Seçmen", "Dean, Faculty of Engineering, Yaşar University"),
        ("Dr. Ali Haluk Nalbantoğlu", "Faculty member, Yaşar University; former Director of Electronic Warfare, ASELSAN"),
        ("Hüseyin Talha Çulha", "RF Test Engineer, ASELSAN REHİS"),
        ("Murat Yalçınkaya", "Systems Engineer, ASELSAN REHİS (via EHSİM)"),
        ("Onur İşçi", "Founder and Electrical-Electronics Engineer, OPA Mühendislik"),
    ],
    "tr": [
        ("Prof. Dr. Mustafa Seçmen", "Mühendislik Fakültesi Dekanı, Yaşar Üniversitesi"),
        ("Dr. Ali Haluk Nalbantoğlu", "Öğretim üyesi, Yaşar Üniversitesi; ASELSAN eski Elektronik Harp Direktörü"),
        ("Hüseyin Talha Çulha", "RF Test Mühendisi, ASELSAN REHİS"),
        ("Murat Yalçınkaya", "Sistem Mühendisi, ASELSAN REHİS (EHSİM)"),
        ("Onur İşçi", "Kurucu, Elektrik-Elektronik Mühendisi, OPA Mühendislik"),
    ],
}

# Which gallery images go into the PDF, per project (indexes into gallery).
LAYOUT = {
    "solaropa": {"hero": 0, "extra_page": [4, 5, 7, 9, 10, 11, 14, 15]},
    "cnc-scanner": {"grid": [5, 3, 1, 2]},
    "spectrum-api": {"grid": [0, 3]},
    "ultrasonic": {"hero": 3, "hero_cls": "hero sm", "extra_page": [0, 1, 4, 5, 6, 7]},
}

SITE_URL = "https://efedemirerr.github.io"
e = lambda s: html.escape(str(s or ""), quote=True)


def load_data():
    js = (
        "global.window={};require(%r);require(%r);"
        "process.stdout.write(JSON.stringify({en:window.SITE,tr:window.SITE_TR}))"
        % (str(ROOT / "data.js"), str(ROOT / "data_tr.js"))
    )
    return json.loads(subprocess.check_output(["node", "-e", js]))


def font_css(fonts_dir):
    if not fonts_dir:
        return ('@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700'
                '&family=Barlow:ital,wght@0,400;0,500;0,600;1,400&display=swap");')
    out = []
    for fam, pkg, weights in (("Barlow", "fontsource-barlow", ["400", "500", "600"]),
                              ("Barlow Condensed", "fontsource-barlow-condensed", ["500", "600", "700"])):
        base = next(Path(fonts_dir).glob(pkg + "-[0-9]*/package/files"))
        slug = pkg.replace("fontsource-", "")
        for w in weights:
            for style in ("normal", "italic") if fam == "Barlow" and w == "400" else ("normal",):
                for sub in ("latin", "latin-ext"):
                    f = base / f"{slug}-{sub}-{w}-{style}.woff2"
                    if not f.exists():
                        sys.exit(f"missing font file {f}")
                    out.append(f'@font-face{{font-family:"{fam}";font-weight:{w};font-style:{style};'
                               f'src:url("{f.as_uri()}") format("woff2");}}')
    return "\n".join(out)


def spectrum_svg(markers):
    """Static version of the site's hero trace: a noise floor with one peak per area of work."""
    import math, random
    rnd = random.Random(42)
    W, H, N = 760, 210, 300
    pts = []
    for i in range(N):
        x = i / (N - 1)
        v = 0.10 + 0.04 * math.sin(i / 9) * math.sin(i / 23) + rnd.uniform(-0.025, 0.025)
        for m in markers:
            v += 0.66 * m["level"] * math.exp(-((x - m["pos"]) / 0.012) ** 2)
            v += 0.12 * m["level"] * math.exp(-((x - m["pos"]) / 0.05) ** 2)
        pts.append((x * W, H - 14 - v * (H - 40)))
    path = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    grid = "".join(f'<line x1="{W*i/10:.0f}" y1="0" x2="{W*i/10:.0f}" y2="{H}"/>' for i in range(1, 10))
    grid += "".join(f'<line x1="0" y1="{H*i/6:.0f}" x2="{W}" y2="{H*i/6:.0f}"/>' for i in range(1, 6))
    marks = ""
    for i, m in enumerate(markers, 1):
        x = m["pos"] * W
        y = H - 14 - (0.10 + 0.78 * m["level"]) * (H - 40)
        marks += (f'<path d="M{x-6:.1f},{y-16:.1f} L{x+6:.1f},{y-16:.1f} L{x:.1f},{y-6:.1f} Z" class="mk"/>'
                  f'<text x="{x:.1f}" y="{y-22:.1f}" text-anchor="middle">M{i}</text>')
    return (f'<svg viewBox="0 0 {W} {H}" preserveAspectRatio="none" aria-hidden="true">'
            f'<g class="grid">{grid}</g><path d="{path}" class="trace"/>{marks}</svg>')


def figure(item, cls=""):
    return (f'<figure class="{cls}"><div class="ph"><img src="{e(item["src"])}" alt=""></div>'
            f'<figcaption>{e(item["caption"])}</figcaption></figure>')


def metrics(p):
    return '<dl class="metrics">' + "".join(
        f'<div><dt>{e(m["value"])}</dt><dd>{e(m["label"])}</dd></div>' for m in p.get("metrics", [])) + "</dl>"


def project_head(p, n):
    meta = ", ".join(x for x in (p.get("org"), p.get("period"), p.get("role")) if x)
    return (f'<header class="phead"><p class="pnum">{n:02d}</p><div><p class="meta">{e(meta)}</p>'
            f'<h2>{e(p["title"])}</h2><p class="sub">{e(p["subtitle"])}</p></div></header>')


def project_pages(p, n, ui):
    lay = LAYOUT.get(p["id"], {"grid": [0, 1]})
    g = p["gallery"]
    bullets = "".join(f"<li>{b}</li>" for b in p["bullets"])
    stack = f'<p class="stack"><b>{e(ui["built_with"])}:</b> {e(", ".join(p["stack"]))}</p>'
    links = "".join(f'<p class="plink">{e(ui["report"])}: <a href="{e(SITE_URL + "/" + l["href"])}">'
                    f'{e(SITE_URL.replace("https://", "") + "/" + l["href"])}</a></p>' for l in p.get("links", []))
    note = f'<p class="note">{e(p["note"])}</p>' if p.get("note") else ""
    pages = []
    if "hero" in lay:
        pages.append(project_head(p, n) + metrics(p) + f'<p class="summary">{e(p["summary"])}</p>'
                     + figure(g[lay["hero"]], lay.get("hero_cls", "hero")) + f'<ul class="bullets">{bullets}</ul>' + stack + links)
        grid = "".join(figure(g[i]) for i in lay["extra_page"])
        pages.append(f'<p class="cont">{e(p["title"])}</p><div class="grid g4">{grid}</div>{note}')
    else:
        idx = lay["grid"]
        grid = "".join(figure(g[i]) for i in idx)
        cls = "g2" if len(idx) == 2 else "g4"
        pages.append(project_head(p, n) + metrics(p) + f'<p class="summary">{e(p["summary"])}</p>'
                     + f'<div class="grid {cls}">{grid}</div>' + f'<ul class="bullets">{bullets}</ul>'
                     + stack + links + note)
    return pages


def build_html(d, lang, fonts_dir):
    ui = UI[lang]
    c = d["contact"]
    pages = []

    # Cover
    areas = "".join(f'<li><span class="m">M{i}</span><b>{e(m["label"])}</b><span>{e(m["detail"])}</span></li>'
                    for i, m in enumerate(d["markers"], 1))
    facts = "".join(f'<div><dt>{e(f["value"])}</dt><dd>{e(f["label"])}</dd></div>' for f in d["facts"])
    status = "".join(f"<li>{e(s)}</li>" for s in ui["status_items"])
    toc = "".join(f'<li><span>{i:02d}</span>{e(p["title"])}</li>' for i, p in enumerate(d["projects"], 1))
    toc += "".join(f'<li><span>·</span>{e(x)}</li>' for x in (ui["experience"] + ", " + ui["skills"], ui["certs"] + ", " + ui["refs"]))
    contact_line = (f'<a href="mailto:{e(c["email"])}">{e(c["email"])}</a>'
                    f'<a href="{e(c["linkedin"])}">linkedin.com/in/{e(c["linkedin"].rstrip("/").split("/")[-1])}</a>'
                    f'<a href="{e(c["github"])}">github.com/{e(c["github"].rstrip("/").split("/")[-1])}</a>'
                    f'<a href="{SITE_URL}">efedemirerr.github.io</a>')
    pages.append(f'''
      <section class="cover-top">
        <div class="id">
          <img class="photo" src="{e(d["photo"])}" alt="">
          <div><h1>{e(d["name"])}</h1><p class="role">{e(d["role"])}</p><p class="focus">{e(d["focus"])}</p></div>
        </div>
        <div class="scope">{spectrum_svg(d["markers"])}</div>
      </section>
      <p class="lead">{e(d["summary"])}</p>
      <dl class="facts">{facts}</dl>
      <div class="cover-cols">
        <section><h3>{e(ui["areas"])}</h3><ol class="areas">{areas}</ol></section>
        <section><h3>{e(ui["contents"])}</h3><ol class="toc">{toc}</ol>
          <h3>{e(ui["status"])}</h3><ul class="plain">{status}</ul></section>
      </div>
      <p class="contact-line">{contact_line}</p>''')

    for i, p in enumerate(d["projects"], 1):
        pages.extend(project_pages(p, i, ui))

    # Experience, education, skills
    exp = "".join(f'''<li><div class="when">{e(x["period"])}<br><span>{e(x.get("location", ""))}</span></div>
        <div><h4>{e(x["role"])}</h4><p class="org">{e(x["org"])}</p>
        <ul>{"".join(f"<li>{e(b)}</li>" for b in x["bullets"])}</ul></div></li>''' for x in d["experience"])
    edu = "".join(f'''<li><div class="when">{e(x["period"])}<br><span>{e(x.get("location", ""))}</span></div>
        <div><h4>{e(x["school"])}</h4><p class="org">{e(x["degree"])}</p><p>{e(x["detail"])}</p></div></li>''' for x in d["education"])
    skills = "".join(f'<div><h4>{e(s["group"])}</h4><p>{e(", ".join(s["items"]))}</p></div>' for s in d["skills"])
    langs = " · ".join(f'{e(l["name"])}: {e(l["level"])}' for l in d["languages"])
    pages.append(f'''<h2 class="sec">{e(ui["experience"])}</h2><ol class="tl">{exp}</ol>
      <h2 class="sec">{e(ui["education"])}</h2><ol class="tl">{edu}</ol>
      <h2 class="sec">{e(ui["skills"])}</h2><div class="skills">{skills}</div>
      <p class="langs"><b>{e(ui["languages"])}:</b> {langs}</p>''')

    # Certificates, references, contact
    certs = ""
    for grp in d["certifications"]:
        items = "".join(f'<li><a href="{e(SITE_URL + "/" + it["href"])}">{e(it["title"])}</a><span>{e(it["date"])}</span></li>'
                        for it in grp["items"])
        certs += f'<section class="cgrp{" cols" if grp.get("list") else ""}"><h4>{e(grp["issuer"])}</h4><ul>{items}</ul></section>'
    refs = "".join(f"<li><b>{e(n)}</b><span>{e(t)}</span></li>" for n, t in REFS[lang])
    pages.append(f'''<h2 class="sec">{e(ui["certs"])}</h2><p class="hint">{e(ui["more_online"])}</p>{certs}
      <h2 class="sec">{e(ui["refs"])}</h2><ul class="refs">{refs}</ul><p class="hint">{e(ui["refs_note"])}</p>
      <section class="closing"><h2>{e(ui["contact"])}</h2><p class="contact-line">{contact_line}</p></section>''')

    total = len(pages)
    body = "".join(
        f'<div class="page{" cover" if i == 0 else ""}"><div class="inner">{pg}</div>'
        + ("" if i == 0 else f'<footer><span>{e(ui["footer"])}</span><span>{i + 1} / {total}</span></footer>')
        + "</div>"
        for i, pg in enumerate(pages))
    css = (ROOT / "tools" / "portfolio_pdf.css").read_text(encoding="utf-8")
    return (f'<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><title>{e(ui["doc_title"])}</title>'
            f'<style>{font_css(fonts_dir)}\n{css}</style></head><body>{body}</body></html>')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--fonts")
    ap.add_argument("--check", action="store_true", help="report pages whose content overflows")
    a = ap.parse_args()
    from playwright.sync_api import sync_playwright
    data = load_data()
    targets = {"en": "assets/Efe_Demirer_Portfolio.pdf", "tr": "assets/Efe_Demirer_Portfolyo.pdf"}
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        for lang, out in targets.items():
            tmp = ROOT / f"_portfolio_{lang}.html"
            tmp.write_text(build_html(data[lang], lang, a.fonts), encoding="utf-8")
            pg = b.new_page()
            pg.goto(tmp.as_uri()); pg.wait_for_load_state("networkidle"); pg.evaluate("document.fonts.ready")
            bad = pg.evaluate("""[...document.querySelectorAll('.page .inner')].map((el,i)=>[i+1, el.scrollHeight-el.clientHeight]).filter(x=>x[1]>1)""")
            if bad: print(lang, "overflowing pages (page, px):", bad)
            pg.pdf(path=str(ROOT / out), format="A4", print_background=True, prefer_css_page_size=True)
            pg.close(); tmp.unlink()
            print("wrote", out)
        b.close()


if __name__ == "__main__":
    main()
