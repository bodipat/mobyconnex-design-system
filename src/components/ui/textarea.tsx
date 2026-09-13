import * as React from 'react'
import { cn } from '@/lib/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'min-h-[96px] w-full rounded border border-line bg-surface px-3 py-2 text-sm text-fg shadow-e1 transition',
        'placeholder:text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25',
        invalid && 'border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/25',
        className,
      )}
      {...props}
    />
  ),
)
Textarea.displayName = 'Textarea'
