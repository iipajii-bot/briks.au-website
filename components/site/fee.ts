/**
 * Per-job coordination fee (owner decision 25 Nov 2026).
 * Calls and phone help are free. When a job needs a licensed trade sent (to quote or to do the work),
 * Briks adds one flat line to its own invoice:
 *  - agency-managed properties: paid by the owner (the property manager pays Briks' invoice from rent in trust)
 *  - self-managing landlords: paid by the landlord
 * Homeowners: no fee (written quote as normal).
 * Amount and label from the LLM council (25 Nov 2026): $19 inc GST, same for owners and landlords.
 */
export const FEE = {
  amount: '$19',
  label: 'Briks maintenance desk fee',
  gst: 'including GST',
} as const

export const feeLine = `${FEE.amount} ${FEE.gst}`
