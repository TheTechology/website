function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Shared components for ADN Cars */

const {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback
} = React;

// ---------- Reveal-on-scroll hook ----------
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Immediately fire if element is already in/near viewport on mount
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * 0.95) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -10px 0px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
const Reveal = ({
  children,
  delay = 0,
  className = '',
  as: As = 'div',
  ...rest
}) => {
  const ref = useReveal();
  return /*#__PURE__*/React.createElement(As, _extends({
    ref: ref,
    className: `reveal ${className}`,
    style: {
      transitionDelay: `${delay}ms`
    }
  }, rest), children);
};

// ---------- CountUp ----------
function CountUp({
  to,
  duration = 1400,
  prefix = '',
  suffix = '',
  decimals = 0
}) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const step = t => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.3
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref
  }, prefix, val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ','), suffix);
}

// ---------- Brand mark ----------
const BrandMark = ({
  size = 22
}) => /*#__PURE__*/React.createElement("a", {
  href: "#/",
  className: "brand",
  onClick: e => {
    e.preventDefault();
    window.location.hash = '/';
  }
}, /*#__PURE__*/React.createElement(BrandHelix, {
  size: size + 6
}), /*#__PURE__*/React.createElement("span", null, "ADN", /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--accent)'
  }
}, "\xB7"), "Cars"));

// ---------- Nav ----------
function Nav({
  route,
  lang,
  setLang,
  t
}) {
  const [open, setOpen] = useState(false);
  const onNav = (e, hash) => {
    e.preventDefault();
    window.location.hash = hash;
    setOpen(false);
  };
  const isActive = prefix => prefix === '/' ? route === '/' || route === '' : route.startsWith(prefix);

  // Close drawer on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    className: "nav-wrap"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement(BrandMark, null), /*#__PURE__*/React.createElement("div", {
    className: "nav-links nav-links-desktop"
  }, /*#__PURE__*/React.createElement("a", {
    className: `nav-link ${isActive('/') ? 'active' : ''}`,
    href: "#/",
    onClick: e => onNav(e, '/')
  }, t.nav.home), /*#__PURE__*/React.createElement("a", {
    className: `nav-link ${isActive('/stoc') ? 'active' : ''}`,
    href: "#/stoc",
    onClick: e => onNav(e, '/stoc')
  }, t.nav.inventory), /*#__PURE__*/React.createElement("a", {
    className: `nav-link ${route === '/programare' ? 'active' : ''}`,
    href: "#/programare",
    onClick: e => onNav(e, '/programare')
  }, t.nav.programare), /*#__PURE__*/React.createElement("a", {
    className: `nav-link ${isActive('/despre') ? 'active' : ''}`,
    href: "#/despre",
    onClick: e => onNav(e, '/despre')
  }, t.nav.about), /*#__PURE__*/React.createElement("a", {
    className: `nav-link ${isActive('/contact') ? 'active' : ''}`,
    href: "#/contact",
    onClick: e => onNav(e, '/contact')
  }, t.nav.contact)), /*#__PURE__*/React.createElement("div", {
    className: "nav-spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lang-switch nav-mobile-lang"
  }, /*#__PURE__*/React.createElement("button", {
    className: `lang-btn ${lang === 'ro' ? 'active' : ''}`,
    onClick: () => setLang('ro')
  }, "RO"), /*#__PURE__*/React.createElement("button", {
    className: `lang-btn ${lang === 'en' ? 'active' : ''}`,
    onClick: () => setLang('en')
  }, "EN")), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary btn-sm nav-cta nav-cta-mobile",
    href: "#/programare",
    onClick: e => onNav(e, '/programare')
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-cta-text"
  }, t.nav.programare))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right-desktop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lang-switch"
  }, /*#__PURE__*/React.createElement("button", {
    className: `lang-btn ${lang === 'ro' ? 'active' : ''}`,
    onClick: () => setLang('ro')
  }, "RO"), /*#__PURE__*/React.createElement("button", {
    className: `lang-btn ${lang === 'en' ? 'active' : ''}`,
    onClick: () => setLang('en')
  }, "EN")), /*#__PURE__*/React.createElement("a", {
    className: "nav-concierge",
    href: "#/admin",
    onClick: e => onNav(e, '/admin'),
    title: "Acces partener \xB7 necesit\u0103 autentificare"
  }, /*#__PURE__*/React.createElement(IconShield, {
    size: 13
  }), " Concierge"), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary btn-sm nav-cta",
    href: "#/programare",
    onClick: e => onNav(e, '/programare')
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 14
  }), " ", t.nav.programare)), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    onClick: () => setOpen(o => !o),
    "aria-label": "Menu",
    "aria-expanded": open
  }, /*#__PURE__*/React.createElement("span", {
    className: `burger ${open ? 'open' : ''}`
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)))), /*#__PURE__*/React.createElement("div", {
    className: `nav-drawer ${open ? 'open' : ''}`,
    onClick: () => setOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-drawer-panel",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "ndp-head"
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 22
  }), /*#__PURE__*/React.createElement("button", {
    className: "ndp-close",
    onClick: () => setOpen(false),
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(IconClose, {
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ndp-links"
  }, /*#__PURE__*/React.createElement("a", {
    className: `ndp-link ${isActive('/') ? 'active' : ''}`,
    href: "#/",
    onClick: e => onNav(e, '/')
  }, t.nav.home), /*#__PURE__*/React.createElement("a", {
    className: `ndp-link ${isActive('/stoc') ? 'active' : ''}`,
    href: "#/stoc",
    onClick: e => onNav(e, '/stoc')
  }, t.nav.inventory), /*#__PURE__*/React.createElement("a", {
    className: `ndp-link ${route === '/programare' ? 'active' : ''}`,
    href: "#/programare",
    onClick: e => onNav(e, '/programare')
  }, t.nav.programare), /*#__PURE__*/React.createElement("a", {
    className: `ndp-link ${isActive('/despre') ? 'active' : ''}`,
    href: "#/despre",
    onClick: e => onNav(e, '/despre')
  }, t.nav.about), /*#__PURE__*/React.createElement("a", {
    className: `ndp-link ${isActive('/contact') ? 'active' : ''}`,
    href: "#/contact",
    onClick: e => onNav(e, '/contact')
  }, t.nav.contact)), /*#__PURE__*/React.createElement("div", {
    className: "ndp-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lang-switch"
  }, /*#__PURE__*/React.createElement("button", {
    className: `lang-btn ${lang === 'ro' ? 'active' : ''}`,
    onClick: () => setLang('ro')
  }, "RO"), /*#__PURE__*/React.createElement("button", {
    className: `lang-btn ${lang === 'en' ? 'active' : ''}`,
    onClick: () => setLang('en')
  }, "EN")), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-primary btn-lg",
    href: "#/programare",
    onClick: e => onNav(e, '/programare')
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 14
  }), " ", t.nav.programare, " ", /*#__PURE__*/React.createElement(IconArrow, {
    size: 14,
    className: "arrow"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ndp-concierge",
    href: "#/admin",
    onClick: e => onNav(e, '/admin')
  }, /*#__PURE__*/React.createElement(IconShield, {
    size: 13
  }), " Concierge \xB7 acces partener")))));
}

