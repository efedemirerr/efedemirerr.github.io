import subprocess, os, shutil
import pymupdf

with open('style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

# ==============================================================================
# 1. 1-PAGE ENGLISH CV FOCUSED ON RF & MICROWAVE SYSTEMS
# ==============================================================================
cv_html = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page {
    size: A4 portrait;
    margin: 8mm 12mm 8mm 12mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #111827;
    margin: 0;
    padding: 0;
    font-size: 7.6pt;
    line-height: 1.28;
  }
  .header { text-align: center; margin-bottom: 5px; }
  .name { font-size: 15.5pt; font-weight: 800; letter-spacing: 0.5px; color: #0f172a; margin: 0 0 1px; text-transform: uppercase; }
  .sub-title { font-size: 8.6pt; font-weight: 700; color: #0284c7; margin: 0 0 2px; }
  .contact-bar { font-size: 7.6pt; color: #475569; }
  .contact-bar a { color: #0284c7; text-decoration: none; font-weight: 500; }
  .section-title { font-size: 8.4pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1.2px solid #1e293b; padding-bottom: 1px; margin: 4.5px 0 3px; }
  .row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5px; }
  .entry-title { font-size: 8pt; font-weight: 700; color: #0f172a; }
  .entry-date { font-size: 7.6pt; font-weight: 700; color: #0f172a; white-space: nowrap; }
  .entry-sub { font-size: 7.5pt; color: #334155; font-style: italic; margin-bottom: 1.5px; }
  p { margin: 0 0 2.5px; text-align: justify; }
  ul { margin: 1px 0 3.5px 12px; padding: 0; list-style-type: disc; }
  li { margin-bottom: 1.2px; line-height: 1.26; text-align: justify; }
  .skills-list { margin: 1px 0 2.5px 12px; padding: 0; list-style-type: disc; }
  .skills-list li { margin-bottom: 1.2px; }
  .skills-list strong { color: #0f172a; }
  .ref-grid { font-size: 7.2pt; line-height: 1.22; }
  .ref-item { margin-bottom: 1.5px; }
  .ref-item strong { color: #0f172a; }
</style>
</head>
<body>

<div class="header">
  <div class="name">Efe Demirer</div>
  <div class="sub-title">Candidate RF &amp; Microwave Systems Engineer · Antennas &amp; Test Automation</div>
  <div class="contact-bar">
    İzmir, Turkey &nbsp;|&nbsp; +90 554 638 86 92 &nbsp;|&nbsp; <a href="mailto:efedemirer.tr@gmail.com">efedemirer.tr@gmail.com</a> &nbsp;|&nbsp; <a href="https://efedemirerr.github.io">efedemirerr.github.io</a> &nbsp;|&nbsp; <a href="https://linkedin.com/in/efe-demirer-aa7ba3252">LinkedIn</a>
  </div>
</div>

<div class="section-title">Summary</div>
<p>
Senior Electrical and Electronics Engineering student at Yaşar University specializing in RF &amp; Microwave systems, antenna radiation pattern testing, and high-frequency instrumentation automation. Laboratory and defense experience at ASELSAN REHİS Test Centers Directorate conducting planar near-field antenna scanning, VNA 2-port calibrations, RF amplifier characterization, and real-time spectrum analysis. Skilled in C# GUI test automation, SCPI/Ethernet API instrument control, and G-Code Cartesian positioning systems.
</p>

<div class="section-title">Education</div>
<div class="row">
  <div class="entry-title">Yaşar University – İzmir</div>
  <div class="entry-date">09/2022 – Present</div>
</div>
<div class="entry-sub" style="font-style: normal;">
  B.Sc. in Electrical and Electronics Engineering &nbsp;|&nbsp; 100% Merit Scholarship &nbsp;|&nbsp; GPA: 3.73 / 4.00 (High Honor Standing)<br>
  <strong>Relevant Coursework:</strong> Antennas and Propagation (EEE 4340), Electromagnetic Field Theory, Microwave &amp; RF Measurement, Digital Communications, Signals and Systems
</div>

<div class="row" style="margin-top: 3px;">
  <div class="entry-title">Cem Bakioğlu Anatolian High School – İzmir</div>
  <div class="entry-date">09/2018 – 06/2022</div>
</div>
<div class="entry-sub" style="font-style: normal;">High School Education &nbsp;|&nbsp; Salutatorian (Ranked 2nd in School) &nbsp;|&nbsp; Graduation Grade: 96.89 / 100</div>

<div class="section-title">Work Experience</div>

<div class="row">
  <div class="entry-title">ASELSAN REHİS Test Centers Directorate</div>
  <div class="entry-date">06/2026 – 08/2026</div>
</div>
<div class="entry-sub">Intern Engineer (RF &amp; Microwave Systems / Test Automation)</div>
<ul>
  <li>Contributed to the development of Cartesian X-Y scanning automation and C# .NET graphical user interfaces (GUI) for planar near-field antenna test systems in anechoic chambers.</li>
  <li>Performed Vector Network Analyzer (VNA) calibrations, port reference plane extensions to cable ends, RF component characterization, and power amplifier testing.</li>
  <li>Conducted P1dB compression tests to measure amplifier saturation and non-linear compression characteristics.</li>
  <li>Performed near-field chamber measurements and analyzed RF radar-absorbent material performance using the NRL Arch Test method.</li>
  <li>Engineered API-based instrument control, Ethernet communication integration, and automated test execution scripts.</li>
  <li>Designed a real-time signal peak detection algorithm with dynamic thresholding for automated spectral measurements.</li>
  <li>Evaluated spectrum analyzer specifications and conducted laboratory/field spectral signal monitoring.</li>
  <li>Supported the planning of RF test scenarios and the execution of automated measurement test suites.</li>
  <li>Developed hardware safety interlocks with Limit Switches, stepper motor drive systems, and GRBL G-Code integration on CNC hardware shields.</li>
</ul>

<div class="row">
  <div class="entry-title">OPA Mühendislik</div>
  <div class="entry-date">07/2025 – 08/2025 &amp; 08/2026 – 09/2026</div>
</div>
<div class="entry-sub">Intern Engineer</div>
<ul>
  <li>Performed ground resistance measurements, residual current leakage tests, and technical compliance reporting.</li>
  <li>Participated in field installation, electrical panel assembly, and CAD engineering for solar PV and smart grid/storage infrastructures.</li>
  <li>Prepared solar PV electrical projects and single-line schematics using AutoCAD.</li>
  <li>Executed solar plant simulations, yield analyses, and production performance forecasting using PVsyst.</li>
  <li>Designed power factor compensation panels, calculated capacitor bank sizing, and configured reactive power control relays.</li>
  <li>Calculated power loads, selected cable cross-sections, and supported installations for electric vehicle (EV) charging stations.</li>
  <li>Assembled electrical distribution boards, connecting circuit breakers and residual current devices (RCD) for PV arrays.</li>
  <li>Participated in periodic inspections of transformer substations under High Voltage Facility Operation Responsibility regulations.</li>
</ul>

<div class="section-title">Technical Skills</div>
<ul class="skills-list">
  <li><strong>RF &amp; Microwave Engineering:</strong> Antennas &amp; Propagation, Vector Network Analyzers (VNA), Real-Time Spectrum Analyzers, VNA Full 2-Port Calibration, P1dB Compression Testing, RF Component Characterization, Near-Field Chamber Testing, NRL Arch Testing, S-Parameters &amp; Impedance Matching</li>
  <li><strong>RF Test Automation &amp; Software:</strong> C#, .NET, Windows Forms, Graphical User Interfaces (GUI), Python, API Integration, SCPI &amp; G-Code, Serial (RS-232), Ethernet TCP/IP, MATLAB</li>
  <li><strong>Motion &amp; Scanning Hardware:</strong> Planar Cartesian X-Y Motion Control, Stepper Motor Drives, CNC Shield V3, GRBL Firmware, Limit Switch Safety Interlocks, Arduino &amp; STM32</li>
  <li><strong>Simulation &amp; Modeling:</strong> MATLAB &amp; Simulink, LTspice, Proteus, RF Power Amplifier Circuit Simulation</li>
  <li><strong>Electrical &amp; Power Systems:</strong> AutoCAD, PVsyst, ETAP, Solar PV Systems, Single-Line Diagrams, Power Factor Correction</li>
</ul>

<div class="section-title">Languages &amp; Professional Competencies</div>
<ul class="skills-list">
  <li><strong>Languages:</strong> English B2 (Upper-Intermediate), Yaşar University School of Foreign Languages certified</li>
  <li><strong>Professional Competencies:</strong> Cross-functional Team Collaboration, Technical Documentation &amp; Reporting, Analytical Problem Solving</li>
</ul>

<div class="section-title">Additional Information &amp; Credentials</div>
<ul class="skills-list">
  <li><strong>Credentials:</strong> National Technology Initiative Chip Design Certificate (Code: 35867118094667) | TUSAŞ LIFT UP Conference | TÜBİTAK 4006</li>
  <li><strong>Personal:</strong> Driving License: Class B &nbsp;|&nbsp; Military Service: Postponed until 31/12/2031</li>
</ul>

<div class="section-title">References</div>
<div class="ref-grid">
  <div class="ref-item"><strong>Prof. Dr. Mustafa SEÇMEN</strong> – Dean, Faculty of Engineering / Yaşar University &nbsp;|&nbsp; mustafa.secmen@yasar.edu.tr &nbsp;|&nbsp; +90 232 570 8232</div>
  <div class="ref-item"><strong>Dr. Ali Haluk NALBANTOĞLU</strong> – Faculty Member / Yaşar University, Former Director of Electronic Warfare at ASELSAN &nbsp;|&nbsp; haluk.nalbantoglu@yasar.edu.tr &nbsp;|&nbsp; +90 533 236 1399</div>
  <div class="ref-item"><strong>Hüseyin Talha ÇULHA</strong> – RF Test Engineer / ASELSAN REHİS &nbsp;|&nbsp; htalhaculha@aselsan.com &nbsp;|&nbsp; +90 531 950 4360</div>
  <div class="ref-item"><strong>Murat YALÇINKAYA</strong> – Systems Engineer / ASELSAN REHİS via EHSİM &nbsp;|&nbsp; yalcnkayam@gmail.com &nbsp;|&nbsp; +90 538 847 9001</div>
  <div class="ref-item"><strong>Onur İŞÇİ</strong> – Founder &amp; Electrical-Electronics Engineer / OPA Mühendislik &nbsp;|&nbsp; onur@opamuhendislik.com &nbsp;|&nbsp; +90 530 040 2821</div>
</div>

</body>
</html>"""

with open('temp_cv.html', 'w', encoding='utf-8') as f:
    f.write(cv_html)

out_cv = os.path.abspath('Efe_Demirer_CV_EN.pdf')
cmd_cv = [edge_path, '--headless', '--disable-gpu', '--no-pdf-header-footer', f'--print-to-pdf={out_cv}', os.path.abspath('temp_cv.html')]
subprocess.run(cmd_cv, check=True)
shutil.copyfile('Efe_Demirer_CV_EN.pdf', 'Efe_Demirer_CV.pdf')
shutil.copyfile('Efe_Demirer_CV_EN.pdf', 'assets/Efe_Demirer_CV.pdf')
print('RF-focused CV generated successfully!')

# ==============================================================================
# 2. ENHANCED PRINT CSS FOR BEAUTIFUL, RICH, ZERO-MARGIN FULL-PAGE LAYOUT
# ==============================================================================
print_css = """
@media print {
  @page {
    size: A4 portrait;
    margin: 0 !important;
  }
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    box-sizing: border-box !important;
    animation: none !important;
    box-shadow: none !important;
    text-shadow: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
  html, body {
    background-color: #070b14 !important;
    background-image: none !important;
    color: #e2e8f0 !important;
    padding: 0 !important;
    margin: 0 !important;
    font-size: 8.4pt !important;
    line-height: 1.34 !important;
    width: 210mm !important;
  }
  main { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }

  /* Full Page Wrappers */
  .page-cover-wrapper,
  .page-1-wrapper,
  .page-2-wrapper,
  .page-3-wrapper,
  .page-4-wrapper,
  .page-5-wrapper {
    width: 210mm !important;
    min-height: 297mm !important;
    height: 297mm !important;
    padding: 7.5mm 12mm 7.5mm 12mm !important;
    margin: 0 !important;
    background-color: #070b14 !important;
    background-image: none !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    page-break-after: always !important;
    break-after: page !important;
    overflow: hidden !important;
  }
  .page-5-wrapper {
    page-break-after: avoid !important;
    break-after: avoid !important;
  }

  /* Header & Navigation Bar */
  .nav {
    position: static !important;
    margin-bottom: 7px !important;
    border-bottom: 1px solid rgba(56, 189, 248, 0.3) !important;
    background: transparent !important;
    padding: 0 0 5px 0 !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
  }
  .nav .brand { font-size: 8.5pt !important; font-weight: 700 !important; color: #ffffff !important; text-decoration: none !important; }
  .nav-tagline { font-size: 7.8pt !important; color: #38bdf8 !important; font-weight: 600 !important; text-transform: uppercase; letter-spacing: 0.4px; }
  .nav nav { overflow: visible !important; gap: 12px !important; }
  .nav a { font-size: 7.8pt !important; }

  /* Section Titles */
  h2 {
    font-size: 11.5pt !important;
    font-weight: 800 !important;
    margin: 0 0 7px 0 !important;
    padding-bottom: 3px !important;
    border-bottom: 2px solid #0284c7 !important;
    display: inline-block !important;
    color: #ffffff !important;
    text-transform: uppercase !important;
    letter-spacing: 0.3px !important;
  }

  /* Cover Letter Page */
  .cover-card {
    background: #0d1527 !important;
    border: 1px solid rgba(56, 189, 248, 0.4) !important;
    border-radius: 10px !important;
    padding: 22px 26px !important;
    margin-top: 2px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    flex-grow: 1 !important;
    max-height: 272mm !important;
  }
  .cover-meta {
    display: flex !important;
    justify-content: space-between !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
    padding-bottom: 9px !important;
    margin-bottom: 11px !important;
    font-size: 8.4pt !important;
    color: #94a3b8 !important;
    line-height: 1.35 !important;
  }
  .cover-to { font-weight: 800 !important; color: #ffffff !important; font-size: 9pt !important; }
  .cover-body p {
    font-size: 8.7pt !important;
    line-height: 1.48 !important;
    color: #cbd5e1 !important;
    margin-bottom: 8.5px !important;
    text-align: justify !important;
  }
  .cover-body strong { color: #ffffff !important; }

  /* Cover Letter 4-Card Summary Matrix */
  .cover-matrix {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 8px !important;
    margin-top: 10px !important;
    margin-bottom: 8px !important;
  }
  .matrix-item {
    background: rgba(15, 23, 42, 0.7) !important;
    border: 1px solid rgba(56, 189, 248, 0.25) !important;
    border-left: 3px solid #38bdf8 !important;
    border-radius: 6px !important;
    padding: 7px 10px !important;
    font-size: 7.6pt !important;
    line-height: 1.32 !important;
    color: #cbd5e1 !important;
  }
  .matrix-title { font-weight: 700 !important; color: #38bdf8 !important; font-size: 7.9pt !important; margin-bottom: 2px !important; }
  .cover-sign {
    margin-top: 8px !important;
    padding-top: 8px !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
    font-size: 8.6pt !important;
    color: #ffffff !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: flex-end !important;
  }

  /* Page 1: Hero & Highlights */
  .hero { padding-top: 2px !important; margin-bottom: 10px !important; }
  .hero-card {
    background: #0d1527 !important;
    border: 1px solid rgba(56, 189, 248, 0.4) !important;
    border-radius: 12px !important;
    padding: 18px 22px !important;
    margin-bottom: 10px !important;
  }
  .avatar {
    width: 100px !important;
    height: 100px !important;
    border: 2.5px solid #38bdf8 !important;
  }
  .hero-content h1 { font-size: 18pt !important; margin-bottom: 3px !important; }
  .hero-content .subtitle { font-size: 9.4pt !important; margin-bottom: 7px !important; }
  .hero-content #summary { font-size: 8.3pt !important; line-height: 1.38 !important; margin-bottom: 10px !important; text-align: justify !important; }
  .btn { padding: 4.5px 11px !important; font-size: 7.8pt !important; border: 1px solid rgba(255, 255, 255, 0.15) !important; }
  .featured-stats { display: flex !important; flex-wrap: wrap !important; gap: 5px !important; margin: 5px 0 !important; }
  .stat-pill { background: rgba(56, 189, 248, 0.15) !important; border: 1px solid rgba(56, 189, 248, 0.4) !important; color: #38bdf8 !important; padding: 2.5px 8.5px !important; border-radius: 999px !important; font-weight: 600 !important; font-size: 7.5pt !important; }

  /* Project Pages (Page 2 & 3) Dedicated Layout */
  .project-page-grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 12px !important;
    align-items: stretch !important;
    flex-grow: 1 !important;
  }
  .project-card-full {
    background: #0d1527 !important;
    border: 1px solid rgba(56, 189, 248, 0.28) !important;
    border-radius: 10px !important;
    padding: 11px 13px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
  }
  .proj-badge {
    font-size: 6.8pt !important;
    font-weight: 700 !important;
    color: #38bdf8 !important;
    letter-spacing: 0.4px !important;
    text-transform: uppercase !important;
    margin-bottom: 2px !important;
  }
  .proj-title {
    font-size: 9.8pt !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    line-height: 1.25 !important;
    margin: 0 0 2px 0 !important;
  }
  .proj-meta {
    font-size: 7.3pt !important;
    color: #94a3b8 !important;
    margin-bottom: 6px !important;
  }

  /* Media Showcase: Main Hero Image + 3 Sub-Thumbnails */
  .proj-media-block {
    margin-bottom: 7px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 4.5px !important;
  }
  .proj-hero-frame {
    border-radius: 6px !important;
    overflow: hidden !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    background: #060a12 !important;
    position: relative !important;
  }
  .proj-hero-frame img {
    width: 100% !important;
    height: 125px !important;
    object-fit: cover !important;
    display: block !important;
  }
  .proj-caption {
    background: #0b1120 !important;
    color: #cbd5e1 !important;
    font-size: 6.6pt !important;
    font-weight: 600 !important;
    padding: 2.5px 6px !important;
    text-align: center !important;
    border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  }
  .proj-gallery-grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr !important;
    gap: 4.5px !important;
  }
  .proj-thumb-item {
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 5px !important;
    overflow: hidden !important;
    background: #060a12 !important;
    display: flex !important;
    flex-direction: column !important;
  }
  .proj-thumb-item img {
    width: 100% !important;
    height: 52px !important;
    object-fit: cover !important;
    display: block !important;
  }
  .proj-thumb-item span {
    font-size: 6.1pt !important;
    font-weight: 600 !important;
    color: #94a3b8 !important;
    padding: 2px !important;
    text-align: center !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    background: #0b1120 !important;
    border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
  }
  .proj-thumb-item.solar-pill {
    height: 68px !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 4px !important;
    background: #09101f !important;
  }
  .solar-pill .pill-icon { font-size: 15pt !important; margin-bottom: 2px !important; }
  .solar-pill span {
    font-size: 6.2pt !important;
    white-space: normal !important;
    line-height: 1.15 !important;
    background: transparent !important;
    border: none !important;
  }

  /* 4-Item Technical Specifications Grid */
  .proj-specs {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 4px !important;
    margin-bottom: 6px !important;
  }
  .spec-pill {
    background: rgba(56, 189, 248, 0.08) !important;
    border: 1px solid rgba(56, 189, 248, 0.22) !important;
    border-radius: 4px !important;
    padding: 2.5px 6px !important;
    font-size: 6.7pt !important;
    color: #e2e8f0 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .spec-pill strong { color: #38bdf8 !important; }

  /* Paragraph & Bullets */
  .proj-summary {
    font-size: 7.4pt !important;
    line-height: 1.32 !important;
    color: #cbd5e1 !important;
    margin-bottom: 6px !important;
    text-align: justify !important;
  }
  .proj-bullets {
    margin: 0 0 6px 0 !important;
    padding: 0 !important;
    list-style: none !important;
  }
  .proj-bullets li {
    font-size: 7.2pt !important;
    line-height: 1.28 !important;
    color: #cbd5e1 !important;
    margin-bottom: 3.5px !important;
    padding-left: 11px !important;
    position: relative !important;
    text-align: justify !important;
  }
  .proj-bullets li::before {
    content: "▹" !important;
    position: absolute !important;
    left: 0 !important;
    color: #38bdf8 !important;
    font-size: 7.5pt !important;
  }
  .proj-bullets strong { color: #ffffff !important; }
  .tags {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 3.5px !important;
    margin-top: auto !important;
  }
  .tag {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(56, 189, 248, 0.22) !important;
    color: #94a3b8 !important;
    padding: 1.5px 5.5px !important;
    border-radius: 4px !important;
    font-size: 6.6pt !important;
  }

  /* Page 4: Experience & Education */
  .exp-card {
    background: #0d1527 !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 10px !important;
    padding: 12px 16px !important;
    margin-bottom: 8px !important;
  }
  .exp-card h3 { font-size: 9.8pt !important; margin: 0 0 2px 0 !important; color: #ffffff !important; }
  .exp-card .date { font-size: 8pt !important; color: #38bdf8 !important; margin-bottom: 5px !important; font-weight: 600 !important; }
  .exp-card p { font-size: 7.9pt !important; line-height: 1.34 !important; color: #94a3b8 !important; margin-bottom: 5px !important; }
  .exp-card ul { margin: 2px 0 0 12px !important; padding: 0 !important; }
  .exp-card li { font-size: 7.6pt !important; line-height: 1.32 !important; color: #cbd5e1 !important; margin-bottom: 3.2px !important; text-align: justify !important; }
  .exp-card strong { color: #ffffff !important; }

  .edu-grid {
    display: grid !important;
    grid-template-columns: 1.25fr 1fr !important;
    gap: 10px !important;
  }

  /* Page 5: Certs, References, Contact */
  .two { display: grid !important; grid-template-columns: 1.2fr 1fr !important; gap: 12px !important; margin-bottom: 12px !important; }
  .two > div {
    background: #0d1527 !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 10px !important;
    padding: 16px 20px !important;
  }
  .two ul { margin: 4px 0 0 12px !important; padding: 0 !important; }
  .two li { font-size: 7.8pt !important; line-height: 1.4 !important; margin-bottom: 5.5px !important; color: #cbd5e1 !important; }
  .two strong { color: #ffffff !important; }

  .refs-grid {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 9px !important;
    margin-top: 6px !important;
    margin-bottom: 12px !important;
  }
  .ref-card {
    background: #0d1527 !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-left: 3.5px solid #0284c7 !important;
    border-radius: 8px !important;
    padding: 12px 14px !important;
    font-size: 7.8pt !important;
    line-height: 1.35 !important;
  }
  .ref-name { font-weight: 700 !important; color: #ffffff !important; font-size: 8.4pt !important; }
  .ref-meta { color: #94a3b8 !important; margin-top: 3px !important; }

  .contact { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 9px !important; margin-top: 6px !important; }
  .contact a {
    background: #0d1527 !important;
    border: 1px solid rgba(56, 189, 248, 0.28) !important;
    border-radius: 8px !important;
    padding: 11px 14px !important;
    font-size: 8.4pt !important;
    color: #e2e8f0 !important;
    text-decoration: none !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
  }

  .portfolio-statement-card {
    margin-top: 10px !important;
    background: rgba(56, 189, 248, 0.06) !important;
    border: 1px solid rgba(56, 189, 248, 0.25) !important;
    border-radius: 8px !important;
    padding: 10px 14px !important;
    font-size: 7.4pt !important;
    line-height: 1.38 !important;
    color: #94a3b8 !important;
    text-align: justify !important;
  }

  footer { display: none !important; }
}
"""

# ==============================================================================
# 3. COVER LETTER SECTION (PAGE 1 OF 6-PAGE DOCUMENT)
# ==============================================================================
cover_letter_section = """
  <!-- ==================== COVER LETTER PAGE ==================== -->
  <div class="page-cover-wrapper">
    <header class="nav">
      <a class="brand" href="https://efedemirerr.github.io">ED · efedemirerr.github.io</a>
      <div class="nav-tagline">BAYKAR TEKNOLOJİ · RF VE MİKRODALGA SİSTEMLERİ GELİŞTİRME STAJ BAŞVURUSU</div>
    </header>

    <div class="cover-card animated-frame">
      <div>
        <div class="cover-meta">
          <div>
            <div class="cover-to">BAYKAR TEKNOLOJİ İNSAN KAYNAKLARI DİREKTÖRLÜĞÜ'NE</div>
            <div style="color: #38bdf8; font-weight: 700; font-size: 8.4pt; margin-top: 2px;">İlgili Pozisyon: RF ve Mikrodalga Sistemleri Geliştirme (2027 Bahar Dönemi Stajı)</div>
            <div>İstanbul, Türkiye</div>
          </div>
          <div style="text-align: right;">
            <div><strong>Aday:</strong> Efe Demirer</div>
            <div>Elektrik-Elektronik Mühendisliği (GNO: 3.73 / 4.00)</div>
            <div>Yaşar Üniversitesi (%100 ÖSYM Tam Burslu)</div>
          </div>
        </div>

        <div class="cover-body">
          <p><strong>Sayın Yetkili,</strong></p>
          <p>
            Milli Teknoloji Hamlesi vizyonuyla Bayraktar TB2, TB3, AKINCI ve KIZILELMA gibi insansız hava araçları ekosistemimize küresel liderlik kazandıran <strong>BAYKAR Teknoloji</strong> bünyesinde; <strong>RF ve Mikrodalga Sistemleri Geliştirme</strong> biriminde stajyer mühendis olarak görev almak amacıyla başvurumu sunmaktayım.
          </p>
          <p>
            Yaşar Üniversitesi Elektrik-Elektronik Mühendisliği 4. sınıf öğrencisiyim (%100 Burslu, 3.73 GNO, Yüksek Onur Öğrencisi). Akademik eğitimimde bu dönem almakta olduğum <strong>EEE 4340 Antenler ve Propagasyon</strong>, Elektromanyetik Alan Teorisi ve Mikrodalga Ölçüm disiplinlerinde edindiğim teorik temeli, doğrudan savunma sanayii Ar-Ge ve test laboratuvarlarında somut projelere dönüştürdüm.
          </p>
          <p>
            <strong>ASELSAN REHİS Test Merkezleri Müdürlüğü</strong> bünyesindeki stajımda; yankısız odalarda (anechoic chamber) anten ışıma deseni yakın alan ölçümleri için <strong>Kartezyen X-Y tarama otomasyonu ve C# GUI</strong> kontrol yazılımı geliştirdim. Ayrıca Vektör Ağ Analizörü (VNA) tam 2-port kalibrasyonları, ölçüm referans düzleminin kablo uçlarına taşınması, RF bileşen karakterizasyonu ve <strong>amfilerin P1dB sıkıştırma (compression) testlerinde</strong> bilfiil görev aldım. RF soğurucu malzemelerin performansını NRL Arch Test yöntemiyle karakterize ettim ve <strong>Gerçek Zamanlı Spektrum Analizörü (Real-Time Spectrum Analyzer)</strong> için Ethernet TCP üzerinden C/C++ API entegrasyonu ve anlık tepe noktası (peak search) algoritması tasarladım.
          </p>
          <p>
            <strong>2027 Bahar Dönemi Staj Takvimi Kapsamında (01.02.2027 – 22.05.2027):</strong> Üniversite 4. sınıf ders programımı koordine ederek, staj süresince <strong>haftada en az 3 gün (veya birimin ihtiyacına göre daha fazla)</strong> düzenli, kesintisiz ve tam mesaiyle Baykar Ar-Ge tesislerinde aktif görev almaya hazırım.
          </p>
          <p>
            Baykar'ın milli İHA platformlarında görev yapan anten, RF veri bağı (data link), radar ve mikrodalga alt sistemlerinin tasarım, simülasyon ve test süreçlerine yüksek sorumluluk bilinciyle katkı sağlamayı hedefliyorum. Çalışmalarımı özetleyen teknik portfolyom ekte sunulmuş olup, detaylı projelerime <a href="https://efedemirerr.github.io" style="color: #38bdf8; text-decoration: none; font-weight: 600;">efedemirerr.github.io</a> adresinden de erişilebilir.
          </p>
        </div>

        <div class="cover-matrix">
          <div class="matrix-item">
            <div class="matrix-title">Akademik Derece &amp; Başarı</div>
            Yaşar Üniv. EEM (3.73 / 4.00, Yüksek Onur, %100 Burs), EEE 4340 Antenler ve Propagasyon, Elektromanyetik Alan Teorisi.
          </div>
          <div class="matrix-item">
            <div class="matrix-title">Savunma Ar-Ge &amp; Test Deneyimi</div>
            ASELSAN REHİS Test Merkezleri: Anten Yakın Alan X-Y Tarama, VNA Tam 2-Port Kalibrasyon, Amfi P1dB Sıkıştırma Testi.
          </div>
          <div class="matrix-item">
            <div class="matrix-title">Enstrümantasyon &amp; Yazılım</div>
            C# .NET GUI, Ethernet TCP API Entegrasyonu, Gerçek Zamanlı Tepe Noktası (Peak Search), GRBL G-Code Otomasyonu.
          </div>
          <div class="matrix-item">
            <div class="matrix-title">Staj Uygunluğu &amp; Taahhüt</div>
            2027 Bahar Dönemi (01.02.2027 – 22.05.2027) boyunca haftada en az 3 gün düzenli ve tam mesai laboratuvar katılımı.
          </div>
        </div>
      </div>

      <div class="cover-sign">
        <div>
          <div style="font-weight: 700;">Efe DEMİRER</div>
          <div style="color: #94a3b8; font-size: 7.8pt;">Aday RF ve Mikrodalga Sistemleri Mühendisi · Yaşar Üniversitesi EEM</div>
        </div>
        <div style="text-align: right; color: #94a3b8; font-size: 7.8pt;">
          İzmir, Bornova &nbsp;|&nbsp; +90 554 638 86 92 &nbsp;|&nbsp; efedemirer.tr@gmail.com
        </div>
      </div>
    </div>
  </div>
"""

# ==============================================================================
# 4. PORTFOLIO 5-PAGE HTML BODY
# ==============================================================================
body_5pages = """
  <!-- ==================== PAGE 1: PROFILE & HIGHLIGHTS ==================== -->
  <div class="page-1-wrapper">
    <header class="nav">
      <a class="brand" href="https://efedemirerr.github.io">ED · efedemirerr.github.io</a>
      <nav>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        <a href="#extra">Certifications</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <section class="hero">
      <div class="hero-card animated-frame">
        <div class="hero-layout">
          <img class="avatar" src="assets_opt/efe-demirer.jpg" alt="Efe Demirer">
          <div class="hero-content">
            <h1>Efe Demirer</h1>
            <p class="subtitle">Candidate RF &amp; Microwave Systems Engineer · Antennas &amp; Test Automation</p>
            <p id="summary">Senior Electrical and Electronics Engineering student at Yaşar University specializing in RF &amp; Microwave systems, antenna radiation pattern testing, and high-frequency instrumentation automation. Laboratory and defense experience at ASELSAN REHİS Test Centers Directorate conducting planar near-field antenna scanning, VNA 2-port calibrations, RF amplifier characterization, and real-time spectrum analysis.</p>
            <div class="actions">
              <a class="btn primary" href="https://efedemirerr.github.io">Live Portfolio (GitHub Pages)</a>
              <a class="btn" href="https://linkedin.com/in/efe-demirer-aa7ba3252">LinkedIn Profile</a>
              <a class="btn" href="mailto:efedemirer.tr@gmail.com">efedemirer.tr@gmail.com</a>
              <a class="btn" href="https://github.com/efedemirerr">GitHub: efedemirerr</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="skills" style="padding-top: 0;">
      <h2>Skills &amp; Highlights</h2>
      <div class="skills" id="page-1-skills"></div>
    </section>
  </div>

  <!-- ==================== PAGE 2: RF & MICROWAVE DEFENSE PROJECTS ==================== -->
  <div class="page-2-wrapper">
    <header class="nav">
      <a class="brand" href="https://efedemirerr.github.io">ED · efedemirerr.github.io</a>
      <div class="nav-tagline">PORTFOLIO · RF &amp; MICROWAVE TEST SYSTEMS (ASELSAN REHİS)</div>
    </header>
    <section style="padding: 0; display: flex; flex-direction: column; flex-grow: 1;">
      <h2>Featured RF &amp; Microwave Defense Projects</h2>
      <div class="project-page-grid">

        <!-- PROJECT 1: CNC SCANNER -->
        <article class="project-card-full animated-frame">
          <div class="proj-header">
            <div class="proj-badge">ASELSAN REHİS · ANTENNA TEST AUTOMATION</div>
            <h3 class="proj-title">Automated CNC Antenna Scanning Test System &amp; Control GUI</h3>
            <div class="proj-meta">Anechoic Chamber Planar Near-Field Testing · 2026</div>
          </div>

          <div class="proj-media-block">
            <div class="proj-hero-frame">
              <img src="assets_opt/cnc-scanner-gui.jpg" alt="EFEscan C# GUI">
              <div class="proj-caption">EFEscan C# .NET Control GUI · Live Scan Grid Coordinate Tracking</div>
            </div>
            <div class="proj-gallery-grid">
              <div class="proj-thumb-item">
                <img src="assets_opt/cnc-scanner-chassis.jpg" alt="Cartesian Rail Chassis">
                <span>Cartesian Rail Chassis</span>
              </div>
              <div class="proj-thumb-item">
                <img src="assets_opt/cnc-hardware-shield.jpg" alt="CNC Shield & Steppers">
                <span>CNC Shield V3 Hardware</span>
              </div>
              <div class="proj-thumb-item">
                <img src="assets_opt/cnc-limit-switches.jpg" alt="NC Limit Safety Interlocks">
                <span>4x NC Safety Interlocks</span>
              </div>
            </div>
          </div>

          <div class="proj-specs">
            <div class="spec-pill"><strong>Motion:</strong> Cartesian X-Y (GRBL)</div>
            <div class="spec-pill"><strong>Safety:</strong> 4x NC Limit Switches</div>
            <div class="spec-pill"><strong>Interface:</strong> Serial COM (115200)</div>
            <div class="spec-pill"><strong>Application:</strong> Near-Field Chamber</div>
          </div>

          <p class="proj-summary">
            Autonomous Cartesian X-Y planar antenna scanning system engineered for ASELSAN REHİS Test Centers Directorate, replacing manual probe positioning with high-precision automated radiation pattern measurements in anechoic chambers.
          </p>

          <ul class="proj-bullets">
            <li><strong>Hardware &amp; Motion Control:</strong> Interfaced PC with Arduino Uno + CNC Shield V3 running GRBL firmware over asynchronous Serial Port (115200 Baud).</li>
            <li><strong>G-Code Protocol:</strong> Implemented real-time G-Code stream generation (G90/G91/G92/G1) with centered grid coordinate pathway calculations and dynamic step resolution.</li>
            <li><strong>Hardware Safety Interlocks:</strong> Integrated 4 mechanical Normally-Closed (NC) limit switches for hardware-level collision prevention, triggering instant GRBL ALARM mode and motor cutoff.</li>
            <li><strong>Multi-Threaded Execution:</strong> Designed asynchronous BackgroundWorker threads eliminating UI freezing, paired with live bitmap scan visualization and feedrate-calibrated motion delays.</li>
          </ul>

          <div class="tags">
            <span class="tag">C# .NET</span>
            <span class="tag">GRBL G-Code</span>
            <span class="tag">Arduino &amp; CNC Shield</span>
            <span class="tag">Hardware Limit Switches</span>
            <span class="tag">Near-Field Scanning</span>
            <span class="tag">Anechoic Chamber</span>
          </div>
        </article>

        <!-- PROJECT 2: SPECTRUM ANALYZER -->
        <article class="project-card-full animated-frame">
          <div class="proj-header">
            <div class="proj-badge">ASELSAN REHİS · RF SIGNAL ANALYSIS &amp; INSTRUMENTATION</div>
            <h3 class="proj-title">Real-Time Spectrum Analyzer API &amp; Custom GUI</h3>
            <div class="proj-meta">High-Speed Ethernet API &amp; Real-Time Peak Detection · 2026</div>
          </div>

          <div class="proj-media-block">
            <div class="proj-hero-frame">
              <img src="assets_opt/spectrum-custom-gui.jpg" alt="Custom Spectrum GUI">
              <div class="proj-caption">Custom C# GUI Real-Time Spectrum Trace &amp; Active Peak Detection</div>
            </div>
            <div class="proj-gallery-grid">
              <div class="proj-thumb-item">
                <img src="assets_opt/spectrum-api-arch.jpg" alt="Ethernet TCP API Flow">
                <span>Ethernet TCP API Flow</span>
              </div>
              <div class="proj-thumb-item">
                <img src="assets_opt/spectrum-params-gui.jpg" alt="Smart RBW & Filter Management">
                <span>Smart RBW / VBW Control</span>
              </div>
              <div class="proj-thumb-item">
                <img src="assets_opt/spectrum-reference-trace.jpg" alt="Reference Trace Benchmarking">
                <span>Reference Validation</span>
              </div>
            </div>
          </div>

          <div class="proj-specs">
            <div class="spec-pill"><strong>Protocol:</strong> Ethernet TCP/IP (Port 5000)</div>
            <div class="spec-pill"><strong>Algorithm:</strong> Real-Time Peak Search</div>
            <div class="spec-pill"><strong>Noise Floor:</strong> Dynamic -70 dBm Floor</div>
            <div class="spec-pill"><strong>Validation:</strong> Reference Benchmarked</div>
          </div>

          <p class="proj-summary">
            Dedicated C# desktop automation platform and custom GUI interfacing natively with a Real-Time Spectrum Analyzer at ASELSAN REHİS, executing automated high-speed RF spectral signal monitoring and carrier tracking.
          </p>

          <ul class="proj-bullets">
            <li><strong>Native API Integration:</strong> Interfaced natively via manufacturer C/C++ API over Ethernet TCP/IPv4 (Port 5000) with robust IP parsing and persistent hardware session control.</li>
            <li><strong>Parameter Management:</strong> Implemented dynamic frequency range configuration (Start/Stop, Center, Span) with automated Resolution Bandwidth (RBW) and Video Bandwidth (VBW) tuning.</li>
            <li><strong>Proprietary Peak Search:</strong> Designed real-time peak detection isolating carrier frequencies above calibrated noise floor (-70 dBm) to separate true signals from ambient RF noise.</li>
            <li><strong>Laboratory Benchmarking:</strong> Conducted comparative validation against manufacturer reference software, verifying measurement accuracy in defense testing environments.</li>
          </ul>

          <div class="tags">
            <span class="tag">C# .NET</span>
            <span class="tag">Spectrum Analyzer API</span>
            <span class="tag">Ethernet TCP/IP</span>
            <span class="tag">Peak Search Algorithm</span>
            <span class="tag">Spectral Monitoring</span>
            <span class="tag">RF Sniffing</span>
          </div>
        </article>

      </div>
    </section>
  </div>

  <!-- ==================== PAGE 3: TELECOM & TELEMETRY PROJECTS ==================== -->
  <div class="page-3-wrapper">
    <header class="nav">
      <a class="brand" href="https://efedemirerr.github.io">ED · efedemirerr.github.io</a>
      <div class="nav-tagline">PORTFOLIO · TELECOM &amp; AUTONOMOUS TELEMETRY</div>
    </header>
    <section style="padding: 0; display: flex; flex-direction: column; flex-grow: 1;">
      <h2>Telecom &amp; Autonomous Telemetry Projects</h2>
      <div class="project-page-grid">

        <!-- PROJECT 3: ULTRASONIC TICKETING -->
        <article class="project-card-full animated-frame">
          <div class="proj-header">
            <div class="proj-badge">DIGITAL COMMUNICATIONS &amp; DSP RESEARCH</div>
            <h3 class="proj-title">Ultrasonic Ticketing System: Seamless &amp; Offline Access Control</h3>
            <div class="proj-meta">Near-Ultrasound Acoustic Communications · MATLAB DSP · 2026</div>
          </div>

          <div class="proj-media-block">
            <div class="proj-hero-frame">
              <img src="assets_opt/ultrasonic-system-arch.jpg" alt="Ultrasonic Architecture">
              <div class="proj-caption">Near-Ultrasound Acoustic Communication System Architecture</div>
            </div>
            <div class="proj-gallery-grid">
              <div class="proj-thumb-item">
                <img src="assets_opt/ultrasonic-bfsk-waveform.jpg" alt="BFSK Waveform">
                <span>BFSK Modulated Carrier</span>
              </div>
              <div class="proj-thumb-item">
                <img src="assets_opt/ultrasonic-dsp-receiver.jpg" alt="Quadrature Demodulator">
                <span>Quadrature Mixer &amp; DSP</span>
              </div>
              <div class="proj-thumb-item">
                <img src="assets_opt/ultrasonic-ber-waterfall.jpg" alt="BER Waterfall Curves">
                <span>BER / PSR Waterfall</span>
              </div>
            </div>
          </div>

          <div class="proj-specs">
            <div class="spec-pill"><strong>Acoustic Band:</strong> 18 kHz – 22 kHz</div>
            <div class="spec-pill"><strong>Modulation:</strong> BFSK + Barker Sync</div>
            <div class="spec-pill"><strong>Channel:</strong> Two-Ray Multipath &amp; Doppler</div>
            <div class="spec-pill"><strong>Platform:</strong> Full MATLAB Pipeline</div>
          </div>

          <p class="proj-summary">
            Near-ultrasound (18–22 kHz) acoustic communication protocol enabling offline, zero-infrastructure access control without cellular data, internet, Bluetooth, or NFC, using standard commercial audio transducers.
          </p>

          <ul class="proj-bullets">
            <li><strong>Acoustic Transducers:</strong> Utilized commercial smartphone speakers and microphones to transmit encrypted access tokens completely inaudible to human ears.</li>
            <li><strong>Digital Modulation:</strong> Developed full MATLAB DSP pipeline featuring bit-level token synthesis, Barker code frame synchronization, and Binary Frequency Shift Keying (BFSK).</li>
            <li><strong>Channel Simulation:</strong> Modeled multipath propagation (Two-Ray Model), ambient acoustic interference, transducer frequency limits, and motion-induced Doppler shifts.</li>
            <li><strong>DSP Receiver &amp; Validation:</strong> Built quadrature mixer receiver with envelope detection, parity verification, and comprehensive BER/PSR waterfall performance analysis.</li>
          </ul>

          <div class="tags">
            <span class="tag">MATLAB</span>
            <span class="tag">Digital Communications</span>
            <span class="tag">BFSK Modulation</span>
            <span class="tag">Acoustic Channel Modeling</span>
            <span class="tag">DSP</span>
            <span class="tag">Barker Code</span>
          </div>
        </article>

        <!-- PROJECT 4: SOLAROPA -->
        <article class="project-card-full animated-frame">
          <div class="proj-header">
            <div class="proj-badge">AUTONOMOUS TELEMETRY &amp; AI SYSTEMS</div>
            <h3 class="proj-title">SolarOPA: Autonomous AI Solar Plant Monitoring &amp; Telemetry</h3>
            <div class="proj-meta">Commercial PV Fleet Intelligence · Python &amp; Gemini AI · 2026</div>
          </div>

          <div class="proj-media-block">
            <div class="proj-hero-frame">
              <img src="assets/img/projects/solaropa-architecture.svg" alt="SolarOPA Architecture">
              <div class="proj-caption">End-to-End Closed-Loop Telemetry &amp; AI Intelligence Pipeline</div>
            </div>
            <div class="proj-gallery-grid">
              <div class="proj-thumb-item solar-pill">
                <div class="pill-icon">⚡</div>
                <span>OpenAPI Telemetry (OAuth 2.0)</span>
              </div>
              <div class="proj-thumb-item solar-pill">
                <div class="pill-icon">💾</div>
                <span>SQLite DB &amp; PR Curve Fitting</span>
              </div>
              <div class="proj-thumb-item solar-pill">
                <div class="pill-icon">🤖</div>
                <span>Gemini AI Anomaly Reports</span>
              </div>
            </div>
          </div>

          <div class="proj-specs">
            <div class="spec-pill"><strong>Telemetry:</strong> OpenAPI (OAuth 2.0)</div>
            <div class="spec-pill"><strong>Storage:</strong> SQLite Time-Series DB</div>
            <div class="spec-pill"><strong>Analytics:</strong> Scientific Fleet PR Curve</div>
            <div class="spec-pill"><strong>AI Engine:</strong> Gemini LLM (Daily SMTP)</div>
          </div>

          <p class="proj-summary">
            Autonomous closed-loop telemetry and operational intelligence platform for commercial solar power plants (GES) utilizing Sungrow iSolarCloud infrastructure, automating multi-inverter monitoring and anomaly diagnosis.
          </p>

          <ul class="proj-bullets">
            <li><strong>OpenAPI Telemetry:</strong> Connected to Sungrow OpenAPI via OAuth 2.0 token management, streaming real-time multi-inverter generation, DC/AC voltages, and grid status.</li>
            <li><strong>Local Database Architecture:</strong> Architected local SQLite time-series database storing minute-by-minute telemetry, inverter mappings, and grid fault histories.</li>
            <li><strong>Fleet PR Modeling:</strong> Computed scientific Fleet Performance Ratio (PR) modeled against dynamic solar irradiance curves while filtering out plant anomalies.</li>
            <li><strong>Gemini AI Integration:</strong> Prompt-engineered Google Gemini AI to analyze multi-point telemetry, diagnose anomalies, and compile executive HTML reports delivered daily at 20:00 via SMTP email.</li>
          </ul>

          <div class="tags">
            <span class="tag">Python</span>
            <span class="tag">REST API</span>
            <span class="tag">OAuth 2.0</span>
            <span class="tag">SQLite DB</span>
            <span class="tag">Google Gemini AI</span>
            <span class="tag">Solar Telemetry</span>
          </div>
        </article>

      </div>
    </section>
  </div>

  <!-- ==================== PAGE 4: EXPERIENCE & EDUCATION ==================== -->
  <div class="page-4-wrapper">
    <header class="nav">
      <a class="brand" href="https://efedemirerr.github.io">ED · efedemirerr.github.io</a>
      <div class="nav-tagline">EXPERIENCE &amp; EDUCATION</div>
    </header>

    <section style="padding: 0 0 6px 0;">
      <h2>Professional Engineering Experience</h2>

      <div class="exp-card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h3>Intern Engineer (RF &amp; Microwave Systems / Test Automation) · ASELSAN REHİS Test Centers Directorate</h3>
          <span class="date">06/2026 – 08/2026</span>
        </div>
        <p>Ankara, Turkey · Electronic Warfare &amp; Radar Test Centers Directorate · Anechoic Chamber &amp; Microwave Facilities</p>
        <ul>
          <li><strong>Planar Near-Field Antenna Scanning Automation:</strong> Developed automated Cartesian X-Y motion control routines and C# .NET Windows Forms GUIs for anechoic chamber antenna measurements.</li>
          <li><strong>VNA 2-Port Calibration &amp; Reference Extension:</strong> Performed full 2-port SOLT calibrations on Vector Network Analyzers, extending measurement reference planes to test cable ends.</li>
          <li><strong>RF Power Amplifier Characterization:</strong> Measured amplifier gain and executed P1dB 1-dB compression point tests to evaluate saturation behavior and maximum safe operating power.</li>
          <li><strong>Near-Field Chamber &amp; NRL Arch Testing:</strong> Conducted near-field anechoic chamber measurements and evaluated radar-absorbent material (RAM) reflectivity using NRL Arch testing.</li>
          <li><strong>Real-Time Spectrum Analyzer API &amp; Signal Sniffing:</strong> Integrated C/C++ API communication over Ethernet TCP/IPv4, implemented automated RBW tuning and a real-time peak detection algorithm (-70 dBm).</li>
          <li><strong>Hardware Interfacing &amp; Safety Interlocks:</strong> Configured Arduino Uno + CNC Shield V3 with GRBL firmware, driving stepper motors with 4x NC limit switch fail-safe cutoffs.</li>
        </ul>
      </div>

      <div class="exp-card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h3>Intern Engineer · OPA Mühendislik</h3>
          <span class="date">07/2025 – 08/2025 &amp; 08/2026 – 09/2026</span>
        </div>
        <p>İzmir, Turkey · High Voltage Facilities &amp; Solar PV Engineering</p>
        <ul>
          <li><strong>Solar PV Electrical Engineering:</strong> Prepared AutoCAD single-line diagrams, electrical layout projects, and production yield simulations using PVsyst and ETAP.</li>
          <li><strong>Testing &amp; Safety Inspections:</strong> Conducted earth grounding resistance measurements and residual current device (RCD) tripping tests under High Voltage Operating Responsibility.</li>
          <li><strong>Reactive Power Factor Compensation:</strong> Designed compensation panels, sized capacitor banks, and tuned reactive power relays to maintain zero reactive penalty.</li>
          <li><strong>EV Charging Infrastructure:</strong> Calculated cable sizing, voltage drop limits, and electrical panel protections for high-power commercial EV chargers.</li>
        </ul>
      </div>
    </section>

    <section style="padding: 2px 0 6px 0;">
      <h2>Education &amp; Academic Honors</h2>
      <div class="edu-grid">
        <div class="exp-card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <h3>Yaşar University – İzmir</h3>
            <span class="date">09/2022 – Present</span>
          </div>
          <p>B.Sc. in Electrical and Electronics Engineering · 100% Merit Scholarship · GPA: 3.73 / 4.00 (High Honor Standing)</p>
          <ul>
            <li><strong>Core RF &amp; Telecom Coursework:</strong> Antennas and Propagation (EEE 4340), Electromagnetic Field Theory, Microwave &amp; RF Measurement, Digital Communications, Signals and Systems.</li>
            <li><strong>Academic Honors:</strong> Ranked top in department with full merit scholarship across all academic semesters.</li>
          </ul>
        </div>

        <div class="exp-card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <h3>Cem Bakioğlu Anatolian High School</h3>
            <span class="date">09/2018 – 06/2022</span>
          </div>
          <p>High School Education · Salutatorian (Ranked 2nd in School) · Graduation Grade: 96.89 / 100</p>
          <ul>
            <li><strong>Academic Focus:</strong> Advanced Mathematics, Physics &amp; Analytical Problem Solving.</li>
            <li><strong>Science Honors:</strong> TÜBİTAK 4006 Science and Society Fair Project Lead.</li>
          </ul>
        </div>
      </div>
    </section>

    <section style="padding: 2px 0 0 0;">
      <h2>RF &amp; Defense Engineering Technical Competencies</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 7px;">
        <div class="exp-card" style="margin-bottom: 0; padding: 10px 12px;">
          <h3 style="font-size: 8.4pt; color: #38bdf8; margin-bottom: 4px;">📡 RF &amp; Microwave Testing</h3>
          <ul style="margin: 0 0 0 10px; font-size: 7.2pt; line-height: 1.28;">
            <li>VNA Full 2-Port SOLT Calibration</li>
            <li>Reference Plane Shifting to Cables</li>
            <li>Amplifier P1dB Compression Tests</li>
            <li>NRL Arch Radar Absorber Testing</li>
            <li>Anechoic Chamber Measurements</li>
          </ul>
        </div>
        <div class="exp-card" style="margin-bottom: 0; padding: 10px 12px;">
          <h3 style="font-size: 8.4pt; color: #38bdf8; margin-bottom: 4px;">⚙️ Motion &amp; Embedded Systems</h3>
          <ul style="margin: 0 0 0 10px; font-size: 7.2pt; line-height: 1.28;">
            <li>Planar Cartesian X-Y Motion Control</li>
            <li>Arduino Uno &amp; CNC Shield V3</li>
            <li>GRBL Firmware &amp; G-Code Automation</li>
            <li>4x NC Limit Switch Safety Loops</li>
            <li>Stepper Motor Driver Tuning</li>
          </ul>
        </div>
        <div class="exp-card" style="margin-bottom: 0; padding: 10px 12px;">
          <h3 style="font-size: 8.4pt; color: #38bdf8; margin-bottom: 4px;">💻 Instrumentation &amp; Software</h3>
          <ul style="margin: 0 0 0 10px; font-size: 7.2pt; line-height: 1.28;">
            <li>C# / .NET Windows Forms GUIs</li>
            <li>Ethernet TCP/IPv4 Socket Streaming</li>
            <li>Real-Time Peak Search (-70 dBm)</li>
            <li>Multi-Threaded BackgroundWorkers</li>
            <li>MATLAB Signal Processing &amp; DSP</li>
          </ul>
        </div>
      </div>
    </section>
  </div>

  <!-- ==================== PAGE 5: CREDENTIALS, REFERENCES & CONTACT ==================== -->
  <div class="page-5-wrapper">
    <header class="nav">
      <a class="brand" href="https://efedemirerr.github.io">ED · efedemirerr.github.io</a>
      <div class="nav-tagline">CREDENTIALS, REFERENCES &amp; CONTACT</div>
    </header>

    <section style="padding: 0 0 6px 0;">
      <div class="two">
        <div>
          <h2>Certifications &amp; Credentials</h2>
          <ul>
            <li><strong>National Technology Academy:</strong> Chip Design (Çip Tasarımı) Specialization Certificate (Code: 35867118094667) · Digital ASIC &amp; Semiconductor Design</li>
            <li><strong>ASELSAN:</strong> "a Yetenek" Engineering Internship Program Certificate of Completion (2026) · Defense RF Systems</li>
            <li><strong>ROKETSAN:</strong> LEVEL UP AI – Smart Object Detection and Tracking with YOLO (2026) · Edge AI</li>
            <li><strong>ROKETSAN:</strong> LEVEL UP AI – Autonomous AI Agent Development &amp; Document Assistants (2026)</li>
            <li><strong>TUSAŞ (TAI):</strong> LIFT UP Industry-Oriented Capstone Projects Program (2025) · Defense Capstone</li>
            <li><strong>Savunma Sanayii Akademi (SSB):</strong> Milli Yetkinlik Hamlesi Competency &amp; Career Summit (2026)</li>
            <li><strong>MathWorks:</strong> Core Signal Processing Techniques in MATLAB (Spectral Analysis, Filter Design)</li>
            <li><strong>MathWorks:</strong> Simulink Fundamentals (Model-Based Simulation) &amp; Simscape Physical Systems</li>
            <li><strong>MathWorks:</strong> Signal Processing Onramp &amp; MATLAB Onramp (2025)</li>
            <li><strong>TÜBİTAK:</strong> 4006 Science and Society Support Program Project Lead</li>
          </ul>
        </div>

        <div>
          <h2>Languages &amp; Industry Status</h2>
          <ul>
            <li><strong>Turkish:</strong> Native Proficiency</li>
            <li><strong>English:</strong> Professional Working Proficiency (B2 Upper-Intermediate, SFL Certified)</li>
            <li><strong>Driving License:</strong> Class B Active Driver</li>
            <li><strong>Military Service:</strong> Postponed until 31/12/2031</li>
            <li><strong>Safety Credentials:</strong> ASELSAN Occupational Health &amp; Safety (İSG) Certified</li>
            <li><strong>Internship Availability:</strong> 2027 Spring Semester (01.02.2027 – 22.05.2027), minimum 3 full days/week on-site</li>
          </ul>
          <div style="margin-top: 14px; padding: 12px 14px; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; font-size: 7.5pt; color: #cbd5e1; line-height: 1.4;">
            <strong style="color: #38bdf8;">Defense Industry Readiness:</strong> Fully cleared for high-frequency test laboratory and anechoic chamber environments with high-voltage and occupational safety compliance, adaptable to defense project sprints and on-site testing requirements.
          </div>
        </div>
      </div>
    </section>

    <section style="padding: 0 0 6px 0;">
      <h2>Professional References</h2>
      <div class="refs-grid">
        <div class="ref-card">
          <div class="ref-name">Prof. Dr. Mustafa SEÇMEN</div>
          <div class="ref-meta">Dean, Faculty of Engineering / Yaşar University · mustafa.secmen@yasar.edu.tr · +90 232 570 8232</div>
        </div>
        <div class="ref-card">
          <div class="ref-name">Dr. Ali Haluk NALBANTOĞLU</div>
          <div class="ref-meta">Faculty Member / Yaşar University, Former Director of Electronic Warfare at ASELSAN · haluk.nalbantoglu@yasar.edu.tr · +90 533 236 1399</div>
        </div>
        <div class="ref-card">
          <div class="ref-name">Hüseyin Talha ÇULHA</div>
          <div class="ref-meta">RF Test Engineer / ASELSAN REHİS · htalhaculha@aselsan.com · +90 531 950 4360</div>
        </div>
        <div class="ref-card">
          <div class="ref-name">Murat YALÇINKAYA</div>
          <div class="ref-meta">Systems Engineer / ASELSAN REHİS via EHSİM · yalcnkayam@gmail.com · +90 538 847 9001</div>
        </div>
        <div class="ref-card" style="grid-column: span 2;">
          <div class="ref-name">Onur İŞÇİ</div>
          <div class="ref-meta">Founder &amp; Electrical-Electronics Engineer / OPA Mühendislik · onur@opamuhendislik.com · +90 530 040 2821</div>
        </div>
      </div>
    </section>

    <section style="padding: 0;">
      <h2>Contact &amp; Digital Profiles</h2>
      <div class="contact">
        <a href="mailto:efedemirer.tr@gmail.com">
          <span><strong>Email:</strong> efedemirer.tr@gmail.com</span>
          <span style="color: #38bdf8; font-size: 7.5pt;">Direct Contact ↗</span>
        </a>
        <a href="https://linkedin.com/in/efe-demirer-aa7ba3252">
          <span><strong>LinkedIn:</strong> linkedin.com/in/efe-demirer-aa7ba3252</span>
          <span style="color: #38bdf8; font-size: 7.5pt;">Connect ↗</span>
        </a>
        <a href="https://github.com/efedemirerr">
          <span><strong>GitHub:</strong> github.com/efedemirerr</span>
          <span style="color: #38bdf8; font-size: 7.5pt;">Repositories ↗</span>
        </a>
        <a href="https://efedemirerr.github.io">
          <span><strong>Live Portfolio:</strong> efedemirerr.github.io</span>
          <span style="color: #38bdf8; font-size: 7.5pt;">Visit Site ↗</span>
        </a>
      </div>
      <div class="portfolio-statement-card">
        <strong>Academic &amp; Technical Verification:</strong> This portfolio represents verified engineering coursework, defense laboratory internships at ASELSAN REHİS Test Centers Directorate, and original technical implementations engineered by Efe Demirer. All measurement datasets, GUI software, and DSP simulation models are available for technical demonstration upon request.
      </div>
    </section>
  </div>
"""

# ==============================================================================
# 5. JAVASCRIPT FOR PAGE 1 SKILLS ONLY
# ==============================================================================
scripts_section = """
  <script src="data.js"></script>
  <script>
    const data = window.SITE;

    function esc(s) {
      return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    const sEl = document.getElementById('page-1-skills');
    if (data.featured) {
      const featuredCard = document.createElement('div');
      featuredCard.className = 'card animated-frame featured-card';
      featuredCard.innerHTML = `
        <h3>${esc(data.featured.title)}</h3>
        <div class="featured-stats">
          ${data.featured.stats.map(s => `<span class="stat-pill">${esc(s)}</span>`).join('')}
        </div>
        <div class="tags" style="margin-top: 8px;">
          ${data.featured.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}
        </div>
      `;
      sEl.appendChild(featuredCard);
    }
    (data.skills || []).forEach(g => {
      const d = document.createElement('div');
      d.className = 'card';
      d.innerHTML = `<h3>${esc(g.group)}</h3><div class="tags">${(g.items || []).map(i => `<span class="tag">${esc(i)}</span>`).join('')}</div>`;
      sEl.appendChild(d);
    });
  </script>
"""

# Build 5-page Portfolio
html_5p = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Efe Demirer – RF & Microwave Portfolio</title>
  <style>
{css_content}
{print_css}
  </style>
</head>
<body>
{body_5pages}
{scripts_section}
</body>
</html>"""

with open('temp_port_5p.html', 'w', encoding='utf-8') as f:
    f.write(html_5p)

out_port_5p = os.path.abspath('Efe_Demirer_Portfolio.pdf')
cmd_port_5p = [edge_path, '--headless', '--disable-gpu', '--no-pdf-header-footer', f'--print-to-pdf={out_port_5p}', os.path.abspath('temp_port_5p.html')]
subprocess.run(cmd_port_5p, check=True)
print('Efe_Demirer_Portfolio.pdf generated!')

# Build 6-page Cover Letter + Portfolio
html_6p = f"""<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>Efe Demirer – RF ve Mikrodalga Ön Yazı ve Portfolyo</title>
  <style>
{css_content}
{print_css}
  </style>
</head>
<body>
{cover_letter_section}
{body_5pages}
{scripts_section}
</body>
</html>"""

with open('temp_port_6p.html', 'w', encoding='utf-8') as f:
    f.write(html_6p)

out_port_6p = os.path.abspath('Efe_Demirer_Portfolyo_ve_On_Yazi.pdf')
cmd_port_6p = [edge_path, '--headless', '--disable-gpu', '--no-pdf-header-footer', f'--print-to-pdf={out_port_6p}', os.path.abspath('temp_port_6p.html')]
subprocess.run(cmd_port_6p, check=True)
print('Efe_Demirer_Portfolyo_ve_On_Yazi.pdf generated!')

# Clean up temporary html
for tmp in ['temp_cv.html', 'temp_port_5p.html', 'temp_port_6p.html']:
    if os.path.exists(tmp): os.remove(tmp)

# Post-process with PyMuPDF to optimize stream compression and eliminate slow rendering
for pdf_name in ['Efe_Demirer_Portfolio.pdf', 'Efe_Demirer_Portfolyo_ve_On_Yazi.pdf']:
    if os.path.exists(pdf_name):
        doc = pymupdf.open(pdf_name)
        tmp_opt = pdf_name + '.tmp'
        doc.save(tmp_opt, garbage=4, deflate=True, clean=True)
        doc.close()
        os.replace(tmp_opt, pdf_name)
        print(f'Optimized {pdf_name} for high-speed rendering!')

print('Checking page counts, content bounds, and empty bottom spaces:')
for pdf_name in ['Efe_Demirer_Portfolio.pdf', 'Efe_Demirer_Portfolyo_ve_On_Yazi.pdf']:
    doc = pymupdf.open(pdf_name)
    size_mb = os.path.getsize(pdf_name) / (1024 * 1024)
    print(f'\\n=== {pdf_name} ({len(doc)} pages, {size_mb:.2f} MB) ===')
    for i, page in enumerate(doc):
        rects = page.get_text('blocks')
        max_y = max(b[3] for b in rects) if rects else 0
        empty_bottom = page.rect.height - max_y
        print(f'  Page {i+1}: height = {page.rect.height:.1f}, content max_y = {max_y:.1f}, empty_bottom = {empty_bottom:.1f}')
