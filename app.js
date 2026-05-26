/* Main app — hash router, state, tweaks */

const {
  useState: uSt,
  useEffect: uEf,
  useMemo: uMm,
  useCallback: uCb
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "#d4b078",
  "density": "comfy",
  "gridCols": 3,
  "cardStyle": "photo",
  "showFinanceHero": true
} /*EDITMODE-END*/;
const ACCENT_PALETTES = {
  "#d4b078": {
    ink: "#1a1208",
    soft: "rgba(212, 176, 120, 0.14)",
    glow: "rgba(212, 176, 120, 0.32)"
  },
  // Champagne
  "#b87333": {
    ink: "#160a02",
    soft: "rgba(184, 115, 51, 0.14)",
    glow: "rgba(184, 115, 51, 0.32)"
  },
  // Bronze
  "#c0c4cc": {
    ink: "#0d0f12",
    soft: "rgba(192, 196, 204, 0.14)",
    glow: "rgba(192, 196, 204, 0.32)"
  },
  // Platinum
  "#8b2a3a": {
    ink: "#fff5f0",
    soft: "rgba(139, 42, 58, 0.18)",
    glow: "rgba(139, 42, 58, 0.40)"
  } // Burgundy
};
function App() {
  const [route, setRoute] = uSt(window.location.hash.replace('#', '') || '/');
  const [lang, setLang] = uSt(() => localStorage.getItem('adn-lang') || 'ro');
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [saved, setSaved] = uSt(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('adn-saved') || '[]'));
    } catch {
      return new Set();
    }
  });
  const [toast, setToast] = uSt({
    msg: '',
    show: false
  });

  // Shared inventory state — admin mutates, public reads.
  // Persisted to localStorage so admin changes survive reload AND are visible publicly.
  const enrichCar = (c, i) => ({
    ...c,
    status: c.status || (i < 9 ? 'published' : i === 9 ? 'sold' : 'draft'),
    views: c.views ?? 240 + i * 87 + i % 3 * 51,
    visibility: c.visibility || 'public',
    adnScore: c.adnScore ?? 95 + i % 6,
    warrantyMonths: c.warrantyMonths || 12,
    vin: c.vin || 'WBA' + (i + 100000).toString().padStart(7, '0') + 'DG' + (Math.floor(Math.random() * 900) + 100),
    stockCode: c.stockCode || 'ADN-' + (2400 + i).toString(),
    shortDesc: c.shortDesc || c.brand + ' ' + c.model + ' ' + (c.variant || '') + ' adusă recent din Germania, stare impecabilă.'
  });
  const [cars, setCars] = uSt(() => {
    try {
      const saved = localStorage.getItem('adn-cars-inventory');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INVENTORY.map(enrichCar);
  });
  uEf(() => {
    try {
      localStorage.setItem('adn-cars-inventory', JSON.stringify(cars));
    } catch {}
  }, [cars]);

  // Hash routing
  uEf(() => {
    const h = () => setRoute(window.location.hash.replace('#', '') || '/');
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);

  // Scroll to top on route change
  uEf(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [route]);

  // Persist saved cars
  uEf(() => {
    localStorage.setItem('adn-saved', JSON.stringify([...saved]));
  }, [saved]);

  // Persist lang
  uEf(() => {
    localStorage.setItem('adn-lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Apply tweaks (theme, density, accent)
  uEf(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', tweaks.theme);
    root.setAttribute('data-density', tweaks.density);
    const ac = ACCENT_PALETTES[tweaks.accent] || ACCENT_PALETTES["#d4b078"];
    root.style.setProperty('--accent', tweaks.accent);
    root.style.setProperty('--accent-ink', ac.ink);
    root.style.setProperty('--accent-soft', ac.soft);
    root.style.setProperty('--accent-glow', ac.glow);
  }, [tweaks.theme, tweaks.density, tweaks.accent]);
  const t = I18N[lang];
  const toggleSave = uCb(id => {
    setSaved(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);
  const showToast = uCb(msg => {
    setToast({
      msg,
      show: true
    });
    setTimeout(() => setToast(tt => ({
      ...tt,
      show: false
    })), 2600);
  }, []);

  // Route parsing
  const parts = route.split('/').filter(Boolean);
  // Public views see only PUBLISHED cars; admin sees all.
  const publicCars = cars.filter(c => c.status !== 'sold' && c.visibility !== 'internal');
  const publishedCars = publicCars.filter(c => c.status === 'published');
  let page;
  if (parts.length === 0) page = /*#__PURE__*/React.createElement(HomePage, {
    t: t,
    lang: lang,
    saved: saved,
    toggleSave: toggleSave,
    showToast: showToast,
    cars: publishedCars
  });else if (parts[0] === 'stoc') page = /*#__PURE__*/React.createElement(StocPage, {
    t: t,
    saved: saved,
    toggleSave: toggleSave,
    cars: publishedCars
  });else if (parts[0] === 'auto' && parts[1]) page = /*#__PURE__*/React.createElement(DetailPage, {
    id: parts[1],
    t: t,
    lang: lang,
    saved: saved,
    toggleSave: toggleSave,
    showToast: showToast,
    cars: cars
  });else if (parts[0] === 'despre') page = /*#__PURE__*/React.createElement(DesprePage, {
    t: t
  });else if (parts[0] === 'contact') page = /*#__PURE__*/React.createElement(ContactPage, {
    t: t,
    showToast: showToast,
    cars: publishedCars
  });else if (parts[0] === 'programare') page = /*#__PURE__*/React.createElement(ProgramarePage, {
    t: t,
    showToast: showToast,
    cars: publishedCars
  });else if (parts[0] === 'admin') page = /*#__PURE__*/React.createElement(AdminPage, {
    t: t,
    showToast: showToast,
    subRoute: parts[1] || 'dashboard',
    cars: cars,
    setCars: setCars
  });else page = /*#__PURE__*/React.createElement(HomePage, {
    t: t,
    lang: lang,
    saved: saved,
    toggleSave: toggleSave,
    showToast: showToast,
    cars: publishedCars
  });
  const isAdmin = parts[0] === 'admin';
  return /*#__PURE__*/React.createElement("div", {
    className: "shell",
    "data-screen-label": route || '/'
  }, !isAdmin && /*#__PURE__*/React.createElement(Nav, {
    route: route,
    lang: lang,
    setLang: setLang,
    t: t
  }), /*#__PURE__*/React.createElement("main", null, page), !isAdmin && /*#__PURE__*/React.createElement(Footer, {
    t: t
  }), /*#__PURE__*/React.createElement(Toast, {
    message: toast.msg,
    show: toast.show
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Aspect"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Tem\u0103",
    value: tweaks.theme,
    options: ['dark', 'light'],
    onChange: v => setTweak('theme', v)
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Accent",
    value: tweaks.accent,
    options: ['#d4b078', '#b87333', '#c0c4cc', '#8b2a3a'],
    onChange: v => setTweak('accent', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Densitate",
    value: tweaks.density,
    options: ['comfy', 'compact'],
    onChange: v => setTweak('density', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Limb\u0103"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Site language",
    value: lang,
    options: ['ro', 'en'],
    onChange: v => setLang(v)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));