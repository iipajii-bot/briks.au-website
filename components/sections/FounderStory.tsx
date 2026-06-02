'use client'

import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { IMAGES } from '@/lib/images'

const FOUNDER_PHOTO_PATH = '/founder/pargat.jpg'

const ease = [0.16, 1, 0.3, 1] as const

export default function FounderStory() {
  const ref = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="relative bg-[#fafaf7] py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Illustrative column — placeholder with 3 animated tiles */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease }}
          className="lg:col-span-5 order-2 lg:order-1"
        >
          <div
            ref={imageRef}
            className="relative aspect-[4/5] rounded-md overflow-hidden border border-[#e2ddd3] bg-[#ffffff]"
          >
            <motion.div
              style={{ y: prefersReduced ? 0 : y }}
              className="absolute -inset-y-8 inset-x-0"
            >
              <Image
                src={SITE.features.hasFounderPhoto ? FOUNDER_PHOTO_PATH : IMAGES.aboutHero}
                alt={
                  SITE.features.hasFounderPhoto
                    ? `${SITE.founderName}, founder of Briks Building Services, in Adelaide`
                    : 'Adelaide tradesperson on the job'
                }
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                quality={80}
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/85 via-[#1a1a1a]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 z-10">
              {SITE.features.hasFounderPhoto ? (
                <>
                  <p
                    className="font-display text-2xl text-white mb-1"
                    style={{ fontWeight: 700 }}
                  >
                    {SITE.founderName}
                  </p>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#b89868]">
                    Founder · Adelaide
                  </p>
                </>
              ) : (
                <>
                  <p
                    className="font-display text-2xl text-white mb-1"
                    style={{ fontWeight: 700 }}
                  >
                    Built by experienced tradies
                  </p>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#b89868]">
                    Adelaide · One local team
                  </p>
                </>
              )}
            </div>
            <div className="absolute top-4 left-4 h-6 w-6 border-t border-l border-[#8a6e3f]/60" />
            <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[#8a6e3f]/60" />
          </div>
        </motion.div>

        {/* Text column */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="text-[#8a6e3f] text-xs font-medium tracking-[0.28em] uppercase mb-6"
          >
            Why Briks exists
          </motion.p>

          <motion.h2
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
            style={{ fontWeight: 700 }}
          >
            Adelaide deserves a builder that{' '}
            <span className="text-[#8a6e3f]">picks up.</span>
          </motion.h2>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="mt-8 space-y-5 text-[#3a3735] text-base md:text-lg leading-relaxed max-w-2xl"
          >
            <p>
              Adelaide has good tradies. Finding one who answers the phone,
              quotes within a week, turns up on the day, and finishes the
              job — that&rsquo;s the hard part. Most homeowners save up six
              small jobs before they call anyone, because the friction is
              worse than the broken tap.
            </p>
            <p>
              Briks fixes the friction, not the pricing. Same trades, same
              standards, same Adelaide rates. What changes is the experience
              around them — one call, fast quote, clear timeline, single
              invoice, photo-documented finish. Whether it&rsquo;s a leaky
              shower or a kitchen renovation, the process is the same.
            </p>
            <p
              className="font-display text-[#1a1a1a] text-xl md:text-2xl leading-snug border-l-2 border-[#8a6e3f] pl-6"
              style={{ fontWeight: 700 }}
            >
              Briks exists so Adelaide stops putting up with tradies who
              ghost.
            </p>
            <p>
              Maintenance, repairs, renovations, fit-outs — all under one
              local roof. Homeowners, landlords, real estate agencies,
              businesses. One number to call. One team to deal with. One
              invoice at the end.
            </p>
          </motion.div>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
            className="mt-10 flex items-center gap-6"
          >
            <div>
              <p
                className="font-display text-lg text-[#1a1a1a]"
                style={{ fontWeight: 500 }}
              >
                Pargat Singh
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-[#5a5650] mt-1">
                Founder · Adelaide
              </p>
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm text-[#8a6e3f] hover:text-[#b89868] transition-colors"
            >
              Read the full story
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
