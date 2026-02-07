import createGlobe from "https://cdn.skypack.dev/cobe";

const canvas = document.getElementById("travel-globe-canvas");
if (canvas) {
  const container = canvas.parentElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const REGION = { ASIA: "Asia", EUROPE: "Europe", OCEANIA: "Oceania", NORTH_AMERICA: "North America" };
  const regionColor = {
    [REGION.ASIA]: [0.20, 0.85, 0.85], 
    [REGION.EUROPE]: [1.00, 0.35, 0.60],
    [REGION.OCEANIA]: [0.45, 0.75, 1.00], 
    [REGION.NORTH_AMERICA]: [1.00, 0.80, 0.25]
  };

  const places = [
    // --- Professional Experience (from Resume) ---
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Detroit (GM Tech Day)", lat: 42.33, lon: -83.04 }, // [cite: 17]
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Las Vegas (UNLV)", lat: 36.17, lon: -115.13 }, // [cite: 23]
    { region: REGION.ASIA, country: "Korea", city: "Goyang-si (KAU)", lat: 37.64, lon: 126.83 }, // [cite: 4]
    
    // --- Major Road Trip Stops ---
    { region: REGION.NORTH_AMERICA, country: "USA", city: "New York", lat: 40.71, lon: -74.00 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Chicago", lat: 41.87, lon: -87.62 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "San Francisco", lat: 37.77, lon: -122.41 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Boston", lat: 42.36, lon: -71.05 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "West Lafayette", lat: 40.42, lon: -86.91 },
    
    // --- Asia & Europe ---
    { region: REGION.ASIA, country: "Japan", city: "Tokyo", lat: 35.67, lon: 139.65 },
    { region: REGION.EUROPE, country: "Germany", city: "Berlin", lat: 52.52, lon: 13.40 },
    { region: REGION.EUROPE, country: "France", city: "Paris", lat: 48.85, lon: 2.35 }
  ];

  const markers = places.map(p => ({ location: [p.lat, p.lon], size: 0.07, color: regionColor[p.region] }));

  // 통계 업데이트
  const elStats = document.getElementById("travel-stats");
  if (elStats) elStats.textContent = `Visited ${new Set(places.map(p => p.country)).size} countries across 4 continents.`;

  // 범례(Legend) 생성
  const elLegend = document.getElementById("travel-legend");
  if (elLegend) {
    elLegend.innerHTML = Object.entries(REGION).map(([k, v]) => 
      `<div class="legend-item"><span class="legend-dot" style="background:rgb(${regionColor[v].map(x=>Math.round(x*255))})"></span>${v}</div>`
    ).join("");
  }

  // 초기 크기 설정 (0이 되지 않도록 보정)
  let width = container.offsetWidth || 500;
  let phi = 0, theta = 0.25, pointerDown = false, lastX = 0;

  const globe = createGlobe(canvas, {
    devicePixelRatio: dpr,
    width: width * dpr,
    height: width * dpr,
    phi: 0, theta: 0.25, dark: 0, diffuse: 1.2, mapSamples: 16000, mapBrightness: 6,
    baseColor: [0.14, 0.16, 0.20], glowColor: [1, 1, 1], markers,
    onRender: (state) => {
      state.width = width * dpr; state.height = width * dpr;
      if (!pointerDown) phi += 0.003;
      state.phi = phi;
    }
  });

  // 드래그 제어
  canvas.addEventListener('pointerdown', e => { pointerDown = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  window.addEventListener('pointerup', () => pointerDown = false);
  window.addEventListener('pointermove', e => { if (pointerDown) { phi += (e.clientX - lastX) * 0.005; lastX = e.clientX; } });

  // 화면 크기 변화 감지
  const ro = new ResizeObserver(() => { if (container.offsetWidth > 0) width = container.offsetWidth; });
  ro.observe(container);
}
