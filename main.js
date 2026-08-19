/**
 * main.js
 * ---------------------------------------------------------------------------
 * Shared behavior for all pages: nav, scroll-fade-in, countdown, RSVP form
 * (incl. Google Apps Script submission), FAQ accordion/search, schedule
 * timeline + .ics export, and the Saigon time widget.
 *
 * Depends on content.js being loaded first (defines WEDDING_CONTENT).
 * ---------------------------------------------------------------------------
 */

/* =============================================================================
   RSVP ENDPOINT — paste your deployed Google Apps Script Web App URL here.
   See README.md "Apps Script setup" for the full deploy walkthrough.
   ========================================================================== */
const RSVP_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";

/* -----------------------------------------------------------------------
   Inline icon set (no icon library — small, semantic-ish SVGs)
   -------------------------------------------------------------------- */
const ICONS = {
  plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.8 19.3 19 18l-6.5-6.5V5a1.5 1.5 0 0 0-3 0v6.5L3 18l1.2 1.3L11 15v4l-2 1.5V22l3-1 3 1v-1.5L13 19v-4z"/></svg>',
  shuttle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/><path d="M3 11h18M7 7V4h10v3"/></svg>',
  food: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 2v7a2 2 0 0 0 2 2v11M7 2v7M11 2v7M15 2c-1.5 2-2 4-2 6a2 2 0 0 0 2 2v12"/></svg>',
  ceremony: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c-2 2-2 4 0 6s2 4 0 6M6 21c1-4 3-6 6-6s5 2 6 6"/></svg>',
  free: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  hotel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6M3 12h18"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>',
  shirt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 6l1.5 3L8 8v13h8V8l2.5 1L20 6l-4-3-2 2h-4z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  chevron: '<svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  bug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="8" width="10" height="10" rx="5"/><path d="M12 8V5M9 5 7 3M15 5l2-2M4 12H2M22 12h-2M5 17l-2 2M19 17l2 2"/></svg>',
  swim: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 17c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0M7 13l6-8 3 3-8 6"/></svg>',
  umbrella: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 12V20a2 2 0 0 1-4 0M3 12a9 9 0 0 1 18 0z"/><path d="M12 12V3"/></svg>',
  sandal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15c0-3 2-9 4-9s2 3 3 3 2-2 4-2 4 4 4 8-3 5-7 5-8-2-8-5z"/></svg>',
  hat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15c2-1 12-1 16 1M8 15c0-4 2-7 4-7s4 3 4 7"/><ellipse cx="12" cy="16" rx="9" ry="2"/></svg>',
  attire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2c-3 2-3 4-1 5l-3 2 2 11h4l2-11-3-2c2-1 2-3-1-5z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  golf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 21c3-1 9-1 12 0M9 21V6l8 3-8 3"/></svg>',
};

/* =============================================================================
   Background scroll lock — used while the language modal or mobile nav
   is open. Deliberately avoids `overflow: hidden` on body/html: several
   mobile WebKit versions treat that as body becoming the containing
   block for position:fixed descendants (breaking things like the
   back-to-top button) and don't always undo it cleanly once overflow
   is reset. Pinning body with `position: fixed` sidesteps that. Uses a
   depth counter so the modal and nav can lock/unlock independently
   without stepping on each other.
   ========================================================================== */
let scrollLockDepth = 0;
let scrollLockY = 0;
function lockBodyScroll() {
  if (scrollLockDepth === 0) {
    scrollLockY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollLockY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
  }
  scrollLockDepth++;
}
function unlockBodyScroll() {
  scrollLockDepth = Math.max(0, scrollLockDepth - 1);
  if (scrollLockDepth === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, scrollLockY);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initLanguageModal();
  applyLanguage(I18N.getLang());
  initHeaderNav();
  initFadeIn();
  initBackToTop();
  initCountdown();
  initRsvpForm();
  initFaqInteractivity();
  initScheduleInteractivity();
  initTimeWidget();
});

/* =============================================================================
   Language switching — nav selector, first-visit modal, and the single
   applyLanguage() pass that (re)renders every language-dependent thing on
   the page. Safe to call multiple times (e.g. when the user picks a new
   language from the selector) since every render step it calls replaces
   content wholesale rather than appending.
   ========================================================================== */
function applyLanguage(lang) {
  I18N.setLang(lang);
  document.documentElement.lang = (I18N.languages.find((l) => l.code === lang) || {}).htmlLang || lang;

  applyDataI18n(document);
  initContentBindings();
  applyIndexCardWhen();
  relocalizeGuestRows();
  renderFaqContent();
  renderTimeline();
  renderPackingGrid();
  applyGuideCardLinks();
  updateLanguageSwitcherUI();
}

// The homepage's "When" card shows the date range inline in a full
// sentence, so it can't just use data-field="date-range" (that would
// clobber the rest of the sentence) — build it from the template instead.
function applyIndexCardWhen() {
  const el = document.querySelector("[data-index-card-when]");
  if (!el || !window.WEDDING_CONTENT) return;
  el.textContent = I18N.t("index.cardWhenDesc", {
    dateRange: formatDateRange(WEDDING_CONTENT.dates.arrival, WEDDING_CONTENT.dates.departure),
  });
}

