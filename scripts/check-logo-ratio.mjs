/**
 * ตรวจสัดส่วนโลโก้ header/footer: ขนาดไฟล์จริง vs ขนาดที่เรนเดอร์ + คลาสที่ใช้
 * รัน: node scripts/check-logo-ratio.mjs [url]
 */
import { chromium } from 'playwright'

const URL = process.argv[2] ?? 'https://design.bizxai.cloud/showcase'

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: 'th-TH', deviceScaleFactor: 2 })
const page = await context.newPage()
await page.goto(URL, { waitUntil: 'networkidle' })

const info = await page.evaluate(() =>
  [...document.querySelectorAll('footer img, header img')]
    .filter((img) => getComputedStyle(img).display !== 'none')
    .map((img) => {
    const r = img.getBoundingClientRect()
    const cs = getComputedStyle(img)
    return {
      where: img.closest('footer') ? 'footer' : 'header',
      src: img.getAttribute('src'),
      cls: img.className,
      natural: `${img.naturalWidth}x${img.naturalHeight}`,
      rendered: `${Math.round(r.width)}x${Math.round(r.height)}`,
      ratioRendered: r.height ? +(r.width / r.height).toFixed(2) : 0,
      ratioNatural: +(img.naturalWidth / img.naturalHeight).toFixed(2),
      cssHeight: cs.height,
      objectFit: cs.objectFit,
    }
  }),
)
for (const i of info) {
  console.log(`[${i.where}] ${i.src}`)
  console.log(`   ไฟล์จริง ${i.natural} (สัดส่วน ${i.ratioNatural}) · แสดงผล ${i.rendered} (สัดส่วน ${i.ratioRendered}) · css height ${i.cssHeight}`)
  console.log(`   class: ${i.cls}`)
  console.log(`   ${i.ratioRendered === i.ratioNatural ? '✅ สัดส่วนตรง' : '❌ สัดส่วนเพี้ยน (ยืด)'}`)
}
await browser.close()
