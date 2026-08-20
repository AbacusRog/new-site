# Abacus Consultancy — website

React + Vite rebuild of abacusconsultancy.co.uk, built to deploy on
Cloudflare Pages the same way as your other apps.

## Run locally

```
npm install
npm run dev
```

## Deploy

```
npm run build
```

This produces a `dist/` folder — upload/connect that the same way you
deploy the onboarding form and company register (Cloudflare Pages,
build command `npm run build`, output directory `dist`).

## Three links to double-check before you go live

Open `src/siteConfig.js` — everything site-specific lives there:

1. **`PAY_INVOICE_URL`** — currently a placeholder. In your Square
   Dashboard: **Payment links → Create link → Collect a payment →**
   toggle on **"Allow buyer to set the price"**. Payers check out as a
   guest with a card — no Square account needed. Copy the resulting
   `square.link/...` URL in.
2. **`PAY_FILING_CHARGE_URL`** — also a placeholder. Same process as
   above, but leave "Allow buyer to set the price" off and set the
   fixed filing charge amount instead.
3. **`ONBOARDING_APP_URL`** — already set to
   `https://onbaording.abacusapps.us/`. Update here if that domain
   changes.

`TIDE_URL` was carried over from the current site and doesn't need
changes unless that link changes.

## Email notification when a client pays

`functions/api/square-webhook.js` is a Cloudflare Pages Function —
it deploys automatically with the rest of the site (no separate
hosting) and listens at `/api/square-webhook`. Square calls it
whenever a payment happens; if the payment completed, it emails you
via Resend.

**Set these environment variables** in the Cloudflare Pages project
→ Settings → Environment variables (mark the last three "Encrypt"):

| Variable | Value |
|---|---|
| `SQUARE_WEBHOOK_URL` | the exact URL you register with Square below, e.g. `https://abacusconsultancy.co.uk/api/square-webhook` |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | shown by Square when you create the webhook subscription (next step) |
| `RESEND_API_KEY` | your Resend API key |
| `RESEND_FROM` | a sender address on a domain verified in Resend, e.g. `notifications@abacusconsultancy.co.uk` |
| `NOTIFY_EMAIL` | the address that should receive the "client paid" email |

**Then in Square:** Dashboard → **Developer** → **Webhooks** →
**Add endpoint**. URL: the same one you put in `SQUARE_WEBHOOK_URL`
above. Subscribe to the **`payment.updated`** event. Square will show
you a **Signature Key** — that's the value for
`SQUARE_WEBHOOK_SIGNATURE_KEY`.

This fires for any completed payment on your Square account — so both
the "pay any amount" invoice link and the fixed filing charge link
will trigger the same notification email.

## What's on the site

- **Home** — hero, fee-guarantee banner, services preview, testimonial,
  and a two-up "pay an invoice" / "start onboarding" call-to-action band.
- **Services** — full service list and what's included, from the
  current site's content.
- **Payments** — the new "pay any amount" button, the existing filing
  charge link, and the Tide partner link.
- **Contact** — address/email plus a simple enquiry form that opens
  the visitor's email client (no backend — there's nowhere for form
  data to be silently lost, but it also doesn't log submissions
  anywhere; say if you'd rather wire it to a proper form backend).

Note: the old site's "News" page had no content to carry over, so it's
not included in the new nav — easy to add back as a page if you want one.
