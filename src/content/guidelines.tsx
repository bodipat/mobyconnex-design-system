import { Check, X } from 'lucide-react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function Pair({ good, bad, title }: { title: string; good: string; bad: string }) {
  return (
    <Card>
      <CardContent className="space-y-3 pt-5">
        <p className="font-heading text-sm font-medium">{title}</p>
        <div className="flex items-start gap-2 rounded border border-[var(--success)]/25 bg-[var(--success-soft)] p-3">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" />
          <p className="text-sm text-fg-soft">{good}</p>
        </div>
        <div className="flex items-start gap-2 rounded border border-[var(--danger)]/25 bg-[var(--danger-soft)] p-3">
          <X className="mt-0.5 h-4 w-4 shrink-0 text-[var(--danger)]" />
          <p className="text-sm text-fg-soft">{bad}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function VoiceDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'แนวทาง' }, { label: 'โทนภาษา' }]}
        title="โทนภาษา (Voice & Tone)"
        description="MobyConnex พูดกับเจ้าของธุรกิจแบบที่ปรึกษาที่ลงมือทำด้วย — ตรงไปตรงมา ให้ข้อมูลที่ตัดสินใจได้ ไม่ขายฝัน และไม่ใช้ศัพท์เทคนิคโดยไม่อธิบาย"
      />
      <div className="flex flex-col gap-8">
        <Section title="คุณสมบัติของเสียงแบรนด์">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'ชัดเจน', d: 'บอกผลลัพธ์เป็นตัวเลขหรือสิ่งที่เห็นได้ เช่น “ขึ้น Google Maps ใน 3 วัน”' },
              { t: 'จริงใจ', d: 'บอกข้อจำกัดด้วย เช่น “ถ้าลูกค้าไม่ค้นหาคำนี้ โฆษณาจะไม่ช่วย”' },
              { t: 'ลงมือทำ', d: 'ทุกข้อเสนอมีขั้นตอนถัดไปชัดเจน ไม่ปล่อยให้ผู้อ่านคิดเอง' },
              { t: 'ให้เกียรติ', d: 'ไม่ตำหนิวิธีทำงานเดิมของลูกค้า' },
            ].map((x) => (
              <Card key={x.t}><CardContent className="pt-5">
                <p className="font-heading text-sm font-semibold">{x.t}</p>
                <p className="mt-1 text-sm text-muted">{x.d}</p>
              </CardContent></Card>
            ))}
          </div>
        </Section>

        <Section title="ตัวอย่างการเขียน" description="ใช้เป็นเกณฑ์เวลา review ข้อความบนหน้าเว็บ">
          <div className="grid gap-4 lg:grid-cols-2">
            <Pair
              title="หัวข้อหน้าแรก"
              good="ให้ลูกค้าไทยหาธุรกิจคุณเจอบน Google และ LINE ได้ใน 3 สัปดาห์"
              bad="ยกระดับประสบการณ์ดิจิทัลแบบองค์รวมสู่ยุคใหม่"
            />
            <Pair
              title="ปุ่มกระทำ"
              good="จองคิวนัดถ่ายภาพ"
              bad="ส่งคำร้องขอรับบริการ"
            />
            <Pair
              title="ข้อความยืนยัน"
              good="บันทึกแล้ว ทีมงานจะติดต่อกลับทาง LINE ภายใน 1 วันทำการ"
              bad="ดำเนินการสำเร็จ"
            />
            <Pair
              title="ข้อความผิดพลาด"
              good="อัปโหลดไม่สำเร็จ เพราะไฟล์ใหญ่กว่า 10 MB — ย่อขนาดแล้วลองใหม่"
              bad="เกิดข้อผิดพลาด กรุณาลองใหม่"
            />
          </div>
        </Section>
      </div>
    </>
  )
}

