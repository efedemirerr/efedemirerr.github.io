/**
 * CONVERTLAB // CS:GO TACTICAL UNIT CONVERTER ENGINE
 * Comprehensive physics, NATO STANAG, Hammer Units & in-game metrics
 */

// Tactical CS:GO Audio Synthesizer (Realistic Gunshots, Defuse Wire Snips, Radio & Beeps)
const TacticalAudio = {
  enabled: true,
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  },

  // Helper: White/Pink noise buffer generator for gun blast impact & mechanical tails
  createNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  },

  // AK-47 Gunshot: Heavy crack, explosive mid-body, and metallic barrel reverb
  playAK47() {
    if (!this.enabled) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;

      // 1. Initial High Muzzle Crack
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
      oscGain.gain.setValueAtTime(0.4, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);

      // 2. Heavy 7.62mm Explosive Blast (Filtered Noise)
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.createNoiseBuffer();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + 0.4);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.8, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.45);

      // 3. Sub-bass Punch (Chest Impact)
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(140, now);
      sub.frequency.exponentialRampToValueAtTime(30, now + 0.25);
      subGain.gain.setValueAtTime(0.7, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + 0.25);
    } catch (e) {}
  },

  // AWP Gunshot: Massive thunderous supersonic crack & huge echoing boom
  playAWP() {
    if (!this.enabled) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;

      // Heavy Boom
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.createNoiseBuffer();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.value = 1.2;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(1.0, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.85);

      // Sub Bass Shockwave
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(20, now + 0.5);
      oscGain.gain.setValueAtTime(0.9, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {}
  },

  // Realistic C4 Defuse Sound: Sequential Wire Snip Clicks + High Electronic Tone
  playDefuseSound() {
    if (!this.enabled) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;

      // Kit Pliers / Wire Snip #1
      this.playSnip(now);
      // Wire Snip #2
      this.playSnip(now + 0.12);
      // Radio Confirmation Beep
      this.playBeep(920, 0.08, 'triangle');
    } catch (e) {}
  },

  playSnip(time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2200, time);
    osc.frequency.exponentialRampToValueAtTime(400, time + 0.04);
    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.04);
  },

  // Bomb Tick (Authentic High Pitch 1000Hz Square Beep)
  playC4Tick() {
    this.playBeep(1000, 0.035, 'square');
  },

  // Tactical Menu Switching / Weapon Select
  playSwitch() {
    this.playBeep(750, 0.04, 'triangle');
  },

  // Headshot Crunch / Kill Confirmation
  playHeadshot() {
    if (!this.enabled) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      // Helmet Dink
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  },

  playBeep(freq = 880, duration = 0.05, type = 'sine') {
    if (!this.enabled) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }
};

