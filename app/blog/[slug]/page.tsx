import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import ArticleHero from '@/components/sections/ArticleHero'
import BlogRenderer from '@/components/sections/BlogRenderer'
import BlogTOC from '@/components/sections/BlogTOC'
import FAQAccordion from '@/components/sections/FAQAccordion'
import MovingBorder from '@/components/effects/MovingBorder'
import {
  BLOG_POSTS,
  getBlogPost,
  readingTimeMinutes,
} from '@/lib/blog-posts'
import { TRADES, getTrade } from '@/lib/trades'
import { SUBURB_CONTENT, getSuburb } from '@/lib/suburb-content'
import { SITE, whatsappHref } from '@/lib/constants'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params
  const p = getBlogPost(slug)
  if (!p) return { title: 'Post Not Found' }

  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: 'article',
      title: p.title,
      description: p.description,
      url: `${SITE.url}/blog/${p.slug}`,
      publishedTime: p.publishedAt,
      modifiedTime: p.updatedAt,
      authors: [SITE.founderName],
    },
  }
}

export default async function BlogPostPage(props: { params: Params }) {
  const { slug } = await props.params
  const p = getBlogPost(slug)
  if (!p) notFound()

  const relatedTrades = p.relatedTrades
    .map((s) => getTrade(s))
    .filter((t): t is NonNullable<ReturnType<typeof getTrade>> => Boolean(t))
  const relatedSuburbs = p.relatedSuburbs
    .map((s) => getSuburb(s))
    .filter((s): s is NonNullable<ReturnType<typeof getSuburb>> => Boolean(s))

  // Up to 3 other posts in the same category
  const otherPosts = BLOG_POSTS.filter((q) => q.slug !== p.slug)
    .filter((q) => q.category === p.category)
    .slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt,
    author: {
      '@type': 'Person',
      name: SITE.founderName,
      url: `${SITE.url}/about`,
    },
    publisher: { '@id': `${SITE.url}/#organization` },
    image: `${SITE.url}/og.png`,
    mainEntityOfPage: `${SITE.url}/blog/${p.slug}`,
    inLanguage: 'en-AU',
    keywords: p.primaryKeyword,
    articleSection: p.category,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: p.title,
        item: `${SITE.url}/blog/${p.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, '\\u003c'),
        }}
      />

      <ArticleHero
        category={p.category}
        title={p.title}
        excerpt={p.excerpt}
        publishedAt={p.publishedAt}
        updatedAt={p.updatedAt}
        readingMinutes={readingTimeMinutes(p)}
        author={SITE.founderName}
      />

      <article className="relative py-12 md:py-16 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,720px)] gap-8 lg:gap-12 xl:gap-16 lg:justify-center">
            <BlogTOC blocks={p.body} />
            <div className="min-w-0">
              <BlogRenderer blocks={p.body} />
            </div>
          </div>
        </div>
      </article>

      {/* FAQs */}
      {p.faqs.length > 0 && (
        <section className="relative py-16 md:py-20 bg-[#fafaf7] border-y border-[#e2ddd3]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              Frequently asked
            </p>
            <h2
              className="text-[#1a1a1a] text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] leading-[1.05] mb-8"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              Quick answers.
            </h2>
            <FAQAccordion items={p.faqs} />
          </div>
        </section>
      )}

      {/* Internal link clusters */}
      {(relatedTrades.length > 0 || relatedSuburbs.length > 0) && (
        <section className="relative py-16 md:py-20 bg-[#ffffff]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            {relatedTrades.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                  Related trades
                </p>
                <ul className="space-y-2.5">
                  {relatedTrades.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/services/${t.slug}`}
                        className="group inline-flex items-center gap-2 text-[#1a1a1a] hover:text-[#8a6e3f] transition-colors"
                        style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
                      >
                        {t.name}
                        <ArrowRight
                          size={14}
                          className="text-[#8a6e3f] transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {relatedSuburbs.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
                  Related service areas
                </p>
                <ul className="space-y-2.5">
                  {relatedSuburbs.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/areas/${s.slug}`}
                        className="group inline-flex items-center gap-2 text-[#1a1a1a] hover:text-[#8a6e3f] transition-colors"
                        style={{ fontFamily: 'var(--font-inter-tight)', fontWeight: 600 }}
                      >
                        {s.name}
                        <ArrowRight
                          size={14}
                          className="text-[#8a6e3f] transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Other posts in category */}
      {otherPosts.length > 0 && (
        <section className="relative py-16 md:py-20 bg-[#fafaf7] border-t border-[#e2ddd3]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-4">
              More in {p.category}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {otherPosts.map((q) => (
                <Link
                  key={q.slug}
                  href={`/blog/${q.slug}`}
                  className="group flex flex-col bg-white border border-[#e2ddd3] rounded-md p-5 md:p-6 hover:border-[#8a6e3f]/60 transition-colors"
                >
                  <h3
                    className="text-[#1a1a1a] text-base md:text-lg tracking-[-0.01em] leading-[1.25] mb-3"
                    style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                  >
                    {q.title}
                  </h3>
                  <p className="text-sm text-[#3a3735] leading-relaxed mb-4 flex-1 line-clamp-3">
                    {q.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.18em] uppercase text-[#8a6e3f]">
                    Read article
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-20 md:py-24 bg-[#ffffff] border-t border-[#e2ddd3] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-[#1a1a1a] text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] leading-[1.1] mb-5"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
          >
            Got a job?{' '}
            <span className="text-[#8a6e3f]">Tell us — we&rsquo;ll handle it.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <MovingBorder href="/contact">
              Get a quote
              <ArrowRight size={18} aria-hidden />
            </MovingBorder>
            <a
              href={whatsappHref(
                "Hi Briks — saw your blog. I'd like a quote on a job in Adelaide:"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#c0bcb4] hover:border-[#8a6e3f]/60 text-[#1a1a1a]/80 hover:text-[#1a1a1a] px-7 py-3.5 transition-colors duration-300 min-h-[44px]"
            >
              Text us on WhatsApp
            </a>
          </div>

          <Link
            href="/blog"
            className="mt-12 inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#5a5650] hover:text-[#8a6e3f] transition-colors"
          >
            <ArrowLeft size={12} />
            All articles
          </Link>
        </div>
      </section>
    </>
  )
}
