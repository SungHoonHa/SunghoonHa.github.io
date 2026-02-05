import createGlobe from "https://cdn.skypack.dev/cobe";

const canvas = document.getElementById("travel-globe-canvas");
if (!canvas) {
  console.debug("[travel-globe] canvas not found, skip.");
} else {
  const REGION = {
    ASIA: "Asia",
    EUROPE: "Europe",
    OCEANIA: "Oceania",
    NORTH_AMERICA: "North America",
  };

  const regionColor = {
    [REGION.ASIA]: [0.20, 0.85, 0.85],         // mint
    [REGION.EUROPE]: [1.00, 0.35, 0.60],       // pink
    [REGION.OCEANIA]: [0.45, 0.75, 1.00],      // sky
    [REGION.NORTH_AMERICA]: [1.00, 0.80, 0.25] // amber
  };

  const places = [
    { region: REGION.ASIA, country: "Korea", city: "Seoul", lat: 37.5665, lon: 126.9780 },
    { region: REGION.ASIA, country: "Japan", city: "Tokyo", lat: 35.6762, lon: 139.6503 },
    { region: REGION.ASIA, country: "Japan", city: "Osaka", lat: 34.6937, lon: 135.5023 },
    { region: REGION.ASIA, country: "Japan", city: "Fukuoka", lat: 33.5904, lon: 130.4017 },
    { region: REGION.ASIA, country: "China", city: "Beijing", lat: 39.9042, lon: 116.4074 },
    { region: REGION.ASIA, country: "China", city: "Hong Kong", lat: 22.3193, lon: 114.1694 },
    { region: REGION.ASIA, country: "Vietnam", city: "Hanoi", lat: 21.0278, lon: 105.8342 },
    { region: REGION.ASIA, country: "Vietnam", city: "Da Lat", lat: 11.9383, lon: 108.4363 },
    { region: REGION.ASIA, country: "Vietnam", city: "Ho Chi Minh", lat: 10.8231, lon: 106.6297 },
    { region: REGION.ASIA, country: "Laos", city: "Luang Prabang", lat: 19.8840, lon: 102.1350 },
    { region: REGION.ASIA, country: "Laos", city: "Vang Vieng", lat: 18.9500, lon: 102.4437 },
    { region: REGION.ASIA, country: "Laos", city: "Vientiane", lat: 17.9757, lon: 102.6331 },
    { region: REGION.ASIA, country: "Thailand", city: "Bangkok", lat: 13.7563, lon: 100.5018 },
    { region: REGION.ASIA, country: "Philippines", city: "Bohol", lat: 9.8333, lon: 124.1666 },
    { region: REGION.ASIA, country: "Taiwan", city: "Taipei", lat: 25.0330, lon: 121.5654 },
    { region: REGION.ASIA, country: "Malaysia", city: "Kuala Lumpur", lat: 3.1390, lon: 101.6869 },
    { region: REGION.ASIA, country: "Singapore", city: "Singapore", lat: 1.3521, lon: 103.8198 },
    { region: REGION.ASIA, country: "Indonesia", city: "Bali", lat: -8.4095, lon: 115.1889 },
    { region: REGION.EUROPE, country: "Germany", city: "Berlin", lat: 52.5200, lon: 13.4050 },
    { region: REGION.EUROPE, country: "United Kingdom", city: "London", lat: 51.5074, lon: -0.1278 },
    { region: REGION.EUROPE, country: "France", city: "Paris", lat: 48.8566, lon: 2.3522 },
    { region: REGION.EUROPE, country: "Spain", city: "Madrid", lat: 40.4168, lon: -3.7038 },
    { region: REGION.EUROPE, country: "Portugal", city: "Lisbon", lat: 38.7223, lon: -9.1393 },
    { region: REGION.EUROPE, country: "Italy", city: "Rome", lat: 41.9028, lon: 12.4964 },
    { region: REGION.EUROPE, country: "Switzerland", city: "Bern", lat: 46.9480, lon: 7.4474 },
    { region: REGION.EUROPE, country: "Austria", city: "Vienna", lat: 48.2082, lon: 16.3738 },
    { region: REGION.EUROPE, country: "Hungary", city: "Budapest", lat: 47.4979, lon: 19.0402 },
    { region: REGION.EUROPE, country: "Lithuania", city: "Vilnius", lat: 54.6872, lon: 25.2797 },
    { region: REGION.EUROPE, country: "Latvia", city: "Riga", lat: 56.9496, lon: 24.1052 },
    { region: REGION.EUROPE, country: "Estonia", city: "Tallinn", lat: 59.4370, lon: 24.7536 },
    { region: REGION.EUROPE, country: "Czechia", city: "Prague", lat: 50.0755, lon: 14.4378 },
    { region: REGION.EUROPE, country: "Croatia", city: "Zagreb", lat: 45.8150, lon: 15.9819 },
    { region: REGION.EUROPE, country: "Serbia", city: "Belgrade", lat: 44.7866, lon: 20.4489 },
    { region: REGION.EUROPE, country: "Romania", city: "Bucharest", lat: 44.4268, lon: 26.1025 },
    { region: REGION.EUROPE, country: "Slovakia", city: "Bratislava", lat: 48.1486, lon: 17.1077 },
    { region: REGION.OCEANIA, country: "Australia", city: "Sydney", lat: -33.8688, lon: 151.2093 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "New York", lat: 40.7128, lon: -74.0060 },
  ];

  const markerSizeByRegion = { [REGION.ASIA]: 0.075, [REGION.EUROPE]: 0.068, [REGION.OCEANIA]: 0.075, [REGION.NORTH_AMERICA]: 0.075 };
  const markers = places.map(p => ({ location: [p.lat, p.lon], size: markerSizeByRegion[p.region] ?? 0.07, color: regionColor[p.region] }));

  const elStats = document.getElementById("travel-stats");
  const elLegend = document.getElementById("travel-legend");
  const chipTargets = { [REGION.ASIA]: document.getElementById("chips-asia"), [REGION.EUROPE]: document.getElementById("chips-europe"), [REGION.OCEANIA]: document.getElementById("chips-oceania"), [REGION.NORTH_AMERICA]: document.getElementById("chips-northamerica") };

  function uniq(arr) { return Array.from(new Set(arr)); }
  function rgbToCss(rgb) { const [r, g, b] = rgb.map(v => Math.round(v * 255)); return `rgb(${r}, ${g}, ${b})`; }

  function buildUI() {
    const allCountries = uniq(places.map(p => p.country));
    const regionCountries = (r) => uniq(places.filter(p => p.region === r).map(p => p.country));
    if (elStats) elStats.textContent = `Visited: ${allCountries.length} countries (Asia ${regionCountries(REGION.ASIA).length} / Europe ${regionCountries(REGION.EUROPE).length} / Oceania ${regionCountries(REGION.OCEANIA).length} / North America ${regionCountries(REGION.NORTH_AMERICA).length})`;
    
    if (elLegend) {
      elLegend.innerHTML = "";
      Object.values(REGION).forEach(r => {
        const item = document.createElement("div"); item.className = "legend-item";
        const dot = document.createElement("span"); dot.className = "legend-dot"; dot.style.background = rgbToCss(regionColor[r]);
        const label = document.createElement("span"); label.textContent = r;
        item.append(dot, label); elLegend.appendChild(item);
      });
    }

    Object.values(REGION).forEach(r => {
      const target = chipTargets[r]; if (!target) return;
      const items = places.filter(p => p.region === r).map(p => ({ label: `${p.country} — ${p.city}`, region: p.region })).sort((a, b) => a.label.localeCompare(b.label));
      items.forEach(it => {
        const chip = document.createElement("span"); chip.className = "chip";
        const dot = document.createElement("span"); dot.className = "chip-dot"; dot.style.background = rgbToCss(regionColor[it.region]);
        const text = document.createElement("span"); text.textContent = it.label;
        chip.append(dot, text); target.appendChild(chip);
      });
    });
  }

  buildUI();

  let width = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  const container = canvas.parentElement;
  const ro = new ResizeObserver(() => { if (container) { width = container.getBoundingClientRect().width; } });
  ro.observe(container);

  let pointerDown = false, lastX = 0, lastY = 0, phi = 0, theta = 0.25, autoSpin = 0.003, spinBoost = 0;
  canvas.addEventListener("pointerdown", (e) => { pointerDown = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointerup", (e) => { pointerDown = false; canvas.releasePointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", (e) => {
    if (!pointerDown) return;
    phi += (e.clientX - lastX) * 0.005;
    theta = Math.max(-1.2, Math.min(1.2, theta + (e.clientY - lastY) * 0.003));
    lastX = e.clientX; lastY = e.clientY; spinBoost = (e.clientX - lastX) * 0.0006;
  });

  const globe = createGlobe(canvas, {
    devicePixelRatio: dpr, width: 1000, height: 1000, phi: 0, theta, dark: 0, diffuse: 1.2, mapSamples: 16000, mapBrightness: 6,
    baseColor: [0.14, 0.16, 0.20], glowColor: [1, 1, 1], markerColor: [1, 1, 1], markers,
    onRender: (state) => {
      state.width = Math.floor(width * dpr); state.height = Math.floor(width * dpr);
      phi += autoSpin + spinBoost; spinBoost *= 0.92;
      state.phi = phi; state.theta = theta;
    },
  });
  window.addEventListener("beforeunload", () => { ro.disconnect(); globe.destroy(); });
}