// ---------- Footer ----------
function Footer({
  t
}) {
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "page-narrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BrandMark, {
    size: 28
  }), /*#__PURE__*/React.createElement("p", {
    className: "desc",
    style: {
      marginTop: 18
    }
  }, t.footer.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#/contact",
    className: "btn btn-ghost btn-sm",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/contact';
    }
  }, /*#__PURE__*/React.createElement(IconMessage, {
    size: 14
  }), " ", t.cta.contact), /*#__PURE__*/React.createElement("a", {
    href: "#/stoc",
    className: "btn btn-outline btn-sm",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/stoc';
    }
  }, t.cta.seeStock, " ", /*#__PURE__*/React.createElement(IconArrowUR, {
    size: 14
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, t.footer.stock), /*#__PURE__*/React.createElement("a", {
    href: "#/stoc",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/stoc';
    }
  }, t.footer.s_used), /*#__PURE__*/React.createElement("a", {
    href: "#/stoc",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/stoc';
    }
  }, t.footer.s_new), /*#__PURE__*/React.createElement("a", {
    href: "#/stoc",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/stoc';
    }
  }, t.footer.s_ev), /*#__PURE__*/React.createElement("a", {
    href: "#/stoc",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/stoc';
    }
  }, t.footer.s_suv)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, t.footer.services), /*#__PURE__*/React.createElement("a", {
    href: "#/programare",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/programare';
    }
  }, t.footer.sv_finance), /*#__PURE__*/React.createElement("a", {
    href: "#/contact",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/contact';
    }
  }, t.footer.sv_buyback), /*#__PURE__*/React.createElement("a", {
    href: "#/contact",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/contact';
    }
  }, t.footer.sv_import), /*#__PURE__*/React.createElement("a", {
    href: "#/contact",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/contact';
    }
  }, t.footer.sv_warranty)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, t.footer.company), /*#__PURE__*/React.createElement("a", {
    href: "#/despre",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/despre';
    }
  }, t.footer.c_about), /*#__PURE__*/React.createElement("a", {
    href: "#/despre",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/despre';
    }
  }, t.footer.c_team), /*#__PURE__*/React.createElement("a", {
    href: "#/contact",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/contact';
    }
  }, t.footer.c_contact), /*#__PURE__*/React.createElement("a", {
    href: "#/despre",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/despre';
    }
  }, t.footer.c_careers)), /*#__PURE__*/React.createElement("div", {
    className: "legal"
  }, /*#__PURE__*/React.createElement("span", null, t.footer.copy), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 18,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: 'inline'
    }
  }, t.footer.l_terms), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: 'inline'
    }
  }, t.footer.l_privacy), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: 'inline'
    }
  }, t.footer.l_cookies), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: 'inline'
    }
  }, t.footer.l_anpc))))));
}

