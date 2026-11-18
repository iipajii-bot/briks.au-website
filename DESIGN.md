# DESIGN.md — Briks Building Services

Source of truth: `app/globals.css` (@theme tokens) and `lib/fonts.ts`. Static pages in
`public/` can't use next/font or Tailwind, so they copy these values and self-host the fonts.

## Visual theme
Modern luxury trade business. Warm paper and off-white surfaces, near-black ink, a brass accent
used sparingly, hairline warm borders, squared corners. Light theme is primary (daylight office
or phone outdoors); the site does not ship a dark theme.

## Colour
| Role | Token | Value |
|---|---|---|
| Page background | surface | #ffffff |
| Soft background | bg-dark (misnamed) | #fafaf7 |
| Warm panel | surface-2 | #f3efe5 |
| Deeper warm panel | surface-3 | #ebe4d4 |
| Ink (text) | bg-light (misnamed) | #1a1a1a |
| Body text | text-muted | #3a3735 |
| Secondary text | text-dim | #5a5650 |
| Brass accent | gold | #8a6e3f |
| Brass light | gold-light | #b89868 |
| Brass deep (hover/press) | gold-deep | #6a5530 |
| Hairline | hairline | #e2ddd3 |
| Strong hairline | hairline-strong | #c0bcb4 |
| Action (sparing, CTAs) | action | #c9571f |
| Steel (secondary data) | steel | #4a5863 |

Strategy: **Restrained**. Warm neutrals carry the page; brass marks hierarchy (eyebrows, key
numbers, active states) at ≤10% of the surface. Action orange only for a primary CTA.

## Typography
- Display: **Bricolage Grotesque** 700 (opsz/wdth axes), tight tracking (-0.02em), leading 0.95–1.1.
- Headings / labels / eyebrows: **Inter Tight** 500–800; eyebrows uppercase, 0.2–0.28em tracking, brass.
- Body: **Inter** 400–500, 16–18 px, leading 1.6, measure ≤70ch.
- Figures: Inter Tight with tabular-nums for prices and dimensions (Space Mono only for small technical labels).

## Shape, elevation, motion
- Radius: 4 px (rounded-sm) default, 8 px for larger panels; pills only for small status chips.
- Elevation: hairline borders first; soft shadow only on floating elements.
- Motion: ease-luxe `cubic-bezier(0.16,1,0.3,1)`, 200–600 ms, opacity/transform only; honour reduced motion.

## Components (patterns)
- Eyebrow + display heading + short dek.
- Section header with a brass hairline rule.
- Option selector: large tappable panels with price range and status chip.
- Data tables: generous rows, right-aligned tabular figures, total row with a strong top rule.
- Focus ring: 2 px brass, 2 px offset.
