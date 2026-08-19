import { useEffect, useState } from "react";

// Signature element: a four-rod abacus where each rod's beads slide
// into place to spell out 1-9-9-9 — the year the firm was established.
// Each rod holds 9 beads (soroban-style); the digit is how many beads
// have been slid toward the bar.
const DIGITS = [1, 9, 9, 9];
const BEADS_PER_ROD = 9;
const ROD_WIDTH = 250;
const BEAD_R = 9;
const GAP = (ROD_WIDTH - BEAD_R * 2) / (BEADS_PER_ROD - 1);

function Rod({ digit, delay, y }) {
  return (
    <g transform={`translate(0, ${y})`}>
      <line x1={0} y1={0} x2={ROD_WIDTH} y2={0} stroke="#8a6f34" strokeWidth="2" opacity="0.55" />
      {Array.from({ length: BEADS_PER_ROD }).map((_, i) => {
        const active = i < digit;
        const restX = i * GAP + BEAD_R;
        const activeX = i * (GAP * 0.62) + BEAD_R;
        return (
          <circle
            key={i}
            cx={restX}
            cy={0}
            r={BEAD_R}
            className={"abacus-bead" + (active ? " is-active" : "")}
            style={{
              "--shift": `${activeX - restX}px`,
              transitionDelay: `${delay + i * 35}ms`,
            }}
          />
        );
      })}
    </g>
  );
}

export default function AbacusYear() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 260);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={"abacus-year" + (ready ? " is-ready" : "")}>
      <svg viewBox="0 0 250 190" width="100%" role="img" aria-label="Abacus showing the year 1999">
        <rect x="-16" y="-20" width="282" height="228" rx="10" fill="#0c1522" />
        {DIGITS.map((d, i) => (
          <Rod key={i} digit={ready ? d : 0} delay={i * 220} y={20 + i * 48} />
        ))}
      </svg>
      <p className="abacus-caption">Est. 1999 — 25+ years balancing the books</p>
    </div>
  );
}
