// เรนเดอร์คู่มือ HTML → PDF (A4) ด้วย Chromium ของ Playwright
import { chromium } from 'playwright'

const html = 'file:///root/voicestudio-guide/guide.html'
const out = '/root/voicestudio-guide/VoiceStudio-Mac-mini-M4-Guide.pdf'

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.goto(html, { waitUntil: 'load' })
await page.waitForTimeout(1500) // ให้ฟอนต์ base64 โหลดเสร็จ
const warn = []
page.on('console', (m) => warn.push(m.text()))
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true })
console.log('สร้าง PDF:', out)
// เก็บภาพตัวอย่างหน้าละ 1 ใบไว้ตรวจสายตา (หน้า 1, 3, 6)
await page.setViewportSize({ width: 794, height: 1123 })
for (const p of [0, 2, 5]) {
  await page.evaluate((i) => {
    const pages = document.querySelectorAll('.page')
    pages[i].scrollIntoView()
  }, p)
  await page.waitForTimeout(300)
  await page.screenshot({ path: `/tmp/vs/guide-page${p + 1}.png` })
}
console.log('ภาพตรวจ: /tmp/vs/guide-page1.png, guide-page3.png, guide-page6.png')
await browser.close()
