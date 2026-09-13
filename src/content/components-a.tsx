import { useState } from 'react'
import { toast } from 'sonner'
import { AlertCircle, ArrowRight, Check, Download, Mail, MapPin, Plus, Search, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { DemoBlock } from '@/components/docs/DemoBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox, CheckboxField } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label, Field } from '@/components/ui/label'
import { RadioGroup, RadioOption } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch, SwitchField } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

export function ButtonDoc() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'ปุ่ม' }]}
        title="ปุ่ม (Button)"
        description="ปุ่มคือจุดตัดสินใจของหน้า ใช้ variant ให้ตรงกับลำดับความสำคัญ: primary สำหรับการกระทำหลักหนึ่งอย่างต่อหน้า, secondary/outline สำหรับทางเลือก และ ghost สำหรับการกระทำเบา"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง" description="กด “โค้ด” เพื่อดูวิธีใช้จริง">
          <DemoBlock
            title="variant"
            code={`import { Button } from '@/components/ui/button'

<Button variant="primary">จองคิว</Button>
<Button variant="accent">เริ่มทดลองฟรี</Button>
<Button variant="secondary">บันทึกร่าง</Button>
<Button variant="outline">ดูรายละเอียด</Button>
<Button variant="ghost">ยกเลิก</Button>
<Button variant="danger">ลบข้อมูล</Button>
<Button variant="link">อ่านนโยบาย</Button>`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button>จองคิว</Button>
              <Button variant="accent">เริ่มทดลองฟรี</Button>
              <Button variant="secondary">บันทึกร่าง</Button>
              <Button variant="outline">ดูรายละเอียด</Button>
              <Button variant="ghost">ยกเลิก</Button>
              <Button variant="danger">ลบข้อมูล</Button>
              <Button variant="link">อ่านนโยบาย</Button>
            </div>
          </DemoBlock>

          <DemoBlock
            className="mt-8"
            title="ขนาด"
            code={`<Button size="sm">เล็ก</Button>
<Button size="md">กลาง (ค่าเริ่มต้น)</Button>
<Button size="lg">ใหญ่</Button>
<Button size="icon" aria-label="เพิ่ม"><Plus /></Button>`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">เล็ก</Button>
              <Button size="md">กลาง</Button>
              <Button size="lg">ใหญ่</Button>
              <Button size="icon" aria-label="เพิ่ม"><Plus className="h-4 w-4" /></Button>
            </div>
          </DemoBlock>

          <DemoBlock
            className="mt-8"
            title="ไอคอน + สถานะโหลด/ปิดใช้งาน"
            code={`<Button><Download className="h-4 w-4" /> ดาวน์โหลดรายงาน</Button>
<Button loading>กำลังบันทึก…</Button>
<Button disabled>ปิดใช้งาน</Button>`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button><Download className="h-4 w-4" /> ดาวน์โหลดรายงาน</Button>
              <Button loading>กำลังบันทึก…</Button>
              <Button disabled>ปิดใช้งาน</Button>
              <Button
                variant="accent"
                onClick={() => {
                  setLoading(true)
                  toast.promise(new Promise((r) => setTimeout(r, 1500)), {
                    loading: 'กำลังส่งข้อมูล…',
                    success: 'บันทึกเรียบร้อย',
                    error: 'เกิดข้อผิดพลาด',
                  })
                  setTimeout(() => setLoading(false), 1600)
                }}
                loading={loading}
              >
                ทดลองแจ้งเตือน
              </Button>
            </div>
          </DemoBlock>
        </Section>

        <Section title="พร็อพ">
          <PropsTable
            rows={[
              { name: 'variant', type: "'primary' | 'accent' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link'", def: "'primary'", desc: 'ลำดับความสำคัญของปุ่ม' },
              { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", def: "'md'", desc: 'ขนาดปุ่ม สูง 32/40/48px' },
              { name: 'loading', type: 'boolean', def: 'false', desc: 'แสดงสปินเนอร์และปิดการกดซ้ำระหว่างรอ' },
              { name: 'asChild', type: 'boolean', def: 'false', desc: 'ส่งสไตล์ปุ่มไปยังลูก (เช่น <a> หรือ <Link>)' },
            ]}
          />
        </Section>

        <Section title="การเข้าถึง" description="เกณฑ์ที่ต้องผ่านก่อน merge">
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-soft">
            <li>ปุ่มที่มีแต่ไอคอนต้องมี <code>aria-label</code> เสมอ</li>
            <li>ระหว่างโหลดให้ใช้ <code>loading</code> เพื่อปิดการกดซ้ำ ไม่ใช่ซ่อนปุ่ม</li>
            <li>คอนทราสต์ข้อความบนปุ่มต้อง ≥ 4.5:1 (ชุดสีปัจจุบันผ่านทั้งหมด)</li>
            <li>หนึ่งหน้าควรมีปุ่ม primary เดียว — ถ้ามีสอง แปลว่าลำดับความสำคัญยังไม่ชัด</li>
          </ul>
        </Section>
      </div>
    </>
  )
}

export function BadgeDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'ป้ายกำกับ' }]}
        title="ป้ายกำกับ (Badge)"
        description="ใช้บอกสถานะหรือหมวดหมู่แบบสั้น ๆ ในตาราง การ์ด และรายการ — ไม่ใช้เป็นปุ่ม"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Badge } from '@/components/ui/badge'

