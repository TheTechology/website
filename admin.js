/* AdminPage — back-office for managing inventory.
   Sections (left rail): Dashboard, Stoc, Adaugă mașină, Media, Lead-uri, Setări
   Editor (opened from Stoc / Adaugă) has 6 tabs.
*/

const {
  useState: uAs,
  useMemo: uAm,
  useRef: uAr
} = React;
const EMPTY_CAR = {
  id: '',
  brand: '',
  model: '',
  variant: '',
  year: new Date().getFullYear(),
  km: 0,
  fuel: 'diesel',
  gear: 'auto',
  drive: 'awd',
  hp: 0,
  cc: 0,
  price: 0,
  leasing: 0,
  body: 'Sedan',
  color: '',
  interior: '',
  seats: 5,
  doors: 4,
  vin: '',
  stockCode: '',
  shortDesc: '',
  history: 1,
  accidents: false,
  badge: '',
  featured: false,
  status: 'draft',
  visibility: 'public',
  adnScore: 95,
  warrantyMonths: 12,
  internalNotes: '',
  photos: [],
  videoUrl: '',
  equipment: {
    confort: [],
    tech: [],
    siguranta: []
  },
  historyTimeline: []
};
const ADMIN_ACTIVITY = [{
  who: 'Diana P.',
  what: 'a publicat',
  target: 'BMW i4 eDrive40 2023',
  when: 'acum 12 min',
  icon: 'pub'
}, {
  who: 'Răzvan I.',
  what: 'a creat draft pentru',
  target: 'Audi RS6 Avant 2022',
  when: 'acum 1 oră',
  icon: 'add'
}, {
  who: 'Vlad C.',
  what: 'a finalizat inspecția ADN pentru',
  target: 'Mercedes GLE 350de 2023',
  when: 'acum 3 ore',
  icon: 'inspect'
}, {
  who: 'Diana P.',
  what: 'a marcat ca vândut',
  target: 'Porsche Macan S 2021',
  when: 'ieri, 16:42',
  icon: 'sold'
}, {
  who: 'Răzvan I.',
  what: 'a actualizat prețul pentru',
  target: 'BMW X5 xDrive30d 2021',
  when: 'ieri, 14:08',
  icon: 'price'
}];
const ADMIN_LEADS = [{
  name: 'Andrei M.',
  email: 'andrei.m@gmail.com',
  phone: '+40 740 555 102',
  interest: 'BMW Seria 5',
  when: 'acum 18 min',
  status: 'new'
}, {
  name: 'Cristina V.',
  email: 'cristina@firma.ro',
  phone: '+40 723 887 200',
  interest: 'Buy-back · evaluare',
  when: 'acum 1 oră',
  status: 'contacted'
}, {
  name: 'Mihai T.',
  email: 'mihai.t@gmail.com',
  phone: '+40 766 442 919',
  interest: 'Audi Q5 40 TDI',
  when: 'acum 3 ore',
  status: 'booked'
}, {
  name: 'Ioana S.',
  email: 'ioana@startup.ro',
  phone: '+40 745 123 882',
  interest: 'Mercedes E 220d',
  when: 'ieri, 17:30',
  status: 'new'
}, {
  name: 'Vlad D.',
  email: 'vlad.d@yahoo.com',
  phone: '+40 740 552 818',
  interest: 'Tesla Model 3',
  when: 'ieri, 12:14',
  status: 'contacted'
}];
function AdminPage({
  t,
  showToast,
  subRoute,
  cars: extCars,
  setCars: setExtCars
}) {
  // ----- AUTH -----
  const [authed, setAuthed] = uAs(() => {
    try {
      return localStorage.getItem('adn-admin-auth') === '1';
    } catch {
      return false;
    }
  });
  const [authUser, setAuthUser] = uAs(() => {
    try {
      return localStorage.getItem('adn-admin-user') || 'Răzvan Iliescu';
    } catch {
      return 'Răzvan Iliescu';
    }
  });
  const [section, setSection] = uAs(subRoute || 'dashboard');
  // Sync route changes (e.g. coming from "Administrare echipă" launcher)
  React.useEffect(() => {
    if (subRoute && subRoute !== section) setSection(subRoute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subRoute]);
  const [editing, setEditing] = uAs(null); // null | car object
  // Use shared inventory from App if provided; fall back to local if not.
  const useExternal = !!setExtCars;
  const [localCars, setLocalCars] = uAs(() => INVENTORY.map((c, i) => ({
    ...c,
    status: i < 9 ? 'published' : i === 9 ? 'sold' : 'draft',
    views: 240 + i * 87 + i % 3 * 51,
    visibility: 'public',
    adnScore: 95 + i % 6,
    warrantyMonths: 12,
    vin: 'WBA' + (i + 100000).toString().padStart(7, '0') + 'DG' + (Math.floor(Math.random() * 1000) + 100),
    stockCode: 'ADN-' + (2400 + i).toString(),
    shortDesc: `${c.brand} ${c.model} ${c.variant} adusă recent din ${c.history === 1 ? 'Germania' : 'Austria'}, în stare impecabilă.`
  })));
  const allCars = useExternal ? extCars : localCars;
  const setAllCars = useExternal ? setExtCars : setLocalCars;
  const [search, setSearch] = uAs('');
  const [team, setTeam] = uAs(() => TEAM.map((m, i) => ({
    ...m,
    id: 'tm-' + i,
    email: m.name.toLowerCase().split(' ')[0] + '@adncars.ro',
    phone: '+40 740 ' + (200 + i * 13).toString().padStart(3, '0') + ' ' + (400 + i * 27).toString().padStart(3, '0'),
    status: 'active',
    expertise: i === 0 ? 'Import & evaluare' : i === 1 ? 'Vânzări & negociere' : i === 2 ? 'Inspecție tehnică' : 'Finanțare & leasing',
    languages: i === 2 ? ['Română', 'Germană', 'Engleză'] : ['Română', 'Engleză'],
    yearsExperience: 15 - i * 2,
    bookings: 86 + i * 17,
    rating: 4.9
  })));
  const [editingMember, setEditingMember] = uAs(null);
  const openMember = m => setEditingMember({
    ...m
  });
  const newMember = () => setEditingMember({
    id: 'tm-new-' + Date.now(),
    name: '',
    role: '',
    initials: '',
    bio: '',
    email: '',
    phone: '',
    status: 'active',
    expertise: '',
    languages: ['Română'],
    yearsExperience: 0,
    bookings: 0,
    rating: 5.0
  });
  const closeMember = () => setEditingMember(null);
  const saveMember = m => {
    setTeam(list => {
      const exists = list.find(x => x.id === m.id);
      if (exists) return list.map(x => x.id === m.id ? m : x);
      return [...list, m];
    });
    showToast('Membru salvat în echipă');
    closeMember();
  };
  const deleteMember = id => {
    setTeam(list => list.filter(m => m.id !== id));
    showToast('Membru eliminat din echipă');
    closeMember();
  };
  const openEdit = car => {
    setEditing({
      ...car
    });
  };
  const openNew = () => {
    setEditing({
      ...EMPTY_CAR,
      id: 'new-' + Date.now(),
      stockCode: 'ADN-' + (2500 + Math.floor(Math.random() * 99))
    });
  };
  const closeEdit = () => setEditing(null);
  const handleSave = (car, mode) => {
    setAllCars(list => {
      const exists = list.find(c => c.id === car.id);
      if (exists) return list.map(c => c.id === car.id ? {
        ...car,
        status: mode === 'publish' ? 'published' : mode === 'draft' ? 'draft' : c.status
      } : c);
      return [{
        ...car,
        status: mode === 'publish' ? 'published' : 'draft',
        views: 0
      }, ...list];
    });
    showToast(mode === 'draft' ? t.admin.savedDraft : t.admin.saved);
    closeEdit();
  };
  const handleDelete = id => {
    setAllCars(list => list.filter(c => c.id !== id));
    showToast('Mașina a fost ștearsă.');
    closeEdit();
  };
  const handleDuplicate = car => {
    const dup = {
      ...car,
      id: car.id + '-copy-' + Date.now(),
      stockCode: car.stockCode + '-C',
      status: 'draft'
    };
    setAllCars(list => [dup, ...list]);
    showToast('Mașină duplicată ca draft.');
  };
  const togglePublish = id => {
    setAllCars(list => list.map(c => c.id === id ? {
      ...c,
      status: c.status === 'published' ? 'draft' : 'published'
    } : c));
  };
  const filteredCars = uAm(() => {
    if (!search.trim()) return allCars;
    const s = search.toLowerCase();
    return allCars.filter(c => c.brand.toLowerCase().includes(s) || c.model.toLowerCase().includes(s) || (c.variant || '').toLowerCase().includes(s) || (c.vin || '').toLowerCase().includes(s) || (c.stockCode || '').toLowerCase().includes(s));
  }, [search, allCars]);

  // ----- AUTH HANDLERS -----
  const handleLogin = user => {
    setAuthed(true);
    setAuthUser(user);
    try {
      localStorage.setItem('adn-admin-auth', '1');
      localStorage.setItem('adn-admin-user', user);
    } catch {}
    showToast('Bun venit, ' + user.split(' ')[0]);
  };
  const handleLogout = () => {
    setAuthed(false);
    try {
      localStorage.removeItem('adn-admin-auth');
    } catch {}
    window.location.hash = '/';
  };
  if (!authed) {
    return /*#__PURE__*/React.createElement(AdminLogin, {
      t: t,
      onLogin: handleLogin
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-shell"
  }, /*#__PURE__*/React.createElement(AdminSidebar, {
    t: t,
    section: section,
    authUser: authUser,
    onLogout: handleLogout,
    cars: allCars,
    team: team,
    setSection: s => {
      setSection(s);
      setEditing(null);
      setEditingMember(null);
      window.location.hash = s === 'dashboard' ? '/admin' : '/admin/' + s;
    },
    onAdd: openNew
  }), /*#__PURE__*/React.createElement("div", {
    className: "admin-main"
  }, /*#__PURE__*/React.createElement(AdminTopbar, {
    t: t,
    section: section,
    onAdd: openNew,
    editing: editing,
    editingMember: editingMember
  }), /*#__PURE__*/React.createElement("div", {
    className: "admin-content"
  }, editing && /*#__PURE__*/React.createElement(CarEditor, {
    t: t,
    car: editing,
    isNew: !INVENTORY.find(c => c.id === editing.id) && !allCars.find(c => c.id === editing.id),
    onChange: setEditing,
    onCancel: closeEdit,
    onSave: handleSave,
    onDelete: handleDelete
  }), !editing && section === 'dashboard' && /*#__PURE__*/React.createElement(AdminDashboard, {
    t: t,
    cars: allCars
  }), !editing && section === 'stoc' && /*#__PURE__*/React.createElement(AdminInventory, {
    t: t,
    cars: filteredCars,
    search: search,
    setSearch: setSearch,
    onAdd: openNew,
    onEdit: openEdit,
    onDuplicate: handleDuplicate,
    onTogglePublish: togglePublish,
    onDelete: handleDelete
  }), !editing && section === 'echipa' && !editingMember && /*#__PURE__*/React.createElement(AdminTeam, {
    t: t,
    team: team,
    onEdit: openMember,
    onNew: newMember,
    onDelete: deleteMember
  }), !editing && section === 'echipa' && editingMember && /*#__PURE__*/React.createElement(MemberEditor, {
    t: t,
    member: editingMember,
    onChange: setEditingMember,
    onCancel: closeMember,
    onSave: saveMember,
    onDelete: deleteMember
  }), !editing && section === 'media' && /*#__PURE__*/React.createElement(AdminMediaLib, {
    t: t,
    cars: allCars
  }), !editing && section === 'settings' && /*#__PURE__*/React.createElement(AdminSettings, {
    t: t
  }))));
}

// ----- Sidebar -----
function AdminSidebar({
  t,
  section,
  setSection,
  onAdd,
  authUser,
  onLogout,
  cars,
  team
}) {
  const counts = {
    stoc: cars?.length || 0,
    echipa: team?.filter(m => m.status === 'active').length || 0,
    media: cars?.reduce((n, c) => n + (c.photos?.length || 0), 0) || 0
  };
  const items = [{
    id: 'dashboard',
    label: t.admin.navDashboard,
    icon: /*#__PURE__*/React.createElement(IconGrid, null)
  }, {
    id: 'stoc',
    label: t.admin.navInventory,
    icon: /*#__PURE__*/React.createElement(IconCar, null),
    count: counts.stoc
  }, {
    id: 'echipa',
    label: 'Echipa',
    icon: /*#__PURE__*/React.createElement(IconHandshake, null),
    count: counts.echipa
  }, {
    id: 'media',
    label: t.admin.navMedia,
    icon: /*#__PURE__*/React.createElement(IconDocument, null),
    count: counts.media
  }, {
    id: 'settings',
    label: t.admin.navSettings,
    icon: /*#__PURE__*/React.createElement(IconCog, null)
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "admin-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-brand"
  }, /*#__PURE__*/React.createElement(BrandHelix, {
    size: 28
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-brand-t"
  }, "ADN Cars"), /*#__PURE__*/React.createElement("div", {
    className: "adm-brand-s"
  }, t.admin.kicker))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary adm-add-btn",
    onClick: onAdd
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      lineHeight: 1,
      marginRight: -2
    }
  }, "+"), " ", t.admin.navAdd), /*#__PURE__*/React.createElement("nav", {
    className: "adm-nav"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    className: `adm-nav-item ${section === it.id ? 'active' : ''}`,
    onClick: () => setSection(it.id)
  }, it.icon, /*#__PURE__*/React.createElement("span", null, it.label), typeof it.count === 'number' && /*#__PURE__*/React.createElement("span", {
    className: "adm-nav-count"
  }, it.count)))), /*#__PURE__*/React.createElement("div", {
    className: "adm-spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "adm-user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-user-av"
  }, (authUser || 'R').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "adm-user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-user-name"
  }, authUser), /*#__PURE__*/React.createElement("div", {
    className: "adm-user-role"
  }, "Admin")), /*#__PURE__*/React.createElement("button", {
    className: "adm-logout",
    onClick: onLogout,
    title: "Ie\u0219i din cont"
  }, /*#__PURE__*/React.createElement(IconClose, {
    size: 14
  }))), /*#__PURE__*/React.createElement("a", {
    className: "adm-back-site",
    href: "#/",
    onClick: e => {
      e.preventDefault();
      window.location.hash = '/';
    }
  }, /*#__PURE__*/React.createElement(IconArrowLeft, {
    size: 13
  }), " \xCEnapoi pe site"));
}
function AdminTopbar({
  t,
  section,
  onAdd,
  editing,
  editingMember
}) {
  const sectionLabel = editing ? editing.brand ? `${t.admin.formTitleEdit} · ${editing.brand} ${editing.model}` : t.admin.formTitleNew : editingMember ? editingMember.name ? `Editează · ${editingMember.name}` : 'Adaugă membru în echipă' : section === 'dashboard' ? t.admin.navDashboard : section === 'stoc' ? t.admin.navInventory : section === 'echipa' ? 'Echipa & consultanți' : section === 'leads' ? t.admin.navLeads : section === 'media' ? t.admin.navMedia : section === 'settings' ? t.admin.navSettings : '';
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-topbar"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow no-dot",
    style: {
      color: 'var(--fg-muted)'
    }
  }, t.admin.kicker), /*#__PURE__*/React.createElement("h1", {
    className: "adm-topbar-h"
  }, sectionLabel)), /*#__PURE__*/React.createElement("div", {
    className: "adm-topbar-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-clock"
  }, /*#__PURE__*/React.createElement(IconClock, {
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, new Date().toLocaleDateString('ro-RO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })))));
}

// ----- Dashboard -----
function AdminDashboard({
  t,
  cars
}) {
  const pub = cars.filter(c => c.status === 'published').length;
  const draft = cars.filter(c => c.status === 'draft').length;
  const sold = cars.filter(c => c.status === 'sold').length;
  const internal = cars.filter(c => c.visibility === 'internal').length;
  const totalValue = cars.filter(c => c.status === 'published').reduce((s, c) => s + (c.price || 0), 0);
  const avgPrice = pub ? Math.round(totalValue / pub) : 0;
  const totalPhotos = cars.reduce((n, c) => n + (c.photos?.length || 0), 0);
  const featuredCount = cars.filter(c => c.featured).length;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dash-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dash-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-lbl"
  }, "Publicate \xB7 vizibile public"), /*#__PURE__*/React.createElement("div", {
    className: "ds-val"
  }, pub), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta"
  }, internal > 0 ? `${internal} doar intern` : 'toate vizibile public')), /*#__PURE__*/React.createElement("div", {
    className: "dash-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-lbl"
  }, "Draft \xB7 \xEEn lucru"), /*#__PURE__*/React.createElement("div", {
    className: "ds-val"
  }, draft), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta"
  }, draft > 0 ? 'de finalizat și publicat' : 'totul publicat')), /*#__PURE__*/React.createElement("div", {
    className: "dash-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-lbl"
  }, "V\xE2ndute (status sold)"), /*#__PURE__*/React.createElement("div", {
    className: "ds-val"
  }, sold), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta"
  }, "\u20AC ", fmtPrice(totalValue / 1000), "k val. stoc activ")), /*#__PURE__*/React.createElement("div", {
    className: "dash-stat highlight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-lbl"
  }, "Featured pe home"), /*#__PURE__*/React.createElement("div", {
    className: "ds-val"
  }, featuredCount), /*#__PURE__*/React.createElement("div", {
    className: "ds-meta"
  }, "\u20AC ", fmtPrice(avgPrice), " pre\u021B mediu"))), /*#__PURE__*/React.createElement("div", {
    className: "dash-row"
  }, /*#__PURE__*/React.createElement("section", {
    className: "dash-panel"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "dash-h"
  }, t.admin.recentActivity), /*#__PURE__*/React.createElement("div", {
    className: "activity-list"
  }, ADMIN_ACTIVITY.map((a, i) => /*#__PURE__*/React.createElement("div", {
    className: "activity-row",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: `act-ic act-${a.icon}`
  }, a.icon === 'pub' && /*#__PURE__*/React.createElement(IconCheck, {
    size: 14
  }), a.icon === 'add' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 900
    }
  }, "+"), a.icon === 'inspect' && /*#__PURE__*/React.createElement(IconShieldCheck, {
    size: 14
  }), a.icon === 'sold' && /*#__PURE__*/React.createElement(IconHandshake, {
    size: 14
  }), a.icon === 'price' && /*#__PURE__*/React.createElement(IconWrench, {
    size: 14
  })), /*#__PURE__*/React.createElement("div", {
    className: "act-body"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, a.who), " ", a.what, " ", /*#__PURE__*/React.createElement("em", null, a.target)), /*#__PURE__*/React.createElement("div", {
    className: "act-when"
  }, a.when)))))), /*#__PURE__*/React.createElement("section", {
    className: "dash-panel"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "dash-h"
  }, "Cele mai vizionate \xB7 live"), /*#__PURE__*/React.createElement("div", {
    className: "mini-list"
  }, [...cars].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5).map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: "mini-row",
    key: c.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "mini-rank"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    className: "mini-photo",
    style: {
      backgroundImage: `url(${c.photos[0]})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mini-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mini-name"
  }, c.brand, " ", c.model), /*#__PURE__*/React.createElement("div", {
    className: "mini-sub"
  }, c.variant, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, c.status === 'published' ? '● Live' : c.status))), /*#__PURE__*/React.createElement("div", {
    className: "mini-views"
  }, /*#__PURE__*/React.createElement("strong", null, fmtKm(c.views || 0)), " vizite")))))), /*#__PURE__*/React.createElement("div", {
    className: "dash-row",
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("section", {
    className: "dash-panel"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "dash-h"
  }, "Stoc per marc\u0103 \xB7 realtime"), /*#__PURE__*/React.createElement(BrandBreakdown, {
    cars: cars
  })), /*#__PURE__*/React.createElement("section", {
    className: "dash-panel"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "dash-h"
  }, "Con\u021Binut media"), /*#__PURE__*/React.createElement("div", {
    className: "content-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-icon"
  }, /*#__PURE__*/React.createElement(IconDocument, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-h"
  }, totalPhotos, " fotografii"), /*#__PURE__*/React.createElement("div", {
    className: "cs-s"
  }, "media ", Math.round(totalPhotos / Math.max(cars.length, 1)), " foto / ma\u0219in\u0103"))), /*#__PURE__*/React.createElement("div", {
    className: "cs-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-icon"
  }, /*#__PURE__*/React.createElement(IconBolt, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-h"
  }, cars.filter(c => c.videoUrl).length, " video-uri walk-around"), /*#__PURE__*/React.createElement("div", {
    className: "cs-s"
  }, cars.length - cars.filter(c => c.videoUrl).length, " ma\u0219ini f\u0103r\u0103 video \xEEnc\u0103"))), /*#__PURE__*/React.createElement("div", {
    className: "cs-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-icon"
  }, /*#__PURE__*/React.createElement(IconShieldCheck, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-h"
  }, cars.filter(c => (c.historyTimeline?.length || 0) > 0).length, " cu istoric ADN"), /*#__PURE__*/React.createElement("div", {
    className: "cs-s"
  }, "verificat prin VIN + raport semnat")))))));
}
function BrandBreakdown({
  cars
}) {
  const byBrand = {};
  cars.forEach(c => {
    byBrand[c.brand] = (byBrand[c.brand] || 0) + 1;
  });
  const entries = Object.entries(byBrand).sort((a, b) => b[1] - a[1]);
  const total = cars.length || 1;
  return /*#__PURE__*/React.createElement("div", {
    className: "brand-breakdown"
  }, entries.map(([brand, count]) => /*#__PURE__*/React.createElement("div", {
    className: "bb-row",
    key: brand
  }, /*#__PURE__*/React.createElement("div", {
    className: "bb-lbl"
  }, brand), /*#__PURE__*/React.createElement("div", {
    className: "bb-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bb-fill",
    style: {
      width: `${count / total * 100}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "bb-count"
  }, count))));
}

