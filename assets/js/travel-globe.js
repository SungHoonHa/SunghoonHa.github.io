import createGlobe from "https://cdn.skypack.dev/cobe";

const canvas = document.getElementById("travel-globe-canvas");

// 다른 페이지에서도 스크립트가 로드될 수 있으니 안전하게
if (!canvas) {
  console.debug("[travel-globe] canvas not found (skip)");
} else {
  try {
    // -----------------------------
    // Regions & Colors
    // -----------------------------
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

    // -----------------------------
    // Data (너가 가진 데이터로 계속 늘려도 됨)
    // -----------------------------
    const places = [
      { region: REGION.ASIA, country: "Korea", city: "Seoul", lat: 37.5665, lon: 126.9780 },
      { region: REGION.ASIA, country: "Japan", city: "Tokyo", lat: 35.6762, lon: 139.6503 },
      { region: REGION.ASIA, country: "Japan", city: "Osaka", lat: 34.6937, lon: 135.5023 },
      { region: REGION.ASIA, country: "China", city: "Beijing", lat: 39.9042, lon: 116.4074 },
      { region: REGION.ASIA, country: "Vietnam", city: "Hanoi", lat: 21.0278, lon: 105.8342 },

      { region: REGION.EUROPE, country: "Germany", city: "Berlin", lat: 52.5200, lon: 13.4050 },
      { region: REGION.EUROPE, country: "France", city: "Paris", lat: 48.8566, lon: 2.3522 },
      { region: REGION.EUROPE, country: "United Kingdom", city: "London", lat: 51.5074, lon: -0.1278 },

      // 예시 (필요하면 네 핀들 계속 추가)
      { region: REGION.NORTH_AMERICA, country: "USA", city: "New York", lat: 40.7128, lon: -74.0060 },
      { region: REGION.NORTH_AMERICA, country: "USA", city: "San Francisco", lat: 37.7749, lon: -122.4194 },
    ];

    // COBE markers
    const markers = places.map(p => ({
      location: [p.lat, p.lon],
      size: 0.07,
      color: regionColor[p.region],
    }));

    // -----------------------------
    // UI (Stats & Legend)
    // -----------------------------
    const elStats = document.getElementById("travel-stats");
    const elLegend = document.getElementById("travel-legend");

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

    // -----------------------------
    // Sizing (✅ width=0 방지)
    // -----------------------------
    const container = canvas.parentElement; // .travel-globe
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let boxWidth = Math.max(1, Math.round(container?.getBoundingClientRect().width || 550));

    // ResizeObserver 지원하면 그걸로, 아니면 window resize로 fallback
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

    // -----------------------------
    // Drag control
    // -----------------------------
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

    // -----------------------------
    // Create Globe
    // -----------------------------
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
        // ✅ 항상 1 이상으로
        const s = Math.max(1, Math.floor(boxWidth * dpr));
        state.width = s;
        state.height = s;

        if (!pointerDown) phi += 0.003; // auto-rotate
        state.phi = phi;
        state.theta = theta;
      },
    });

  } catch (err) {
    console.error("[travel-globe] failed:", err);
    const elStats = document.getElementById("travel-stats");
    if (elStats) elStats.textContent = `Travel globe error: ${err?.message || err}`;
  }
}
