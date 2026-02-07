// ✅ jsDelivr dist ESM 대신 esm.sh 사용 (phenomenon 의존성 자동 해결)
import createGlobe from "https://esm.sh/cobe@0.6.5?bundle";

const canvas = document.getElementById("travel-globe-canvas");
const elStats = document.getElementById("travel-stats");
const elLegend = document.getElementById("travel-legend");

if (!canvas) {
  console.debug("[travel-globe] canvas not found (skip)");
} else {
  try {
    const REGION = {
      ASIA: "Asia",
      EUROPE: "Europe",
      OCEANIA: "Oceania",
      NORTH_AMERICA: "North America",
    };

    const regionColor = {
      [REGION.ASIA]: [0.20, 0.85, 0.85],
      [REGION.EUROPE]: [1.00, 0.35, 0.60],
      [REGION.OCEANIA]: [0.45, 0.75, 1.00],
      [REGION.NORTH_AMERICA]: [1.00, 0.80, 0.25],
    };

    const places = [
      // --- Asia ---
      { region: REGION.ASIA, country: "Korea", city: "Seoul", lat: 37.56, lon: 126.97 },
      { region: REGION.ASIA, country: "Japan", city: "Tokyo", lat: 35.67, lon: 139.65 },
      { region: REGION.ASIA, country: "Japan", city: "Osaka", lat: 34.69, lon: 135.50 },
      { region: REGION.ASIA, country: "China", city: "Beijing", lat: 39.90, lon: 116.40 },
      { region: REGION.ASIA, country: "China", city: "Hong Kong", lat: 22.3193, lon: 114.1694 },
      { region: REGION.ASIA, country: "Vietnam", city: "Hanoi", lat: 21.02, lon: 105.83 },
      { region: REGION.ASIA, country: "Vietnam", city: "Ho Chi Minh", lat: 10.8231, lon: 106.6297 },
      { region: REGION.ASIA, country: "Thailand", city: "Bangkok", lat: 13.7563, lon: 100.5018 },
      { region: REGION.ASIA, country: "Taiwan", city: "Taipei", lat: 25.0330, lon: 121.5654 },
      { region: REGION.ASIA, country: "Malaysia", city: "Kuala Lumpur", lat: 3.1390, lon: 101.6869 },
      { region: REGION.ASIA, country: "Singapore", city: "Singapore", lat: 1.3521, lon: 103.8198 },
      { region: REGION.ASIA, country: "Indonesia", city: "Bali", lat: -8.409518, lon: 115.188919 },

      // --- Europe (대표 도시) ---
      { region: REGION.EUROPE, country: "Germany", city: "Berlin", lat: 52.52, lon: 13.40 },
      { region: REGION.EUROPE, country: "France", city: "Paris", lat: 48.85, lon: 2.35 },
      { region: REGION.EUROPE, country: "United Kingdom", city: "London", lat: 51.50, lon: -0.12 },
      { region: REGION.EUROPE, country: "Spain", city: "Madrid", lat: 40.4168, lon: -3.7038 },
      { region: REGION.EUROPE, country: "Portugal", city: "Lisbon", lat: 38.7223, lon: -9.1393 },
      { region: REGION.EUROPE, country: "Italy", city: "Rome", lat: 41.9028, lon: 12.4964 },

      // --- Oceania / North America ---
      { region: REGION.OCEANIA, country: "Australia", city: "Sydney", lat: -33.8688, lon: 151.2093 },
      { region: REGION.NORTH_AMERICA, country: "USA", city: "New York, NY", lat: 40.71, lon: -74.00 },
      { region: REGION.NORTH_AMERICA, country: "USA", city: "San Francisco, CA", lat: 37.77, lon: -122.41 },
      { region: REGION.NORTH_AMERICA, country: "USA", city: "Berkeley, CA", lat: 37.87, lon: -122.27 },
    ];

    const markers = places.map(p => ({
      location: [p.lat, p.lon],
      size: 0.07,
      color: regionColor[p.region],
    }));

    // UI
    const uniq = (arr) => Array.from(new Set(arr));
    const totalCountries = uniq(places.map(p => p.country)).length;
    const perRegion = (r) => uniq(places.filter(p => p.region === r).map(p => p.country)).length;

    if (elStats) {
      elStats.textContent =
        `Visited: ${totalCountries} countries (Asia ${perRegion(REGION.ASIA)} / Europe ${perRegion(REGION.EUROPE)} / Oceania ${perRegion(REGION.OCEANIA)} / North America ${perRegion(REGION.NORTH_AMERICA)})`;
    }

    const rgbCss = (rgb) => {
      const [r, g, b] = rgb.map(x => Math.round(x * 255));
      return `rgb(${r}, ${g}, ${b})`;
    };

    if (elLegend) {
      elLegend.innerHTML = Object.values(REGION).map((name) => {
        const c = rgbCss(regionColor[name]);
        return `<div class="legend-item"><span class="legend-dot" style="background:${c}"></span>${name}</div>`;
      }).join("");
    }

    // sizing
    const container = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let boxWidth = Math.max(1, Math.round(container?.getBoundingClientRect().width || 550));

    if (typeof ResizeObserver !== "undefined" && container) {
      const ro = new ResizeObserver((entries) => {
        const w = Math.round(entries[0]?.contentRect?.width || boxWidth);
        boxWidth = Math.max(1, w);
      });
      ro.observe(container);
      window.addEventListener("beforeunload", () => ro.disconnect(), { once: true });
    } else {
      window.addEventListener("resize", () => {
        const w = Math.round(container?.getBoundingClientRect().width || boxWidth);
        boxWidth = Math.max(1, w);
      });
    }

    // drag
    let phi = 0;
    let theta = 0.25;
    let pointerDown = false;
    let lastX = 0;
    let lastY = 0;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    canvas.addEventListener("pointerdown", (e) => {
      pointerDown = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    });

    canvas.addEventListener("pointerup", (e) => {
      pointerDown = false;
      canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = "grab";
    });

    canvas.addEventListener("pointermove", (e) => {
      if (!pointerDown) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      phi += dx * 0.005;
      theta = clamp(theta + dy * 0.003, -1.2, 1.2);
    });

    // create globe
    createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.14, 0.16, 0.20],
      glowColor: [1, 1, 1],
      markers,
      onRender: (state) => {
        const s = Math.max(1, Math.floor(boxWidth * dpr));
        state.width = s;
        state.height = s;

        if (!pointerDown) phi += 0.003;
        state.phi = phi;
        state.theta = theta;
      }
    });

  } catch (e) {
    console.error("[travel-globe] runtime error:", e);
    if (elStats) elStats.textContent = `Travel globe error: ${e?.message || e}`;
  }
}