// ----- Inventory table -----
function AdminInventory({
  t,
  cars,
  search,
  setSearch,
  onAdd,
  onEdit,
  onDuplicate,
  onTogglePublish,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-search"
  }, /*#__PURE__*/React.createElement(IconSearch, {
    size: 14
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: t.admin.searchPlaceholder,
    value: search,
    onChange: e => setSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-toolbar-r"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--fg-muted)'
    }
  }, cars.length, " ma\u0219ini"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: onAdd
  }, "+ ", t.admin.navAdd))), /*#__PURE__*/React.createElement("div", {
    className: "adm-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, t.admin.colStatus), /*#__PURE__*/React.createElement("th", null, t.admin.colCar), /*#__PURE__*/React.createElement("th", null, t.admin.colYear), /*#__PURE__*/React.createElement("th", null, t.admin.colKm), /*#__PURE__*/React.createElement("th", null, t.admin.colPrice), /*#__PURE__*/React.createElement("th", null, t.admin.colBadge), /*#__PURE__*/React.createElement("th", null, t.admin.colViews), /*#__PURE__*/React.createElement("th", null, t.admin.colActions))), /*#__PURE__*/React.createElement("tbody", null, cars.map(c => /*#__PURE__*/React.createElement("tr", {
    key: c.id,
    onClick: () => onEdit(c)
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    status: c.status,
    t: t
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "cell-car"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cell-photo",
    style: {
      backgroundImage: `url(${c.photos[0]})`
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cc-name"
  }, c.brand, " ", c.model), /*#__PURE__*/React.createElement("div", {
    className: "cc-sub"
  }, c.variant, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, c.stockCode || c.id))))), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, c.year), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, fmtKm(c.km)), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, /*#__PURE__*/React.createElement("strong", null, "\u20AC ", fmtPrice(c.price))), /*#__PURE__*/React.createElement("td", null, c.badge ? /*#__PURE__*/React.createElement("span", {
    className: "badge badge-soft"
  }, c.badge) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-faint)'
    }
  }, "\u2014")), /*#__PURE__*/React.createElement("td", {
    className: "num"
  }, fmtKm(c.views || 0)), /*#__PURE__*/React.createElement("td", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "row-act",
    title: t.admin.actionEdit,
    onClick: () => onEdit(c)
  }, /*#__PURE__*/React.createElement(IconWrench, {
    size: 13
  })), /*#__PURE__*/React.createElement("button", {
    className: "row-act",
    title: t.admin.actionDuplicate,
    onClick: () => onDuplicate(c)
  }, /*#__PURE__*/React.createElement(IconDocument, {
    size: 13
  })), /*#__PURE__*/React.createElement("button", {
    className: "row-act",
    title: c.status === 'published' ? t.admin.actionUnpublish : t.admin.actionPublish,
    onClick: () => onTogglePublish(c.id)
  }, c.status === 'published' ? /*#__PURE__*/React.createElement(IconClose, {
    size: 13
  }) : /*#__PURE__*/React.createElement(IconCheck, {
    size: 13
  }))))))))));
}
function StatusPill({
  status,
  t
}) {
  const map = {
    published: {
      lbl: t.admin.statusPublished,
      cls: 'sp-pub'
    },
    draft: {
      lbl: t.admin.statusDraft,
      cls: 'sp-draft'
    },
    sold: {
      lbl: t.admin.statusSold,
      cls: 'sp-sold'
    }
  };
  const s = map[status] || map.draft;
  return /*#__PURE__*/React.createElement("span", {
    className: `status-pill ${s.cls}`
  }, s.lbl);
}

