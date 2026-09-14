// ตรวจว่า CSP ถูกส่งจริง + chatwoot ถูกบล็อกจริง + แอปยังใช้งานได้
import { chromium } from 'playwright'

const b = await chromium.launch({ args: ['--no-sandbox'] })
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'th' })
const page = await ctx.newPage()

const blocked = []
const consoleMsgs = []
page.on('requestfailed', (r) => {
  const u = r.url()
  if (!u.includes('bizxai.cloud')) blocked.push(`${new URL(u).hostname} → ${r.failure()?.errorText ?? 'failed'}`)
})
page.on('console', (m) => { if (/content security|refused to/i.test(m.text())) consoleMsgs.push(m.text().slice(0, 120)) })

const resp = await page.goto('https://db.bizxai.cloud/signin', { waitUntil: 'networkidle', timeout: 60000 })
const csp = resp.headers()['content-security-policy'] ?? '(ไม่มี header)'
console.log('CSP ที่เซิร์ฟเวอร์ส่ง:', csp.slice(0, 110) + (csp.length > 110 ? '…' : ''))
await page.waitForTimeout(4000)

const hasLogin = await page.locator('input[type="password"]').count()
const title = await page.title()
console.log('หน้าโหลดปกติ:', hasLogin > 0 ? `ใช่ (มีช่องรหัสผ่าน ${hasLogin} ช่อง) · title="${title}"` : 'ไม่ — ไม่พบฟอร์มล็อกอิน')
console.log('คำเตือน CSP:', consoleMsgs.length ? consoleMsgs.slice(0, 3) : 'ไม่มี')
console.log('คำขอภายนอกที่ถูกบล็อก:', blocked.length ? [...new Set(blocked)] : 'ไม่มี')
await page.screenshot({ path: '/tmp/nocodb-csp.png' })
await b.close()
