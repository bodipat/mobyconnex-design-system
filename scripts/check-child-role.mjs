/**
 * ทดสอบบทบาทลูกแบบครบวงจร (แก้ไขตามโครงฟอร์มจริงของแอป)
 * 1) แม่ตั้งรหัสผ่านให้ดาเนียล → 2) เปิดใช้งาน → 3) ลูกเข้าใช้ + ตรวจสิทธิ์
 * 4) แม่ปิดใช้งานคืน → 5) ยืนยันว่าลูกเข้าไม่ได้อีก
 * รัน: MOM_PW='...' KID_PW='...' node scripts/check-child-role.mjs
 */
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'https://money.bizxai.cloud'
const MOM = { id: 'mae@mobyconnex.local', pw: process.env.MOM_PW }
const KID = { id: 'daniel@mobyconnex.local', pw: process.env.KID_PW }
if (!MOM.pw || !KID.pw) throw new Error('ต้องส่ง MOM_PW และ KID_PW ทาง env')
if (KID.pw.length < 14) throw new Error('รหัสผ่านต้องยาวอย่างน้อย 14 ตัว')

const browser = await chromium.launch({ args: ['--no-sandbox'] })

async function login(creds) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'th-TH' })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await page.fill('input[name="identifier"]', creds.id)
  await page.fill('input[type="password"]', creds.pw)
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => null),
    page.click('button[type="submit"]'),
  ])
  await page.waitForTimeout(800)
  return { ctx, page, errors }
}

const submit = async (page, btn) => {
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => null),
    btn.click(),
  ])
  await page.waitForTimeout(900)
}

const mom = await login(MOM)
const openMembers = async () => {
  await mom.page.goto(`${BASE}/members`, { waitUntil: 'networkidle' })
  return mom.page.locator('tr', { hasText: 'daniel' }).first()
}

// 1) ตั้งรหัสผ่านให้ดาเนียล
let row = await openMembers()
console.log('=== 1) แม่ตั้งรหัสผ่านให้ดาเนียล ===')
await row.locator('input[name="password"]').fill(KID.pw)
await submit(mom.page, row.getByRole('button', { name: 'ตั้งรหัสผ่าน' }))

// 2) เปิดใช้งาน (ปุ่มจะกดได้หลังมีรหัสผ่านเท่านั้น)
row = await openMembers()
const enableBtn = row.getByRole('button', { name: 'เปิดใช้งาน' })
console.log(`  ปุ่มเปิดใช้งานพร้อมกดหรือยัง: ${!(await enableBtn.isDisabled())}`)
if (await enableBtn.isDisabled()) {
  console.log('  ⚠️ ยังกดไม่ได้ — หยุดเพื่อตรวจสอบ')
  await browser.close()
  process.exit(2)
}
console.log('=== 2) แม่เปิดใช้งานบัญชีลูก ===')
await submit(mom.page, enableBtn)
const afterEnable = ((await mom.page.textContent('body')) ?? '').replace(/\s+/g, ' ')
console.log(`  สถานะในหน้า: ${afterEnable.includes('ใช้งานอยู่') ? 'ใช้งานอยู่' : afterEnable.includes('ปิดการใช้งาน') ? 'ยังปิด' : '(อ่านไม่ชัด)'}`)
await mom.page.screenshot({ path: '/tmp/mf-family-members-open.png', fullPage: true })

// 3) ลูกเข้าใช้ + ตรวจสิทธิ์
const kid = await login(KID)
console.log('=== 3) ลูกเข้าใช้งาน ===')
console.log(`  หน้าแรกที่ถึง : ${kid.page.url()}`)
console.log(`  error ในหน้า   : ${kid.errors.length}`)
const kidText = ((await kid.page.textContent('body')) ?? '').replace(/\s+/g, ' ')
console.log(`  ชื่อ/บทบาทที่แสดง: ${(kidText.match(/ดาเนียล|บุตร|ลูก/g) ?? []).slice(0, 3).join(', ') || '(ไม่พบ)'}`)
const navs = [...new Set(await kid.page.$$eval('nav a, header a', (as) => as.map((a) => a.textContent.trim()).filter(Boolean)))]
console.log(`  เมนูที่เห็น     : ${navs.join(' | ')}`)
console.log(`  มีเมนูสมาชิก    : ${navs.some((t) => t.includes('สมาชิก'))}`)
for (const path of ['/app', '/transactions', '/liabilities', '/members', '/budget', '/assets']) {
  await kid.page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' }).catch(() => null)
  await kid.page.waitForTimeout(500)
  const body = ((await kid.page.textContent('body')) ?? '').replace(/\s+/g, ' ')
  const amounts = (body.match(/฿[\d,]+/g) ?? []).slice(0, 4).join(' ')
  await kid.page.screenshot({ path: `/tmp/mf-child${path.replace(/\//g, '-')}.png`, fullPage: true })
  console.log(`  ${path.padEnd(14)} → ${new URL(kid.page.url()).pathname.padEnd(14)} ยอดที่เห็น: ${amounts || '(ไม่มี)'}`)
}

// 4) ปิดใช้งานคืน
row = await openMembers()
console.log('=== 4) แม่ปิดใช้งานบัญชีลูกคืน ===')
const disableBtn = row.getByRole('button', { name: 'ปิดใช้งาน' })
if (await disableBtn.count()) {
  await submit(mom.page, disableBtn)
  const t = ((await mom.page.textContent('body')) ?? '').replace(/\s+/g, ' ')
  console.log(`  ผล: ${t.includes('ปิดการใช้งาน') ? 'ปิดแล้ว' : '(อ่านไม่ชัด)'}`)
} else {
  console.log('  ⚠️ ไม่พบปุ่มปิดใช้งาน')
}

// 5) ยืนยันว่าลูกเข้าไม่ได้อีก
const again = await login(KID)
const againText = ((await again.page.textContent('body')) ?? '').replace(/\s+/g, ' ')
console.log('=== 5) ลูกพยายามเข้าใหม่ ===')
console.log(`  หน้า: ${again.page.url()}`)
console.log(`  แจ้งระงับบัญชี: ${againText.includes('ยังไม่เปิดใช้งาน')}`)

await browser.close()
