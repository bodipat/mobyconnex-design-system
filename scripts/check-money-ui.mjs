/**
 * ตรวจ UI ของ Moby Finance หลังเปลี่ยนเป็นระบบดีไซน์ MobyConnex
 * วัดค่าจริงจากเบราว์เซอร์: ฟอนต์ที่โหลดได้ · สีที่คำนวณได้ · คำขอออกนอกเครื่อง
 * รัน: node /root/shot_mf_login.mjs [url]
 */
import { chromium } from 'playwright'

const URL = process.argv[2] ?? 'https://money.bizxai.cloud/login'
const OUT = '/tmp'

const browser = await chromium.launch({ args: ['--no-sandbox'] })

for (const [label, viewport, dsf] of [
  ['desktop', { width: 1280, height: 900 }, 1],
  ['mobile', { width: 390, height: 844 }, 2],
]) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: dsf, locale: 'th-TH' })
  const external = []
  const page = await context.newPage()
  page.on('request', (r) => {
    const u = r.url()
    if (!u.startsWith('https://money.bizxai.cloud') && !u.startsWith('data:')) external.push(u)
  })
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(800)

  const info = await page.evaluate(async () => {
    await document.fonts.ready
    const cs = (sel, prop) => {
      const el = document.querySelector(sel)
      return el ? getComputedStyle(el)[prop] : null
    }
    return {
      title: document.title,
      fontsLoaded: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`),
      // ตรวจด้วยข้อความไทย เพราะเบราว์เซอร์โหลดเฉพาะ subset ที่ใช้จริง (ชุดไทย)
      kanitReady: document.fonts.check('600 24px Kanit', 'สรุปยอด'),
      plexReady: document.fonts.check('400 15px "IBM Plex Sans Thai Looped"', 'ยอดเงินรวม'),
      bodyBg: cs('body', 'backgroundColor'),
      bodyFont: cs('body', 'fontFamily'),
      h1Font: cs('h1', 'fontFamily'),
      cardBg: cs('.auth-card', 'backgroundColor'),
      cardRadius: cs('.auth-card', 'borderRadius'),
      buttonBg: cs('.action', 'backgroundColor'),
      buttonColor: cs('.action', 'color'),
      buttonRadius: cs('.action', 'borderRadius'),
      inputRadius: cs('input[name="email"], input[name="password"]', 'borderRadius'),
      inputBorder: cs('input[name="email"], input[name="password"]', 'borderColor'),
      rootChildren: document.getElementById('root')?.children.length ?? 'n/a',
    }
  })

  const file = `${OUT}/mf-login-${label}.png`
  await page.screenshot({ path: file, fullPage: true })

  console.log(`===== ${label} (${viewport.width}x${viewport.height}) =====`)
  console.log(`  <title>            : ${info.title}`)
  console.log(`  ฟอนต์Kanitพร้อม    : ${info.kanitReady ? '✅' : '❌'} · IBM Plex พร้อม: ${info.plexReady ? '✅' : '❌'}`)
  console.log(`  ฟอนต์ที่โหลด       : ${[...new Set(info.fontsLoaded)].join(' | ') || '(ไม่พบ)'}`)
  console.log(`  body font-family   : ${info.bodyFont}`)
  console.log(`  h1 font-family     : ${info.h1Font}`)
  console.log(`  พื้นหลัง body      : ${info.bodyBg}`)
  console.log(`  การ์ด: พื้น ${info.cardBg} · มุมโค้ง ${info.cardRadius}`)
  console.log(`  ปุ่ม: พื้น ${info.buttonBg} · ตัวอักษร ${info.buttonColor} · มุมโค้ง ${info.buttonRadius}`)
  console.log(`  ช่องกรอก: มุมโค้ง ${info.inputRadius} · ขอบ ${info.inputBorder}`)
  console.log(`  คำขอออกนอกเครื่อง  : ${external.length === 0 ? '✅ ไม่มี' : '⚠️ ' + external.slice(0, 5).join(', ')}`)
  console.log(`  error ในหน้า       : ${errors.length === 0 ? '✅ ไม่มี' : '❌ ' + errors.slice(0, 3).join(' / ')}`)
  console.log(`  ภาพหน้าจอ         : ${file}`)
  await context.close()
}

await browser.close()
