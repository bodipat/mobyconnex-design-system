import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/lib/cn'

export function Avatar({ src, alt, fallback, size = 'md', className }: {
  src?: string; alt?: string; fallback?: string; size?: 'sm' | 'md' | 'lg'; className?: string
}) {
  const dim = size === 'sm' ? 'h-8 w-8 text-xs' : size === 'lg' ? 'h-14 w-14 text-base' : 'h-10 w-10 text-sm'
  return (
    <AvatarPrimitive.Root className={cn('relative flex shrink-0 overflow-hidden rounded-full border border-line', dim, className)}>
      {src && <AvatarPrimitive.Image src={src} alt={alt ?? ''} className="h-full w-full object-cover" />}
      <AvatarPrimitive.Fallback className="grid h-full w-full place-items-center bg-brand-soft font-heading font-medium text-brand">
        {fallback ?? '?'}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
