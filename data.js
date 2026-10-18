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
      subtitle: "EFEscan: one-click automated X-Y scanning with fail-safe limits",
      org: "ASELSAN REHİS Test Centers Directorate",
      period: "Summer 2026",
      role: "Hardware safety, motion control and GUI",
      short: "Turned a hand-jogged X-Y antenna test rig into a one-click automated scanner: a C# GUI plans the grid and streams G-code to GRBL, and four fail-safe limit switches protect the hardware.",
      summary:
        "The Test Centre's planar scanning rig was driven one jog command at a time from a terminal, so a structured scan of many points took hours of operator attention and was easy to get wrong. I first added hardware protection against over-travel, then wrote EFEscan, a Windows Forms application that runs the complete scan from a single action and lets the operator change the area and resolution without touching code.",
      metrics: [
        { value: "1", label: "operator action per full scan" },
        { value: "64", label: "points in a 280 × 280 mm scan at 40 mm steps" },
        { value: "4", label: "fail-safe NC limit switches" },
        { value: "115200", label: "baud serial link to GRBL" }
      ],
      bullets: [
        "<strong>Safety before software.</strong> A risk review found that nothing stopped a carriage at the end of its rail; an over-travel at full torque could bend a rail, strip a coupling or break the probe mount. I specified, soldered and mounted four limit switches at ±X and ±Y and enabled GRBL hard limits.",
        "<strong>Fail-safe wiring.</strong> The switches are wired normally closed, so a broken wire looks exactly like a limit hit and raises an ALARM at once instead of hiding until a real crash. Motion resumes only after a deliberate two-step unlock: soft reset (0x18), then $X.",
        "<strong>Hardware and protocol.</strong> Arduino Uno with GRBL v1.1, CNC Shield V3, two bipolar steppers and a 15 V supply, driven over USB serial at 115200 baud (8N1) with text G-code (G90, G91, G1, G92) and GRBL's “ok” acknowledgements.",
        "<strong>Centre-focused grid.</strong> The operator jogs the probe over the antenna centre and sets it as origin (G92 X0 Y0). Points are generated symmetrically around it, and the total, (W/ΔX + 1) × (H/ΔY + 1), is shown before the run so its duration can be estimated.",
        "<strong>Boustrophedon route.</strong> The X direction alternates on every row to avoid return travel. Each point is one G90 G1 move, and the next is sent only after GRBL answers “ok”.",
        "<strong>Operator stays in control.</strong> Live progress counter, pause and resume from the last completed point, reset to origin without losing the reference, and a START button that stays locked until the port is connected, GRBL is unlocked, inputs are validated against axis travel and the origin is set. Scans run on a background worker so the interface never freezes."
      ],
      stack: ["C#", ".NET Windows Forms", "GRBL v1.1", "G-code", "Arduino Uno", "CNC Shield V3", "Serial (USB, 8N1)", "Stepper motors"],
      cover: "assets_opt/cnc-scanner-chassis.jpg",
      gallery: [
        { src: "assets_opt/cnc-scanner-chassis.jpg", caption: "X-Y frame: Y carriage on the main frame, X carriage on the cross-member, probe mount facing down." },
        { src: "assets_opt/cnc-limit-switches.jpg", caption: "The four normally-closed limit switches at the ends of the X and Y travel." },
        { src: "assets_opt/cnc-hardware-shield.jpg", caption: "15 V supply, Arduino Uno with CNC Shield V3, stepper wiring and limit switch wiring." },
        { src: "assets_opt/cnc-scan-area.jpg", caption: "Centre-focused boustrophedon path: origin at the antenna centre, direction alternating on each row." },
        { src: "assets_opt/cnc-scanner-gui.jpg", caption: "EFEscan: communication, jog and scan sections, with unlock ($X) and home ($H)." },
        { src: "assets_opt/cnc-grid-algorithm.jpg", caption: "Set to 280 × 280 mm at 40 mm steps: 64 points calculated before the run." }
      ]
    },
    {
      id: "spectrum-api",
      title: "Real-time spectrum analyzer control",
      subtitle: "Ethernet control of a Harogic NXN-400 with automatic peak search",
      org: "ASELSAN REHİS Test Centers Directorate",
      period: "Summer 2026",
      role: "Instrument software",
      short: "C# application that configures a Harogic NXN-400 real-time spectrum analyzer over Ethernet through its HtraApi library and lists every carrier above the noise floor, validated against the instrument's own markers.",
      summary:
        "Reading signals off the analyzer meant placing markers by hand in the vendor software. I wrote a desktop tool that connects to the instrument over Ethernet, sends a validated sweep in one call and runs a peak search on the returned trace, then checked it against the instrument's built-in markers on a 300 MHz – 4 GHz measurement. The lab later used the same peak search in its RF absorber arch tests.",
      metrics: [
        { value: "12", label: "carriers found between 300 MHz and 4 GHz" },
        { value: "−70 dBm", label: "noise floor threshold, set from lab background" },
        { value: "1 call", label: "to send a validated sweep" },
        { value: "Port 5000", label: "Ethernet control over IPv4" }
      ],
      bullets: [
        "<strong>Connection.</strong> The operator enters the analyzer's IP address; the app validates it, sets the HtraApi boot profile to port 5000 and IPv4, opens a session with Device_Open and shows the device model. A failure shows the API error code and what to check.",
        "<strong>Debugging the link.</strong> The first connection failed silently. With a static IP on the host adapter in the instrument's subnet, ping tests and the API documentation, I traced it to a wrong port in the boot profile.",
        "<strong>Parameter management.</strong> Start, stop, centre and span, automatic or manual RBW and the noise floor are checked (start below stop, floor negative in dBm) and sent to the instrument in a single call.",
        "<strong>Peak search.</strong> A trace point is reported only if it is above the noise floor and a local maximum, with a minimum bin separation so the shoulders of a wide signal are not counted as extra peaks.",
        "<strong>Responsive interface.</strong> Network transfers use async/await, so the GUI stays usable during long sweep downloads.",
        "<strong>Validation and use.</strong> Peak frequencies matched the instrument's own markers within the resolution bandwidth, with no false peaks from ambient noise. In arch tests the tool picked out the dominant reflected component automatically instead of manual marker placement."
      ],
      stack: ["C#", ".NET Windows Forms", "HtraApi (vendor C/C++ API)", "Ethernet TCP/IP", "async/await", "Peak detection"],
      cover: "assets_opt/spectrum-reference-trace.jpg",
      gallery: [
        { src: "assets_opt/spectrum-custom-gui.jpg", caption: "Peak search over 300 MHz – 4 GHz: 12 carriers listed, the strongest at 1876.855 MHz." },
        { src: "assets_opt/spectrum-api-arch.jpg", caption: "Connected over Ethernet: the log confirms the session and device model (serial number hidden)." },
        { src: "assets_opt/spectrum-params-gui.jpg", caption: "Sweep parameters validated and sent to the instrument in one call." },
        { src: "assets_opt/spectrum-reference-trace.jpg", caption: "The analyzer's own markers for the same band, used to validate the GUI." }
      ]
    },
    {
      id: "ultrasonic",
      title: "Ultrasonic ticketing system",
      subtitle: "Offline access control over an inaudible acoustic link",
      org: "Yaşar University, EEE 3524 Telecommunications",
      period: "Spring 2026",
      role: "Individual term project",
      short: "A phone speaker sends a 16-bit access token to a turnstile microphone at 18–22 kHz, with no internet, NFC or QR scanning. Simulated end to end in MATLAB, the link keeps bit errors under 1% down to −16 dB SNR.",
      summary:
        "QR gates at busy stations, such as İzmir's metro, İZBAN and ferry turnstiles, slow down when a code won't scan in sunlight or the network drops, and NFC is not on every phone. This project designs a software-defined acoustic modem that needs only the speaker and microphone every phone already has, and tests it in MATLAB against the conditions of a real station: speaker roll-off, train noise, echoes and a walking user.",
      metrics: [
        { value: "−16 dB", label: "lowest SNR with BER under 1%" },
        { value: "0.75%", label: "BER at −16 dB, 3,200 bits per point" },
        { value: "1.5 m/s", label: "walking-speed Doppler tolerated" },
        { value: "38 bits", label: "per frame, 1.52 s at 25 bit/s" }
      ],
      bullets: [
        "<strong>Token.</strong> A 10-bit user ID (1,024 users) and a 6-bit station ID (64 gates) are bit-packed into a fixed 16-bit payload, a quarter of what ASCII or 32-bit integers would need, with every field at a fixed position.",
        "<strong>Frame.</strong> 8-bit 10101010 preamble for microphone settling, 13-bit Barker sync word, the 16-bit payload and an even parity bit: 38 bits in all.",
        "<strong>Modulation.</strong> BFSK at 18.5 kHz for 0 and 19.5 kHz for 1, 40 ms symbols at 48 kHz sampling, about 25 bit/s. The 1 kHz spacing keeps the tones orthogonal and is far wider than the roughly 85 Hz Doppler shift of a walking user; 40 ms lets echoes die out before the next bit.",
        "<strong>Station channel.</strong> 6th-order Butterworth 18–22 kHz band-pass for speaker and microphone roll-off, AWGN plus 10–20 kHz coloured train noise, a two-ray echo (β = 0.4, 5 ms) and Doppler applied as time scaling with spline interpolation.",
        "<strong>Receiver.</strong> Non-coherent I/Q mixing at both tones, a one-bit moving average as matched filter before squaring, mark-minus-space envelope decision, Barker cross-correlation for timing, mid-symbol sampling, parity check and token unpacking.",
        "<strong>Results.</strong> Monte Carlo sweep from −20 to +20 dB with 200 packets per point: no errors at +20 dB, 0.25% at 0 dB, 0.28% at −10 dB and 0.75% at −16 dB, where the noise is 40 times stronger than the signal. The link breaks down at −20 dB (17%).",
        "<strong>Next steps identified.</strong> Reed-Solomon or Hamming codes instead of parity, continuous-phase FSK, time-based one-time tokens against replay attacks and TDMA for several users at one gate."
      ],
      stack: ["MATLAB", "BFSK", "Non-coherent I/Q demodulation", "Barker synchronisation", "Channel modelling", "Monte Carlo BER"],
      cover: "assets_opt/ultrasonic-system-arch.jpg",
      gallery: [
        { src: "assets_opt/ultrasonic-system-arch.jpg", caption: "Concept: the phone transmits, the turnstile listens." },
        { src: "assets_opt/ultrasonic-token-packing.jpg", caption: "Token generation: user and station IDs packed into 16 bits." },
        { src: "assets_opt/ultrasonic-bfsk-waveform.jpg", caption: "Input bitstream with a 1 → 0 transition at 40 ms." },
        { src: "assets_opt/ultrasonic-spectrogram.jpg", caption: "Spectrogram of the BFSK signal jumping from 19.5 kHz to 18.5 kHz." },
        { src: "assets_opt/ultrasonic-channel.jpg", caption: "Clean transmitted signal and the same signal after band limits, noise, echo and Doppler." },
        { src: "assets_opt/ultrasonic-dsp-receiver.jpg", caption: "Receiver at 10 dB SNR: noisy input, tone envelopes and the decision signal." },
        { src: "assets_opt/ultrasonic-barker-sync.jpg", caption: "Barker cross-correlation peak sets the timing; bits are sampled at symbol centres." },
        { src: "assets_opt/ultrasonic-ber-waterfall.jpg", caption: "BER against SNR; the dashed line is the 1% operating limit." }
      ],
      links: [{ label: "Full project report (PDF, 27 pages)", href: "assets/docs/ultrasonic-ticketing-report.pdf" }],
      note: "Concept illustrations were generated with Gemini, as credited in the report; all plots are MATLAB simulation output."
    }
  ],

  experience: [
    {
      role: "Engineering intern, RF and microwave test",
      org: "ASELSAN REHİS Test Centers Directorate",
      period: "Jun – Aug 2026",
      location: "Ankara",
      bullets: [
        "Added fail-safe limit switches to a planar near-field antenna scanner and wrote EFEscan, the C# GUI that runs a full scan from one action.",
        "Wrote an Ethernet control application for a Harogic NXN-400 spectrum analyzer with automatic peak search, validated against the instrument's markers.",
        "Ran VNA full two-port calibrations with reference planes moved to the cable ends, characterized RF components and measured amplifier gain and P1dB compression.",
        "Took part in near-field anechoic chamber measurements and NRL arch testing of radar-absorbent materials.",
        "Assembled and tested a phased array measurement setup in which an STM32 steps an SP3T RF switch across antenna elements for VNA sweeps."
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
