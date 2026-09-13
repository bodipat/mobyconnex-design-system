import * as React from 'react'
import { cn } from '@/lib/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, leading, trailing, ...props }, ref) => (
    <div
      className={cn(
        'flex h-10 items-center gap-2 rounded border border-line bg-surface px-3 text-sm shadow-e1 transition',
        'focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/25',
        invalid && 'border-[var(--danger)] focus-within:border-[var(--danger)] focus-within:ring-[var(--danger)]/25',
        props.disabled && 'opacity-60',
        className,
      )}
    >
      {leading && <span className="text-muted [&_svg]:h-4 [&_svg]:w-4">{leading}</span>}
      <input
        ref={ref}
        className="h-full w-full bg-transparent text-fg placeholder:text-muted focus:outline-none disabled:cursor-not-allowed"
        {...props}
      />
      {trailing && <span className="text-muted [&_svg]:h-4 [&_svg]:w-4">{trailing}</span>}
    </div>
  ),
)
Input.displayName = 'Input'
