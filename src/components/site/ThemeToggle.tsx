import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { saveThemeChoice } from '@/lib/storage'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })

  // ปรับ DOM ตามธีมปัจจุบัน (ไม่บันทึกอัตโนมัติ)
  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', theme === 'dark')
      document.documentElement.dataset.theme = theme
    } catch {
      /* ไม่เป็นไร */
    }
  }, [theme])

  // บันทึกค่าเฉพาะเมื่อผู้ใช้กดเลือกเอง
  function toggle() {
    const next: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    saveThemeChoice(next)
  }

  return (
    <button
      type="button"
      aria-label={theme === 'dark' ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
      aria-pressed={theme === 'dark'}
      onClick={toggle}
      className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-fg-soft transition hover:bg-surface-2"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
