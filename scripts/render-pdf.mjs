// เรนเดอร์ HTML → PDF (A4) แบบรับพารามิเตอร์
// ใช้: node render-pdf.mjs <input.html> <output.pdf> [โฟลเดอร์ภาพตรวจ]
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

const [input, output, shotDir] = process.argv.slice(2)
if (!input || !output) {
  console.error('ใช้: node render-pdf.mjs <input.html> <output.pdf> [shotDir]')
  process.exit(1)
}

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } })
const errs = []
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 120)) })
page.on('pageerror', (e) => errs.push(String(e).slice(0, 120)))

await page.goto('file://' + path.resolve(input), { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1800)

const pages = await page.$$eval('.page', (ps) => ps.length)
console.log('จำนวนหน้าตามโครงสร้าง:', pages)

await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true })
console.log('สร้าง PDF:', output, ((fs.statSync(output).size) / 1024 / 1024).toFixed(2) + ' MB')

if (shotDir) {
  fs.mkdirSync(shotDir, { recursive: true })
  const boxes = await page.$$eval('.page', (ps) => ps.map((p) => p.getBoundingClientRect().top + window.scrollY))
  for (let i = 0; i < boxes.length; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), boxes[i])
    await page.waitForTimeout(250)
    await page.screenshot({ path: `${shotDir}/page-${i + 1}.png` })
  }
  console.log('ภาพตรวจ:', shotDir)
}
console.log('ข้อผิดพลาดในหน้า:', errs.length ? [...new Set(errs)].slice(0, 4) : 'ไม่มี ✓')
await browser.close()
