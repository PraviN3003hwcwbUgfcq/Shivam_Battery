// Central business details. Every page reads from this file, so edit here only.
// Source: the shop's Google Business Profile and the owner (Nov 2026).

export const business = {
  name: 'Shivam Battery Sales & Service',
  shortName: 'Shivam Battery',

  phone: { display: '070403 63960', tel: '+917040363960' },

  // Country code + number, digits only (no "+", spaces or leading 0).
  whatsappNumber: '917040363960',

  address: {
    line1: 'Boisar Road, Palghar West',
    line2: 'Opp. Anand Convent School, Char Rasta',
    city: 'Palghar',
    state: 'Maharashtra',
    postalCode: '401404',
    country: 'IN',
  },

  // Shown on the site as written. Add `days` once confirmed, e.g. 'Mon – Sun'.
  hours: [{ days: 'Shop timings', time: '9:00 AM – 9:00 PM' }],

  // Shop's own Google post, confirmed by the owner.
  paymentNote: 'EMI available. Credit and debit cards accepted.',

  mapsQuery: 'Shivam Battery Sales & Service, Boisar Road, Char Rasta, Palghar, Maharashtra 401404',

  // Final domain, e.g. 'https://www.shivambattery.in'. Used for product links
  // in WhatsApp messages and structured data. Empty = current site address.
  siteUrl: '',

  // Real shop photos: put files in /public/images/shop and list them here.
  // e.g. { src: '/images/shop/front.jpg', alt: 'Shivam Battery shop front on Boisar Road' }
  shopPhotos: [],
}

export const mapsLinks = {
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.mapsQuery)}`,
  embed: `https://www.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&output=embed`,
}
