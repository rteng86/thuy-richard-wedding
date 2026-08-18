/**
 * Code.gs
 * ---------------------------------------------------------------------------
 * Google Apps Script Web App backing the RSVP form on index.html.
 *
 * WHAT THIS DOES
 * The site's main.js sends one POST request per person in a party (the
 * primary RSVP-er, plus any additional guests they added), each tagged with
 * a shared `partyId` so families/groups can be grouped back together in the
 * sheet. This script appends each submission as its own row.
 *
 * It also handles two kinds of email, both using Gmail's free sending quota
 * (100/day on a plain Gmail account — no paid plan needed for a guest list
 * this size):
 *   1. An automatic confirmation email the moment someone submits the RSVP
 *      form (see sendConfirmationEmail_).
 *   2. A reminder blast you trigger manually whenever you want to send an
 *      update to everyone who RSVP'd yes (see sendReminderToAttendees).
 *
 * SETUP — see README.md "Apps Script setup" for the full walkthrough. Short
 * version:
 *   1. Open the Google Sheet → Extensions → Apps Script.
 *   2. Delete the default Code.gs contents, paste this whole file in.
 *   3. Fill in the CONFIG block below with your real details.
 *   4. Paste the header row (see README.md) into row 1 of the sheet.
 *   5. Deploy → New deployment → type "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   6. Copy the deployment URL into RSVP_ENDPOINT in main.js.
 * ---------------------------------------------------------------------------
 */

// =============================================================================
// CONFIG — edit these to match content.js on the site
// =============================================================================
var COUPLE_NAMES = "Thuy Le & Richard Teng";
var WEDDING_DATE_RANGE = "June 30 – July 3, 2027"; // TODO: confirm year
var VENUE_LOCATION = "Ho Tram, Vietnam";
var CONTACT_NAME = "Richard";
var CONTACT_PHONE = "626.319.1332";

// Emails send "from" whichever Google account this script is deployed under
// (see setup step 5, "Execute as: Me"). Replies go to this address instead —
// set it to whichever inbox you actually want guest replies to land in.
var REPLY_TO_EMAIL = "TODO@example.com";

// Turn either email feature off without touching the rest of the code.
var SEND_CONFIRMATION_EMAIL = true;
var ENABLE_REMINDER_BLAST = true;

// If you rename the sheet tab, update this to match. Leave blank ("") to
// just use whichever sheet is active/first in the spreadsheet.
var SHEET_NAME = "";

var COLUMNS = [
  "Timestamp",
  "Party ID",
  "Role",
  "First Name",
  "Last Name",
  "Age (if a child)",
  "Email",
  "Phone",
  "Attending",
  "Dietary",
  "Dietary (Other)",
  "Mobility / Accessibility Needs",
  "Nights At Resort",
  "Vung Tau Day Trip (Jul 2)",
  "Note",
  "Confirmation Emailed",
  "Reminder Sent",
];

