import createGlobe from "https://cdn.skypack.dev/cobe";

const canvas = document.getElementById("travel-globe-canvas");
if (canvas) {
  const container = canvas.parentElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const REGION = { ASIA: "Asia", EUROPE: "Europe", OCEANIA: "Oceania", NORTH_AMERICA: "North America" };
  const regionColor = {
    [REGION.ASIA]: [0.20, 0.85, 0.85], [REGION.EUROPE]: [1.00, 0.35, 0.60],
    [REGION.OCEANIA]: [0.45, 0.75, 1.00], [REGION.NORTH_AMERICA]: [1.00, 0.80, 0.25]
  };

  const places = [
    // --- Asia (image_dd89e1.png 기준) ---
    { region: REGION.ASIA, country: "Korea", city: "Seoul", lat: 37.56, lon: 126.97 },
    { region: REGION.ASIA, country: "China", city: "Beijing", lat: 39.90, lon: 116.40 },
    { region: REGION.ASIA, country: "China", city: "Hong Kong", lat: 22.31, lon: 114.16 },
    { region: REGION.ASIA, country: "Japan", city: "Tokyo", lat: 35.67, lon: 139.65 },
    { region: REGION.ASIA, country: "Japan", city: "Osaka", lat: 34.69, lon: 135.50 },
    { region: REGION.ASIA, country: "Japan", city: "Fukuoka", lat: 33.59, lon: 130.40 },
    { region: REGION.ASIA, country: "Vietnam", city: "Hanoi", lat: 21.02, lon: 105.83 },
    { region: REGION.ASIA, country: "Vietnam", city: "Da Lat", lat: 11.93, lon: 108.43 },
    { region: REGION.ASIA, country: "Vietnam", city: "Ho Chi Minh", lat: 10.82, lon: 106.62 },
    { region: REGION.ASIA, country: "Thailand", city: "Bangkok", lat: 13.75, lon: 100.50 },
    { region: REGION.ASIA, country: "Singapore", city: "Singapore", lat: 1.35, lon: 103.81 },
    { region: REGION.ASIA, country: "Malaysia", city: "Kuala Lumpur", lat: 3.13, lon: 101.68 },
    { region: REGION.ASIA, country: "Indonesia", city: "Bali", lat: -8.40, lon: 115.18 },
    { region: REGION.ASIA, country: "Laos", city: "Vientiane", lat: 17.97, lon: 102.63 },
    { region: REGION.ASIA, country: "Philippines", city: "Bohol", lat: 9.83, lon: 124.16 },
    { region: REGION.ASIA, country: "Taiwan", city: "Taipei", lat: 25.03, lon: 121.56 },

    // --- Europe (image_dd89e1.png 기준) ---
    { region: REGION.EUROPE, country: "Germany", city: "Berlin", lat: 52.52, lon: 13.40 },
    { region: REGION.EUROPE, country: "France", city: "Paris", lat: 48.85, lon: 2.35 },
    { region: REGION.EUROPE, country: "UK", city: "London", lat: 51.50, lon: -0.12 },
    { region: REGION.EUROPE, country: "Italy", city: "Rome", lat: 41.90, lon: 12.49 },
    { region: REGION.EUROPE, country: "Spain", city: "Madrid", lat: 40.41, lon: -3.70 },
    { region: REGION.EUROPE, country: "Austria", city: "Vienna", lat: 48.20, lon: 16.37 },
    { region: REGION.EUROPE, country: "Switzerland", city: "Bern", lat: 46.94, lon: 7.44 },
    { region: REGION.EUROPE, country: "Czechia", city: "Prague", lat: 50.07, lon: 14.43 },
    { region: REGION.EUROPE, country: "Hungary", city: "Budapest", lat: 47.49, lon: 19.04 },

    // --- North America (US Road Trip 핵심 거점) ---
    { region: REGION.NORTH_AMERICA, country: "USA", city: "New York", lat: 40.71, lon: -74.00 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Detroit", lat: 42.33, lon: -83.04 }, // GM [cite: 17]
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Chicago", lat: 41.87, lon: -87.62 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Las Vegas", lat: 36.17, lon: -115.13 }, // UNLV [cite: 23]
    { region: REGION.NORTH_AMERICA, country: "USA", city: "San Francisco", lat: 37.77, lon: -122.41 },
    
    // --- Oceania ---
    { region: REGION.OCEANIA, country: "Australia", city: "Sydney", lat: -33.86, lon: 151.20 }
  ];

  const markers = places.map(p => ({ location: [p.lat, p.lon], size: 0.07, color: regionColor[p.region] }));

  // 카운트 계산: 나라(country) 이름을 중복 제거하여 계산합니다.
  const uniqueCountries = new Set(places.map(p => p.country)).size;
  const elStats = document.getElementById("travel-stats");
  if (elStats) elStats.textContent = `Explored ${uniqueCountries} countries across 4 continents.`;

  const elLegend = document.getElementById("travel-legend");
  if (elLegend) {
    elLegend.innerHTML = Object.entries(REGION).map(([k, v]) => 
      `<div class="legend-item"><span class="legend-dot" style="background:rgb(${regionColor[v].map(x=>Math.round(x*255))})"></span>${v}</div>`
    ).join("");
  }

  let width = container.offsetWidth || 500;
  let phi = 0, theta = 0.25, pointerDown = false, lastX = 0;

  const globe = createGlobe(canvas, {
    devicePixelRatio: dpr, width: width * dpr, height: width * dpr,
    phi: 0, theta: 0.25, dark: 0, diffuse: 1.2, mapSamples: 16000, mapBrightness: 6,
    baseColor: [0.14, 0.16, 0.20], glowColor: [1, 1, 1], markers,
    onRender: (state) => {
      state.width = width * dpr; state.height = width * dpr;
      if (!pointerDown) phi += 0.003;
      state.phi = phi;
    }
  });

  canvas.addEventListener('pointerdown', e => { pointerDown = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  window.addEventListener('pointerup', () => pointerDown = false);
  window.addEventListener('pointermove', e => { if (pointerDown) { phi += (e.clientX - lastX) * 0.005; lastX = e.clientX; } });

  const ro = new ResizeObserver(() => { if (container.offsetWidth > 0) width = container.offsetWidth; });
  ro.observe(container);
}
