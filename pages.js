/* Pages: Home, Stoc, Detail, Despre, Contact, Finantare */

const {
  useState: uS,
  useEffect: uE,
  useMemo: uM,
  useRef: uR
} = React;

// Booking teaser — replaces the finance calculator on home + finantare
function BookingTeaser({
  t
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "calc-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calc-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.nav.programare), /*#__PURE__*/React.createElement("h2", null, "O conversa\u021Bie care valoreaz\u0103 30 de minute."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18
    }
  }, "Spune-ne ce cau\u021Bi. \xCE\u021Bi ar\u0103t\u0103m 3 ma\u0219ini potrivite \u2014 nu te plimb\u0103m prin tot stocul. Discut\u0103m finan\u021Bare, buy-back, livrare. Pleci cu un plan clar, f\u0103r\u0103 s\u0103 fi semnat nimic."), /*#__PURE__*/React.createElement("div", {
    className: "booking-trust-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bt-pill"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 12,
    strokeWidth: 3
  }), " Gratuit \xB7 30 min"), /*#__PURE__*/React.createElement("span", {
    className: "bt-pill"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 12,
    strokeWidth: 3
  }), " Confirmare \xEEn 30 min"), /*#__PURE__*/React.createElement("span", {
    className: "bt-pill"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 12,
    strokeWidth: 3
  }), " Anulare oric\xE2nd")), /*#__PURE__*/React.createElement("a", {
    href: "#/programare",
    className: "btn btn-primary btn-lg",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/programare';
    },
    style: {
      alignSelf: 'flex-start',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 14
  }), " Programeaz\u0103 30 min cu un consultant ", /*#__PURE__*/React.createElement(IconArrow, {
    size: 14,
    className: "arrow"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "booking-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bs-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bs-num"
  }, "01"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bs-h"
  }, "Alegi consultantul"), /*#__PURE__*/React.createElement("div", {
    className: "bs-s"
  }, "4 speciali\u0219ti, fiecare cu expertiz\u0103 diferit\u0103. To\u021Bi pe salariu fix."))), /*#__PURE__*/React.createElement("div", {
    className: "bs-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bs-num"
  }, "02"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bs-h"
  }, "Rezervi 30 de minute"), /*#__PURE__*/React.createElement("div", {
    className: "bs-s"
  }, "Slot-uri L-V 09:00 \u2013 17:00. S\xE2mb\u0103t\u0103 pe baz\u0103 de cerere."))), /*#__PURE__*/React.createElement("div", {
    className: "bs-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bs-num"
  }, "03"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bs-h"
  }, "Prime\u0219ti 3 propuneri concrete"), /*#__PURE__*/React.createElement("div", {
    className: "bs-s"
  }, "Nu te plimb\u0103m prin tot stocul. Vii preg\u0103tit, pleci cu un plan."))), /*#__PURE__*/React.createElement("div", {
    className: "bs-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bs-num"
  }, "04"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bs-h"
  }, "Decizi c\xE2nd e\u0219ti gata"), /*#__PURE__*/React.createElement("div", {
    className: "bs-s"
  }, "Niciun consultant nu te sun\u0103 dup\u0103. Promitem.")))));
}

