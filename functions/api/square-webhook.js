// Cloudflare Pages Function.
// Route: POST /api/square-webhook
//
// Square calls this URL whenever a payment event happens (configured in
// Square Dashboard > Developer > Webhooks). We verify the request really
// came from Square, and if a payment has just completed, email a
// notification via Resend.
//
// Required environment variables (set in Cloudflare Pages project settings
// > Settings > Environment variables — use "Encrypt" for the secrets):
//   SQUARE_WEBHOOK_SIGNATURE_KEY  — from the Square webhook subscription
//   SQUARE_WEBHOOK_URL            — the exact URL you registered with Square
//                                    (Square signs against this exact string,
//                                    e.g. https://abacusconsultancy.co.uk/api/square-webhook)
//   RESEND_API_KEY                — your Resend API key
//   RESEND_FROM                   — a sender address on a domain verified in Resend
//                                    (e.g. notifications@abacusconsultancy.co.uk)
//   NOTIFY_EMAIL                  — the address that should receive the "client paid" email

export async function onRequestPost(context) {
  const { request, env } = context;
  const bodyText = await request.text();

  const signatureHeader = (request.headers.get("x-square-hmacsha256-signature") || "").trim();
  const signatureUrl = (env.SQUARE_WEBHOOK_URL || "").trim();
  const signatureKey = (env.SQUARE_WEBHOOK_SIGNATURE_KEY || "").trim();

  if (!signatureKey || !signatureUrl) {
    return new Response("Webhook not configured", { status: 500 });
  }

  const computed = await computeSquareSignature(signatureKey, signatureUrl, bodyText);
  const valid = computed === signatureHeader;

  // Temporary diagnostics — safe to leave in short-term (no secrets logged,
  // just lengths/prefixes to spot a copy-paste mismatch), remove once
  // webhooks are confirmed working.
  console.log("square-webhook debug", {
    valid,
    urlUsed: signatureUrl,
    urlLength: signatureUrl.length,
    keyLength: signatureKey.length,
    receivedSigPrefix: signatureHeader.slice(0, 12),
    computedSigPrefix: computed.slice(0, 12),
  });

  if (!valid) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(bodyText);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const payment = event?.data?.object?.payment;

  // Only notify once a payment has actually completed (avoids duplicate
  // emails for the same payment moving through earlier statuses).
  if (event?.type === "payment.updated" && payment?.status === "COMPLETED") {
    console.log("square-webhook notifying", { paymentId: payment?.id, status: payment?.status });
    await notify(env, payment);
  } else {
    console.log("square-webhook skipped notify", { type: event?.type, status: payment?.status });
  }

  // Always 200 so Square doesn't retry — we've handled (or intentionally
  // ignored) the event.
  return new Response("ok", { status: 200 });
}

async function computeSquareSignature(signatureKey, url, body) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(signatureKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(url + body));
  return btoa(String.fromCharCode(...new Uint8Array(mac)));
}

async function notify(env, payment) {
  const amountMinor = payment?.amount_money?.amount ?? null;
  const currency = payment?.amount_money?.currency ?? "GBP";
  const amount = amountMinor !== null ? (amountMinor / 100).toFixed(2) : "unknown";
  const payerEmail = payment?.buyer_email_address || "not provided";
  const receiptUrl = payment?.receipt_url || "";
  const paymentId = payment?.id || "unknown";

  const html = `
    <p>A client payment has come through Square.</p>
    <ul>
      <li><strong>Amount:</strong> ${currency} ${amount}</li>
      <li><strong>Payer email:</strong> ${payerEmail}</li>
      <li><strong>Payment ID:</strong> ${paymentId}</li>
      ${receiptUrl ? `<li><strong>Receipt:</strong> <a href="${receiptUrl}">${receiptUrl}</a></li>` : ""}
    </ul>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: env.NOTIFY_EMAIL,
      subject: `Payment received: ${currency} ${amount}`,
      html,
    }),
  }).then(async (res) => {
    const resBody = await res.text();
    console.log("resend response", { status: res.status, body: resBody });
  }).catch((err) => {
    console.log("resend fetch error", { message: String(err) });
  });
}
