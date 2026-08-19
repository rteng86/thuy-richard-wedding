/**
 * content.js
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH FOR EDITABLE WEDDING CONTENT.
 * Every placeholder value (names, dates, hotel info, itinerary times) lives
 * here. Edit this file and every page updates automatically.
 *
 * Anything wrapped in "TODO" is a placeholder you still need to fill in.
 * See README.md for the full checklist.
 * ---------------------------------------------------------------------------
 */

// The resort's regular shuttle between Ho Chi Minh City and Ho Tram —
// separate from the Vung Tau day-trip shuttle on Day 3, which is still
// TODO. Times are grouped by day-of-week since they vary. Declared
// here (rather than inline in WEDDING_CONTENT) so it can be referenced
// both as itinerary data and when building the FAQ table's HTML below.
var SHUTTLE_SCHEDULE = {
  toHoTram: {
    "mon-thu": ["10:00 AM", "11:00 AM"],
    fri: ["10:00 AM", "11:00 AM", "7:00 PM"],
    sat: ["10:00 AM", "11:00 AM"],
    // TODO: confirm — the resort's schedule lists 11:00 PM here (not AM
    // like every other day); double-check this isn't a typo on their end.
    sun: ["10:00 AM", "11:00 PM"],
  },
  toHCMC: {
    "mon-thu": ["2:05 PM", "3:05 PM"],
    fri: ["2:05 PM", "3:05 PM"],
    sat: ["2:05 PM", "3:05 PM"],
    sun: ["2:05 PM", "3:05 PM", "7:05 PM"],
  },
  station: "Hai Ha Building",
  regulations: [
    "Only available for guests staying at the resort.",
    "First come, first served, and subject to availability.",
    "Seat bookings are required in advance with the resort's Reservations or Concierge team.",
    "Be at the bus station — Hai Ha Building — 20 minutes before departure.",
    "Masks are required on board.",
    "The bus doesn't make stops except for emergencies or reasonable requests.",
    "No food or drinks on board.",
    "No smoking; fasten your seatbelt if one's available.",
    "The bus leaves on time per the schedule — don't be late.",
    "Keep track of your belongings — the resort isn't responsible for anything lost or damaged on board.",
  ],
};

// Renders SHUTTLE_SCHEDULE as an HTML table + rules list for the
// "Getting to Ho Tram" FAQ answer.
function renderShuttleScheduleHtml() {
  var s = SHUTTLE_SCHEDULE;
  var rows = [
    ["Mon–Thu", s.toHoTram["mon-thu"], s.toHCMC["mon-thu"]],
    ["Friday", s.toHoTram.fri, s.toHCMC.fri],
    ["Saturday", s.toHoTram.sat, s.toHCMC.sat],
    ["Sunday", s.toHoTram.sun, s.toHCMC.sun],
  ];
  var rowsHtml = rows
    .map(function (r) {
      return (
        "<tr><th scope=\"row\">" + r[0] + "</th><td>" + r[1].join(", ") + "</td><td>" + r[2].join(", ") + "</td></tr>"
      );
    })
    .join("");
  var regsHtml = s.regulations.map(function (r) { return "<li>" + r + "</li>"; }).join("");

  return (
    "<div class=\"table-scroll\"><table class=\"shuttle-table\">" +
    "<caption class=\"visually-hidden\">Shuttle bus schedule between Ho Chi Minh City and Ho Tram</caption>" +
    "<thead><tr><th scope=\"col\">Days</th><th scope=\"col\">HCMC &rarr; Ho Tram</th><th scope=\"col\">Ho Tram &rarr; HCMC</th></tr></thead>" +
    "<tbody>" + rowsHtml + "</tbody></table></div>" +
    "<p style=\"margin-top: 1rem;\">Bus station: <strong>" + s.station + "</strong>. A few rules:</p>" +
    "<ul>" + regsHtml + "</ul>"
  );
}

