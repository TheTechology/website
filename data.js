/* Inventory data + helpers for ADN Cars.
   Plausible Romanian premium-import dealership stock.
   Photos use Unsplash source URLs (real car shots).
*/

const FUELS = {
  diesel: 'Diesel',
  petrol: 'Benzină',
  hybrid: 'Hibrid',
  phev: 'Plug-in',
  electric: 'Electric'
};
const GEARS = {
  auto: 'Automată',
  manual: 'Manuală'
};
const DRIVES = {
  fwd: 'Față',
  rwd: 'Spate',
  awd: 'Integrală'
};
const INVENTORY = [{
  id: 'bmw-530d-2021',
  brand: 'BMW',
  model: 'Seria 5',
  variant: '530d xDrive M Sport',
  year: 2021,
  km: 89400,
  fuel: 'diesel',
  gear: 'auto',
  drive: 'awd',
  hp: 286,
  cc: 2993,
  price: 42900,
  leasing: 489,
  leasingAvans: 8600,
  body: 'Sedan',
  color: 'Carbon Black',
  interior: 'Piele Dakota Cognac',
  history: 3,
  accidents: false,
  badge: 'Recent sosit',
  featured: true,
  photos: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80'],
  equipment: {
    confort: ['Climatronic 4 zone', 'Scaune electrice cu memorie', 'Încălzire și ventilație scaune', 'Volan încălzit M Sport', 'Trapă panoramică', 'Suspensie adaptivă'],
    tech: ['Live Cockpit Professional', 'Head-up Display', 'Harman/Kardon Surround', 'Apple CarPlay & Android Auto', 'Camere 360°', 'Asistent parcare Plus'],
    siguranta: ['Driving Assistant Professional', 'Cruise control activ', 'Sistem evitare coliziune', 'Lane Keeping Assist', 'Far-uri Laser', 'Recunoaștere semne']
  },
  historyTimeline: [{
    date: '2021-03-12',
    label: 'Înmatriculare',
    sub: 'BMW Niederlassung München',
    km: 0
  }, {
    date: '2022-04-08',
    label: 'Service oficial BMW',
    sub: 'Schimb ulei + filtre · BMW AG',
    km: 22400
  }, {
    date: '2023-05-21',
    label: 'Service oficial BMW',
    sub: 'Revizie 40k + frâne față · BMW AG',
    km: 41200
  }, {
    date: '2024-06-18',
    label: 'Service oficial BMW',
    sub: 'Schimb ulei + ITP DE valabilă',
    km: 68000
  }, {
    date: '2025-09-02',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte',
    km: 88900
  }]
}, {
  id: 'audi-a6-50-tdi-2020',
  brand: 'Audi',
  model: 'A6',
  variant: '50 TDI quattro S line',
  year: 2020,
  km: 124500,
  fuel: 'diesel',
  gear: 'auto',
  drive: 'awd',
  hp: 286,
  cc: 2967,
  price: 38500,
  leasing: 442,
  leasingAvans: 7700,
  body: 'Sedan',
  color: 'Daytona Grey',
  interior: 'Piele Valcona Negru',
  history: 2,
  accidents: false,
  badge: 'Garanție extinsă',
  featured: true,
  photos: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1606664922998-f180e0bf5e7e?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1606664922998-f180e0bf5e7e?auto=format&fit=crop&w=1200&q=80'],
  equipment: {
    confort: ['Confort Plus', 'Scaune sport ventilate', 'Trapă panoramică', 'Suspensie pneumatică adaptive air'],
    tech: ['Virtual Cockpit Plus', 'MMI Navigation Plus', 'Bang & Olufsen 3D', 'Matrix LED'],
    siguranta: ['Pre Sense City + Rear', 'Adaptive Cruise Assist', 'Side Assist', 'Park Assist Plus']
  },
  historyTimeline: [{
    date: '2020-06-04',
    label: 'Înmatriculare',
    sub: 'Audi Zentrum Stuttgart',
    km: 0
  }, {
    date: '2022-08-12',
    label: 'Service oficial Audi',
    sub: 'Revizie 60k',
    km: 58000
  }, {
    date: '2024-03-22',
    label: 'Service oficial Audi',
    sub: 'Schimb distribuție anticipat',
    km: 102500
  }, {
    date: '2025-10-15',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte',
    km: 124000
  }]
}, {
  id: 'mb-e220d-2022',
  brand: 'Mercedes-Benz',
  model: 'Clasa E',
  variant: 'E 220 d AMG Line',
  year: 2022,
  km: 56000,
  fuel: 'diesel',
  gear: 'auto',
  drive: 'rwd',
  hp: 200,
  cc: 1993,
  price: 47900,
  leasing: 549,
  leasingAvans: 9600,
  body: 'Sedan',
  color: 'Selenite Grey',
  interior: 'Artico Negru',
  history: 1,
  accidents: false,
  badge: 'Selecție ADN',
  featured: true,
  photos: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
  equipment: {
    confort: ['Pachet AMG Line', 'Scaune confort cu memorie', 'Climatronic Thermotronic'],
    tech: ['MBUX cu ecran widescreen', 'Burmester Sound', 'Wireless Charging'],
    siguranta: ['Driving Assistance Package', 'Active Brake Assist', 'Blind Spot Assist']
  },
  historyTimeline: [{
    date: '2022-09-01',
    label: 'Înmatriculare',
    sub: 'Mercedes-Benz Frankfurt',
    km: 0
  }, {
    date: '2024-02-14',
    label: 'Service oficial Mercedes',
    sub: 'Service A',
    km: 32000
  }, {
    date: '2025-08-20',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte',
    km: 55800
  }]
}, {
  id: 'bmw-x5-2021',
  brand: 'BMW',
  model: 'X5',
  variant: 'xDrive30d M Sport',
  year: 2021,
  km: 78000,
  fuel: 'diesel',
  gear: 'auto',
  drive: 'awd',
  hp: 286,
  cc: 2993,
  price: 64500,
  leasing: 738,
  leasingAvans: 12900,
  body: 'SUV',
  color: 'Alpine White',
  interior: 'Piele Vernasca Mocha',
  history: 1,
  accidents: false,
  badge: 'Recent sosit',
  isofix: true,
  featured: true,
  photos: ['https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
  equipment: {
    confort: ['7 locuri opțional', 'Suspensie pneumatică', 'Trapă panoramică Sky Lounge', 'Pachet sticlă acustică'],
    tech: ['Live Cockpit Professional', 'Harman/Kardon', 'Bowers & Wilkins Diamond opțional', 'Gesture Control'],
    siguranta: ['Driving Assistant Professional', 'Parking Assistant Plus', 'Off-Road Package']
  },
  historyTimeline: [{
    date: '2021-05-10',
    label: 'Înmatriculare',
    sub: 'BMW Frankfurt',
    km: 0
  }, {
    date: '2023-06-12',
    label: 'Service oficial BMW',
    sub: 'Revizie 40k',
    km: 42500
  }, {
    date: '2025-07-08',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte',
    km: 77500
  }]
}, {
  id: 'audi-q5-40-tdi-2022',
  brand: 'Audi',
  model: 'Q5',
  variant: '40 TDI quattro S line',
  year: 2022,
  km: 41000,
  fuel: 'diesel',
  gear: 'auto',
  drive: 'awd',
  hp: 204,
  cc: 1968,
  price: 51200,
  leasing: 586,
  leasingAvans: 10250,
  body: 'SUV',
  color: 'Mythos Black',
  interior: 'Piele Fine Nappa',
  history: 1,
  accidents: false,
  badge: 'Garanție extinsă',
  isofix: true,
  photos: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80'],
  equipment: {
    confort: ['Pachet S line', 'Scaune sport ventilate', 'Suspensie adaptivă'],
    tech: ['Virtual Cockpit Plus', 'B&O Premium', 'MMI Touch'],
    siguranta: ['Audi Pre Sense', 'Adaptive Cruise', 'Side Assist']
  },
  historyTimeline: [{
    date: '2022-04-18',
    label: 'Înmatriculare',
    sub: 'Audi Hamburg',
    km: 0
  }, {
    date: '2024-05-20',
    label: 'Service oficial Audi',
    sub: 'Revizie 30k',
    km: 31200
  }, {
    date: '2025-10-02',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte',
    km: 40800
  }]
}, {
  id: 'mb-gle350de-2023',
  brand: 'Mercedes-Benz',
  model: 'GLE',
  variant: '350de 4Matic AMG',
  year: 2023,
  km: 28500,
  fuel: 'phev',
  gear: 'auto',
  drive: 'awd',
  hp: 333,
  cc: 1950,
  price: 78900,
  leasing: 903,
  leasingAvans: 15800,
  body: 'SUV',
  color: 'Polar White',
  interior: 'Piele Nappa Macchiato',
  history: 1,
  accidents: false,
  badge: 'Premium',
  photos: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'],
  equipment: {
    confort: ['Pachet AMG Line', 'Air Body Control', 'Energizing Comfort', 'Climatronic 4 zone'],
    tech: ['MBUX Augmented Reality', 'Burmester 3D', 'Head-Up Display'],
    siguranta: ['Driving Assistance Plus', 'Active Stop & Go', '360°']
  },
  historyTimeline: [{
    date: '2023-02-08',
    label: 'Înmatriculare',
    sub: 'Mercedes Stuttgart',
    km: 0
  }, {
    date: '2024-09-12',
    label: 'Service oficial Mercedes',
    sub: 'Service A',
    km: 18900
  }, {
    date: '2025-11-04',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte',
    km: 28200
  }]
}, {
  id: 'bmw-320d-2022',
  brand: 'BMW',
  model: 'Seria 3',
  variant: '320d M Sport',
  year: 2022,
  km: 38000,
  fuel: 'diesel',
  gear: 'auto',
  drive: 'rwd',
  hp: 190,
  cc: 1995,
  price: 36400,
  leasing: 417,
  leasingAvans: 7300,
  body: 'Sedan',
  color: 'Skyscraper Grey',
  interior: 'Sensatec Negru',
  history: 1,
  accidents: false,
  badge: 'Selecție ADN',
  photos: ['https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'],
  equipment: {
    confort: ['Pachet M Sport', 'Scaune sport', 'Climatronic 3 zone'],
    tech: ['Live Cockpit Professional', 'Harman/Kardon', 'Apple CarPlay'],
    siguranta: ['Driving Assistant', 'Parking Assistant']
  },
  historyTimeline: [{
    date: '2022-08-04',
    label: 'Înmatriculare',
    sub: 'BMW München',
    km: 0
  }, {
    date: '2025-08-15',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte',
    km: 37800
  }]
}, {
  id: 'audi-a4-2021',
  brand: 'Audi',
  model: 'A4',
  variant: '40 TDI S line',
  year: 2021,
  km: 67200,
  fuel: 'diesel',
  gear: 'auto',
  drive: 'fwd',
  hp: 204,
  cc: 1968,
  price: 32900,
  leasing: 376,
  leasingAvans: 6600,
  body: 'Sedan',
  color: 'Glacier White',
  interior: 'Sport Negru',
  history: 2,
  accidents: false,
  photos: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80'],
  equipment: {
    confort: ['Pachet S line', 'Scaune sport încălzite'],
    tech: ['MMI Plus', 'Virtual Cockpit'],
    siguranta: ['Audi Pre Sense', 'Adaptive Cruise']
  },
  historyTimeline: [{
    date: '2021-07-10',
    label: 'Înmatriculare',
    sub: 'Audi Berlin',
    km: 0
  }, {
    date: '2023-09-08',
    label: 'Service oficial Audi',
    sub: 'Revizie 40k',
    km: 41000
  }, {
    date: '2025-10-08',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte',
    km: 66800
  }]
}, {
  id: 'vw-touareg-2022',
  brand: 'Volkswagen',
  model: 'Touareg',
  variant: 'R-Line 3.0 TDI',
  year: 2022,
  km: 45000,
  fuel: 'diesel',
  gear: 'auto',
  drive: 'awd',
  hp: 286,
  cc: 2967,
  price: 58700,
  leasing: 672,
  leasingAvans: 11750,
  body: 'SUV',
  color: 'Lapiz Blue',
  interior: 'Vienna Black',
  history: 1,
  accidents: false,
  badge: 'Recent sosit',
  photos: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80'],
  equipment: {
    confort: ['Pachet R-Line', 'Innovision Cockpit', 'Trapă panoramică'],
    tech: ['Dynaudio Confidence', 'Head-Up Display', 'Night Vision'],
    siguranta: ['Travel Assist', 'Front Assist Plus', 'Trailer Assist']
  },
  historyTimeline: [{
    date: '2022-03-22',
    label: 'Înmatriculare',
    sub: 'VW Hamburg',
    km: 0
  }, {
    date: '2024-04-15',
    label: 'Service oficial VW',
    sub: 'Revizie 30k',
    km: 28500
  }, {
    date: '2025-11-12',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte',
    km: 44600
  }]
}, {
  id: 'porsche-macan-s-2021',
  brand: 'Porsche',
  model: 'Macan',
  variant: 'S',
  year: 2021,
  km: 52000,
  fuel: 'petrol',
  gear: 'auto',
  drive: 'awd',
  hp: 354,
  cc: 2894,
  price: 67500,
  leasing: 773,
  leasingAvans: 13500,
  body: 'SUV',
  color: 'Carrara White Metallic',
  interior: 'Standard Black',
  history: 1,
  accidents: false,
  badge: 'Premium',
  featured: true,
  photos: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1606664922998-f180e0bf5e7e?auto=format&fit=crop&w=1200&q=80'],
  equipment: {
    confort: ['Suspensie PASM', 'Sport Chrono Package', 'Scaune sport adaptive Plus'],
    tech: ['PCM cu navigație', 'Bose Surround', 'Apple CarPlay'],
    siguranta: ['Lane Keeping', 'Adaptive Cruise', 'Surround View']
  },
  historyTimeline: [{
    date: '2021-04-02',
    label: 'Înmatriculare',
    sub: 'Porsche Stuttgart',
    km: 0
  }, {
    date: '2023-05-10',
    label: 'Service oficial Porsche',
    sub: 'Inspecție 30k',
    km: 29800
  }, {
    date: '2025-09-22',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte',
    km: 51500
  }]
}, {
  id: 'tesla-m3-lr-2023',
  brand: 'Tesla',
  model: 'Model 3',
  variant: 'Long Range AWD',
  year: 2023,
  km: 22000,
  fuel: 'electric',
  gear: 'auto',
  drive: 'awd',
  hp: 366,
  cc: 0,
  price: 38900,
  leasing: 446,
  leasingAvans: 7800,
  body: 'Sedan',
  color: 'Pearl White Multi-Coat',
  interior: 'All Black Premium',
  history: 1,
  accidents: false,
  badge: 'Zero emisii',
  batteryPct: 96,
  batteryRange: 520,
  isofix: true,
  photos: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1571987502227-9231b837d92a?auto=format&fit=crop&w=1200&q=80'],
  equipment: {
    confort: ['Premium Interior', 'Scaune ventilate', 'Trapă sticlă panoramică'],
    tech: ['Autopilot', 'Premium Connectivity', 'Sistem audio premium 14 difuzoare'],
    siguranta: ['Enhanced Autopilot', 'Sentry Mode', 'Surround Cameras']
  },
  historyTimeline: [{
    date: '2023-05-18',
    label: 'Înmatriculare',
    sub: 'Tesla Berlin',
    km: 0
  }, {
    date: '2025-10-28',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte · Baterie 96% SoH',
    km: 21800
  }]
}, {
  id: 'bmw-i4-edrive40-2023',
  brand: 'BMW',
  model: 'i4',
  variant: 'eDrive40 M Sport',
  year: 2023,
  km: 18500,
  fuel: 'electric',
  gear: 'auto',
  drive: 'rwd',
  hp: 340,
  cc: 0,
  price: 52400,
  leasing: 600,
  leasingAvans: 10500,
  body: 'Coupe',
  color: 'M Portimao Blue',
  interior: 'Veganza Black',
  history: 1,
  accidents: false,
  badge: 'Zero emisii',
  batteryPct: 98,
  batteryRange: 590,
  isofix: true,
  featured: true,
  photos: ['https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1600&q=80'],
  equipment: {
    confort: ['Pachet M Sport Pro', 'Scaune sport', 'Trapă panoramică', 'Pompă de căldură'],
    tech: ['Curved Display', 'Harman/Kardon', 'Wireless Charging', 'Heads-up Display'],
    siguranta: ['Driving Assistant Professional', 'Parking Assistant Plus']
  },
  historyTimeline: [{
    date: '2023-08-12',
    label: 'Înmatriculare',
    sub: 'BMW München',
    km: 0
  }, {
    date: '2025-11-15',
    label: 'Import & ITP RO',
    sub: 'Verificare ADN Cars · 145 puncte · Baterie 98% SoH',
    km: 18300
  }]
}];
const TESTIMONIALS = [{
  who: 'Andrei P., 38 ani',
  role: 'Cluj-Napoca · BMW Seria 5 530d · achiziție mai 2025',
  text: 'Comparativ cu alți dealeri pe care i-am vizitat, ADN a fost singura unde mi s-a arătat raportul VIN ÎNAINTE să întreb. Au explicat o reparație din 2022, fără să încerce să mascheze. Un an mai târziu, zero probleme.',
  stars: 5,
  initials: 'AP'
}, {
  who: 'Cristina D., 42 ani',
  role: 'București · Audi Q5 40 TDI · achiziție februarie 2025',
  text: 'Mi-au adus mașina la București pentru test drive — 470 km dus-întors, fără să cumpăr nimic. Au înțeles că trebuie să verific cu mecanicul meu. Asta înseamnă încredere. Am revenit pentru a doua mașină a soțului.',
  stars: 5,
  initials: 'CD'
}, {
  who: 'Mihai T., 34 ani',
  role: 'Timișoara · Mercedes E 220d · achiziție octombrie 2024',
  text: 'Finanțarea aprobată în 22 de ore prin BCR. Predare în 4 zile. Înmatriculare, ITP, toate făcute de ei. Eu am venit cu cardul, am plecat cu cheile. Așa ar trebui să arate fiecare achiziție majoră.',
  stars: 5,
  initials: 'MT'
}];
const TEAM = [{
  name: 'Răzvan Iliescu',
  role: 'Fondator & Director',
  bio: '15 ani în importuri auto din Germania. Selectează personal fiecare mașină.',
  initials: 'RI'
}, {
  name: 'Diana Popescu',
  role: 'Consultant vânzări',
  bio: 'Negociere & consultanță pentru clienți care vor pachete personalizate.',
  initials: 'DP',
  statsClientsMonth: 0,
  statsSalesValueMonth: 0,
  statsCommissionMonth: 0
}, {
  name: 'Vlad Constantinescu',
  role: 'Inginer auto · Verificări',
  bio: 'Coordonează inspecția în 145 de puncte. Fost diagnostician BMW.',
  initials: 'VC',
  statsClientsMonth: 0,
  statsSalesValueMonth: 0,
  statsCommissionMonth: 0
}, {
  name: 'Ioana Marin',
  role: 'Finanțare & leasing',
  bio: 'Aprobare credit în 24h cu partenerii noștri. Lucrează cu BCR, ING, Alpha.',
  initials: 'IM'
}];
const BRANDS = ['BMW', 'Audi', 'Mercedes-Benz', 'Porsche', 'Volkswagen', 'Tesla'];
const BODY_TYPES = ['Sedan', 'SUV', 'Coupe', 'Estate', 'Hatch'];
const FUEL_TYPES = ['diesel', 'petrol', 'hybrid', 'phev', 'electric'];
const TRANSMISSIONS = ['auto', 'manual'];
const fmtPrice = n => new Intl.NumberFormat('ro-RO', {
  maximumFractionDigits: 0
}).format(n);
const fmtKm = n => new Intl.NumberFormat('ro-RO').format(n);

// Compute finance: simple annuity
function calcMonthly(principal, rateAnnual, months) {
  if (months === 0) return principal;
  const r = rateAnnual / 12 / 100;
  if (r === 0) return principal / months;
  return principal * r / (1 - Math.pow(1 + r, -months));
}
Object.assign(window, {
  INVENTORY,
  TESTIMONIALS,
  TEAM,
  BRANDS,
  BODY_TYPES,
  FUEL_TYPES,
  TRANSMISSIONS,
  FUELS,
  GEARS,
  DRIVES,
  fmtPrice,
  fmtKm,
  calcMonthly
});

// Sync with admin: override static data if admin has saved changes
(function () {
  try {
    const rawCars = localStorage.getItem('adn-cars-inventory');
    if (rawCars) {
      const parsed = JSON.parse(rawCars);
      if (Array.isArray(parsed) && parsed.length) window.INVENTORY = parsed;
    }
  } catch (_) {}
  try {
    const rawTeam = localStorage.getItem('adn-admin-team');
    if (rawTeam) {
      const parsed = JSON.parse(rawTeam);
      if (Array.isArray(parsed) && parsed.length) window.TEAM = parsed;
    }
  } catch (_) {}
})();