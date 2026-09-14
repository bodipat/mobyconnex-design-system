// ถ่ายภาพหน้าเว็บ ai.bizxai.cloud เพื่อยืนยันโลโก้ใหม่ + ตรวจว่าเป็นภาพ (ไม่ใช่ HTML)
import { chromium } from 'playwright'

const b = await chromium.launch({ args: ['--no-sandbox'] })
const ctx = await b.newContext({ viewport: { width: 1280, height: 860 }, locale: 'th' })
const page = await ctx.newPage()
await page.goto('https://ai.bizxai.cloud/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(2500)
await page.screenshot({ path: '/tmp/owui-login.png', fullPage: false })
console.log('URL:', page.url())
console.log('ชื่อแอปบนหน้า:', (await page.textContent('body'))?.replace(/\s+/g, ' ').slice(0, 160))

// ตรวจว่าไฟล์ไอคอนที่เว็บอ้างถึงโหลดได้และเป็นรูปจริง
const links = await page.$$eval('link[rel*="icon"], link[rel="apple-touch-icon"]',
  (ls) => ls.map((l) => l.getAttribute('href')))
console.log('ไอคอนที่หน้าอ้างถึง:', links)
for (const href of links) {
  const abs = new URL(href, 'https://ai.bizxai.cloud/').href
  const r = await page.request.get(abs)
  console.log(`  ${abs} → ${r.status()} ${r.headers()['content-type']} ${(await r.body()).length} bytes`)
}
await b.close()
