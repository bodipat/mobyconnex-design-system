import * as React from 'react'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'info' | 'success' | 'warning' | 'danger'

const map: Record<Variant, { icon: React.ReactNode; cls: string }> = {
  info: { icon: <Info className="h-5 w-5" />, cls: 'bg-[var(--info-soft)] text-[var(--info)] border-[var(--info)]/25' },
  success: { icon: <CheckCircle2 className="h-5 w-5" />, cls: 'bg-[var(--success-soft)] text-[var(--success)] border-[var(--success)]/25' },
  warning: { icon: <AlertTriangle className="h-5 w-5" />, cls: 'bg-[var(--warning-soft)] text-[var(--warning)] border-[var(--warning)]/25' },
  danger: { icon: <XCircle className="h-5 w-5" />, cls: 'bg-[var(--danger-soft)] text-[var(--danger)] border-[var(--danger)]/25' },
}

export function Alert({ variant = 'info', title, children, className, action }: {
  variant?: Variant; title?: string; children?: React.ReactNode; className?: string; action?: React.ReactNode
}) {
  return (
    <div role="alert" className={cn('flex gap-3 rounded-lg border p-4', map[variant].cls, className)}>
      <span className="mt-0.5 shrink-0">{map[variant].icon}</span>
      <div className="flex-1">
        {title && <p className="font-heading text-sm font-semibold">{title}</p>}
        {children && <div className="text-sm opacity-90">{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
