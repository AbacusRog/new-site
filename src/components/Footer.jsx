import { Link } from "react-router-dom";
import { CONTACT, ONBOARDING_APP_URL } from "../siteConfig";

export default function Footer() {
  return (
    <footer className="footer on-ink">
      <div className="container footer-grid">
        <div>
          <span className="brand-text on-ink">
            <strong>Abacus</strong>
            <em>Consultancy</em>
          </span>
          <p className="footer-tag">
            Professional, affordable and reliable accountancy — Wokingham, Berkshire, since 1999.
          </p>
        </div>

        <div>
          <h4 className="footer-heading">Firm</h4>
          <ul className="footer-list">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/payments">Payments &amp; bank accounts</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href={ONBOARDING_APP_URL} target="_blank" rel="noopener noreferrer">Client onboarding</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Get in touch</h4>
          <ul className="footer-list">
            {CONTACT.addressLines.map((line) => <li key={line}>{line}</li>)}
            <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <hr className="rule on-ink" />
        <div className="footer-bottom-row">
          <span>&copy; {new Date().getFullYear()} Abacus Consultancy. All rights reserved.</span>
          <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </footer>
  );
}