// A few guide.html paragraphs contain an inline link, so they use
// {link}-templated strings rather than plain data-i18n text.
function applyGuideCardLinks() {
  const safetyP = document.querySelector("[data-guide-safety-p2]");
  if (safetyP) {
    const link = `<a href="travel.html#faq-grab">${I18N.t("guide.travelPageLink")}</a>`;
    safetyP.innerHTML = I18N.t("guide.safetyP2", { link });
  }

  const eatP = document.querySelector("[data-guide-eat-card3-desc]");
  if (eatP) {
    const link = `<a href="https://guide.michelin.com/us/en/restaurants?q=Ho+Chi+Minh+City+vietnam&seeAll=true" target="_blank" rel="noopener">${I18N.t("guide.michelinLink")}</a>`;
    eatP.innerHTML = I18N.t("guide.eatCard3Desc", { link });
  }
}

// Sweeps every [data-i18n] (plain text) and [data-i18n-html] (contains
// markup, no variables) element within `root` and fills it from UI_STRINGS.
// Runs on every applyLanguage() call, and also on just-created elements
// (guest rows, Vung Tau rows) so they pick up the current language
// immediately instead of waiting for the next language switch.
function applyDataI18n(root) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = I18N.t(el.dataset.i18n);
  });
  root.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = I18N.t(el.dataset.i18nHtml);
  });
  root.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", I18N.t(el.dataset.i18nAria));
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", I18N.t(el.dataset.i18nPlaceholder));
  });
}

function initLanguageSwitcher() {
  const container = document.querySelector("[data-lang-switcher]");
  if (!container) return;

  container.innerHTML = `
    <button type="button" class="lang-switcher-btn" aria-haspopup="true" aria-expanded="false" data-i18n-aria="langswitch.aria">
      <span data-lang-current-flag>🇬🇧</span>
      <span class="lang-switcher-code" data-lang-current-code>EN</span>
    </button>
    <ul class="lang-switcher-menu" role="menu" hidden>
      ${I18N.languages
        .map(
          (l) => `
        <li role="none">
          <button type="button" role="menuitem" class="lang-switcher-option" data-lang-option="${l.code}">
            <span aria-hidden="true">${l.flag}</span> <span>${l.label}</span>
          </button>
        </li>`
        )
        .join("")}
    </ul>
  `;

  const btn = container.querySelector(".lang-switcher-btn");
  const menu = container.querySelector(".lang-switcher-menu");

  btn.addEventListener("click", () => {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    btn.setAttribute("aria-expanded", String(!isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }
  });

  container.querySelectorAll("[data-lang-option]").forEach((opt) => {
    opt.addEventListener("click", () => {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      applyLanguage(opt.dataset.langOption);
    });
  });
}

function updateLanguageSwitcherUI() {
  const current = I18N.languages.find((l) => l.code === I18N.getLang()) || I18N.languages[0];
  document.querySelectorAll("[data-lang-current-flag]").forEach((el) => (el.textContent = current.flag));
  document.querySelectorAll("[data-lang-current-code]").forEach((el) => (el.textContent = current.code.toUpperCase()));
  document.querySelectorAll("[data-lang-option]").forEach((opt) => {
    opt.classList.toggle("is-active", opt.dataset.langOption === current.code);
  });
}

// First-visit language modal — index.html only (see the modal markup
// there). Shows once per browser (tracked in localStorage) and lets a
// guest pick their language before they start reading.
function initLanguageModal() {
  const modal = document.getElementById("language-modal");
  if (!modal) return;

  const optionsEl = modal.querySelector("#lang-modal-options");
  if (optionsEl) {
    optionsEl.innerHTML = I18N.languages
      .map(
        (l) => `
        <button type="button" class="lang-modal-option" data-lang-option="${l.code}">
          <span class="lang-modal-flag" aria-hidden="true">${l.flag}</span>
          <span>${l.label}</span>
        </button>`
      )
      .join("");
  }

  modal.querySelectorAll("[data-lang-option]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLanguage(btn.dataset.langOption);
      I18N.markModalSeen();
      closeLanguageModal();
    });
  });

  modal.querySelector("[data-modal-dismiss]")?.addEventListener("click", () => {
    I18N.markModalSeen();
    closeLanguageModal();
  });

  if (!I18N.hasSeenModal()) {
    modal.hidden = false;
    lockBodyScroll();
  }
}

function closeLanguageModal() {
  const modal = document.getElementById("language-modal");
  if (!modal) return;
  if (modal.hidden) return;
  modal.hidden = true;
  unlockBodyScroll();
}

/* =============================================================================
   Floating "back to top" button — present on every page
   ========================================================================== */
function initBackToTop() {
  const fab = document.querySelector(".back-to-top-fab");
  if (!fab) return;
  window.addEventListener("scroll", () => {
    fab.classList.toggle("is-visible", window.scrollY > 500);
  });
  fab.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* =============================================================================
   Content bindings — fills every [data-field] / [data-field-href] element
   from WEDDING_CONTENT (content.js), so names/dates/hotel info only need to
   be edited in one place.
   ========================================================================== */
function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(I18N.localeCode(), { month: "long", day: "numeric", year: "numeric" });
}

