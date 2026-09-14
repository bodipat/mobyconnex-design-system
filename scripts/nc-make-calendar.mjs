// สร้างมุมมอง Calendar เพิ่ม แล้วถ่ายภาพทั้ง Gallery และ Calendar
import { chromium } from 'playwright'
import fs from 'fs'

const cred = fs.readFileSync('/opt/nocodb/ADMIN_FIRST_LOGIN.txt', 'utf8')
const email = cred.match(/อีเมล:\s*(\S+)/)[1]
const pw = cred.match(/รหัสผ่านชั่วคราว:\s*(\S+)/)[1]
const { base_id, ws, topics } = JSON.parse(fs.readFileSync('/root/nc_pilot_ids.json', 'utf8'))

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

// เปิด Gallery ที่สร้างไว้แล้วถ่ายภาพ
const galleryView = page.locator('[data-testid="view-item"], [data-testid^="view-sidebar-view-"]').filter({ hasText: /Gallery/i }).first()
if (await galleryView.count()) {
  await galleryView.click({ force: true })
  await page.waitForTimeout(4000)
  await page.screenshot({ path: '/tmp/nc-gallery-ready.png' })
  console.log('ถ่ายภาพ Gallery แล้ว · URL:', page.url())
}

// สร้างมุมมอง Calendar
await page.locator('[data-testid="nc-sidebar-table-create-view-btn"]').nth(0).click({ force: true })
await page.waitForTimeout(2000)
await page.getByText('Calendar', { exact: true }).first().click({ force: true })
await page.waitForTimeout(3000)
const inp = page.locator('[role="dialog"] input, .ant-modal input').first()
if (await inp.count()) await inp.fill('Calendar — ตารางเผยแพร่')
await page.waitForTimeout(500)
const createBtn = page.locator('[role="dialog"] button, .ant-modal button').filter({ hasText: /create view/i }).first()
if (await createBtn.count()) await createBtn.click({ force: true })
await page.waitForTimeout(6000)
console.log('URL หลังสร้าง Calendar:', page.url())
const views = await page.$$eval('[data-testid^="view-sidebar-view-"], [data-testid="view-item"]', (els) =>
  [...new Set(els.map((e) => (e.textContent || '').replace(/\s+/g, ' ').trim()).filter(Boolean))])
console.log('มุมมองทั้งหมด:', views)
await page.screenshot({ path: '/tmp/nc-calendar-ready.png' })
await b.close()
