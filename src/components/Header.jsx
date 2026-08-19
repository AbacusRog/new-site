import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ONBOARDING_APP_URL } from "../siteConfig";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/payments", label: "Payments" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <header className="header">
      <div className="header-bar container">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#101A2C" />
            <line x1="14" y1="18" x2="50" y2="18" stroke="#C9A24B" strokeWidth="2.5" />
            <line x1="14" y1="32" x2="50" y2="32" stroke="#C9A24B" strokeWidth="2.5" />
            <line x1="14" y1="46" x2="50" y2="46" stroke="#C9A24B" strokeWidth="2.5" />
            <circle cx="24" cy="18" r="5" fill="#F1EADA" />
            <circle cx="38" cy="18" r="5" fill="#F1EADA" />
            <circle cx="30" cy="32" r="5" fill="#F1EADA" />
            <circle cx="44" cy="32" r="5" fill="#F1EADA" />
            <circle cx="20" cy="46" r="5" fill="#F1EADA" />
            <circle cx="34" cy="46" r="5" fill="#F1EADA" />
          </svg>
          <span className="brand-text">
            <strong>Abacus</strong>
            <em>Consultancy</em>
          </span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => "nav-link" + (isActive ? " is-active" : "")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-cta">
          <a
            className="btn btn-brass"
            href={ONBOARDING_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            New client? Start onboarding
          </a>
        </div>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="nav-mobile" role="dialog" aria-label="Menu">
          <nav aria-label="Primary mobile">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className="nav-mobile-link"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <a
            className="btn btn-brass btn-full"
            href={ONBOARDING_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            New client? Start onboarding
          </a>
        </div>
      )}
    </header>
  );
}
