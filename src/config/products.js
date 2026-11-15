// Product catalogue. Edit this file to add, remove or update products.
//
// Rules:
// - Only add models, specs, prices and warranties confirmed by the shop.
// - price: a number in rupees (e.g. 5499), or null to show "Ask for Price".
// - image: a real photo in /public/images/products (e.g. '/images/products/exide-car.webp').
//   Leave null to use the built-in illustration.
// - model: exact model name once confirmed, otherwise null.

// image: photo shown on the "Shop by category" tiles.
export const categories = [
  {
    id: 'car',
    image: '/images/products/exide-car.webp',
    name: 'Car Batteries',
    icon: 'car',
    art: 'car',
    artLabel: 'a car battery',
    blurb: 'For hatchbacks, sedans, SUVs and MUVs.',
    placeholder: 'e.g. Maruti Swift petrol, 2019',
  },
  {
    id: 'bike',
    image: '/images/products/amaron-bike.webp',
    name: 'Bike Batteries',
    icon: 'bike',
    art: 'bike',
    artLabel: 'a bike battery',
    blurb: 'For motorcycles and scooters.',
    placeholder: 'e.g. Honda Activa 6G',
  },
  {
    id: 'truck',
    image: '/images/products/amaron-truck.webp',
    name: 'Truck Batteries',
    icon: 'truck',
    art: 'truck',
    artLabel: 'a truck battery',
    blurb: 'For trucks, tempos, buses and tractors.',
    placeholder: 'e.g. Tata 407 tempo',
  },
  {
    id: 'inverter-battery',
    image: '/images/products/luminous-inverter-battery.webp',
    name: 'Inverter Batteries',
    icon: 'battery',
    art: 'tubular',
    artLabel: 'a tubular inverter battery',
    blurb: 'Backup batteries for homes and shops.',
    placeholder: 'e.g. 900VA inverter, 4 hours backup',
  },
  {
    id: 'inverter-ups',
    image: '/images/products/microtek-inverter-ups.webp',
    name: 'Inverters & UPS',
    icon: 'home',
    art: 'inverter',
    artLabel: 'a home inverter',
    blurb: 'Power backup units for homes and offices.',
    placeholder: 'e.g. 2BHK flat: 4 fans, 6 lights, TV',
  },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]))

// The shop deals in all major brands. Exide and Luminous are listed on its
// Google profile; add or remove brands here.
export const brands = ['Exide', 'Amaron', 'Luminous', 'Livguard', 'SF Sonic', 'Tata Green', 'Microtek']

const warranty = { label: 'Warranty', value: 'As per brand terms. Ask the shop.' }

const defaults = {
  car: {
    summary: (b) => `${b} batteries for cars. Share your car model and the shop will confirm the right fit.`,
    specs: [
      { label: 'Fits', value: 'Hatchbacks, sedans, SUVs and MUVs' },
      { label: 'Selection', value: 'Matched to your car model and fuel type' },
      warranty,
    ],
  },
  bike: {
    summary: (b) => `${b} batteries for motorcycles and scooters, matched to your bike model.`,
    specs: [
      { label: 'Fits', value: 'Motorcycles and scooters' },
      { label: 'Selection', value: 'Matched to your bike model' },
      warranty,
    ],
  },
  truck: {
    summary: (b) => `${b} heavy-duty batteries for commercial vehicles and farm equipment.`,
    specs: [
      { label: 'Fits', value: 'Trucks, tempos, buses and tractors' },
      { label: 'Selection', value: 'Matched to your vehicle and daily use' },
      warranty,
    ],
  },
  'inverter-battery': {
    summary: (b) => `${b} inverter batteries for home and shop backup.`,
    specs: [
      { label: 'Use', value: 'Home and shop power backup' },
      { label: 'Selection', value: 'Based on inverter capacity and backup hours' },
      warranty,
    ],
  },
  'inverter-ups': {
    summary: (b) => `${b} inverters and UPS units, sized to the appliances you want to run.`,
    specs: [
      { label: 'Use', value: 'Homes, shops and offices' },
      { label: 'Selection', value: 'Based on your load: fans, lights, TV and more' },
      warranty,
    ],
  },
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

function range(brand, category, extra = {}) {
  const d = defaults[category]
  return {
    id: `${slug(brand)}-${category}`,
    brand,
    category,
    name: `${brand} ${categoryById[category].name}`,
    model: null,
    price: null,
    image: null,
    featured: false,
    summary: d.summary(brand),
    specs: d.specs,
    ...extra,
  }
}

// To add a confirmed model:
// range('Exide', 'car', { model: 'MODEL NAME', price: 5499,
//   image: '/images/products/exide-model.webp',
//   specs: [{ label: 'Capacity', value: '35Ah' }] }),
//
// Photos come from each brand's official website and show one model from the range.
// SF Sonic's photo is from BatteryDekho (battery.cardekho.com); the brand site only has tiny thumbnails.
const photo = (file) => `/images/products/${file}.webp`

export const products = [
  range('Exide', 'car', { featured: true, image: photo('exide-car') }),
  range('Amaron', 'car', { featured: true, image: photo('amaron-car') }),
  range('SF Sonic', 'car', { image: photo('sf-sonic-car') }),
  range('Livguard', 'car', { image: photo('livguard-car') }),
  range('Tata Green', 'car', { image: photo('tata-green-car') }),

  range('Exide', 'bike', { featured: true, image: photo('exide-bike') }),
  range('Amaron', 'bike', { image: photo('amaron-bike') }),

  range('Exide', 'truck', { image: photo('exide-truck') }),
  range('Amaron', 'truck', { featured: true, image: photo('amaron-truck') }),

  range('Luminous', 'inverter-battery', { featured: true, image: photo('luminous-inverter-battery') }),
  range('Exide', 'inverter-battery', { image: photo('exide-inverter-battery') }),
  range('Amaron', 'inverter-battery', { image: photo('amaron-inverter-battery') }),
  range('Livguard', 'inverter-battery', { image: photo('livguard-inverter-battery') }),

  range('Luminous', 'inverter-ups', { featured: true, image: photo('luminous-inverter-ups') }),
  range('Microtek', 'inverter-ups', { image: photo('microtek-inverter-ups') }),
  range('Livguard', 'inverter-ups', { image: photo('livguard-inverter-ups') }),
]
