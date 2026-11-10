const APPLICATION_COLUMNS = [
  ["fullName", "Full name", 120],
  ["email", "Email", 254],
  ["phone", "Phone or WhatsApp", 32],
  ["country", "Country", 100],
  ["city", "City or town", 100],
  ["age", "Age", 3],
  ["occupation", "Occupation", 120],
  ["referral", "Referred by", 120],
  ["motivation", "Reason for joining", 1500],
];

function doPost(event) {
  let lock;
  try {
    const body = event && event.postData && event.postData.contents;
    if (typeof body !== "string" || body.length > 12000) return reply({ ok: false });

    const application = JSON.parse(body);
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty("MEMBERSHIP_SHEETS_SECRET");
    if (!expectedSecret || !matchesSecret(application.secret, expectedSecret)) return reply({ ok: false });
    if (typeof application.applicationId !== "string" ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(application.applicationId) ||
        application.privacyAcknowledged !== true || !application.values) return reply({ ok: false });

    const cells = APPLICATION_COLUMNS.map(([key, , limit]) => {
      const value = application.values[key];
      if (typeof value !== "string" || value.length > limit) throw new Error("Invalid field");
      return /^[=+\-@]/.test(value) ? "'" + value : value;
    });

    lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) return reply({ ok: false });

    const book = SpreadsheetApp.openById(properties.getProperty("MEMBERSHIP_SPREADSHEET_ID"));
    const tab = properties.getProperty("MEMBERSHIP_SHEET_TAB") || "Applications";
    const sheet = book.getSheetByName(tab) || book.insertSheet(tab);
    const headers = ["Application reference", "Submitted at (UTC)", ...APPLICATION_COLUMNS.map(([, label]) => label), "Privacy notice acknowledged"];
    const lastRow = sheet.getLastRow();

    if (lastRow === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    } else {
      const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
      if (!headers.every((header, index) => current[index] === header)) return reply({ ok: false });

      if (lastRow > 1 && sheet.getRange(2, 1, lastRow - 1, 1).createTextFinder(application.applicationId).matchEntireCell(true).findNext()) {
        return reply({ ok: true, applicationId: application.applicationId });
      }
    }

    sheet.getRange(Math.max(2, lastRow + 1), 1, 1, headers.length)
      .setNumberFormat("@")
      .setValues([[application.applicationId, new Date().toISOString(), ...cells, "Yes"]]);
    SpreadsheetApp.flush();
    return reply({ ok: true, applicationId: application.applicationId });
  } catch {
    return reply({ ok: false });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function matchesSecret(candidate, expected) {
  if (typeof candidate !== "string" || candidate.length !== expected.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index++) {
    difference |= candidate.charCodeAt(index) ^ expected.charCodeAt(index);
  }
  return difference === 0;
}

function reply(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
