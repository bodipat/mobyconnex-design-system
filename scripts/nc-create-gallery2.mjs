// สร้างมุมมอง Gallery — ทำทีละขั้น พิมพ์สถานะทุกขั้นเพื่อหาจุดที่พลาด
import { chromium } from 'playwright'
import fs from 'fs'

const cred = fs.readFileSync('/opt/nocodb/ADMIN_FIRST_LOGIN.txt', 'utf8')
const email = cred.match(/อีเมล:\s*(\S+)/)[1]
const pw = cred.match(/รหัสผ่านชั่วคราว:\s*(\S+)/)[1]
const { base_id, ws } = JSON.parse(fs.readFileSync('/root/nc_pilot_ids.json', 'utf8'))

const b = await chromium.launch({ args: ['--no-sandbox'] })
const page = await (await b.newContext({ viewport: { width: 1600, height: 980 }, locale: 'th' })).newPage()
await page.goto('https://db.bizxai.cloud/signin', { waitUntil: 'networkidle' })
await page.fill('input[type="text"], input[type="email"]', email)
await page.fill('input[type="password"]', pw)
await page.click('button[type="submit"]')
await page.waitForTimeout(6000)
await page.goto(`https://db.bizxai.cloud/${ws}/${base_id}`, { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(4000)
await page.locator('[data-testid="nc-tbl-title-Topics"]').first().click().catch(() => {})
await page.waitForTimeout(5000)

console.log('ขั้น 1: เปิดเมนูเพิ่มมุมมอง')
await page.locator('[data-testid="nc-sidebar-table-create-view-btn"]').nth(0).click({ force: true })
await page.waitForTimeout(2000)

console.log('ขั้น 2: เลือก Gallery')
const g = page.getByText('Gallery', { exact: true }).first()
console.log('   พบตัวเลือก Gallery:', await g.count())
await g.click({ force: true })
await page.waitForTimeout(3000)

console.log('ขั้น 3: หาไดอะล็อกตั้งชื่อ')
const dlg = await page.$$eval('[role="dialog"], .nc-modal-wrapper, .ant-modal', (ds) =>
  ds.map((d) => (d.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160)))
console.log('   ไดอะล็อก:', dlg.length ? dlg : 'ไม่พบ')

const inputs = await page.$$eval('[role="dialog"] input, .ant-modal input', (els) =>
  els.map((e) => ({ ph: e.getAttribute('placeholder') || '', val: e.value || '' })))
console.log('   ช่องกรอกในไดอะล็อก:', inputs)

const inp = page.locator('[role="dialog"] input, .ant-modal input').first()
if (await inp.count()) {
  await inp.fill('Gallery — ปฏิทินเนื้อหา')
  await page.waitForTimeout(600)
}
const createBtn = page.locator('[role="dialog"] button, .ant-modal button').filter({ hasText: /add view|create|ok|save/i }).first()
console.log('   ปุ่มยืนยัน:', await createBtn.count(), (await createBtn.count()) ? await createBtn.textContent() : '')
if (await createBtn.count()) await createBtn.click({ force: true })
await page.waitForTimeout(5000)

console.log('ขั้น 4: ผลลัพธ์ →', page.url())
await page.screenshot({ path: '/tmp/nc-gallery-final.png' })
const vt = await page.$$eval('[data-testid^="view-sidebar-view-"], [data-testid="view-item"]', (els) =>
  els.map((e) => (e.textContent || '').replace(/\s+/g, ' ').trim()).filter(Boolean))
console.log('   มุมมองในแถบข้าง:', [...new Set(vt)])
await b.close()
