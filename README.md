# Wedding Website — Ho Tram, Vietnam

A static, no-build wedding website. Plain HTML/CSS/vanilla JS — open `index.html`
directly in a browser and everything works.

## Running it locally

No build step, no npm, no server required.

- **Simplest:** double-click `index.html` (or any of the other pages) to open it
  directly in your browser (`file://...`).
- **Optional (recommended for testing the RSVP form's `fetch` call):** some
  browsers restrict `fetch` on `file://` pages. If the RSVP submit seems to
  silently fail while testing locally, serve the folder instead:

  ```bash
  cd wedding-site
  python3 -m http.server 8000
  ```

  Then visit `http://localhost:8000`.

## File structure

```
wedding-site/
├── index.html         Home — hero, "short version" cards, RSVP form
├── travel.html         Travel & Accommodations FAQ
├── schedule.html       Schedule & Itinerary (timeline + .ics export)
├── guide.html           Local Insider Guide & What to Bring
├── styles.css           Shared design system (all pages)
├── main.js               Shared behavior (nav, forms, accordions, etc.)
├── content.js            ← EDIT THIS to fill in your real details
├── assets/
│   ├── couple-hero-landscape.jpg   Homepage hero image (+ .webp)
│   └── couple-illustration-original.webp   Untouched original artwork
└── apps-script/
    └── Code.gs           Paste into Google Apps Script (see below)
```

## Where the placeholders are (edit `content.js`)

Almost everything editable lives in **one file: `content.js`**. Open it and
fill in every value marked `TODO`:

| Field | Where |
|---|---|
| Couple names | `WEDDING_CONTENT.coupleNames` |
| Wedding dates — confirmed: June 30 – July 3, 2027 | `WEDDING_CONTENT.dates` |
| RSVP deadline — confirmed: December 31, 2026 | `WEDDING_CONTENT.rsvpDeadline` |
| Venue / hotel name, booking link, room block code, contact | `WEDDING_CONTENT.venue` |
| General contact email (footer, error fallback) | `WEDDING_CONTENT.contactEmail` |
| Itinerary times (ceremony, reception, shuttle windows, checkout) | `WEDDING_CONTENT.itinerary[].events[].time` |
| "Where to stay" FAQ answer | `WEDDING_CONTENT.faqs` (id: `faq-where-to-stay`) — pulls from `venue` automatically |

Everything else (names, dates, hotel info) is pulled into all four pages
automatically at runtime via a small binding system in `main.js`
(`initContentBindings`) — elements tagged `data-field="..."` — so you only
ever edit it in one place.

### Full TODO checklist

- [x] Couple names (`content.js` → `coupleNames`) — set to "Thuy Le" / "Richard Teng"
- [x] Wedding dates — confirmed **June 30 – July 3, 2027** (`content.js` → `dates`)
- [ ] Venue name (`content.js` → `venue.name`)
- [ ] Hotel/resort name (`content.js` → `venue.hotelName`) — currently "TBD"
- [ ] Hotel booking link (`content.js` → `venue.bookingLink`)
- [ ] Room block code (`content.js` → `venue.roomBlockCode`)
- [ ] Hotel contact email + phone (`content.js` → `venue.contactEmail` / `contactPhone`)
- [ ] Hotel address (`content.js` → `venue.address`)
- [ ] General contact email (`content.js` → `contactEmail`) — used only as the RSVP-failure
      email fallback; the "contact us" callouts (footer, travel FAQ, RSVP error) already use
      the text/WhatsApp line below
- [x] Contact method for "Questions?" callouts (`content.js` → `contact`) — set to text Richard
      at 626.319.1332; **WhatsApp group link still TBD**, update `contact.whatsappNote` once it exists
- [x] RSVP deadline date — confirmed **December 31, 2026** (`content.js` → `rsvpDeadline`)
- [x] Day 1 shuttle-to-Ho-Tram time and Day 4 shuttle-to-HCMC time — now auto-computed from
      `SHUTTLE_SCHEDULE` in `content.js` based on the actual weekday of your arrival/departure
      dates, so these update automatically if you change the wedding year
- [ ] Day 1 welcome dinner time (`content.js` → itinerary, Day 1)
- [ ] Day 2 ceremony / cocktail hour / reception times (`content.js` → itinerary, Day 2)
- [ ] Day 3 Vung Tau shuttle departure/return times (`content.js` → itinerary, Day 3; also mentioned in `travel.html` FAQ and `schedule.html`) — **not** the same shuttle as the HCMC↔Ho Tram one above
- [ ] Day 4 checkout time + luggage storage details (`content.js` → itinerary, Day 4 "Checkout" event)
- [ ] Confirm the Sunday HCMC→Ho Tram shuttle time — the schedule you shared lists **11:00 PM**
      for that slot (every other day says 11:00 AM). Transcribed as-is in `SHUTTLE_SCHEDULE.toHoTram.sun`
      in `content.js`; flag it with the resort if it's a typo on their end.
- [x] Real couple photo — `index.html` hero now uses `assets/couple-hero-landscape.jpg`
      (+ `.webp`), a landscape-canvas edit of the illustration you provided (see
      "Hero image" below)
- [ ] RSVP Google Apps Script endpoint URL (`main.js` → `RSVP_ENDPOINT`, see below)
- [ ] Paste the header row into row 1 of the Google Sheet (see below)
- [ ] `Code.gs` → `REPLY_TO_EMAIL` — where guest email replies should land
- [ ] `Code.gs` → `REMINDER_BODY_INTRO` — fill in before running the reminder blast (see "Email notifications" below)

## Hero image

`assets/couple-hero-landscape.jpg` (with a `.webp` variant for smaller file
size) is your illustrated portrait, edited into a landscape frame: the
original artwork (864×1184, portrait) is centered on a wider canvas padded
with its own matte gray on the left/right, at a 4:3 landscape ratio, then
exported at 1600×1200. Nothing in the artwork itself was cropped or altered.

`assets/couple-illustration-original.webp` is the untouched original, kept
alongside it in case you want to re-crop or re-frame it differently later.

## RSVP → Google Sheets (Apps Script setup)

The RSVP form submits via `fetch(..., { mode: "no-cors" })` with a
form-encoded body, once per person in the party (so a family of four
produces four rows, all sharing a `Party ID` so you can group them). This
avoids CORS entirely, which is why it's the right approach for a static,
backend-less site — see "Alternatives considered" below for why we didn't
go a different route.

### 1. Open the Apps Script editor

1. Open the sheet:
   `https://docs.google.com/spreadsheets/d/1PrwT6vsrNjPLW5EhpUYF3ft8VeTfxanasuOytkodZBU/edit`
2. **Extensions → Apps Script.**
3. Delete whatever's in the default `Code.gs`, and paste in the entire
   contents of [`apps-script/Code.gs`](apps-script/Code.gs) from this folder.
4. Click the disk icon (or Ctrl/Cmd+S) to save the project.

### 2. Add the header row

Paste this into **row 1** of the sheet (one header per column, tab-separated
— just select cell A1 and paste the whole line):

```
Timestamp	Party ID	Role	First Name	Last Name	Age (if a child)	Email	Phone	Attending	Dietary	Dietary (Other)	Mobility / Accessibility Needs	Nights At Resort	Vung Tau Day Trip (Jul 2)	Note	Confirmation Emailed	Reminder Sent
```

(The script will also auto-create this header row on the very first
submission if row 1 is empty — but pasting it yourself first means you can
freeze/style it before real data comes in.)

### 3. Deploy as a Web App

1. In the Apps Script editor, click **Deploy → New deployment.**
2. Click the gear icon next to "Select type" → choose **Web app.**
3. Configure:
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy.** Google will ask you to authorize the script — approve it
   (it's your own script, acting on your own sheet).
5. Copy the **Web app URL** it gives you (ends in `/exec`).

### 4. Wire it into the site

Open `main.js` and find this line near the top:

```js
const RSVP_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
```

Replace the placeholder string with the URL you copied. That's it — the form
is live.

### Testing it

Because the form submits with `mode: "no-cors"`, the browser can't read the
response, so a successful `fetch()` and a *silently failing* one can look
similar from JS's point of view. To verify submissions are actually landing:

- Open the deployed URL directly in a browser — you should see
  "RSVP endpoint is live." (this hits the `doGet` handler in `Code.gs`).
- Submit a real test RSVP on the site, then check the sheet for a new row.
- If nothing shows up, re-check the deployment's **Who has access** is set
  to **Anyone**, and that you copied the `/exec` URL (not `/dev`).

If the request fails outright (e.g. `RSVP_ENDPOINT` is still the placeholder,
or the network drops), the form shows an inline error with a `mailto:` link
pre-filled with the guest's answers, so no one's RSVP gets lost.

### Email notifications (also free)

`Code.gs` sends email through Gmail's free sending quota (100/day on a plain
Gmail account — no paid plan needed for a guest list this size), using
whichever Google account the script is deployed under.

**Auto-confirmation.** The moment someone submits the RSVP form, they get a
short confirmation email — different copy depending on whether they said yes
or no. This is on by default; set `SEND_CONFIRMATION_EMAIL = false` at the
top of `Code.gs` to turn it off. If sending fails for some reason, the RSVP
itself still saves — the "Confirmation Emailed" column in the sheet just
records `Failed: ...` instead of `Yes`, so nothing silently breaks.

**Reminder blast.** Whenever you want to send an update to everyone who
RSVP'd yes (e.g. a month out — visa deadlines, final shuttle times, whatever
you filled into `REMINDER_BODY_INTRO`), open the Apps Script editor, select
`sendReminderToAttendees` from the function dropdown at the top, and click
**Run**. It emails each party's primary RSVP-er once and marks the "Reminder
Sent" column so re-running later (for a second reminder) only reaches people
who haven't gotten *that* one — clear the cell for anyone you want to
re-send to. Edit `REMINDER_SUBJECT` / `REMINDER_BODY_INTRO` before each
send.