// ---------- Car card ----------
function CarCard({
  car,
  saved,
  onToggleSave,
  t
}) {
  const goto = e => {
    e.preventDefault();
    window.location.hash = `/auto/${car.id}`;
  };
  const handleSave = e => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSave(car.id);
  };
  return /*#__PURE__*/React.createElement("a", {
    className: "car-card",
    href: `#/auto/${car.id}`,
    onClick: goto
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo",
    style: {
      backgroundImage: `url(${car.photos[0]})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "badges"
  }, car.badge && /*#__PURE__*/React.createElement("span", {
    className: "badge badge-accent"
  }, car.badge), car.fuel === 'electric' && /*#__PURE__*/React.createElement("span", {
    className: "badge badge-dark"
  }, /*#__PURE__*/React.createElement(IconBolt, {
    size: 10
  }), " EV")), /*#__PURE__*/React.createElement("button", {
    className: `save ${saved ? 'saved' : ''}`,
    onClick: handleSave,
    "aria-label": "save"
  }, saved ? /*#__PURE__*/React.createElement(IconHeartFill, {
    size: 16
  }) : /*#__PURE__*/React.createElement(IconHeart, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    className: "price-tag"
  }, "\u20AC ", fmtPrice(car.price))), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "title"
  }, car.brand, " ", car.model), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, car.variant, " \xB7 ", car.color)), /*#__PURE__*/React.createElement("div", {
    className: "specs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, /*#__PURE__*/React.createElement(IconCalendar, null), " ", car.year), /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, /*#__PURE__*/React.createElement(IconRoad, null), " ", fmtKm(car.km), " km"), /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, /*#__PURE__*/React.createElement(IconFuel, null), " ", FUELS[car.fuel]), /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, /*#__PURE__*/React.createElement(IconGauge, null), " ", car.hp, " ", t.detail.hp))));
}
function CarRow({
  car,
  saved,
  onToggleSave,
  t
}) {
  const goto = e => {
    e.preventDefault();
    window.location.hash = `/auto/${car.id}`;
  };
  return /*#__PURE__*/React.createElement("a", {
    className: "car-row",
    href: `#/auto/${car.id}`,
    onClick: goto
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo",
    style: {
      backgroundImage: `url(${car.photos[0]})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("h4", null, car.brand, " ", car.model), /*#__PURE__*/React.createElement("p", null, car.variant, " \xB7 ", car.year, " \xB7 ", car.color), /*#__PURE__*/React.createElement("div", {
    className: "specs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, /*#__PURE__*/React.createElement(IconRoad, null), " ", fmtKm(car.km), " km"), /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, /*#__PURE__*/React.createElement(IconFuel, null), " ", FUELS[car.fuel]), /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, /*#__PURE__*/React.createElement(IconCog, null), " ", GEARS[car.gear]), /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, /*#__PURE__*/React.createElement(IconGauge, null), " ", car.hp, " ", t.detail.hp), /*#__PURE__*/React.createElement("span", {
    className: "s"
  }, /*#__PURE__*/React.createElement(IconCar, null), " ", car.body))), /*#__PURE__*/React.createElement("div", {
    className: "price"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p"
  }, "\u20AC ", fmtPrice(car.price)), /*#__PURE__*/React.createElement("div", {
    className: "m"
  }, t.detail.includesVAT), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: 13,
      color: 'var(--accent)',
      fontWeight: 700
    }
  }, "de la \u20AC ", car.leasing, "/lun\u0103")));
}

// ---------- Finance calculator ----------
function FinanceCalculator({
  t,
  defaultPrice = 38500
}) {
  const [price, setPrice] = useState(defaultPrice);
  const [downPct, setDownPct] = useState(20);
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(8.9);
  const downAmt = Math.round(price * downPct / 100);
  const principal = price - downAmt;
  const monthly = calcMonthly(principal, rate, months);
  const totalCost = monthly * months + downAmt;
  return /*#__PURE__*/React.createElement("div", {
    className: "calc-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calc-left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.sections.financeKicker), /*#__PURE__*/React.createElement("h2", null, t.sections.financeH), /*#__PURE__*/React.createElement("p", null, t.sections.financeSub), /*#__PURE__*/React.createElement("div", {
    className: "calc-stack"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calc-result"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t.finance.monthly), /*#__PURE__*/React.createElement("div", {
    className: "big num"
  }, "\u20AC ", fmtPrice(Math.round(monthly)), /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, t.detail.perMonth)), /*#__PURE__*/React.createElement("div", {
    className: "splits"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, t.finance.totalCredit, /*#__PURE__*/React.createElement("strong", null, "\u20AC ", fmtPrice(Math.round(principal)))), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, t.finance.totalCost, /*#__PURE__*/React.createElement("strong", null, "\u20AC ", fmtPrice(Math.round(totalCost)))))), /*#__PURE__*/React.createElement("a", {
    href: "#/contact",
    className: "btn btn-primary btn-lg",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/contact';
    },
    style: {
      alignSelf: 'flex-start'
    }
  }, t.cta.apply, " ", /*#__PURE__*/React.createElement(IconArrow, {
    size: 16,
    className: "arrow"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "calc-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("label", null, t.finance.price), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "\u20AC ", fmtPrice(price))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "10000",
    max: "120000",
    step: "500",
    value: price,
    onChange: e => setPrice(+e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("label", null, t.finance.down), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, downPct, "% \xB7 \u20AC ", fmtPrice(downAmt))), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "50",
    step: "1",
    value: downPct,
    onChange: e => setDownPct(+e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("label", null, t.finance.months), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, months, " ", t.finance.months_n)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "12",
    max: "84",
    step: "6",
    value: months,
    onChange: e => setMonths(+e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("label", null, t.finance.rate), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, rate.toFixed(1), "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "3",
    max: "14",
    step: "0.1",
    value: rate,
    onChange: e => setRate(+e.target.value)
  }))));
}

// ---------- Toast ----------
function Toast({
  message,
  show
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `toast ${show ? 'show' : ''}`
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 14,
    strokeWidth: 3
  }), " ", message);
}
Object.assign(window, {
  useReveal,
  Reveal,
  CountUp,
  BrandMark,
  Nav,
  Footer,
  CarCard,
  CarRow,
  FinanceCalculator,
  Toast,
  AdminLauncher
});

// ---------- Admin launcher (two visible labeled pills on public pages) ----------
function AdminLauncher() {
  const go = (e, hash) => {
    e.preventDefault();
    window.location.hash = hash;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-launcher"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-launcher-title"
  }, "Acces admin"), /*#__PURE__*/React.createElement("a", {
    className: "adm-launcher-btn",
    href: "#/admin",
    onClick: e => go(e, '/admin')
  }, /*#__PURE__*/React.createElement("span", {
    className: "alb-ic"
  }, /*#__PURE__*/React.createElement(IconCar, null)), /*#__PURE__*/React.createElement("span", {
    className: "alb-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "alb-h"
  }, "Admin \xB7 Stoc ma\u0219ini"), /*#__PURE__*/React.createElement("span", {
    className: "alb-s"
  }, "12 ma\u0219ini \xB7 3 draft-uri")), /*#__PURE__*/React.createElement(IconArrowUR, {
    size: 14,
    className: "alb-arrow"
  })), /*#__PURE__*/React.createElement("a", {
    className: "adm-launcher-btn",
    href: "#/admin/echipa",
    onClick: e => go(e, '/admin/echipa')
  }, /*#__PURE__*/React.createElement("span", {
    className: "alb-ic"
  }, /*#__PURE__*/React.createElement(IconHandshake, null)), /*#__PURE__*/React.createElement("span", {
    className: "alb-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "alb-h"
  }, "Admin \xB7 Echipa"), /*#__PURE__*/React.createElement("span", {
    className: "alb-s"
  }, "4 consultan\u021Bi activi")), /*#__PURE__*/React.createElement(IconArrowUR, {
    size: 14,
    className: "alb-arrow"
  })));
}