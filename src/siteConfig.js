// Central place for the links that vary by deployment.
// Update these two and the whole site follows.
export const ONBOARDING_APP_URL = "https://onbaording.abacusapps.us/";

// Square "Payment link" with "Allow buyer to set the price" switched on
// in the Square Dashboard (Payment Links > Create link > Collect a payment
// > Allow buyer to set the price). Payers check out as a guest with a
// card — no Square account needed. Replace this placeholder with the
// real link once it's created in Square.
export const PAY_INVOICE_URL = "https://square.link/u/REPLACE-WITH-OPEN-AMOUNT-LINK";

// Fixed-amount filing charge, also a Square Payment Link (same as above,
// just with "Allow buyer to set the price" left off and a fixed amount set).
export const PAY_FILING_CHARGE_URL = "https://square.link/u/REPLACE-WITH-FIXED-AMOUNT-LINK";

export const TIDE_URL = "https://www.tide.co/partners/abacus-consultancy/";

export const CONTACT = {
  email: "info@abacusconsultancy.co.uk",
  phone: "", // not published on current site — add if available
  addressLines: ["Abacus Consultancy", "Easthampstead Road", "Wokingham", "Berkshire"],
  facebook: "https://www.facebook.com/Abacus-Consultancy-186296288079393",
  lat: 51.4008945,
  lng: -0.8143552,
};
