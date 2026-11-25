'use client'

/**
 * Enquiry form for the segment landing pages. Posts JSON to /api/lead
 * (validation, honeypot, rate limit and email live there).
 * Shows a confirmation only after the server says success; field errors under each field.
 */
import { useId, useState, type FormEvent } from 'react'

export type LeadSource = 'agencies' | 'property-managers' | 'landlords' | 'homeowners'

type Field = {
  name: 'name' | 'email' | 'phone' | 'suburb' | 'company' | 'doors' | 'issue'
  label: string
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  options?: ReadonlyArray<string>
  autoComplete?: string
  required?: boolean
  hint?: string
  half?: boolean
}

export default function LeadForm({
  source,
  fields,
  submitLabel,
  defaults = {},
  successTitle = 'Thanks. We have your details.',
  successBody = 'We will reply by phone or email, usually the same business day.',
}: {
  source: LeadSource
  fields: ReadonlyArray<Field>
  submitLabel: string
  defaults?: Partial<Record<Field['name'], string>>
  successTitle?: string
  successBody?: string
}) {
  const uid = useId()
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    setError('')
    setFieldErrors({})
    const fd = new FormData(e.currentTarget)
    const payload: Record<string, string> = { source, website: String(fd.get('website') ?? '') }
    for (const f of fields) payload[f.name] = String(fd.get(f.name) ?? '').trim()
    // The API requires a suburb and an issue; give sensible fallbacks only where the page has no such field.
    if (!fields.some((f) => f.name === 'issue')) payload.issue = `Enquiry from /${source}`
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string; fieldErrors?: Record<string, string[]> }
      if (data.success) {
        setState('sent')
        return
      }
      setFieldErrors(data.fieldErrors ?? {})
      setError(data.error ?? 'Something went wrong. Please call or email us instead.')
      setState('error')
    } catch {
      setError('Could not send. Please check your connection, or call or email us instead.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div role="status" className="rounded-sm border border-[#c0bcb4] bg-white p-8">
        <p className="font-display text-[26px] font-bold leading-tight text-[#1a1a1a]">{successTitle}</p>
        <p className="mt-3 text-[16px] leading-relaxed text-[#3a3735]">{successBody}</p>
      </div>
    )
  }

  const input =
    'mt-1.5 block w-full rounded-sm border border-[#c0bcb4] bg-white px-3.5 py-3 text-[16px] text-gray-900 placeholder:text-[#8a857c] focus:border-[#1a1a1a] focus:outline-none'

  return (
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {fields.map((f) => {
        const id = `${uid}-${f.name}`
        const err = fieldErrors[f.name]?.[0]
        const describedBy = [f.hint ? `${id}-hint` : '', err ? `${id}-err` : ''].filter(Boolean).join(' ') || undefined
        const common = {
          id,
          name: f.name,
          required: f.required,
          defaultValue: defaults[f.name] ?? '',
          'aria-invalid': err ? true : undefined,
          'aria-describedby': describedBy,
          autoComplete: f.autoComplete,
        }
        return (
          <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
            <label htmlFor={id} className="font-heading text-[14px] font-semibold text-[#1a1a1a]">
              {f.label}
              {f.required ? null : <span className="font-normal text-[#5a5650]"> (optional)</span>}
            </label>
            {f.type === 'textarea' ? (
              <textarea {...common} rows={4} className={input} />
            ) : f.type === 'select' ? (
              <select {...common} className={input}>
                <option value="">Choose one</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input {...common} type={f.type ?? 'text'} className={input} />
            )}
            {f.hint ? (
              <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-[#5a5650]">
                {f.hint}
              </p>
            ) : null}
            {err ? (
              <p id={`${id}-err`} className="mt-1.5 text-[13px] font-medium text-[#9b2c2c]">
                {err}
              </p>
            ) : null}
          </div>
        )
      })}
      <div className="sm:col-span-2">
        {error ? (
          <p role="alert" className="mb-4 text-[14px] font-medium text-[#9b2c2c]">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={state === 'sending'}
          className="font-heading inline-flex min-h-[48px] w-full items-center justify-center rounded-sm bg-[#1a1a1a] px-6 text-[15px] font-semibold text-[#fafaf7] transition-colors duration-200 hover:bg-[#6a5530] disabled:opacity-60 sm:w-auto"
        >
          {state === 'sending' ? 'Sending…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