var WEDDING_CONTENT = {
  coupleNames: {
    partner1: "Thuy Le",
    partner2: "Richard Teng",
  },

  // Dates (format YYYY-MM-DD, local Ho Tram time). Confirmed: June 30 – July 3, 2027.
  dates: {
    arrival: "2027-06-30",
    wedding: "2027-07-01",
    excursion: "2027-07-02",
    departure: "2027-07-03",
  },

  // Shown on the RSVP form ("Please respond by ..."). ISO format below is
  // parsed for the data binding; edit here only.
  rsvpDeadline: "2026-12-31",

  location: {
    city: "Ho Tram",
    country: "Vietnam",
    airportCode: "SGN",
    airportCity: "Ho Chi Minh City (Saigon)",
    display: "Ho Tram, Vietnam",
  },

  anchorLine:
    "Come celebrate our union around the chaos of Saigon, then spend the rest of the time relaxing at the resort.",

  // -------------------------------------------------------------------
  // TODO: replace all hotel/venue placeholders
  // -------------------------------------------------------------------
  venue: {
    name: "TODO: Venue Name",
    hotelName: "TBD",
    bookingLink: "https://example.com/TODO-booking-link",
    roomBlockCode: "TODO-ROOM-BLOCK-CODE",
    contactEmail: "TODO@example.com",
    contactPhone: "+84 TODO TODO TODO",
    address: "TODO: Resort address, Ho Tram, Ba Ria-Vung Tau, Vietnam",
  },

  shuttleSchedule: SHUTTLE_SCHEDULE,

  // General contact for "Questions?" footer + error fallback.
  // Used everywhere the site says "contact us for help."
  contact: {
    textName: "Richard",
    textPhone: "626.319.1332",
    whatsappNote: "our WhatsApp group",
    whatsappLink: "https://chat.whatsapp.com/DYHg5tzUQWcKctAKCkUstj?mode=gi_t",
    whatsappQrImage: "assets/whatsapp-qr.png",
  },

  // Kept for the RSVP-failure email fallback (see main.js handleRsvpFailure).
  contactEmail: "TODO@example.com",

  // -------------------------------------------------------------------
  // Google Apps Script RSVP endpoint lives in main.js (RSVP_ENDPOINT)
  // per the brief — kept separate so it's easy to find and swap.
  // -------------------------------------------------------------------

  // -------------------------------------------------------------------
  // Itinerary — used by schedule.html. Times marked TODO are placeholders.
  // "icon" refers to a key in the ICONS map in main.js.
  // -------------------------------------------------------------------
  itinerary: [
    {
      day: 1,
      dateISO: "2027-06-30",
      label: "Day 1",
      dateDisplay: "June 30",
      vibe: "Arrive, exhale, eat.",
      events: [
        {
          id: "arrivals",
          time: "All day",
          icon: "plane",
          title: "Arrivals into Saigon (SGN)",
          description:
            "Land whenever your flight gets you here — there's no group arrival time. Grab is the easiest way to your hotel or straight to Ho Tram.",
        },
        {
          id: "shuttle-arrival",
          time: "TODO",
          icon: "shuttle",
          title: "Shuttle windows to Ho Tram",
          description:
            "TODO: confirm times. We'll run a few shuttle windows from HCMC for anyone who wants to travel together instead of Grabbing it solo.",
        },
        {
          id: "dinner",
          time: "TODO: 7:00 PM (placeholder)",
          icon: "food",
          title: "Welcome dinner",
          description:
            "Casual, resort-side, come as you are after a long flight. Details to follow — this time is a placeholder.",
        },
      ],
    },
    {
      day: 2,
      dateISO: "2027-07-01",
      label: "Day 2",
      dateDisplay: "July 1",
      vibe: "The wedding day.",
      events: [
        {
          id: "ceremony",
          time: "TODO: ceremony time",
          icon: "ceremony",
          title: "Ceremony",
          description:
            "Run-of-show is still being finalized. TODO: confirm ceremony start time and location on property.",
        },
        {
          id: "cocktail",
          time: "TODO: cocktail hour",
          icon: "free",
          title: "Cocktail hour",
          description: "TODO: confirm time. Drinks, snacks, breathing room.",
        },
        {
          id: "reception",
          time: "TODO: reception time",
          icon: "food",
          title: "Reception",
          description:
            "Dinner, toasts, dancing. TODO: confirm reception start and end times.",
        },
      ],
    },
    {
      day: 3,
      dateISO: "2027-07-02",
      label: "Day 3",
      dateDisplay: "July 2",
      vibe: "Free day — go to Vung Tau, or don't.",
      events: [
        {
          id: "shuttle-vungtau",
          time: "TODO: confirm times",
          icon: "shuttle",
          title: "Shuttle to Vung Tau (optional)",
          description:
            "A day trip for anyone who wants it — coastline, seafood, a change of scenery. Departure and return times are TODO: confirm times.",
        },
        {
          id: "relax",
          time: "All day",
          icon: "free",
          title: "Or: relax at the resort",
          description:
            "Equally correct answer. Pool, beach, spa, a nap that fixes your jet lag. Let us know your preference on the RSVP form.",
        },
      ],
    },
    {
      day: 4,
      dateISO: "2027-07-03",
      label: "Day 4",
      dateDisplay: "July 3",
      vibe: "Checkout, hugs, departures.",
      events: [
        {
          id: "checkout",
          time: "TODO: checkout time",
          icon: "hotel",
          title: "Checkout",
          description:
            "TODO: confirm standard checkout time and whether late checkout is available for the block.",
        },
        {
          id: "departures",
          time: "TODO",
          icon: "plane",
          title: "Departures",
          description:
            "TODO: confirm luggage storage options for anyone with a late flight out of SGN. Most guests fly home over the July 4th weekend.",
        },
      ],
    },
  ],

  // -------------------------------------------------------------------
  // Travel FAQ — used by travel.html
  // -------------------------------------------------------------------
  faqCategories: [
    { id: "flights", label: "Flights" },
    { id: "visas", label: "Visas" },
    { id: "arriving", label: "Arriving at SGN" },
    { id: "phones", label: "Phones & Data" },
    { id: "getting-around", label: "Getting Around" },
    { id: "where-to-stay", label: "Where to Stay" },
    { id: "what-to-eat", label: "What to Eat" },
  ],

  faqs: [
    {
      id: "faq-direct-flights",
      category: "flights",
      question: "How do we get to Saigon?",
      answer:
        "<p>Vietnam Airlines flies direct to Saigon (SGN) from several US gateway cities. If a direct flight doesn't work with your schedule or budget, plenty of one-stop options exist through hubs like Tokyo, Seoul, or Taipei — a good excuse to break up a long trip.</p>",
    },
    {
      id: "faq-when-to-book",
      category: "flights",
      question: "When should we book flights?",
      answer:
        "<p>Late June/early July is peak season, so don't wait. <strong>3–6 months out</strong> is the sweet spot for fares — set fare alerts earlier than that so you know what \"normal\" looks like before prices climb.</p><p>The flight is long and jet lag is real. That's one more argument for arriving a few days early (see the <a href=\"schedule.html#arrival-plan\">suggested arrival plan</a>).</p>",
    },
    {
      id: "faq-do-i-need-a-visa",
      category: "visas",
      question: "Do I need a visa?",
      answer:
        "<p>Depends on your passport — check before you assume. Many travelers can apply for an e-visa online.</p><p>E-visa applications go through the official government portal: <a href=\"https://evisa.gov.vn/\" target=\"_blank\" rel=\"noopener\">evisa.gov.vn</a>. The e-visa takes <strong>at least 2 weeks</strong> to process. But Vietnam works on its own time, so don't wait longer than <strong>a month</strong> before your travel dates to apply.</p><p><strong>Watch out:</strong> there are lookalike third-party visa sites that charge extra fees for the same service. When in doubt, use the official evisa.gov.vn link above.</p>",
    },
    {
      id: "faq-customs",
      category: "arriving",
      question: "What's customs and immigration like at SGN?",
      answer:
        "<p>The immigration line can be long, especially if a few international flights land close together. Bring patience, have your passport and (if needed) visa approval printed or saved offline, and budget extra time before you plan any onward travel.</p>",
    },
    {
      id: "faq-phones-data",
      category: "phones",
      question: "Will my phone work in Vietnam?",
      answer:
        "<p>Some US carriers — T-Mobile among them — include free international data and texting in certain plans. Check your specific plan before assuming you're covered; not every T-Mobile plan includes it.</p><p>If your carrier doesn't cover you, a local eSIM is an easy, cheap alternative you can set up before you land.</p>",
    },
    {
      id: "faq-grab",
      category: "getting-around",
      question: "How do we get around once we land?",
      answer:
        "<p>Download <strong>Grab</strong> (Vietnam's Uber) before you arrive. You'll use it in the city and to reach the venue.</p><p>You don't need a Vietnamese phone number to sign up or use it — your regular number works fine. You do need data, though, so make sure your phone plan or eSIM is active before you land (see the Phones &amp; Data section above).</p><p>Pay in VND cash or link a credit card in the app — either works.</p><p><strong>Do not accept rides from people who approach you in the airport arrivals area.</strong> Ignore them and book through the app at the designated pickup point instead.</p><p>One more thing: Vietnam does not have a tipping culture. No need to tip your Grab driver.</p>",
    },
    {
      id: "faq-getting-to-ho-tram",
      category: "getting-around",
      question: "How do we get from Saigon to Ho Tram?",
      answer:
        "<p>Ho Tram is roughly <strong>2.5–3 hours</strong> from central Saigon by road.</p><p>The resort runs a regular shuttle to and from Ho Chi Minh City — the schedule depends on the day of the week:</p>" +
        renderShuttleScheduleHtml() +
        "<p style=\"margin-top: 1rem;\">Otherwise, Grab is a reliable option for the drive down.</p>",
    },
    {
      id: "faq-where-to-stay",
      category: "where-to-stay",
      question: "Where should we stay?",
      answer:
        "<h4>In Ho Tram</h4><p>We've got a room block at <strong id=\"faq-hotel-name\">TODO: Resort Name</strong>. Standard rooms, suites, and villas are all available depending on your group size and budget.</p><ul><li><strong>Booking link:</strong> <a id=\"faq-hotel-link\" href=\"https://example.com/TODO-booking-link\" target=\"_blank\" rel=\"noopener\">TODO: paste booking link</a></li><li><strong>Room block code:</strong> <span id=\"faq-hotel-code\">TODO-ROOM-BLOCK-CODE</span></li><li><strong>Questions:</strong> <span id=\"faq-hotel-contact\">TODO@example.com</span></li></ul>" +
        "<h4 style=\"margin-top: 1.5rem;\">Downtown Ho Chi Minh City</h4><p>Coming in early to explore Saigon first (see the <a href=\"schedule.html#arrival-plan\">suggested arrival plan</a>)? A few neighborhoods worth booking in:</p><ul>" +
        "<li><strong>District 1</strong> — the touristy heart of the city. Walkable, packed with sights, restaurants, and nightlife. Book here if you want to be in the middle of everything.</li>" +
        "<li><strong>District 4</strong> — right next door to District 1, but calmer and less traffic-heavy. A good pick if you still want to be close without the D1 chaos.</li>" +
        "<li><strong>Bình Thạnh District</strong> — another great option. A bit more local, still easy to get around from.</li>" +
        "</ul><p>For food recommendations near wherever you land, see <a href=\"#what-to-eat\">What to Eat</a> below.</p>",
    },
    {
      id: "faq-what-to-eat",
      category: "what-to-eat",
      question: "What should we eat while we're there?",
      answer:
        "<p>Short answer: almost anything. Vietnamese food is one of the best reasons to be early to this wedding.</p>" +
        "<h4>In Saigon</h4><p>Start with the basics — <strong>bánh mì</strong>, <strong>phở</strong>, and <strong>bún thịt nướng</strong> — from a stall, not just a sit-down restaurant. Some of the best meals in the city cost less than a coffee back home. A busy stall with a line is a good sign, not a red flag.</p>" +
        "<p>Want something closer to a sure thing? The <a href=\"https://guide.michelin.com/us/en/restaurants?q=Ho+Chi+Minh+City+vietnam&amp;seeAll=true\" target=\"_blank\" rel=\"noopener\">Michelin Guide's Ho Chi Minh City list</a> has both Michelin-rated and Michelin-recommended spots across every budget — cheap eats included, not just tasting menus.</p>" +
        "<h4 style=\"margin-top: 1.5rem;\">In Ho Tram</h4><p>Being on the coast means fresh seafood is easy to find near the resort. TODO: add a few specific restaurant picks once we've scoped out favorites.</p>",
    },
  ],

  // -------------------------------------------------------------------
  // What to bring — used by guide.html
  // -------------------------------------------------------------------
  packingList: [
    { id: "mosquito", icon: "bug", label: "Mosquito repellent", spare: true, note: "Bring your own if you have a favorite — we'll have spares." },
    { id: "swimwear", icon: "swim", label: "Shorts & swimwear", spare: false, note: "It will be hot. You'll want these daily." },
    { id: "umbrella", icon: "umbrella", label: "Umbrella", spare: true, note: "Rain is possible. We'll have spares at the resort." },
    { id: "sandals", icon: "sandal", label: "Sandals", spare: true, note: "Easy, breathable, forgiving of sand. Spares available." },
    { id: "hat", icon: "hat", label: "A hat", spare: false, note: "Sun protection you'll actually wear." },
    { id: "attire", icon: "attire", label: "Beach-wedding attire", spare: false, note: "Light fabrics, nothing heavy. Heat and humidity are guaranteed." },
    { id: "sunscreen", icon: "sun", label: "Sunscreen", spare: true, note: "Reef-safe if you have it. The sun does not negotiate." },
    { id: "golf", icon: "golf", label: "Golf gear (optional)", spare: false, note: "There's a course nearby. Clubs are rentable; there's a dress code.", link: "https://thebluffshotram.com/", linkLabel: "The Bluffs Ho Tram Strip" },
  ],
};

