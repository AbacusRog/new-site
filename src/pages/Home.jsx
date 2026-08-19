import { Link } from "react-router-dom";
import AbacusYear from "../components/AbacusYear";
import { ONBOARDING_APP_URL, PAY_INVOICE_URL } from "../siteConfig";

const SERVICE_PREVIEW = [
  "Bookkeeping & accounting systems",
  "Taxation & tax planning",
  "Management accounting",
  "Business start-ups",
  "Payroll services",
  "Accounts preparation",
  "Cash & profit forecasting",
  "Company formations",
  "QuickBooks & Sage training",
  "VAT & PAYE",
  "Rental income statements",
  "Construction Industry Scheme",
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero on-ink">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Chartered-style accountancy · Wokingham, Berkshire</span>
            <h1>
              Professional, affordable<br />and reliable accountancy.
            </h1>
            <p className="hero-lede">
              We handle the books, the returns and the deadlines for self-employed
              traders, partnerships, limited companies and the construction
              industry — so you get your time back to run the business.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-brass">Get a fixed-fee quote</Link>
              <a
                href={ONBOARDING_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-cream"
              >
                Start client onboarding
              </a>
            </div>
            <p className="hero-fineprint">
              Already have an accountant? Show us last year's invoice and we'll
              guarantee to beat it by up to 25%.
            </p>
          </div>
          <div className="hero-visual">
            <AbacusYear />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div className="container trust-strip-inner">
          <div className="trust-item">
            <span className="trust-figure">1999</span>
            <span className="trust-label">Established</span>
          </div>
          <hr className="trust-divider" />
          <div className="trust-item">
            <span className="trust-figure">Fixed</span>
            <span className="trust-label">Fees, agreed in advance</span>
          </div>
          <hr className="trust-divider" />
          <div className="trust-item">
            <span className="trust-figure">25%</span>
            <span className="trust-label">Fee-beat guarantee</span>
          </div>
          <hr className="trust-divider" />
          <div className="trust-item">
            <span className="trust-figure">4</span>
            <span className="trust-label">Client types: sole trader, partnership, ltd, CIS</span>
          </div>
        </div>
      </section>

      {/* FEE PHILOSOPHY */}
      <section className="section">
        <div className="container split-block">
          <div className="split-copy">
            <span className="eyebrow">How we charge</span>
            <h2>A fixed price, agreed before we start.</h2>
            <p>
              You only pay for the accountancy you want — and you agree it in
              advance. No extra charges for letters, no extra charges for phone
              calls, and no extra charges for additional work unless you agree
              it first, after it's been fully explained.
            </p>
            <p>
              Every client is dealt with personally, by professionally
              qualified accountants who take the time to understand your
              business before quoting.
            </p>
            <Link to="/services" className="btn btn-outline-ink">See what's included</Link>
          </div>
          <div className="split-card">
            <span className="eyebrow">Switching accountants?</span>
            <h3>We'll beat your current fee.</h3>
            <p>
              Send us your previous year's accountancy invoice and we'll
              reduce your quote by up to 25% — for the same standard of
              personal service.
            </p>
            <Link to="/contact" className="btn btn-brass btn-full">Request a comparison</Link>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section on-ink services-preview">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we cover</span>
            <h2>The full range of accountancy services.</h2>
            <p>For every self-employed trader, partnership, limited company and construction industry business.</p>
          </div>
          <ul className="tag-grid">
            {SERVICE_PREVIEW.map((s) => (
              <li key={s} className="tag-grid-item">{s}</li>
            ))}
          </ul>
          <Link to="/services" className="btn btn-outline-cream" style={{ marginTop: 36 }}>
            View full services list
          </Link>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section testimonial-section">
        <div className="container">
          <blockquote className="testimonial">
            <p>
              "Tax returns, quarterly VAT, corporation tax and self assessment
              — the headache has been taken away and left to the experts,
              allowing me time to focus on running my company."
            </p>
            <footer>Sandra Birchmore — TKH</footer>
          </blockquote>
        </div>
      </section>

      {/* PAY + ONBOARD CTA */}
      <section className="section cta-band">
        <div className="container cta-band-grid">
          <div className="cta-card">
            <span className="eyebrow">Existing clients</span>
            <h3>Pay an invoice, any amount.</h3>
            <p>Settle your invoice securely online — enter the amount you've been quoted and pay by card.</p>
            <a href={PAY_INVOICE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-brass">
              Pay your invoice
            </a>
          </div>
          <div className="cta-card">
            <span className="eyebrow">New clients</span>
            <h3>Start your onboarding.</h3>
            <p>Complete our secure onboarding form with your details and documents, and we'll take it from there.</p>
            <a href={ONBOARDING_APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-ink">
              Start onboarding
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