<Badge>ค่าเริ่มต้น</Badge>
<Badge variant="brand" className="w-fit">ลูกค้าใหม่</Badge>
<Badge variant="accent" className="w-fit">แนะนำ</Badge>
<Badge variant="soft" className="w-fit">ภายใน</Badge>
<Badge variant="success" className="w-fit">สำเร็จ</Badge>
<Badge variant="warning" className="w-fit">รอชำระ</Badge>
<Badge variant="danger" className="w-fit">ค้างชำระ</Badge>
<Badge variant="info" className="w-fit">กำลังดำเนินการ</Badge>
<Badge variant="outline" className="w-fit">ฉบับร่าง</Badge>`}
          >
            <div className="flex flex-wrap gap-2.5">
              <Badge>ค่าเริ่มต้น</Badge>
              <Badge variant="brand" className="w-fit">ลูกค้าใหม่</Badge>
              <Badge variant="accent" className="w-fit">แนะนำ</Badge>
              <Badge variant="soft" className="w-fit">ภายใน</Badge>
              <Badge variant="success" className="w-fit">สำเร็จ</Badge>
              <Badge variant="warning" className="w-fit">รอชำระ</Badge>
              <Badge variant="danger" className="w-fit">ค้างชำระ</Badge>
              <Badge variant="info" className="w-fit">กำลังดำเนินการ</Badge>
              <Badge variant="outline" className="w-fit">ฉบับร่าง</Badge>
            </div>
          </DemoBlock>
          <DemoBlock
            className="mt-8"
            title="ใช้ในตาราง (แบบที่ใช้จริงบ่อยที่สุด)"
            code={`<td className="flex items-center gap-2">
  <Badge variant="success" className="w-fit">ชำระแล้ว</Badge>
  <span className="text-xs text-muted">2 วันที่แล้ว</span>
</td>`}
          >
            <div className="flex flex-wrap items-center gap-4">
              {[
                { s: 'success', t: 'ชำระแล้ว', d: '2 วันที่แล้ว' },
                { s: 'warning', t: 'รอชำระ', d: 'ครบกำหนด 20 ก.ย.' },
                { s: 'danger', t: 'เกินกำหนด', d: '7 วัน' },
              ].map((r) => (
                <div key={r.t} className="flex items-center gap-2">
                  <Badge variant={r.s as any}>{r.t}</Badge>
                  <span className="text-xs text-muted">{r.d}</span>
                </div>
              ))}
            </div>
          </DemoBlock>
        </Section>
        <Section title="การเข้าถึง">
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-soft">
            <li>สีอย่างเดียวไม่พอ — ต้องมีข้อความบอกสถานะเสมอ (ตาบอดสีจะแยกไม่ออก)</li>
            <li>ความยาวไม่ควรเกิน 2 คำ ถ้ายาวกว่านั้นให้ใช้ข้อความปกติ</li>
          </ul>
        </Section>
      </div>
    </>
  )
}

export function CardDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'การ์ด' }]}
        title="การ์ด (Card)"
        description="หน่วยพื้นฐานในการจัดกลุ่มเนื้อหา — ใช้ CardHeader/CardTitle/CardContent/CardFooter เพื่อให้ระยะห่างและเส้นขอบเหมือนกันทุกหน้า"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>แพ็กเกจ Starter</CardTitle>
      <Badge variant="accent" className="w-fit">แนะนำ</Badge>
    </div>
    <CardDescription>เหมาะกับร้านเดียวที่ต้องการเริ่มมีตัวตนออนไลน์</CardDescription>
  </CardHeader>
  <CardContent className="text-sm text-fg-soft">
    Virtual Tour 1 จุด · หน้าเว็บ 5 หน้า · สอนใช้งาน 2 ชั่วโมง
  </CardContent>
  <CardFooter>
    <Button className="w-full">ขอใบเสนอราคา</Button>
  </CardFooter>
</Card>`}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>แพ็กเกจ Starter</CardTitle>
                    <Badge variant="accent" className="w-fit">แนะนำ</Badge>
                  </div>
                  <CardDescription>เหมาะกับร้านเดียวที่ต้องการเริ่มมีตัวตนออนไลน์</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-fg-soft">
                  Virtual Tour 1 จุด · หน้าเว็บ 5 หน้า · สอนใช้งาน 2 ชั่วโมง
                </CardContent>
                <CardFooter>
                  <Button className="w-full">ขอใบเสนอราคา</Button>
                </CardFooter>
              </Card>
              <Card interactive>
                <CardHeader>
                  <CardTitle>การ์ดที่กดได้</CardTitle>
                  <CardDescription>ใส่ interactive เมื่อทั้งใบเป็นการกดเดียว</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-fg-soft">
                  ลอยขึ้นเล็กน้อยตอน hover เพื่อบอกว่ากดได้
                </CardContent>
              </Card>
            </div>
          </DemoBlock>
        </Section>
        <Section title="พร็อพ">
          <PropsTable
            rows={[
              { name: 'interactive', type: 'boolean', def: 'false', desc: 'เพิ่มเงาและยกการ์ดตอน hover สำหรับการ์ดที่กดได้' },
            ]}
          />
        </Section>
      </div>
    </>
  )
}