// ============================================================
// HOME
// ============================================================
function HomePage({
  t,
  lang,
  saved,
  toggleSave,
  showToast,
  cars
}) {
  const inv = cars && cars.length ? cars : INVENTORY;
  const featured = inv.filter(c => c.featured !== false).slice(0, 6);
  const heroCar = featured[0] || inv[0];
  const totalCount = inv.length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-photo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "car",
    style: {
      backgroundImage: `url(${heroCar.photos[0]})`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse"
  }), " ", totalCount, " ma\u0219ini disponibile \xB7 3 v\xE2ndute s\u0103pt\u0103m\xE2na asta"), /*#__PURE__*/React.createElement("span", {
    className: "coords"
  }, t.hero.meta)), /*#__PURE__*/React.createElement("div", {
    className: "hero-spec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow no-dot",
    style: {
      color: 'var(--accent)'
    }
  }, t.hero.specLabel), /*#__PURE__*/React.createElement(IconArrowUR, {
    size: 14
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lbl",
    style: {
      marginBottom: 4
    }
  }, heroCar.brand, " ", heroCar.model), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 20,
      letterSpacing: '-0.02em'
    }
  }, heroCar.variant), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: 68,
      backgroundImage: `url(${heroCar.photos[0]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: 7,
      marginTop: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, t.detail.keyYear), /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, heroCar.year)), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, t.detail.keyKm), /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, fmtKm(heroCar.km))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, t.detail.keyPower), /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, heroCar.hp, " ", t.detail.hp)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: {
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "ADN Score"), /*#__PURE__*/React.createElement("span", {
    className: "val green"
  }, "98/100")), /*#__PURE__*/React.createElement("div", {
    className: "mini-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fill",
    style: {
      width: '98%'
    }
  }))), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary",
    href: `#/auto/${heroCar.id}`,
    onClick: e => {
      e.preventDefault();
      window.location.hash = `/auto/${heroCar.id}`;
    }
  }, "Vreau această mașină ", /*#__PURE__*/React.createElement(IconArrow, {
    size: 14,
    className: "arrow"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hero-body"
  }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
    className: "line"
  }, t.hero.l1, " ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, t.hero.l2)), /*#__PURE__*/React.createElement("span", {
    className: "line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ghost"
  }, t.hero.l3)), /*#__PURE__*/React.createElement("span", {
    className: "line"
  }, t.hero.l4)), /*#__PURE__*/React.createElement(HeroSearch, {
    cars: inv
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-sub-row"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, t.hero.sub), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary btn-lg",
    href: "#/stoc",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/stoc';
    }
  }, t.cta.seeStock, " ", /*#__PURE__*/React.createElement(IconArrow, {
    size: 16,
    className: "arrow"
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-wa btn-lg",
    href: `https://wa.me/${(window.ADN_CONFIG || {}).whatsappRaw || '40732961237'}?text=${encodeURIComponent('Bună ziua! Sunt interesat de o mașină din stocul ADN Cars.')}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(IconWhatsApp, {
    size: 18
  }), " Hai să discutăm pe WhatsApp!")))))), /*#__PURE__*/React.createElement("section", {
    className: "page categories-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "categories-grid"
  }, [
    { key: 'auto', label: 'Autoturisme', sub: 'Berlina, SUV, Coupé, Cabrio', icon: '🚗', q: 'autoturisme' },
    { key: 'util', label: 'Autoutilitare', sub: 'VAN, Cargo, Pickup', icon: '🚐', q: 'autoutilitare' },
    { key: 'moto', label: 'Moto & ATV', sub: 'Motociclete, Scutere, ATV', icon: '🏍️', q: 'moto' },
    { key: 'super', label: 'Supercar', sub: 'Sport, Exotice, Hypercar', icon: '🏎️', q: 'supercar' }
  ].map(cat => /*#__PURE__*/React.createElement("a", {
    key: cat.key,
    className: "category-card",
    href: `#/stoc?cat=${cat.q}`,
    onClick: e => { e.preventDefault(); window.location.hash = `/stoc?cat=${cat.q}`; }
  },
    /*#__PURE__*/React.createElement("span", { className: "cat-icon" }, cat.icon),
    /*#__PURE__*/React.createElement("div", { className: "cat-info" },
      /*#__PURE__*/React.createElement("strong", null, cat.label),
      /*#__PURE__*/React.createElement("span", null, cat.sub)
    ),
    /*#__PURE__*/React.createElement("span", { className: "cat-arrow" }, "→")
  )))), /*#__PURE__*/React.createElement("section", {
    className: "page section"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.sections.featuredKicker), /*#__PURE__*/React.createElement("h2", null, t.sections.featuredH)), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, t.sections.featuredLead), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-ghost",
    href: "#/stoc",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/stoc';
    }
  }, t.cta.seeStock, " ", /*#__PURE__*/React.createElement(IconArrowUR, {
    size: 14
  }))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 60
  }, /*#__PURE__*/React.createElement("div", {
    className: "car-grid"
  }, featured.map(car => /*#__PURE__*/React.createElement(CarCard, {
    key: car.id,
    car: car,
    saved: saved.has(car.id),
    onToggleSave: toggleSave,
    t: t
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "page section-sm"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.sections.servicesKicker), /*#__PURE__*/React.createElement("h2", null, t.sections.servicesH)), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, t.sections.servicesLead))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 60
  }, /*#__PURE__*/React.createElement("div", {
    className: "services"
  }, t.services.map((s, i) => {
    const icons = [IconSearch, IconHandshake, IconDocument, IconShieldCheck];
    const Ic = icons[i];
    return /*#__PURE__*/React.createElement("div", {
      className: "svc",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "ic"
    }, /*#__PURE__*/React.createElement(Ic, {
      size: 22
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, s.t), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 8
      }
    }, s.d)), /*#__PURE__*/React.createElement(IconArrowUR, {
      size: 18,
      className: "arrow",
      style: {
        alignSelf: 'flex-end'
      }
    }));
  })))), /*#__PURE__*/React.createElement("section", {
    className: "page dna"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.sections.dnaKicker), /*#__PURE__*/React.createElement("h2", {
    className: "dna-head"
  }, t.sections.dnaH1, " ", /*#__PURE__*/React.createElement("mark", null, t.sections.dnaH2), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, t.sections.dnaH3), /*#__PURE__*/React.createElement("br", null), t.sections.dnaH4)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "dna-grid"
  }, t.dna.map((d, i) => /*#__PURE__*/React.createElement("div", {
    className: `dna-card ${i === 0 ? 'lead' : ''} ${i === 3 ? 'dark' : ''}`,
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "n"
  }, d.n), /*#__PURE__*/React.createElement("h3", null, d.h), /*#__PURE__*/React.createElement("p", null, d.d), i === 3 && /*#__PURE__*/React.createElement("div", {
    className: "num-big"
  }, "2-6 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "ani"))))))), /*#__PURE__*/React.createElement("section", {
    className: "page section-sm"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(BookingTeaser, {
    t: t
  }))), /*#__PURE__*/React.createElement("section", {
    className: "page section-sm"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.sections.whyKicker), /*#__PURE__*/React.createElement("h2", null, t.sections.whyH)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "why-list"
  }, t.why.map((w, i) => /*#__PURE__*/React.createElement("div", {
    className: "item",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("h4", null, w.h), /*#__PURE__*/React.createElement("p", null, w.d)))))), /*#__PURE__*/React.createElement("section", {
    className: "page section-sm"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.sections.voicesKicker), /*#__PURE__*/React.createElement("h2", null, t.sections.voicesH)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "voices"
  }, TESTIMONIALS.map((v, i) => /*#__PURE__*/React.createElement("div", {
    className: "voice",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "quote-mark"
  }, "\""), /*#__PURE__*/React.createElement("blockquote", null, v.text), /*#__PURE__*/React.createElement("div", {
    className: "stars"
  }, Array(v.stars).fill(0).map((_, k) => /*#__PURE__*/React.createElement(IconStar, {
    key: k,
    size: 14
  }))), /*#__PURE__*/React.createElement("div", {
    className: "who"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av"
  }, v.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, v.who), /*#__PURE__*/React.createElement("div", {
    className: "role"
  }, v.role)))))))), /*#__PURE__*/React.createElement("section", {
    className: "page"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "big-cta"
  }, /*#__PURE__*/React.createElement("h2", null, t.sections.ctaH1, " ", /*#__PURE__*/React.createElement("em", null, t.sections.ctaH2), /*#__PURE__*/React.createElement("br", null), t.sections.ctaH3), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, t.sections.ctaSub), /*#__PURE__*/React.createElement("div", {
    className: "ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary btn-lg",
    href: "#/contact",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/contact';
    }
  }, t.cta.contact, " ", /*#__PURE__*/React.createElement(IconArrow, {
    size: 16,
    className: "arrow"
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-outline btn-lg",
    href: "#/stoc",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/stoc';
    }
  }, t.cta.seeStock))))));
}

