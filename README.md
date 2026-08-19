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

1. **`PAY_INVOICE_URL`** — currently a placeholder. Create or confirm
   your link at [paypal.me](https://paypal.me) (sign in → set/check
   your PayPal.Me username), then copy the resulting
   `https://paypal.me/yourusername` URL in. The payer types in the
   amount themselves, so one link covers any invoice.
2. **`PAY_FILING_CHARGE_URL`** — also a placeholder now. PayPal.Me
   supports a fixed amount by adding it to the end of the same link,
   e.g. `https://paypal.me/yourusername/50` for a flat £50 charge.
   Use your PayPal.Me username plus the current filing charge amount.
3. **`ONBOARDING_APP_URL`** — already set to
   `https://onbaording.abacusapps.us/`. Update here if that domain
   changes.

`TIDE_URL` was carried over from the current site and doesn't need
changes unless that link changes.

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
