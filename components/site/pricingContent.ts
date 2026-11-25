import { FEE } from './fee'

/** Pricing rows for the agency and property-manager pages (owner pays the per-job line). */
export const AGENCY_PRICING = [
  { q: 'Tenant calls and phone help', a: 'Free. Plenty of problems are sorted on the phone or with our check-this-first guide.' },
  { q: 'Cost to the agency', a: 'Nothing. No subscription, no per-property fee and no lock-in.' },
  { q: 'When we send a trade', a: `A flat ${FEE.amount} ${FEE.gst} "${FEE.label}" line on our invoice for that job. It covers booking, access, updates, checking the work and the Friday report.` },
  { q: 'The repair itself', a: 'Priced on its own. Your property manager pays our invoice from the owner’s rent, like any contractor bill.' },
  { q: 'Over your approval limit', a: 'Quoted to you first. Nothing starts until you or the owner approve it.' },
] as const

export const AGENCY_COST_FAQ = {
  q: 'What does it cost?',
  a: `Nothing for the agency, and tenant calls and phone help are free. When a job needs a licensed trade sent, our invoice for that job includes a flat ${FEE.amount} ${FEE.gst} Briks maintenance desk fee, alongside the repair. Your property manager pays it from the owner’s rent like any contractor bill.`,
} as const

/** What an agency has to give us to start. */
export const START_NEEDS = [
  { title: 'Add Briks as a supplier', body: 'Two minutes in PropertyMe, PropertyTree, Reapit PM or whatever you use. Work orders then reach us by email, like any tradie.' },
  { title: 'One tenant contact list', body: 'An export of the tenant names, phone numbers and addresses for the portfolio we start with, so we know who is calling. Used only to arrange repairs.' },
  { title: 'Your approval limit and rules', body: 'The amount jobs can go ahead under, any preferred trades, and what you want for after-hours calls.' },
] as const
