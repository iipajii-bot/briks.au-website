/** How approvals work (agency and property-manager pages). No fees or pricing are published. */
export const APPROVALS = [
  { q: 'Routine repairs', a: 'Jobs under the approval limit you set go ahead straight away and appear on your Friday report with photos.' },
  { q: 'Bigger jobs', a: 'We email you the quote with photos and the scope, then call you the same day so it does not sit in your inbox.' },
  { q: 'Your written approval', a: 'Work starts only once you reply to the quote email with your approval. No approval, no work.' },
  { q: 'Who decides', a: 'You and the owner, as you do now. We never contact owners without your written permission.' },
  { q: 'When it is done', a: 'Before and after photos and one invoice for each job.' },
] as const

export const APPROVAL_FAQ = {
  q: 'Who approves the work?',
  a: 'You do. Routine repairs under the approval limit you set go ahead straight away and appear on your Friday report. For anything bigger we email you the quote with photos and call you the same day; nothing starts until you approve it in writing.',
} as const

/** What an agency has to give us to start. */
export const START_NEEDS = [
  { title: 'Add Briks as a supplier', body: 'Two minutes in PropertyMe, PropertyTree, Reapit PM or whatever you use. Work orders then reach us by email, like any tradie.' },
  { title: 'One tenant contact list', body: 'An export of the tenant names, phone numbers and addresses for the portfolio we start with, so we know who is calling. Used only to arrange repairs.' },
  { title: 'Your approval limit and rules', body: 'The amount routine jobs can go ahead under, any preferred trades, and what you want for after-hours calls.' },
] as const
