// สร้างมุมมอง Gallery ให้ตาราง Topics (เหมือนสไลด์) แล้วถ่ายภาพ
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

// 1) เปิดเมนูเพิ่มมุมมองของตาราง Topics
const addBtns = page.locator('[data-testid="nc-sidebar-table-create-view-btn"]')
console.log('ปุ่มเพิ่มมุมมอง:', await addBtns.count())
const target = (await addBtns.count()) > 1 ? addBtns.nth(0) : addBtns.first()  // ตัวแรก = Topics (บนสุด)
await target.click({ force: true })
await page.waitForTimeout(2500)
const menu = await page.$$eval('div[role="menu"] *, .ant-dropdown-menu-item, li', (els) =>
  els.map((e) => (e.textContent || '').replace(/\s+/g, ' ').trim()).filter((t) => t && t.length < 24).slice(0, 20))
console.log('ตัวเลือกในเมนู:', [...new Set(menu)].slice(0, 14))

const gallery = page.getByText(/^gallery$/i).first()
if (await gallery.count()) {
  await gallery.click({ force: true })
  await page.waitForTimeout(3500)
  // ตั้งชื่อมุมมองถ้ามีช่องให้กรอก
  const nameBox = page.locator('input[type="text"]').last()
  if (await nameBox.count()) await nameBox.fill('Gallery — ปฏิทินเนื้อหา').catch(() => {})
  await page.waitForTimeout(800)
  const confirm = page.getByRole('button', { name: /create|add view|save|ตกลง/i }).first()
  if (await confirm.count()) await confirm.click({ force: true }).catch(() => {})
  await page.waitForTimeout(4000)
  console.log('URL หลังสร้างมุมมอง:', page.url())
  await page.screenshot({ path: '/tmp/nc-gallery-final.png', fullPage: false })
  const bodyTxt = ((await page.textContent('body')) ?? '').replace(/\s+/g, ' ')
  console.log('มีคำว่า Gallery ในหน้า:', /gallery/i.test(bodyTxt))
  console.log('ตัวอย่างเนื้อหาบนการ์ด:', bodyTxt.slice(0, 200))
} else {
  console.log('ไม่พบตัวเลือก Gallery — ถ่ายภาพเมนูไว้ตรวจ:', '/tmp/nc-view-menu.png')
  await page.screenshot({ path: '/tmp/nc-view-menu.png' })
}
await b.close()