// ----- Leads -----
function AdminLeads({
  t
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-search"
  }, /*#__PURE__*/React.createElement(IconSearch, {
    size: 14
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Caut\u0103 lead..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-toolbar-r"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--fg-muted)'
    }
  }, ADMIN_LEADS.length, " lead-uri active"))), /*#__PURE__*/React.createElement("div", {
    className: "adm-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Nume"), /*#__PURE__*/React.createElement("th", null, "Contact"), /*#__PURE__*/React.createElement("th", null, "Interes"), /*#__PURE__*/React.createElement("th", null, "Primit"), /*#__PURE__*/React.createElement("th", null, "Ac\u021Biuni"))), /*#__PURE__*/React.createElement("tbody", null, ADMIN_LEADS.map((l, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `status-pill ${l.status === 'new' ? 'sp-new' : l.status === 'contacted' ? 'sp-draft' : 'sp-pub'}`
  }, l.status === 'new' ? 'Nou' : l.status === 'contacted' ? 'Contactat' : 'Programat')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, l.name)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13
    }
  }, l.email), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--fg-muted)'
    }
  }, l.phone)), /*#__PURE__*/React.createElement("td", null, l.interest), /*#__PURE__*/React.createElement("td", {
    style: {
      color: 'var(--fg-muted)'
    }
  }, l.when), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "row-act"
  }, /*#__PURE__*/React.createElement(IconPhone, {
    size: 13
  })), /*#__PURE__*/React.createElement("button", {
    className: "row-act"
  }, /*#__PURE__*/React.createElement(IconMail, {
    size: 13
  })), /*#__PURE__*/React.createElement("button", {
    className: "row-act"
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 13
  }))))))))));
}

