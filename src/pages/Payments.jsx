import { PAY_INVOICE_URL, PAY_FILING_CHARGE_URL, TIDE_URL } from "../siteConfig";

export default function Payments() {
  return (
    <>
      <section className="page-hero on-ink">
        <div className="container">
          <span className="eyebrow">Payments &amp; bank accounts</span>
          <h1>Pay us, and bank with our partner.</h1>
          <p className="page-hero-lede">
            Pay any invoice securely online, settle a fixed filing charge, or
            open a business bank account through our partner Tide.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="payment-grid">
            <article className="payment-card payment-card-feature">
              <span className="tag">Any amount</span>
              <h2>Pay your invoice</h2>
              <p>
                Whatever we've quoted you, enter the amount and pay securely
                by card. This covers ad-hoc invoices, part payments and
                one-off fees of any size.
              </p>
              <a
                href={PAY_INVOICE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brass"
              >
                Pay your invoice
              </a>
              <p className="payment-note">Secure checkout powered by PayPal. You'll be asked to enter the amount before paying.</p>
            </article>

            <article className="payment-card">
              <span className="tag">Fixed fee</span>
              <h2>Pay filing charge</h2>
              <p>
                For the standard company filing charge. Use the link
                below to pay the fixed amount securely via PayPal.
              </p>
              <a
                href={PAY_FILING_CHARGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-ink"
              >
                Pay filing charge
              </a>
            </article>

            <article className="payment-card">
              <span className="tag">Business banking</span>
              <h2>Open a Tide business account</h2>
              <p>
                We partner with Tide to help clients open a business current
                account quickly, entirely online.
              </p>
              <a
                href={TIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-ink"
              >
                Open a Tide account
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="section on-ink steps-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Paying an invoice of any amount.</h2>
          </div>
          <ol className="steps-list">
            <li>
              <span className="steps-number">01</span>
              <div>
                <h3>Get your invoice</h3>
                <p>We send you an invoice by email with the amount due.</p>
              </div>
            </li>
            <li>
              <span className="steps-number">02</span>
              <div>
                <h3>Open the payment link</h3>
                <p>Click "Pay your invoice" above and enter the amount shown on your invoice.</p>
              </div>
            </li>
            <li>
              <span className="steps-number">03</span>
              <div>
                <h3>Pay securely by card</h3>
                <p>Checkout is handled by PayPal — we never see or store your card or account details.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
