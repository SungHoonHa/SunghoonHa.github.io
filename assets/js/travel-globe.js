import createGlobe from "https://cdn.skypack.dev/cobe";

const canvas = document.getElementById("travel-globe-canvas");
if (canvas) {
  const REGION = { ASIA: "Asia", EUROPE: "Europe", OCEANIA: "Oceania", NORTH_AMERICA: "North America" };
  const regionColor = {
    [REGION.ASIA]: [0.20, 0.85, 0.85], [REGION.EUROPE]: [1.00, 0.35, 0.60],
    [REGION.OCEANIA]: [0.45, 0.75, 1.00], [REGION.NORTH_AMERICA]: [1.00, 0.80, 0.25]
  };

  const places = [
    // --- Asia ---
    { region: REGION.ASIA, country: "Korea", city: "Seoul/Goyang", lat: 37.56, lon: 126.97 }, //
    { region: REGION.ASIA, country: "Japan", city: "Tokyo", lat: 35.67, lon: 139.65 },
    { region: REGION.ASIA, country: "Vietnam", city: "Hanoi", lat: 21.02, lon: 105.83 },

    // --- North America (Road Trip & Professional) ---
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Detroit, MI", lat: 42.33, lon: -83.04 }, // GM Tech Day
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Las Vegas, NV", lat: 36.17, lon: -115.13 }, // UNLV Intern
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Chicago, IL", lat: 41.87, lon: -87.62 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "New York, NY", lat: 40.71, lon: -74.00 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "San Francisco, CA", lat: 37.77, lon: -122.41 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "West Lafayette, IN", lat: 40.42, lon: -86.91 },
    // ... (이전의 60여 개 로드트립 좌표들을 여기에 유지하세요)
  ];

  const markers = places.map(p => ({ location: [p.lat, p.lon], size: 0.07, color: regionColor[p.region] }));

  // Stats & Legend
  const elStats = document.getElementById("travel-stats");
  const elLegend = document.getElementById("travel-legend");
  if (elStats) elStats.textContent = `Explored ${new Set(places.map(p => p.country)).size} countries across 4 continents.`;
  if (elLegend) {
    elLegend.innerHTML = Object.entries(REGION).map(([k, v]) => 
      `<div class="legend-item"><span class="legend-dot" style="background:rgb(${regionColor[v].map(x=>Math.round(x*255))})"></span>${v}</div>`
    ).join("");
  }

  // Globe Render Logic
  let width = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  const container = canvas.parentElement;
  
  const updateSize = () => {
    width = container.offsetWidth;
    if (width > 0) {
      state.width = width * dpr;
      state.height = width * dpr;
    }
  };

  let phi = 0, theta = 0.25, pointerDown = false, lastX = 0, lastY = 0;
  canvas.addEventListener('pointerdown', e => { pointerDown = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  window.addEventListener('pointerup', () => pointerDown = false);
  window.addEventListener('pointermove', e => {
    if (pointerDown) { phi += (e.clientX - lastX) * 0.005; lastX = e.clientX; }
  });

  const state = {
    devicePixelRatio: dpr, width: 1000, height: 1000, phi: 0, theta: 0.25, dark: 0, diffuse: 1.2, mapSamples: 16000, mapBrightness: 6,
    baseColor: [0.14, 0.16, 0.20], glowColor: [1, 1, 1], markers,
    onRender: (s) => {
      if (!pointerDown) phi += 0.003;
      s.phi = phi;
    }
  };

  const globe = createGlobe(canvas, state);
  const ro = new ResizeObserver(updateSize);
  ro.observe(container);
}