// ----- Media library -----
function AdminMediaLib({
  t,
  cars
}) {
  const all = cars.flatMap(c => (c.photos || []).map(p => ({
    src: p,
    car: c
  })));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--fg-muted)'
    }
  }, all.length, " fotografii \xB7 ", cars.length, " ma\u0219ini"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 900
    }
  }, "+"), " \xCEncarc\u0103")), /*#__PURE__*/React.createElement("div", {
    className: "media-grid"
  }, all.map((m, i) => /*#__PURE__*/React.createElement("div", {
    className: "media-tile",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-photo",
    style: {
      backgroundImage: `url(${m.src})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-meta"
  }, m.car.brand, " ", m.car.model)))));
}

// ----- Settings (account + site config + danger zone) -----
function AdminSettings({
  t
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-settings-page"
  }, /*#__PURE__*/React.createElement("section", {
    className: "adm-panel"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "dash-h"
  }, "Cont admin"), /*#__PURE__*/React.createElement("div", {
    className: "form-grid c-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "Nume"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    defaultValue: "R\u0103zvan Iliescu"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "Rol"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    defaultValue: "Admin \xB7 Owner",
    disabled: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    defaultValue: "razvan@adncars.ro"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "Telefon"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    defaultValue: "+40 740 555 100"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "adm-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "dash-h",
    style: {
      margin: 0
    }
  }, "Integr\u0103ri externe"), /*#__PURE__*/React.createElement("p", {
    className: "adm-panel-sub"
  }, "Conexiunile cu CarVertical, BCR Leasing, Twilio \u0219i restul serviciilor sunt gestionate \xEEn afara back-office-ului, prin server. Documentul tehnic complet (pa\u0219i, costuri, API keys) e ata\u0219at ca ", /*#__PURE__*/React.createElement("strong", null, "INTEGRARI.md"), " \xEEn proiect."))), /*#__PURE__*/React.createElement("div", {
    className: "info-row-card"
  }, /*#__PURE__*/React.createElement(IconShieldCheck, {
    size: 20
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "API keys nu se \u021Bin \xEEn browser."), /*#__PURE__*/React.createElement("p", null, "Pentru securitate, configurarea integr\u0103rilor se face de c\u0103tre developer pe serverul cPanel/VPS, nu din aceast\u0103 interfa\u021B\u0103. Vezi documentul de specifica\u021Bii tehnice.")))), /*#__PURE__*/React.createElement("section", {
    className: "adm-panel"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "dash-h"
  }, "Configurare site public"), /*#__PURE__*/React.createElement("div", {
    className: "form-grid c-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "Nume showroom"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    defaultValue: "ADN Cars \xB7 Flore\u0219ti"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "Telefon afi\u0219at public"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    defaultValue: "+40 374 123 456"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "Email public"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    defaultValue: "salut@adncars.ro"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "WhatsApp"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    defaultValue: "+40 740 123 456"
  })), /*#__PURE__*/React.createElement(CheckRow, {
    label: "Accept\u0103 program\u0103ri online",
    checked: true,
    hint: "Wizard-ul /programare e activ pe site",
    full: true
  }), /*#__PURE__*/React.createElement(CheckRow, {
    label: "Permite buy-back online",
    checked: true,
    hint: "Formulare de evaluare la /contact",
    full: true
  }), /*#__PURE__*/React.createElement(CheckRow, {
    label: "Afi\u0219eaz\u0103 badge \xABRecent sosit\xBB automat",
    checked: true,
    hint: "Ma\u0219ini sub 14 zile \xEEn stoc cap\u0103t\u0103 badge automat",
    full: true
  }))), /*#__PURE__*/React.createElement("section", {
    className: "adm-panel danger-panel"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "dash-h"
  }, "Zon\u0103 periculoas\u0103"), /*#__PURE__*/React.createElement("p", {
    className: "adm-panel-sub"
  }, "Ac\u021Biuni ireversibile. Folose\u0219te cu aten\u021Bie."), /*#__PURE__*/React.createElement("div", {
    className: "danger-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Reseteaz\u0103 stocul la valorile ini\u021Biale"), /*#__PURE__*/React.createElement("div", {
    className: "adm-panel-sub",
    style: {
      marginTop: 4
    }
  }, "Re\xEEncarc\u0103 cele 12 ma\u0219ini implicite. Pierzi toate modific\u0103rile locale.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: () => {
      if (confirm('Sigur resetezi stocul? Această acțiune nu poate fi anulată.')) {
        try {
          localStorage.removeItem('adn-cars-inventory');
          window.location.reload();
        } catch {}
      }
    }
  }, "Reseteaz\u0103"))));
}
const DEFAULT_INTEGRATIONS = [{
  id: 'carvertical',
  name: 'CarVertical · Rapoarte VIN',
  short: 'CV',
  color: '#ff6a3d',
  desc: 'Verificare istoric prin VIN. Accidente, kilometraj real, service-uri oficiale.',
  status: 'connected',
  lastSync: 'acum 3 min',
  apiKey: 'cv_live_a3kj8FXm2pq9...',
  syncFreq: 'realtime',
  stats: [{
    l: 'Rapoarte luna asta',
    v: '47'
  }, {
    l: 'Cost',
    v: '€ 188'
  }],
  docsUrl: 'https://carvertical.com/api'
}, {
  id: 'bcr-leasing',
  name: 'BCR Leasing',
  short: 'BCR',
  color: '#9c27b0',
  desc: 'Aplicații leasing automate. Trimitere dosar în 1 click.',
  status: 'connected',
  lastSync: 'acum 8 min',
  apiKey: 'bcr_prod_M7nQ...',
  webhookUrl: 'https://adncars.ro/api/webhook/bcr',
  syncFreq: 'realtime',
  stats: [{
    l: 'Aplicații luna asta',
    v: '14'
  }, {
    l: 'Aprobate',
    v: '12 (86%)'
  }]
}, {
  id: 'alpha-leasing',
  name: 'Alpha Leasing',
  short: 'AL',
  color: '#1a73e8',
  desc: 'Conexiune Alpha Bank Romania pentru oferte personalizate.',
  status: 'connected',
  lastSync: 'acum 22 min',
  apiKey: 'alpha_prod_8KsR2...',
  syncFreq: 'hourly',
  stats: [{
    l: 'Aplicații luna asta',
    v: '9'
  }, {
    l: 'Aprobate',
    v: '8'
  }]
}, {
  id: 'ing-leasing',
  name: 'ING Leasing',
  short: 'ING',
  color: '#ff6200',
  desc: 'Calculator în timp real + aplicații express.',
  status: 'sandbox',
  lastSync: '—',
  apiKey: '',
  syncFreq: 'hourly',
  stats: [{
    l: 'Status',
    v: 'în testare'
  }, {
    l: 'Go-live',
    v: '1 iunie'
  }]
}, {
  id: 'google-cal',
  name: 'Google Calendar',
  short: 'GC',
  color: '#4285f4',
  desc: 'Sincronizare programări consultanți + reminder-uri automate.',
  status: 'connected',
  lastSync: 'acum 1 min',
  apiKey: 'gcal_oauth_VbN7...',
  syncFreq: 'realtime',
  stats: [{
    l: 'Programări luna asta',
    v: '128'
  }, {
    l: 'No-show rate',
    v: '4.2%'
  }]
}, {
  id: 'twilio-sms',
  name: 'Twilio · SMS reminder',
  short: 'TW',
  color: '#f22f46',
  desc: 'SMS automate cu 24h înainte de programare + follow-up post-vizionare.',
  status: 'connected',
  lastSync: 'acum 14 min',
  apiKey: 'AC1a2b3c4d5e6...',
  syncFreq: 'realtime',
  stats: [{
    l: 'SMS-uri luna asta',
    v: '342'
  }, {
    l: 'Cost',
    v: '€ 18'
  }]
}, {
  id: 'mailchimp',
  name: 'Mailchimp · Newsletter',
  short: 'MC',
  color: '#ffe01b',
  desc: 'Newsletter săptămânal cu mașini noi + audiență segmentată.',
  status: 'connected',
  lastSync: 'acum 1 oră',
  apiKey: 'mc_us20_x9k...',
  syncFreq: 'daily',
  stats: [{
    l: 'Abonați',
    v: '3.241'
  }, {
    l: 'Open rate',
    v: '38%'
  }]
}, {
  id: 'olx-export',
  name: 'OLX · Export anunțuri',
  short: 'OL',
  color: '#23e5db',
  desc: 'Sincronizare automată a stocului public pe OLX.ro.',
  status: 'connected',
  lastSync: 'acum 12 min',
  apiKey: 'olx_partner_8...',
  syncFreq: 'hourly',
  stats: [{
    l: 'Anunțuri active',
    v: '12'
  }, {
    l: 'Lead-uri OLX',
    v: '24/lună'
  }]
}, {
  id: 'autovit-export',
  name: 'Autovit.ro · Export',
  short: 'AV',
  color: '#0066cc',
  desc: 'Listare automată pe Autovit.ro cu sincronizare preț + status.',
  status: 'connected',
  lastSync: 'acum 18 min',
  apiKey: 'av_dealer_...',
  syncFreq: 'hourly',
  stats: [{
    l: 'Anunțuri Autovit',
    v: '12'
  }, {
    l: 'Lead-uri',
    v: '38/lună'
  }]
}, {
  id: 'stripe',
  name: 'Stripe · Depozit rezervare',
  short: 'ST',
  color: '#635bff',
  desc: 'Plată online a depozitului de rezervare (€ 500) pentru mașini specifice.',
  status: 'sandbox',
  lastSync: 'acum 4 ore',
  apiKey: 'sk_test_51A...',
  webhookUrl: 'https://adncars.ro/api/webhook/stripe',
  syncFreq: 'realtime',
  stats: [{
    l: 'Tranzacții test',
    v: '6'
  }, {
    l: 'Go-live',
    v: '15 mai'
  }]
}, {
  id: 'ga4',
  name: 'Google Analytics 4',
  short: 'GA',
  color: '#e37400',
  desc: 'Tracking comportament vizitatori + conversii (programări).',
  status: 'connected',
  lastSync: 'acum 2 min',
  apiKey: 'G-X9Y2Z...',
  syncFreq: 'realtime',
  stats: [{
    l: 'Vizite luna asta',
    v: '14.218'
  }, {
    l: 'Rata conversie',
    v: '3.4%'
  }]
}, {
  id: 'meta-pixel',
  name: 'Meta Pixel · Facebook & Instagram',
  short: 'FB',
  color: '#1877f2',
  desc: 'Retargeting + audiențe similare pentru campanii social.',
  status: 'disconnected',
  lastSync: '—',
  apiKey: '',
  syncFreq: 'realtime',
  stats: [{
    l: 'Status',
    v: 'inactiv'
  }]
}];
Object.assign(window, {
  DEFAULT_INTEGRATIONS,
  BrandBreakdown
});

// ============================================================
// CAR EDITOR — the big multi-tab form
// ============================================================
function CarEditor({
  t,
  car,
  isNew,
  onChange,
  onCancel,
  onSave,
  onDelete
}) {
  const [tab, setTab] = uAs('general');
  const update = (k, v) => onChange({
    ...car,
    [k]: v
  });
  const updateNested = (parent, k, v) => onChange({
    ...car,
    [parent]: {
      ...car[parent],
      [k]: v
    }
  });
  const tabs = [{
    id: 'general',
    label: t.admin.tabGeneral
  }, {
    id: 'specs',
    label: t.admin.tabSpecs
  }, {
    id: 'equipment',
    label: t.admin.tabEquipment
  }, {
    id: 'history',
    label: t.admin.tabHistory
  }, {
    id: 'media',
    label: t.admin.tabMedia
  }, {
    id: 'publish',
    label: t.admin.tabPublish
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "car-editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-tabs"
  }, tabs.map(tb => /*#__PURE__*/React.createElement("button", {
    key: tb.id,
    className: `et-btn ${tab === tb.id ? 'active' : ''}`,
    onClick: () => setTab(tb.id)
  }, tb.label)), /*#__PURE__*/React.createElement("div", {
    className: "editor-tabs-spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onCancel
  }, t.admin.pubCancel), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline btn-sm",
    onClick: () => onSave(car, 'draft')
  }, t.admin.pubSaveDraft), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onSave(car, 'publish')
  }, t.admin.pubSavePublish)), /*#__PURE__*/React.createElement("div", {
    className: "editor-body"
  }, tab === 'general' && /*#__PURE__*/React.createElement(EditorPanel, {
    title: t.admin.tabGeneral,
    desc: "Identitatea public\u0103 a ma\u0219inii \u2014 datele de baz\u0103 afi\u0219ate \xEEn card \u0219i pe pagina detaliu."
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-grid c-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fBrand,
    value: car.brand,
    onChange: v => update('brand', v),
    placeholder: "BMW, Audi, Mercedes-Benz..."
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fModel,
    value: car.model,
    onChange: v => update('model', v),
    placeholder: "Seria 5, A6, Clasa E..."
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fVariant,
    value: car.variant,
    onChange: v => update('variant', v),
    placeholder: "530d xDrive M Sport",
    full: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fYear,
    type: "number",
    value: car.year,
    onChange: v => update('year', +v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fStockCode,
    value: car.stockCode,
    onChange: v => update('stockCode', v),
    placeholder: "ADN-2401"
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fVin,
    value: car.vin,
    onChange: v => update('vin', v),
    placeholder: "WBA...",
    full: true,
    mono: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fPrice,
    type: "number",
    prefix: "\u20AC",
    value: car.price,
    onChange: v => update('price', +v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fLeasing,
    type: "number",
    prefix: "\u20AC",
    value: car.leasing,
    onChange: v => update('leasing', +v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fShortDesc,
    value: car.shortDesc,
    onChange: v => update('shortDesc', v),
    placeholder: "Descriere scurt\u0103 pentru cardul din stoc...",
    full: true,
    textarea: true
  }))), tab === 'specs' && /*#__PURE__*/React.createElement(EditorPanel, {
    title: t.admin.tabSpecs,
    desc: "Datele tehnice afi\u0219ate \xEEn sec\u021Biunea de specifica\u021Bii a paginii de ma\u0219in\u0103."
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-grid c-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fKm,
    type: "number",
    suffix: "km",
    value: car.km,
    onChange: v => update('km', +v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fHp,
    type: "number",
    suffix: "CP",
    value: car.hp,
    onChange: v => update('hp', +v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fCc,
    type: "number",
    suffix: "cm\xB3",
    value: car.cc,
    onChange: v => update('cc', +v)
  }), /*#__PURE__*/React.createElement(SelectField, {
    label: t.admin.fFuel,
    value: car.fuel,
    onChange: v => update('fuel', v),
    options: FUEL_TYPES.map(f => ({
      v: f,
      l: FUELS[f]
    }))
  }), /*#__PURE__*/React.createElement(SelectField, {
    label: t.admin.fGear,
    value: car.gear,
    onChange: v => update('gear', v),
    options: TRANSMISSIONS.map(g => ({
      v: g,
      l: GEARS[g]
    }))
  }), /*#__PURE__*/React.createElement(SelectField, {
    label: t.admin.fDrive,
    value: car.drive,
    onChange: v => update('drive', v),
    options: Object.keys(DRIVES).map(d => ({
      v: d,
      l: DRIVES[d]
    }))
  }), /*#__PURE__*/React.createElement(SelectField, {
    label: t.admin.fBody,
    value: car.body,
    onChange: v => update('body', v),
    options: BODY_TYPES.map(b => ({
      v: b,
      l: b
    }))
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fColor,
    value: car.color,
    onChange: v => update('color', v),
    placeholder: "Carbon Black"
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fInterior,
    value: car.interior,
    onChange: v => update('interior', v),
    placeholder: "Piele Dakota Cognac"
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fSeats,
    type: "number",
    value: car.seats,
    onChange: v => update('seats', +v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.fDoors,
    type: "number",
    value: car.doors,
    onChange: v => update('doors', +v)
  }))), tab === 'equipment' && /*#__PURE__*/React.createElement(EditorPanel, {
    title: t.admin.tabEquipment,
    desc: t.admin.eqLead
  }, /*#__PURE__*/React.createElement("div", {
    className: "eq-grid"
  }, [{
    key: 'confort',
    label: t.admin.eqConfort,
    ic: /*#__PURE__*/React.createElement(IconCog, {
      size: 14
    })
  }, {
    key: 'tech',
    label: t.admin.eqTech,
    ic: /*#__PURE__*/React.createElement(IconBolt, {
      size: 14
    })
  }, {
    key: 'siguranta',
    label: t.admin.eqSiguranta,
    ic: /*#__PURE__*/React.createElement(IconShieldCheck, {
      size: 14
    })
  }].map(g => /*#__PURE__*/React.createElement(EquipmentColumn, {
    key: g.key,
    label: g.label,
    icon: g.ic,
    items: car.equipment?.[g.key] || [],
    onAdd: item => updateNested('equipment', g.key, [...(car.equipment?.[g.key] || []), item]),
    onRemove: idx => updateNested('equipment', g.key, (car.equipment?.[g.key] || []).filter((_, i) => i !== idx)),
    addPlaceholder: t.admin.eqAdd
  })))), tab === 'history' && /*#__PURE__*/React.createElement(EditorPanel, {
    title: t.admin.tabHistory,
    desc: t.admin.histLead
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-flags"
  }, /*#__PURE__*/React.createElement(CheckRow, {
    label: t.admin.histVin,
    checked: true,
    hint: "Raport CarVertical desc\u0103rcat, VIN confirmat"
  }), /*#__PURE__*/React.createElement(CheckRow, {
    label: t.admin.histAdn,
    checked: true,
    hint: "145 puncte verificate, inginerul Vlad C. a semnat"
  }), /*#__PURE__*/React.createElement(CheckRow, {
    label: t.admin.histAccidents,
    checked: car.accidents,
    onChange: v => update('accidents', v),
    danger: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "hist-editor"
  }, (car.historyTimeline || []).map((h, i) => /*#__PURE__*/React.createElement("div", {
    className: "hist-row",
    key: i
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input mono",
    type: "date",
    value: h.date,
    onChange: e => {
      const list = [...car.historyTimeline];
      list[i] = {
        ...list[i],
        date: e.target.value
      };
      update('historyTimeline', list);
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "Eveniment",
    value: h.label,
    onChange: e => {
      const list = [...car.historyTimeline];
      list[i] = {
        ...list[i],
        label: e.target.value
      };
      update('historyTimeline', list);
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "Detalii",
    value: h.sub || '',
    onChange: e => {
      const list = [...car.historyTimeline];
      list[i] = {
        ...list[i],
        sub: e.target.value
      };
      update('historyTimeline', list);
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "number",
    placeholder: "km",
    value: h.km || 0,
    onChange: e => {
      const list = [...car.historyTimeline];
      list[i] = {
        ...list[i],
        km: +e.target.value
      };
      update('historyTimeline', list);
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "row-act danger",
    onClick: () => update('historyTimeline', car.historyTimeline.filter((_, k) => k !== i))
  }, /*#__PURE__*/React.createElement(IconClose, {
    size: 13
  })))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm hist-add",
    onClick: () => update('historyTimeline', [...(car.historyTimeline || []), {
      date: '',
      label: '',
      sub: '',
      km: 0
    }])
  }, t.admin.histAdd))), tab === 'media' && /*#__PURE__*/React.createElement(EditorPanel, {
    title: t.admin.tabMedia,
    desc: t.admin.mediaLead
  }, /*#__PURE__*/React.createElement(MediaUploader, {
    t: t,
    car: car,
    update: update
  })), tab === 'publish' && /*#__PURE__*/React.createElement(EditorPanel, {
    title: t.admin.tabPublish,
    desc: "Set\u0103ri de afi\u0219are \u0219i op\u021Biuni de listare a ma\u0219inii."
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-grid c-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, t.admin.pubStatus), /*#__PURE__*/React.createElement("div", {
    className: "seg-row"
  }, [{
    v: 'draft',
    l: t.admin.statusDraft
  }, {
    v: 'published',
    l: t.admin.statusPublished
  }, {
    v: 'sold',
    l: t.admin.statusSold
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    className: `seg ${car.status === o.v ? 'active' : ''}`,
    onClick: () => update('status', o.v)
  }, o.l)))), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, t.admin.pubVisibility), /*#__PURE__*/React.createElement("div", {
    className: "seg-row"
  }, [{
    v: 'public',
    l: t.admin.pubPublic
  }, {
    v: 'internal',
    l: t.admin.pubInternal
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    className: `seg ${car.visibility === o.v ? 'active' : ''}`,
    onClick: () => update('visibility', o.v)
  }, o.l)))), /*#__PURE__*/React.createElement("div", {
    className: "form-field",
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement("label", null, t.admin.pubBadge), /*#__PURE__*/React.createElement("div", {
    className: "chip-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: `chip ${!car.badge ? 'active' : ''}`,
    onClick: () => update('badge', '')
  }, t.admin.pubBadgeNone), t.admin.pubBadgeOptions.map((b, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `chip ${car.badge === b ? 'active' : ''}`,
    onClick: () => update('badge', b)
  }, b)))), /*#__PURE__*/React.createElement(CheckRow, {
    label: t.admin.pubFeatured,
    checked: car.featured,
    onChange: v => update('featured', v),
    hint: "Apare \xEEn carusel-ul \xABRecent sosite\xBB pe pagina principal\u0103",
    full: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.pubAdnScore,
    type: "number",
    suffix: "/100",
    value: car.adnScore || 95,
    onChange: v => update('adnScore', +v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.pubWarranty,
    type: "number",
    suffix: "luni",
    value: car.warrantyMonths || 12,
    onChange: v => update('warrantyMonths', +v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: t.admin.pubNotes,
    value: car.internalNotes || '',
    onChange: v => update('internalNotes', v),
    placeholder: "Vizibil doar pentru consultan\u021Bi...",
    textarea: true,
    full: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "pub-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: () => onDelete(car.id),
    disabled: isNew,
    title: isNew ? 'Salvează întâi' : ''
  }, /*#__PURE__*/React.createElement(IconClose, {
    size: 13
  }), " ", t.admin.pubDelete), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onCancel
  }, t.admin.pubCancel), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: () => onSave(car, 'draft')
  }, t.admin.pubSaveDraft), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => onSave(car, 'publish')
  }, t.admin.pubSavePublish)))));
}
function EditorPanel({
  title,
  desc,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "editor-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ep-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ep-h"
  }, title), desc && /*#__PURE__*/React.createElement("p", {
    className: "ep-desc"
  }, desc)), children);
}
function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  prefix,
  suffix,
  full,
  textarea,
  mono
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `form-field ${full ? 'full' : ''}`
  }, /*#__PURE__*/React.createElement("label", null, label), textarea ? /*#__PURE__*/React.createElement("textarea", {
    className: `form-input ${mono ? 'mono' : ''}`,
    rows: "3",
    placeholder: placeholder,
    value: value || '',
    onChange: e => onChange(e.target.value)
  }) : /*#__PURE__*/React.createElement("div", {
    className: `affix-wrap ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''}`
  }, prefix && /*#__PURE__*/React.createElement("span", {
    className: "affix prefix"
  }, prefix), /*#__PURE__*/React.createElement("input", {
    className: `form-input ${mono ? 'mono' : ''}`,
    type: type,
    placeholder: placeholder,
    value: value ?? '',
    onChange: e => onChange(e.target.value)
  }), suffix && /*#__PURE__*/React.createElement("span", {
    className: "affix suffix"
  }, suffix)));
}
function SelectField({
  label,
  value,
  onChange,
  options
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, label), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.v,
    value: o.v
  }, o.l))));
}
function CheckRow({
  label,
  checked,
  onChange,
  hint,
  danger,
  full
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `check-row ${danger ? 'danger' : ''} ${full ? 'full' : ''}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!checked,
    onChange: e => onChange && onChange(e.target.checked)
  }), /*#__PURE__*/React.createElement("div", {
    className: "cr-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cr-lbl"
  }, label), hint && /*#__PURE__*/React.createElement("div", {
    className: "cr-hint"
  }, hint)));
}
function EquipmentColumn({
  label,
  icon,
  items,
  onAdd,
  onRemove,
  addPlaceholder
}) {
  const [draft, setDraft] = uAs('');
  const commit = () => {
    const v = draft.trim();
    if (!v) return;
    onAdd(v);
    setDraft('');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "eq-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eq-h"
  }, icon, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    className: "eq-count"
  }, items.length)), /*#__PURE__*/React.createElement("div", {
    className: "eq-items"
  }, items.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "eq-empty"
  }, "\u2014 nicio dotare ad\u0103ugat\u0103 \u2014"), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "eq-row",
    key: i
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 12,
    className: "eq-check"
  }), /*#__PURE__*/React.createElement("span", null, it), /*#__PURE__*/React.createElement("button", {
    className: "eq-rm",
    onClick: () => onRemove(i)
  }, /*#__PURE__*/React.createElement(IconClose, {
    size: 11
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "eq-add"
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: addPlaceholder,
    value: draft,
    onChange: e => setDraft(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commit();
      }
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "row-act",
    onClick: commit,
    title: "Adaug\u0103"
  }, "+")));
}
function MediaUploader({
  t,
  car,
  update
}) {
  const [dragging, setDragging] = uAs(false);
  const fileRef = uAr(null);

  // Simulate uploaded files: any file dropped/selected just appends a new Unsplash placeholder URL
  const STOCK_PHOTOS = ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1600&q=80', 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1600&q=80'];
  const addFakeUpload = (n = 1) => {
    const photos = car.photos || [];
    const adds = [];
    for (let i = 0; i < n; i++) {
      adds.push(STOCK_PHOTOS[(photos.length + i) % STOCK_PHOTOS.length]);
    }
    update('photos', [...photos, ...adds]);
  };
  const setPrimary = idx => {
    const arr = [...car.photos];
    const [item] = arr.splice(idx, 1);
    update('photos', [item, ...arr]);
  };
  const removePhoto = idx => {
    update('photos', car.photos.filter((_, i) => i !== idx));
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: `drop-zone ${dragging ? 'dragging' : ''}`,
    onDragOver: e => {
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: e => {
      e.preventDefault();
      setDragging(false);
      addFakeUpload(e.dataTransfer.files?.length || 1);
    },
    onClick: () => fileRef.current?.click()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dz-ic"
  }, /*#__PURE__*/React.createElement(IconDocument, {
    size: 24
  })), /*#__PURE__*/React.createElement("div", {
    className: "dz-h"
  }, t.admin.mediaUpload), /*#__PURE__*/React.createElement("div", {
    className: "dz-sub"
  }, t.admin.mediaUploadSub), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: e => {
      e.stopPropagation();
      addFakeUpload(3);
    }
  }, "Adaug\u0103 3 foto demo"), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "image/*",
    multiple: true,
    hidden: true,
    onChange: e => addFakeUpload(e.target.files?.length || 1)
  })), (car.photos || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "photo-grid"
  }, car.photos.map((p, i) => /*#__PURE__*/React.createElement("div", {
    className: `photo-tile ${i === 0 ? 'is-primary' : ''}`,
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "pt-img",
    style: {
      backgroundImage: `url(${p})`
    }
  }), i === 0 && /*#__PURE__*/React.createElement("span", {
    className: "pt-pri-badge"
  }, t.admin.mediaPrimary), /*#__PURE__*/React.createElement("div", {
    className: "pt-actions"
  }, i !== 0 && /*#__PURE__*/React.createElement("button", {
    className: "pt-btn",
    onClick: () => setPrimary(i)
  }, t.admin.mediaSetPrimary), /*#__PURE__*/React.createElement("button", {
    className: "pt-btn danger",
    onClick: () => removePhoto(i)
  }, /*#__PURE__*/React.createElement(IconClose, {
    size: 12
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "form-field",
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("label", null, t.admin.mediaVideoUrl), /*#__PURE__*/React.createElement("input", {
    className: "form-input mono",
    placeholder: t.admin.mediaVideoPlaceholder,
    value: car.videoUrl || '',
    onChange: e => update('videoUrl', e.target.value)
  }), car.videoUrl && /*#__PURE__*/React.createElement("div", {
    className: "video-preview"
  }, /*#__PURE__*/React.createElement(IconBolt, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "Video ata\u0219at: ", /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: 'var(--accent)'
    }
  }, car.videoUrl.slice(0, 60), car.videoUrl.length > 60 ? '…' : '')))));
}
Object.assign(window, {
  AdminPage
});

