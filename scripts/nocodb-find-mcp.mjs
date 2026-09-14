// เปิดหน้า Integrations ของ NocoDB เพื่อหาที่ตั้งค่า MCP server (URL + โทเคน)
import { chromium } from 'playwright'
import fs from 'fs'

const cred = fs.readFileSync('/opt/nocodb/ADMIN_FIRST_LOGIN.txt', 'utf8')
const email = cred.match(/อีเมล:\s*(\S+)/)[1]
const pw = cred.match(/รหัสผ่านชั่วคราว:\s*(\S+)/)[1]

const b = await chromium.launch({ args: ['--no-sandbox'] })
const ctx = await b.newContext({ viewport: { width: 1500, height: 950 }, locale: 'th' })
const page = await ctx.newPage()
const reqs = []
page.on('request', (r) => { if (/mcp/i.test(r.url())) reqs.push(r.method() + ' ' + r.url()) })

await page.goto('https://db.bizxai.cloud/signin', { waitUntil: 'networkidle' })
await page.fill('input[type="text"], input[type="email"]', email)
await page.fill('input[type="password"]', pw)
await page.click('button[type="submit"]')
await page.waitForTimeout(6000)
const skip = page.getByRole('button', { name: /skip/i })
if (await skip.count()) { await skip.first().click().catch(() => {}); await page.waitForTimeout(1200) }

for (const name of ['Integrations', 'Settings']) {
  const el = page.getByText(name, { exact: true }).first()
  if (await el.count()) {
    await el.click().catch(() => {})
    await page.waitForTimeout(4000)
    const txt = ((await page.textContent('body')) ?? '').replace(/\s+/g, ' ')
    console.log(`\n=== คลิก "${name}" → ${new URL(page.url()).pathname} ===`)
    console.log(txt.slice(0, 700))
    await page.screenshot({ path: `/tmp/nocodb-${name.toLowerCase()}.png` })
  } else {
    console.log(`\nไม่พบเมนู "${name}"`)
  }
}
console.log('\nคำขอเกี่ยวกับ MCP ที่เห็น:', reqs.length ? [...new Set(reqs)].slice(0, 5) : 'ไม่มี')
await b.close()
