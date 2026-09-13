import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'rounded-lg border border-line bg-surface text-fg shadow-e3 font-body',
          title: 'font-heading font-medium',
          description: 'text-muted text-sm',
          actionButton: 'bg-brand text-brand-fg rounded px-2 py-1 text-xs',
          cancelButton: 'bg-surface-2 text-fg-soft rounded px-2 py-1 text-xs',
        },
      }}
    />
  )
}