// ============================================================
// STOC (INVENTORY)
// ============================================================
function StocPage({
  t,
  saved,
  toggleSave,
  cars
}) {
  const baseCars = cars && cars.length ? cars : INVENTORY;
  const [q, setQ] = uS(() => {
    const init = sessionStorage.getItem('adn-search-init') || '';
    sessionStorage.removeItem('adn-search-init');
    return init;
  });
  const [brand, setBrand] = uS(new Set());
  const [body, setBody] = uS(new Set());
  const [fuel, setFuel] = uS(new Set());
  const [gear, setGear] = uS(new Set());
  const [yrMin, setYrMin] = uS('');
  const [yrMax, setYrMax] = uS('');
  const [pMin, setPMin] = uS('');
  const [pMax, setPMax] = uS('');
  const [kmMax, setKmMax] = uS('');
  const [batteryPctMin, setBatteryPctMin] = uS('');
  const [batteryRangeMin, setBatteryRangeMin] = uS('');
  const [hasIsofix, setHasIsofix] = uS(false);
  const [sort, setSort] = uS('newest');
  const [view, setView] = uS('grid');
  const [filterOpen, setFilterOpen] = uS(false);
  const toggle = (setter, val) => setter(s => {
    const n = new Set(s);
    n.has(val) ? n.delete(val) : n.add(val);
    return n;
  });
  const clearAll = () => {
    setQ('');
    setBrand(new Set());
    setBody(new Set());
    setFuel(new Set());
    setGear(new Set());
    setYrMin('');
    setYrMax('');
    setPMin('');
    setPMax('');
    setKmMax('');
    setBatteryPctMin('');
    setBatteryRangeMin('');
    setHasIsofix(false);
  };
  const activeFilterCount = brand.size + body.size + fuel.size + gear.size + (yrMin || yrMax ? 1 : 0) + (pMin || pMax ? 1 : 0) + (kmMax ? 1 : 0) + (batteryPctMin ? 1 : 0) + (batteryRangeMin ? 1 : 0) + (hasIsofix ? 1 : 0);
  const list = uM(() => {
    let r = baseCars.filter(c => {
      if (q.trim()) {
        const low = q.toLowerCase();
        const text = `${c.brand} ${c.model} ${c.variant || ''} ${c.year} ${c.fuel || ''} ${c.body || ''}`.toLowerCase();
        if (!text.includes(low)) return false;
      }
      if (brand.size && !brand.has(c.brand)) return false;
      if (body.size && !body.has(c.body)) return false;
      if (fuel.size && !fuel.has(c.fuel)) return false;
      if (gear.size && !gear.has(c.gear)) return false;
      if (yrMin && c.year < +yrMin) return false;
      if (yrMax && c.year > +yrMax) return false;
      if (pMin && c.price < +pMin) return false;
      if (pMax && c.price > +pMax) return false;
      if (kmMax && c.km > +kmMax) return false;
      if (batteryPctMin && (c.batteryPct == null || c.batteryPct < +batteryPctMin)) return false;
      if (batteryRangeMin && (c.batteryRange == null || c.batteryRange < +batteryRangeMin)) return false;
      if (hasIsofix && !c.isofix) return false;
      return true;
    });
    if (sort === 'newest') r.sort((a, b) => b.year - a.year);
    if (sort === 'priceAsc') r.sort((a, b) => a.price - b.price);
    if (sort === 'priceDesc') r.sort((a, b) => b.price - a.price);
    if (sort === 'kmAsc') r.sort((a, b) => a.km - b.km);
    return r;
  }, [q, brand, body, fuel, gear, yrMin, yrMax, pMin, pMax, kmMax, batteryPctMin, batteryRangeMin, hasIsofix, sort, baseCars]);
  return /*#__PURE__*/React.createElement("section", {
    className: "page stoc-page",
    style: { paddingTop: 32, paddingBottom: 80 }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: { marginBottom: 24 }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.nav.inventory), /*#__PURE__*/React.createElement("h2", null, "Ma\u0219ini la comand\u0103 din Germania.")), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Toate inspectate \u00een 145 puncte, toate cu garan\u021bie 12 luni inclus\u0103. Aduse la comand\u0103 direct din Germania \u2014 nu se afl\u0103 \u00een stoc fizic \u00een Rom\u00e2nia."))),
  /*#__PURE__*/React.createElement("div", {
    className: "order-notice-banner"
  }, /*#__PURE__*/React.createElement("div", { className: "onb-icon" }, /*#__PURE__*/React.createElement(IconInfo, { size: 18 })),
  /*#__PURE__*/React.createElement("div", { className: "onb-text" },
    /*#__PURE__*/React.createElement("strong", null, "Ma\u0219inile sunt aduse la comand\u0103, nu sunt \u00een stoc \u00een Rom\u00e2nia."),
    " Pre\u021burile includ transportul de pe platforma din \u021bara de import p\u00e2n\u0103 la adresa ta (acolo unde este posibil). Livr\u0103m oriunde \u00een Rom\u00e2nia."
  ),
  /*#__PURE__*/React.createElement("a", {
    href: "#/contact", className: "onb-cta",
    onClick: e => { e.preventDefault(); window.location.hash = '/contact'; }
  }, "Comand\u0103 acum")),
  /*#__PURE__*/React.createElement("div", { className: "stoc-search-bar" },
    /*#__PURE__*/React.createElement("div", { className: "stoc-search-wrap" },
      /*#__PURE__*/React.createElement(IconSearch, { size: 16, className: "stoc-search-icon" }),
      /*#__PURE__*/React.createElement("input", {
        className: "stoc-search-input", value: q,
        onChange: e => setQ(e.target.value),
        placeholder: "Caut\u0103 dup\u0103 marc\u0103, model, variant\u0103, an...",
        "aria-label": "Caut\u0103 \u00een stoc"
      }),
      q && /*#__PURE__*/React.createElement("button", {
        className: "stoc-search-clear", onClick: () => setQ(''), "aria-label": "\u0218terge c\u0103utarea"
      }, /*#__PURE__*/React.createElement(IconClose, { size: 14 }))
    ),
    /*#__PURE__*/React.createElement("span", {
      className: `stoc-search-count${q.trim() ? ' visible' : ''}`
    }, /*#__PURE__*/React.createElement("strong", null, list.length), " ", list.length === 1 ? 'rezultat' : 'rezultate')
  ),
  /*#__PURE__*/React.createElement("div", { className: "stoc-mobile-bar" },
    /*#__PURE__*/React.createElement("span", { className: "count" },
      /*#__PURE__*/React.createElement("strong", null, list.length), " ", t.inventory.results
    ),
    /*#__PURE__*/React.createElement("div", { className: "stoc-mobile-actions" },
      /*#__PURE__*/React.createElement("select", {
        className: "sort-select", value: sort, onChange: e => setSort(e.target.value)
      },
        /*#__PURE__*/React.createElement("option", { value: "newest" }, t.inventory.sortNewest),
        /*#__PURE__*/React.createElement("option", { value: "priceAsc" }, t.inventory.sortPriceAsc),
        /*#__PURE__*/React.createElement("option", { value: "priceDesc" }, t.inventory.sortPriceDesc),
        /*#__PURE__*/React.createElement("option", { value: "kmAsc" }, t.inventory.sortKmAsc)
      ),
      /*#__PURE__*/React.createElement("button", {
        className: `btn btn-sm stoc-filter-btn${activeFilterCount > 0 ? ' has-filters' : ''}`,
        onClick: () => setFilterOpen(true)
      }, /*#__PURE__*/React.createElement(IconSliders, { size: 14 }), "Filtre",
        activeFilterCount > 0 && /*#__PURE__*/React.createElement("span", { className: "filter-badge" }, activeFilterCount)
      )
    )
  ),
  /*#__PURE__*/React.createElement("div", { className: "inventory-layout" },
    /*#__PURE__*/React.createElement("aside", { className: `filter-panel${filterOpen ? ' mobile-open' : ''}` },
      /*#__PURE__*/React.createElement("div", { className: "filter-panel-head" },
        /*#__PURE__*/React.createElement("span", null, "Filtre",
          activeFilterCount > 0 && /*#__PURE__*/React.createElement("span", { className: "filter-badge", style: { marginLeft: 8 } }, activeFilterCount)
        ),
        /*#__PURE__*/React.createElement("button", {
          className: "filter-close-btn", onClick: () => setFilterOpen(false), "aria-label": "\u00cenchide filtre"
        }, /*#__PURE__*/React.createElement(IconClose, { size: 18 }))
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-section" },
        /*#__PURE__*/React.createElement("h6", null, t.inventory.brand),
        /*#__PURE__*/React.createElement("div", { className: "chip-row" },
          BRANDS.map(b => /*#__PURE__*/React.createElement("button", {
            key: b, className: `chip ${brand.has(b) ? 'active' : ''}`, onClick: () => toggle(setBrand, b)
          }, b))
        )
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-section" },
        /*#__PURE__*/React.createElement("h6", null, t.inventory.body),
        /*#__PURE__*/React.createElement("div", { className: "chip-row" },
          BODY_TYPES.map(b => /*#__PURE__*/React.createElement("button", {
            key: b, className: `chip ${body.has(b) ? 'active' : ''}`, onClick: () => toggle(setBody, b)
          }, b))
        )
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-section" },
        /*#__PURE__*/React.createElement("h6", null, t.inventory.fuel),
        /*#__PURE__*/React.createElement("div", { className: "chip-row" },
          FUEL_TYPES.map(f => /*#__PURE__*/React.createElement("button", {
            key: f, className: `chip ${fuel.has(f) ? 'active' : ''}`, onClick: () => toggle(setFuel, f)
          }, FUELS[f]))
        )
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-section" },
        /*#__PURE__*/React.createElement("h6", null, t.inventory.gear),
        /*#__PURE__*/React.createElement("div", { className: "chip-row" },
          TRANSMISSIONS.map(g => /*#__PURE__*/React.createElement("button", {
            key: g, className: `chip ${gear.has(g) ? 'active' : ''}`, onClick: () => toggle(setGear, g)
          }, GEARS[g]))
        )
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-section" },
        /*#__PURE__*/React.createElement("h6", null, t.inventory.year),
        /*#__PURE__*/React.createElement("div", { className: "range-row" },
          /*#__PURE__*/React.createElement("input", { placeholder: "Min", type: "number", value: yrMin, onChange: e => setYrMin(e.target.value) }),
          /*#__PURE__*/React.createElement("input", { placeholder: "Max", type: "number", value: yrMax, onChange: e => setYrMax(e.target.value) })
        )
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-section" },
        /*#__PURE__*/React.createElement("h6", null, t.inventory.price),
        /*#__PURE__*/React.createElement("div", { className: "range-row" },
          /*#__PURE__*/React.createElement("input", { placeholder: "Min \u20ac", type: "number", value: pMin, onChange: e => setPMin(e.target.value) }),
          /*#__PURE__*/React.createElement("input", { placeholder: "Max \u20ac", type: "number", value: pMax, onChange: e => setPMax(e.target.value) })
        )
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-section" },
        /*#__PURE__*/React.createElement("h6", null, t.inventory.km),
        /*#__PURE__*/React.createElement("div", { className: "range-row", style: { gridTemplateColumns: '1fr' } },
          /*#__PURE__*/React.createElement("input", { placeholder: "Maxim km", type: "number", value: kmMax, onChange: e => setKmMax(e.target.value) })
        )
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-section" },
        /*#__PURE__*/React.createElement("h6", null, "Stare baterie (%)"),
        /*#__PURE__*/React.createElement("div", { className: "range-row", style: { gridTemplateColumns: '1fr' } },
          /*#__PURE__*/React.createElement("input", { placeholder: "Minim % baterie (0-100)", type: "number", min: "0", max: "100", value: batteryPctMin, onChange: e => setBatteryPctMin(e.target.value) })
        )
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-section" },
        /*#__PURE__*/React.createElement("h6", null, "Autonomie baterie (km)"),
        /*#__PURE__*/React.createElement("div", { className: "range-row", style: { gridTemplateColumns: '1fr' } },
          /*#__PURE__*/React.createElement("input", { placeholder: "Minim km autonomie", type: "number", min: "0", value: batteryRangeMin, onChange: e => setBatteryRangeMin(e.target.value) })
        )
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-section" },
        /*#__PURE__*/React.createElement("h6", null, "Isofix"),
        /*#__PURE__*/React.createElement("div", { className: "chip-row" },
          /*#__PURE__*/React.createElement("button", {
            className: "chip" + (hasIsofix ? " active" : ""),
            onClick: function() { setHasIsofix(function(v) { return !v; }); }
          }, "Cu Isofix")
        )
      ),
      /*#__PURE__*/React.createElement("div", { className: "filter-actions" },
        /*#__PURE__*/React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: clearAll },
          /*#__PURE__*/React.createElement(IconRefresh, { size: 12 }), " ", t.inventory.clear
        ),
        /*#__PURE__*/React.createElement("button", {
          className: "btn btn-primary filter-apply-btn", onClick: () => setFilterOpen(false)
        }, list.length, " ", t.inventory.results)
      )
    ),
    /*#__PURE__*/React.createElement("div", { className: "stoc-results" },
      /*#__PURE__*/React.createElement("div", { className: "toolbar" },
        /*#__PURE__*/React.createElement("div", { className: "count" },
          /*#__PURE__*/React.createElement("strong", null, list.length), " ", t.inventory.results
        ),
        /*#__PURE__*/React.createElement("div", { className: "toolbar-right" },
          /*#__PURE__*/React.createElement("select", {
            className: "sort-select", value: sort, onChange: e => setSort(e.target.value)
          },
            /*#__PURE__*/React.createElement("option", { value: "newest" }, t.inventory.sortNewest),
            /*#__PURE__*/React.createElement("option", { value: "priceAsc" }, t.inventory.sortPriceAsc),
            /*#__PURE__*/React.createElement("option", { value: "priceDesc" }, t.inventory.sortPriceDesc),
            /*#__PURE__*/React.createElement("option", { value: "kmAsc" }, t.inventory.sortKmAsc)
          ),
          /*#__PURE__*/React.createElement("div", { className: "view-toggle" },
            /*#__PURE__*/React.createElement("button", {
              className: view === 'grid' ? 'active' : '', onClick: () => setView('grid'), "aria-label": "grid"
            }, /*#__PURE__*/React.createElement(IconGrid, { size: 15 })),
            /*#__PURE__*/React.createElement("button", {
              className: view === 'list' ? 'active' : '', onClick: () => setView('list'), "aria-label": "list"
            }, /*#__PURE__*/React.createElement(IconList, { size: 15 }))
          )
        )
      ),
      list.length === 0 ? /*#__PURE__*/React.createElement("div", {
        style: { textAlign: 'center', padding: '80px 24px', background: 'var(--bg-panel)', border: '1px solid var(--line-subtle)', borderRadius: 22 }
      },
        /*#__PURE__*/React.createElement("p", { style: { fontSize: 17, color: 'var(--fg-muted)' } }, t.inventory.noResults),
        /*#__PURE__*/React.createElement("button", { className: "btn btn-primary", onClick: clearAll, style: { marginTop: 18 } },
          /*#__PURE__*/React.createElement(IconRefresh, { size: 14 }), " ", t.inventory.noResultsClear
        )
      ) : view === 'grid' ? /*#__PURE__*/React.createElement("div", { className: "car-grid" },
        list.map(car => /*#__PURE__*/React.createElement(CarCard, {
          key: car.id, car: car, saved: saved.has(car.id), onToggleSave: toggleSave, t: t
        }))
      ) : /*#__PURE__*/React.createElement("div", { className: "car-list" },
        list.map(car => /*#__PURE__*/React.createElement(CarRow, {
          key: car.id, car: car, saved: saved.has(car.id), onToggleSave: toggleSave, t: t
        }))
      )
    )
  ),
  filterOpen && /*#__PURE__*/React.createElement("div", { className: "filter-overlay", onClick: () => setFilterOpen(false) }));
}