export function InputDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'ช่องกรอกข้อมูล' }]}
        title="ช่องกรอกข้อมูล (Input)"
        description="ใช้คู่กับ Field เสมอ เพื่อให้ป้ายกำกับ คำใบ้ และข้อความ error อยู่ในตำแหน่งเดียวกันทุกฟอร์ม"
      />
      <div className="flex flex-col gap-10">
        <Section title="สถานะทั้งหมด">
          <DemoBlock
            code={`import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/label'

<Field label="ชื่อผู้ติดต่อ" required>
  <Input placeholder="เช่น คุณสมชาย" />
</Field>

<Field label="อีเมล" hint="ใช้สำหรับส่งใบเสนอราคา" error="รูปแบบอีเมลไม่ถูกต้อง">
  <Input defaultValue="somchai@" invalid />
</Field>

<Field label="งบประมาณ">
  <Input leading={<span>฿</span>} defaultValue="150,000" disabled />
</Field>

<Field label="ค้นหา">
  <Input leading={<Search />} placeholder="ค้นหาลูกค้า" />
</Field>`}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="ชื่อผู้ติดต่อ" required>
                <Input placeholder="เช่น คุณสมชาย" />
              </Field>
              <Field label="อีเมล" hint="ใช้สำหรับส่งใบเสนอราคา" error="รูปแบบอีเมลไม่ถูกต้อง">
                <Input defaultValue="somchai@" invalid />
              </Field>
              <Field label="งบประมาณ (ปิดใช้งาน)">
                <Input leading={<span>฿</span>} defaultValue="150,000" disabled />
              </Field>
              <Field label="ค้นหา">
                <Input leading={<Search />} placeholder="ค้นหาลูกค้า" />
              </Field>
            </div>
          </DemoBlock>
        </Section>
        <Section title="พร็อพ">
          <PropsTable
            rows={[
              { name: 'invalid', type: 'boolean', def: 'false', desc: 'กรอบสีแดง พร้อมข้อความ error จาก Field' },
              { name: 'leading / trailing', type: 'ReactNode', def: '—', desc: 'ไอคอนหรือหน่วยเงินหน้า/หลังช่องกรอก' },
            ]}
          />
        </Section>
        <Section title="การเข้าถึง">
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-soft">
            <li>ทุกช่องกรอกต้องมี <code>&lt;label&gt;</code> ที่เชื่อมด้วย htmlFor (Field จัดให้แล้ว)</li>
            <li>ข้อความ error ต้องอยู่ใต้ช่อง ไม่ใช่แค่กรอบแดง</li>
            <li>ช่องกรอกตัวเลขให้ใส่ inputMode numeric เพื่อให้มือถือขึ้นแป้นตัวเลข</li>
          </ul>
        </Section>
      </div>
    </>
  )
}

export function TextareaDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'ช่องข้อความยาว' }]}
        title="ช่องข้อความยาว (Textarea)"
        description="ใช้เมื่อคำตอบคาดว่ายาวกว่า 1 บรรทัด เช่น โจทย์ธุรกิจ หมายเหตุการจอง หรือข้อความถึงลูกค้า"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Textarea } from '@/components/ui/textarea'
import { Field } from '@/components/ui/label'