function formatDateRange(startIso, endIso) {
  const locale = I18N.localeCode();
  const start = new Date(`${startIso}T00:00:00`);
  const end = new Date(`${endIso}T00:00:00`);
  const sameMonth = start.getMonth() === end.getMonth();
  const startStr = start.toLocaleDateString(locale, { month: "long", day: "numeric" });
  const endStr = end.toLocaleDateString(locale, sameMonth ? { day: "numeric" } : { month: "long", day: "numeric" });
  return `${startStr}–${endStr}, ${end.getFullYear()}`;
}

function initContentBindings() {
  if (!window.WEDDING_CONTENT) return;
  const c = WEDDING_CONTENT;

  const textMap = {
    "couple-names": `${c.coupleNames.partner1} & ${c.coupleNames.partner2}`,
    "couple-names-and": `${c.coupleNames.partner1} and ${c.coupleNames.partner2}`,
    "partner1": c.coupleNames.partner1,
    "partner2": c.coupleNames.partner2,
    "location": c.location.display,
    "airport-city": c.location.airportCity,
    "anchor-line": I18N.t("index.hero.anchor"),
    "venue-name": c.venue.name,
    "hotel-name": c.venue.hotelName,
    "hotel-room-block-code": c.venue.roomBlockCode,
    "hotel-contact-email": c.venue.contactEmail,
    "hotel-contact-phone": c.venue.contactPhone,
    "hotel-address": c.venue.address,
    "contact-email": c.contactEmail,
    "contact-line": I18N.t("common.contactLine", {
      name: c.contact.textName,
      phone: c.contact.textPhone,
      link: `<a href="${c.contact.whatsappLink}" target="_blank" rel="noopener">${I18N.t("common.whatsappGroupNote")}</a>`,
    }),
    "contact-line-lowercase": I18N.t("common.contactLineLower", {
      name: c.contact.textName,
      phone: c.contact.textPhone,
      link: `<a href="${c.contact.whatsappLink}" target="_blank" rel="noopener">${I18N.t("common.whatsappGroupNote")}</a>`,
    }),
    "date-range": formatDateRange(c.dates.arrival, c.dates.departure),
    "date-arrival": formatDate(c.dates.arrival),
    "date-wedding": formatDate(c.dates.wedding),
    "date-excursion": formatDate(c.dates.excursion),
    "date-departure": formatDate(c.dates.departure),
    "rsvp-deadline": formatDate(c.rsvpDeadline),
  };

  const htmlFields = new Set(["contact-line", "contact-line-lowercase"]);
  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.dataset.field;
    if (textMap[key] === undefined) return;
    if (htmlFields.has(key)) {
      el.innerHTML = textMap[key];
    } else {
      el.textContent = textMap[key];
    }
  });

  document.querySelectorAll("[data-field-href]").forEach((el) => {
    const key = el.dataset.fieldHref;
    if (key === "hotel-booking-link") el.href = c.venue.bookingLink;
    if (key === "contact-email-mailto") el.href = `mailto:${c.contactEmail}`;
    if (key === "hotel-contact-email-mailto") el.href = `mailto:${c.venue.contactEmail}`;
    if (key === "whatsapp-link") el.href = c.contact.whatsappLink;
  });

  document.querySelectorAll("[data-field-src]").forEach((el) => {
    const key = el.dataset.fieldSrc;
    if (key === "whatsapp-qr") el.src = c.contact.whatsappQrImage;
  });
}

/* =============================================================================
   Header / mobile nav
   ========================================================================== */
function initHeaderNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) lockBodyScroll();
    else unlockBodyScroll();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      const wasOpen = nav.classList.contains("is-open");
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      if (wasOpen) unlockBodyScroll();
    });
  });

  // Mark current page link
  const current = location.pathname.split("/").pop() || "index.html";
  nav.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href").split("#")[0];
    if (href === current) link.setAttribute("aria-current", "page");
  });
}

/* =============================================================================
   Scroll-in fade animation
   ========================================================================== */
function initFadeIn() {
  const targets = document.querySelectorAll(".fade-in");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach((t) => observer.observe(t));
}

/* =============================================================================
   Countdown to arrival date
   ========================================================================== */
function initCountdown() {
  const el = document.querySelector("[data-countdown]");
  if (!el || !window.WEDDING_CONTENT) return;

  const target = new Date(`${WEDDING_CONTENT.dates.arrival}T00:00:00+07:00`);
  const daysEl = el.querySelector("[data-cd-days]");
  const hoursEl = el.querySelector("[data-cd-hours]");
  const minsEl = el.querySelector("[data-cd-mins]");
  const secsEl = el.querySelector("[data-cd-secs]");

  function tick() {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      el.querySelector(".countdown-label-lead")?.replaceChildren(
        document.createTextNode(I18N.t("index.countdownArrived"))
      );
      [daysEl, hoursEl, minsEl, secsEl].forEach((n) => n && (n.textContent = "0"));
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(mins).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(secs).padStart(2, "0");
  }

  tick();
  const timer = setInterval(tick, 1000);
}

/* =============================================================================
   RSVP form
   ========================================================================== */
