import type { BlogBlock } from '@/lib/blog-posts'

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * BlogRenderer — renders a structured blog body w/o a markdown lib.
 * Pure server component, type-safe per block discriminant.
 *
 * H2 + H3 auto-slug-id when no `id` provided — required for the sticky TOC
 * (`BlogTOC`) anchors and IntersectionObserver active-section tracking.
 */
export default function BlogRenderer({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5 md:space-y-6">
      {blocks.map((b, i) => {
        if (b.type === 'p') {
          return (
            <p
              key={i}
              className="text-[#3a3735] text-base md:text-[17px] leading-[1.75]"
            >
              {b.content}
            </p>
          )
        }
        if (b.type === 'h2') {
          const id = b.id ?? slugify(b.content)
          return (
            <h2
              key={i}
              id={id}
              className="text-[#1a1a1a] text-2xl md:text-3xl tracking-[-0.01em] leading-[1.2] pt-6 md:pt-8 scroll-mt-28"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              {b.content}
            </h2>
          )
        }
        if (b.type === 'h3') {
          const id = b.id ?? slugify(b.content)
          return (
            <h3
              key={i}
              id={id}
              className="text-[#1a1a1a] text-xl md:text-2xl tracking-[-0.01em] leading-[1.25] pt-4 md:pt-5 scroll-mt-28"
              style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
            >
              {b.content}
            </h3>
          )
        }
        if (b.type === 'ul') {
          return (
            <ul key={i} className="space-y-2 pl-1">
              {b.items.map((item, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-[#3a3735] text-base md:text-[17px] leading-[1.7]"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#8a6e3f]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )
        }
        if (b.type === 'ol') {
          return (
            <ol key={i} className="space-y-2.5 pl-1 list-none counter-reset">
              {b.items.map((item, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-[#3a3735] text-base md:text-[17px] leading-[1.7]"
                >
                  <span
                    className="shrink-0 text-[#8a6e3f] tabular-nums tracking-[-0.01em]"
                    style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
                  >
                    {String(j + 1).padStart(2, '0')}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          )
        }
        if (b.type === 'quote') {
          return (
            <blockquote
              key={i}
              className="relative pl-5 border-l-[3px] border-[#8a6e3f] my-6"
            >
              <p
                className="text-[#1a1a1a] text-lg md:text-xl tracking-[-0.01em] leading-[1.45] italic"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 500 }}
              >
                &ldquo;{b.content}&rdquo;
              </p>
              {b.cite && (
                <cite className="block mt-2 text-[#5a5650] text-xs tracking-[0.16em] uppercase not-italic">
                  {b.cite}
                </cite>
              )}
            </blockquote>
          )
        }
        if (b.type === 'callout') {
          return (
            <aside
              key={i}
              className="relative bg-[#fafaf7] border border-[#e2ddd3] rounded-md p-5 md:p-6 pl-7 my-6"
            >
              <span
                aria-hidden
                className="absolute left-0 top-5 bottom-5 w-[3px] bg-[#8a6e3f] rounded-r-sm"
              />
              <p
                className="text-[10px] tracking-[0.22em] uppercase text-[#8a6e3f] mb-2"
              >
                Worth knowing
              </p>
              <p
                className="text-[#1a1a1a] text-base md:text-lg tracking-[-0.01em] mb-2"
                style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 600 }}
              >
                {b.title}
              </p>
              <p className="text-[#3a3735] text-sm md:text-[15px] leading-[1.65]">
                {b.body}
              </p>
            </aside>
          )
        }
        return null
      })}
    </div>
  )
}