Both features use `CONFIG` values at the top of `Code.gs` (couple names,
contact info, reply-to address) — keep those in sync with `content.js` on
the site.

### Alternatives considered

Google Forms would technically be less code (zero code, in fact), but it
loses the custom validation, dynamic guest rows, and the "reveal the Vung Tau
question only if attending" logic the brief asked for — and it would live on
a separate `docs.google.com` page instead of feeling native to the site. A
tiny serverless function (Cloudflare Worker, Vercel function) would give you
real CORS and a readable response, but that's a build step and a hosting
decision the brief explicitly wanted to avoid for now. Apps Script is the
right trade-off: no backend to run, and it writes straight into the sheet you
already have.

## Deploying (GitHub Pages — free)

This repo is set up to deploy via GitHub Pages, which is free for public
repos (private-repo Pages needs a paid GitHub plan — not worth it for a
guest-facing wedding site anyway).

**Live URL:** https://rteng86.github.io/thuy-richard-wedding/

**Repo:** https://github.com/rteng86/thuy-richard-wedding

### How it's set up

- The whole `wedding-site/` folder *is* the repo root — there's no separate
  build output or `/docs` folder, since this is already plain static files.
- GitHub Pages is configured to publish from the `main` branch, root
  directory.
- Any push to `main` redeploys the live site automatically, usually within
  a minute or two. Check the repo's **Actions** tab (or **Settings → Pages**)
  if a change doesn't show up.

