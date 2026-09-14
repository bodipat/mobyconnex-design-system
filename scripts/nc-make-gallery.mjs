// ลบแถวว่าง + สร้างมุมมอง Gallery ผ่านหน้าจอ แล้วถ่ายภาพผลลัพธ์
import { chromium } from 'playwright'
import fs from 'fs'

const cred = fs.readFileSync('/opt/nocodb/ADMIN_FIRST_LOGIN.txt', 'utf8')
const email = cred.match(/อีเมล:\s*(\S+)/)[1]
const pw = cred.match(/รหัสผ่านชั่วคราว:\s*(\S+)/)[1]
const { base_id, topics, ws } = JSON.parse(fs.readFileSync('/root/nc_pilot_ids.json', 'utf8'))

const b = await chromium.launch({ args: ['--no-sandbox'] })
const ctx = await b.newContext({ viewport: { width: 1500, height: 950 }, locale: 'th' })
const page = await ctx.newPage()
page.on('pageerror', () => {})

await page.goto('https://db.bizxai.cloud/signin', { waitUntil: 'networkidle' })
await page.fill('input[type="text"], input[type="email"]', email)
await page.fill('input[type="password"]', pw)
await page.click('button[type="submit"]')
await page.waitForTimeout(6000)

// เข้าไปที่เบสของเรา
await page.goto(`https://db.bizxai.cloud/${ws}/${base_id}`, { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(5000)
console.log('URL:', page.url())
console.log('ข้อความ:', ((await page.textContent('body')) ?? '').replace(/\s+/g, ' ').slice(0, 260))

// ลบแถวว่าง (คลิกขวา/เมนูแถวแรก) — ทำผ่านปุ่ม Delete ถ้ามี
const rowsText = await page.$$eval('tr', (trs) => trs.map((t) => (t.textContent || '').replace(/\s+/g, ' ').slice(0, 60)))
console.log('แถวที่เห็น:', rowsText.slice(0, 4))

await page.screenshot({ path: '/tmp/nc-base-grid.png' })

// ลองเพิ่มมุมมอง Gallery
const addView = page.locator('button, [role="button"]').filter({ hasText: /add view|new view|เพิ่มมุมมอง/i }).first()
console.log('มีปุ่มเพิ่มมุมมอง:', await addView.count())
if (await addView.count()) {
  await addView.click().catch(() => {})
  await page.waitForTimeout(2500)
  await page.screenshot({ path: '/tmp/nc-view-menu.png' })
  const gallery = page.getByText(/gallery/i).first()
  if (await gallery.count()) {
    await gallery.click().catch(() => {})
    await page.waitForTimeout(3500)
    await page.screenshot({ path: '/tmp/nc-gallery.png' })
    console.log('สร้างมุมมอง Gallery แล้ว →', page.url())
  } else {
    console.log('ไม่พบตัวเลือก Gallery ในเมนู')
  }
}
await b.close()