export function A11yDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'แนวทาง' }, { label: 'การเข้าถึง' }]}
        title="การเข้าถึง (Accessibility)"
        description="มาตรฐานขั้นต่ำที่ทุกผลิตภัณฑ์ต้องผ่าน — เป้าหมายคือ WCAG 2.2 ระดับ AA ในทุกหน้าจอหลัก และต้องใช้ได้จริงบนมือถือรุ่นเล็ก"
      />
      <div className="flex flex-col gap-8">
        <Section title="รายการตรวจก่อน merge" description=" checklist ที่ใช้ทบทวนทุกครั้ง">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'คอนทราสต์ข้อความปกติ ≥ 4.5:1 และข้อความใหญ่ ≥ 3:1',
              'ทุกรูปมีการใช้งานมี alt ที่อธิบาย (รูปตกแต่งใส่ alt="")',
              'ทุกช่องกรอกมี label ที่ผูกด้วย htmlFor',
              'ปุ่มที่มีแต่ไอคอนมี aria-label',
              'การโฟกัสด้วยคีย์บอร์ดมองเห็นได้ชัด (focus ring 2px)',
              'โมดัลปิดด้วย Esc ได้ และโฟกัสกลับที่เดิม',
              'ไม่ใช้สีอย่างเดียวบอกความหมาย (ต้องมีข้อความ/ไอคอน)',
              'ขนาดตัวอักษรบนมือถือไม่เล็กกว่า 14px และกดได้สูง ≥ 44px',
            ].map((x) => (
              <div key={x} className="flex items-start gap-2 rounded-lg border border-line bg-surface p-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <p className="text-sm text-fg-soft">{x}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="คอนทราสต์ที่ใช้บ่อย" description="ตรวจด้วยเครื่องมืออัตโนมัติก่อน แล้วตามด้วยตา">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { fg: '#FFFFFF', bg: '#0E1A5A', label: 'ขาวบนกรมท่า', ratio: '16.0:1' },
              { fg: '#08210C', bg: '#7ED956', label: 'เข้มบนเขียว', ratio: '9.7:1' },
              { fg: '#5C6C8F', bg: '#FFFFFF', label: 'เทารองบนขาว', ratio: '5.7:1' },
              { fg: '#FFFFFF', bg: '#18979E', label: 'ขาวบน teal', ratio: '3.5:1' },
            ].map((c) => (
              <div key={c.label} className="overflow-hidden rounded-lg border border-line">
                <div className="grid h-20 place-items-center font-heading text-sm" style={{ background: c.bg, color: c.fg }}>
                  ตัวอย่างข้อความ
                </div>
                <div className="p-3">
                  <p className="text-sm">{c.label}</p>
                  <Badge variant="success" className="w-fit">{c.ratio}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}

export function StartDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'เริ่มต้น' }, { label: 'ภาพรวม' }]}
        title="MobyConnex Design System"
        description="ระบบดีไซน์กลางของ MobyConnex สำหรับทุกผลิตภัณฑ์และงานลูกค้า — เก็บสี ตัวอักษร คอมโพเนนต์ และแพตเทิร์นธุรกิจไว้ที่เดียว เพื่อให้ทุกโปรเจกต์เริ่มจากมาตรฐานเดียวกัน"
      />
      <div className="flex flex-col gap-8">
        <Section title="ประกอบด้วยอะไรบ้าง">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'รากฐาน', d: 'สี ตัวอักษร ระยะห่าง มุมโค้ง เงา และโลโก้', to: '/docs/colors' },
              { t: 'คอมโพเนนต์', d: 'คอมโพเนนต์ UI ที่ใช้งานจริง พร้อมเดโมและโค้ด', to: '/docs/button' },
              { t: 'แพตเทิร์น', d: 'หน้าจอธุรกิจ: ขอใบเสนอราคา แดชบอร์ด LINE จองคิว', to: '/docs/pattern-quote' },
              { t: 'แนวทาง', d: 'โทนภาษา การเข้าถึง และเกณฑ์ตรวจงาน', to: '/docs/voice' },
            ].map((x) => (
              <a key={x.t} href={x.to} className="group">
                <Card interactive className="h-full">
                  <CardContent className="pt-5">
                    <p className="font-heading text-base font-semibold group-hover:text-brand">{x.t}</p>
                    <p className="mt-1 text-sm text-muted">{x.d}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </Section>

        <Section title="เริ่มใช้ในโปรเจกต์ใหม่">
          <div className="space-y-2 rounded-lg border border-line bg-surface p-5 text-sm text-fg-soft">
            <p>1. คัดลอกโฟลเดอร์ <code>src/components/ui</code> และ <code>src/styles/tokens.css</code></p>
            <p>2. ตั้งค่า Tailwind ให้มี <code>content</code> และสีที่อ้าง CSS variable (ดู tailwind.config.js ของโปรเจกต์นี้)</p>
            <p>3. ใช้ฟอนต์ Kanit (หัวข้อ) + IBM Plex Sans Thai Looped (เนื้อความ)</p>
            <p>4. ตรวจคอนทราสต์และ checklist ในหัวข้อ “การเข้าถึง” ก่อนส่งงานลูกค้า</p>
          </div>
        </Section>
      </div>
    </>
  )
}