// ============================================================
// CAR DETAIL
// ============================================================
function DetailPage({
  id,
  t,
  lang,
  saved,
  toggleSave,
  showToast,
  cars
}) {
  const inv = cars && cars.length ? cars : INVENTORY;
  const car = inv.find(c => c.id === id);
  const [activePhoto, setActivePhoto] = uS(0);
  if (!car) {
    return /*#__PURE__*/React.createElement("section", {
      className: "page section"
    }, /*#__PURE__*/React.createElement("h2", null, "Ma\u0219ina nu a fost g\u0103sit\u0103."), /*#__PURE__*/React.createElement("a", {
      className: "btn btn-primary",
      href: "#/stoc",
      onClick: e => {
        e.preventDefault();
        window.location.hash = '/stoc';
      },
      style: {
        marginTop: 24
      }
    }, /*#__PURE__*/React.createElement(IconArrowLeft, {
      size: 14
    }), " ", t.detail.back));
  }
  return /*#__PURE__*/React.createElement("section", {
    className: "page",
    style: {
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-ghost btn-sm",
    href: "#/stoc",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/stoc';
    },
    style: {
      marginTop: 16,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(IconArrowLeft, {
    size: 13
  }), " ", t.detail.back), /*#__PURE__*/React.createElement("div", {
    className: "detail-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-gallery"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main",
    style: {
      backgroundImage: `url(${car.photos[activePhoto] || car.photos[0]})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "badges"
  }, car.badge && /*#__PURE__*/React.createElement("span", {
    className: "badge badge-accent"
  }, car.badge), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-dark"
  }, /*#__PURE__*/React.createElement(IconShieldCheck, {
    size: 11
  }), " ADN 145pt"), car.accidents === false && /*#__PURE__*/React.createElement("span", {
    className: "badge badge-mint"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 11
  }), " F\u0103r\u0103 accidente"))), /*#__PURE__*/React.createElement("div", {
    className: "thumbs"
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `thumb ${activePhoto === i ? 'active' : ''}`,
    style: {
      backgroundImage: `url(${car.photos[i] || car.photos[0]})`
    },
    onClick: () => setActivePhoto(i)
  })))), /*#__PURE__*/React.createElement("aside", {
    className: "detail-side"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "mono-eyebrow no-dot",
    style: {
      color: 'var(--fg-muted)',
      fontSize: 11
    }
  }, t.detail.stock, " \xB7 ADN-", car.id.toUpperCase().slice(0, 8)), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 10
    }
  }, car.brand, " ", car.model), /*#__PURE__*/React.createElement("p", {
    className: "stock"
  }, car.variant)), /*#__PURE__*/React.createElement("div", {
    className: "price-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "price"
  }, "\u20AC ", fmtPrice(car.price))), /*#__PURE__*/React.createElement("div", {
    className: "vat"
  }, t.detail.includesVAT, " \xB7 \xCEnmatriculare RO inclus\u0103"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
    className: "detail-meta-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dm-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "ADN Score"), /*#__PURE__*/React.createElement("div", {
    className: "val accent"
  }, car.adnScore || 96, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.55em',
      color: 'var(--fg-muted)',
      marginLeft: 4
    }
  }, "/100"))), /*#__PURE__*/React.createElement("div", {
    className: "dm-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Garan\u021Bie"), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, "12 luni")), /*#__PURE__*/React.createElement("div", {
    className: "dm-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Stoc"), /*#__PURE__*/React.createElement("div", {
    className: "val accent"
  }, "Disponibil\u0103"))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary btn-lg",
    href: "#/programare",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/programare';
    }
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 16
  }), " ", t.detail.bookDrive), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => {
      window.location.hash = '/contact';
    }
  }, /*#__PURE__*/React.createElement(IconMessage, {
    size: 14
  }), " ", t.detail.requestOffer), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: () => showToast('Apel inițiat către consultant')
  }, /*#__PURE__*/React.createElement(IconPhone, {
    size: 14
  }), " ", t.detail.callAgent)), /*#__PURE__*/React.createElement("div", {
    className: "agent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av"
  }, "DP"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, "Diana Popescu"), /*#__PURE__*/React.createElement("div", {
    className: "role"
  }, t.detail.agent, " \xB7 +40 374 123 456"))))), /*#__PURE__*/React.createElement("div", {
    className: "specs-block"
  }, /*#__PURE__*/React.createElement("h2", null, t.detail.specs), /*#__PURE__*/React.createElement("div", {
    className: "specs-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spec-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, t.detail.keyYear), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, car.year)), /*#__PURE__*/React.createElement("div", {
    className: "spec-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, t.detail.keyKm), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, fmtKm(car.km), " ", /*#__PURE__*/React.createElement("small", null, "km"))), /*#__PURE__*/React.createElement("div", {
    className: "spec-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, t.detail.keyPower), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, car.hp, " ", /*#__PURE__*/React.createElement("small", null, t.detail.hp))), /*#__PURE__*/React.createElement("div", {
    className: "spec-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, t.detail.keyEngine), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, car.cc > 0 ? `${(car.cc / 1000).toFixed(1)}L` : '—', " ", /*#__PURE__*/React.createElement("small", null, car.cc > 0 ? t.detail.cc : ''))), /*#__PURE__*/React.createElement("div", {
    className: "spec-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, t.detail.keyFuel), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, FUELS[car.fuel])), /*#__PURE__*/React.createElement("div", {
    className: "spec-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, t.detail.keyGear), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, GEARS[car.gear])), /*#__PURE__*/React.createElement("div", {
    className: "spec-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, t.detail.keyDrive), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, DRIVES[car.drive])), /*#__PURE__*/React.createElement("div", {
    className: "spec-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, t.detail.keyBody), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, car.body)))), /*#__PURE__*/React.createElement("div", {
    className: "specs-block"
  }, /*#__PURE__*/React.createElement("h2", null, t.detail.equipment), /*#__PURE__*/React.createElement("div", {
    className: "equip",
    style: {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("h4", null, t.detail.equipConfort), /*#__PURE__*/React.createElement("ul", null, (car.equipment.confort || []).map((e, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 14
  }), " ", e)))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("h4", null, t.detail.equipTech), /*#__PURE__*/React.createElement("ul", null, (car.equipment.tech || []).map((e, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 14
  }), " ", e)))), /*#__PURE__*/React.createElement("div", {
    className: "col"
  }, /*#__PURE__*/React.createElement("h4", null, t.detail.equipSiguranta), /*#__PURE__*/React.createElement("ul", null, (car.equipment.siguranta || []).map((e, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 14
  }), " ", e)))))), /*#__PURE__*/React.createElement("div", {
    className: "specs-block"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 18,
      flexWrap: 'wrap',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, t.detail.history), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-mint",
    style: {
      position: 'relative',
      top: '-4px'
    }
  }, /*#__PURE__*/React.createElement(IconShieldCheck, {
    size: 12
  }), " Raport VIN verificat")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--fg-muted)',
      fontSize: 14,
      marginTop: 0,
      marginBottom: 24,
      maxWidth: 600
    }
  }, t.detail.historySub), /*#__PURE__*/React.createElement("div", {
    className: "history-list"
  }, car.historyTimeline.map((h, i) => /*#__PURE__*/React.createElement("div", {
    className: "history-item",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "date"
  }, h.date), /*#__PURE__*/React.createElement("div", {
    className: "what"
  }, h.label, /*#__PURE__*/React.createElement("small", null, h.sub)), /*#__PURE__*/React.createElement("div", {
    className: "km"
  }, fmtKm(h.km), " km"))))));
}

// ============================================================
// DESPRE (ABOUT)
// ============================================================
function DesprePage({
  t
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "page",
    style: {
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-hero"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.about.kicker), /*#__PURE__*/React.createElement("h1", null, t.about.h1l1, " ", /*#__PURE__*/React.createElement("em", null, t.about.h1l2_em), /*#__PURE__*/React.createElement("br", null), t.about.h1l3, " ", /*#__PURE__*/React.createElement("mark", null, t.about.h1l4_mark), /*#__PURE__*/React.createElement("br", null), t.about.h1l5, /*#__PURE__*/React.createElement("br", null), t.about.h1l6), /*#__PURE__*/React.createElement("p", {
    className: "about-lead"
  }, t.about.lead))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "about-stats"
  }, t.about.stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "s",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "v num"
  }, s.v, /*#__PURE__*/React.createElement("span", {
    className: "plus"
  }, s.plus)), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, s.l))))), /*#__PURE__*/React.createElement("section", {
    className: "section-sm"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.about.storyKicker), /*#__PURE__*/React.createElement("h2", null, t.about.storyH)), /*#__PURE__*/React.createElement("div", null, t.about.story.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontSize: 16,
      lineHeight: 1.55,
      color: 'var(--fg-muted)',
      margin: i === 0 ? '0' : '18px 0 0'
    }
  }, p)))))), /*#__PURE__*/React.createElement("section", {
    className: "section-sm"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.about.teamKicker), /*#__PURE__*/React.createElement("h2", null, t.about.teamH)))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "team-grid"
  }, TEAM.map((m, i) => /*#__PURE__*/React.createElement("div", {
    className: "team",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "av"
  }, m.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, m.name), /*#__PURE__*/React.createElement("div", {
    className: "role"
  }, m.role)), /*#__PURE__*/React.createElement("p", {
    className: "bio"
  }, m.bio)))))), /*#__PURE__*/React.createElement("section", {
    className: "dna",
    style: {
      borderRadius: 0
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.sections.whyKicker), /*#__PURE__*/React.createElement("h2", {
    className: "dna-head",
    style: {
      marginTop: 18
    }
  }, t.sections.whyH)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("div", {
    className: "why-list"
  }, t.why.map((w, i) => /*#__PURE__*/React.createElement("div", {
    className: "item",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("h4", null, w.h), /*#__PURE__*/React.createElement("p", null, w.d)))))));
}

// ============================================================
// CONTACT
// ============================================================
function ContactPage({
  t,
  showToast,
  cars
}) {
  const inv = cars && cars.length ? cars : INVENTORY;
  const [form, setForm] = uS({
    name: '',
    email: '',
    phone: '',
    interest: 'i_specific',
    carId: '',
    message: ''
  });
  const [submitting, setSubmitting] = uS(false);
  const [error, setError] = uS('');
  const update = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));
  const submit = async e => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setError('');
    setSubmitting(true);
    const cfg = window.ADN_CONFIG || {};
    const endpoint = cfg.contactFormEndpoint || '';
    const carRef = form.carId ? inv.find(c => c.id === form.carId) : null;
    const payload = {
      nume: form.name,
      email: form.email,
      telefon: form.phone,
      interes: form.interest,
      masina: carRef ? `${carRef.brand} ${carRef.model} ${carRef.variant} (cod ${carRef.stockCode || carRef.id})` : '',
      mesaj: form.message,
      _subject: `Contact nou ADN Cars — ${form.name}`,
      _replyto: form.email
    };
    try {
      if (endpoint && !endpoint.includes('YOUR_FORM_ID')) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        // No endpoint configured — open mail client as fallback
        const body = encodeURIComponent(`Nume: ${payload.nume}\nEmail: ${payload.email}\nTelefon: ${payload.telefon}\n` + `Interes: ${payload.interes}\nMașina: ${payload.masina}\n\n${payload.mesaj}`);
        window.location.href = `mailto:${cfg.notificationEmail || 'salut@adncars.ro'}?subject=${encodeURIComponent(payload._subject)}&body=${body}`;
      }
      showToast(t.contact.thanks);
      setForm({
        name: '',
        email: '',
        phone: '',
        interest: 'i_specific',
        carId: '',
        message: ''
      });
    } catch (err) {
      setError('Nu am putut trimite mesajul. Te rugăm să ne suni la +40 374 123 456 sau să încerci din nou într-un minut.');
    } finally {
      setSubmitting(false);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "page",
    style: {
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-hero",
    style: {
      paddingBottom: 56
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.contact.kicker), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(48px, 8vw, 124px)'
    }
  }, t.contact.h), /*#__PURE__*/React.createElement("p", {
    className: "about-lead"
  }, t.contact.lead))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "contact-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(IconPin, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t.contact.addr), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, t.contact.addrLine), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, t.contact.addrCity), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, t.contact.addrSub))), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(IconPhone, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t.contact.phone), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, t.contact.phoneVal), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, t.contact.phoneSub))), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(IconMail, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t.contact.email), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, t.contact.emailVal), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, t.contact.emailSub))), /*#__PURE__*/React.createElement("div", {
    className: "info-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(IconMessage, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t.contact.whatsapp), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, t.contact.whatsappVal), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, t.contact.whatsappSub)))), /*#__PURE__*/React.createElement("form", {
    className: "contact-form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("h3", null, t.contact.formH), /*#__PURE__*/React.createElement("p", {
    className: "desc"
  }, t.contact.formSub), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, t.contact.name), /*#__PURE__*/React.createElement("input", {
    value: form.name,
    onChange: update('name'),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, t.contact.phone_f), /*#__PURE__*/React.createElement("input", {
    value: form.phone,
    onChange: update('phone'),
    placeholder: "+40 740 ..."
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, t.contact.email_f), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: form.email,
    onChange: update('email'),
    required: true,
    placeholder: "email@exemplu.ro"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, t.contact.interest), /*#__PURE__*/React.createElement("select", {
    value: form.interest,
    onChange: update('interest')
  }, /*#__PURE__*/React.createElement("option", {
    value: "i_specific"
  }, t.contact.i_specific), /*#__PURE__*/React.createElement("option", {
    value: "i_order"
  }, t.contact.i_order), /*#__PURE__*/React.createElement("option", {
    value: "i_finance"
  }, t.contact.i_finance), /*#__PURE__*/React.createElement("option", {
    value: "i_tradein"
  }, t.contact.i_tradein), /*#__PURE__*/React.createElement("option", {
    value: "i_other"
  }, t.contact.i_other))), form.interest === 'i_specific' && /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "Ma\u0219ina te intereseaz\u0103 (", inv.length, " disponibile \xEEn stoc)"), /*#__PURE__*/React.createElement("select", {
    value: form.carId,
    onChange: update('carId')
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Alege ma\u0219ina din stocul actual..."), inv.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.brand, " ", c.model, " ", c.variant, " \xB7 ", c.year, " \xB7 ", fmtKm(c.km), " km \xB7 \u20AC ", fmtPrice(c.price)))), form.carId && (() => {
    const c = inv.find(x => x.id === form.carId);
    return c ? /*#__PURE__*/React.createElement("div", {
      className: "contact-car-preview"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ccp-photo",
      style: {
        backgroundImage: `url(${c.photos[0]})`
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "ccp-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ccp-name"
    }, c.brand, " ", c.model), /*#__PURE__*/React.createElement("div", {
      className: "ccp-meta"
    }, c.variant, " \xB7 cod stoc ", c.stockCode || c.id), /*#__PURE__*/React.createElement("a", {
      className: "ccp-link",
      href: `#/auto/${c.id}`,
      onClick: e => {
        e.preventDefault();
        window.location.hash = `/auto/${c.id}`;
      }
    }, "Vezi pagina ma\u0219inii \u2192"))) : null;
  })()), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, t.contact.message), /*#__PURE__*/React.createElement("textarea", {
    rows: "4",
    value: form.message,
    onChange: update('message'),
    placeholder: "..."
  })), error && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      background: 'rgba(208,50,56,0.14)',
      border: '1px solid rgba(208,50,56,0.3)',
      color: '#ff8a90',
      fontSize: 12.5,
      fontWeight: 600,
      borderRadius: 12,
      lineHeight: 1.45
    }
  }, error), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary btn-lg",
    disabled: submitting,
    style: {
      alignSelf: 'flex-start',
      marginTop: 4
    }
  }, submitting ? 'Se trimite...' : /*#__PURE__*/React.createElement(React.Fragment, null, t.cta.sendMessage, " ", /*#__PURE__*/React.createElement(IconArrow, {
    size: 14,
    className: "arrow"
  })))))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 18,
      overflow: 'hidden',
      border: '1px solid var(--line-subtle)',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    title: "ADN Cars \xB7 Gala\u021bi",
    src: "https://www.openstreetmap.org/export/embed.html?bbox=28.034%2C45.450%2C28.058%2C45.462&layer=mapnik&marker=45.456%2C28.046",
    width: "100%",
    height: "400",
    style: {
      border: 0,
      display: 'block'
    },
    loading: "lazy",
    allowFullScreen: true
  }))));
}
// ============================================================
// LEASING
// ============================================================
function LeasingPage({ t }) {
  uE(() => {
    const w = "https://tally.so/widgets/embed.js";
    const load = () => { if (typeof Tally !== 'undefined') Tally.loadEmbeds(); };
    if (typeof Tally !== 'undefined') {
      load();
    } else if (!document.querySelector('script[src="' + w + '"]')) {
      const s = document.createElement("script");
      s.src = w;
      s.onload = load;
      s.onerror = load;
      document.body.appendChild(s);
    }
  }, []);

  const L = t.leasing;

  return /*#__PURE__*/React.createElement("section", {
    className: "page leasing-page",
    style: { paddingBottom: 80 }
  },
    /*#__PURE__*/React.createElement("div", { className: "leasing-hero" },
      /*#__PURE__*/React.createElement(Reveal, null,
        /*#__PURE__*/React.createElement("span", { className: "mono-eyebrow" }, L.eyebrow),
        /*#__PURE__*/React.createElement("h1", null,
          L.h1,
          /*#__PURE__*/React.createElement("em", null, L.h1em)
        ),
        /*#__PURE__*/React.createElement("p", { className: "leasing-lead" }, L.lead)
      )
    ),
    /*#__PURE__*/React.createElement("section", { className: "section-sm" },
      /*#__PURE__*/React.createElement(Reveal, null,
        /*#__PURE__*/React.createElement("div", { className: "leasing-stats" },
          L.conds.map(function(c, i) {
            return /*#__PURE__*/React.createElement("div", { className: "ls-card", key: i },
              /*#__PURE__*/React.createElement("div", { className: "ls-val" }, c.val),
              /*#__PURE__*/React.createElement("div", { className: "ls-label" }, c.lbl)
            );
          })
        )
      )
    ),
    /*#__PURE__*/React.createElement("section", { className: "section-sm" },
      /*#__PURE__*/React.createElement("div", { className: "leasing-cols" },
        /*#__PURE__*/React.createElement(Reveal, null,
          /*#__PURE__*/React.createElement("div", { className: "leasing-col" },
            /*#__PURE__*/React.createElement("span", { className: "mono-eyebrow" }, L.condKicker),
            /*#__PURE__*/React.createElement("h2", null, L.condH),
            /*#__PURE__*/React.createElement("ul", { className: "leasing-list" },
              L.condList.map(function(item, i) {
                return /*#__PURE__*/React.createElement("li", { key: i }, item);
              })
            )
          )
        ),
        /*#__PURE__*/React.createElement(Reveal, { delay: 80 },
          /*#__PURE__*/React.createElement("div", { className: "leasing-col" },
            /*#__PURE__*/React.createElement("span", { className: "mono-eyebrow" }, L.docKicker),
            /*#__PURE__*/React.createElement("h2", null, L.docH),
            /*#__PURE__*/React.createElement("ul", { className: "leasing-list" },
              L.docList.map(function(item, i) {
                return /*#__PURE__*/React.createElement("li", { key: i }, item);
              })
            )
          )
        )
      )
    ),
    /*#__PURE__*/React.createElement("section", { className: "section-sm" },
      /*#__PURE__*/React.createElement(Reveal, null,
        /*#__PURE__*/React.createElement("span", { className: "mono-eyebrow" }, L.howKicker),
        /*#__PURE__*/React.createElement("h2", { className: "leasing-notes-h" }, L.howH),
        /*#__PURE__*/React.createElement("div", { className: "leasing-notes" },
          L.steps.map(function(text, i) {
            return /*#__PURE__*/React.createElement("div", { className: "leasing-note", key: i },
              /*#__PURE__*/React.createElement("span", { className: "ln-num" }, String(i + 1).padStart(2, '0')),
              /*#__PURE__*/React.createElement("p", null, text)
            );
          })
        )
      )
    ),
    /*#__PURE__*/React.createElement("section", { className: "section-sm" },
      /*#__PURE__*/React.createElement(Reveal, null,
        /*#__PURE__*/React.createElement("div", { className: "section-head", style: { marginBottom: 36 } },
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("span", { className: "mono-eyebrow" }, L.formKicker),
            /*#__PURE__*/React.createElement("h2", null, L.formH),
            /*#__PURE__*/React.createElement("p", { style: { fontSize: 15, color: 'var(--fg-muted)', marginTop: 8, maxWidth: 520 } },
              L.formLead
            )
          )
        ),
        /*#__PURE__*/React.createElement("div", { className: "leasing-form-panel" },
          /*#__PURE__*/React.createElement("iframe", {
            "data-tally-src": "https://tally.so/embed/Zjadk0?alignLeft=1&hideTitle=1&dynamicHeight=1",
            loading: "lazy",
            width: "100%",
            height: "1016",
            frameBorder: "0",
            marginHeight: "0",
            marginWidth: "0",
            title: L.formH,
            style: { border: 'none', display: 'block' }
          })
        )
      )
    )
  );
}

