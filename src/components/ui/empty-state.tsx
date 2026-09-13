import * as React from 'react'
import { cn } from '@/lib/cn'

export function EmptyState({ icon, title, description, action, className }: {
  icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode; className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-surface-2 px-6 py-12 text-center', className)}>
      {icon && <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand [&_svg]:h-6 [&_svg]:w-6">{icon}</div>}
      <div>
        <p className="font-heading text-base font-semibold text-fg">{title}</p>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}
