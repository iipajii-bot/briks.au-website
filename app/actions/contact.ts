'use server'

import { Resend } from 'resend'
import { contactSchema, quickQuoteSchema } from '@/lib/validations'
import { checkRateLimit } from '@/lib/rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Escape user-supplied strings before interpolating into HTML email bodies.
 * Prevents stored XSS / phishing-link injection in the admin inbox.
 */
function esc(v: string | null | undefined): string {
  if (v == null) return '—'
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Strip CR/LF — prevent email header injection in subject lines. */
function safeHeader(v: string): string {
  return v.replace(/[\r\n]/g, ' ').slice(0, 200)
}

export async function submitContactForm(formData: unknown) {
  const parsed = contactSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      success: false,
      error: 'Please check your form inputs and try again.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const data = parsed.data

  // Honeypot — if a hidden field was filled, silently succeed (bot thinks it
  // worked, no email sent).
  if (data.website) return { success: true }

  // Rate limit by IP (no-op when Upstash not configured)
  const rl = await checkRateLimit('contact')
  if (!rl.ok) {
    return {
      success: false,
      error: `Too many requests. Try again in ${Math.ceil(rl.retryAfterMs / 60000)} min.`,
    }
  }

  try {
    await resend.emails.send({
      from: `Briks Website <${process.env.FROM_EMAIL ?? 'noreply@briks.au'}>`,
      to: [process.env.TO_EMAIL ?? 'admin@briks.au'],
      replyTo: data.email,
      subject: safeHeader(`New Enquiry: ${data.serviceType} — ${data.name}`),
      html: `
        <h2 style="color:#1e293b;font-family:Georgia,serif;">New Website Enquiry</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600;width:150px;">Name</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${esc(data.name)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600;">Email</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600;">Phone</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;"><a href="tel:${esc(data.phone)}">${esc(data.phone)}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600;">Company</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${esc(data.company)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600;">Service Type</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${esc(data.serviceType)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600;">Property Address</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${esc(data.propertyAddress)}</td></tr>
        </table>
        <h3 style="color:#1e293b;margin-top:20px;">Message</h3>
        <p style="background:#f8fafc;padding:16px;border-radius:8px;line-height:1.6;">${esc(data.message).replace(/\n/g, '<br>')}</p>
      `,
    })

    return { success: true }
  } catch (err) {
    console.error('Resend error:', err)
    return {
      success: false,
      error: 'Failed to send your message. Please try again or call us directly.',
    }
  }
}

export async function submitQuickQuote(formData: unknown) {
  const parsed = quickQuoteSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      success: false,
      error: 'Please check your form inputs and try again.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const data = parsed.data

  // Honeypot — silently succeed if a hidden field was filled
  if (data.website) return { success: true }

  // Rate limit by IP (no-op when Upstash not configured)
  const rl = await checkRateLimit('quote')
  if (!rl.ok) {
    return {
      success: false,
      error: `Too many requests. Try again in ${Math.ceil(rl.retryAfterMs / 60000)} min.`,
    }
  }

  try {
    await resend.emails.send({
      from: `Briks Quick Quote <${process.env.FROM_EMAIL ?? 'noreply@briks.au'}>`,
      to: [process.env.TO_EMAIL ?? 'admin@briks.au'],
      replyTo: data.email,
      subject: safeHeader(`Quick Quote — ${data.suburb} — ${data.name}`),
      html: `
        <h2 style="color:#1e293b;font-family:Georgia,serif;">Quick Quote Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600;width:150px;">Name</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${esc(data.name)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600;">Email</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600;">Phone</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${esc(data.phone)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:600;">Suburb</td><td style="padding:8px;border-bottom:1px solid #e2e8f0;">${esc(data.suburb)}</td></tr>
        </table>
        <h3 style="color:#1e293b;margin-top:20px;">Issue</h3>
        <p style="background:#f8fafc;padding:16px;border-radius:8px;line-height:1.6;">${esc(data.issue).replace(/\n/g, '<br>')}</p>
        <p style="margin-top:20px;font-size:12px;color:#64748b;">Source: Homepage QuickQuote form</p>
      `,
    })

    return { success: true }
  } catch (err) {
    console.error('Resend error:', err)
    return {
      success: false,
      error: 'Failed to send your request. Please try again or email admin@briks.au.',
    }
  }
}
