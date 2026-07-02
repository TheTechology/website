/* ProgramarePage — multi-step booking wizard.
   Step 1: pick consultant + location
   Step 2: date + time slot
   Step 3: topic + car of interest + notes
   Step 4: contact details
   Step 5: confirmation
*/

const {
  useState: uPs,
  useMemo: uPm
} = React;
function ProgramarePage({
  t,
  showToast
}) {
  const [step, setStep] = uPs(1);
  const [consultant, setConsultant] = uPs(TEAM[0]);
  const [where, setWhere] = uPs('showroom');
  const [day, setDay] = uPs(null); // ISO date string
  const [time, setTime] = uPs(null); // "10:00"
  const [topic, setTopic] = uPs(t.programare.topics[0]);
  const [carInterest, setCarInterest] = uPs('');
  const [notes, setNotes] = uPs('');
  const [name, setName] = uPs('');
  const [phone, setPhone] = uPs('');
  const [email, setEmail] = uPs('');

  // Generate 28 days starting from "tomorrow" (skip weekends visually as half-disabled)
  const days = uPm(() => {
    const arr = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    for (let i = 1; i <= 28; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  // Pseudo-random booked slots based on day
  const bookedSlotsForDay = d => {
    if (!d) return new Set();
    const seed = d.getDate() + d.getMonth() * 31;
    const slots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    return new Set(slots.filter((_, i) => (seed + i * 7) % 11 < 3));
  };
  const booked = uPm(() => day ? bookedSlotsForDay(new Date(day)) : new Set(), [day]);
  const allSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
  const morningSlots = allSlots.filter(s => parseInt(s) < 13);
  const afternoonSlots = allSlots.filter(s => parseInt(s) >= 13);
  const canNext = step === 1 && !!consultant || step === 2 && day && time || step === 3 && !!topic || step === 4 && name.trim() && phone.trim() && email.includes('@');
  const [submitting, setSubmitting] = uPs(false);
  const [submitError, setSubmitError] = uPs('');
  const next = async () => {
    if (step === 4) {
      // Final submit — fetch to backend / Formspree
      const cfg = window.ADN_CONFIG || {};
      const endpoint = cfg.bookingFormEndpoint || cfg.contactFormEndpoint || '';
      const carRef = carInterest ? INVENTORY.find(x => x.id === carInterest) : null;
      const payload = {
        tip: 'PROGRAMARE',
        consultant: consultant?.name,
        unde: where,
        data: day,
        ora: time,
        subiect: topic,
        masina: carRef ? `${carRef.brand} ${carRef.model} ${carRef.variant} (cod ${carRef.stockCode || carRef.id})` : '',
        note: notes,
        nume: name,
        telefon: phone,
        email: email,
        _subject: `Programare nouă ADN Cars — ${name} pe ${day} ${time}`,
        _replyto: email
      };
      setSubmitError('');
      setSubmitting(true);
      try {
        if (endpoint && !endpoint.includes('YOUR_FORM_ID') && !endpoint.includes('YOUR_BOOKING_FORM_ID')) {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error('HTTP ' + res.status);
        }
        // Always advance to confirmation, even in demo mode without endpoint
        setStep(5);
      } catch (err) {
        setSubmitError('Nu am putut salva programarea. Te rugăm să ne suni la +40 374 123 456 sau să încerci din nou într-un minut.');
      } finally {
        setSubmitting(false);
      }
      return;
    }
    setStep(s => Math.min(5, s + 1));
  };
  const back = () => setStep(s => Math.max(1, s - 1));
  const formattedDay = day ? new Date(day).toLocaleDateString('ro-RO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }) : '—';
  return /*#__PURE__*/React.createElement("section", {
    className: "page",
    style: {
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-hero",
    style: {
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow"
  }, t.programare.kicker), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(48px, 9vw, 132px)'
    }
  }, t.programare.h), /*#__PURE__*/React.createElement("p", {
    className: "about-lead"
  }, t.programare.lead))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "wizard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wizard-progress"
  }, [1, 2, 3, 4, 5].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: `wp-dot ${step === n ? 'active' : ''} ${step > n ? 'done' : ''}`
  }, step > n ? /*#__PURE__*/React.createElement(IconCheck, {
    size: 11,
    strokeWidth: 3
  }) : /*#__PURE__*/React.createElement("span", null, n))), /*#__PURE__*/React.createElement("div", {
    className: "wp-line",
    style: {
      '--p': `${(step - 1) / 4 * 100}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "wizard-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wizard-main"
  }, step === 1 && /*#__PURE__*/React.createElement(Step, {
    title: t.programare.step1Title,
    sub: t.programare.step1Sub
  }, /*#__PURE__*/React.createElement("div", {
    className: "consultant-grid"
  }, TEAM.map((m, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `consultant-card ${consultant?.name === m.name ? 'active' : ''}`,
    onClick: () => setConsultant(m)
  }, /*#__PURE__*/React.createElement("div", {
    className: "av"
  }, m.initials), /*#__PURE__*/React.createElement("div", {
    className: "cc-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cc-name"
  }, m.name), /*#__PURE__*/React.createElement("div", {
    className: "cc-role"
  }, m.role), /*#__PURE__*/React.createElement("p", {
    className: "cc-bio"
  }, m.bio), /*#__PURE__*/React.createElement("div", {
    className: "cc-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stars"
  }, [1, 2, 3, 4, 5].map(k => /*#__PURE__*/React.createElement(IconStar, {
    key: k,
    size: 11
  }))), /*#__PURE__*/React.createElement("span", null, "4.9 \xB7 86 discu\u021Bii"))), consultant?.name === m.name && /*#__PURE__*/React.createElement("div", {
    className: "cc-check"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 14,
    strokeWidth: 3
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "field-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl-row"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-lbl"
  }, t.programare.where)), /*#__PURE__*/React.createElement("div", {
    className: "seg-row"
  }, [{
    v: 'showroom',
    label: t.programare.whereShowroom,
    ic: /*#__PURE__*/React.createElement(IconPin, {
      size: 14
    })
  }, {
    v: 'online',
    label: t.programare.whereOnline,
    ic: /*#__PURE__*/React.createElement(IconMessage, {
      size: 14
    })
  }, {
    v: 'phone',
    label: t.programare.wherePhone,
    ic: /*#__PURE__*/React.createElement(IconPhone, {
      size: 14
    })
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.v,
    className: `seg ${where === o.v ? 'active' : ''}`,
    onClick: () => setWhere(o.v)
  }, o.ic, " ", o.label))))), step === 2 && /*#__PURE__*/React.createElement(Step, {
    title: t.programare.step2Title,
    sub: t.programare.step2Sub
  }, /*#__PURE__*/React.createElement("div", {
    className: "cal-grid"
  }, days.map((d, i) => {
    const iso = d.toISOString().slice(0, 10);
    const isWeekend = d.getDay() === 0;
    const isSel = day === iso;
    const dayLbl = d.toLocaleDateString('ro-RO', {
      weekday: 'short'
    });
    return /*#__PURE__*/React.createElement("button", {
      key: iso,
      className: `cal-cell ${isSel ? 'active' : ''} ${isWeekend ? 'closed' : ''}`,
      disabled: isWeekend,
      onClick: () => {
        setDay(iso);
        setTime(null);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "cl-dow"
    }, dayLbl), /*#__PURE__*/React.createElement("span", {
      className: "cl-day"
    }, d.getDate()), /*#__PURE__*/React.createElement("span", {
      className: "cl-mo"
    }, d.toLocaleDateString('ro-RO', {
      month: 'short'
    })));
  })), day && /*#__PURE__*/React.createElement("div", {
    className: "time-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tb-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, formattedDay), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, t.programare.duration, ": ", /*#__PURE__*/React.createElement("strong", null, t.programare.duration_v))), /*#__PURE__*/React.createElement("div", {
    className: "tb-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tb-lbl"
  }, t.programare.timeMorning), /*#__PURE__*/React.createElement("div", {
    className: "slot-row"
  }, morningSlots.map(s => {
    const isBooked = booked.has(s);
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      className: `slot ${time === s ? 'active' : ''} ${isBooked ? 'booked' : ''}`,
      disabled: isBooked,
      onClick: () => setTime(s)
    }, s);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "tb-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tb-lbl"
  }, t.programare.timeAfternoon), /*#__PURE__*/React.createElement("div", {
    className: "slot-row"
  }, afternoonSlots.map(s => {
    const isBooked = booked.has(s);
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      className: `slot ${time === s ? 'active' : ''} ${isBooked ? 'booked' : ''}`,
      disabled: isBooked,
      onClick: () => setTime(s)
    }, s);
  }))))), step === 3 && /*#__PURE__*/React.createElement(Step, {
    title: t.programare.step3Title,
    sub: t.programare.step3Sub
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-section"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-lbl"
  }, t.programare.topicLabel), /*#__PURE__*/React.createElement("div", {
    className: "chip-row",
    style: {
      marginTop: 10
    }
  }, t.programare.topics.map((tp, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `chip-lg ${topic === tp ? 'active' : ''}`,
    onClick: () => setTopic(tp)
  }, tp)))), /*#__PURE__*/React.createElement("div", {
    className: "field-section"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-lbl"
  }, t.programare.carLabel), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    value: carInterest,
    onChange: e => setCarInterest(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, t.programare.carPlaceholder), INVENTORY.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.brand, " ", c.model, " ", c.variant, " \xB7 ", c.year, " \xB7 \u20AC ", fmtPrice(c.price))))), /*#__PURE__*/React.createElement("div", {
    className: "field-section"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-lbl"
  }, t.programare.notesLabel), /*#__PURE__*/React.createElement("textarea", {
    className: "form-textarea",
    rows: "4",
    placeholder: t.programare.notesPlaceholder,
    value: notes,
    onChange: e => setNotes(e.target.value)
  }))), step === 4 && /*#__PURE__*/React.createElement(Step, {
    title: t.programare.step4Title,
    sub: t.programare.step4Sub
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-section"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-lbl"
  }, t.programare.name), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "Andrei Popescu",
    value: name,
    onChange: e => setName(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-lbl"
  }, t.programare.phone), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "+40 740 ...",
    value: phone,
    onChange: e => setPhone(e.target.value)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-lbl"
  }, t.programare.email), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "email",
    placeholder: "email@exemplu.ro",
    value: email,
    onChange: e => setEmail(e.target.value)
  }))))), step === 5 && /*#__PURE__*/React.createElement(ConfirmStep, {
    t: t,
    consultant: consultant,
    where: where,
    formattedDay: formattedDay,
    time: time,
    topic: topic,
    carInterest: carInterest,
    name: name,
    phone: phone,
    email: email,
    onReset: () => {
      setStep(1);
      setDay(null);
      setTime(null);
      setName('');
      setPhone('');
      setEmail('');
      setNotes('');
      setCarInterest('');
    }
  }), step < 5 && /*#__PURE__*/React.createElement("div", {
    className: "wizard-nav"
  }, step > 1 ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: back,
    disabled: submitting
  }, /*#__PURE__*/React.createElement(IconArrowLeft, {
    size: 14
  }), " ", t.programare.stepBack) : /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8
    }
  }, submitError && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: '#ff8a90',
      fontWeight: 600,
      textAlign: 'right',
      maxWidth: 360
    }
  }, submitError), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    disabled: !canNext || submitting,
    onClick: next
  }, submitting ? 'Se trimite...' : step === 4 ? t.programare.stepConfirm : t.programare.stepNext, " ", !submitting && /*#__PURE__*/React.createElement(IconArrow, {
    size: 14,
    className: "arrow"
  }))))), step < 5 && /*#__PURE__*/React.createElement("aside", {
    className: "wizard-side"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono-eyebrow no-dot",
    style: {
      color: 'var(--fg-muted)'
    }
  }, t.programare.summaryHead), /*#__PURE__*/React.createElement(SummaryRow, {
    lbl: "Consultant",
    val: consultant?.name || '—',
    sub: consultant?.role
  }), /*#__PURE__*/React.createElement(SummaryRow, {
    lbl: t.programare.where,
    val: where === 'showroom' ? t.programare.whereShowroom : where === 'online' ? t.programare.whereOnline : t.programare.wherePhone
  }), /*#__PURE__*/React.createElement(SummaryRow, {
    lbl: "Dat\u0103",
    val: formattedDay,
    sub: time || ''
  }), /*#__PURE__*/React.createElement(SummaryRow, {
    lbl: t.programare.topicLabel,
    val: step >= 3 ? topic : '—'
  }), carInterest && (() => {
    const c = INVENTORY.find(x => x.id === carInterest);
    return c ? /*#__PURE__*/React.createElement(SummaryRow, {
      lbl: "Ma\u0219ina",
      val: `${c.brand} ${c.model}`,
      sub: c.variant
    }) : null;
  })(), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: '1px solid var(--line-subtle)',
      margin: '6px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ws-meta"
  }, /*#__PURE__*/React.createElement(IconClock, {
    size: 13
  }), " ", /*#__PURE__*/React.createElement("span", null, t.programare.duration, ": ", t.programare.duration_v, " \xB7 gratuit")), /*#__PURE__*/React.createElement("div", {
    className: "ws-meta"
  }, /*#__PURE__*/React.createElement(IconShieldCheck, {
    size: 13
  }), " ", /*#__PURE__*/React.createElement("span", null, "Anulare gratuit\u0103 oric\xE2nd")))))));
}
function Step({
  title,
  sub,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "wstep"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "wstep-h"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "wstep-sub"
  }, sub), /*#__PURE__*/React.createElement("div", {
    className: "wstep-body"
  }, children));
}
function SummaryRow({
  lbl,
  val,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ws-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-lbl"
  }, lbl), /*#__PURE__*/React.createElement("div", {
    className: "ws-val"
  }, val), sub && /*#__PURE__*/React.createElement("div", {
    className: "ws-sub"
  }, sub));
}
function ConfirmStep({
  t,
  consultant,
  where,
  formattedDay,
  time,
  topic,
  carInterest,
  name,
  phone,
  email,
  onReset
}) {
  const car = carInterest ? INVENTORY.find(c => c.id === carInterest) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "confirm-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "confirm-icon"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 32,
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("h2", {
    className: "wstep-h",
    style: {
      marginTop: 8
    }
  }, t.programare.step5Title), /*#__PURE__*/React.createElement("p", {
    className: "wstep-sub"
  }, t.programare.step5Sub), /*#__PURE__*/React.createElement("div", {
    className: "confirm-summary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av"
  }, consultant.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-name"
  }, consultant.name), /*#__PURE__*/React.createElement("div", {
    className: "cs-sub"
  }, consultant.role))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
    className: "cs-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-lbl"
  }, "Dat\u0103"), /*#__PURE__*/React.createElement("div", {
    className: "cs-val"
  }, formattedDay)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-lbl"
  }, "Or\u0103"), /*#__PURE__*/React.createElement("div", {
    className: "cs-val"
  }, time)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-lbl"
  }, t.programare.where), /*#__PURE__*/React.createElement("div", {
    className: "cs-val"
  }, where === 'showroom' ? t.programare.whereShowroom : where === 'online' ? t.programare.whereOnline : t.programare.wherePhone)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-lbl"
  }, t.programare.duration), /*#__PURE__*/React.createElement("div", {
    className: "cs-val"
  }, t.programare.duration_v))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
    className: "cs-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-lbl",
    style: {
      minWidth: 100
    }
  }, t.programare.topicLabel), /*#__PURE__*/React.createElement("div", {
    className: "cs-val"
  }, topic)), car && /*#__PURE__*/React.createElement("div", {
    className: "cs-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-lbl",
    style: {
      minWidth: 100
    }
  }, "Ma\u0219ina"), /*#__PURE__*/React.createElement("div", {
    className: "cs-val"
  }, car.brand, " ", car.model, " ", car.variant)), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
    className: "cs-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-lbl"
  }, t.programare.name), /*#__PURE__*/React.createElement("div", {
    className: "cs-val"
  }, name)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cs-lbl"
  }, t.programare.phone), /*#__PURE__*/React.createElement("div", {
    className: "cs-val"
  }, phone)), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-lbl"
  }, t.programare.email), /*#__PURE__*/React.createElement("div", {
    className: "cs-val"
  }, email)))), /*#__PURE__*/React.createElement("div", {
    className: "confirm-cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg"
  }, /*#__PURE__*/React.createElement(IconCalendar, {
    size: 14
  }), " ", t.programare.addToCal), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-lg",
    onClick: onReset
  }, t.programare.bookAnother)));
}
Object.assign(window, {
  ProgramarePage
});