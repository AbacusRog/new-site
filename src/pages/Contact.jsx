import { useState } from "react";
import { CONTACT } from "../siteConfig";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${form.name || "website visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <section className="page-hero on-ink">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Get in touch.</h1>
          <p className="page-hero-lede">
            Tell us a little about your business and we'll come back to you
            with a fixed-fee quote.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Name *</label>
              <input id="name" required value={form.name} onChange={update("name")} />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email *</label>
              <input id="email" type="email" required value={form.email} onChange={update("email")} />
            </div>
            <div className="form-row">
              <label htmlFor="message">How can we help? *</label>
              <textarea id="message" rows={5} required value={form.message} onChange={update("message")} />
            </div>
            <button type="submit" className="btn btn-brass">Send message</button>
            <p className="form-note">This opens your email app with your message ready to send to {CONTACT.email}.</p>
          </form>

          <div className="contact-details">
            <div className="contact-block">
              <span className="eyebrow">Address</span>
              {CONTACT.addressLines.map((l) => <p key={l} className="contact-line">{l}</p>)}
            </div>
            <div className="contact-block">
              <span className="eyebrow">Email</span>
              <p className="contact-line"><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
            </div>
            <div className="contact-block">
              <span className="eyebrow">Find us</span>
              <a
                className="map-link"
                href={`https://www.google.com/maps?q=${CONTACT.lat},${CONTACT.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
