// Portfolio data for Efe Demirer
window.SITE = {
  name: "Efe Demirer",
  title: "Candidate RF & Microwave Systems Engineer · Antennas & Test Automation",
  contact: {
    email: "efedemirer.tr@gmail.com",
    location: "İzmir, Turkey",
    linkedin: "https://www.linkedin.com/in/efe-demirer-aa7ba3252",
    github: "https://github.com/efedemirerr"
  },
  summary:
    "Senior Electrical and Electronics Engineering student at Yaşar University specializing in RF & Microwave systems, antenna radiation pattern testing, and high-frequency instrumentation automation. Laboratory and field experience at ASELSAN REHİS Test Centers Directorate conducting planar near-field antenna scanning, VNA 2-port calibrations, RF amplifier characterization, and real-time spectrum analysis.",

  education: [
    {
      school: "Yaşar University",
      degree: "B.Sc. in Electrical and Electronics Engineering",
      date: "Sep 2022 – Present",
      location: "İzmir, Turkey",
      bullets: [
        "<strong>Key Academic Focus:</strong> Antennas and Propagation (EEE 4340), Electromagnetic Field Theory, Microwave & RF Measurement, Signals and Systems, Digital Communications, Circuit Analysis"
      ]
    }
  ],

  experience: [
    {
      role: "Engineering Intern",
      org: "ASELSAN REHİS Test Centers Directorate",
      date: "Jun 2026 – Aug 2026",
      location: "Ankara, Turkey",
      bullets: [
        "<strong>Motion Control & GUI:</strong> Engineered an automated Cartesian X-Y planar antenna scanning system with a custom C# / .NET Windows Forms GUI, integrating GRBL G-Code protocols and hardware limit switch safety interlocks.",
        "<strong>Spectrum Analyzer API:</strong> Developed an independent API-based control application for the Real-Time Spectrum Analyzer over Ethernet/TCP, featuring automated RBW selection and a proprietary real-time Peak Search algorithm.",
        "<strong>RF Characterization:</strong> Conducted RF component characterization, amplifier gain measurements, and P1dB compression testing using Vector Network Analyzers (VNA) with calibrated reference planes shifted to cable ends.",
        "<strong>Phased Array & Chamber:</strong> Participated in Near-Field anechoic chamber measurements, RF absorber material performance characterization via Arch Testing, and hardware assembly of phased-array antenna continuous test fixtures (STM32, VNA, SP3T switch)."
      ]
    },
    {
      role: "Engineering Intern",
      org: "OPA Mühendislik",
      date: "Jul 2025 – Aug 2025 & Aug 2026 – Sep 2026",
      location: "İzmir, Turkey",
      bullets: [
        "<strong>Solar PV Engineering:</strong> Conducted solar power plant (GES) electrical engineering, single-line diagram drafting (AutoCAD), and production yield simulations using PVsyst and ETAP.",
        "<strong>Safety & Inspection:</strong> Performed grounding resistance testing, residual current device (RCD) verification, and periodic inspection workflows under High Voltage Operating Responsibility.",
        "<strong>Power Factor Compensation:</strong> Designed reactive power compensation panels, calculated capacitor bank sizing, and configured reactive power control relays.",
        "<strong>Grid & Storage:</strong> Supported power calculations, cable cross-section selection, and physical installation of EV charging stations and smart grid energy storage infrastructure."
      ]
    }
  ],

  // Featured Engineering Highlights Card in Skills
  featured: {
    title: "Core RF & Microwave Highlights · ASELSAN REHİS",
    stats: [
      "ASELSAN REHİS RF Intern",
      "Antennas & Near-Field Scanning",
      "VNA & Spectrum Automation",
      "P1dB Amplifier Compression"
    ],
    tags: [
      "Antennas & Propagation",
      "VNA 2-Port Calibration",
      "Near-Field Anechoic Chambers",
      "RF Power Amplifiers (P1dB)",
      "NRL Arch Testing (Absorbers)",
      "C# .NET Test Automation"
    ]
  },

  skills: [
    {
      group: "RF & Microwave Engineering",
      items: [
        "Antennas & Propagation",
        "Vector Network Analyzers (VNA)",
        "Real-Time Spectrum Analyzers",
        "VNA Full 2-Port Calibration",
        "P1dB Compression Testing",
        "RF Component Characterization",
        "Near-Field Anechoic Testing",
        "NRL Arch Absorber Testing",
        "S-Parameters & Impedance Matching"
      ]
    },
    {
      group: "RF Test Automation & Software",
      items: ["C#", ".NET", "Windows Forms", "Python", "API Integration", "SCPI & G-Code", "Serial (RS-232)", "Ethernet TCP/IP", "MATLAB"]
    },
    {
      group: "Motion & Scanning Hardware",
      items: [
        "Cartesian X-Y Scanners",
        "Stepper Motor Control",
        "CNC Shield V3",
        "GRBL Firmware",
        "Limit Switch Safety Interlocks",
        "Arduino & STM32"
      ]
    },
    {
      group: "Electrical & Energy Systems",
      items: [
        "Solar PV Design (GES)",
        "PVsyst Simulation",
        "ETAP Power Analysis",
        "AutoCAD",
        "Reactive Power Compensation",
        "High Voltage Inspection",
        "RCD & Grounding Tests"
      ]
    },
    {
      group: "Simulation & Tools",
      items: ["Simulink", "LTspice", "Proteus", "Git / GitHub", "Visual Studio", "Microsoft Project"]
    }
  ],

  projects: [
    {
      title: "Automated CNC Antenna Scanning Test System & Control GUI",
      date: "2026",
      summary: "Autonomous Cartesian X-Y planar antenna scanning system engineered for ASELSAN REHİS Test Centers Directorate.",
      bullets: [
        "<strong>Hardware & Motion Control:</strong> Interfaced PC with Arduino Uno + CNC Shield V3 running GRBL firmware over asynchronous Serial Port (115200 Baud).",
        "<strong>G-Code Protocol:</strong> Implemented real-time G-Code stream generation (G90/G91/G92/G1) with centered grid coordinate pathway calculations.",
        "<strong>Hardware Safety Interlocks:</strong> Integrated 4 mechanical Normally-Closed (NC) limit switches for hardware-level collision prevention, triggering instant GRBL ALARM mode and motor cutoff.",
        "<strong>Multi-Threaded Execution:</strong> Designed asynchronous BackgroundWorker threads eliminating UI freezing, paired with live bitmap scan visualization and feedrate-calibrated motion delays."
      ],
      tags: ["C#", ".NET", "GRBL", "G-Code", "Arduino", "Antenna Testing", "Hardware Interfacing", "Test Automation"],
      images: [
        "assets/img/projects/cnc-scanner-gui.png",
        "assets/img/projects/cnc-scanner-chassis.png",
        "assets/img/projects/cnc-hardware-shield.png",
        "assets/img/projects/cnc-limit-switches.png"
      ],
      youtube: "",
      link: ""
    },
    {
      title: "Real-Time Spectrum Analyzer API & Custom GUI",
      date: "2026",
      summary: "Dedicated C# desktop application and custom GUI interfacing directly with a Real-Time Spectrum Analyzer at ASELSAN REHİS.",
      bullets: [
        "<strong>Native API Integration:</strong> Interfaced natively via manufacturer C/C++ API over Ethernet TCP/IPv4 (Port 5000) with robust IP parsing and persistent hardware session control.",
        "<strong>Parameter Management:</strong> Implemented dynamic frequency range configuration (Start/Stop, Center, Span) with automated Resolution Bandwidth (RBW) tuning.",
        "<strong>Proprietary Peak Search:</strong> Designed real-time peak detection isolating carrier frequencies above calibrated noise floor (-70 dBm) to separate true signals from ambient RF noise.",
        "<strong>Laboratory Benchmarking:</strong> Conducted comparative validation against manufacturer reference software, verifying measurement accuracy in defense testing environments."
      ],
      tags: ["C#", "Spectrum Analyzer API", "Spectrum Analyzer", "Ethernet / TCP", "Peak Search Algorithm", "RF Sniffing", "Signal Processing"],
      images: [
        "assets/img/projects/harogic-spectrum-gui.png",
        "assets/img/projects/harogic-params-filter.png",
        "assets/img/projects/harogic-validation.png"
      ],
      youtube: "",
      link: ""
    },
    {
      title: "Ultrasonic Ticketing System: Seamless & Offline Access Control",
      date: "2026",
      summary: "Near-ultrasound (18–22 kHz) acoustic communication protocol enabling offline, zero-infrastructure access control without cellular data, internet, or NFC.",
      bullets: [
        "<strong>Acoustic Transducers:</strong> Utilized standard commercial smartphone speakers and microphones to transmit encrypted access tokens completely inaudible to human ears.",
        "<strong>Digital Modulation:</strong> Developed full MATLAB DSP pipeline featuring bit-level token synthesis, Barker code frame synchronization, and Binary Frequency Shift Keying (BFSK).",
        "<strong>Channel Simulation:</strong> Modeled multipath propagation (Two-Ray Model), ambient acoustic interference, transducer frequency limits, and motion-induced Doppler shifts.",
        "<strong>DSP Receiver & Validation:</strong> Built quadrature mixer receiver with envelope detection, parity verification, and comprehensive BER/PSR waterfall performance analysis."
      ],
      tags: ["MATLAB", "Digital Communications", "BFSK Modulation", "Acoustic Channel Modeling", "DSP", "Barker Code", "Offline Auth"],
      images: [
        "assets/img/projects/ultrasonic-system-arch.jpeg",
        "assets/img/projects/ultrasonic-bfsk-waveform.jpeg",
        "assets/img/projects/ultrasonic-ber-waterfall.jpeg"
      ],
      youtube: "",
      link: ""
    },
    {
      title: "SolarOPA: Autonomous AI-Powered Solar Plant Monitoring & Telemetry Engine",
      date: "2026",
      summary: "Autonomous closed-loop telemetry and operational intelligence platform for commercial solar power plants (GES) utilizing Sungrow iSolarCloud infrastructure.",
      bullets: [
        "<strong>OpenAPI Telemetry:</strong> Connected to Sungrow OpenAPI via OAuth 2.0 token management, streaming real-time multi-inverter generation, DC/AC voltages, and grid status.",
        "<strong>Local Database Architecture:</strong> Architected local SQLite time-series database storing minute-by-minute telemetry, inverter mappings, and grid fault histories.",
        "<strong>Fleet PR Modeling:</strong> Computed scientific Fleet Performance Ratio (PR) modeled against dynamic solar irradiance curves while filtering out plant anomalies.",
        "<strong>Gemini AI Integration:</strong> Prompt-engineered Google Gemini AI to analyze multi-point telemetry, diagnose anomalies, and compile executive HTML reports delivered daily at 20:00 via SMTP email."
      ],
      tags: ["Python", "REST API", "OAuth 2.0", "SQLite", "Google Gemini AI", "Prompt Engineering", "Solar Telemetry", "Automation"],
      images: [
        "assets/img/projects/solaropa-architecture.svg"
      ],
      youtube: "",
      link: ""
    }
  ],

  certifications: [
    "ASELSAN – 'a Yetenek' Engineering Internship Program Certificate of Completion (2026)",
    "Ministry of Industry and Technology & National Technology Academy – Chip Design (Çip Tasarımı) Specialization Certificate (2026)",
    "ROKETSAN – LEVEL UP AI: Smart Object Detection and Tracking with YOLO (2026)",
    "ROKETSAN – LEVEL UP AI: Autonomous AI Agent Development & Document Assistants (2026)",
    "Turkish Aerospace (TUSAŞ) – LIFT UP Industry-Oriented Capstone Projects Conference (2025)",
    "Savunma Sanayii Akademi (SSB) – Milli Yetkinlik Hamlesi Competency & Career Summit (2026)",
    "MathWorks – Core Signal Processing Techniques in MATLAB (Spectral Analysis, Filter Design, Time-Frequency, Resampling)",
    "MathWorks – Core MATLAB Skills (Vector/Matrix Mathematics, Data Visualization, Script Troubleshooting)",
    "MathWorks – Simulink Fundamentals (Simulation & Model-Based Design, 2026)",
    "MathWorks – Simscape Onramp (Physical Multi-Domain Systems Modeling, 2026)",
    "MathWorks – Signal Processing Onramp (2025)",
    "MathWorks – Simulink Onramp (2025)",
    "MathWorks – MATLAB Onramp (2025)",
    "TÜBİTAK – 4006 Science and Society Support Program Certificate",
    "ASELSAN – Occupational Health and Safety (İSG) Certification (2026)"
  ],

  languages: [
    "Turkish – Native",
    "English – Professional Working Proficiency (B2 Upper-Intermediate, SFL Certified)"
  ]
};
