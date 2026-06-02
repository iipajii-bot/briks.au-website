// Stock images — locally hosted under /public/stock/.
// Source: Unsplash (https://unsplash.com/license — free for commercial use,
// no attribution required). Curated and downloaded on 2026-04-29.
//
// Each entry maps a usage key to a path. Add new keys as needed; if you swap
// an image, drop the new file at /public/stock/<key>.jpg and you're done.

export const IMAGES = {
  // Page banners
  aboutHero: '/stock/about-hero.jpg',
  aboutNetwork: '/stock/about-network.jpg',
  pricing: '/stock/pricing.jpg',
  howItWorks: '/stock/how-it-works.jpg',
  faq: '/stock/faq.jpg',
  contact: '/stock/contact.jpg',
  tradePartners: '/stock/trade-partners.jpg',

  // Categories
  maintenance: '/stock/maintenance.jpg',
  handyman: '/stock/handyman.jpg',
  emergency: '/stock/emergency.jpg',
  repair: '/stock/repair.jpg',

  // Renovation set
  renovations: '/stock/renovations.jpg',
  kitchen: '/stock/kitchen.jpg',
  bathroom: '/stock/bathroom.jpg',
  extension: '/stock/extension.jpg',
  fitout: '/stock/fitout.jpg',
  homeLiving: '/stock/home-living.jpg',

  // Trades
  plumbing: '/stock/plumbing.jpg',
  electrical: '/stock/electrical.jpg',
  carpentry: '/stock/carpentry.jpg',
  painting: '/stock/painting.jpg',
  tiling: '/stock/tiling.jpg',
  roofing: '/stock/roofing.jpg',
} as const

export type ImageKey = keyof typeof IMAGES
