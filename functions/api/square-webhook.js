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

  const signatureHeader = request.headers.get("x-square-hmacsha256-signature") || "";
  const signatureUrl = env.SQUARE_WEBHOOK_URL;

  if (!env.SQUARE_WEBHOOK_SIGNATURE_KEY || !signatureUrl) {
    return new Response("Webhook not configured", { status: 500 });
  }

  const valid = await verifySquareSignature(
    env.SQUARE_WEBHOOK_SIGNATURE_KEY,
    signatureUrl,
    bodyText,
    signatureHeader
  );

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
    await notify(env, payment);
  }

  // Always 200 so Square doesn't retry — we've handled (or intentionally
  // ignored) the event.
  return new Response("ok", { status: 200 });
}

async function verifySquareSignature(signatureKey, url, body, signatureHeader) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(signatureKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(url + body));
  const computed = btoa(String.fromCharCode(...new Uint8Array(mac)));
  return computed === signatureHeader;
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
  });
}