// 9 additional + the primary RSVP-er = 10 guests total per party. Guests
// aren't told about this cap — the "Add a guest" button just quietly
// disappears once it's reached.
const MAX_ADDITIONAL_GUESTS = 9;
let guestCount = 0;

const CHILD_AGE_OPTIONS = Array.from({ length: 15 }, (_, i) => i + 1)
  .map((age) => `<option value="${age}">${age}</option>`)
  .join("");

function initRsvpForm() {
  const form = document.getElementById("rsvp-form");
  if (!form) return;

  const attendingRadios = form.querySelectorAll('input[name="attending"]');
  const excursionSection = document.getElementById("excursion-section");
  const addGuestBtn = document.getElementById("add-guest-btn");
  const guestList = document.getElementById("guest-list");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("rsvp-submit-btn");
  const successPanel = document.getElementById("rsvp-success");
  const errorBanner = document.getElementById("rsvp-error-banner");

  // Reveal excursion question only when attending = yes
  attendingRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const attendingYes = form.querySelector('input[name="attending"]:checked')?.value === "yes";
      excursionSection.hidden = !attendingYes;
      excursionSection.querySelectorAll("input").forEach((i) => (i.disabled = !attendingYes));
    });
  });

  // Vung Tau checkboxes are optional and mutually exclusive per row — checking
  // one unchecks its siblings; clicking the checked one again just unchecks
  // it (native checkbox behavior), leaving the row blank.
  excursionSection?.addEventListener("change", (e) => {
    const cb = e.target;
    if (cb.type !== "checkbox") return;
    if (cb.checked) {
      cb.closest(".vung-tau-row")
        ?.querySelectorAll('input[type="checkbox"]')
        .forEach((sibling) => {
          if (sibling !== cb) sibling.checked = false;
        });
    }
  });

  // Add / remove guest rows
  addGuestBtn?.addEventListener("click", () => addGuestRow(guestList, addGuestBtn));

  // Validation + submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errors = validateForm(form);
    clearAllErrors(form);

    if (errors.length) {
      errors.forEach(({ field, message }) => showFieldError(form, field, message));
      statusEl.textContent = I18N.t("rsvp.fixHighlighted");
      statusEl.dataset.state = "error";
      errors[0]?.field && form.querySelector(`[name="${errors[0].field}"]`)?.focus();
      return;
    }

    statusEl.textContent = "";
    statusEl.dataset.state = "";
    errorBanner.hidden = true;
    submitRsvp(form, { submitBtn, statusEl, successPanel, errorBanner });
  });
}

function addGuestRow(guestList, addGuestBtn) {
  if (guestCount >= MAX_ADDITIONAL_GUESTS) return;
  guestCount++;
  const idx = guestCount;

  const row = document.createElement("div");
  row.className = "guest-row";
  row.dataset.guestIndex = String(idx);
  row.innerHTML = `
    <div class="guest-row-header">
      <h4>${escapeHtml(I18N.t("rsvp.guestHeading", { n: idx }))}</h4>
      <button type="button" class="remove-guest-btn" aria-label="${escapeHtml(I18N.t("rsvp.removeAria", { n: idx }))}" data-i18n="rsvp.remove">${escapeHtml(I18N.t("rsvp.remove"))}</button>
    </div>
    <div class="form-grid form-grid--2">
      <div class="field">
        <label for="guest-${idx}-first" data-i18n="rsvp.firstName">${escapeHtml(I18N.t("rsvp.firstName"))}</label>
        <input type="text" id="guest-${idx}-first" name="guest-${idx}-first" autocomplete="off">
        <p class="field-error" data-error-for="guest-${idx}-first"></p>
      </div>
      <div class="field">
        <label for="guest-${idx}-last" data-i18n="rsvp.lastName">${escapeHtml(I18N.t("rsvp.lastName"))}</label>
        <input type="text" id="guest-${idx}-last" name="guest-${idx}-last" autocomplete="off">
        <p class="field-error" data-error-for="guest-${idx}-last"></p>
      </div>
    </div>
    <div class="field" style="margin-top: var(--space-3); max-width: 220px;">
      <label for="guest-${idx}-age" data-i18n="rsvp.ageLabel">${escapeHtml(I18N.t("rsvp.ageLabel"))}</label>
      <select id="guest-${idx}-age" name="guest-${idx}-age">
        <option value="" data-i18n="rsvp.ageBlank">${escapeHtml(I18N.t("rsvp.ageBlank"))}</option>
        ${CHILD_AGE_OPTIONS}
      </select>
    </div>
    <div class="field" style="margin-top: var(--space-3);">
      <label for="guest-${idx}-dietary" data-i18n="rsvp.dietaryNeedsLabel">${escapeHtml(I18N.t("rsvp.dietaryNeedsLabel"))}</label>
      <input type="text" id="guest-${idx}-dietary" name="guest-${idx}-dietary" placeholder="${escapeHtml(I18N.t("rsvp.dietaryNeedsPlaceholder"))}" data-i18n-placeholder="rsvp.dietaryNeedsPlaceholder">
    </div>
  `;
  guestList.appendChild(row);
  addVungTauRow(idx);

  const syncName = () => updateVungTauName(idx);
  row.querySelector(`#guest-${idx}-first`).addEventListener("input", syncName);
  row.querySelector(`#guest-${idx}-last`).addEventListener("input", syncName);

  row.querySelector(".remove-guest-btn").addEventListener("click", () => {
    row.remove();
    guestCount--;
    addGuestBtn.hidden = false;
    document.querySelector(`[data-vung-tau-row="${idx}"]`)?.remove();
  });

  if (guestCount >= MAX_ADDITIONAL_GUESTS) {
    addGuestBtn.hidden = true;
  }
}