function CumFunctioneazaPage({ t }) {
  const steps = [
    {
      title: 'Consultație gratuită',
      desc: 'Ne spui ce cauți. Buget, marcă, dotări. 30 de minute pe telefon sau WhatsApp.'
    },
    {
      title: 'Căutăm pentru tine',
      desc: 'Scanăm zilnic Mobile.de, AutoScout24 și rețeaua noastră din Germania, Belgia și Olanda. Criterii stricte: sub 100.000 km, an 2022+, fără avarii, TVA deductibil.'
    },
    {
      title: 'Prezentăm opțiunile',
      desc: 'Primești 2-3 propuneri cu raport complet: inspecție 145 puncte, istoricul mașinii, costul total (mașină + transport + taxe).'
    },
    {
      title: 'Comandă și transport',
      desc: 'Confirmi, achitam avansul și mașina pornește spre tine. Transport pe platformă din țara de origine până la adresa ta.'
    },
    {
      title: 'Livrare și garanție',
      desc: 'Primești mașina la ușă cu garanție 12 luni inclusă. Gata de drum.'
    }
  ];

  return /*#__PURE__*/React.createElement("div", null,
    /*#__PURE__*/React.createElement("div", { className: "page page-narrow section" },
      /*#__PURE__*/React.createElement(Reveal, null,
        /*#__PURE__*/React.createElement("div", { className: "section-head" },
          /*#__PURE__*/React.createElement("div", null,
            /*#__PURE__*/React.createElement("span", { className: "mono-eyebrow" }, "Procesul nostru"),
            /*#__PURE__*/React.createElement("h1", null, "Cum funcționează")
          ),
          /*#__PURE__*/React.createElement("p", { className: "lead" }, "De la dorință la cheile mașinii — 5 pași simpli.")
        )
      ),
      /*#__PURE__*/React.createElement(Reveal, null,
        /*#__PURE__*/React.createElement("div", { className: "process-steps" },
          steps.map((step, i) => /*#__PURE__*/React.createElement("div", { className: "process-step", key: i },
            /*#__PURE__*/React.createElement("div", { className: "step-num" }, i + 1),
            /*#__PURE__*/React.createElement("div", { className: "step-body" },
              /*#__PURE__*/React.createElement("h3", null, step.title),
              /*#__PURE__*/React.createElement("p", null, step.desc)
            )
          ))
        )
      ),
      /*#__PURE__*/React.createElement(Reveal, null,
        /*#__PURE__*/React.createElement("div", { className: "process-cta" },
          /*#__PURE__*/React.createElement("h2", null, "Hai să discutăm"),
          /*#__PURE__*/React.createElement("p", null, "O conversație de 30 de minute. Fără presiune, fără obligații. Găsim împreună mașina perfectă pentru tine."),
          /*#__PURE__*/React.createElement("a", {
            className: "btn btn-primary",
            href: "#/programare",
            onClick: e => { e.preventDefault(); window.location.hash = '/programare'; }
          }, "Programează o consultație gratuită")
        )
      )
    )
  );
}

Object.assign(window, {
  HomePage,
  StocPage,
  DetailPage,
  DesprePage,
  ContactPage,
  LeasingPage,
  BookingTeaser,
  CumFunctioneazaPage
});