// Official Millennium Bowl facts used by Millie. Source: millenniumbowllr.com and management (Nov 2026).
// Change a fact here and every answer, tool and button that uses it updates.

export const PHONE = '(501) 791-9150';
export const PHONE_TEL = 'tel:+15017919150';
export const PROSHOP_PHONE = '(501) 353-2749';
export const PROSHOP_TEL = 'tel:+15013532749';
export const EMAIL = 'info@millenniumbowllr.com';
export const ADDRESS = '7200 Counts Massie Rd, North Little Rock, AR 72113';
export const MAPS_URL = 'https://maps.google.com/?q=7200+Counts+Massie+Rd,+North+Little+Rock,+AR+72113';
export const ORDER_URL = 'https://millenniumbowl.square.site';
export const GIFT_URL = 'https://millenniumbowl.square.site/s/gift-cards';

export const HOURS_TEXT = 'Monday–Thursday 9 AM–12 AM, Friday–Saturday 9 AM–2 AM, Sunday 10 AM–12 AM';
export const KITCHEN_TEXT = 'until 11 PM on weekdays and until 1 AM on Friday and Saturday';

export const PARTY_PACKAGES = [
  { id: 'spare', name: 'Spare Package', price: 240, blurb: 'Lanes + bowling included, ideal for smaller groups' },
  { id: 'strike', name: 'Strike Package', price: 280, blurb: 'Lanes + bowling included, great for larger groups' },
] as const;

export const NOT_A_BOOKING =
  'This is a request, not a booking. Our team will contact you to confirm availability and details.';