// Re-localizes the parts of already-created guest rows that need a {n}
// variable (so plain data-i18n can't cover them): the "Guest N" heading,
// its remove-button aria-label, and the Vung Tau row's name placeholder —
// but only while that placeholder is still showing, not a typed name.
function relocalizeGuestRows() {
  document.querySelectorAll(".guest-row").forEach((row) => {
    const idx = row.dataset.guestIndex;
    const heading = row.querySelector(".guest-row-header h4");
    if (heading) heading.textContent = I18N.t("rsvp.guestHeading", { n: idx });
    const removeBtn = row.querySelector(".remove-guest-btn");
    if (removeBtn) removeBtn.setAttribute("aria-label", I18N.t("rsvp.removeAria", { n: idx }));
  });
  document.querySelectorAll(".vung-tau-row").forEach((row) => {
    const idx = row.dataset.vungTauRow;
    if (idx === "primary") return;
    const first = document.getElementById(`guest-${idx}-first`)?.value.trim();
    const last = document.getElementById(`guest-${idx}-last`)?.value.trim();
    const nameEl = row.querySelector(".vung-tau-name");
    if (!first && !last && nameEl) nameEl.textContent = I18N.t("rsvp.guestHeading", { n: idx });
  });
}

// Mirrors a guest's typed name into their Vung Tau row label, live —
// falls back to the translated "Guest N" until they type something.
function updateVungTauName(idx) {
  const first = document.getElementById(`guest-${idx}-first`)?.value.trim() || "";
  const last = document.getElementById(`guest-${idx}-last`)?.value.trim() || "";
  const fullName = [first, last].filter(Boolean).join(" ");
  const label = document.querySelector(`.vung-tau-row[data-vung-tau-row="${idx}"] .vung-tau-name`);
  if (label) label.textContent = fullName || I18N.t("rsvp.guestHeading", { n: idx });
}

function addVungTauRow(idx) {
  const list = document.getElementById("vung-tau-list");
  if (!list) return;
  const excursionSection = document.getElementById("excursion-section");
  const isDisabled = excursionSection ? excursionSection.hidden : true;

  const row = document.createElement("div");
  row.className = "vung-tau-row";
  row.dataset.vungTauRow = String(idx);
  row.innerHTML = `
    <span class="vung-tau-name">${escapeHtml(I18N.t("rsvp.guestHeading", { n: idx }))}</span>
    <div class="checkbox-tri">
      <label class="checkbox-item">
        <input type="checkbox" name="guest-${idx}-excursion" value="yes" ${isDisabled ? "disabled" : ""}>
        <span data-i18n="rsvp.joinShuttle">${escapeHtml(I18N.t("rsvp.joinShuttle"))}</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" name="guest-${idx}-excursion" value="no" ${isDisabled ? "disabled" : ""}>
        <span data-i18n="rsvp.stayAtResort">${escapeHtml(I18N.t("rsvp.stayAtResort"))}</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" name="guest-${idx}-excursion" value="unsure" ${isDisabled ? "disabled" : ""}>
        <span data-i18n="rsvp.notSure">${escapeHtml(I18N.t("rsvp.notSure"))}</span>
      </label>
    </div>
  `;
  list.appendChild(row);
}

function validateForm(form) {
  const errors = [];
  const get = (name) => form.querySelector(`[name="${name}"]`);
  const val = (name) => get(name)?.value.trim() || "";

  if (!val("firstName")) errors.push({ field: "firstName", message: I18N.t("rsvp.err.firstName") });
  if (!val("lastName")) errors.push({ field: "lastName", message: I18N.t("rsvp.err.lastName") });

  const email = val("email");
  if (!email) {
    errors.push({ field: "email", message: I18N.t("rsvp.err.email") });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: "email", message: I18N.t("rsvp.err.emailInvalid") });
  }

  const phone = val("phone");
  if (!phone) {
    errors.push({ field: "phone", message: I18N.t("rsvp.err.phone") });
  } else if (!/^[+()\-.\s\d]{7,}$/.test(phone)) {
    errors.push({ field: "phone", message: I18N.t("rsvp.err.phoneInvalid") });
  }

  if (!form.querySelector('input[name="attending"]:checked')) {
    errors.push({ field: "attending", message: I18N.t("rsvp.err.attending") });
  }

  // Guest rows: require first + last name only for rows that have any input filled
  for (let i = 1; i <= guestCount; i++) {
    const firstEl = get(`guest-${i}-first`);
    if (!firstEl) continue;
    const first = firstEl.value.trim();
    const last = get(`guest-${i}-last`)?.value.trim() || "";
    if (first || last) {
      if (!first) errors.push({ field: `guest-${i}-first`, message: I18N.t("rsvp.err.guestFirstName") });
      if (!last) errors.push({ field: `guest-${i}-last`, message: I18N.t("rsvp.err.guestLastName") });
    }
  }

  return errors;
}

