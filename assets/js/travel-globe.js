import createGlobe from "https://cdn.skypack.dev/cobe";

const canvas = document.getElementById("travel-globe-canvas");
if (canvas) {
  const REGION = { ASIA: "Asia", EUROPE: "Europe", OCEANIA: "Oceania", NORTH_AMERICA: "North America" };
  const regionColor = {
    [REGION.ASIA]: [0.20, 0.85, 0.85], [REGION.EUROPE]: [1.00, 0.35, 0.60],
    [REGION.OCEANIA]: [0.45, 0.75, 1.00], [REGION.NORTH_AMERICA]: [1.00, 0.80, 0.25]
  };

  const places = [
    // --- Asia & Europe (Existing Data) ---
    { region: REGION.ASIA, country: "Korea", city: "Seoul", lat: 37.56, lon: 126.97 },
    { region: REGION.ASIA, country: "Japan", city: "Tokyo", lat: 35.67, lon: 139.65 },
    { region: REGION.ASIA, country: "Japan", city: "Osaka", lat: 34.69, lon: 135.50 },
    { region: REGION.ASIA, country: "China", city: "Beijing", lat: 39.90, lon: 116.40 },
    { region: REGION.ASIA, country: "Vietnam", city: "Hanoi", lat: 21.02, lon: 105.83 },
    { region: REGION.EUROPE, country: "Germany", city: "Berlin", lat: 52.52, lon: 13.40 },
    { region: REGION.EUROPE, country: "France", city: "Paris", lat: 48.85, lon: 2.35 },
    { region: REGION.EUROPE, country: "UK", city: "London", lat: 51.50, lon: -0.12 },

    // --- North America: 60-Pin Road Trip Expansion ---
    { region: REGION.NORTH_AMERICA, country: "USA", city: "West Quoddy, ME", lat: 44.81, lon: -66.95 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Manchester, NH", lat: 42.99, lon: -71.45 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Boston, MA", lat: 42.36, lon: -71.05 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Providence, RI", lat: 41.82, lon: -71.41 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "New Haven, CT", lat: 41.30, lon: -72.92 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "New York, NY", lat: 40.71, lon: -74.00 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Princeton, NJ", lat: 40.34, lon: -74.65 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Philadelphia, PA", lat: 39.95, lon: -75.16 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Washington D.C.", lat: 38.90, lon: -77.03 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Richmond, VA", lat: 37.54, lon: -77.43 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Pittsburgh, PA", lat: 40.44, lon: -79.99 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Columbus, OH", lat: 39.96, lon: -82.99 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Indianapolis, IN", lat: 39.76, lon: -86.15 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "West Lafayette, IN", lat: 40.42, lon: -86.90 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Chicago, IL", lat: 41.87, lon: -87.62 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Des Moines, IA", lat: 41.58, lon: -93.62 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Omaha, NE", lat: 41.25, lon: -95.93 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Sidney, NE", lat: 41.14, lon: -102.97 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Denver, CO", lat: 39.73, lon: -104.99 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Vail, CO", lat: 39.64, lon: -106.37 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Moab, UT", lat: 38.57, lon: -109.54 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Las Vegas, NV", lat: 36.16, lon: -115.13 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Grand Canyon, AZ", lat: 36.05, lon: -112.10 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Phoenix, AZ", lat: 33.44, lon: -112.07 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "San Francisco, CA", lat: 37.77, lon: -122.41 },
    { region: REGION.NORTH_AMERICA, country: "USA", city: "Berkeley, CA", lat: 37.87, lon: -122.27 }
  ];

  const markers = places.map(p => ({ location: [p.lat, p.lon], size: 0.07, color: regionColor[p.region] }));

  // UI 초기화 (Stats & Legend)
  const elStats = document.getElementById("travel-stats");
  const elLegend = document.getElementById("travel-legend");
  if (elStats) elStats.textContent = `Visited: ${new Set(places.map(p => p.country)).size} countries across 4 continents.`;
  if (elLegend) {
    elLegend.innerHTML = Object.entries(REGION).map(([k, v]) => 
      `<div class="legend-item"><span class="legend-dot" style="background:rgb(${regionColor[v].map(x=>Math.round(x*255))})"></span>${v}</div>`
    ).join("");
  }

  // Globe Render
  let width = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  const container = canvas.parentElement;
  const ro = new ResizeObserver(() => width = container.offsetWidth);
  ro.observe(container);

  let phi = 0, theta = 0.25, pointerDown = false, lastX = 0, lastY = 0;
  canvas.addEventListener('pointerdown', e => { pointerDown = true; lastX = e.clientX; lastY = e.clientY; });
  window.addEventListener('pointerup', () => pointerDown = false);
  window.addEventListener('pointermove', e => {
    if (pointerDown) { phi += (e.clientX - lastX) * 0.005; theta += (e.clientY - lastY) * 0.003; lastX = e.clientX; lastY = e.clientY; }
  });

  const globe = createGlobe(canvas, {
    devicePixelRatio: dpr, width: 1000, height: 1000, phi: 0, theta: 0.25, dark: 0, diffuse: 1.2, mapSamples: 16000, mapBrightness: 6,
    baseColor: [0.14, 0.16, 0.20], glowColor: [1, 1, 1], markers,
    onRender: (state) => {
      state.width = width * dpr; state.height = width * dpr;
      if (!pointerDown) phi += 0.003;
      state.phi = phi; state.theta = theta;
    }
  });
}
