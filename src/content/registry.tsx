import type { ComponentType } from 'react'
import { LogoDoc, ColorsDoc, TypographyDoc, SpacingDoc, RadiusShadowDoc } from './foundations'
import { ButtonDoc, BadgeDoc, CardDoc, InputDoc, TextareaDoc, SelectDoc, CheckboxDoc, RadioDoc, SwitchDoc } from './components-a'
import {
  AlertDoc, DialogDoc, TabsDoc, TooltipDoc, DropdownDoc, AccordionDoc, TableDoc, AvatarDoc,
  ProgressDoc, SkeletonDoc, BreadcrumbDoc, EmptyStateDoc, ToastDoc,
} from './components-b'
import {
  SalesPagePattern, DashboardPattern, LineInboxPattern, BookingPattern, PricingPattern, OnboardingPattern,
} from './patterns'
import { VoiceDoc, A11yDoc, StartDoc } from './guidelines'

export type DocEntry = {
  slug: string
  title: string
  description: string
  group: string
  status?: 'stable' | 'beta' | 'new' | 'planned'
  Component: ComponentType
}

const make = (
  group: string,
  items: Array<[string, string, string, ComponentType, DocEntry['status']?]>,
): DocEntry[] =>
  items.map(([slug, title, description, Component, status]) => ({ slug, title, description, group, Component, status: status ?? 'stable' }))

export const startDocs = make('เริ่มต้น', [
  ['overview', 'ภาพรวมระบบดีไซน์', 'MobyConnex Design System คืออะไร และเริ่มใช้อย่างไร', StartDoc, 'new'],
])

export const foundationDocs = make('รากฐาน', [
  ['logo', 'โลโก้และแบรนด์', 'ไฟล์โลโก้ ระยะปลอดภัย และข้อห้าม', LogoDoc],
  ['colors', 'สี', 'จานสีแบรนด์และสีสถานะ พร้อมค่า CSS variable', ColorsDoc],
  ['typography', 'ตัวอักษร', 'คู่ฟอนต์ Kanit + IBM Plex Sans Thai Looped', TypographyDoc],
  ['spacing', 'ระยะห่าง', 'สเกล 4px ที่ใช้ทั้งระบบ', SpacingDoc],
  ['radius-shadow', 'มุมโค้งและเงา', 'ระดับความโค้งและลำดับชั้นของเงา', RadiusShadowDoc],
])

export const componentDocs = make('คอมโพเนนต์', [
  ['button', 'ปุ่ม', 'ปุ่ม 7 แบบ 4 ขนาด พร้อมสถานะโหลด', ButtonDoc],
  ['badge', 'ป้ายกำกับ', 'บอกสถานะสั้น ๆ ในตารางและการ์ด', BadgeDoc],
  ['card', 'การ์ด', 'จัดกลุ่มเนื้อหาให้จังหวะเดียวกันทุกหน้า', CardDoc],
  ['input', 'ช่องกรอกข้อมูล', 'ช่องกรอกพร้อมป้าย คำใบ้ และข้อความผิดพลาด', InputDoc],
  ['textarea', 'ช่องข้อความยาว', 'สำหรับคำตอบหลายบรรทัด', TextareaDoc],
  ['select', 'ตัวเลือกรายการ', 'เลือกหนึ่งจากหลายตัวเลือก', SelectDoc],
  ['checkbox', 'กล่องเลือก', 'เลือกหลายข้อ หรือยอมรับเงื่อนไข', CheckboxDoc],
  ['radio', 'ตัวเลือกเดียว', 'ตัวเลือกไม่เกิน 5 ข้อที่ต้องเห็นพร้อมกัน', RadioDoc],
  ['switch', 'สวิตช์เปิด/ปิด', 'การตั้งค่าที่มีผลทันที', SwitchDoc],
  ['alert', 'กล่องแจ้งเตือน', 'ข้อความสถานะที่อยู่บนหน้าจอ', AlertDoc],
  ['dialog', 'โมดัล', 'ยืนยันหรือกรอกข้อมูลก่อนกลับไปทำงานต่อ', DialogDoc],
  ['tabs', 'แท็บ', 'สลับมุมมองของข้อมูลชุดเดียวกัน', TabsDoc],
  ['tooltip', 'ทูลทิป', 'คำอธิบายสั้นเมื่อชี้', TooltipDoc],
  ['dropdown-menu', 'เมนูย่อย', 'การกระทำรองของรายการ', DropdownDoc],
  ['accordion', 'แถบพับเก็บ', 'FAQ และรายละเอียดเพิ่มเติม', AccordionDoc],
  ['table', 'ตาราง', 'ข้อมูลเชิงเปรียบเทียบแบบมีคอลัมน์', TableDoc],
  ['avatar', 'รูปโปรไฟล์', 'ตัวตนผู้ใช้แบบมีรูปหรืออักษรย่อ', AvatarDoc],
  ['progress', 'แถบความคืบหน้า', 'งานที่รู้เปอร์เซ็นต์แน่นอน', ProgressDoc],
  ['skeleton', 'โครงร่างรอโหลด', 'แทนพื้นที่ระหว่างโหลดข้อมูล', SkeletonDoc],
  ['breadcrumb', 'เส้นทางนำทาง', 'บอกตำแหน่งในโครงหน้า', BreadcrumbDoc],
  ['empty-state', 'พื้นที่ว่าง', 'หน้าจอที่ยังไม่มีข้อมูล', EmptyStateDoc],
  ['toast', 'แจ้งเตือนชั่วคราว', 'ยืนยันผลการกระทำแล้วหายเอง', ToastDoc],
])

export const patternDocs = make('แพตเทิร์น', [
  ['pattern-quote', 'หน้าขอใบเสนอราคา', 'ฟอร์มสั้นที่แปลงผู้สนใจเป็นลูกค้า', SalesPagePattern],
  ['pattern-dashboard', 'แดชบอร์ดติดตามงาน', 'เห็นงานถึงกำหนดและงานรอลูกค้าใน 5 วินาที', DashboardPattern],
  ['pattern-line', 'กล่องข้อความ LINE', 'ตอบลูกค้าเร็ว พร้อมคำตอบสำเร็จรูป', LineInboxPattern],
  ['pattern-booking', 'นัดหมาย/จองคิว', 'เลือกวันและเวลาที่ว่างด้วยตา', BookingPattern],
  ['pattern-pricing', 'ตารางแพ็กเกจราคา', 'เปรียบเทียบบริการและสิ่งที่รวม/ไม่รวม', PricingPattern],
  ['pattern-onboarding', 'ขั้นตอนเริ่มใช้งาน', 'ฟอร์มยาวแบ่งขั้นพร้อมความคืบหน้า', OnboardingPattern, 'beta'],
])

export const guidelineDocs = make('แนวทาง', [
  ['voice', 'โทนภาษา', 'เขียนอย่างไรให้เหมือนที่ปรึกษาที่ลงมือทำ', VoiceDoc],
  ['a11y', 'การเข้าถึง', 'เกณฑ์ WCAG AA และ checklist ก่อน merge', A11yDoc],
])

export const allDocs: DocEntry[] = [...startDocs, ...foundationDocs, ...componentDocs, ...patternDocs, ...guidelineDocs]

export const navSections = [
  { title: 'เริ่มต้น', items: startDocs },
  { title: 'รากฐาน', items: foundationDocs },
  { title: 'คอมโพเนนต์', items: componentDocs },
  { title: 'แพตเทิร์น', items: patternDocs },
  { title: 'แนวทาง', items: guidelineDocs },
]

export const docBySlug = new Map(allDocs.map((d) => [d.slug, d]))
