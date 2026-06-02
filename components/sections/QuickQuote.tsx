'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import {
  CheckCircle,
  Loader2,
  AlertCircle,
  ArrowRight,
  Phone,
} from 'lucide-react'
import { quickQuoteSchema, type QuickQuoteData } from '@/lib/validations'
import { submitQuickQuote } from '@/app/actions/contact'
import { sitePhone, sitePhoneHref } from '@/lib/constants'

const fieldBase =
  'w-full bg-white text-[#1a1a1a] border border-[#c0bcb4] rounded-md px-4 py-3 text-sm placeholder:text-[#5a5650] focus:outline-none focus:border-[#8a6e3f] focus:ring-2 focus:ring-[#8a6e3f]/20 transition-all'

const labelBase =
  'block text-[#1a1a1a] text-xs font-medium tracking-[0.12em] uppercase mb-2'

const ease = [0.16, 1, 0.3, 1] as const

export default function QuickQuote() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  )
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickQuoteData>({
    resolver: zodResolver(quickQuoteSchema),
  })

  const onSubmit = async (data: QuickQuoteData) => {
    setStatus('loading')
    setErrorMsg('')
    const result = await submitQuickQuote(data)
    if (result.success) {
      setStatus('success')
      reset()
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'Something went wrong.')
    }
  }

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 bg-[#fafaf7]"
      aria-label="Quick quote request"
    >
      <div
        className="absolute inset-x-0 top-0 hairline w-[80%] max-w-5xl mx-auto"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left — copy */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5"
          >
            <p className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6">
              Quick quote
            </p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a] mb-6"
              style={{ fontWeight: 700 }}
            >
              Tell us what&rsquo;s broken.{' '}
              <span className="text-[#8a6e3f]">We come back fast.</span>
            </h2>
            <p className="text-[#3a3735] text-lg leading-relaxed mb-8 max-w-md">
              Faster than calling. No script. The founder reads every one and
              replies personally.
            </p>

            {sitePhone() ? (
              <div className="flex items-center gap-3 rounded-md border border-[#e2ddd3] bg-[#ffffff] px-4 py-3 max-w-xs">
                <Phone size={16} className="text-[#8a6e3f]" aria-hidden />
                <div>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5650]">
                    Or call if it&rsquo;s urgent
                  </p>
                  <a
                    href={sitePhoneHref()}
                    className="text-sm text-[#1a1a1a] hover:text-[#8a6e3f] transition-colors"
                    style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
                  >
                    {sitePhone()}
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#5a5650]">
                Or email{' '}
                <a
                  href="mailto:admin@briks.au"
                  className="text-[#8a6e3f] hover:text-[#b89868]"
                >
                  admin@briks.au
                </a>{' '}
                for urgent jobs.
              </p>
            )}
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-md border border-[#e2ddd3] bg-[#ffffff] p-6 md:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-14 h-14 rounded-full border border-[#8a6e3f]/50 bg-[#f3efe5] flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(138,110,63,0.15)]">
                    <CheckCircle size={26} className="text-[#8a6e3f]" />
                  </div>
                  <h3
                    className="font-display text-2xl md:text-3xl text-[#1a1a1a] mb-3"
                    style={{ fontWeight: 700 }}
                  >
                    Got it.
                  </h3>
                  <p className="text-[#3a3735] text-sm leading-relaxed max-w-sm mb-5">
                    We&rsquo;ll reply soon. Check your inbox and spam just in
                    case.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center min-h-[44px] py-2 text-xs text-[#5a5650] hover:text-[#8a6e3f] underline underline-offset-4 transition-colors"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Honeypot — hidden bot trap */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="qq-website">Website (leave blank)</label>
                    <input
                      type="text"
                      id="qq-website"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('website')}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelBase} htmlFor="qq-name">
                        Your name <span className="text-[#8a6e3f]">*</span>
                      </label>
                      <input
                        id="qq-name"
                        {...register('name')}
                        placeholder="First + last"
                        className={fieldBase}
                      />
                      {errors.name && (
                        <p className="mt-2 text-[#c9571f] text-xs">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className={labelBase} htmlFor="qq-suburb">
                        Property suburb <span className="text-[#8a6e3f]">*</span>
                      </label>
                      <input
                        id="qq-suburb"
                        {...register('suburb')}
                        placeholder="e.g. Norwood"
                        className={fieldBase}
                      />
                      {errors.suburb && (
                        <p className="mt-2 text-[#c9571f] text-xs">{errors.suburb.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelBase} htmlFor="qq-email">
                        Email <span className="text-[#8a6e3f]">*</span>
                      </label>
                      <input
                        id="qq-email"
                        type="email"
                        {...register('email')}
                        placeholder="you@example.com"
                        className={fieldBase}
                      />
                      {errors.email && (
                        <p className="mt-2 text-[#c9571f] text-xs">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className={labelBase} htmlFor="qq-phone">
                        Mobile <span className="text-[#8a6e3f]">*</span>
                      </label>
                      <input
                        id="qq-phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="0400 000 000"
                        className={fieldBase}
                        required
                        aria-required="true"
                      />
                      {errors.phone && (
                        <p className="text-xs text-[#a83434] mt-1.5">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={labelBase} htmlFor="qq-issue">
                      What&rsquo;s broken? <span className="text-[#8a6e3f]">*</span>
                    </label>
                    <textarea
                      id="qq-issue"
                      {...register('issue')}
                      rows={3}
                      placeholder="e.g. Hot water unit failed last night, tenant is calling daily."
                      className={`${fieldBase} resize-none`}
                    />
                    {errors.issue && (
                      <p className="mt-2 text-[#c9571f] text-xs">{errors.issue.message}</p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-3 bg-[#fdf3ee] border border-[#c9571f]/30 rounded-md px-4 py-3">
                      <AlertCircle size={16} className="text-[#c9571f] shrink-0" />
                      <p className="text-[#f5d0c5] text-sm">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#c9571f] hover:bg-[#e26a32] disabled:opacity-60 disabled:cursor-not-allowed text-[#1a1a1a] font-semibold py-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 min-h-[48px]"
                    style={{ fontFamily: 'var(--font-inter-tight)' }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send the request
                        <ArrowRight size={18} aria-hidden />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] tracking-[0.16em] uppercase text-[#5a5650] text-center pt-1">
                    We reply fast · No spam · No automation
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