// Shared with i18n.js, which needs the same weekday logic to build
// translated shuttle-time strings for the other languages.
function shuttleGroupForDate(iso) {
  var day = new Date(iso + "T00:00:00").getDay(); // 0 = Sun ... 6 = Sat
  if (day === 0) return "sun";
  if (day === 5) return "fri";
  if (day === 6) return "sat";
  return "mon-thu";
}

// Auto-fills the Day 1 shuttle-to-Ho-Tram and Day 4 departure-shuttle
// itinerary entries from SHUTTLE_SCHEDULE, based on the actual weekday of
// the arrival/departure dates above. Re-runs correctly if you ever change
// the wedding year — no manual weekday math required.
(function fillShuttleItineraryTimes() {
  function findEvent(dayNumber, eventId) {
    var day = WEDDING_CONTENT.itinerary.filter(function (d) { return d.day === dayNumber; })[0];
    return day && day.events.filter(function (e) { return e.id === eventId; })[0];
  }

  var arrivalGroup = shuttleGroupForDate(WEDDING_CONTENT.dates.arrival);
  var departureGroup = shuttleGroupForDate(WEDDING_CONTENT.dates.departure);
  // Exposed so i18n.js can build translated versions of these two events
  // without re-deriving the weekday groups itself.
  WEDDING_CONTENT.shuttleSchedule.arrivalGroup = arrivalGroup;
  WEDDING_CONTENT.shuttleSchedule.departureGroup = departureGroup;

  var shuttleToHoTram = findEvent(1, "shuttle-arrival");
  if (shuttleToHoTram) {
    var toHoTramTimes = SHUTTLE_SCHEDULE.toHoTram[arrivalGroup].join(" or ");
    shuttleToHoTram.time = toHoTramTimes;
    shuttleToHoTram.description =
      "The resort shuttle from HCMC runs " + toHoTramTimes + " on your arrival day. Seats need to be booked ahead with the resort's Reservations/Concierge team — see the Travel page for the full weekly schedule. Otherwise, Grab works fine too.";
  }

  var departures = findEvent(4, "departures");
  if (departures) {
    var toHcmcTimes = SHUTTLE_SCHEDULE.toHCMC[departureGroup].join(" or ");
    departures.time = toHcmcTimes;
    departures.description =
      "The resort shuttle back to HCMC runs " + toHcmcTimes + ". TODO: confirm luggage storage options for anyone with a later flight out of SGN. Most guests fly home over the July 4th weekend.";
  }
})();
