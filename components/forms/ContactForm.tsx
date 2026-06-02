'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { submitContactForm } from '@/app/actions/contact'
import { SERVICE_TYPE_OPTIONS, SITE } from '@/lib/constants'

const fieldBase =
  'w-full bg-[#fafaf7] text-[#1a1a1a] border border-[#c0bcb4] rounded-md px-4 py-3 text-sm placeholder:text-[#5a5650] focus:outline-none focus:border-[#8a6e3f] focus:ring-2 focus:ring-[#8a6e3f]/20 transition-all'

const labelBase = 'block text-[#1a1a1a] text-xs font-medium tracking-[0.12em] uppercase mb-2'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    setErrorMsg('')
    const result = await submitContactForm(data)
    if (result.success) {
      setStatus('success')
      reset()
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8">
        <div className="w-16 h-16 rounded-full border border-[#8a6e3f]/50 bg-[#ffffff] flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(138,110,63,0.2)]">
          <CheckCircle size={28} className="text-[#8a6e3f]" />
        </div>
        <h3
          className="font-display text-3xl md:text-4xl text-[#1a1a1a] mb-4"
          style={{ fontWeight: 500 }}
        >
          Message received.
        </h3>
        <p className="text-[#3a3735] text-base leading-relaxed max-w-sm">
          We respond fast. For urgent jobs, email{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="text-[#8a6e3f] hover:text-[#b89868]"
          >
            {SITE.email}
          </a>{' '}
          directly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 inline-flex items-center min-h-[44px] py-2 text-sm text-[#5a5650] hover:text-[#8a6e3f] underline underline-offset-4 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot — hidden from real users (off-screen + aria-hidden + autocomplete=off). Bots fill it. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="website">Website (leave blank)</label>
        <input
          type="text"
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelBase} htmlFor="name">
            Full name <span className="text-[#8a6e3f]">*</span>
          </label>
          <input
            id="name"
            {...register('name')}
            placeholder="First + last"
            className={fieldBase}
          />
          {errors.name && (
            <p className="mt-2 text-[#c9571f] text-xs">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className={labelBase} htmlFor="phone">
            Phone <span className="text-[#8a6e3f]">*</span>
          </label>
          <input
            id="phone"
            {...register('phone')}
            placeholder="0400 000 000"
            type="tel"
            className={fieldBase}
          />
          {errors.phone && (
            <p className="mt-2 text-[#c9571f] text-xs">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelBase} htmlFor="email">
          Email <span className="text-[#8a6e3f]">*</span>
        </label>
        <input
          id="email"
          {...register('email')}
          type="email"
          placeholder="you@youragency.com.au"
          className={fieldBase}
        />
        {errors.email && (
          <p className="mt-2 text-[#c9571f] text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelBase} htmlFor="company">
            Agency <span className="text-[#5a5650] tracking-normal normal-case">(optional)</span>
          </label>
          <input
            id="company"
            {...register('company')}
            placeholder="Your agency name"
            className={fieldBase}
          />
        </div>

        <div>
          <label className={labelBase} htmlFor="serviceType">
            Service type <span className="text-[#8a6e3f]">*</span>
          </label>
          <select
            id="serviceType"
            {...register('serviceType')}
            className={`${fieldBase} appearance-none`}
          >
            <option value="" className="bg-[#fafaf7] text-[#5a5650]">
              Select…
            </option>
            {SERVICE_TYPE_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[#fafaf7] text-[#1a1a1a]"
              >
                {opt.label}
              </option>
            ))}
          </select>
          {errors.serviceType && (
            <p className="mt-2 text-[#c9571f] text-xs">
              {errors.serviceType.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className={labelBase} htmlFor="propertyAddress">
          Property address{' '}
          <span className="text-[#5a5650] tracking-normal normal-case">(optional)</span>
        </label>
        <input
          id="propertyAddress"
          {...register('propertyAddress')}
          placeholder="e.g. 12 Example St, Norwood SA 5067"
          className={fieldBase}
        />
      </div>

      <div>
        <label className={labelBase} htmlFor="message">
          What&rsquo;s needed <span className="text-[#8a6e3f]">*</span>
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          placeholder="Broken thing, address, urgency. Two sentences is enough."
          className={`${fieldBase} resize-none`}
        />
        {errors.message && (
          <p className="mt-2 text-[#c9571f] text-xs">{errors.message.message}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-3 bg-[#fdf3ee] border border-[#c9571f]/30 rounded-md px-4 py-3">
          <AlertCircle size={16} className="text-[#c9571f] shrink-0" />
          <p className="text-[#a83434] text-sm">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#8a6e3f] hover:bg-[#b89868] disabled:opacity-60 disabled:cursor-not-allowed text-[#1a1a1a] font-semibold py-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 min-h-[48px]"
        style={{ fontFamily: 'var(--font-inter-tight)' }}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending…
          </>
        ) : (
          'Send message'
        )}
      </button>

      <p className="text-[#5a5650] text-xs text-center">
        By submitting, you agree to our Privacy Policy. We respond fast.
      </p>
    </form>
  )
}
