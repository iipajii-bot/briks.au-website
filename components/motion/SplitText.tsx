'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

type Props = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  as: Tag = 'span',
}: Props) {
  const reduced = useReducedMotion()
  const words = useMemo(() => text.split(' '), [text])

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  const MotionTag = motion[Tag as 'span']

  return (
    <MotionTag
      aria-label={text}
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: delay, staggerChildren: stagger },
        },
      }}
    >
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          aria-hidden
          className="inline-block whitespace-nowrap"
        >
          {word.split('').map((ch, ci) => (
            <motion.span
              key={`${ch}-${ci}`}
              className="inline-block"
              variants={{
                hidden: { y: '110%', opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block w-[0.25em]">&nbsp;</span>}
        </span>
      ))}
    </MotionTag>
  )
}
