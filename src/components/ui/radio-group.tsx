import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/cn'

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn('flex flex-col gap-3', className)} {...props} />
))
RadioGroup.displayName = 'RadioGroup'

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'h-5 w-5 shrink-0 rounded-full border bg-surface transition',
      'data-[state=checked]:border-[6px] data-[state=checked]:border-brand',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 disabled:opacity-50',
      className,
    )}
    style={{ borderColor: 'var(--border-strong)' }}
    {...props}
  >
    <RadioGroupPrimitive.Indicator />
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = 'RadioGroupItem'

export function RadioOption({ value, label, description, id }: { value: string; label: string; description?: string; id?: string }) {
  const autoId = React.useId()
  const rid = id ?? `${autoId}-${value}`
  return (
    <div className="flex items-start gap-3">
      <RadioGroupItem value={value} id={rid} className="mt-0.5" />
      <div className="flex flex-col">
        <label htmlFor={rid} className="text-sm font-medium text-fg">{label}</label>
        {description && <span className="text-xs text-muted">{description}</span>}
      </div>
    </div>
  )
}
