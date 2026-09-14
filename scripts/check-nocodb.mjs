// ถ่ายภาพ NocoDB บนโดเมนจริง + ตรวจว่าหน้าโหลดครบ
import { chromium } from 'playwright'

const b = await chromium.launch({ args: ['--no-sandbox'] })
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'th' })
const page = await ctx.newPage()
const errs = []
page.on('pageerror', (e) => errs.push(String(e).slice(0, 120)))
page.on('response', (r) => { if (r.status() >= 400) errs.push(`${r.status()} ${r.url().slice(0, 90)}`) })

await page.goto('https://db.bizxai.cloud/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(3000)
await page.screenshot({ path: '/tmp/nocodb-signin.png' })
console.log('URL:', page.url())
console.log('title:', await page.title())
const txt = ((await page.textContent('body')) ?? '').replace(/\s+/g, ' ').slice(0, 200)
console.log('ข้อความบนหน้า:', txt)
console.log('ปัญหาที่พบ:', errs.length ? errs.slice(0, 5) : 'ไม่มี')
await b.close()
