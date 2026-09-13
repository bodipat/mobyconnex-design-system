/**
 * ตรวจเว็บด้วยเบราว์เซอร์จริง (headless) — หาสาเหตุหน้าขาว
 * รัน: node scripts/browser-check.mjs [url]
 * บันทึกภาพหน้าจอไว้ที่ /tmp/moby-desktop.png และ /tmp/moby-mobile.png
 */
import { chromium, devices } from 'playwright'

const URL = process.argv[2] ?? 'https://design.bizxai.cloud'

async function probe(label, { userAgent, viewport, blockStorage, screenshot, colorScheme, seedLegacyDark }) {
  const browser = await chromium.launch({ args: ['--no-sandbox'] })
  const context = await browser.newContext({
    userAgent,
    viewport,
    deviceScaleFactor: 2,
    locale: 'th-TH',
    colorScheme: colorScheme ?? 'light',
  })

  if (seedLegacyDark) {
    // จำลองเครื่องที่เคยเก็บค่า 'dark' ไว้จากระบบเวอร์ชันก่อน
    await context.addInitScript(() => {
      try {
        window.localStorage.setItem('moby-theme', 'dark')
      } catch {
        /* ข้าม */
      }
    })
  }

  if (blockStorage) {
    // จำลองเบราว์เซอร์ในแอปที่บล็อก localStorage (โยน error เมื่อแตะ)
    await context.addInitScript(() => {
      const boom = () => {
        throw new Error('SecurityError: storage blocked (simulated in-app browser)')
      }
      try {
        Object.defineProperty(window, 'localStorage', { get: boom, configurable: true })
      } catch {
        /* ข้าม */
      }
    })
  }

  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []
  const page = await context.newPage()

  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 300))
  })
  page.on('pageerror', (e) => pageErrors.push(String(e).slice(0, 300)))
  page.on('requestfailed', (r) => failedRequests.push(`${r.url()} :: ${r.failure()?.errorText}`))
  page.on('response', (r) => {
    if (r.status() >= 400) failedRequests.push(`${r.url()} :: HTTP ${r.status()}`)
  })

  const t0 = Date.now()
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 })
  let rootChildren = 0
  let title = ''
  let bodyText = ''
  let fallbackVisible = false
  try {
    await page.waitForFunction(() => {
      const r = document.getElementById('root')
      return r && r.children.length > 0
    }, { timeout: 12000 })
  } catch {
    /* จะรายงานว่าว่าง */
  }
  rootChildren = await page.evaluate(() => {
    const r = document.getElementById('root')
    return r ? r.children.length : -1
  })
  title = await page.title()
  const theme = await page.evaluate(() => document.documentElement.dataset.theme ?? '')
  // หัวเว็บต้องมีคำว่า MobyConnex และมองเห็นได้จริง (ทุกขนาดจอ)
  const brand = await page.evaluate(() => {
    const img = document.querySelector('header img[alt*="MobyConnex"]:not([aria-hidden="true"])')
    const span = [...document.querySelectorAll('header span')].find((s) =>
      (s.textContent ?? '').includes('MobyConnex'),
    )
    const el = img ?? span
    if (!el) return { found: false, visible: false }
    const r = el.getBoundingClientRect()
    const st = getComputedStyle(el)
    return {
      found: true,
      visible: st.display !== 'none' && st.visibility !== 'hidden' && r.width > 0 && r.height > 0,
      width: Math.round(r.width),
    }
  })
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  bodyText = (await page.evaluate(() => document.body.innerText || '')).slice(0, 160).replace(/\s+/g, ' ')
  fallbackVisible = await page.evaluate(() => {
    const fb = document.getElementById('boot-fallback')
    return !!(fb && getComputedStyle(fb).display !== 'none')
  })

  if (screenshot) {
    await page.screenshot({ path: screenshot, fullPage: false })
    console.log(`   ภาพหน้าจอ: ${screenshot}`)
  }

  console.log(`\n===== ${label} =====`)
  console.log(`  URL: ${URL}`)
  console.log(`  โหลดเสร็จใน ${Date.now() - t0} ms`)
  console.log(`  <title>: ${title}`)
  console.log(`  ธีมที่ใช้จริง: ${theme} (พื้นหลัง ${bg})`)
  console.log(`  โลโก้/ชื่อแบรนด์บนหัวเว็บ: ${brand.found ? (brand.visible ? `มองเห็น ✅ (กว้าง ${brand.width}px)` : 'มีแต่ถูกซ่อน ❌') : 'ไม่พบ ❌'}`)
  console.log(`  #root children: ${rootChildren} ${rootChildren > 0 ? '✅ เรนเดอร์แล้ว' : '❌ ว่าง (หน้าขาว)'}`)
  console.log(`  ข้อความในหน้า: ${bodyText || '(ว่าง)'}`)
  console.log(`  แสดงกล่อง boot-fallback: ${fallbackVisible}`)
  console.log(`  console errors (${consoleErrors.length}): ${consoleErrors.slice(0, 3).join(' | ') || '-'}`)
  console.log(`  page errors (${pageErrors.length}): ${pageErrors.slice(0, 3).join(' | ') || '-'}`)
  console.log(`  คำขอที่ล้มเหลว (${failedRequests.length}): ${failedRequests.slice(0, 3).join(' | ') || '-'}`)

  await browser.close()
  return rootChildren > 0 && brand.found && brand.visible
}

const okDesktop = await probe('เดสก์ท็อป (Chrome ปัจจุบัน)', {
  viewport: { width: 1440, height: 900 },
  screenshot: '/tmp/moby-desktop.png',
})

const okMobile = await probe('มือถือ (iPhone 13 viewport)', {
  ...devices['iPhone 13'],
  screenshot: '/tmp/moby-mobile.png',
})

const okDarkOS = await probe('มือถือที่ระบบตั้งโหมดมืด (ต้องได้โหมดสว่าง)', {
  userAgent: devices['iPhone 13'].userAgent,
  viewport: { width: 390, height: 844 },
  colorScheme: 'dark',
  screenshot: '/tmp/moby-darkos.png',
})

const okLegacyDark = await probe('เครื่องที่เคยจำค่า dark ไว้ (ต้องได้โหมดสว่าง)', {
  userAgent: devices['iPhone 13'].userAgent,
  viewport: { width: 390, height: 844 },
  colorScheme: 'dark',
  seedLegacyDark: true,
  screenshot: '/tmp/moby-legacydark.png',
})

const okInApp = await probe('จำลองเบราว์เซอร์ในแอป (บล็อก localStorage)', {
  userAgent: 'Mozilla/5.0 (Linux; Android 10; LINE 13.5.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109 Mobile Safari/537.36',
  viewport: { width: 390, height: 844 },
  blockStorage: true,
  screenshot: '/tmp/moby-inapp.png',
})

console.log(
  `\nสรุป: เดสก์ท็อป ${okDesktop ? 'ผ่าน' : 'ไม่ผ่าน'} · มือถือ ${okMobile ? 'ผ่าน' : 'ไม่ผ่าน'} · ` +
  `ระบบตั้งโหมดมืด ${okDarkOS ? 'ผ่าน' : 'ไม่ผ่าน'} · ค่า dark เก่า ${okLegacyDark ? 'ผ่าน' : 'ไม่ผ่าน'} · ` +
  `in-app ${okInApp ? 'ผ่าน' : 'ไม่ผ่าน'}`,
)
process.exit(okDesktop && okMobile && okDarkOS && okLegacyDark ? 0 : 1)