function doPost(e) {
  try {
    var sheet = getTargetSheet_();
    ensureHeaderRow_(sheet);

    var params = (e && e.parameter) || {};
    var row = [
      new Date(),
      params.partyId || "",
      params.role || "",
      params.firstName || "",
      params.lastName || "",
      params.age || "",
      params.email || "",
      params.phone || "",
      formatAttending_(params.attending),
      params.dietary || "",
      params.dietaryOther || "",
      params.mobilityNeeds || "",
      params.nights || "",
      formatExcursion_(params.excursion),
      params.note || "",
      "", // Confirmation Emailed — filled in below if applicable
      "", // Reminder Sent — filled in later by sendReminderToAttendees
    ];

    sheet.appendRow(row);
    var rowIndex = sheet.getLastRow();

    // Only the primary submitter has an email address and represents the
    // whole party, so that's the only row that triggers a confirmation.
    if (SEND_CONFIRMATION_EMAIL && params.role === "primary" && params.email) {
      try {
        sendConfirmationEmail_(params);
        sheet.getRange(rowIndex, COLUMNS.length - 1).setValue("Yes");
      } catch (emailErr) {
        // Don't fail the whole submission just because the email didn't
        // send — the RSVP itself is already safely saved above.
        sheet.getRange(rowIndex, COLUMNS.length - 1).setValue("Failed: " + String(emailErr));
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you sanity-check the deployment URL by opening it in a browser —
// visiting it directly (GET) should show "RSVP endpoint is live."
function doGet(e) {
  return ContentService
    .createTextOutput("RSVP endpoint is live. Submissions are accepted via POST.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function getTargetSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (SHEET_NAME) {
    var named = ss.getSheetByName(SHEET_NAME);
    if (named) return named;
  }
  return ss.getSheets()[0];
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function formatAttending_(value) {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return value || "";
}

function formatExcursion_(value) {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  if (value === "unsure") return "Not sure";
  return value || "";
}

// =============================================================================
// EMAIL — auto-confirmation on submit
// =============================================================================
function sendConfirmationEmail_(params) {
  var attendingYes = params.attending === "yes";
  var firstName = params.firstName || "there";

  var subject = attendingYes
    ? "Your RSVP is in — see you in " + VENUE_LOCATION.split(",")[0] + "!"
    : "Thanks for letting us know";

  var lines = [];
  lines.push("Hi " + firstName + ",");
  lines.push("");
  if (attendingYes) {
    lines.push("Thanks for RSVPing — we can't wait to celebrate with you in " + VENUE_LOCATION + "!");
    lines.push("");
    lines.push("Here's what we've got on file for you:");
    lines.push("  Attending: Yes");
    if (params.nights) lines.push("  Nights at the resort: " + params.nights);
    if (params.excursion) lines.push("  Vung Tau day trip: " + formatExcursion_(params.excursion));
    lines.push("");
    lines.push("Flights, visas, packing, and the full schedule are all on the wedding website if you haven't already checked them out.");
  } else {
    lines.push("Thanks for letting us know — we'll miss you, but we totally understand.");
    lines.push("If anything changes, you're always welcome to update your RSVP or just reach out directly.");
  }
  lines.push("");
  lines.push("If anything above needs to change, text " + CONTACT_NAME + " at " + CONTACT_PHONE + " or just reply to this email.");
  lines.push("");
  lines.push(COUPLE_NAMES);

  MailApp.sendEmail({
    to: params.email,
    replyTo: REPLY_TO_EMAIL,
    subject: subject,
    body: lines.join("\n"),
  });
}

// =============================================================================
// EMAIL — manual reminder blast
// ---------------------------------------------------------------------------
// Run this yourself from the Apps Script editor (select this function from
// the dropdown at the top, then click Run) whenever you want to send an
// update to everyone who RSVP'd yes. It only emails each party's primary
// RSVP-er once per run of new/unsent reminders — the "Reminder Sent" column
// keeps track, so re-running this later (e.g. for a second reminder closer
// to the wedding) only reaches people who haven't gotten *this* reminder.
//
// To send a different message later, just edit REMINDER_SUBJECT and
// REMINDER_BODY below, then clear the "Reminder Sent" column in the sheet
// for whoever you want to re-send to.
// =============================================================================
var REMINDER_SUBJECT = "See you soon in " + "Ho Tram" + "! A few things before you go";
var REMINDER_BODY_INTRO =
  "Hi {firstName},\n\n" +
  "We're getting close! A couple of things as you finalize your travel plans:\n\n" +
  "TODO: fill in the reminder details you want to send — flight deadlines, " +
  "final headcount date, shuttle booking reminders, whatever's relevant right now.\n\n" +
  "Full details are always up to date on the wedding website.";

function sendReminderToAttendees() {
  if (!ENABLE_REMINDER_BLAST) {
    Logger.log("ENABLE_REMINDER_BLAST is false — set it to true to send reminders.");
    return;
  }

  var sheet = getTargetSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    Logger.log("No RSVP rows yet.");
    return;
  }

  var data = sheet.getRange(2, 1, lastRow - 1, COLUMNS.length).getValues();
  var roleCol = COLUMNS.indexOf("Role");
  var firstNameCol = COLUMNS.indexOf("First Name");
  var emailCol = COLUMNS.indexOf("Email");
  var attendingCol = COLUMNS.indexOf("Attending");
  var reminderSentCol = COLUMNS.indexOf("Reminder Sent");

  var sentCount = 0;
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var isPrimary = row[roleCol] === "primary";
    var email = row[emailCol];
    var attending = row[attendingCol];
    var alreadySent = row[reminderSentCol];

    if (!isPrimary || !email || attending !== "Yes" || alreadySent) continue;

    var body = REMINDER_BODY_INTRO.replace("{firstName}", row[firstNameCol] || "there") +
      "\n\n" +
      "Text " + CONTACT_NAME + " at " + CONTACT_PHONE + " with any questions.\n\n" +
      COUPLE_NAMES;

    MailApp.sendEmail({
      to: email,
      replyTo: REPLY_TO_EMAIL,
      subject: REMINDER_SUBJECT,
      body: body,
    });

    sheet.getRange(i + 2, reminderSentCol + 1).setValue(new Date());
    sentCount++;
  }

  Logger.log("Reminder sent to " + sentCount + " part" + (sentCount === 1 ? "y" : "ies") + ".");
}
