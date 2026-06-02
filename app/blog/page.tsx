import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import { BLOG_POSTS, readingTimeMinutes } from '@/lib/blog-posts'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Adelaide Building Services Blog — Maintenance, Renovation, Trades',
  description:
    'In-depth Adelaide building services articles — maintenance, renovation, trades explained, property management, heritage homes. From the Briks coordinator desk.',
  alternates: { canonical: '/blog' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
  ],
}

export default function BlogIndexPage() {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />

      <PageHero
        eyebrow="Briks blog"
        title={
          <>
            Notes from{' '}
            <span className="text-[#8a6e3f]">the coordinator&rsquo;s desk.</span>
          </>
        }
        subtitle={
          <>
            In-depth articles on Adelaide maintenance, renovation, heritage
            work, trades explained, and the small-print compliance items that
            catch out homeowners and property managers.
          </>
        }
      />

      <section className="relative py-16 md:py-24 bg-[#fafaf7] border-y border-[#e2ddd3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {sorted.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col bg-white border border-[#e2ddd3] rounded-md p-6 md:p-7 hover:border-[#8a6e3f]/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f]">
                    {p.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.16em] uppercase text-[#5a5650]">
                    <Clock size={11} className="text-[#8a6e3f]/70" aria-hidden />
                    {readingTimeMinutes(p)} min
                  </span>
                </div>
                <h2
                  className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em] leading-[1.25] mb-3"
                  style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                >
                  {p.title}
                </h2>
                <p className="text-sm text-[#3a3735] leading-relaxed mb-5 flex-1">
                  {p.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[#e2ddd3]">
                  <span className="text-[10px] tracking-[0.16em] uppercase text-[#5a5650]">
                    {new Date(p.publishedAt).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-[#8a6e3f] transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
