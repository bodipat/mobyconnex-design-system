import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

export function Breadcrumb({ items, className }: { items: { label: string; to?: string }[]; className?: string }) {
  return (
    <nav aria-label="breadcrumb" className={cn('flex flex-wrap items-center gap-1.5 text-sm text-muted', className)}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
          {it.to ? (
            <Link to={it.to} className="transition hover:text-brand">{it.label}</Link>
          ) : (
            <span className="text-fg">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
