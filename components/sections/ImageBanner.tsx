'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
  caption?: string
  aspect?: 'wide' | 'tall' | 'square' | 'banner'
  className?: string
  priority?: boolean
}

const aspectClass: Record<NonNullable<Props['aspect']>, string> = {
  wide: 'aspect-video',
  tall: 'aspect-[4/5]',
  square: 'aspect-square',
  banner: 'aspect-[21/9]',
}

/**
 * Wide image with corner marks + warm fallback when src fails.
 * Uses next/image for AVIF/WebP + responsive sizes.
 */
export default function ImageBanner({
  src,
  alt,
  caption,
  aspect = 'banner',
  className = '',
  priority = false,
}: Props) {
  const [errored, setErrored] = useState(false)

  return (
    <figure
      className={`relative ${aspectClass[aspect]} rounded-md overflow-hidden border border-[#e2ddd3] bg-[#ebe4d4] ${className}`}
    >
      {!errored && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
          priority={priority}
          quality={80}
          onError={() => setErrored(true)}
          className="object-cover"
        />
      )}
      {errored && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,#ebe4d4_0%,#fafaf7_60%,#f3efe5_100%)]" />
      )}

      {caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a1a1a]/55 via-[#1a1a1a]/20 to-transparent p-5 md:p-7 z-10">
          <p
            className="text-white text-sm md:text-base tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 700 }}
          >
            {caption}
          </p>
        </div>
      )}

      <div className="absolute top-3 left-3 h-5 w-5 border-t border-l border-[#8a6e3f]/70 z-10" />
      <div className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#8a6e3f]/70 z-10" />
    </figure>
  )
}