<Field label="เล่าโจทย์ธุรกิจของคุณ" hint="อย่างน้อย 2-3 ประโยค เพื่อให้เราประเมินขอบเขตได้แม่นขึ้น">
  <Textarea rows={4} placeholder="ตอนนี้ลูกค้าหาเราไม่เจอบน Google Maps…" />
</Field>`}
          >
            <Field label="เล่าโจทย์ธุรกิจของคุณ" hint="อย่างน้อย 2-3 ประโยค เพื่อให้เราประเมินขอบเขตได้แม่นขึ้น">
              <Textarea rows={4} placeholder="ตอนนี้ลูกค้าหาเราไม่เจอบน Google Maps…" />
            </Field>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function SelectDoc() {
  const [value, setValue] = useState('')
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'ตัวเลือกรายการ' }]}
        title="ตัวเลือกรายการ (Select)"
        description="ใช้เมื่อตัวเลือกมีมากกว่า 5 รายการ หรือเมื่อต้องประหยัดพื้นที่ในฟอร์ม — ถ้ามีไม่เกิน 5 และสำคัญ ให้ใช้ Radio แทนเพื่อลดการกด"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-64">
    <SelectValue placeholder="เลือกจังหวัด" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="bkk">กรุงเทพมหานคร</SelectItem>
    <SelectItem value="cnx">เชียงใหม่</SelectItem>
    <SelectItem value="kk">ขอนแก่น</SelectItem>
    <SelectItem value="hkt">ภูเก็ต</SelectItem>
  </SelectContent>
</Select>`}
          >
            <div className="flex flex-wrap items-center gap-4">
              <Select value={value} onValueChange={setValue}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="เลือกจังหวัด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bkk">กรุงเทพมหานคร</SelectItem>
                  <SelectItem value="cnx">เชียงใหม่</SelectItem>
                  <SelectItem value="kk">ขอนแก่น</SelectItem>
                  <SelectItem value="hkt">ภูเก็ต</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted">ค่าที่เลือก: {value || '—'}</span>
            </div>
          </DemoBlock>
          <DemoBlock
            className="mt-8"
            title="ปิดใช้งาน และ แสดงค่าไม่ถูกต้อง"
            code={`<Select disabled><SelectTrigger><SelectValue placeholder="ปิดใช้งาน" /></SelectTrigger></Select>

<Select><SelectTrigger invalid><SelectValue placeholder="ยังไม่เลือกสาขา" /></SelectTrigger></Select>`}
          >
            <div className="flex flex-wrap gap-4">
              <Select disabled>
                <SelectTrigger className="w-56"><SelectValue placeholder="ปิดใช้งาน" /></SelectTrigger>
              </Select>
              <Select>
                <SelectTrigger className="w-56" invalid><SelectValue placeholder="ยังไม่เลือกสาขา" /></SelectTrigger>
              </Select>
            </div>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function CheckboxDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'กล่องเลือก' }]}
        title="กล่องเลือก (Checkbox)"
        description="ใช้เมื่อเลือกได้หลายข้อพร้อมกัน หรือเพื่อยืนยันสิ่งที่ผู้ใช้ต้องรับทราบ (เช่น PDPA)"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Checkbox, CheckboxField } from '@/components/ui/checkbox'

<CheckboxField label="Virtual Tour 360°" description="ถ่ายและขึ้นระบบ 1 จุด" defaultChecked />
<CheckboxField label="ปรับปรุงหน้าเว็บ" description="5 หน้า รวมฟอร์มติดต่อ" />
<CheckboxField
  label="ยินยอมให้ติดต่อกลับและประมวลผลข้อมูลตาม PDPA"
  description="อ่านนโยบายความเป็นส่วนตัว"
  required
