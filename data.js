// Portfolio content for Efe Demirer — every section of the site is rendered from this file.
window.SITE = {
  name: "Efe Demirer",
  role: "RF & microwave systems engineering candidate",
  focus: "Antenna measurement, test automation and instrument control",
  summary:
    "Senior Electrical and Electronics Engineering student at Yaşar University. At ASELSAN REHİS I built the software and motion control behind a planar near-field antenna scanner, automated a real-time spectrum analyzer over Ethernet and characterized RF components on vector network analyzers. At OPA Mühendislik I design solar PV plants and wrote SolarOPA, the platform that monitors their live fleet.",
  location: "İzmir, Turkey",
  photo: "assets/img/efe-demirer.jpg",

  contact: {
    email: "efedemirer.tr@gmail.com",
    linkedin: "https://www.linkedin.com/in/efe-demirer-aa7ba3252",
    github: "https://github.com/efedemirerr"
  },

  documents: [
    { label: "CV (English)", href: "assets/Efe_Demirer_CV.pdf", primary: true },
    { label: "CV (Türkçe)", href: "assets/Efe_Demirer_CV_TR.pdf" },
    { label: "Portfolio PDF", href: "assets/Efe_Demirer_Portfolio.pdf" }
  ],

  // Hero instrument: each marker is one area of work, linked to the project that shows it.
  markers: [
    { label: "Antenna scanning", detail: "Planar near-field X-Y scanner", project: "cnc-scanner", pos: 0.18, level: 0.78 },
    { label: "Spectrum automation", detail: "Ethernet API control and peak search", project: "spectrum-api", pos: 0.42, level: 0.92 },
    { label: "Acoustic link DSP", detail: "18–22 kHz BFSK modem in MATLAB", project: "ultrasonic", pos: 0.63, level: 0.66 },
    { label: "Solar fleet telemetry", detail: "5 brands in one live panel", project: "solaropa", pos: 0.84, level: 0.84 }
  ],

  facts: [
    { value: "3.73", label: "GPA out of 4.00, 100% merit scholarship" },
    { value: "ASELSAN", label: "REHİS Test Centers Directorate, 2026" },
    { value: "14", label: "solar plants monitored live by SolarOPA" },
    { value: "24", label: "certificates from defence industry, government and MathWorks" }
  ],

  projects: [
    {
      id: "solaropa",
      title: "SolarOPA",
      subtitle: "Multi-brand solar fleet monitoring platform",
      org: "OPA Mühendislik",
      period: "2025 – 2026",
      role: "Sole developer, in production",
      short: "One live panel for a 14-plant commercial solar fleet built on five different inverter and storage brands, with alarms, AI reports and secure remote viewing.",
      summary:
        "OPA Mühendislik's plants run on Victron, Fronius, Sungrow, SOLARMAN and Sigenergy equipment, and each brand had its own app. SolarOPA pulls all of them into one normalized data model and turns it into a live operations panel, a TV alarm wall, e-mail and Telegram alerts, a one-page daily AI fleet report and a read-only view the office can open from anywhere.",
      metrics: [
        { value: "5", label: "brand APIs unified" },
        { value: "1 min", label: "monitoring cycle" },
        { value: "10 s", label: "panel refresh" },
        { value: "49/49", label: "security tests passing" }
      ],
      bullets: [
        "<strong>Provider registry.</strong> Victron VRM (REST), Fronius Solar.web (Query API plus an authenticated portal session with automatic re-login), Sungrow iSolarCloud (OAuth 2.0 with token refresh), SOLARMAN Business (multi-account sessions with rotating JWT refresh) and Sigenergy OpenAPI sit behind one metric model with unified sign conventions for PV, load, grid and battery.",
        "<strong>Live energy-flow dashboard.</strong> Flask panel with an isometric flow card per plant whose animated lines show the real direction and size of each power flow, a fleet-total view, KPIs including fleet specific yield (kWh/kWp) and hourly production charts.",
        "<strong>Alarm engine.</strong> Device faults, low battery and lost data links are detected every minute across all brands. Link losses show on screen instantly but are e-mailed only if they last 5 minutes, followed by a recovery notice with the outage duration.",
        "<strong>TV alarm wall.</strong> A menu-less full-screen view fits every plant on the office TV. A new alarm flashes for 60 seconds with a siren, then stays written on the affected plant's card.",
        "<strong>Gemini AI reporting.</strong> A one-page daily fleet summary with at most three action items, plus weekly and monthly reports. The scheduler marks a report sent only after delivery, retries failures and catches up after restarts.",
        "<strong>Secure remote access.</strong> Cloudflare Tunnel publishes the panel over HTTPS with no open ports. Viewers need a single-use invite and explicit admin approval, and the read-only role is enforced on the server: settings, integrations and secrets return 403.",
        "<strong>Operations tooling.</strong> Maintenance planner, hardware inventory with live device values, mobile layout, one-click Windows installer and migration package, and a narrated product demo for the client."
      ],
      stack: ["Python", "Flask", "SQLite", "REST and OAuth 2.0", "Google Gemini", "Cloudflare Tunnel", "JavaScript", "SVG animation", "Playwright", "SMTP and Telegram"],
      video: "assets_opt/solaropa-live.mp4",
      poster: "assets_opt/solaropa-live-poster.jpg",
      cover: "assets_opt/solaropa-operations.jpg",
      gallery: [
        { src: "assets_opt/solaropa-operations.jpg", caption: "Operations centre: one energy-flow card per plant, refreshed every 10 seconds." },
        { src: "assets_opt/solaropa-flow-card.jpg", caption: "A single plant: the dashes move in the direction power is actually flowing." },
        { src: "assets_opt/solaropa-fleet-flow.jpg", caption: "Fleet-total flow, with tabs to focus on any plant." },
        { src: "assets_opt/solaropa-kpis-alarms.jpg", caption: "KPI row; hovering the alarm card lists which plant raised what." },
        { src: "assets_opt/solaropa-tv-wall.jpg", caption: "TV wall: every plant on one screen, no menus." },
        { src: "assets_opt/solaropa-tv-alarm.jpg", caption: "A new alarm takes over the TV for 60 seconds, with a siren." },
        { src: "assets_opt/solaropa-alarm-center.jpg", caption: "30-day event log merging every brand's own alarms with SolarOPA's detections." },
        { src: "assets_opt/solaropa-integrations.jpg", caption: "Live health of every integration, with a connection test per card." },
        { src: "assets_opt/solaropa-settings.jpg", caption: "Settings: every switch is wired to real behaviour; saved secrets are never shown again." },
        { src: "assets_opt/solaropa-remote-access.jpg", caption: "Remote access: tunnel status, invite links and the approval list." },
        { src: "assets_opt/solaropa-viewer-readonly.jpg", caption: "An approved viewer is read-only; the server rejects every settings call." },
        { src: "assets_opt/solaropa-daily-email.jpg", caption: "One-page daily fleet report written with Gemini." },
        { src: "assets_opt/solaropa-maintenance.jpg", caption: "Maintenance and service planner." },
        { src: "assets_opt/solaropa-inventory.jpg", caption: "Hardware inventory with live values per device." },
        { src: "assets_opt/solaropa-mobile.jpg", caption: "Phone layout of the panel, menu and TV view." },
        { src: "assets/img/projects/solaropa-architecture.svg", caption: "Architecture: five data sources, one engine, five outputs." }
      ],
      note: "Plant names in the screenshots are anonymized and the values come from a demo dataset."
    },
    {
      id: "cnc-scanner",
      title: "Planar near-field antenna scanner",
      subtitle: "Automated X-Y scanning system and control GUI",
      org: "ASELSAN REHİS Test Centers Directorate",
      period: "Summer 2026",
      role: "Software and motion control",
      short: "Cartesian X-Y positioner that moves a probe over a planned grid in front of the antenna under test, with hardware safety interlocks and a C# control GUI.",
      summary:
        "Planar near-field measurements need the probe placed at hundreds of precise grid points in front of the antenna. I built the control side: a Windows Forms application that plans the scan grid, streams G-code to a GRBL controller and keeps the operator in control while the scan runs.",
      metrics: [
        { value: "115200", label: "baud serial link to GRBL" },
        { value: "4", label: "NC limit switches" },
        { value: "G90/G91", label: "absolute and relative moves" }
      ],
      bullets: [
        "<strong>Hardware and motion control.</strong> PC to Arduino Uno and CNC Shield V3 running GRBL firmware over an asynchronous serial port, driving the X and Y stepper motors.",
        "<strong>G-code generation.</strong> Real-time G-code streams (G90, G91, G92, G1) generated from a scan grid centred on the antenna, with configurable width, height and step sizes.",
        "<strong>Safety interlocks.</strong> Four normally-closed limit switches stop the motors in hardware and put GRBL into alarm mode; unlock and homing are explicit operator actions.",
        "<strong>Responsive GUI.</strong> Scans run on BackgroundWorker threads so the interface never freezes, with a live bitmap of scanned points and feed-rate-calibrated dwell at each point."
      ],
      stack: ["C#", ".NET Windows Forms", "GRBL", "G-code", "Arduino", "Serial (RS-232)", "Stepper motors"],
      cover: "assets_opt/cnc-scanner-chassis.jpg",
      gallery: [
        { src: "assets_opt/cnc-scanner-chassis.jpg", caption: "X-Y scanner frame carrying the probe." },
        { src: "assets_opt/cnc-limit-switches.jpg", caption: "The four limit switch positions on the axes." },
        { src: "assets_opt/cnc-hardware-shield.jpg", caption: "Arduino Uno, CNC Shield V3, stepper drivers and limit switch wiring." },
        { src: "assets_opt/cnc-scan-area.jpg", caption: "Scan grid: width, height and step sizes around the centred origin." },
        { src: "assets_opt/cnc-scanner-gui.jpg", caption: "Control GUI: connection, jogging, scan planning and run controls." },
        { src: "assets_opt/cnc-grid-algorithm.jpg", caption: "Scan planning and progress view." }
      ]
    },
    {
      id: "spectrum-api",
      title: "Real-time spectrum analyzer control",
      subtitle: "Instrument API integration and custom GUI",
      org: "ASELSAN REHİS Test Centers Directorate",
      period: "Summer 2026",
      role: "Instrument software",
      short: "C# application that drives a real-time spectrum analyzer through the manufacturer's native API over Ethernet and finds carrier peaks above the noise floor automatically.",
      summary:
        "The lab needed to configure the analyzer and pull marker data from its own tools instead of the vendor software. I wrote a desktop application on top of the manufacturer's C/C++ API that manages the connection, sets the sweep and runs a peak search, then validated its results against the vendor software.",
      metrics: [
        { value: "TCP/IPv4", label: "Ethernet control on port 5000" },
        { value: "−70 dBm", label: "calibrated noise floor threshold" },
        { value: "Auto", label: "RBW selection from span" }
      ],
      bullets: [
        "<strong>Native API integration.</strong> Connection management through the vendor C/C++ API over Ethernet, with IP validation and a persistent device session.",
        "<strong>Sweep configuration.</strong> Start/stop or centre/span entry with automatic resolution bandwidth tuning.",
        "<strong>Peak search.</strong> Real-time detection of carriers above the calibrated noise floor to separate real signals from ambient RF noise, listed with frequency and power.",
        "<strong>Validation.</strong> Results compared marker by marker against the manufacturer's reference software in the defence test environment."
      ],
      stack: ["C#", ".NET", "Vendor C/C++ API", "Ethernet TCP/IP", "Signal processing"],
      cover: "assets_opt/spectrum-reference-trace.jpg",
      gallery: [
        { src: "assets_opt/spectrum-custom-gui.jpg", caption: "Peak search results: frequency and power of each detected carrier." },
        { src: "assets_opt/spectrum-api-arch.jpg", caption: "Connection to the analyzer over Ethernet." },
        { src: "assets_opt/spectrum-params-gui.jpg", caption: "Sweep parameters sent to the instrument." },
        { src: "assets_opt/spectrum-reference-trace.jpg", caption: "Reference trace in the vendor software, used for validation." }
      ]
    },
    {
      id: "ultrasonic",
      title: "Ultrasonic ticketing system",
      subtitle: "Offline access control over an inaudible acoustic link",
      org: "Yaşar University",
      period: "2026",
      role: "Telecommunications project",
      short: "A phone speaker sends an access token to a turnstile microphone at 18–22 kHz, with no internet, NFC or QR scanning involved.",
      summary:
        "QR-based gates slow down at peak times and fail without connectivity. This project designs a near-ultrasound link that ordinary phone speakers and microphones can carry, and simulates it end to end in MATLAB, from token bits to the bit error rate at the receiver.",
      metrics: [
        { value: "18–22 kHz", label: "inaudible band" },
        { value: "BFSK", label: "modulation" },
        { value: "16-bit", label: "token with parity" }
      ],
      bullets: [
        "<strong>Token and framing.</strong> User and station IDs packed into a 16-bit token, framed with a Barker sequence for synchronisation and a parity bit.",
        "<strong>Modulation.</strong> Binary frequency-shift keying between two tones inside the 18–22 kHz band, inaudible to people but within phone hardware limits.",
        "<strong>Channel model.</strong> Two-ray multipath, coloured ambient noise, transducer band limits and Doppler shift from a moving user.",
        "<strong>Receiver and results.</strong> Quadrature mixing, envelope detection, Barker correlation and parity checks, evaluated with bit error rate against SNR."
      ],
      stack: ["MATLAB", "Digital communications", "BFSK", "DSP", "Channel modelling"],
      cover: "assets_opt/ultrasonic-system-arch.jpg",
      gallery: [
        { src: "assets_opt/ultrasonic-system-arch.jpg", caption: "Concept: the phone transmits, the turnstile listens." },
        { src: "assets_opt/ultrasonic-bfsk-waveform.jpg", caption: "Input bitstream before modulation." },
        { src: "assets_opt/ultrasonic-dsp-receiver.jpg", caption: "Receiver stages: noisy signal, filtered envelopes, decision signal." },
        { src: "assets_opt/ultrasonic-ber-waterfall.jpg", caption: "Bit error rate against SNR for the full simulated link." }
      ]
    }
  ],

  experience: [
    {
      role: "Engineering intern, RF and microwave test",
      org: "ASELSAN REHİS Test Centers Directorate",
      period: "Jun – Aug 2026",
      location: "Ankara",
      bullets: [
        "Built the X-Y scanning automation and C# GUI for a planar near-field antenna test system.",
        "Wrote an Ethernet API application for a real-time spectrum analyzer with automatic RBW and peak search.",
        "Ran VNA full two-port calibrations with reference planes moved to the cable ends, characterized RF components and measured amplifier gain and P1dB compression.",
        "Took part in near-field anechoic chamber measurements and NRL arch testing of radar-absorbent materials."
      ]
    },
    {
      role: "Engineering intern, solar PV and power",
      org: "OPA Mühendislik",
      period: "Jul – Aug 2025 and Aug – Sep 2026",
      location: "İzmir",
      bullets: [
        "Drew solar PV electrical projects and single-line diagrams in AutoCAD and ran yield simulations in PVsyst and ETAP.",
        "Designed reactive power compensation panels, sized capacitor banks and configured control relays.",
        "Measured grounding resistance, verified residual current devices and joined periodic substation inspections.",
        "Supported load calculations, cable sizing and installation of EV chargers and battery storage; developed SolarOPA for the company's plant fleet."
      ]
    }
  ],

  education: [
    {
      school: "Yaşar University",
      degree: "B.Sc. Electrical and Electronics Engineering",
      period: "2022 – present",
      location: "İzmir",
      detail: "GPA 3.73 / 4.00, 100% merit scholarship. Coursework: Antennas and Propagation, Electromagnetic Field Theory, Microwave and RF Measurement, Digital Communications, Signals and Systems."
    },
    {
      school: "Cem Bakioğlu Anatolian High School",
      degree: "High school diploma",
      period: "2018 – 2022",
      location: "İzmir",
      detail: "Graduated second in school with 96.89 / 100."
    }
  ],

  skills: [
    { group: "RF and microwave", items: ["Antennas and propagation", "VNA two-port calibration", "S-parameters and matching", "P1dB compression testing", "Real-time spectrum analysis", "Near-field chamber testing", "NRL arch absorber testing"] },
    { group: "Test automation and software", items: ["C# and .NET Windows Forms", "Python and Flask", "Instrument APIs and SCPI", "Serial and Ethernet TCP/IP", "SQLite", "MATLAB"] },
    { group: "Motion and embedded hardware", items: ["X-Y Cartesian positioners", "Stepper motor drives", "GRBL and G-code", "Limit switch interlocks", "Arduino and STM32"] },
    { group: "Power and energy", items: ["Solar PV design", "PVsyst", "ETAP", "AutoCAD single-line diagrams", "Reactive power compensation", "Grounding and RCD testing"] },
    { group: "Simulation and tools", items: ["Simulink and Simscape", "LTspice", "Proteus", "Git and GitHub", "Visual Studio"] }
  ],

  certifications: [
    { issuer: "Defence industry", items: [
      { title: "ASELSAN 'a Yetenek' summer internship programme", date: "Jun – Aug 2026", href: "assets/certificates/aselsan-a-yetenek-internship-2026.pdf", thumb: "assets/certificates/thumbs/aselsan-a-yetenek-internship-2026.jpg" },
      { title: "ASELSAN occupational health and safety training, 12 hours", date: "Jun 2026", href: "assets/certificates/aselsan-occupational-safety-2026.pdf", thumb: "assets/certificates/thumbs/aselsan-occupational-safety-2026.jpg" },
      { title: "ROKETSAN LEVEL UP AI: object detection and tracking with YOLO", date: "Aug 2026", href: "assets/certificates/roketsan-level-up-ai-yolo-2026.pdf", thumb: "assets/certificates/thumbs/roketsan-level-up-ai-yolo-2026.jpg" },
      { title: "ROKETSAN LEVEL UP AI: AI agents and document assistants", date: "Aug 2026", href: "assets/certificates/roketsan-level-up-ai-agents-2026.pdf", thumb: "assets/certificates/thumbs/roketsan-level-up-ai-agents-2026.jpg" },
      { title: "TUSAŞ LIFT UP industry-oriented capstone projects conference", date: "2024 – 2025", href: "assets/certificates/tusas-lift-up-2025.pdf", thumb: "assets/certificates/thumbs/tusas-lift-up-2025.jpg" },
      { title: "Savunma Sanayii Akademi, Career and Competency Meetings 3", date: "Mar 2026", href: "assets/certificates/ssa-kariyer-yetkinlik-2026.pdf", thumb: "assets/certificates/thumbs/ssa-kariyer-yetkinlik-2026.jpg" },
      { title: "Savunma Sanayii Akademi, Career and Competency Meetings 1", date: "Dec 2024", href: "assets/certificates/ssa-kariyer-yetkinlik-2024.pdf", thumb: "assets/certificates/thumbs/ssa-kariyer-yetkinlik-2024.jpg" }
    ] },
    { issuer: "Government and research", items: [
      { title: "Chip design specialisation programme, National Technology Move, 10 sessions", date: "Jan – Feb 2026", href: "assets/certificates/chip-design-specialization-2026.pdf", thumb: "assets/certificates/thumbs/chip-design-specialization-2026.jpg" },
      { title: "TÜBİTAK 4006 science fair, student research project", date: "2017 – 2018", href: "assets/certificates/tubitak-4006-science-fair.pdf", thumb: "assets/certificates/thumbs/tubitak-4006-science-fair.jpg" }
    ] },
    { issuer: "MathWorks", list: true, items: [
      { title: "Core Signal Processing Techniques in MATLAB, learning path", date: "Dec 2025", href: "assets/certificates/mathworks/core-signal-processing-techniques-in-matlab.pdf" },
      { title: "Core MATLAB Skills, learning path", date: "Mar 2026", href: "assets/certificates/mathworks/core-matlab-skills.pdf" },
      { title: "Simulink Fundamentals", date: "Feb 2026", href: "assets/certificates/mathworks/simulink-fundamentals.pdf" },
      { title: "Simscape Onramp", date: "Feb 2026", href: "assets/certificates/mathworks/simscape-onramp.pdf" },
      { title: "Spectral Analysis Techniques", date: "Dec 2025", href: "assets/certificates/mathworks/spectral-analysis-techniques.pdf" },
      { title: "Time-Frequency Analysis", date: "Dec 2025", href: "assets/certificates/mathworks/time-frequency-analysis.pdf" },
      { title: "Filter Design and Analysis Methods", date: "Dec 2025", href: "assets/certificates/mathworks/filter-design-and-analysis-methods.pdf" },
      { title: "Signal Generation and Resampling", date: "Dec 2025", href: "assets/certificates/mathworks/signal-generation-and-resampling.pdf" },
      { title: "MATLAB Desktop Tools and Troubleshooting Scripts", date: "Mar 2026", href: "assets/certificates/mathworks/matlab-desktop-tools-and-troubleshooting-scripts.pdf" },
      { title: "Calculations with Vectors and Matrices", date: "Feb 2026", href: "assets/certificates/mathworks/calculations-with-vectors-and-matrices.pdf" },
      { title: "Make and Manipulate Matrices", date: "Feb 2026", href: "assets/certificates/mathworks/make-and-manipulate-matrices.pdf" },
      { title: "Explore Data with MATLAB Plots", date: "Feb 2026", href: "assets/certificates/mathworks/explore-data-with-matlab-plots.pdf" },
      { title: "Simulink Onramp", date: "Dec 2025", href: "assets/certificates/mathworks/simulink-onramp.pdf" },
      { title: "Signal Processing Onramp", date: "Nov 2025", href: "assets/certificates/mathworks/signal-processing-onramp.pdf" },
      { title: "MATLAB Onramp", date: "Oct 2025", href: "assets/certificates/mathworks/matlab-onramp.pdf" }
    ] }
  ],

  languages: [
    { name: "Turkish", level: "Native" },
    { name: "English", level: "B2, professional working proficiency" }
  ]
};