function showFieldError(form, fieldName, message) {
  const input = form.querySelector(`[name="${fieldName}"]`);
  const errorEl =
    form.querySelector(`[data-error-for="${fieldName}"]`) ||
    (fieldName === "attending" ? document.getElementById("attending-error") : null);
  if (input) input.setAttribute("aria-invalid", "true");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add("is-visible");
  }
}

function clearAllErrors(form) {
  form.querySelectorAll(".field-error").forEach((el) => {
    el.textContent = "";
    el.classList.remove("is-visible");
  });
  form.querySelectorAll('[aria-invalid="true"]').forEach((el) => el.removeAttribute("aria-invalid"));
}

function collectFormData(form) {
  const fd = new FormData(form);
  const partyId = `party-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const nights = fd.getAll("nights").join("; ");
  const dietary = fd.getAll("dietary").join("; ");

  const guests = [];
  for (let i = 1; i <= guestCount; i++) {
    const first = fd.get(`guest-${i}-first`);
    if (!first) continue;
    guests.push({
      partyId,
      role: "guest",
      firstName: first,
      lastName: fd.get(`guest-${i}-last`) || "",
      age: fd.get(`guest-${i}-age`) || "",
      email: "",
      phone: "",
      attending: fd.get("attending") || "",
      dietary: fd.get(`guest-${i}-dietary`) || "",
      mobilityNeeds: "",
      nights: "",
      excursion: fd.get(`guest-${i}-excursion`) || "",
      note: "",
      timestamp: new Date().toISOString(),
    });
  }

  const primary = {
    partyId,
    role: "primary",
    firstName: fd.get("firstName") || "",
    lastName: fd.get("lastName") || "",
    email: fd.get("email") || "",
    phone: fd.get("phone") || "",
    attending: fd.get("attending") || "",
    dietary,
    dietaryOther: fd.get("dietaryOther") || "",
    mobilityNeeds: fd.get("mobilityNeeds") || "",
    nights,
    excursion: fd.get("excursion") || "",
    note: fd.get("note") || "",
    timestamp: new Date().toISOString(),
  };

  return { primary, guests };
}

function submitRsvp(form, { submitBtn, statusEl, successPanel, errorBanner }) {
  const { primary, guests } = collectFormData(form);
  const rows = [primary, ...guests];

  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="spinner" aria-hidden="true"></span> ${I18N.t("rsvp.sending")}`;
  statusEl.textContent = I18N.t("rsvp.sendingStatus");
  statusEl.dataset.state = "loading";

  if (!RSVP_ENDPOINT || RSVP_ENDPOINT === "PASTE_YOUR_APPS_SCRIPT_URL_HERE") {
    // No endpoint configured yet — fail gracefully so the site is still demoable.
    handleRsvpFailure(form, { submitBtn, statusEl, errorBanner }, primary);
    return;
  }

  const requests = rows.map((row) => {
    const body = new URLSearchParams();
    Object.entries(row).forEach(([key, value]) => body.append(key, value ?? ""));
    return fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
  });

  Promise.all(requests)
    .then(() => {
      // no-cors gives an opaque response, so a resolved promise is our best
      // signal of success. Network/CORS-level failures still reject.
      showRsvpSuccess(form, successPanel, primary);
    })
    .catch(() => {
      handleRsvpFailure(form, { submitBtn, statusEl, errorBanner }, primary);
    });
}

function showRsvpSuccess(form, successPanel, primary) {
  form.hidden = true;
  successPanel.hidden = false;
  const heading = successPanel.querySelector("[data-success-heading]");
  if (heading) heading.textContent = I18N.t("rsvp.successThanks", { name: primary.firstName || I18N.t("rsvp.successThanksFallback") });
  successPanel.focus?.();
  successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}

function handleRsvpFailure(form, { submitBtn, statusEl, errorBanner }, primary) {
  submitBtn.disabled = false;
  submitBtn.textContent = I18N.t("rsvp.submit");
  statusEl.textContent = "";
  statusEl.dataset.state = "";

  const c = window.WEDDING_CONTENT || {};
  const contactEmail = c.contactEmail || "TODO@example.com";
  const contact = c.contact || {
    textName: "Richard",
    textPhone: "626.319.1332",
    whatsappNote: "our WhatsApp group",
    whatsappLink: "https://chat.whatsapp.com/DYHg5tzUQWcKctAKCkUstj?mode=gi_t",
  };
  const subject = encodeURIComponent(`RSVP from ${primary.firstName} ${primary.lastName}`);
  const bodyLines = [
    `Name: ${primary.firstName} ${primary.lastName}`,
    `Email: ${primary.email}`,
    `Phone: ${primary.phone}`,
    `Attending: ${primary.attending}`,
    `Nights at resort: ${primary.nights}`,
    `Vung Tau excursion: ${primary.excursion}`,
    `Dietary: ${primary.dietary} ${primary.dietaryOther || ""}`.trim(),
    `Mobility/accessibility needs: ${primary.mobilityNeeds}`,
    `Note: ${primary.note}`,
  ];
  const body = encodeURIComponent(bodyLines.join("\n"));
  const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  const whatsappLink = `<a href="${contact.whatsappLink}" target="_blank" rel="noopener">${I18N.t("common.whatsappGroupNote")}</a>`;
  const emailLink = `<a href="${mailto}">${I18N.t("rsvp.err.emailUsDirectly")}</a>`;

  errorBanner.hidden = false;
  errorBanner.innerHTML = I18N.t("rsvp.err.banner", {
    name: contact.textName,
    phone: contact.textPhone,
    whatsappLink,
    emailLink,
  });
}

