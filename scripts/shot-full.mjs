/**
 * ถ่ายภาพหน้าเต็ม (full page) ไว้ตรวจด้วยตา — รองรับเลือกธีม
 * ใช้: node scripts/shot-full.mjs [url] [out.png] [width] [light|dark]
 */
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'https://design.bizxai.cloud/'
const out = process.argv[3] ?? '/tmp/moby-full.png'
const width = Number(process.argv[4] ?? 1280)
const theme = (process.argv[5] ?? 'light') === 'dark' ? 'dark' : 'light'

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const context = await browser.newContext({
  viewport: { width, height: 900 },
  deviceScaleFactor: 1.5,
  locale: 'th-TH',
})

if (theme === 'dark') {
  // เลือกโหมดมืดแบบที่ผู้ใช้กดเอง (คีย์เดียวกับแอป)
  await context.addInitScript(() => {
    try {
      window.localStorage.setItem('moby-theme-v2', 'dark')
    } catch {
      /* ข้าม */
    }
  })
}

const page = await context.newPage()
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1200)
const applied = await page.evaluate(() => document.documentElement.dataset.theme)
const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
await page.screenshot({ path: out, fullPage: true })
console.log(`บันทึก: ${out} · ธีมที่ได้ ${applied} (พื้น ${bg}) · สั่ง ${theme}`)
await browser.close()
