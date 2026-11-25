/**
 * Shared data for the check-this-first guide (QuickFixes widget and /help page).
 * Deliberately conservative: no opening switchboards, no gas work, no ladders on roofs.
 * Emergency numbers verified 24 Nov 2026: AGN 1800 427 532, SA Power Networks 13 13 66.
 */
export type Fix = {
  id: string
  label: string
  icon: 'bulb' | 'power' | 'water' | 'drain' | 'alarm' | 'leak'
  checks: string[]
  stop: string
}

export const FIXES: Fix[] = [
  {
    id: 'light',
    label: 'A light isn’t working',
    icon: 'bulb',
    checks: [
      'Turn the light switch off and let the bulb cool before touching it.',
      'Swap in a new bulb of the same type and fitting.',
      'If other lights or power points are also out, check the switchboard for a tripped safety switch or circuit breaker (see "The power is off").',
    ],
    stop: 'Still not working, or the light flickers, buzzes or smells hot? Leave it off and contact us.',
  },
  {
    id: 'power',
    label: 'The power is off',
    icon: 'power',
    checks: [
      'Check whether neighbours or the street are out too. If so, it is a network outage: check sapowernetworks.com.au or call SA Power Networks on 13 13 66.',
      'If it is just your home, look at the switchboard without opening any covers. A safety switch or breaker in the "off" position has tripped.',
      'Unplug the appliances on that circuit, then switch it back on once.',
    ],
    stop: 'If it trips again straight away, leave it off and contact us. Never open the switchboard cover.',
  },
  {
    id: 'hotwater',
    label: 'No hot water',
    icon: 'water',
    checks: [
      'Electric system: check the switchboard for a tripped hot water circuit. Some systems only heat overnight on off-peak power.',
      'Gas system: check whether other gas appliances, like the stove, are working.',
      'Run a hot tap for a minute. If the water is warm but not hot, note it for us.',
    ],
    stop: 'Smell gas? Leave the area, don’t use switches or flames, and call the gas leak line on 1800 427 532. Water leaking from the hot water system? Contact us.',
  },
  {
    id: 'drain',
    label: 'A sink or toilet is blocked',
    icon: 'drain',
    checks: [
      'Stop using that sink or toilet so it doesn’t overflow.',
      'Try a plunger. Avoid chemical drain cleaners: they can damage pipes and burn skin.',
      'Check whether other drains in the house are slow too.',
    ],
    stop: 'More than one drain blocked, sewage smell, or water coming up outside? Contact us.',
  },
  {
    id: 'alarm',
    label: 'A smoke alarm is beeping',
    icon: 'alarm',
    checks: [
      'A short chirp every minute usually means a low battery.',
      'If the alarm has a replaceable battery, replace it and press the test button.',
      'Hardwired or 10-year sealed alarms can’t have the battery changed.',
    ],
    stop: 'Hardwired or sealed alarm, or it keeps beeping after a new battery? Contact us. Never remove a smoke alarm.',
  },
  {
    id: 'leak',
    label: 'Water is leaking',
    icon: 'leak',
    checks: [
      'Turn off the water at the meter (usually near the front boundary) if the leak is heavy.',
      'Keep water away from power points and appliances.',
      'Take a photo of where the water is coming from.',
    ],
    stop: 'Then contact us with the photo. If water is near electrics, keep clear and switch off that circuit only if it is safe to do so.',
  },
]