// ============================================================
// TEAM (Echipa) admin section
// ============================================================
function AdminTeam({
  t,
  team,
  onEdit,
  onNew,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "adm-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--fg-muted)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg-primary)',
      fontSize: 18,
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      marginRight: 6
    }
  }, team.length), "membri activi \xEEn echip\u0103 \xB7 to\u021Bi pe salariu fix"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: onNew
  }, "+ Adaug\u0103 membru")), /*#__PURE__*/React.createElement("div", {
    className: "team-admin-grid"
  }, team.map(m => /*#__PURE__*/React.createElement("div", {
    className: "team-card-admin",
    key: m.id,
    onClick: () => onEdit(m)
  }, /*#__PURE__*/React.createElement("div", {
    className: "tca-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tca-av"
  }, m.initials || m.name?.[0]?.toUpperCase() || '?'), /*#__PURE__*/React.createElement("div", {
    className: "tca-actions"
  }, /*#__PURE__*/React.createElement("span", {
    className: `status-pill ${m.status === 'active' ? 'sp-pub' : 'sp-draft'}`
  }, m.status === 'active' ? 'Activ' : 'Inactiv'))), /*#__PURE__*/React.createElement("div", {
    className: "tca-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tca-name"
  }, m.name || 'Fără nume'), /*#__PURE__*/React.createElement("div", {
    className: "tca-role"
  }, m.role || '—'), m.expertise && /*#__PURE__*/React.createElement("div", {
    className: "tca-exp"
  }, m.expertise), /*#__PURE__*/React.createElement("p", {
    className: "tca-bio"
  }, m.bio || '—')), /*#__PURE__*/React.createElement("div", {
    className: "tca-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tcm-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tcm-lbl"
  }, "Program\u0103ri"), /*#__PURE__*/React.createElement("div", {
    className: "tcm-val"
  }, m.bookings)), /*#__PURE__*/React.createElement("div", {
    className: "tcm-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tcm-lbl"
  }, "Rating"), /*#__PURE__*/React.createElement("div", {
    className: "tcm-val"
  }, (m.rating || 5).toFixed(1), " ", /*#__PURE__*/React.createElement(IconStar, {
    size: 12
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tcm-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tcm-lbl"
  }, "Experien\u021B\u0103"), /*#__PURE__*/React.createElement("div", {
    className: "tcm-val"
  }, m.yearsExperience, " ani"))), /*#__PURE__*/React.createElement("div", {
    className: "tca-foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tca-link",
    onClick: e => {
      e.stopPropagation();
      onEdit(m);
    }
  }, /*#__PURE__*/React.createElement(IconWrench, {
    size: 12
  }), " Editeaz\u0103 profil"), /*#__PURE__*/React.createElement("button", {
    className: "tca-link danger",
    onClick: e => {
      e.stopPropagation();
      if (confirm('Sigur ștergi acest membru?')) onDelete(m.id);
    }
  }, /*#__PURE__*/React.createElement(IconClose, {
    size: 12
  }), " Elimin\u0103")))), /*#__PURE__*/React.createElement("button", {
    className: "team-card-add",
    onClick: onNew
  }, /*#__PURE__*/React.createElement("div", {
    className: "tca-plus"
  }, "+"), /*#__PURE__*/React.createElement("div", {
    className: "tca-add-h"
  }, "Adaug\u0103 membru nou"), /*#__PURE__*/React.createElement("div", {
    className: "tca-add-s"
  }, "Apare imediat \xEEn /programare", /*#__PURE__*/React.createElement("br", null), "\u0219i \xEEn /despre pe site"))));
}
function MemberEditor({
  t,
  member,
  onChange,
  onCancel,
  onSave,
  onDelete
}) {
  const update = (k, v) => onChange({
    ...member,
    [k]: v
  });

  // Auto-derive initials from name if empty
  const handleNameChange = v => {
    const initials = v.trim().split(/\s+/).map(p => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
    onChange({
      ...member,
      name: v,
      initials: member.initials || initials
    });
  };
  const toggleLanguage = lang => {
    const has = (member.languages || []).includes(lang);
    update('languages', has ? member.languages.filter(l => l !== lang) : [...(member.languages || []), lang]);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "car-editor"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-tabs"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '8px 14px',
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 13,
      letterSpacing: '-0.01em'
    }
  }, member.name ? `Editează · ${member.name}` : 'Adaugă membru'), /*#__PURE__*/React.createElement("div", {
    className: "editor-tabs-spacer"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onCancel
  }, "Renun\u021B\u0103"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onSave(member),
    disabled: !member.name || !member.role
  }, "Salveaz\u0103")), /*#__PURE__*/React.createElement("div", {
    className: "editor-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "editor-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ep-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ep-h"
  }, "Identitate public\u0103"), /*#__PURE__*/React.createElement("p", {
    className: "ep-desc"
  }, "Aceste date apar \xEEn pagina /despre \u0219i \xEEn lista de selec\u021Bie de pe /programare.")), /*#__PURE__*/React.createElement("div", {
    className: "member-id-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "member-av-preview"
  }, member.initials || member.name?.[0]?.toUpperCase() || '?'), /*#__PURE__*/React.createElement("div", {
    className: "form-grid c-2",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nume complet",
    value: member.name,
    onChange: handleNameChange,
    placeholder: "R\u0103zvan Iliescu"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Ini\u021Biale (pentru avatar)",
    value: member.initials,
    onChange: v => update('initials', v.toUpperCase().slice(0, 2)),
    placeholder: "RI"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Rol / titulatur\u0103",
    value: member.role,
    onChange: v => update('role', v),
    placeholder: "Fondator & Director",
    full: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Specializare",
    value: member.expertise,
    onChange: v => update('expertise', v),
    placeholder: "Import & evaluare auto",
    full: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-field full"
  }, /*#__PURE__*/React.createElement("label", null, "Biografie scurt\u0103 (afi\u0219at\u0103 \xEEn card)"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-input",
    rows: "3",
    placeholder: "2-3 propozi\u021Bii. Apare sub rol \xEEn card-ul de consultant.",
    value: member.bio || '',
    onChange: e => update('bio', e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "ep-head",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ep-h"
  }, "Contact intern"), /*#__PURE__*/React.createElement("p", {
    className: "ep-desc"
  }, "Folosite pentru atribuirea lead-urilor \u0219i pentru notific\u0103rile de programare.")), /*#__PURE__*/React.createElement("div", {
    className: "form-grid c-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    value: member.email,
    onChange: v => update('email', v),
    placeholder: "prenume@adncars.ro"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Telefon direct",
    value: member.phone,
    onChange: v => update('phone', v),
    placeholder: "+40 740 ..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "ep-head",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ep-h"
  }, "Statistici afi\u0219ate public"), /*#__PURE__*/React.createElement("p", {
    className: "ep-desc"
  }, "Datele acestea apar pe card-ul de selectare consultant din wizard.")), /*#__PURE__*/React.createElement("div", {
    className: "form-grid c-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Ani experien\u021B\u0103",
    type: "number",
    suffix: "ani",
    value: member.yearsExperience,
    onChange: v => update('yearsExperience', +v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Nr. program\u0103ri",
    type: "number",
    value: member.bookings,
    onChange: v => update('bookings', +v)
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Rating (1-5)",
    type: "number",
    suffix: "/5",
    value: member.rating,
    onChange: v => update('rating', +v)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field full"
  }, /*#__PURE__*/React.createElement("label", null, "Limbi vorbite"), /*#__PURE__*/React.createElement("div", {
    className: "chip-row"
  }, ['Română', 'Engleză', 'Germană', 'Franceză', 'Italiană', 'Maghiară'].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    className: `chip ${(member.languages || []).includes(l) ? 'active' : ''}`,
    onClick: () => toggleLanguage(l)
  }, l)))), /*#__PURE__*/React.createElement("div", {
    className: "form-field full"
  }, /*#__PURE__*/React.createElement("label", null, "Status"), /*#__PURE__*/React.createElement("div", {
    className: "seg-row"
  }, [{
    v: 'active',
    l: 'Activ — disponibil pentru programări'
  }, {
    v: 'paused',
    l: 'Indisponibil temporar'
  }, {
    v: 'inactive',
    l: 'Inactiv — nu apare public'
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    className: `seg ${member.status === o.v ? 'active' : ''}`,
    onClick: () => update('status', o.v)
  }, o.l)))), /*#__PURE__*/React.createElement("div", {
    className: "pub-actions"
  }, member.id && !member.id.startsWith('tm-new-') && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    onClick: () => {
      if (confirm('Sigur ștergi acest membru?')) onDelete(member.id);
    }
  }, /*#__PURE__*/React.createElement(IconClose, {
    size: 13
  }), " Elimin\u0103 din echip\u0103"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onCancel
  }, "Renun\u021B\u0103"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => onSave(member),
    disabled: !member.name || !member.role
  }, "Salveaz\u0103")))));
}
Object.assign(window, {
  AdminTeam,
  MemberEditor
});

