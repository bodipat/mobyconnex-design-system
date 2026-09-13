import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/cn'

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean; hint?: string }
>(({ className, children, required, hint, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    <LabelPrimitive.Root
      ref={ref}
      className={cn('text-sm font-medium text-fg', className)}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-[var(--danger)]">*</span>}
    </LabelPrimitive.Root>
    {hint && <span className="text-xs text-muted">{hint}</span>}
  </div>
))
Label.displayName = 'Label'

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null
  return <p className="text-xs text-[var(--danger)]">{children}</p>
}

export function Field({ label, required, hint, error, htmlFor, children }: {
  label?: string; required?: boolean; hint?: string; error?: string; htmlFor?: string; children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label htmlFor={htmlFor} required={required}>{label}</Label>}
      {hint && !label && <span className="text-xs text-muted">{hint}</span>}
      {children}
      <FieldError>{error}</FieldError>
    </div>
  )
}
