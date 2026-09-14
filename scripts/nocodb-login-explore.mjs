// ล็อกอินเป็นผู้ดูแล แล้วสำรวจว่าหน้าตั้งค่าอยู่ที่ไหน (เพื่อไปปิดสมัครสาธารณะ)
import { chromium } from 'playwright'
import fs from 'fs'

const cred = fs.readFileSync('/opt/nocodb/ADMIN_FIRST_LOGIN.txt', 'utf8')
const email = cred.match(/อีเมล:\s*(\S+)/)[1]
const pw = cred.match(/รหัสผ่านชั่วคราว:\s*(\S+)/)[1]

const b = await chromium.launch({ args: ['--no-sandbox'] })
const page = await (await b.newContext({ viewport: { width: 1440, height: 950 }, locale: 'th' })).newPage()
const errs = []
page.on('pageerror', (e) => errs.push(String(e).slice(0, 100)))

await page.goto('https://db.bizxai.cloud/signin', { waitUntil: 'networkidle' })
await page.fill('input[type="text"], input[type="email"]', email)
await page.fill('input[type="password"]', pw)
await page.click('button[type="submit"]')
await page.waitForTimeout(6000)
console.log('URL หลังล็อกอิน:', page.url())
await page.screenshot({ path: '/tmp/nocodb-after-login.png', fullPage: false })

const links = await page.$$eval('a[href]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))].filter(Boolean))
console.log('ลิงก์ในหน้า:', links.filter((h) => /setting|account|team|admin/i.test(h)).slice(0, 12))
console.log('ปุ่มทั้งหมด:', (await page.$$eval('button', (bs) => bs.map((x) => (x.textContent || '').trim()).filter(Boolean))).slice(0, 12))
console.log('ข้อผิดพลาดในหน้า:', errs.length ? errs.slice(0, 3) : 'ไม่มี ✓')
await b.close()
