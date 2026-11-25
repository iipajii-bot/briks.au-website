import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GuideArticle from '@/components/site/GuideArticle'
import { GUIDES, getGuide } from '@/lib/guides'

type Params = Promise<{ slug: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return GUIDES.filter((g) => g.kind === 'compare').map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const g = getGuide(slug, 'compare')
  if (!g) return {}
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/compare/${g.slug}` },
    openGraph: { type: 'article', title: g.title, description: g.description, publishedTime: g.published, modifiedTime: g.updated },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params
  const g = getGuide(slug, 'compare')
  if (!g) notFound()
  return <GuideArticle g={g} path={`/compare/${g.slug}`} />
}
