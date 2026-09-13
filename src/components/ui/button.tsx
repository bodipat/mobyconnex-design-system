import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-fg hover:brightness-110 shadow-e1 focus-visible:ring-brand',
        accent: 'bg-accent text-accent-fg hover:brightness-105 shadow-e1 focus-visible:ring-accent',
        secondary: 'bg-surface-2 text-fg border border-line hover:bg-surface-3',
        outline: 'border border-brand text-brand bg-transparent hover:bg-brand-soft',
        ghost: 'text-fg-soft hover:bg-surface-2',
        danger: 'bg-[var(--danger)] text-white hover:brightness-110',
        link: 'text-brand underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-sm',
        md: 'h-10 px-4 text-sm rounded',
        lg: 'h-12 px-6 text-base rounded-lg',
        icon: 'h-10 w-10 rounded',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp: any = asChild ? Slot : 'button'
    // สำคัญ: Slot ของ Radix รับได้ "ลูกเดียว" เท่านั้น
    // ถ้าใส่ {loading && <Loader2/>} นำหน้า จะกลายเป็น 2 ลูก → error ตอน mount ทั้งหน้า
    const inner = asChild ? (
      children
    ) : (
      <>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </>
    )
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(asChild ? {} : { disabled: disabled || loading })}
        {...props}
      >
        {inner}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
