# Efe Demirer – Engineering Portfolio

Personal engineering portfolio website showcasing academic and industrial projects in RF test automation, hardware interfacing, telecommunications, and autonomous solar telemetry.

Live at: **https://efedemirer.github.io** (or your GitHub Pages URL)

## Featured Projects

1. **Automated CNC Antenna Scanning Test System & Control GUI (ASELSAN REHİS)**
   * C# / .NET Windows Forms GUI communicating over asynchronous Serial Port (115200 Baud).
   * Arduino Uno + CNC Shield V3 running GRBL firmware with real-time G-Code stream generation.
   * 4 Normally-Closed (NC) limit switches for hardware-level collision prevention and GRBL alarm triggers.
   * Multi-threaded `BackgroundWorker` architecture preventing UI lockups during intensive scans.

2. **Harogic NXN400 Real-Time Spectrum Analyzer API & Custom GUI (ASELSAN REHİS)**
   * Native C/C++ API (`HtraApi`) integration over Ethernet TCP/IPv4 (Port 5000).
   * Dynamic parameter management with automatic Resolution Bandwidth (RBW) adjustments.
   * Real-time **Peak Search** algorithm isolating signal peaks above the calibrated -70 dBm noise floor.
   * Comparative validation against official reference software.

3. **Ultrasonic Ticketing System: Seamless & Offline Access Control (Yaşar University)**
   * Near-ultrasound (18–22 kHz) acoustic communication protocol using standard smartphone speakers and microphones.
   * BFSK modulation, Barker code frame synchronization, and bit-level token synthesis.
   * Acoustic multipath channel simulation (two-ray model) with Doppler shift and transducer response modeling.
   * DSP quadrature mixer receiver, envelope detection, parity checks, and BER/PSR waterfall analysis.

4. **SolarOPA: Autonomous AI-Powered Solar Plant Monitoring & Telemetry Engine (OPA Mühendislik & Antigravity)**
   * Sungrow iSolarCloud OpenAPI integration via OAuth 2.0 token management.
   * Local SQLite time-series telemetry database storing minute-by-minute generation trends.
   * Dynamic Fleet Performance Ratio (PR) engine based on theoretical solar irradiance modeling.
   * Google Gemini AI integration for automated executive briefings and nightly 20:00 SMTP email dispatches.

## Tech Stack

* **Frontend**: Vanilla HTML5, Modern CSS (Hack The Box Dark Aesthetic), Vanilla JavaScript (ES6+)
* **Data-Driven Architecture**: Dynamic rendering powered by `data.js` and `main.js`
* **Hosting**: GitHub Pages

---
© 2026 Efe Demirer. All rights reserved.