// ============================================================
// ADMIN LOGIN
// ============================================================
function AdminLogin({
  t,
  onLogin
}) {
  const [user, setUser] = uAs('');
  const [pass, setPass] = uAs('');
  const [err, setErr] = uAs('');
  // Demo credentials — in production replaced with real auth
  const VALID = {
    'admin': {
      pass: 'XApYu$JAA6%bPzhD2m!v',
      name: 'Răzvan Iliescu'
    },
    'diana': {
      pass: 'nQWU34@CqngA#h7hpjaa',
      name: 'Diana Popescu'
    },
    'vlad': {
      pass: 'zk8SekQ2bQ%!V9!pdu9K',
      name: 'Vlad Constantinescu'
    }
  };
  const submit = e => {
    e.preventDefault();
    const u = user.trim().toLowerCase();
    const acc = VALID[u];
    if (!acc || acc.pass !== pass) {
      setErr('Utilizator sau parolă invalidă. Verifică datele și încearcă din nou.');
      return;
    }
    setErr('');
    onLogin(acc.name);
  };
  const goBack = e => {
    e.preventDefault();
    window.location.hash = '/';
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "login-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-bg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-bg-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "login-bg-glow"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#/",
    onClick: goBack,
    className: "login-back"
  }, /*#__PURE__*/React.createElement(IconArrowLeft, {
    size: 13
  }), " \xCEnapoi pe site"), /*#__PURE__*/React.createElement("div", {
    className: "login-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-brand"
  }, /*#__PURE__*/React.createElement(BrandHelix, {
    size: 36
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lb-h"
  }, "ADN Cars \xB7 Concierge"), /*#__PURE__*/React.createElement("div", {
    className: "lb-s"
  }, "Acces partener \xB7 Back-office privat"))), /*#__PURE__*/React.createElement("div", {
    className: "login-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow",
    style: {
      color: 'var(--accent)'
    }
  }, "Autentificare"), /*#__PURE__*/React.createElement("h1", {
    className: "login-title"
  }, "Bine ai revenit."), /*#__PURE__*/React.createElement("p", {
    className: "login-sub"
  }, "Acces protejat la stoc, echip\u0103 \u0219i set\u0103ri. Dac\u0103 nu e\u0219ti partener autorizat, te rug\u0103m s\u0103 revii la ", /*#__PURE__*/React.createElement("a", {
    href: "#/",
    onClick: goBack
  }, "pagina principal\u0103"), ".")), /*#__PURE__*/React.createElement("form", {
    className: "login-form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "Utilizator"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    autoFocus: true,
    autoComplete: "username",
    placeholder: "admin",
    value: user,
    onChange: e => {
      setUser(e.target.value);
      setErr('');
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", null, "Parol\u0103"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "password",
    autoComplete: "current-password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: pass,
    onChange: e => {
      setPass(e.target.value);
      setErr('');
    }
  })), err && /*#__PURE__*/React.createElement("div", {
    className: "login-err"
  }, /*#__PURE__*/React.createElement(IconClose, {
    size: 13
  }), " ", err), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary btn-lg",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(IconShieldCheck, {
    size: 14
  }), " Autentific\u0103-m\u0103"), /*#__PURE__*/React.createElement("div", {
    className: "login-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "login-foot-help"
  }, "Suport tehnic: ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:it@adncars.ro"
  }, "it@adncars.ro")))), /*#__PURE__*/React.createElement("div", {
    className: "login-trust"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lt-cell"
  }, /*#__PURE__*/React.createElement(IconShieldCheck, {
    size: 16
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lt-h"
  }, "Conexiune securizat\u0103"), /*#__PURE__*/React.createElement("div", {
    className: "lt-s"
  }, "TLS 1.3 \xB7 sesiune criptat\u0103"))), /*#__PURE__*/React.createElement("div", {
    className: "lt-cell"
  }, /*#__PURE__*/React.createElement(IconClock, {
    size: 16
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lt-h"
  }, "Auto-logout"), /*#__PURE__*/React.createElement("div", {
    className: "lt-s"
  }, "Dup\u0103 30 min inactivitate"))))));
}
Object.assign(window, {
  AdminLogin
});