/* =============================================================================
   FAQ page: render from content.js + accordion deep-links + live search
   ========================================================================== */
function renderFaqContent() {
  const faqRoot = document.querySelector("[data-faq-root]");
  if (!faqRoot || !window.WEDDING_CONTENT) return;

  const { faqCategories, faqs } = WEDDING_CONTENT;
  const tocEl = document.querySelector("[data-faq-toc]");

  if (tocEl) {
    tocEl.innerHTML = faqCategories
      .map((cat) => `<a href="#${cat.id}">${escapeHtml(I18N.translateFaqCategory(cat))}</a>`)
      .join("");
  }

  faqRoot.innerHTML = faqCategories
    .map((cat) => {
      const items = faqs.filter((f) => f.category === cat.id);
      const itemsHtml = items
        .map((faq) => {
          const t = I18N.translateFaq(faq);
          return `
          <details class="faq-item" id="${faq.id}">
            <summary>
              <span>${escapeHtml(t.question)}</span>
              ${ICONS.chevron}
            </summary>
            <div class="faq-body">
              ${t.answer}
              <a class="faq-back-to-top" href="#top">${I18N.t("common.backToTopLink")}</a>
            </div>
          </details>`;
        })
        .join("");
      return `
        <section class="faq-category" id="${cat.id}">
          <h2>${escapeHtml(I18N.translateFaqCategory(cat))}</h2>
          <div class="faq-list">${itemsHtml}</div>
        </section>`;
    })
    .join("");

  // Sync hotel placeholders inside the "where to stay" answer from content.js
  const c = WEDDING_CONTENT;
  const hotelName = document.getElementById("faq-hotel-name");
  const hotelLink = document.getElementById("faq-hotel-link");
  const hotelCode = document.getElementById("faq-hotel-code");
  const hotelContact = document.getElementById("faq-hotel-contact");
  if (hotelName) hotelName.textContent = c.venue.hotelName;
  if (hotelLink) { hotelLink.textContent = c.venue.bookingLink; hotelLink.href = c.venue.bookingLink; }
  if (hotelCode) hotelCode.textContent = c.venue.roomBlockCode;
  if (hotelContact) hotelContact.textContent = c.venue.contactEmail;
}

function initFaqInteractivity() {
  const faqRoot = document.querySelector("[data-faq-root]");
  if (!faqRoot || !window.WEDDING_CONTENT) return;

  // Deep-link: open + scroll to the FAQ named in the URL hash
  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.replace("#", ""));
    if (!id) return;
    const target = document.getElementById(id);
    if (target && target.tagName === "DETAILS") {
      target.open = true;
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };
  openFromHash();
  window.addEventListener("hashchange", openFromHash);

  // Back-to-top links inside each answer — delegated on the root so it
  // keeps working after renderFaqContent() replaces the answers wholesale
  // on a language switch.
  faqRoot.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-back-to-top");
    if (!btn) return;
    e.preventDefault();
    document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" });
    document.querySelector(".faq-search input")?.focus();
  });

  // Live search/filter
  const searchInput = document.getElementById("faq-search-input");
  const noResults = document.querySelector(".faq-no-results");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      let anyVisible = false;

      document.querySelectorAll(".faq-category").forEach((category) => {
        let categoryHasMatch = false;
        category.querySelectorAll(".faq-item").forEach((item) => {
          const text = item.textContent.toLowerCase();
          const matches = q === "" || text.includes(q);
          item.classList.toggle("is-hidden", !matches);
          if (matches) categoryHasMatch = true;
        });
        category.hidden = q !== "" && !categoryHasMatch;
        if (categoryHasMatch) anyVisible = true;
      });

      if (noResults) noResults.classList.toggle("is-visible", q !== "" && !anyVisible);
    });
  }
}

/* =============================================================================
   Schedule page: day selector + timeline render + .ics export
   ========================================================================== */
function initScheduleInteractivity() {
  const container = document.querySelector("[data-timeline-root]");
  if (!container || !window.WEDDING_CONTENT) return;

  const selector = document.querySelector(".day-selector");
  if (selector) {
    selector.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-day]");
      if (!btn) return;
      selector.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      const day = btn.dataset.day;
      document.querySelectorAll(".timeline-day").forEach((section) => {
        section.classList.toggle("is-active", section.dataset.day === day);
      });
    });
  }

  document.querySelectorAll("[data-ics-download]").forEach((btn) => {
    btn.addEventListener("click", () => downloadIcs());
  });
}

