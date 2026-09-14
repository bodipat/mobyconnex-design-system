// ถ่ายภาพหน้า HTML เต็มหน้าเป็น PNG
// ใช้: node shot-html.mjs <input.html> <output.png> [ความกว้าง]
import { chromium } from 'playwright'
import path from 'path'

const [input, output, width] = process.argv.slice(2)
const b = await chromium.launch({ args: ['--no-sandbox'] })
const page = await b.newPage({ viewport: { width: Number(width || 1500), height: 1000 }, deviceScaleFactor: 2 })
await page.goto('file://' + path.resolve(input), { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1200)
await page.screenshot({ path: output, fullPage: true })
const box = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight }))
console.log('ภาพ:', output, `${box.w}x${box.h}`)
await b.close()
