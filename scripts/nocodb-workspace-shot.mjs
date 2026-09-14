// ถ่ายภาพหน้าจอหลังล็อกอิน (ไว้แนบรายงาน) + ตรวจว่าแอปทำงานปกติ
import { chromium } from 'playwright'
import fs from 'fs'

const cred = fs.readFileSync('/opt/nocodb/ADMIN_FIRST_LOGIN.txt', 'utf8')
const email = cred.match(/อีเมล:\s*(\S+)/)[1]
const pw = cred.match(/รหัสผ่านชั่วคราว:\s*(\S+)/)[1]

const b = await chromium.launch({ args: ['--no-sandbox'] })
const page = await (await b.newContext({ viewport: { width: 1400, height: 880 }, locale: 'th' })).newPage()
const errs = []
page.on('pageerror', (e) => errs.push(String(e).slice(0, 90)))
page.on('console', (m) => { if (/refused to|violates/i.test(m.text())) errs.push('CSP: ' + m.text().slice(0, 80)) })

await page.goto('https://db.bizxai.cloud/signin', { waitUntil: 'networkidle' })
await page.fill('input[type="text"], input[type="email"]', email)
await page.fill('input[type="password"]', pw)
await page.click('button[type="submit"]')
await page.waitForTimeout(7000)

// ปิดทัวร์แนะนำถ้ามี
const skip = page.getByRole('button', { name: /skip/i })
if (await skip.count()) { await skip.first().click().catch(() => {}); await page.waitForTimeout(1500) }

await page.screenshot({ path: '/tmp/nocodb-workspace.png' })
const txt = ((await page.textContent('body')) ?? '').replace(/\s+/g, ' ')
console.log('URL:', page.url())
console.log('ข้อความหน้าเวิร์กสเปซ:', txt.slice(0, 180))
console.log('จำนวนตาราง/เมนูที่เห็น:', (await page.$$eval('button, [role="button"]', (e) => e.length)))
console.log('ปัญหาที่พบ:', errs.length ? [...new Set(errs)].slice(0, 4) : 'ไม่มี ✓')
await b.close()
