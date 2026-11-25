/**
 * Homepage copy that is also used in structured data (FAQPage, HowTo-style steps).
 * Keep every claim here true and checkable: no 24/7, no response guarantees,
 * no licence claim for Briks itself, no prices.
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

export const PRICING = [
  { q: 'Cost to the agency', a: 'No Briks fee, no subscription and no contract for the 30-day start.' },
  { q: 'Who pays for repairs', a: 'The owner, through your agency, as they do now. Each job is priced on its own.' },
  { q: 'Jobs under your limit', a: 'Go ahead, and appear on the Friday report with photos.' },
  { q: 'Jobs over your limit', a: 'Quoted to you first. Nothing starts until you or the owner approve it.' },
  { q: 'Requests that need no work', a: 'No charge.' },
] as const

export const FAQS = [
  {
    q: 'What is an outsourced maintenance desk for a real estate agency?',
    a: 'It is a service that takes tenant repair requests off property managers. Tenants contact the desk directly. The desk works out how urgent each job is, books a licensed trade, arranges access, keeps the tenant and property manager updated and checks the finished work. The agency keeps its owners and its approval limits.',
  },
  {
    q: 'Does the Briks Maintenance Line cost the agency anything?',
    a: 'There is no Briks fee to the agency. Owners pay for the repair work they approve, through the agency, as they do now, and every job is priced on its own.',
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
    a: 'Start with one property manager for 30 days. We write the email that tells their tenants the new number, and at day 30 you decide whether to keep it, expand it or stop.',
  },
] as const
