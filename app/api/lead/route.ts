import { Resend } from 'resend'
import { z } from 'zod'
import { quickQuoteSchema } from '@/lib/validations'
import { checkRateLimit } from '@/lib/rate-limit'

/**
 * Lead endpoint for the static landing pages in public/lp/* (they can't call
 * server actions). Same validation, honeypot and rate limit as the homepage
 * QuickQuote, plus which landing page sent it.
 */

// Created per request so a missing key never breaks the build (Next imports route modules at build time).
const getResend = () => (process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null)

const SOURCES = ['agencies', 'property-managers', 'landlords', 'homeowners'] as const

const leadSchema = quickQuoteSchema.extend({
  source: z.enum(SOURCES),
  // Optional context fields; plain text, capped.
  company: z.string().trim().max(120).optional().default(''),
  doors: z.string().trim().max(20).optional().default(''),
})

function esc(v: string | null | undefined): string {
  if (v == null || v === '') return '—'
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const safeHeader = (v: string) => v.replace(/[\r\n]/g, ' ').slice(0, 200)

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      {
        success: false,
        error: 'Please check the highlighted fields.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }
  const d = parsed.data

  // Honeypot: pretend success, send nothing.
  if (d.website) return Response.json({ success: true })

  const rl = await checkRateLimit('quote')
  if (!rl.ok) {
    return Response.json(
      { success: false, error: `Too many requests. Try again in ${Math.ceil(rl.retryAfterMs / 60000)} min.` },
      { status: 429 },
    )
  }

  const row = (k: string, v: string) =>
    `<tr><td style="padding:8px;border-bottom:1px solid #e2ddd3;font-weight:600;width:150px;">${k}</td><td style="padding:8px;border-bottom:1px solid #e2ddd3;">${v}</td></tr>`

  const resend = getResend()
  if (!resend) {
    console.error('RESEND_API_KEY is not set; lead not emailed')
    return Response.json(
      { success: false, error: 'Could not send. Please call or email admin@briks.au.' },
      { status: 503 },
    )
  }

  try {
    await resend.emails.send({
      from: `Briks Website <${process.env.FROM_EMAIL ?? 'noreply@briks.au'}>`,
      to: [process.env.TO_EMAIL ?? 'admin@briks.au'],
      replyTo: d.email,
      subject: safeHeader(`Lead (${d.source}) — ${d.suburb} — ${d.name}`),
      html: `
        <h2 style="font-family:Georgia,serif;">New lead from /${d.source}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          ${row('Name', esc(d.name))}
          ${row('Email', esc(d.email))}
          ${row('Phone', esc(d.phone))}
          ${row('Suburb', esc(d.suburb))}
          ${row(d.source === 'homeowners' ? 'Job type' : 'Agency', esc(d.company))}
          ${row(d.source === 'landlords' ? 'Rentals' : 'Properties', esc(d.doors))}
        </table>
        <h3>Message</h3>
        <p style="background:#fafaf7;padding:16px;line-height:1.6;">${esc(d.issue).replace(/\n/g, '<br>')}</p>
      `,
    })
    return Response.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return Response.json(
      { success: false, error: 'Could not send. Please call or email admin@briks.au.' },
      { status: 502 },
    )
  }
}
