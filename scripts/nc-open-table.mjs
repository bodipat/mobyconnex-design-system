// เปิดตาราง Topics แล้วสำรวจปุ่มที่ใช้เพิ่มมุมมอง (เพื่อสร้าง Gallery)
import { chromium } from 'playwright'
import fs from 'fs'

const cred = fs.readFileSync('/opt/nocodb/ADMIN_FIRST_LOGIN.txt', 'utf8')
const email = cred.match(/อีเมล:\s*(\S+)/)[1]
const pw = cred.match(/รหัสผ่านชั่วคราว:\s*(\S+)/)[1]
const { base_id, ws } = JSON.parse(fs.readFileSync('/root/nc_pilot_ids.json', 'utf8'))

const b = await chromium.launch({ args: ['--no-sandbox'] })
const page = await (await b.newContext({ viewport: { width: 1500, height: 950 }, locale: 'th' })).newPage()
await page.goto('https://db.bizxai.cloud/signin', { waitUntil: 'networkidle' })
await page.fill('input[type="text"], input[type="email"]', email)
await page.fill('input[type="password"]', pw)
await page.click('button[type="submit"]')
await page.waitForTimeout(6000)
await page.goto(`https://db.bizxai.cloud/${ws}/${base_id}`, { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(4000)

// คลิกตาราง Topics
await page.getByText('Topics', { exact: true }).first().click().catch(() => {})
await page.waitForTimeout(6000)
console.log('URL:', page.url())
await page.screenshot({ path: '/tmp/nc-topics-grid.png' })

const rows = await page.$$eval('tr', (trs) => trs.map((t) => (t.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 70)).filter(Boolean))
console.log(`แถวในตาราง (${rows.length}):`)
rows.slice(0, 5).forEach((r) => console.log('   •', r))

const btns = await page.$$eval('button, [role="button"], [data-testid]', (els) =>
  els.map((e) => ({
    t: (e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 24),
    id: e.getAttribute('data-testid') || '',
    cls: (e.className || '').toString().slice(0, 45),
  })).filter((x) => x.t || x.id).slice(0, 60))
console.log('\nปุ่มที่พบ (เฉพาะที่มี testid หรือข้อความสั้น):')
btns.filter((x) => x.id || x.t.length <= 12).slice(0, 25).forEach((x) => console.log(`   [${x.id}] "${x.t}"`))
await b.close()
