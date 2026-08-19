// Central place for the links that vary by deployment.
// Update these two and the whole site follows.
export const ONBOARDING_APP_URL = "https://onbaording.abacusapps.us/";

// Square "Payment link" with "Allow buyer to set the price" switched on
// in the Square Dashboard (Payment Links > Create link > Collect a payment
// > Allow buyer to set the price). This lets a client pay any invoice
// amount, the same way the existing "Pay Filing Charge" link already works.
// Replace this placeholder with the real link once it's created in Square.
export const PAY_INVOICE_URL = "https://square.link/u/REPLACE-WITH-OPEN-AMOUNT-LINK";

// Existing fixed-amount filing charge link, carried over from the current site.
export const PAY_FILING_CHARGE_URL = "https://square.link/u/UWw0m3xb";

export const TIDE_URL = "https://www.tide.co/partners/abacus-consultancy/";

export const CONTACT = {
  email: "info@abacusconsultancy.co.uk",
  phone: "", // not published on current site — add if available
  addressLines: ["Abacus Consultancy", "Easthampstead Road", "Wokingham", "Berkshire"],
  facebook: "https://www.facebook.com/Abacus-Consultancy-186296288079393",
  lat: 51.4008945,
  lng: -0.8143552,
};
