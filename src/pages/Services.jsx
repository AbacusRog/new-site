import { Link } from "react-router-dom";

const SERVICES = [
  "Book keeping & accounting systems",
  "Taxation",
  "Management accounting",
  "Business start-ups",
  "Payroll services",
  "Accounts preparation",
  "Cash & profit forecasting",
  "Company formations",
  "QuickBooks & Sage training",
  "VAT",
  "PAYE",
  "Rental income statements",
];

const INCLUDED = [
  "Undertake year-end audit adjustments, provisions, prepayments, accruals, reconciliations and verification of all control accounts",
  "Prepare annual statutory abbreviated accounts, or full accounts if required",
  "Attend a meeting with company directors to discuss and approve annual accounts",
  "Prepare tax computations and the corporation tax return, CT600",
  "Tax planning",
  "Register your company for online filing with HMRC and Companies House, and ensure your accounts department is registered for PAYE and VAT online filing",
  "File accounts with HMRC and Companies House, and seek approval",
  "Help and advice given throughout the year",
];

const FREE_INCLUDED = [
  "Registered office address",
  "Company secretarial services",
  "Mail forwarding (postage and envelopes to be supplied)",
  "Correspondence, phone calls and emails",
  "Filing of any company statutory forms",
];

const DIRECTOR_EXTRAS = [
  "Preparation of personal self-assessment returns",
  "Personal tax planning and advice",
];

export default function Services() {
  return (
    <>
      <section className="page-hero on-ink">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>The service you want — personal and individual.</h1>
          <p className="page-hero-lede">
            Personal attention and good old-fashioned value for money are two
            big advantages for our clients. You get the local, personal
            service you want, priced competitively — the reassurance of our
            expertise, at no extra cost.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Full range</span>
            <h2>For the self-employed, partnerships, limited companies and the construction industry.</h2>
          </div>
          <ul className="service-grid">
            {SERVICES.map((s) => (
              <li key={s} className="service-card">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <hr className="rule container-rule" />

      <section className="section">
        <div className="container split-block">
          <div className="split-copy">
            <span className="eyebrow">Pricing philosophy</span>
            <h2>A fixed price, agreed in advance.</h2>
            <p>
              Because you need to know what your costs are, we always agree
              our fees before we start. Use our service as much or as little
              as you want, always knowing your fees are agreed up front.
            </p>
            <p>
              Every client is dealt with by us personally. No extra charges
              for letters, no extra charges for phone calls, and no extra
              charges for additional work unless you agree it first — after
              it has been fully explained. Your needs come first.
            </p>
          </div>
          <div className="split-card">
            <span className="eyebrow">Ready to start?</span>
            <h3>Get your fixed-fee quote.</h3>
            <p>Tell us about your business and we'll agree a price before any work begins.</p>
            <Link to="/contact" className="btn btn-brass btn-full">Get in touch</Link>
          </div>
        </div>
      </section>

      <section className="section on-ink included-section">
        <div className="container included-grid">
          <div>
            <span className="eyebrow">What's included</span>
            <h2>Every engagement covers:</h2>
            <ul className="check-list">
              {INCLUDED.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
          <div>
            <span className="eyebrow">Free of charge</span>
            <h2>We also include, at no cost:</h2>
            <ul className="check-list">
              {FREE_INCLUDED.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <h3 className="included-subhead">For company directors, we also undertake:</h3>
            <ul className="check-list">
              {DIRECTOR_EXTRAS.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
