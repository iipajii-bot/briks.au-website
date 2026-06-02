import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'

/**
 * ArticleHero — compact blog-post hero. Smaller than PageHero so the article
 * body lands inside the first viewport on most screens.
 *
 * Lays out: breadcrumb back-link, eyebrow (category), title, excerpt,
 * inline meta row (published / updated / reading time / author).
 */
export default function ArticleHero({
  category,
  title,
  excerpt,
  publishedAt,
  updatedAt,
  readingMinutes,
  author,
}: {
  category: string
  title: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  readingMinutes: number
  author: string
}) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  return (
    <header className="relative bg-[#fafaf7] border-b border-[#e2ddd3] pt-28 pb-10 md:pt-36 md:pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#5a5650] hover:text-[#8a6e3f] transition-colors mb-6 min-h-[44px] py-2"
          style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
        >
          <ArrowLeft size={12} aria-hidden />
          All articles
        </Link>

        <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
          {category}
        </p>

        <h1
          className="text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-5"
          style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700 }}
        >
          {title}
        </h1>

        <p className="text-[#3a3735] text-base md:text-lg leading-[1.55] max-w-2xl">
          {excerpt}
        </p>

        {/* Meta row */}
        <div className="mt-6 pt-5 border-t border-[#e2ddd3] flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] tracking-[0.18em] uppercase text-[#5a5650]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={11} className="text-[#8a6e3f]" aria-hidden />
            Published {fmt(publishedAt)}
          </span>
          {updatedAt !== publishedAt && (
            <span className="text-[#8a6e3f]">Updated {fmt(updatedAt)}</span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock size={11} className="text-[#8a6e3f]" aria-hidden />
            {readingMinutes} min read
          </span>
          <span>By {author}</span>
        </div>
      </div>
    </header>
  )
}
