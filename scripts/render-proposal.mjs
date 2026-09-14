// เรนเดอร์ข้อเสนอ HTML → PDF (A4) พร้อมเลขหน้าในฟุตเตอร์ (ภาษาอังกฤษ เพื่อเลี่ยงปัญหาฟอนต์ในฟุตเตอร์)
// ใช้: node render-proposal.mjs <input.html> <output.pdf> [shotDir]
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

const [input, output, shotDir] = process.argv.slice(2)
const FOOTER = `
<div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7.5px;color:#7A879C;
     padding:0 14mm;display:flex;justify-content:space-between;align-items:center;">
  <span>MobyConnex · Proposal: Marketing &amp; Sales Content Marketing OS and Agentic AI Workshop — RCD Designs Center Co., Ltd.</span>
  <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
</div>`

const b = await chromium.launch({ args: ['--no-sandbox'] })
const page = await b.newPage({ viewport: { width: 794, height: 1123 } })
const errs = []
page.on('pageerror', (e) => errs.push(String(e).slice(0, 120)))
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 120)) })

await page.goto('file://' + path.resolve(input), { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1800)

const sections = await page.$$eval('.page', (ps) => ps.length)
console.log('จำนวน section ในเอกสาร:', sections)

await page.pdf({
  path: output, format: 'A4', printBackground: true, preferCSSPageSize: true,
  displayHeaderFooter: true, headerTemplate: '<div></div>', footerTemplate: FOOTER,
  margin: { top: '15mm', right: '14mm', bottom: '16mm', left: '14mm' },
})
console.log('สร้าง PDF:', output, (fs.statSync(output).size / 1024 / 1024).toFixed(2) + ' MB')

if (shotDir) {
  fs.mkdirSync(shotDir, { recursive: true })
  const tops = await page.$$eval('.page', (ps) => ps.map((p) => p.getBoundingClientRect().top + window.scrollY))
  for (let i = 0; i < tops.length; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), tops[i])
    await page.waitForTimeout(250)
    await page.screenshot({ path: `${shotDir}/section-${i + 1}.png` })
  }
  console.log('ภาพตรวจ:', shotDir)
}
console.log('ข้อผิดพลาด:', errs.length ? [...new Set(errs)].slice(0, 3) : 'ไม่มี ✓')
await b.close()
