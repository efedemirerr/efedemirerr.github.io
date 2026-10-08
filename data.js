// Portfolio data for Efe Demirer
window.SITE = {
  name: "Efe Demirer",
  title: "Electrical & Electronics Engineering · RF & Test Automation",
  contact: {
    email: "efedemirer.tr@gmail.com",
    phone: "+90 554 638 86 92",
    location: "İzmir, Turkey",
    linkedin: "https://www.linkedin.com/in/efe-demirer-aa7ba3252",
    github: "https://github.com/efedemirerr"
  },
  summary:
    "Senior Electrical and Electronics Engineering student at Yaşar University (100% Scholarship, GPA: 3.73 / 4.00) with hands-on laboratory and field engineering experience across RF & antenna test automation, Cartesian motion control systems, hardware interfacing, and solar telemetry. At ASELSAN REHİS Test Centers Directorate, I developed automated C# GUI control platforms for planar Cartesian X-Y antenna scanners with GRBL G-Code and fail-safe limit switch interlocks, engineered Ethernet-based Harogic real-time spectrum analyzer API integrations featuring custom peak search algorithms, and conducted hands-on VNA calibrations and P1dB amplifier compression testing. At OPA Mühendislik, I designed solar PV electrical infrastructures and co-engineered the SolarOPA autonomous AI monitoring and telemetry system.",

  education: [
    {
      school: "Yaşar University",
      degree: "B.Sc. in Electrical and Electronics Engineering",
      date: "Sep 2022 – Present",
      location: "İzmir, Turkey",
      bullets: [
        "100% Full Merit Scholarship | High Honor Student | Cumulative GPA: 3.73 / 4.00",
        "Key Coursework: Signals and Systems, Telecommunications, Electromagnetic Theory, Digital Communications, Circuit Analysis, Feedback Control Systems, Power Systems"
      ]
    },
    {
      school: "Cem Bakioğlu Anatolian High School",
      degree: "High School Diploma",
      date: "Sep 2018 – Jun 2022",
      location: "İzmir, Turkey",
      bullets: [
        "Graduation Grade: 96.89 / 100"
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
        "Engineered an automated Cartesian X-Y planar antenna scanning system with a custom C# / .NET Windows Forms GUI, integrating G-Code protocols and hardware limit switch safety interlocks.",
        "Developed an independent API-based control application for the Harogic NXN400 Real-Time Spectrum Analyzer over Ethernet/TCP, featuring automated RBW selection and a proprietary real-time Peak Search algorithm.",
        "Conducted RF component characterization, amplifier gain measurements, and P1dB compression testing using Vector Network Analyzers (VNA) with calibrated reference planes shifted to cable ends.",
        "Participated in Near-Field anechoic chamber measurements, RF absorber material performance characterization via Arch Testing, and hardware assembly of phased-array antenna continuous test fixtures (STM32, VNA, SP3T switch)."
      ]
    },
    {
      role: "Engineering Intern",
      org: "OPA Mühendislik",
      date: "Jul 2025 – Aug 2025 & Aug 2026 – Sep 2026",
      location: "İzmir, Turkey",
      bullets: [
        "Conducted solar power plant (GES) electrical engineering, single-line diagram drafting (AutoCAD), and production yield simulations using PVsyst and ETAP.",
        "Performed grounding resistance testing, residual current device (RCD) verification, and periodic inspection workflows under High Voltage Operating Responsibility.",
        "Designed reactive power compensation panels, calculated capacitor bank sizing, and configured reactive power control relays.",
        "Supported power calculations, cable cross-section selection, and physical installation of EV charging stations and smart grid energy storage infrastructure."
      ]
    }
  ],

  // Featured Engineering Highlights Card in Skills
  featured: {
    title: "Engineering Highlights · ASELSAN REHİS & OPA Mühendislik",
    stats: [
      "ASELSAN REHİS Intern",
      "GPA: 3.73 / 4.00 (100% Scholarship)",
      "Cartesian X-Y & RF Automation",
      "Solar Fleet AI Telemetry"
    ],
    tags: [
      "RF Component Characterization",
      "Planar Near-Field Scanning",
      "C# .NET GUI Development",
      "Ethernet & Serial API Control",
      "Digital Communications (BFSK)",
      "AI-Driven Plant Telemetry"
    ]
  },

  skills: [
    {
      group: "Programming & Software",
      items: ["C#", ".NET", "Windows Forms", "Python", "C/C++", "MATLAB", "Arduino IDE", "SQLite / SQL"]
    },
    {
      group: "RF & Test Automation",
      items: [
        "Test Automation",
        "Hardware Interfacing",
        "API Integration",
        "SCPI & G-Code",
        "VNA Calibration",
        "Spectrum Analyzers",
        "P1dB Compression",
        "Near-Field Testing",
        "Arch Testing"
      ]
    },
    {
      group: "Motion & Hardware Control",
      items: [
        "Cartesian X-Y Scanners",
        "Stepper Motors",
        "CNC Shield V3",
        "GRBL Firmware",
        "Limit Switch Safety",
        "STM32 Microcontrollers"
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
      description:
        "An automated Cartesian X-Y planar antenna scanning test platform engineered for ASELSAN REHİS Test Centers Directorate. Developed a C# / .NET Windows Forms GUI communicating over asynchronous Serial Port (115200 Baud) to an Arduino Uno and CNC Shield V3 running GRBL firmware. Implemented dynamic G-Code stream generation (G90/G91/G92/G1), centered grid coordinate mapping, and a multi-threaded BackgroundWorker architecture preventing UI lockup. Integrated 4 mechanical Normally-Closed (NC) limit switches for hardware-level collision prevention (hard limits trigger instant GRBL alarm and motor power cutoff), complemented by real-time bitmap scanning visualization and feedrate-calibrated motion delays.",
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
      title: "Harogic NXN400 Real-Time Spectrum Analyzer API & Custom GUI",
      date: "2026",
      description:
        "A dedicated C# desktop application and custom GUI developed for the Harogic NXN400 high-performance real-time spectrum analyzer at ASELSAN REHİS. Interfaced directly via the manufacturer's native C/C++ API (HtraApi) over Ethernet (TCP/IPv4, Port 5000), handling robust IP packet parsing, API boot profiling, and persistent hardware session management. Designed intelligent parameter controls with dynamic frequency span and automatic Resolution Bandwidth (RBW) tuning. Designed and integrated a proprietary real-time Peak Search algorithm detecting frequency and power peaks above a calibrated noise floor (-70 dBm) to separate true signals from background noise during RF sniffing, validated against official reference software.",
      tags: ["C#", "Harogic API", "Spectrum Analyzer", "Ethernet / TCP", "Peak Search Algorithm", "RF Sniffing", "Signal Processing"],
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
      description:
        "An acoustic, near-ultrasound (18–22 kHz) communication protocol enabling frictionless, offline access control and ticketing without requiring cellular data, internet, or proprietary NFC hardware. Utilizes standard smartphone audio transducers (speakers and microphones), remaining inaudible to human ears. Developed a full end-to-end digital communications simulation in MATLAB incorporating bit-level token synthesis, Barker code frame synchronization, and Binary Frequency Shift Keying (BFSK) modulation. Modeled a realistic multipath fading channel (two-ray model), hardware frequency limitations, and Doppler shifts, paired with a DSP quadrature mixer receiver, envelope detection, parity checks, and comprehensive BER/PSR waterfall performance analysis.",
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
      description:
        "An autonomous, closed-loop telemetry and operational intelligence platform engineered for commercial solar power plants (GES) utilizing Sungrow iSolarCloud infrastructure. Connects to the official Sungrow OpenAPI via OAuth 2.0 token management, streaming real-time multi-inverter generation, DC/AC voltages, and grid status into a local SQLite time-series database. Computes scientific Fleet Performance Ratio (PR) modeled against a dynamic solar irradiance curve. Integrates Google Gemini AI with prompt engineering to synthesize multi-point plant telemetry into actionable diagnostic summaries and custom HTML/CSS report formats, automatically dispatched every evening at 20:00 via SMTP email.",
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
    "Ministry of Industry and Technology & National Technology Academy – Chip Design (Çip Tasarımı) Specialization Program (2026)",
    "ROKETSAN – LEVEL UP AI: Smart Object Detection and Tracking with YOLO (2026)",
    "ROKETSAN – LEVEL UP AI: Autonomous AI Agent Development & Document Assistants (2026)",
    "Turkish Aerospace (TUSAŞ) – LIFT UP Industry-Oriented Capstone Projects Conference (2025)",
    "Savunma Sanayii Akademi (SSB) – Milli Yetkinlik Hamlesi Competency & Career Summit (2026)",
    "MathWorks – Core Signal Processing Techniques in MATLAB (Spectral Analysis, Filter Design, Time-Frequency, Resampling)",
    "MathWorks – Core MATLAB Skills (Vector/Matrix Mathematics, Data Visualization, Script Troubleshooting)",
    "MathWorks – Simulink Fundamentals (Simulation & Model-Based Design, 2026)",
    "MathWorks – Simscape Onramp (Physical Multi-Domain Systems Modeling, 2026)",
    "MathWorks – Signal Processing Onramp (2025)",
    "TÜBİTAK – 4006 Science and Society Project Award / Participant",
    "Yaşar University School of Foreign Languages – English Proficiency Certificate (B2 Upper-Intermediate)",
    "ASELSAN – Occupational Health and Safety (İSG) Certification (2026)",
    "OPA Mühendislik – High Voltage Operating Responsibility & Inspection Training (2025)"
  ],

  languages: [
    "Turkish – Native",
    "English – Professional Working Proficiency (B2 Upper-Intermediate, SFL Certified)"
  ]
};