function renderTimeline() {
  const container = document.querySelector("[data-timeline-root]");
  if (!container || !window.WEDDING_CONTENT) return;
  const { itinerary } = WEDDING_CONTENT;

  // Preserve whichever day is currently selected across a language switch
  // instead of always resetting to Day 1.
  const activeBefore = container.querySelector(".timeline-day.is-active")?.dataset.day;
  container.innerHTML = "";

  itinerary.forEach((rawDay, index) => {
    const day = I18N.translateItineraryDay(rawDay);
    const isActive = activeBefore ? String(day.day) === activeBefore : index === 0;
    const section = document.createElement("section");
    section.className = "timeline-day" + (isActive ? " is-active" : "");
    section.dataset.day = String(day.day);
    section.id = `day-${day.day}`;
    section.setAttribute("role", "tabpanel");
    section.setAttribute("aria-labelledby", `day-${day.day}-heading`);

    const itemsHtml = day.events
      .map(
        (ev) => `
        <li class="timeline-item">
          <span class="timeline-icon">${ICONS[ev.icon] || ICONS.free}</span>
          <span class="timeline-time">${escapeHtml(ev.time)}</span>
          <h3>${escapeHtml(ev.title)}</h3>
          <p>${escapeHtml(ev.description)}</p>
        </li>`
      )
      .join("");

    section.innerHTML = `
      <div class="timeline-day-header">
        <span class="eyebrow">${escapeHtml(day.label)} · ${escapeHtml(day.dateDisplay)}</span>
        <h2 id="day-${day.day}-heading" class="vibe">${escapeHtml(day.vibe)}</h2>
      </div>
      <div class="timeline-day-desktop" style="--col-count: ${Math.min(day.events.length, 3)}">
        <ul class="timeline">${itemsHtml}</ul>
      </div>
    `;
    container.appendChild(section);
  });

  // Keep the day-selector buttons' aria-selected in sync too.
  document.querySelectorAll(".day-selector button[data-day]").forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.dataset.day === (activeBefore || "1")));
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function downloadIcs() {
  const c = WEDDING_CONTENT;
  const names = `${c.coupleNames.partner1} & ${c.coupleNames.partner2}`;
  const start = c.dates.arrival.replace(/-/g, "");
  const endDate = new Date(`${c.dates.departure}T00:00:00`);
  endDate.setDate(endDate.getDate() + 1); // .ics DTEND is exclusive
  const end = endDate.toISOString().slice(0, 10).replace(/-/g, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Site//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding-site`,
    `DTSTAMP:${formatIcsTimestamp(new Date())}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${icsEscape(names + "'s Wedding — " + c.location.display)}`,
    `DESCRIPTION:${icsEscape(c.anchorLine + " Full details: see the wedding website.")}`,
    `LOCATION:${icsEscape(c.venue.name + ", " + c.location.display)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-ho-tram.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function formatIcsTimestamp(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}
function icsEscape(str) {
  return String(str).replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}

/* =============================================================================
   Guide page: packing grid render + live Saigon/local time widget
   ========================================================================== */
function renderPackingGrid() {
  const grid = document.querySelector("[data-packing-grid]");
  if (!grid || !window.WEDDING_CONTENT) return;

  grid.innerHTML = WEDDING_CONTENT.packingList
    .map(I18N.translatePackingItem)
    .map(
      (item) => `
      <div class="packing-item">
        <span class="icon-badge">${ICONS[item.icon] || ICONS.check}</span>
        <h3>${escapeHtml(item.label)}</h3>
        <p>${escapeHtml(item.note)}${
          item.link
            ? ` <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener">${escapeHtml(item.linkLabel || item.link)}</a>.`
            : ""
        }</p>
        ${item.spare ? `<span class="spare-badge">${escapeHtml(I18N.t("guide.spareBadge"))}</span>` : ""}
      </div>`
    )
    .join("");
}

function initTimeWidget() {
  const widget = document.querySelector("[data-time-widget]");
  if (!widget) return;

  const saigonEl = widget.querySelector("[data-time-saigon]");
  const saigonDateEl = widget.querySelector("[data-date-saigon]");
  const localEl = widget.querySelector("[data-time-local]");
  const localDateEl = widget.querySelector("[data-date-local]");
  const localLabelEl = widget.querySelector("[data-label-local]");

  function tick() {
    const now = new Date();
    const locale = I18N.localeCode();
    const timeFmt = { hour: "2-digit", minute: "2-digit" };
    const dateFmt = { weekday: "short", month: "short", day: "numeric" };

    if (saigonEl) saigonEl.textContent = now.toLocaleTimeString(locale, { ...timeFmt, timeZone: "Asia/Ho_Chi_Minh" });
    if (saigonDateEl) saigonDateEl.textContent = now.toLocaleDateString(locale, { ...dateFmt, timeZone: "Asia/Ho_Chi_Minh" });
    if (localEl) localEl.textContent = now.toLocaleTimeString(locale, timeFmt);
    if (localDateEl) localDateEl.textContent = now.toLocaleDateString(locale, dateFmt);

    if (localLabelEl) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        localLabelEl.textContent = tz ? `${I18N.t("guide.timeCardYourTime")} (${tz})` : I18N.t("guide.timeCardYourTime");
      } catch (e) {
        localLabelEl.textContent = I18N.t("guide.timeCardYourTime");
      }
    }
  }

  tick();
  setInterval(tick, 30000);
}
