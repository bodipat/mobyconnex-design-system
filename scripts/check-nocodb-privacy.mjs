// ตรวจว่า NocoDB ไม่เรียกออกไปโดเมนภายนอกเลย ( кроме โดเมนเรา)
import { chromium } from 'playwright'

const b = await chromium.launch({ args: ['--no-sandbox'] })
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'th' })
const page = await ctx.newPage()
const external = new Set()
const all = new Set()

page.on('request', (r) => {
  try {
    const u = new URL(r.url())
    if (!u.hostname.endsWith('bizxai.cloud') && !u.hostname.startsWith('127.')) {
      external.add(u.hostname)
    }
    all.add(u.hostname)
  } catch { /* ignore */ }
})

await page.goto('https://db.bizxai.cloud/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(5000)
await page.screenshot({ path: '/tmp/nocodb-signin2.png' })

console.log('โดเมนที่เว็บเรียกทั้งหมด:', [...all].join(', '))
console.log('โดเมนภายนอก (ต้องว่าง):', external.size ? [...external].join(', ') : 'ไม่มี ✓')
console.log('URL สุดท้าย:', page.url())
await b.close()
