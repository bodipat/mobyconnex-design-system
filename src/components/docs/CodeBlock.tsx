import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/cn'

export function CodeBlock({ code, lang = 'tsx', className, filename }: { code: string; lang?: string; className?: string; filename?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    // ใน in-app browser / http บางแห่ง clipboard API ใช้ไม่ได้ → ถอยไปใช้ execCommand
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code)
      } else {
        const ta = document.createElement('textarea')
        ta.value = code
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
    } catch {
      setCopied(false)
    } finally {
      setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <div className={cn('overflow-hidden rounded-lg border border-line bg-[#0B1230] dark:bg-[#070E27]', className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-xs text-white/50">{filename ?? lang}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded border border-white/15 px-2 py-0.5 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'คัดลอกแล้ว' : 'คัดลอก'}
        </button>
      </div>
      <pre className="thin-scroll max-h-[420px] overflow-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-[#D7E3FF]">{code}</code>
      </pre>
    </div>
  )
}
