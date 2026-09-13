/**
 * ตรวจว่าในกา์ดหน้า login มีองค์ประกอบใดมีพื้นหลังทึบในโซนหัวข้อ (กล่องเทาจาง)
 * และตรวจสถานะ :invalid ของช่องกรอกที่ยังว่าง
 * รัน: node scripts/diag-login-box.mjs [url]
 */
import { chromium } from 'playwright'

const URL = process.argv[2] ?? 'https://money.bizxai.cloud/login'
const browser = await chromium.launch({ args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, locale: 'th-TH' })
await page.goto(URL, { waitUntil: 'networkidle' })

const report = await page.evaluate(() => {
  const card = document.querySelector('.auth-card') ?? document.body
  const cardBox = card.getBoundingClientRect()
  const withBg = []
  for (const el of card.querySelectorAll('*')) {
    const s = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    const hasBg = s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== 'transparent'
    const hasImg = s.backgroundImage !== 'none'
    const hasShadow = s.boxShadow !== 'none'
    if (hasBg || hasImg || hasShadow) {
      withBg.push({
        tag: el.tagName.toLowerCase(),
        cls: el.className?.toString().slice(0, 60),
        bg: s.backgroundColor,
        bgImage: hasImg ? s.backgroundImage.slice(0, 60) : '',
        shadow: hasShadow ? s.boxShadow.slice(0, 50) : '',
        box: [Math.round(r.x - cardBox.x), Math.round(r.y - cardBox.y), Math.round(r.width), Math.round(r.height)],
      })
    }
  }
  const inputs = [...document.querySelectorAll('form input')].map((i) => ({
    name: i.name,
    type: i.type,
    value: i.value ? '(มีค่า)' : '(ว่าง)',
    required: i.required,
    placeholder: i.placeholder || '(ไม่มี)',
    matchesInvalid: i.matches(':invalid'),
    matchesUserInvalid: i.matches(':user-invalid'),
    placeholderShown: i.matches(':placeholder-shown'),
    borderColor: getComputedStyle(i).borderColor,
  }))
  return { cardBg: getComputedStyle(card).backgroundColor, cardShadow: getComputedStyle(card).boxShadow, withBg, inputs }
})

console.log('พื้นหลังการ์ด:', report.cardBg)
console.log('เงาการ์ด   :', report.cardShadow)
console.log('\n=== องค์ประกอบที่มีพื้นหลัง/เงา ภายในกา์ด (พิกัดเทียบขอบการ์ด) ===')
for (const e of report.withBg) {
  console.log(`  <${e.tag} class="${e.cls}"> box=[x${e.box[0]} y${e.box[1]} ${e.box[2]}x${e.box[3]}] bg=${e.bg}${e.bgImage ? ' img=' + e.bgImage : ''}${e.shadow ? ' shadow=' + e.shadow : ''}`)
}
console.log('\n=== ช่องกรอก ===')
for (const i of report.inputs) {
  console.log(`  ${i.name} (${i.type}) ค่า=${i.value} required=${i.required} placeholder=${i.placeholder}`)
  console.log(`     :invalid=${i.matchesInvalid} · :user-invalid=${i.matchesUserInvalid} · :placeholder-shown=${i.placeholderShown} · ขอบ=${i.borderColor}`)
}

await browser.close()
