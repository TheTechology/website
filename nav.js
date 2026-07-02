/* Shared navigation — vanilla JS, bilingual RO/EN */
(function () {
  // ── Language detection ─────────────────────────────────────────────────────
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const isEn = pathParts.includes('en');
  const currentLang = isEn ? 'en' : 'ro';

  const LABELS = {
    ro: {
      cars: 'Mașini',
      howItWorks: 'Cum funcționează',
      financing: 'Leasing Startup-uri',
      broker: 'Devino Broker',
      about: 'Despre noi',
      contact: 'Contact',
      home: 'Acasă',
      consultation: 'Consultanță',
      concierge: 'Concierge',
      callNow: 'Sună acum',
      quickReply: 'Răspuns rapid',
      waText: 'Bună ziua! Aș dori informații despre o mașină.',
    },
    en: {
      cars: 'Cars',
      howItWorks: 'How It Works',
      financing: 'Startup Leasing',
      broker: 'Become a Broker',
      about: 'About Us',
      contact: 'Contact',
      home: 'Home',
      consultation: 'Consultation',
      concierge: 'Concierge',
      callNow: 'Call now',
      quickReply: 'Quick reply',
      waText: 'Hello! I would like information about a car.',
    },
  };
  const t = LABELS[currentLang];

  // ── Icons ──────────────────────────────────────────────────────────────────
  const SVG = (content, size, extra) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size||18}" height="${size||18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"${extra||''}>${content}</svg>`;

  const ICONS = {
    calendar: SVG('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
    shield: SVG('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    arrow: SVG('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'),
    close: SVG('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
    phone: SVG('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>'),
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`,
    sun: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>`,
    moon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  };

  // ── Active link detection ──────────────────────────────────────────────────
  function getActiveClass(href) {
    const p = window.location.pathname;
    const fname = p.split('/').pop() || 'index.html';
    if (href === 'index.html' && (fname === '' || fname === 'index.html')) return ' active';
    if (href !== 'index.html' && fname === href) return ' active';
    return '';
  }
  function isActive(href) { return getActiveClass(href) === ' active'; }

  const cfg = window.ADN_CONFIG || {};
  const phone = cfg.phone || '+40 374 123 456';
  const phoneRaw = cfg.phoneRaw || '+40374123456';
  const waRaw = cfg.whatsappRaw || '40740123456';
  const waUrl = `https://wa.me/${waRaw}?text=${encodeURIComponent(t.waText)}`;

  const navLinks = [
    { href: 'stoc.html', label: t.cars },
    { href: 'cum-functioneaza.html', label: t.howItWorks },
    { href: 'leasing.html', label: t.financing, badge: '3.9%', finance: true },
    { href: 'devino-broker-auto.html', label: t.broker, badge: 'NOU' },
    { href: 'despre.html', label: t.about },
    { href: 'contact.html', label: t.contact },
  ];

  function buildDesktopLinks() {
    return navLinks.map(l => {
      const active = getActiveClass(l.href);
      const badge = l.badge ? `<span class="nav-link-badge">${l.badge}</span>` : '';
      const cls = `nav-link${l.finance ? ' nav-link-finance' : ''}${active}`;
      return `<a class="${cls}" href="${l.href}">${l.label}${badge}</a>`;
    }).join('');
  }

  function buildDrawerLinks() {
    const all = [
      { href: 'index.html', label: t.home },
      ...navLinks,
      { href: 'programare.html', label: t.consultation },
    ];
    return all.map(l => {
      const active = isActive(l.href) ? ' active' : '';
      return `<a class="ndp-link${active}" href="${l.href}">${l.label}</a>`;
    }).join('');
  }

  const roActive = currentLang === 'ro' ? ' active' : '';
  const enActive = currentLang === 'en' ? ' active' : '';
  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  const html = `
<div class="nav-wrap">
  <nav class="nav">
    <a class="brand" href="index.html">
      <img class="brand-logo brand-logo-dark" src="https://i.ibb.co/6RckDVsj/logo-transparent-ADN-CARS-fundal-negru.png" alt="ADN Cars" width="128" height="72">
      <img class="brand-logo brand-logo-light" src="https://i.ibb.co/v6P70Gf2/ADN-Cars-logo-transparent-fundal-deschis.png" alt="ADN Cars" width="128" height="72">
    </a>
    <div class="nav-links nav-links-desktop">
      ${buildDesktopLinks()}
    </div>
    <div class="nav-spacer"></div>
    <div class="nav-mobile-actions">
      <button class="theme-toggle" id="adn-theme-toggle-mobile" aria-label="Toggle theme"></button>
      <div class="lang-switch">
        <button class="lang-btn${roActive}" id="lang-ro-m">RO</button>
        <button class="lang-btn${enActive}" id="lang-en-m">EN</button>
      </div>
    </div>
    <div class="nav-right-desktop">
      <button class="theme-toggle" id="adn-theme-toggle" aria-label="Toggle theme"></button>
      <div class="lang-switch">
        <button class="lang-btn${roActive}" id="lang-ro-d">RO</button>
        <button class="lang-btn${enActive}" id="lang-en-d">EN</button>
      </div>
      <a class="nav-concierge" href="${isEn ? '../' : ''}admin.html" title="${isEn ? 'Partner access · authentication required' : 'Acces partener · necesită autentificare'}">
        ${ICONS.shield} ${t.concierge}
      </a>
      <a class="btn btn-primary btn-sm nav-cta" href="programare.html">
        ${ICONS.calendar} ${t.consultation}
      </a>
    </div>
    <button class="nav-burger" id="adn-nav-burger" aria-label="Menu" aria-expanded="false">
      <span class="burger" id="adn-burger-icon"><span></span><span></span><span></span></span>
    </button>
  </nav>
</div>

<div class="nav-drawer" id="adn-nav-drawer">
  <div class="nav-drawer-panel">
    <div class="ndp-head">
      <a class="brand" href="index.html">
        <img class="brand-logo brand-logo-dark" src="https://i.ibb.co/6RckDVsj/logo-transparent-ADN-CARS-fundal-negru.png" alt="ADN Cars" width="128" height="72">
        <img class="brand-logo brand-logo-light" src="https://i.ibb.co/v6P70Gf2/ADN-Cars-logo-transparent-fundal-deschis.png" alt="ADN Cars" width="128" height="72">
      </a>
      <button class="ndp-close" id="adn-drawer-close" aria-label="Close">${ICONS.close}</button>
    </div>
    <div class="ndp-links">
      ${buildDrawerLinks()}
    </div>
    <div class="ndp-contact-row">
      <a class="ndp-contact-btn ndp-contact-btn-ph" href="tel:${phoneRaw}" aria-label="${t.callNow}">
        ${ICONS.phone}
        <div><div>${t.callNow}</div><div class="ndp-contact-btn-label">${phone}</div></div>
      </a>
      <a class="ndp-contact-btn ndp-contact-btn-wa" href="${waUrl}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        ${ICONS.whatsapp}
        <div><div>WhatsApp</div><div class="ndp-contact-btn-label">${t.quickReply}</div></div>
      </a>
    </div>
    <div class="ndp-foot">
      <div class="ndp-foot-top">
        <div class="lang-switch">
          <button class="lang-btn${roActive}" id="lang-ro-dw">RO</button>
          <button class="lang-btn${enActive}" id="lang-en-dw">EN</button>
        </div>
        <button class="theme-toggle" id="adn-theme-toggle-drawer" aria-label="Toggle theme"></button>
      </div>
      <a class="btn btn-primary btn-lg" href="programare.html">
        ${ICONS.calendar} ${t.consultation} ${ICONS.arrow}
      </a>
      <a class="ndp-concierge" href="${isEn ? '../' : ''}admin.html">${ICONS.shield} ${t.concierge} · ${isEn ? 'partner access' : 'acces partener'}</a>
    </div>
  </div>
</div>`;

  const root = document.getElementById('nav-root');
  if (root) root.innerHTML = html;

  // ── Theme ──────────────────────────────────────────────────────────────────
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('adn-theme', theme);
    const icon = theme === 'dark' ? ICONS.sun : ICONS.moon;
    ['adn-theme-toggle','adn-theme-toggle-drawer','adn-theme-toggle-mobile'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = icon;
    });
    // Explicit JS logo switching (dark theme → light text logo; light theme → dark text logo)
    const isDarkTheme = theme === 'dark';
    document.querySelectorAll('.brand-logo-dark').forEach(el => {
      el.style.display = isDarkTheme ? 'block' : 'none';
    });
    document.querySelectorAll('.brand-logo-light').forEach(el => {
      el.style.display = isDarkTheme ? 'none' : 'block';
    });
  }

  const savedTheme = localStorage.getItem('adn-theme') || 'dark';
  applyTheme(savedTheme);

  ['adn-theme-toggle','adn-theme-toggle-drawer','adn-theme-toggle-mobile'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      applyTheme(isDark() ? 'light' : 'dark');
    });
  });

  // ── Language switcher ─────────────────────────────────────────────────────
  function switchLang(targetLang) {
    if (targetLang === currentLang) return;
    localStorage.setItem('adn-lang', targetLang);
    const filename = window.location.pathname.split('/').pop() || 'index.html';
    const search = window.location.search;
    if (targetLang === 'en') {
      window.location.href = 'en/' + filename + search;
    } else {
      window.location.href = '../' + filename + search;
    }
  }

  ['lang-ro-d','lang-ro-m','lang-ro-dw'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => switchLang('ro'));
  });
  ['lang-en-d','lang-en-m','lang-en-dw'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => switchLang('en'));
  });

  // ── Mobile drawer ──────────────────────────────────────────────────────────
  const burger = document.getElementById('adn-nav-burger');
  const drawer = document.getElementById('adn-nav-drawer');
  const drawerClose = document.getElementById('adn-drawer-close');

  const burgerIcon = document.getElementById('adn-burger-icon');
  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    burger?.setAttribute('aria-expanded', 'true');
    burgerIcon?.classList.add('open');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    burger?.setAttribute('aria-expanded', 'false');
    burgerIcon?.classList.remove('open');
  }

  burger?.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
  drawerClose?.addEventListener('click', closeDrawer);
  drawer?.addEventListener('click', e => { if (e.target === drawer) closeDrawer(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  // ── Scroll: deepen nav background slightly when scrolled ──────────────────
  const navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 20;
      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      if (scrolled) {
        navWrap.style.background = dark ? 'rgba(5, 4, 2, 0.97)' : 'rgba(254, 252, 249, 0.98)';
      } else {
        navWrap.style.background = '';
      }
    }, { passive: true });
  }

  // ── Reveal on scroll ───────────────────────────────────────────────────────
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) el.classList.add('in');
      else io.observe(el);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initReveal);
  else initReveal();

  // ── Public API ─────────────────────────────────────────────────────────────
  window.ADN_NAV = {
    setLang: switchLang,
    applyTheme,
    currentLang,
  };
})();
