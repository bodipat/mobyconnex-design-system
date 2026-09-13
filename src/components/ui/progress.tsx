import { cn } from '@/lib/cn'

export function Progress({ value = 0, className, label }: { value?: number; className?: string; label?: string }) {
  const v = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <div className="flex justify-between text-xs text-muted">
          <span>{label}</span>
          <span>{v}%</span>
        </div>
      )}
      <div role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} className="h-2 w-full overflow-hidden rounded-full bg-surface-3">
        <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${v}%` }} />
      </div>
    </div>
  )
}
