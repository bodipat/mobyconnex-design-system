import { NavLink } from 'react-router-dom'
import { navSections } from '@/content/registry'
import { cn } from '@/lib/cn'

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="thin-scroll flex h-full flex-col gap-6 overflow-y-auto px-4 py-6" aria-label="เมนูเอกสาร">
      {navSections.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <p className="px-2 pb-1 font-heading text-xs font-semibold uppercase tracking-wider text-muted">{section.title}</p>
          {section.items.map((item) => (
            <NavLink
              key={item.slug}
              to={`/docs/${item.slug}`}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between rounded px-2.5 py-1.5 text-sm transition',
                  isActive ? 'bg-brand-soft font-medium text-brand' : 'text-fg-soft hover:bg-surface-2 hover:text-fg',
                )
              }
            >
              <span>{item.title}</span>
              {item.status === 'new' && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              {item.status === 'planned' && <span className="text-[10px] text-muted">เร็ว ๆ นี้</span>}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  )
}
