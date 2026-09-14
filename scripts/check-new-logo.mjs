// ถ่ายภาพยืนยันโลโก้ใหม่บนเว็บจริง: หน้าหลัก (หัว/ท้าย) + หน้ารากฐาน/โลโก้
import { chromium } from 'playwright'

const BASE = process.argv[2] ?? 'https://design.bizxai.cloud'
const browser = await chromium.launch({ args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1.5 })
const errs = []
page.on('pageerror', (e) => errs.push(String(e).slice(0, 100)))
page.on('response', (r) => { if (r.url().includes('/brand/') && r.status() >= 400) errs.push(`${r.status()} ${r.url()}`) })

await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
await page.locator('header').first().screenshot({ path: '/tmp/logo-header.png' })
const footer = page.locator('footer').first()
await footer.scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await footer.screenshot({ path: '/tmp/logo-footer.png' })

await page.goto(BASE + '/foundations/logo', { waitUntil: 'networkidle' })
await page.waitForTimeout(900)
const cards = await page.$$eval('main img[src^="/brand/"]', (imgs) =>
  imgs.map((i) => ({ src: i.getAttribute('src'), nat: `${i.naturalWidth}x${i.naturalHeight}`,
                     shown: `${Math.round(i.getBoundingClientRect().width)}x${Math.round(i.getBoundingClientRect().height)}` })))
console.log('โลโก้ที่แสดงในหน้ารากฐาน:', cards.length, 'แบบ')
cards.forEach((c) => console.log(`  ${c.src.replace('/brand/', '')} — ไฟล์ ${c.nat} · แสดง ${c.shown}`))
await page.screenshot({ path: '/tmp/logo-gallery.png', fullPage: false, clip: { x: 0, y: 0, width: 1280, height: 1400 } })
console.log('ข้อผิดพลาด:', errs.length ? errs : 'ไม่มี ✓')
await browser.close()
