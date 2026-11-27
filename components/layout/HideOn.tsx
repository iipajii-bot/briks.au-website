'use client'

import { usePathname } from 'next/navigation'

/** Renders its children everywhere except on the given paths (e.g. the /card link page, which stands alone). */
export default function HideOn({ paths, children }: { paths: string[]; children: React.ReactNode }) {
  const pathname = usePathname() || '/'
  if (paths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null
  return <>{children}</>
}
