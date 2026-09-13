/**
 * ทดสอบการใช้งานจริงหลังเปิดระบบสมาชิก: ล็อกอินด้วยอีเมลสมมุติ + ดูหน้าจัดการสมาชิก
 * รัน: MOM_PW='...' node scripts/check-family-login.mjs
 */
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'https://money.bizxai.cloud'
const MOM = { id: 'mae@mobyconnex.local', pw: process.env.MOM_PW }
if (!MOM.pw) throw new Error('ต้องส่ง MOM_PW ทาง env')

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const results = []

async function attempt(label, { identifier, password }) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'th-TH' })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  const inputs = await page.$$eval('input', (els) => els.map((e) => `${e.name}:${e.type}`))
  await page.fill('input[name="identifier"]', identifier).catch(async () => {
    await page.fill('input[name="email"]', identifier)
  })
  await page.fill('input[type="password"]', password)
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => null),
    page.click('button[type="submit"]'),
  ])
  await page.waitForTimeout(1200)
  const text = (await page.textContent('body')) ?? ''
  const shot = `/tmp/mf-family-${label}.png`
  await page.screenshot({ path: shot, fullPage: true })
  const out = {
    label,
    inputs,
    finalUrl: page.url(),
    pageErrors: errors.length,
    hasDisabledMessage: text.includes('ยังไม่เปิดใช้งาน'),
    hasGenericError: text.includes('ไม่ถูกต้อง') || text.includes('ผิดพลาด') || text.includes('ไม่สำเร็จ'),
    h1: (await page.textContent('h1').catch(() => null)) ?? '(ไม่มี h1)',
    shot,
  }
  return { ctx, page, out }
}

// 1) เข้าสู่ระบบในฐานะคุณแม่ (ผู้ปกครอง)
const mom = await attempt('mom', { identifier: MOM.id, password: MOM.pw })
console.log('=== 1) ล็อกอินคุณแม่ ===')
console.log(`  ฟิลด์ในหน้า login : ${mom.out.inputs.join(', ')}`)
console.log(`  ไปถึงหน้า         : ${mom.out.finalUrl}`)
console.log(`  h1               : ${mom.out.h1}`)
console.log(`  error ในหน้า      : ${mom.out.pageErrors}`)
const momText = ((await mom.page.textContent('body')) ?? '').replace(/\s+/g, ' ')
console.log(`  มีคำว่า 'ภาพรวม'   : ${momText.includes('ภาพรวม')}`)
console.log(`  เมนูที่เห็น (nav)  : ${await mom.page.$$eval('nav a, header a', (as) => as.map((a) => a.textContent.trim()).filter(Boolean).join(' | '))}`)
console.log(`  บทบาทที่แสดง       : ${momText.match(/(พ่อ|แม่|ผู้ปกครอง|เจ้าของระบบ)/)?.[0] ?? '(ไม่พบ)'}`)
console.log(`  ภาพ               : ${mom.out.shot}`)

// 2) หน้าจัดการสมาชิก
if (mom.out.finalUrl.includes('/app')) {
  await mom.page.goto(`${BASE}/members`, { waitUntil: 'networkidle' })
  await mom.page.waitForTimeout(800)
  const memberText = ((await mom.page.textContent('body')) ?? '').replace(/\s+/g, ' ')
  console.log('\n=== 2) หน้าจัดการสมาชิก (คุณแม่) ===')
  console.log(`  URL              : ${mom.page.url()}`)
  for (const who of ['mae', 'daniel', 'kristy', 'ดาเนียล', 'คริสตี้', 'แม่']) {
    console.log(`  แสดง '${who}': ${memberText.includes(who)}`)
  }
  console.log(`  ฟิลด์ในฟอร์มเพิ่มสมาชิก: ${await mom.page.$$eval('input, select', (els) => els.map((e) => `${e.tagName.toLowerCase()}:${e.name || e.id || '?'}`).join(', ') || '(ไม่พบ)')}`)
  console.log(`  ปุ่มต่าง ๆ        : ${await mom.page.$$eval('button', (bs) => bs.map((b) => b.textContent.trim()).filter(Boolean).slice(0, 8).join(' | '))}`)
  await mom.page.screenshot({ path: '/tmp/mf-family-members.png', fullPage: true })
  console.log('  ภาพ               : /tmp/mf-family-members.png')
}

// 3) พยายามเข้าด้วยบัญชีลูกที่ปิดอยู่
const kid = await attempt('kid-disabled', { identifier: 'daniel@mobyconnex.local', password: 'whatever-12345' })
console.log('\n=== 3) บัญชีลูกที่ปิดการใช้งาน ===')
console.log(`  ไปถึงหน้า         : ${kid.out.finalUrl}`)
console.log(`  ข้อความ 'ยังไม่เปิดใช้งาน': ${kid.out.hasDisabledMessage}`)
console.log(`  ข้อความผิดพลาดทั่วไป: ${kid.out.hasGenericError}`)
console.log(`  ภาพ               : ${kid.out.shot}`)

// 4) รหัสผ่านผิด (บัญชีแม่)
const bad = await attempt('mom-wrongpw', { identifier: 'mae@mobyconnex.local', password: 'wrong-password-9999' })
console.log('\n=== 4) รหัสผ่านผิด ===')
console.log(`  ไปถึงหน้า         : ${bad.out.finalUrl}`)
console.log(`  มีข้อความผิดพลาด   : ${bad.out.hasGenericError}`)
console.log(`  ภาพ               : ${bad.out.shot}`)

await browser.close()
