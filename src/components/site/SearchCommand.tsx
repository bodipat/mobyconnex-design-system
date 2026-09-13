import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { Search } from 'lucide-react'
import { allDocs } from '@/content/registry'

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition hover:bg-surface-2"
      >
        <Search className="h-4 w-4" />
        <span>ค้นหาเอกสาร…</span>
        <kbd className="ml-auto rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">⌘K</kbd>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-[12vh]" onClick={() => setOpen(false)}>
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface shadow-e3" onClick={(e) => e.stopPropagation()}>
        <Command shouldFilter>
          <div className="flex items-center gap-2 border-b border-line px-4">
            <Search className="h-4 w-4 text-muted" />
            <Command.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="พิมพ์เพื่อค้นหา เช่น ปุ่ม, สี, ฟอร์ม, toast"
              className="h-12 w-full bg-transparent text-sm text-fg placeholder:text-muted focus:outline-none"
            />
          </div>
          <Command.List className="thin-scroll max-h-96 overflow-y-auto p-2">
            <Command.Empty className="px-4 py-6 text-center text-sm text-muted">ไม่พบรายการที่ค้นหา</Command.Empty>
            {['เริ่มต้น', 'รากฐาน', 'คอมโพเนนต์', 'แพตเทิร์น', 'แนวทาง'].map((group) => {
              const items = allDocs.filter((d) => d.group === group)
              if (!items.length) return null
              return (
                <Command.Group key={group} heading={group} className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted">
                  {items.map((d) => (
                    <Command.Item
                      key={d.slug}
                      value={`${d.title} ${d.description} ${d.slug}`}
                      onSelect={() => {
                        navigate(`/docs/${d.slug}`)
                        setOpen(false)
                        setQuery('')
                      }}
                      className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm text-fg data-[selected=true]:bg-brand-soft data-[selected=true]:text-brand"
                    >
                      <span className="font-medium">{d.title}</span>
                      <span className="truncate text-xs text-muted">{d.description}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )
            })}
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
