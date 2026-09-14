// หาหน้าตั้งค่าของผู้ดูแล และหาสวิตช์ "ปิดสมัครสาธารณะ"
import { chromium } from 'playwright'
import fs from 'fs'

const cred = fs.readFileSync('/opt/nocodb/ADMIN_FIRST_LOGIN.txt', 'utf8')
const email = cred.match(/อีเมล:\s*(\S+)/)[1]
const pw = cred.match(/รหัสผ่านชั่วคราว:\s*(\S+)/)[1]

const b = await chromium.launch({ args: ['--no-sandbox'] })
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, locale: 'th' })
const page = await ctx.newPage()
await page.goto('https://db.bizxai.cloud/signin', { waitUntil: 'networkidle' })
await page.fill('input[type="text"], input[type="email"]', email)
await page.fill('input[type="password"]', pw)
await page.click('button[type="submit"]')
await page.waitForTimeout(5000)

for (const path of ['/account/settings', '/settings', '/team', '/account', '/admin']) {
  await page.goto('https://db.bizxai.cloud' + path, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => null)
  await page.waitForTimeout(2500)
  const txt = ((await page.textContent('body')) ?? '').replace(/\s+/g, ' ')
  const hits = ['invite', 'signup', 'sign up', 'สมัคร', 'เชิญ'].filter((k) => txt.toLowerCase().includes(k))
  console.log(`${path} → ${new URL(page.url()).pathname} · ความยาว ${txt.length} · คำที่พบ: ${hits.join(', ') || '-'}`)
  if (path === '/account/settings' || hits.length) {
    await page.screenshot({ path: `/tmp/nocodb-settings${path.replace(/\//g, '-')}.png`, fullPage: false })
  }
}
await b.close()
