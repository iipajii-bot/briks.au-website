/**
 * Homepage copy that is also used in structured data (FAQPage, HowTo-style steps).
 * Keep every claim here true and checkable: no 24/7, no response guarantees,
 * no licence claim for Briks itself, no prices or fees.
 */

export const STEPS = [
  {
    title: 'The tenant reports it',
    body: 'Tenants call, text or email one Briks number, so repair calls stop landing on your property managers.',
  },
  {
    title: 'We work out how urgent it is',
    body: 'Emergency, urgent or routine. Emergencies get a make-safe first; routine jobs are booked in order.',
  },
  {
    title: 'We book a licensed trade and the access',
    body: 'The right licensed trade for the job, a time that suits the tenant, and updates to the tenant along the way.',
  },
  {
    title: 'We check the work',
    body: 'We review the trade\u2019s photos and invoice against the job before it is closed.',
  },
  {
    title: 'You get the Friday report',
    body: 'Every job that week in one email: what broke, who fixed it, photos, and anything waiting on your approval.',
  },
] as const

export const CHANGES = [
  'Tenant repair calls go to Briks, not your property managers.',
  'No more booking trades, chasing them or relaying updates.',
  'One report on Friday instead of a week of messages.',
] as const

export const STAYS = [
  'Your owners and your relationship with them.',
  'Your approval limit. Anything over it is quoted to you first.',
  'Your preferred trades, if you have them. They work through us.',
] as const

export const APPROVALS = [
  { q: 'Routine repairs', a: 'Under the limit you set, they go ahead and appear on the Friday report with photos.' },
  { q: 'Bigger jobs', a: 'We email you the quote with photos, then call you the same day.' },
  { q: 'Your written approval', a: 'Work starts only once you approve the quote by email. No approval, no work.' },
  { q: 'Your owners', a: 'Stay with you. We never contact them without your written permission.' },
] as const

export const FAQS = [
  {
    q: 'What is an outsourced maintenance desk for a real estate agency?',
    a: 'It is a service that takes tenant repair requests off property managers. Tenants contact the desk directly. The desk works out how urgent each job is, books a licensed trade, arranges access, keeps the tenant and property manager updated and checks the finished work. The agency keeps its owners and its approval limits.',
  },
  {
    q: 'Who approves the work?',
    a: 'You do. Routine repairs under the approval limit you set go ahead straight away and appear on your Friday report. For anything bigger we email you the quote with photos and call you the same day; nothing starts until you approve it in writing.',
  },
  {
    q: 'What happens when a repair is over our approval limit?',
    a: 'We send you a quote first. Nothing goes ahead until you or the owner approve it. Jobs under your limit go ahead and appear on the Friday report.',
  },
  {
    q: 'Can we keep using our own trades?',
    a: 'Yes. Your preferred trades can come on board and work through Briks, so you still get one point of contact and the same report.',
  },
  {
    q: 'Who does the repair work?',
    a: 'Independent tradespeople who hold a current South Australian licence for their trade: plumbers, electricians, gas fitters, carpenters, roof plumbers, painters, glaziers and others. The licensed trade does the repair; Briks books it, arranges access, keeps everyone updated and reviews the finished job.',
  },
  {
    q: 'What is not included?',
    a: 'Renovations, structural work and building projects are outside the maintenance desk. In a life-threatening emergency, tenants should call 000 first.',
  },
  {
    q: 'What if a tenant still calls the office?',
    a: 'Your team passes them the Briks number or forwards the message to us. Nothing needs to be entered twice, and the job appears on the Friday report.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'The Adelaide metropolitan area.',
  },
  {
    q: 'How do we start?',
    a: 'With one job. Send us your next repair, or give one tenant our number, and tell us your approval limit. We arrange it, you approve as normal, and you judge us on how it went. If it works, send the next one. No contract and nothing to install.',
  },
] as const
