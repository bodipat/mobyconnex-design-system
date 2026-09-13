import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { SearchCommand } from './SearchCommand'
import { ThemeToggle } from './ThemeToggle'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-bg">
        <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-content items-center gap-4 px-4 sm:px-6">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="เปิดเมนู"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3" aria-label="MobyConnex ระบบดีไซน์">
              <img src="/brand/mobyconnex-horizontal.png" alt="MobyConnex" className="h-8 w-auto shrink-0 dark:hidden" />
              <img
                src="/brand/mobyconnex-horizontal-dark.png"
                alt="MobyConnex"
                aria-hidden="true"
                className="hidden h-8 w-auto shrink-0 dark:block"
              />
              <span className="hidden text-xs text-muted sm:block">ระบบดีไซน์</span>
            </Link>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden md:block"><SearchCommand /></div>
              <Link
                to="/showcase"
                className="hidden rounded-lg bg-brand px-3.5 py-2 font-heading text-sm font-medium text-brand-fg transition hover:brightness-110 sm:block"
              >
                ดูผลงาน / ติดต่อ
              </Link>
              <ThemeToggle />
            </div>
          </div>
          <div className="brand-rule" />
        </header>

        <div className="mx-auto flex w-full max-w-content flex-1 gap-8 px-4 sm:px-6">
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-line lg:block">
            <Sidebar />
          </aside>

          {mobileOpen && (
            <div className="fixed inset-x-0 top-16 z-30 max-h-[70vh] overflow-y-auto border-b border-line bg-surface shadow-e3 lg:hidden">
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          )}

          <main key={pathname} className="min-w-0 flex-1 py-8 lg:py-10">
            <Outlet />
          </main>
        </div>

        <footer className="panel-navy mt-16">
          <div className="brand-rule" />
          <div className="mx-auto flex max-w-content flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-3">
              {/* ใช้เวอร์ชันที่ประกอบลงพื้นกรมท่าโดยตรง (ทึบ) เพื่อไม่ให้มีรอยกล่องจากพื้นหลังต้นฉบับ */}
              {/* self-start จำเป็น: ในคอลัมน์ flex รูปจะถูก stretch ยืดกว้างจนสัดส่วนเพี้ยน */}
              <img src="/brand/mobyconnex-footer.png" alt="MobyConnex" className="h-9 w-auto self-start" />
              <p className="max-w-md text-sm">
                ระบบดีไซน์กลางของ MobyConnex — สี ตัวอักษร คอมโพเนนต์ และแพตเทิร์นงานธุรกิจ
                สำหรับทุกผลิตภัณฑ์และงานลูกค้า
              </p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div className="flex flex-col gap-2">
                <span className="font-heading text-white">ระบบดีไซน์</span>
                <Link to="/docs/logo" className="transition hover:text-[#7ED956]">โลโก้และแบรนด์</Link>
                <Link to="/docs/colors" className="transition hover:text-[#7ED956]">สี</Link>
                <Link to="/docs/typography" className="transition hover:text-[#7ED956]">ตัวอักษร</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-heading text-white">งานของเรา</span>
                <Link to="/showcase" className="transition hover:text-[#7ED956]">ผลงาน / ขอบเขตงาน</Link>
                <Link to="/" className="transition hover:text-[#7ED956]">บริการและราคา</Link>
                <a href="/#contact" className="transition hover:text-[#7ED956]">ติดต่อทีมงาน</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 py-5">
            <p className="mx-auto max-w-content px-4 text-xs text-white/50 sm:px-6">
              © {new Date().getFullYear()} MobyConnex · ใช้คีย์เวิร์ด ⌘K / Ctrl+K เพื่อค้นหาเอกสาร
            </p>
          </div>
        </footer>
      </div>
      <Toaster />
    </TooltipProvider>
  )
}
