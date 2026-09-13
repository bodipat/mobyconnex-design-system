import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        neutral: 'border-line bg-surface-2 text-fg-soft',
        brand: 'border-transparent bg-brand text-brand-fg',
        accent: 'border-transparent bg-accent text-accent-fg',
        soft: 'border-transparent bg-brand-soft text-brand',
        success: 'border-transparent bg-[var(--success-soft)] text-[var(--success)]',
        warning: 'border-transparent bg-[var(--warning-soft)] text-[var(--warning)]',
        danger: 'border-transparent bg-[var(--danger-soft)] text-[var(--danger)]',
        info: 'border-transparent bg-[var(--info-soft)] text-[var(--info)]',
        outline: 'border-line bg-transparent text-fg-soft',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { badgeVariants }
