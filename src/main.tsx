import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/kanit/300.css'
import '@fontsource/kanit/400.css'
import '@fontsource/kanit/500.css'
import '@fontsource/kanit/600.css'
import '@fontsource/ibm-plex-sans-thai-looped/300.css'
import '@fontsource/ibm-plex-sans-thai-looped/400.css'
import '@fontsource/ibm-plex-sans-thai-looped/500.css'
import '@fontsource/ibm-plex-sans-thai-looped/600.css'
import '@fontsource/inter/400.css'
import './styles/global.css'
import App from './App'
import { clearLegacyTheme, initialTheme } from './lib/storage'

clearLegacyTheme() // ค่า 'dark' ที่ระบบบันทึกให้เองสมัยก่อน ไม่ใช้แล้ว
const theme = initialTheme()
try {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.dataset.theme = theme
} catch {
  /* ข้ามได้ ไม่กระทบการแสดงผล */
}

function mount() {
  const el = document.getElementById('root')
  if (!el) return
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
}

// แสดงข้อความแนะนำถ้า mount ไม่สำเร็จ (แทนหน้าขาว)
try {
  mount()
} catch (err) {
  const fb = document.getElementById('boot-fallback')
  if (fb) (fb as HTMLElement).style.display = 'block'
  // เก็บไว้ให้เห็นในคอนโซล ไม่กลืน error
  console.error('[moby-design] mount failed', err)
}
