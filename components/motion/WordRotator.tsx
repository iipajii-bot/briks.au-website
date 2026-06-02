'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Reveals first word with SplitText-style char stagger to match the rest of
 * the H1 reveal, then transitions to whole-word slide rotation.
 *
 * Reduced motion: shows first word static.
 */
export default function WordRotator({
  words,
  intervalMs = 1500,
  className,
  startDelayMs = 350,
  charStagger = 0.04,
  charDuration = 0.7,
  firstCycleMs = 600,
}: {
  words: string[]
  intervalMs?: number
  className?: string
  startDelayMs?: number
  charStagger?: number
  charDuration?: number
  // Linger for the first revealed word before the first slide-swap. Defaults
  // shorter than intervalMs so the page feels alive sooner.
  firstCycleMs?: number
}) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'reveal' | 'rotating'>('reveal')
  const reduced = useReducedMotion()

  const firstWord = words[0]
  // Reveal completes after delay + char stagger + char duration
  const revealMs = startDelayMs + firstWord.length * charStagger * 1000 + charDuration * 1000

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => {
      // Hand off reveal → rotating. Keep index at 0 so AnimatePresence mounts
      // with the same word that was just revealed; the next tick's interval
      // does the first slide swap.
      setPhase('rotating')
    }, revealMs)
    return () => clearTimeout(t)
  }, [reduced, revealMs])

  useEffect(() => {
    if (reduced || phase !== 'rotating') return

    let id: ReturnType<typeof setInterval> | undefined
    let firstTimer: ReturnType<typeof setTimeout> | undefined
    let firstDone = false
    let paused = document.visibilityState === 'hidden'

    const advance = () => setIndex((p) => (p + 1) % words.length)

    const startInterval = () => {
      if (id || paused) return
      id = setInterval(advance, intervalMs)
    }

    const stop = () => {
      if (id) clearInterval(id)
      id = undefined
      if (firstTimer) clearTimeout(firstTimer)
      firstTimer = undefined
    }

    const onVisibility = () => {
      paused = document.visibilityState === 'hidden'
      if (paused) {
        stop()
      } else if (firstDone) {
        startInterval()
      } else {
        firstTimer = setTimeout(() => {
          advance()
          firstDone = true
          startInterval()
        }, firstCycleMs)
      }
    }

    if (!paused) {
      // First swap fires sooner than the regular interval, then settles.
      firstTimer = setTimeout(() => {
        advance()
        firstDone = true
        startInterval()
      }, firstCycleMs)
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [phase, intervalMs, firstCycleMs, reduced, words.length])

  if (reduced) {
    return <span className={className}>{firstWord}</span>
  }

  const widest = words.reduce((a, b) => (a.length >= b.length ? a : b))

  return (
    <span className="relative inline-block align-baseline overflow-hidden">
      {/* Invisible spacer locks width to widest word */}
      <span className="invisible whitespace-nowrap" aria-hidden>
        {widest}
      </span>

      {phase === 'reveal' ? (
        <motion.span
          aria-label={firstWord}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: startDelayMs / 1000,
                staggerChildren: charStagger,
              },
            },
          }}
          className={`absolute inset-0 whitespace-nowrap ${className ?? ''}`}
        >
          {firstWord.split('').map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              variants={{
                hidden: { y: '110%', opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: charDuration, ease },
                },
              }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </motion.span>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className={`absolute inset-0 whitespace-nowrap ${className ?? ''}`}
            aria-live="polite"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  )
}
