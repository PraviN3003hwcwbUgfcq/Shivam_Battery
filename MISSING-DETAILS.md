# Details to confirm or add before launch

## Confirmed and already on the site
- Address: Boisar Road, Palghar West, Opp. Anand Convent School, Char Rasta, Palghar 401404 (Google Business Profile)
- Phone and WhatsApp: 070403 63960 (owner)
- Hours: 9:00 AM – 9:00 PM (owner)
- Services: battery replacement, free installation, old battery exchange (owner)
- Payment: EMI available, credit and debit cards accepted (shop's Google post, owner)
- Brands: all major brands (owner). Exide and Luminous are listed on Google.

## Still needed
1. **Open days**: are the 9 AM – 9 PM hours every day, including Sunday? Once known, add `days` in
   `business.hours` and opening hours can go into the structured data.
2. **School name spelling**: Google shows "Ananad Convent School". The site uses "Anand". Confirm.
3. **Brand list**: the site shows Exide, Amaron, Luminous, Livguard, SF Sonic, Tata Green and Microtek
   (`src/config/products.js`). Add or remove brands to match what the shop sells.
4. **Product models and prices**: every card currently shows a brand range with "Ask for Price".
   Add exact models, specs and prices where you want them shown.
5. **Product photos**: 15 of 16 cards use photos from the brands' official websites (one model from each
   range). SF Sonic's photo is from BatteryDekho (battery.cardekho.com), because the brand site only has
   tiny thumbnails. Check with your distributor that using brand photos is fine, or replace them with your
   own photos.
6. **Shop photos**: front of the shop, counter or stock, for the About page.
7. **Domain**: the final website address, for `business.siteUrl`.

## Left out on purpose
- Customer reviews: Google shows a 3.7 rating from 10 reviews. Reviews aren't shown because their exact
  wording hasn't been checked.
- Claims like "No. 1", "authorised dealer", "24/7" or guaranteed delivery.
- "Since 2000" (seen on a magicpin listing): not confirmed by the owner.