// Unit Definition Registry
// Base conversions with standard SI + Imperial + Tactical/Engine units
const CONVERSION_DATA = {
  // 1. LENGTH (Image requested + Hammer Unit, Nautical Mile, Caliber)
  length: {
    title: "LENGTH & DISTANCE TELEMETRY",
    desc: "NATO Ballistic Ranges, Standard Metric/Imperial, & CS:GO Hammer Units",
    base: "m",
    formulaHint: "1 Hammer Unit = 0.01905 m (0.75 inches)",
    weapon: {
      name: "AWP | DRAGON LORE",
      rarity: "COVERT",
      vel: "3000 u/s (57.15 m/s in engine)",
      award: "$100",
      pen: "97.5%",
      range: "96 m (5,039 units)",
      svg: `<svg viewBox="0 0 200 60" width="180" height="54" fill="currentColor">
              <path d="M10 35 L40 35 L50 25 L120 25 L130 18 L190 18 L190 22 L140 24 L145 35 L120 38 L90 38 L80 48 L65 48 L60 38 L25 40 L10 40 Z" fill="#de9b35" opacity="0.9"/>
              <rect x="75" y="14" width="45" height="7" fill="#5c9be6"/>
              <line x1="20" y1="36" x2="190" y2="20" stroke="#ffd700" stroke-width="1.5"/>
            </svg>`
    },
    presets: [
      { name: "Player Height", val: 72, from: "hammer", to: "m", desc: "CS:GO Model (72 units)" },
      { name: "Dust2 Long A", val: 3200, from: "hammer", to: "m", desc: "Corner to Site Range" },
      { name: "AWP Accurate Range", val: 96, from: "m", to: "yard", desc: "Kill distance" },
      { name: "Standard Jump", val: 56, from: "hammer", to: "cm", desc: "Jump height (56 u)" }
    ],
    units: {
      hammer: { name: "Hammer Units (CS:GO Engine)", sym: "units", toBase: v => v * 0.01905, fromBase: v => v / 0.01905 },
      m: { name: "Meters", sym: "m", toBase: v => v, fromBase: v => v },
      cm: { name: "Centimeters", sym: "cm", toBase: v => v * 0.01, fromBase: v => v / 0.01 },
      mm: { name: "Millimeters", sym: "mm", toBase: v => v * 0.001, fromBase: v => v / 0.001 },
      km: { name: "Kilometers", sym: "km", toBase: v => v * 1000, fromBase: v => v / 1000 },
      inch: { name: "Inches", sym: "in", toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      foot: { name: "Feet", sym: "ft", toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      yard: { name: "Yards", sym: "yd", toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      mile: { name: "Miles", sym: "mi", toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
      nmi: { name: "Nautical Miles", sym: "nmi", toBase: v => v * 1852, fromBase: v => v / 1852 }
    }
  },

  // 2. MASS (Image requested + Grains, Cartridges, Armor Plate Weight)
  mass: {
    title: "MASS & BALLISTIC PAYLOAD",
    desc: "Ammunition Grains, Tactical Equipment Weight, & Heavy Armor Metrics",
    base: "kg",
    formulaHint: "1 Grain (Ammunition) = 0.06479891 g",
    weapon: {
      name: "AK-47 | VULCAN",
      rarity: "COVERT",
      vel: "2800 u/s (715 m/s)",
      award: "$300",
      pen: "77.5%",
      range: "31 m (1,627 units)",
      svg: `<svg viewBox="0 0 200 60" width="180" height="54" fill="currentColor">
              <path d="M15 35 L45 35 L60 28 L140 28 L155 24 L190 24 L190 27 L165 29 L165 35 L125 35 L105 48 L90 48 L100 35 L55 37 L30 45 Z" fill="#5c9be6" opacity="0.9"/>
              <path d="M100 35 L90 52 L105 52 L115 35 Z" fill="#e6edf5"/>
            </svg>`
    },
    presets: [
      { name: "7.62x39mm Bullet", val: 123, from: "gr", to: "g", desc: "AK-47 Round (123 gr)" },
      { name: "5.56x45mm NATO", val: 62, from: "gr", to: "g", desc: "M4A4 Round (62 gr)" },
      { name: "Kevlar + Helmet", val: 8.5, from: "kg", to: "lb", desc: "Assault Armor Kit" },
      { name: "C4 Explosive Charge", val: 1.25, from: "lb", to: "kg", desc: "M112 Block" }
    ],
    units: {
      kg: { name: "Kilograms", sym: "kg", toBase: v => v, fromBase: v => v },
      g: { name: "Grams", sym: "g", toBase: v => v * 0.001, fromBase: v => v / 0.001 },
      mg: { name: "Milligrams", sym: "mg", toBase: v => v * 1e-6, fromBase: v => v / 1e-6 },
      lb: { name: "Pounds (Avoirdupois)", sym: "lb", toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
      oz: { name: "Ounces", sym: "oz", toBase: v => v * 0.02834952, fromBase: v => v / 0.02834952 },
      gr: { name: "Grains (Ballistic Ammo)", sym: "gr", toBase: v => v * 0.00006479891, fromBase: v => v / 0.00006479891 },
      tonne: { name: "Metric Tonnes", sym: "t", toBase: v => v * 1000, fromBase: v => v / 1000 },
      cwt: { name: "Hundredweight (US)", sym: "cwt", toBase: v => v * 45.359237, fromBase: v => v / 45.359237 }
    }
  },

  // 3. PRESSURE (Image requested + Chamber Pressure, PSI, Bar, Atm)
  pressure: {
    title: "PRESSURE & CHAMBER EXPLOSIVE FORCE",
    desc: "Weapon Chamber Gas Pressures, Atmospheric Barometrics & Hydraulics",
    base: "Pa",
    formulaHint: "1 Bar = 100,000 Pa = 14.5038 PSI",
    weapon: {
      name: "DESERT EAGLE | BLAZE",
      rarity: "RESTRICTED",
      vel: "2300 u/s",
      award: "$300",
      pen: "93.2%",
      range: "35 m",
      svg: `<svg viewBox="0 0 200 60" width="180" height="54" fill="currentColor">
              <path d="M40 38 L70 38 L75 25 L160 25 L160 38 L140 38 L130 52 L95 52 L105 38 L65 40 Z" fill="#ea3c3c"/>
            </svg>`
    },
    presets: [
      { name: "5.56 NATO Chamber", val: 55000, from: "psi", to: "bar", desc: "M4A4 Max SAAMI Pressure" },
      { name: "7.62x39mm Chamber", val: 3550, from: "bar", to: "psi", desc: "AK-47 CIP Pressure" },
      { name: "Atmospheric (Sea Level)", val: 1, from: "atm", to: "kpa", desc: "Standard Condition" },
      { name: "Scuba / Tactical Gas", val: 300, from: "bar", to: "psi", desc: "Breathing Tank" }
    ],
    units: {
      pa: { name: "Pascals", sym: "Pa", toBase: v => v, fromBase: v => v },
      kpa: { name: "Kilopascals", sym: "kPa", toBase: v => v * 1000, fromBase: v => v / 1000 },
      mpa: { name: "Megapascals", sym: "MPa", toBase: v => v * 1e6, fromBase: v => v / 1e6 },
      bar: { name: "Bar", sym: "bar", toBase: v => v * 100000, fromBase: v => v / 100000 },
      psi: { name: "Pounds per Square Inch", sym: "psi", toBase: v => v * 6894.757, fromBase: v => v / 6894.757 },
      atm: { name: "Standard Atmosphere", sym: "atm", toBase: v => v * 101325, fromBase: v => v / 101325 },
      torr: { name: "Torr (mmHg)", sym: "Torr", toBase: v => v * 133.322, fromBase: v => v / 133.322 }
    }
  },

  // 4. ENERGY (Image requested + Joules, Foot-Pounds, TNT Equivalent, Calories)
  energy: {
    title: "KINETIC ENERGY & MUZZLE IMPACT",
    desc: "Muzzle Energy, High Explosive Yield (TNT) & Thermal Caloric Value",
    base: "J",
    formulaHint: "Kinetic Energy = 0.5 * mass(kg) * velocity^2 (m/s)",
    weapon: {
      name: "M4A4 | HOWL",
      rarity: "CONTRABAND",
      vel: "2700 u/s (670 m/s)",
      award: "$300",
      pen: "70%",
      range: "39 m",
      svg: `<svg viewBox="0 0 200 60" width="180" height="54" fill="currentColor">
              <path d="M20 34 L50 34 L65 26 L150 26 L160 22 L190 22 L190 25 L165 27 L165 33 L120 33 L105 46 L95 46 L100 34 L60 36 Z" fill="#ea3c3c" opacity="0.9"/>
            </svg>`
    },
    presets: [
      { name: ".338 Lapua (AWP)", val: 6600, from: "j", to: "ft_lb", desc: "Devastating Sniper Muzzle" },
      { name: "7.62x39 (AK-47)", val: 2100, from: "j", to: "ft_lb", desc: "Assault Rifle Kinetic Force" },
      { name: "C4 Explosive (1kg)", val: 4.184e6, from: "j", to: "tnt_kg", desc: "High Explosive Yield" },
      { name: "Flashbang Flash", val: 1e6, from: "j", to: "kj", desc: "Magnesium/Ammonium Burst" }
    ],
    units: {
      j: { name: "Joules", sym: "J", toBase: v => v, fromBase: v => v },
      kj: { name: "Kilojoules", sym: "kJ", toBase: v => v * 1000, fromBase: v => v / 1000 },
      ft_lb: { name: "Foot-Pounds (Ballistics)", sym: "ft-lb", toBase: v => v * 1.355818, fromBase: v => v / 1.355818 },
      cal: { name: "Calories", sym: "cal", toBase: v => v * 4.184, fromBase: v => v / 4.184 },
      kcal: { name: "Kilocalories (Food)", sym: "kcal", toBase: v => v * 4184, fromBase: v => v / 4184 },
      kwh: { name: "Kilowatt-Hours", sym: "kWh", toBase: v => v * 3.6e6, fromBase: v => v / 3.6e6 },
      tnt_kg: { name: "kg of TNT Equivalent", sym: "kg TNT", toBase: v => v * 4.184e6, fromBase: v => v / 4.184e6 },
      ev: { name: "Electronvolts", sym: "eV", toBase: v => v * 1.602176634e-19, fromBase: v => v / 1.602176634e-19 }
    }
  },

  // 5. TEMPERATURE (Image requested: Celsius, Fahrenheit, Kelvin, Rankine)
  temperature: {
    title: "TEMPERATURE & THERMAL SIGNATURE",
    desc: "Barrel Heat, Cryogenics, Molotov Flame Intensity & Absolute Scales",
    base: "c",
    formulaHint: "°F = (°C × 9/5) + 32 | K = °C + 273.15",
    weapon: {
      name: "MOLOTOV / INCENDIARY GRENADE",
      rarity: "EQUIPMENT",
      vel: "Flame AOE: 7.03s",
      award: "$300",
      pen: "Armor Bypass",
      range: "Area Denial",
      svg: `<svg viewBox="0 0 200 60" width="180" height="54" fill="currentColor">
              <path d="M90 45 L110 45 L115 30 L105 20 L95 20 L85 30 Z" fill="#de9b35"/>
              <path d="M97 20 L103 20 L102 12 L98 12 Z" fill="#e6edf5"/>
              <path d="M100 12 Q108 5 100 0 Q92 5 100 12 Z" fill="#ea3c3c"/>
            </svg>`
    },
    presets: [
      { name: "Molotov Flame", val: 800, from: "c", to: "f", desc: "Peak combustion heat" },
      { name: "Barrel Overheat", val: 350, from: "c", to: "f", desc: "Full-auto spray heat" },
      { name: "Absolute Zero", val: 0, from: "k", to: "c", desc: "0 Kelvin" },
      { name: "Body Temp", val: 37, from: "c", to: "f", desc: "Standard human core" }
    ],
    units: {
      c: { name: "Celsius", sym: "°C", toBase: v => v, fromBase: v => v },
      f: { name: "Fahrenheit", sym: "°F", toBase: v => (v - 32) * 5 / 9, fromBase: v => (v * 9 / 5) + 32 },
      k: { name: "Kelvin", sym: "K", toBase: v => v - 273.15, fromBase: v => v + 273.15 },
      r: { name: "Rankine", sym: "°R", toBase: v => (v - 491.67) * 5 / 9, fromBase: v => (v + 273.15) * 9 / 5 }
    }
  },

  // 6. VELOCITY / SPEED (Tactical Addition: Knife run speed, Bullet velocity, Mach)
  velocity: {
    title: "VELOCITY & IN-GAME MOVEMENT SPEED",
    desc: "Player Cl_showpos Movement Speeds, Bullet Muzzle Speeds & Mach Scale",
    base: "m_s",
    formulaHint: "250 Engine Units/sec (Knife) = 4.7625 m/s = 17.145 km/h",
    weapon: {
      name: "KNIFE // KARAMBIT DOPPLER",
      rarity: "EXTRAORDINARY",
      vel: "250 u/s Max Run Speed",
      award: "$1500",
      pen: "Backstab Instant",
      range: "Melee",
      svg: `<svg viewBox="0 0 200 60" width="180" height="54" fill="currentColor">
              <path d="M40 30 Q70 15 100 25 Q130 35 150 20 Q160 30 140 42 Q110 46 80 38 L40 40 Z" fill="#5c9be6"/>
              <circle cx="50" cy="35" r="7" fill="none" stroke="#ffd700" stroke-width="2"/>
            </svg>`
    },
    presets: [
      { name: "Knife Run Speed", val: 250, from: "u_s", to: "kmh", desc: "Default max movement" },
      { name: "Scout (SSG 08) Speed", val: 230, from: "u_s", to: "kmh", desc: "Fastest rifle run" },
      { name: "AWP Bullet Speed", val: 3000, from: "u_s", to: "mach", desc: "Supersonic travel" },
      { name: "Negev Run Speed", val: 150, from: "u_s", to: "kmh", desc: "Heavy gun penalty" }
    ],
    units: {
      u_s: { name: "Hammer Units/sec (CS:GO)", sym: "u/s", toBase: v => v * 0.01905, fromBase: v => v / 0.01905 },
      m_s: { name: "Meters per Second", sym: "m/s", toBase: v => v, fromBase: v => v },
      kmh: { name: "Kilometers per Hour", sym: "km/h", toBase: v => v / 3.6, fromBase: v => v * 3.6 },
      mph: { name: "Miles per Hour", sym: "mph", toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
      fps: { name: "Feet per Second", sym: "fps", toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      knot: { name: "Knots", sym: "kn", toBase: v => v * 0.514444, fromBase: v => v / 0.514444 },
      mach: { name: "Mach (At Sea Level)", sym: "M", toBase: v => v * 340.29, fromBase: v => v / 340.29 }
    }
  },

  // 7. FREQUENCY & RF WAVELENGTH (Engineering Alignment)
  frequency: {
    title: "RF FREQUENCY & PROPAGATION WAVELENGTH",
    desc: "Tactical Radio Wavebands, Radar Frequencies & Tickrate Timing",
    base: "hz",
    formulaHint: "Wavelength λ = c / f (where c ≈ 299,792,458 m/s)",
    weapon: {
      name: "TACTICAL MIL-SPEC RADIO",
      rarity: "EQUIPMENT",
      vel: "Voice Comms & Telemetry",
      award: "Tactical Intel",
      pen: "N/A",
      range: "Global Grid",
      svg: `<svg viewBox="0 0 200 60" width="180" height="54" fill="currentColor">
              <rect x="70" y="20" width="35" height="35" fill="#445566"/>
              <line x1="75" y1="20" x2="65" y2="2" stroke="#5c9be6" stroke-width="3"/>
              <circle cx="87" cy="35" r="7" fill="#223c5c"/>
            </svg>`
    },
    presets: [
      { name: "Tickrate 128 (Valve)", val: 128, from: "hz", to: "khz", desc: "128 Packets/sec (7.81ms)" },
      { name: "Wi-Fi 5 GHz Band", val: 5, from: "ghz", to: "mhz", desc: "Tactical drone link" },
      { name: "X-Band Radar (ASELSAN)", val: 10, from: "ghz", to: "hz", desc: "Fighter & SAR radar" },
      { name: "VHF Tactical Radio", val: 150, from: "mhz", to: "khz", desc: "NATO field voice" }
    ],
    units: {
      hz: { name: "Hertz", sym: "Hz", toBase: v => v, fromBase: v => v },
      khz: { name: "Kilohertz", sym: "kHz", toBase: v => v * 1000, fromBase: v => v / 1000 },
      mhz: { name: "Megahertz", sym: "MHz", toBase: v => v * 1e6, fromBase: v => v / 1e6 },
      ghz: { name: "Gigahertz", sym: "GHz", toBase: v => v * 1e9, fromBase: v => v / 1e9 },
      thz: { name: "Terahertz", sym: "THz", toBase: v => v * 1e12, fromBase: v => v / 1e12 },
      rpm: { name: "Revolutions / Min", sym: "RPM", toBase: v => v / 60, fromBase: v => v * 60 }
    }
  },

  // 8. CS:GO MOUSE eDPI & SENSITIVITY (True CS:GO Feature)
  csgo_sens: {
    title: "TACTICAL MOUSE eDPI & SENSITIVITY CONVERTER",
    desc: "Calculate True eDPI across CS:GO / CS2, Valorant, Overwatch & cm/360 Turn Distance",
    base: "edpi",
    formulaHint: "eDPI = In-Game Sensitivity × Mouse DPI (800 eDPI is Pro Average)",
    weapon: {
      name: "S1MPLE / ZYWOO SENSITIVITY CALIBRATOR",
      rarity: "COVERT",
      vel: "Crosshair Placement",
      award: "Victory",
      pen: "Pixel Perfect",
      range: "128 Tick",
      svg: `<svg viewBox="0 0 200 60" width="180" height="54" fill="currentColor">
              <circle cx="100" cy="30" r="20" fill="none" stroke="#5c9be6" stroke-width="2"/>
              <line x1="100" y1="5" x2="100" y2="55" stroke="#ea3c3c" stroke-width="1.5"/>
              <line x1="75" y1="30" x2="125" y2="30" stroke="#ea3c3c" stroke-width="1.5"/>
            </svg>`
    },
    presets: [
      { name: "s1mple (Fast Sens)", val: 1236, from: "edpi", to: "cm_360", desc: "400 DPI x 3.09 Sens" },
      { name: "ZywOo (Balanced)", val: 800, from: "edpi", to: "cm_360", desc: "400 DPI x 2.00 Sens" },
      { name: "NiKo (Ultra Precise)", val: 564, from: "edpi", to: "cm_360", desc: "400 DPI x 1.41 Sens" },
      { name: "Valorant Radiant 0.35", val: 800, from: "edpi", to: "sens_val", desc: "Valorant equivalent" }
    ],
    units: {
      edpi: { name: "CS:GO / CS2 eDPI", sym: "eDPI", toBase: v => v, fromBase: v => v },
      cm_360: { name: "Centimeters per 360° Turn", sym: "cm/360", toBase: v => (41560 / (v || 1)), fromBase: v => (41560 / (v || 1)) },
      inch_360: { name: "Inches per 360° Turn", sym: "in/360", toBase: v => (16362 / (v || 1)), fromBase: v => (16362 / (v || 1)) },
      sens_val: { name: "Valorant Sens (@800 DPI)", sym: "Val Sens", toBase: v => v * 3.181818 * 800, fromBase: v => (v / (800 * 3.181818)) },
      sens_ow: { name: "Overwatch Sens (@800 DPI)", sym: "OW Sens", toBase: v => (v * 10 / 3) * 800 * 0.3, fromBase: v => (v / 800) * 3.333 }
    }
  },

  // 9. CS:GO ECONOMY & LOSS BONUS
  csgo_economy: {
    title: "CS:GO ROUND ECONOMY & LOSS BONUS MATRIX",
    desc: "Calculate Team Buy Thresholds, Loss Bonus Streaks & Full Buy Reserves",
    base: "usd",
    formulaHint: "Max loss bonus = $3,400 (5 consecutive round losses)",
    weapon: {
      name: "T & CT BANK RESERVES",
      rarity: "TACTICAL",
      vel: "Economy Flow",
      award: "Max $16,000",
      pen: "Armor Deficit",
      range: "Full Buy: $4,750 CT",
      svg: `<svg viewBox="0 0 200 60" width="180" height="54" fill="currentColor">
              <text x="75" y="38" font-family="'Teko', sans-serif" font-size="36" fill="#ffd700">$16,000</text>
            </svg>`
    },
    presets: [
      { name: "CT Full Buy (M4+Kit+Armor+Nades)", val: 5500, from: "usd", to: "loss_3", desc: "Optimal defense buy" },
      { name: "T Full Buy (AK+Armor+Nades)", val: 4700, from: "usd", to: "loss_2", desc: "Optimal assault buy" },
      { name: "Deagle Force Buy", val: 1700, from: "usd", to: "usd", desc: "Deagle + Kevlar" },
      { name: "Max Money Cap", val: 16000, from: "usd", to: "usd", desc: "In-game hard cap" }
    ],
    units: {
      usd: { name: "In-Game Dollars ($)", sym: "$", toBase: v => v, fromBase: v => v },
      loss_1: { name: "1st Loss Bonus ($1400)", sym: "x L1", toBase: v => v * 1400, fromBase: v => v / 1400 },
      loss_2: { name: "2nd Loss Bonus ($1900)", sym: "x L2", toBase: v => v * 1900, fromBase: v => v / 1900 },
      loss_3: { name: "3rd Loss Bonus ($2400)", sym: "x L3", toBase: v => v * 2400, fromBase: v => v / 2400 },
      loss_4: { name: "4th Loss Bonus ($2900)", sym: "x L4", toBase: v => v * 2900, fromBase: v => v / 2900 },
      loss_max: { name: "Max Loss Bonus ($3400)", sym: "x L5", toBase: v => v * 3400, fromBase: v => v / 3400 }
    }
  }
};

// Application State & Controller
const App = {
  currentCategory: 'length',
  precision: 4,
  inputVal: 100,
  fromUnit: 'hammer',
  toUnit: 'm',
  roundSeconds: 105,

  init() {
    this.bindDomEvents();
    this.loadCategory('length');
    this.startRoundTimer();
  },

  startRoundTimer() {
    setInterval(() => {
      this.roundSeconds--;
      if (this.roundSeconds <= 0) this.roundSeconds = 115;
      const m = Math.floor(this.roundSeconds / 60);
      const s = this.roundSeconds % 60;
      const timerEl = document.getElementById('round-timer');
      if (timerEl) {
        timerEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
      }
    }, 1000);
  },

  bindDomEvents() {
    // Category Nav Tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        TacticalAudio.playSwitch();
        const cat = tab.getAttribute('data-cat');
        this.switchCategory(cat);
      });
    });

    // Keyboard Shortcuts 1-9 for quick category selection
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        const catKeys = Object.keys(CONVERSION_DATA);
        if (catKeys[num - 1]) {
          this.switchCategory(catKeys[num - 1]);
        }
      }
    });

    // Inputs & Selects
    const inputEl = document.getElementById('input-val');
    if (inputEl) {
      inputEl.addEventListener('input', (e) => {
        TacticalAudio.playBeep(450, 0.02);
        this.inputVal = parseFloat(e.target.value) || 0;
        this.recalculate();
      });
    }

    const selectFrom = document.getElementById('select-from');
    if (selectFrom) {
      selectFrom.addEventListener('change', (e) => {
        TacticalAudio.playSwitch();
        this.fromUnit = e.target.value;
        this.recalculate();
      });
    }

    const selectTo = document.getElementById('select-to');
    if (selectTo) {
      selectTo.addEventListener('change', (e) => {
        TacticalAudio.playSwitch();
        this.toUnit = e.target.value;
        this.recalculate();
      });
    }

    // Swap Button
    const swapBtn = document.getElementById('btn-swap');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        TacticalAudio.playHeadshot();
        const temp = this.fromUnit;
        this.fromUnit = this.toUnit;
        this.toUnit = temp;
        this.updateSelects();
        this.recalculate();
        this.showToast('⇄ Units swapped');
        this.logStatus('UNITS INVERTED');
      });
    }

    // Clear Button
    const clearBtn = document.getElementById('btn-clear');
    if (clearBtn && inputEl) {
      clearBtn.addEventListener('click', () => {
        TacticalAudio.playSwitch();
        inputEl.value = '0';
        this.inputVal = 0;
        this.recalculate();
        inputEl.focus();
      });
    }

    // Copy Button
    const copyBtn = document.getElementById('btn-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const out = document.getElementById('output-val')?.value || '';
        if (out) {
          navigator.clipboard.writeText(out).then(() => {
            TacticalAudio.playBeep(1100, 0.08);
            this.showToast(`📋 Copied: ${out}`);
            this.logStatus(`COPIED VALUE [${out}] TO CLIPBOARD`);
          }).catch(() => {
            // Fallback for older browsers
            this.showToast(`📋 Value: ${out}`);
          });
        }
      });
    }

    // Precision Buttons
    document.querySelectorAll('.prec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        TacticalAudio.playSwitch();
        document.querySelectorAll('.prec-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.precision = parseInt(btn.getAttribute('data-prec'), 10) || 4;
        this.recalculate();
      });
    });

    // Team Faction Switchers
    const ctBtn = document.getElementById('btn-team-ct');
    const tBtn = document.getElementById('btn-team-t');

    if (ctBtn) {
      ctBtn.addEventListener('click', () => {
        TacticalAudio.playSwitch();
        document.body.className = 'theme-ct';
        ctBtn.classList.add('active');
        if (tBtn) tBtn.classList.remove('active');
        this.logStatus('FACTION: COUNTER-TERRORIST (CT BLUE)');
      });
    }

    if (tBtn) {
      tBtn.addEventListener('click', () => {
        TacticalAudio.playSwitch();
        document.body.className = 'theme-t';
        tBtn.classList.add('active');
        if (ctBtn) ctBtn.classList.remove('active');
        this.logStatus('FACTION: TERRORIST (T AMBER)');
      });
    }

    // Audio Toggle
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        TacticalAudio.enabled = !TacticalAudio.enabled;
        soundToggle.innerHTML = TacticalAudio.enabled 
          ? '<span id="sound-icon">🔊</span> <span class="btn-text">SOUND: ON</span>' 
          : '<span id="sound-icon">🔇</span> <span class="btn-text">SOUND: OFF</span>';
        if (TacticalAudio.enabled) TacticalAudio.playSwitch();
      });
    }
  },

  switchCategory(catKey) {
    if (!CONVERSION_DATA[catKey]) return;
    this.currentCategory = catKey;

    // Update active tab styles
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-cat') === catKey);
    });

    this.loadCategory(catKey);
  },

  loadCategory(catKey) {
    const cat = CONVERSION_DATA[catKey];
    if (!cat) return;
    const unitKeys = Object.keys(cat.units);

    // Set default units
    this.fromUnit = unitKeys[0];
    this.toUnit = unitKeys[1] || unitKeys[0];

    // Update Headers
    const titleEl = document.getElementById('current-cat-title');
    const descEl = document.getElementById('current-cat-desc');
    const formulaEl = document.getElementById('formula-text');

    if (titleEl) titleEl.textContent = cat.title;
    if (descEl) descEl.textContent = cat.desc;
    if (formulaEl) formulaEl.textContent = cat.formulaHint || 'Linear Calibration';

    // Update Select Dropdowns
    this.updateSelects();

    // Update Presets Grid
    this.renderPresets(cat.presets || []);

    // Recalculate everything
    this.recalculate();
    this.logStatus(`CATEGORY CALIBRATED: ${cat.title}`);
  },

  updateSelects() {
    const cat = CONVERSION_DATA[this.currentCategory];
    if (!cat) return;

    const sFrom = document.getElementById('select-from');
    const sTo = document.getElementById('select-to');

    if (sFrom) sFrom.innerHTML = '';
    if (sTo) sTo.innerHTML = '';

    Object.entries(cat.units).forEach(([key, u]) => {
      if (sFrom) {
        const optFrom = document.createElement('option');
        optFrom.value = key;
        optFrom.textContent = `${u.name} (${u.sym})`;
        if (key === this.fromUnit) optFrom.selected = true;
        sFrom.appendChild(optFrom);
      }

      if (sTo) {
        const optTo = document.createElement('option');
        optTo.value = key;
        optTo.textContent = `${u.name} (${u.sym})`;
        if (key === this.toUnit) optTo.selected = true;
        sTo.appendChild(optTo);
      }
    });

    const fromCode = document.getElementById('from-unit-code');
    const toCode = document.getElementById('to-unit-code');
    if (fromCode) fromCode.textContent = cat.units[this.fromUnit]?.sym || '';
    if (toCode) toCode.textContent = cat.units[this.toUnit]?.sym || '';
  },

  recalculate() {
    const cat = CONVERSION_DATA[this.currentCategory];
    if (!cat) return;
    const uFrom = cat.units[this.fromUnit];
    const uTo = cat.units[this.toUnit];

    if (!uFrom || !uTo) return;

    // Step 1: Convert input to base unit
    const baseVal = uFrom.toBase(this.inputVal);

    // Step 2: Convert base to target unit
    const converted = uTo.fromBase(baseVal);

    // Format output with active precision
    const outStr = Number.isInteger(converted) && Math.abs(converted) < 1e9
      ? converted.toString()
      : converted.toFixed(this.precision);

    const outEl = document.getElementById('output-val');
    if (outEl) outEl.value = outStr;

    const fromCode = document.getElementById('from-unit-code');
    const toCode = document.getElementById('to-unit-code');
    if (fromCode) fromCode.textContent = uFrom.sym;
    if (toCode) toCode.textContent = uTo.sym;

    // Step 3: Populate Multi-Unit Live Spread Matrix
    this.renderSpreadMatrix(baseVal);
  },

  renderSpreadMatrix(baseVal) {
    const cat = CONVERSION_DATA[this.currentCategory];
    const grid = document.getElementById('matrix-grid');
    if (!grid || !cat) return;
    grid.innerHTML = '';

    Object.entries(cat.units).forEach(([key, u]) => {
      const val = u.fromBase(baseVal);
      const isTarget = key === this.toUnit;

      const card = document.createElement('div');
      card.className = `matrix-card ${isTarget ? 'is-active-target' : ''}`;
      card.title = `Click to set ${u.name} as target unit`;

      const valStr = Math.abs(val) < 0.0001 && val !== 0
        ? val.toExponential(3)
        : (Number.isInteger(val) ? val.toString() : val.toFixed(this.precision));

      card.innerHTML = `
        <span class="matrix-card-unit">${u.name}</span>
        <div class="matrix-card-val">${valStr}<span class="matrix-card-sym">${u.sym}</span></div>
      `;

      card.addEventListener('click', () => {
        TacticalAudio.playSwitch();
        this.toUnit = key;
        const sTo = document.getElementById('select-to');
        if (sTo) sTo.value = key;
        this.recalculate();
      });

      grid.appendChild(card);
    });
  },

  renderPresets(presets) {
    const container = document.getElementById('preset-buttons');
    if (!container) return;
    container.innerHTML = '';

    presets.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'preset-btn';
      btn.innerHTML = `
        <strong>${p.name}</strong>
        <span class="p-desc">${p.desc || ''}</span>
      `;

      btn.addEventListener('click', () => {
        TacticalAudio.playHeadshot();
        this.inputVal = p.val;
        const inputEl = document.getElementById('input-val');
        if (inputEl) inputEl.value = p.val;

        if (p.from) {
          this.fromUnit = p.from;
          const sFrom = document.getElementById('select-from');
          if (sFrom) sFrom.value = p.from;
        }
        if (p.to) {
          this.toUnit = p.to;
          const sTo = document.getElementById('select-to');
          if (sTo) sTo.value = p.to;
        }

        this.recalculate();
        this.showToast(`Preset: ${p.name}`);
        this.logStatus(`PRESET LOADED: [${p.name}] = ${p.val}`);
      });

      container.appendChild(btn);
    });
  },

  logStatus(msg) {
    const el = document.getElementById('status-log');
    if (el) el.textContent = `> ${msg}`;
  },

  showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 200);
    }, 2200);
  }
};

// Start App upon DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

