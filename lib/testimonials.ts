// Real customer testimonials.
// Add ONLY with customer permission. Each entry produces a Review schema entry.

export type Testimonial = {
  id: string
  pullQuote: string // 1-sentence headline pulled from the body
  body: string // full testimonial
  author: string // first name + last initial
  role: string // 'Property Manager', 'Restaurant Owner', etc.
  suburb?: string
  audience: 'homeowners' | 'landlords' | 'property-managers' | 'businesses' | 'renovations'
  publishedAt: string // ISO date
  rating: number // 1-5
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah-m',
    pullQuote:
      'It’s rare to find a company you can genuinely trust to just take care of it, but Briks does exactly that.',
    body:
      'Briks Building Services has honestly made my life so much easier. Managing multiple properties usually means constantly chasing different tradies, following up quotes, organising access, and dealing with delays — but with Briks, it’s one phone call and everything is handled. The communication was exceptional from start to finish, and every tenant I dealt with commented on how professional and respectful the team was. The quality of the work was outstanding, completed on time, and without any stress on my end. It’s rare to find a company you can genuinely trust to just ‘take care of it,’ but Briks does exactly that.',
    author: 'Sarah M.',
    role: 'Property Manager',
    audience: 'property-managers',
    publishedAt: '2026-04-22',
    rating: 5,
  },
  {
    id: 'daniel-k',
    pullQuote:
      'Running a restaurant means you can’t afford downtime — Briks stepped in immediately, and the entire process was smooth, fast, and hassle-free.',
    body:
      'Running a restaurant means you can’t afford downtime, and when we needed urgent maintenance done, Briks Building Services stepped in immediately. I was expecting the usual headaches that come with organising trades, but instead the entire process was smooth, fast, and completely hassle-free. They coordinated everything for us, kept disruption to an absolute minimum, and the workmanship was flawless. The attention to detail and pride they take in their work really stood out. It felt like they genuinely cared about our business as much as we do. I couldn’t recommend them more highly.',
    author: 'Daniel K.',
    role: 'Restaurant Owner',
    audience: 'businesses',
    publishedAt: '2026-04-18',
    rating: 5,
  },
  {
    id: 'melissa-t',
    pullQuote:
      'Such a relief finding a company that actually delivers exactly what they promise.',
    body:
      'I only needed a few small repairs done around the house, but Briks treated the job with the same care and professionalism as if it was a major project. From the moment I called, everything felt effortless. No chasing people up, no confusion, no stress — they organised everything and kept me updated the whole way through. The team arrived on time, were incredibly friendly, and the quality of the work was honestly better than I expected. It’s such a relief finding a company that actually delivers exactly what they promise.',
    author: 'Melissa T.',
    role: 'Homeowner',
    audience: 'homeowners',
    publishedAt: '2026-04-12',
    rating: 5,
  },
  {
    id: 'james-olivia-r',
    pullQuote:
      'Walking into our renovated home for the first time honestly felt emotional. We still can’t fault a single part of the experience.',
    body:
      'We had been putting off renovating our home for years because we were terrified of the stress that usually comes with building work. Then we found Briks Building Services, and the experience completely changed our perception. They managed the entire process seamlessly — organising trades, keeping timelines moving, and making us feel informed and supported every step of the way. The craftsmanship and finishes were absolutely beautiful, and the final result exceeded what we had imagined. Walking into our renovated home for the first time honestly felt emotional. We still can’t fault a single part of the experience.',
    author: 'James & Olivia R.',
    role: 'Home Renovation',
    audience: 'renovations',
    publishedAt: '2026-04-05',
    rating: 5,
  },
  {
    id: 'priya-l',
    pullQuote:
      'After dealing with unreliable contractors for years, working with Briks was genuinely refreshing.',
    body:
      'After dealing with unreliable contractors for years, working with Briks Building Services was genuinely refreshing. They handled our office upgrade from start to finish with incredible professionalism and care. What impressed me most was how simple they made everything — one point of contact, clear communication, no delays, and absolutely no need for me to chase anyone. The quality of the work was exceptional, and the entire space now feels modern, polished, and professional. You can tell they take real pride in what they do, and that level of service is hard to find these days.',
    author: 'Priya L.',
    role: 'Commercial Office Owner',
    audience: 'businesses',
    publishedAt: '2026-03-28',
    rating: 5,
  },
]

// Schema-ready Review objects.
export const reviewSchemas = TESTIMONIALS.map((t) => ({
  '@type': 'Review',
  reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 },
  author: { '@type': 'Person', name: t.author },
  reviewBody: t.body,
  datePublished: t.publishedAt,
}))

// AggregateRating only emitted when there are 3+ testimonials with ratings.
export const aggregateRatingSchema =
  TESTIMONIALS.length >= 3
    ? {
        '@type': 'AggregateRating',
        ratingValue: (
          TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length
        ).toFixed(1),
        reviewCount: TESTIMONIALS.length,
        bestRating: 5,
      }
    : null
