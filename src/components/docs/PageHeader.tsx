import * as React from 'react'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'

export function PageHeader({ title, description, status, crumbs, children }: {
  title: string; description?: string; status?: 'stable' | 'beta' | 'new' | 'planned'
  crumbs?: { label: string; to?: string }[]; children?: React.ReactNode
}) {
  const statusMap = {
    stable: { label: 'ใช้งานได้จริง', variant: 'success' as const },
    beta: { label: 'เบต้า', variant: 'warning' as const },
    new: { label: 'ใหม่', variant: 'accent' as const },
    planned: { label: 'กำลังทำ', variant: 'neutral' as const },
  }
  return (
    <header className="tint-teal mb-8 rounded-xl border border-line px-6 py-6 shadow-e1">
      <div className="flex flex-col gap-3">
        {crumbs && <Breadcrumb items={crumbs} />}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="accent-bar font-heading text-3xl font-semibold text-fg">{title}</h1>
          {status && <Badge variant={statusMap[status].variant}>{statusMap[status].label}</Badge>}
        </div>
        {description && <p className="max-w-3xl text-fg-soft">{description}</p>}
        {children}
      </div>
    </header>
  )
}
