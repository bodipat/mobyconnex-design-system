import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/cn'

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition',
      'data-[state=unchecked]:bg-surface-3 data-[state=checked]:bg-brand',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-e1 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
  </SwitchPrimitive.Root>
))
Switch.displayName = 'Switch'

export function SwitchField({ label, description, id, ...props }: React.ComponentPropsWithoutRef<typeof Switch> & { label: string; description?: string }) {
  const autoId = React.useId()
  const sid = id ?? autoId
  return (
    <div className="flex items-start justify-between gap-4 rounded border border-line bg-surface p-4">
      <div className="flex flex-col">
        <label htmlFor={sid} className="text-sm font-medium text-fg">{label}</label>
        {description && <span className="text-xs text-muted">{description}</span>}
      </div>
      <Switch id={sid} {...props} />
    </div>
  )
}
