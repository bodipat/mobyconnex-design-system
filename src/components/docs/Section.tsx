import * as React from 'react'
import { cn } from '@/lib/cn'

export function Section({ id, title, description, children, level = 2, className }: {
  id?: string; title: string; description?: string; children: React.ReactNode; level?: 2 | 3; className?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-24 flex flex-col gap-4 border-t border-line pt-8 first:border-t-0 first:pt-0', className)}>
      <div className="flex flex-col gap-1">
        {level === 2 ? (
          <h2 className="font-heading text-2xl font-semibold">{title}</h2>
        ) : (
          <h3 className="font-heading text-lg font-semibold">{title}</h3>
        )}
        {description && <p className="max-w-3xl text-sm text-muted">{description}</p>}
      </div>
      {children}
    </section>
  )
}
