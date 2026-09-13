import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 rounded-sm border border-border-strong bg-surface transition',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30',
      'data-[state=checked]:border-brand data-[state=checked]:bg-brand data-[state=checked]:text-brand-fg',
      'disabled:opacity-50',
      className,
    )}
    style={{ borderColor: 'var(--border-strong)' }}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="grid place-items-center text-current">
      <Check className="h-3.5 w-3.5" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = 'Checkbox'

export function CheckboxField({ label, description, id, ...props }: React.ComponentPropsWithoutRef<typeof Checkbox> & { label: string; description?: string }) {
  const autoId = React.useId()
  const cid = id ?? autoId
  return (
    <div className="flex items-start gap-3">
      <Checkbox id={cid} className="mt-0.5" {...props} />
      <div className="flex flex-col">
        <label htmlFor={cid} className="text-sm font-medium text-fg">{label}</label>
        {description && <span className="text-xs text-muted">{description}</span>}
      </div>
    </div>
  )
}