### Making changes after launch

```bash
cd wedding-site
git add -A
git commit -m "describe what changed"
git push
```

That's it — no build step, no deploy command. GitHub picks up the push and
republishes automatically.

### Other free options

If you'd rather use something else, the site works identically anywhere
that serves static files:

- **Netlify / Vercel / Cloudflare Pages:** drag-and-drop the `wedding-site/`
  folder in their dashboard, or connect the same GitHub repo — all have
  equivalent free tiers.
- **Any basic web host:** upload the contents of `wedding-site/` via
  FTP/SFTP — there's nothing to build or compile.

Whichever you choose, double-check `RSVP_ENDPOINT` in `main.js` is set to
your real Apps Script URL before sharing the link with guests.

## Design notes & assumptions

- **Fonts:** Fraunces (serif, headings) + Inter (sans, body), loaded via
  Google Fonts `<link>` tags.
- **Palette:** warm neutrals (bone/sand/ink) with a single dusk-blue coastal
  accent, defined as CSS custom properties in `styles.css` (`:root`).
- **Year:** the brief gave dates (June 30–July 3) but no year. This build
  assumes **2027** as a placeholder — update `content.js` → `dates` once
  confirmed. Everything (countdown, itinerary headers, .ics export) derives
  from those three ISO date strings, so it's a one-line-per-date fix.
- **Placeholder images:** the hero photo slot on `index.html` is a plain
  gradient block marked `TODO: replace` — swap in a real `<img>` or a
  `picsum.photos` URL. No photos of the couple were invented.
- **RSVP guest cap:** capped at 6 additional guests per the brief; the "Add a
  guest" button disables itself at the cap with an inline note to email
  instead.
- **Per-guest Vung Tau answer:** the brief allowed either "one answer per
  party" or "per guest" — this build does **per guest** (including the
  primary RSVP-er), since families may genuinely split on this and it wasn't
  much extra complexity.
- **Accessibility:** semantic landmarks, real `<label>`s on every input,
  visible focus rings (`:focus-visible`), `aria-expanded`/`aria-selected` on
  interactive widgets, alt text via `aria-label`/`role="img"` on the
  placeholder image, and `prefers-reduced-motion` respected for both the
  scroll-fade-ins and the countdown/spinner animations.
