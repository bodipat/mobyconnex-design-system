// ถ่ายภาพแต่ละ element เป็นไฟล์ PNG แยกกัน
// ใช้: node shot-elements.mjs <input.html> <outDir> <selectorClass> <filePrefix>
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs'

const [input, outDir, cls, prefix] = process.argv.slice(2)
fs.mkdirSync(outDir, { recursive: true })
const b = await chromium.launch({ args: ['--no-sandbox'] })
const page = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 })
await page.goto('file://' + path.resolve(input), { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1200)

const els = await page.$$('.' + cls)
const names = []
for (let i = 0; i < els.length; i++) {
  const file = path.join(outDir, `${prefix}-${String.fromCharCode(97 + i)}.png`)
  await els[i].screenshot({ path: file })
  names.push(path.basename(file))
}
console.log('ถ่ายภาพสำเร็จ:', names.join(', '))
await b.close()
