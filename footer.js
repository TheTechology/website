/* Shared footer — vanilla JS, bilingual RO/EN */
(function () {
  const isEn = window.location.pathname.split('/').filter(Boolean).includes('en');
  const base = isEn ? '../' : '';

  const SVG = (content, size) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size||14}" height="${size||14}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`;

  const arrow_ur = SVG('<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>');
  const message  = SVG('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>');

  const T = {
    ro: {
      desc: 'Mașini premium importate la comandă din Germania, de calitate certificată, cu achiziție în leasing. Livrare oriunde în România.',
      start: 'Pornesc comanda',
      discover: 'Descoperă modelele',
      stockTitle: 'Stoc',
      stockLinks: ['Mașini rulate', 'Comenzi noi', 'Electrice &amp; hibrid', 'SUV'],
      servicesTitle: 'Servicii',
      servicesLinks: ['Programare consultant', 'Buy-back', 'Import la comandă', 'Garanție extinsă'],
      companyTitle: 'Companie',
      companyLinks: ['Despre noi', 'Echipa', 'Contact', 'Cariere'],
      legal: '©️ 2026 ADN Automotive Experts SRL · CUI RO51019008 · J2024048245005 · Toate drepturile rezervate.',
      terms: 'Termeni',
      privacy: 'Confidențialitate',
      cookie: 'Cookie',
    },
    en: {
      desc: 'Premium cars imported to order from Germany, certified quality, purchased on lease. Delivered anywhere in Romania.',
      start: 'Start my order',
      discover: 'Browse cars',
      stockTitle: 'Cars',
      stockLinks: ['Used cars', 'New orders', 'Electric &amp; hybrid', 'SUV'],
      servicesTitle: 'Services',
      servicesLinks: ['Book a consultant', 'Buy-back', 'Import to order', 'Extended warranty'],
      companyTitle: 'Company',
      companyLinks: ['About us', 'Team', 'Contact', 'Careers'],
      legal: '©️ 2026 ADN Automotive Experts SRL · VAT RO51019008 · J2024048245005 · All rights reserved.',
      terms: 'Terms',
      privacy: 'Privacy',
      cookie: 'Cookie',
    },
  };
  const l = T[isEn ? 'en' : 'ro'];

  const html = `
<footer>
  <div class="page-narrow">
    <div class="grid">
      <div>
        <a class="brand" href="${base}index.html">
          <img class="brand-logo brand-logo-dark" src="https://i.ibb.co/6RckDVsj/logo-transparent-ADN-CARS-fundal-negru.png" alt="ADN Cars" width="128" height="72">
          <img class="brand-logo brand-logo-light" src="https://i.ibb.co/v6P70Gf2/ADN-Cars-logo-transparent-fundal-deschis.png" alt="ADN Cars" width="128" height="72">
        </a>
        <p class="desc" style="margin-top:18px">${l.desc}</p>
        <div style="margin-top:22px;display:flex;gap:8px">
          <a href="${base}${isEn ? 'en/' : ''}contact.html" class="btn btn-ghost btn-sm">${message} ${l.start}</a>
          <a href="${base}${isEn ? 'en/' : ''}stoc.html" class="btn btn-outline btn-sm">${l.discover} ${arrow_ur}</a>
        </div>
      </div>
      <div>
        <h5>${l.stockTitle}</h5>
        <a href="stoc.html">${l.stockLinks[0]}</a>
        <a href="stoc.html">${l.stockLinks[1]}</a>
        <a href="stoc.html">${l.stockLinks[2]}</a>
        <a href="stoc.html">${l.stockLinks[3]}</a>
      </div>
      <div>
        <h5>${l.servicesTitle}</h5>
        <a href="programare.html">${l.servicesLinks[0]}</a>
        <a href="contact.html">${l.servicesLinks[1]}</a>
        <a href="contact.html">${l.servicesLinks[2]}</a>
        <a href="contact.html">${l.servicesLinks[3]}</a>
      </div>
      <div>
        <h5>${l.companyTitle}</h5>
        <a href="despre.html">${l.companyLinks[0]}</a>
        <a href="despre.html">${l.companyLinks[1]}</a>
        <a href="contact.html">${l.companyLinks[2]}</a>
        <a href="despre.html">${l.companyLinks[3]}</a>
      </div>
      <div class="legal">
        <span style="display:block;margin-bottom:6px;color:var(--fg-faint);font-size:12px">${isEn ? 'ADNcars.ro is part of the ADN Finanz group' : 'ADNcars.ro este parte din grupul ADN Finanz'}</span>
        <span>${l.legal}</span>
        <span style="display:inline-flex;gap:18px;flex-wrap:wrap">
          <a href="${base}${isEn ? 'en/' : ''}termeni.html" style="display:inline">${l.terms}</a>
          <a href="${base}${isEn ? 'en/' : ''}confidentialitate.html" style="display:inline">${l.privacy}</a>
          <a href="${base}${isEn ? 'en/' : ''}confidentialitate.html" style="display:inline">${l.cookie}</a>
          <a href="#" style="display:inline">ANPC</a>
        </span>
      </div>
    </div>
  </div>
</footer>`;

  const root = document.getElementById('footer-root');
  if (root) root.innerHTML = html;
})();
