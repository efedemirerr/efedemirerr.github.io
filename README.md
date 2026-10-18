# Efe Demirer · Engineering portfolio

Personal portfolio of Efe Demirer, Electrical and Electronics Engineering student at Yaşar University.
Live at **https://efedemirerr.github.io**.

## Projects

- **SolarOPA** (OPA Mühendislik): live monitoring platform for a 14-plant solar fleet across five inverter and storage brands, with a TV alarm wall, Gemini AI reports and invite-based read-only remote access.
- **Planar near-field antenna scanner** (ASELSAN REHİS): C# control GUI and GRBL motion control for an X-Y probe positioner with hardware limit switch interlocks.
- **Real-time spectrum analyzer control** (ASELSAN REHİS): Ethernet API application with automatic RBW and peak search, validated against the vendor software.
- **Ultrasonic ticketing system** (Yaşar University): 18–22 kHz BFSK acoustic link simulated end to end in MATLAB.

## How the site works

- `data.js` holds all content: profile, projects (with gallery captions and metrics), experience, skills and certificates.
- `main.js` renders every section from `data.js`, draws the hero spectrum trace and opens each project as a shareable dialog (`#project/<id>`).
- `style.css` is the full visual system. No build step, no framework; hosted on GitHub Pages.

The downloadable portfolio PDFs (`assets/Efe_Demirer_Portfolio.pdf` and the Turkish `assets/Efe_Demirer_Portfolyo.pdf`) are generated from the same data with `python tools/build_portfolio_pdf.py`; run it again after changing `data.js` or `data_tr.js`.

To add a project, append an object to `projects` in `data.js` and put its images in `assets_opt/`.

© 2026 Efe Demirer
