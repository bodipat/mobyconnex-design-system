/**
 * ตัวช่วยอ่าน/เขียนค่าที่ปลอดภัย
 * เบราว์เซอร์ในแอป (LINE / Facebook / โหมดส่วนตัว) บางตัว "โยน error" เมื่อแตะ localStorage
 * ถ้าไม่ดักไว้ โมดูลจะพังตั้งแต่ import แรก แล้วทั้งหน้าจะขาว
 */

/**
 * คีย์เก็บธีมของผู้ใช้
 * ตั้งใจเปลี่ยนเป็น -v2 เพื่อไม่ให้ค่าเดิม (moby-theme = 'dark' ที่ระบบบันทึกให้ตอนเปิดครั้งแรก)
 * ถูกนำมาใช้ซ้ำ — ค่าเริ่มต้นของเว็บนี้คือโหมดสว่างเสมอ
 */
export const THEME_KEY = 'moby-theme-v2'
const LEGACY_KEY = 'moby-theme'

export function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* เบราว์เซอร์ไม่อนุญาต — ใช้ค่าเริ่มต้นแทน ไม่ทำให้แอปพัง */
  }
}

export function safeRemove(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* ข้ามได้ */
  }
}

/** ลบร่องรอยคีย์เก่าของระบบ (คนละตัวกับคีย์ที่ผู้ใช้ตั้งใจเลือก) */
export function clearLegacyTheme(): void {
  safeRemove(LEGACY_KEY)
}

/**
 * ธีมที่ใช้แสดงผล = ค่าที่ "ผู้ใช้กดเลือกเอง" ถ้ามี ไม่เช่นนั้นเป็นโหมดสว่าง
 * ไม่ใช้ prefers-color-scheme ของระบบเป็นตัวตัดสิน
 */
export function initialTheme(): 'light' | 'dark' {
  const chosen = safeGet(THEME_KEY)
  if (chosen === 'dark' || chosen === 'light') return chosen
  return 'light'
}

/** เรียกเฉพาะเมื่อผู้ใช้กดสลับเอง — ไม่เรียกอัตโนมัติตอน mount */
export function saveThemeChoice(theme: 'light' | 'dark'): void {
  safeSet(THEME_KEY, theme)
}