/>`}
          >
            <div className="flex flex-col gap-4">
              <CheckboxField label="Virtual Tour 360°" description="ถ่ายและขึ้นระบบ 1 จุด" defaultChecked />
              <CheckboxField label="ปรับปรุงหน้าเว็บ" description="5 หน้า รวมฟอร์มติดต่อ" />
              <CheckboxField
                label="ยินยอมให้ติดต่อกลับและประมวลผลข้อมูลตาม PDPA"
                description="อ่านนโยบายความเป็นส่วนตัว"
              />
            </div>
          </DemoBlock>
        </Section>
        <Section title="การเข้าถึง">
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-soft">
            <li>คลิกที่ป้ายกำกับต้องติ๊กได้ (CheckboxField ผูก htmlFor ให้แล้ว)</li>
            <li>เคส PDPA ต้องไม่ติ๊กล่วงหน้า และห้ามรวมหลายความยินยอมในกล่องเดียว</li>
          </ul>
        </Section>
      </div>
    </>
  )
}

export function RadioDoc() {
  const [plan, setPlan] = useState('starter')
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'ตัวเลือกเดียว' }]}
        title="ตัวเลือกเดียว (Radio)"
        description="ใช้เมื่อตัวเลือกมีไม่เกิน 5 และต้องเห็นทุกตัวเลือกพร้อมกัน (เช่น เลือกแพ็กเกจ)"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { RadioGroup, RadioOption } from '@/components/ui/radio-group'

<RadioGroup value={plan} onValueChange={setPlan}>
  <RadioOption value="sprint" label="Virtual Visibility Sprint" description="เริ่ม 45,000 บาท / 3 สัปดาห์" />
  <RadioOption value="growth" label="Growth Operations" description="รายเดือน ดูแลเว็บ SEO และสื่อ" />
  <RadioOption value="ai" label="AI Workflow Sprint" description="เริ่ม 60,000 บาท / 4 สัปดาห์" />
</RadioGroup>`}
          >
            <RadioGroup value={plan} onValueChange={setPlan}>
              <RadioOption value="sprint" label="Virtual Visibility Sprint" description="เริ่ม 45,000 บาท / 3 สัปดาห์" />
              <RadioOption value="growth" label="Growth Operations" description="รายเดือน ดูแลเว็บ SEO และสื่อ" />
              <RadioOption value="ai" label="AI Workflow Sprint" description="เริ่ม 60,000 บาท / 4 สัปดาห์" />
            </RadioGroup>
          </DemoBlock>
          <DemoBlock
            className="mt-8"
            title="แบบการ์ด (ใช้ในหน้าขอใบเสนอราคา)"
            code={`{plans.map((p) => (
  <label className="flex cursor-pointer gap-3 rounded-lg border border-line p-4 has-[:checked]:border-brand has-[:checked]:bg-brand-soft">
    <RadioGroupItem value={p.id} />
    <div>
      <p className="font-heading font-medium">{p.name}</p>
      <p className="text-sm text-muted">{p.price}</p>
    </div>
  </label>
))}`}
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { n: 'Starter', p: '45,000 บาท' },
                { n: 'Growth', p: '25,000 บาท/เดือน' },
                { n: 'AI Sprint', p: '60,000 บาท' },
              ].map((c) => (
                <label key={c.n} className="flex cursor-pointer gap-3 rounded-lg border border-line bg-surface p-4 transition hover:border-brand">
                  <span className="mt-1 h-5 w-5 shrink-0 rounded-full border" style={{ borderColor: 'var(--border-strong)' }} />
                  <span>
                    <span className="block font-heading text-sm font-medium">{c.n}</span>
                    <span className="block text-sm text-muted">{c.p}</span>
                  </span>
                </label>
              ))}
            </div>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function SwitchDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'สวิตช์เปิด/ปิด' }]}
        title="สวิตช์เปิด/ปิด (Switch)"
        description="ใช้กับการตั้งค่าที่มีผลทันที ไม่ต้องกดบันทึก — ถ้าต้องกดบันทึกก่อน ให้ใช้ Checkbox แทน"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Switch, SwitchField } from '@/components/ui/switch'

<SwitchField
  label="แจ้งเตือนลูกค้าใหม่ทาง LINE"
  description="ส่งข้อความหาทีมขายทันทีเมื่อมีลูกค้ากรอกฟอร์ม"
  defaultChecked
/>
<SwitchField label="สรุปรายวันทางอีเมล" description="ส่งทุกวัน 08:00 น." />`}
          >
            <div className="flex flex-col gap-3">
              <SwitchField
                label="แจ้งเตือนลูกค้าใหม่ทาง LINE"
                description="ส่งข้อความหาทีมขายทันทีเมื่อมีลูกค้ากรอกฟอร์ม"
                defaultChecked
              />
              <SwitchField label="สรุปรายวันทางอีเมล" description="ส่งทุกวัน 08:00 น." />
            </div>
          </DemoBlock>
        </Section>
        <Section title="หลักการเลือกใช้">
          <div className="grid gap-4 sm:grid-cols-2">
            <Alert variant="info" title="ใช้ Switch เมื่อ">
              การเปลี่ยนค่ามีผลทันที และผู้ใช้ไม่ต้องกดปุ่มบันทึก
            </Alert>
            <Alert variant="warning" title="ใช้ Checkbox เมื่อ">
              ค่านั้นจะถูกบันทึกตอนกดปุ่ม (เช่น ฟอร์มสมัคร) หรือเป็นการยอมรับเงื่อนไข
            </Alert>
          </div>
        </Section>
      </div>
    </>
  )
}
