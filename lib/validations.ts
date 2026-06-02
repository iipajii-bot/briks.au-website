import { z } from 'zod'

// ─── Helpers ─────────────────────────────────────────────────────────────────
// Strip CR/LF from short single-line fields — defence-in-depth against
// email header injection if the value flows into a subject line.
const oneLine = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Maximum ${max} characters`)
    .transform((v) => v.replace(/[\r\n]/g, ' '))

const multiLine = (max: number) =>
  z.string().trim().max(max, `Maximum ${max} characters`)

// Honeypot field — must be empty (real users can't see it; bots fill it).
const honeypot = z.string().max(0).optional().or(z.literal(''))

// ─── Contact form ────────────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: oneLine(120).pipe(z.string().min(2, 'Name must be at least 2 characters')),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address').max(254),
  phone: oneLine(40).pipe(z.string().min(8, 'Please enter a valid phone number')),
  company: oneLine(120).optional(),
  serviceType: oneLine(80).pipe(z.string().min(1, 'Please select a service type')),
  propertyAddress: oneLine(250).optional(),
  message: multiLine(5000).pipe(z.string().min(10, 'Please provide a brief description (min. 10 characters)')),
  // Honeypot — bot trap. Must be empty.
  website: honeypot,
})

export type ContactFormData = z.infer<typeof contactSchema>

// ─── Quick quote form ────────────────────────────────────────────────────────
export const quickQuoteSchema = z.object({
  name: oneLine(120).pipe(z.string().min(2, 'Name must be at least 2 characters')),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address').max(254),
  phone: oneLine(40).pipe(z.string().min(8, 'Please enter a valid mobile number')),
  suburb: oneLine(80).pipe(z.string().min(2, 'Please enter your suburb')),
  issue: multiLine(5000).pipe(z.string().min(10, 'Briefly describe the issue (min. 10 characters)')),
  // Honeypot — bot trap. Must be empty.
  website: honeypot,
})

export type QuickQuoteData = z.infer<typeof quickQuoteSchema>
