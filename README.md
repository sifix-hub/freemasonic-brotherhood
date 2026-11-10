# Freemasonic Brotherhood

A responsive recreation of https://joinfreemason.co.uk/ using Next.js App Router, TypeScript, a dark charcoal and forest-green theme with copper accents, and the original photographs.

## Run locally

Use Node.js 20.9 or newer. The project pins Next.js 16.4.6.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000/apply/. The form is also linked from **How to Join** and **Join Now**.

## Connect Google Sheets

1. Create a private Google Sheet or open the one the membership team will use. Copy the spreadsheet ID from the URL between `/d/` and `/edit`.
2. Open **Extensions → Apps Script** in that spreadsheet. Paste the contents of [Code.gs](integrations/google-sheets/Code.gs) into the editor and save.
3. Generate a random secret, for example with `openssl rand -hex 32`. In Apps Script, open **Project Settings → Script properties** and add:

   | Property | Value |
   | --- | --- |
   | `MEMBERSHIP_SPREADSHEET_ID` | The spreadsheet ID from step 1 |
   | `MEMBERSHIP_SHEETS_SECRET` | Your random secret |
   | `MEMBERSHIP_SHEET_TAB` | Optional. Defaults to `Applications`. Choose a new or empty tab. |

4. Choose **Deploy → New deployment → Web app**. Set **Execute as** to **Me** and **Who has access** to **Anyone**, then authorise and deploy. This access setting applies to the script endpoint. The spreadsheet itself stays private, and the script requires the shared secret for every write. If the Workspace administrator has disabled anonymous web apps, contact the administrator before using this setup.
5. Put the deployment URL ending in `/exec` into `MEMBERSHIP_SHEETS_URL` in `.env.local`. Put the same random secret from step 3 into `MEMBERSHIP_SHEETS_SECRET`. Configure these variables in the hosting environment for production. Keep both server-side.
6. Restart the server and submit a test application using fictional details. Confirm that the success reference matches the first column of the new row in the **Applications** tab. The script creates the tab and headers on the first successful submission. It reuses the same reference if the form retries an unconfirmed submission without edits.

[Google Apps Script web app documentation](https://developers.google.com/apps-script/guides/web)

## Build and deploy

```sh
npm run build
npm run typecheck
npm start
```

Deploy to a Next.js-capable host that runs the server route at `/api/membership/`. The form needs that server route to reach Google Sheets. For hosting panels, use a Node.js app rather than uploading a static export.

## Project layout

- **src/app/** contains routes, page metadata, the shared layout and design tokens.
- **src/app/api/membership/** contains the server endpoint that receives applications.
- **src/components/** contains reusable navigation, layouts, and interactive features.
- **src/lib/membership.ts** contains the field definitions and validation shared by the form and server.
- **integrations/google-sheets/** contains the Apps Script that records applications.
- **src/content/** contains navigation, photography, editorial pages and journal articles.
- **public/** contains static files.

`NEXT_PUBLIC_LODGE_EMAIL` is the optional organisation contact email displayed on the contact page. Sign-in, verification, and donation checkout require separate integrations.

By default, images load from the reference site. To serve authorised local copies, place the files listed in **src/content/site.ts** in **public/images/** and set `NEXT_PUBLIC_IMAGE_BASE=/images`. Headings use Georgia and body text uses Jost from Google Fonts, with system fallbacks.
