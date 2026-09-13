import { useState } from 'react'
import { CalendarClock, CircleDollarSign, Headset, MessageSquare, Send, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { DemoBlock } from '@/components/docs/DemoBlock'
import { Alert } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Badge as B } from '@/components/ui/badge'

export function SalesPagePattern() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'แพตเทิร์น' }, { label: 'หน้าขอใบเสนอราคา' }]}
        title="แพตเทิร์น: หน้าขอใบเสนอราคา"
        description="หน้าที่แปลงผู้สนใจเป็นลูกค้า — โครงที่ใช้ได้กับทุกบริการของ MobyConnex ลำดับคือ: บอกสิ่งที่ผู้ใช้จะได้ → กรอกข้อมูลสั้นที่สุด → รู้ว่าขั้นตอนต่อไปคืออะไร"
      />
      <div className="flex flex-col gap-10">
        <Section title="โครงที่แนะนำ" description="ใช้เป็นการ์ดกลางหน้าจอ ความกว้างไม่เกิน 42rem">
          <DemoBlock
            plain
            code={`<Card>
  <CardHeader>
    <CardTitle>ขอใบเสนอราคา Virtual Tour</CardTitle>
    <CardDescription>กรอก 4 ช่อง ใช้เวลาไม่ถึง 2 นาที ทีมงานติดต่อกลับภายใน 1 วันทำการ</CardDescription>
  </CardHeader>
  <CardContent className="space-y-5">
    <Field label="ชื่อร้าน / บริษัท" required><Input /></Field>
    <Field label="เบอร์โทรหรือ LINE ID" required hint="ใช้ยืนยันนัดหมาย"><Input /></Field>
    <Field label="จังหวัด"><Input /></Field>
    <Field label="สิ่งที่อยากได้"><Textarea rows={3} /></Field>
    <Button size="lg" className="w-full">ส่งคำขอ</Button>
    <p className="text-xs text-muted">การส่งข้อมูลถือว่าคุณยินยอมให้เราติดต่อกลับตามนโยบาย PDPA</p>
  </CardContent>
</Card>`}
          >
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>ขอใบเสนอราคา Virtual Tour</CardTitle>
                  <CardDescription>กรอก 4 ช่อง ใช้เวลาไม่ถึง 2 นาที ทีมงานติดต่อกลับภายใน 1 วันทำการ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <Field label="ชื่อร้าน / บริษัท" required><Input placeholder="เช่น ครัวปรัชญา" /></Field>
                  <Field label="เบอร์โทรหรือ LINE ID" required hint="ใช้ยืนยันนัดหมาย"><Input placeholder="08x-xxx-xxxx" /></Field>
                  <Field label="จังหวัด"><Input placeholder="กรุงเทพมหานคร" /></Field>
                  <Field label="สิ่งที่อยากได้"><Textarea rows={3} placeholder="อยากให้ลูกค้าจองคิวผ่าน LINE ได้ด้วย" /></Field>
                  <Button size="lg" className="w-full">ส่งคำขอ</Button>
                  <p className="text-xs text-muted">การส่งข้อมูลถือว่าคุณยินยอมให้เราติดต่อกลับตามนโยบาย PDPA</p>
                </CardContent>
              </Card>
            </div>
          </DemoBlock>
        </Section>
        <Section title="กฎที่ห้ามละ">
          <div className="grid gap-4 sm:grid-cols-2">
            <Alert variant="success" title="ควร">จำนวนช่องกรอกเท่าที่จำเป็นจริง (4-6 ช่อง) และบอกเวลาที่ใช้</Alert>
            <Alert variant="danger" title="ไม่ควร">ถามงบประมาณเป็นช่องแรก หรือบังคับอีเมลทั้งที่คุยทาง LINE</Alert>
          </div>
        </Section>
      </div>
    </>
  )
}

export function DashboardPattern() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'แพตเทิร์น' }, { label: 'แดชบอร์ดลูกค้า' }]}
        title="แพตเทิร์น: แดชบอร์ดติดตามงานลูกค้า"
        description="หน้าจอที่ทีมงานเปิดทุกวัน — ต้องตอบได้ใน 5 วินาทีว่า งานไหนถึงกำหนด งานไหนรอลูกค้า และมีอะไรต้องทำวันนี้"
      />
      <div className="flex flex-col gap-10">
        <Section title="การ์ดตัวเลข (KPI)">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { t: 'ผู้เข้าชม Virtual Tour', v: '1,204', d: '+18% เทียบ 7 วันก่อน', i: <Sparkles className="h-4 w-4" /> },
              { t: 'ลูกค้าติดต่อใหม่', v: '37', d: 'ตอบกลับแล้ว 31 ราย', i: <Headset className="h-4 w-4" /> },
              { t: 'งานถึงกำหนดสัปดาห์นี้', v: '5', d: 'เกินกำหนด 1 งาน', i: <CalendarClock className="h-4 w-4" /> },
            ].map((k) => (
              <Card key={k.t}>
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between text-muted">
                    <span className="text-sm">{k.t}</span>
                    {k.i}
                  </div>
                  <p className="mt-2 font-heading text-3xl font-semibold text-fg tabular-nums">{k.v}</p>
                  <p className="mt-1 text-xs text-muted">{k.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="ตารางงานที่ต้องทำวันนี้">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ลูกค้า</TableHead>
                <TableHead>งาน</TableHead>
                <TableHead>ขั้นตอน</TableHead>
                <TableHead>กำหนด</TableHead>
                <TableHead>สถานะ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { c: 'ครัวปรัชญา', w: 'ถ่าย Virtual Tour 2 จุด', p: 65, d: '18 ก.ย.', s: 'info', st: 'กำลังทำ' },
                { c: 'Coach Kate', w: 'ปรับหน้าเว็บ 5 หน้า', p: 100, d: '15 ก.ย.', s: 'success', st: 'รอตรวจ' },
                { c: '3B Printing', w: 'อบรม AI Workflow', p: 20, d: '12 ก.ย.', s: 'danger', st: 'เกินกำหนด' },
              ].map((r) => (
                <TableRow key={r.c}>
                  <TableCell className="font-medium text-fg">{r.c}</TableCell>
                  <TableCell>{r.w}</TableCell>
                  <TableCell className="w-40"><Progress value={r.p} /></TableCell>
                  <TableCell>{r.d}</TableCell>
                  <TableCell><B variant={r.s as any}>{r.st}</B></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section title="กติกาการออกแบบแดชบอร์ด">
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-soft">
            <li>ตัวเลขสำคัญสุดอยู่ซ้ายบนเสมอ (คนไทยอ่านซ้ายไปขวา บนลงล่าง)</li>
            <li>ทุกตัวเลขต้องมีบริบทกำกับ (เทียบกับอะไร เมื่อไร) ไม่ปล่อยตัวเลขลอย</li>
            <li>งานเกินกำหนดใช้สี danger และขึ้นก่อนงานอื่นในตาราง</li>
            <li>ไม่ใส่กราฟถ้าดูตัวเลขแล้วตอบคำถามได้เร็วกว่า</li>
          </ul>
        </Section>
      </div>
    </>
  )
}

export function LineInboxPattern() {
  const [messages, setMessages] = useState([
    { from: 'customer', text: 'สวัสดีครับ อยากทำ Virtual Tour ร้านกาแฟ ราคาเท่าไรครับ', time: '10:24' },
    { from: 'team', text: 'สวัสดีค่ะ ร้านอยู่แถวไหนและมีกี่ชั้นคะ เดี๋ยวประเมินให้เลยค่ะ', time: '10:26' },
    { from: 'customer', text: 'อยู่บางนา 2 ชั้นครับ', time: '10:27' },
  ])
  const [draft, setDraft] = useState('')

  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'แพตเทิร์น' }, { label: 'กล่องข้อความ LINE' }]}
        title="แพตเทิร์น: กล่องข้อความลูกค้า (LINE)"
        description="LINE เป็นช่องทางหลักของลูกค้าไทย — หน้าจอนี้ต้องตอบได้เร็ว รู้ว่าลูกค้ารายนี้เป็นใคร และมีคำตอบสำเร็จรูปให้ใช้"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่างหน้าจอ">
          <DemoBlock
            plain
            code={`<div className="grid gap-4 lg:grid-cols-[280px_1fr]">
  <ConversationList />
  <ConversationThread />
</div>

// ฝั่งขวา: หัวเรื่อง = ชื่อลูกค้า + สถานะ, กลาง = บทสนทนา, ล่าง = ช่องพิมพ์ + คำตอบสำเร็จรูป`}
          >
            <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
              <Card>
                <CardContent className="space-y-2 pt-5">
                  {[
                    { n: 'ครัวปรัชญา', t: 'อยู่บางนา 2 ชั้นครับ', a: true, badge: 'ใหม่' },
                    { n: 'Coach Kate', t: 'ขอดูตัวอย่างงานก่อนค่ะ', a: false },
                    { n: '3B Printing', t: 'อบรมวันไหนได้บ้างคะ', a: false },
                  ].map((c) => (
                    <button
                      key={c.n}
                      className={
                        'flex w-full items-start gap-3 rounded-lg border p-3 text-left transition ' +
                        (c.a ? 'border-brand bg-brand-soft' : 'border-line hover:bg-surface-2')
                      }
                    >
                      <Avatar fallback={c.n.slice(0, 1)} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate font-heading text-sm font-medium">{c.n}</span>
                          {c.badge && <Badge variant="accent">{c.badge}</Badge>}
                        </span>
                        <span className="block truncate text-xs text-muted">{c.t}</span>
                      </span>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="flex flex-col">
                <div className="flex items-center justify-between border-b border-line px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar fallback="ค" size="sm" />
                    <div>
                      <p className="font-heading text-sm font-medium">ครัวปรัชญา</p>
                      <p className="text-xs text-muted">LINE OA · ตอบกลับภายใน 2 ชั่วโมง</p>
                    </div>
                  </div>
                  <Badge variant="info">กำลังคุย</Badge>
                </div>

                <CardContent className="flex-1 space-y-3 py-5">
                  {messages.map((m, i) => (
                    <div key={i} className={m.from === 'team' ? 'flex justify-end' : 'flex justify-start'}>
                      <div
                        className={
                          'max-w-[80%] rounded-lg px-3 py-2 text-sm ' +
                          (m.from === 'team'
                            ? 'bg-brand text-brand-fg'
                            : 'border border-line bg-surface-2 text-fg')
                        }
                      >
                        <p>{m.text}</p>
                        <p className={'mt-1 text-[10px] ' + (m.from === 'team' ? 'text-brand-fg/70' : 'text-muted')}>{m.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                <div className="border-t border-line p-4">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {['ส่งตัวอย่างงาน', 'ขอเบอร์โทร', 'นัดถ่ายภาพ'].map((q) => (
                      <button
                        key={q}
                        className="rounded-full border border-line px-3 py-1 text-xs text-fg-soft transition hover:border-brand hover:text-brand"
                        onClick={() => setDraft(q === 'ขอเบอร์โทร' ? 'ขอเบอร์โทรที่ติดต่อสะดวกได้ไหมคะ' : q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="พิมพ์ข้อความ…" />
                    <Button
                      size="icon"
                      aria-label="ส่งข้อความ"
                      onClick={() => {
                        if (!draft.trim()) return
                        setMessages((m) => [...m, { from: 'team', text: draft, time: 'ตอนนี้' }])
                        setDraft('')
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </DemoBlock>
        </Section>

        <Section title="หลักการ">
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-soft">
            <li>ข้อความของทีมชิดขวา พื้นสีแบรนด์ + ตัวอักษรขาว ส่วนลูกค้าชิดซ้ายพื้นอ่อน</li>
            <li>เวลาในข้อความใช้ 24 ชั่วโมง (10:24 ไม่ใช่ 10:24 AM)</li>
            <li>คำตอบสำเร็จรูปช่วยให้ตอบเร็ว แต่ต้องแก้ให้ตรงบริบทลูกค้าก่อนส่ง</li>
            <li>สถานะการคุย (ใหม่ / กำลังคุย / ปิดงาน) แสดงเป็น Badge ที่หัวเรื่องเสมอ</li>
          </ul>
        </Section>
      </div>
    </>
  )
}

export function BookingPattern() {
  const slots = ['10:00', '11:00', '13:00', '14:00', '15:30', '16:00']
  const [picked, setPicked] = useState<string | null>(null)
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'แพตเทิร์น' }, { label: 'นัดหมาย/จองคิว' }]}
        title="แพตเทิร์น: เลือกวันและเวลานัด"
        description="ใช้กับนัดถ่ายภาพ Virtual Tour หรือนัดอบรม — ต้องเห็นว่าวันไหนว่างด้วยตา ไม่ต้องกดเข้าไปดูทีละวัน"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            plain
            code={`<div className="grid gap-4 sm:grid-cols-[1fr_320px]">
  <Calendar />           {/* เดือนปัจจุบัน แสดงจุดใต้วันที่มีคิวว่าง */}
  <div>
    <p className="font-heading font-medium">เสาร์ 20 ก.ย. 2569</p>
    <div className="grid grid-cols-3 gap-2">
      {slots.map((s) => (
        <button key={s} onClick={() => setPicked(s)}
          className="rounded border border-line py-2 text-sm hover:border-brand aria-pressed:bg-brand">
          {s}
        </button>
      ))}
    </div>
    <Button className="w-full" disabled={!picked}>ยืนยันนัด {picked}</Button>
  </div>
</div>`}
          >
            <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
              <Card>
                <CardHeader>
                  <CardTitle>กันยายน 2569</CardTitle>
                  <CardDescription>จุดสีเขียว = ยังมีคิวว่าง</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted">
                    {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((d) => <span key={d} className="py-1">{d}</span>)}
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
                      const available = [18, 20, 21, 24, 27].includes(d)
                      const selected = d === 20
                      return (
                        <button
                          key={d}
                          className={
                            'relative rounded py-2 text-sm transition ' +
                            (selected ? 'bg-brand text-brand-fg' : available ? 'hover:bg-accent-soft' : 'text-muted/50')
                          }
                        >
                          {d}
                          {available && <span className={'absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ' + (selected ? 'bg-white' : 'bg-accent')} />}
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4 pt-5">
                  <div>
                    <p className="font-heading text-sm font-medium">เสาร์ 20 กันยายน 2569</p>
                    <p className="text-xs text-muted">ทีมถ่ายภาพว่าง 6 ช่วงเวลา</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((s) => (
                      <button
                        key={s}
                        onClick={() => setPicked(s)}
                        className={
                          'rounded border py-2 text-sm transition ' +
                          (picked === s ? 'border-brand bg-brand text-brand-fg' : 'border-line hover:border-brand hover:text-brand')
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <Button className="w-full" disabled={!picked}>
                    {picked ? `ยืนยันนัด ${picked}` : 'เลือกเวลาก่อน'}
                  </Button>
                  <p className="text-xs text-muted">นัดหมายจะถูกยืนยันทาง LINE และอีเมลภายใน 5 นาที</p>
                </CardContent>
              </Card>
            </div>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function PricingPattern() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'แพตเทิร์น' }, { label: 'ตารางแพ็กเกจ' }]}
        title="แพตเทิร์น: ตารางแพ็กเกจราคา"
        description="ใช้ในหน้าเว็บขายและใบเสนอราคา — แพ็กเกจที่แนะนำต้องมีกรอบเด่นชัด และทุกแพ็กเกจต้องบอกสิ่งที่ไม่รวมไว้ด้วย"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { n: 'Virtual Visibility Sprint', p: '45,000', u: 'ครั้งเดียว / 3 สัปดาห์', hi: false, f: ['ถ่าย Virtual Tour 1 จุด', 'ขึ้น Google Business Profile', 'หน้าติดต่อ + แผนที่', 'สอนวิธีดูสถิติ 1 ชม.'] },
              { n: 'Growth Operations', p: '25,000', u: 'ต่อเดือน', hi: true, f: ['ดูแลเว็บ 5-10 หน้า', 'SEO + คอนเทนต์ 4 ชิ้น', 'ดูแคมเปญโฆษณาและรายงาน', 'ประชุมรายเดือน'] },
              { n: 'AI Workflow Sprint', p: '60,000', u: 'ครั้งเดียว / 4 สัปดาห์', hi: false, f: ['วิเคราะห์งานซ้ำซ้อน', 'ติดตั้ง AI agent บน VPS ลูกค้า', 'เทมเพลต + SOP', 'อบรมทีม 2 ครั้ง'] },
            ].map((p) => (
              <Card key={p.n} className={p.hi ? 'border-brand shadow-e2' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{p.n}</CardTitle>
                    {p.hi && <Badge variant="accent">แนะนำ</Badge>}
                  </div>
                  <div className="pt-2">
                    <span className="font-heading text-3xl font-semibold text-fg">฿{p.p}</span>
                    <span className="ml-2 text-sm text-muted">{p.u}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-fg-soft">
                    {p.f.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <Button variant={p.hi ? 'primary' : 'outline'} className="w-full">เลือกแพ็กเกจนี้</Button>
                  <p className="text-xs text-muted">ยังไม่รวม VAT 7% และค่าใช้จ่ายโฆษณา</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
        <Section title="เกณฑ์ราคาที่ใช้จริง" description="จากระบบใบเสนอราคาของ MobyConnex">
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-soft">
            <li>ระบุ “ไม่รวมอะไร” ทุกครั้ง (VAT, ค่าแพลตฟอร์ม, ค่าเดินทาง خارجกรุงเทพ)</li>
            <li>งานครั้งเดียวกับงานรายเดือนแยกให้ชัด ผู้ใช้อ่านเร็วจะได้ไม่สับสน</li>
            <li>ใช้ <code>tabular-nums</code> กับตัวเลขราคา และคั่นหลักพันด้วยจุลภาค</li>
          </ul>
        </Section>
      </div>
    </>
  )
}

export function OnboardingPattern() {
  const steps = ['ข้อมูลธุรกิจ', 'สิ่งที่ต้องการ', 'ช่องทางติดต่อ', 'ยืนยัน']
  const [step, setStep] = useState(0)
  return (
    <>
      <PageHeader
        status="beta"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'แพตเทิร์น' }, { label: 'สมัคร/เริ่มใช้งาน' }]}
        title="แพตเทิร์น: ขั้นตอนเริ่มใช้งาน"
        description="ฟอร์มยาวแบ่งเป็น 4 ขั้น — แสดงความคืบหน้าเสมอ บันทึกอัตโนมัติ และย้อนกลับได้โดยข้อมูลไม่หาย"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            plain
            code={`const steps = ['ข้อมูลธุรกิจ', 'สิ่งที่ต้องการ', 'ช่องทางติดต่อ', 'ยืนยัน']

<ol className="flex gap-2">
  {steps.map((s, i) => (
    <li key={s} className={i <= step ? 'text-brand' : 'text-muted'}>
      <span className="font-heading text-sm">{i + 1}. {s}</span>
    </li>
  ))}
</ol>
<Progress value={((step + 1) / steps.length) * 100} />`}
          >
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="flex flex-wrap gap-4">
                {steps.map((s, i) => (
                  <span key={s} className={'font-heading text-sm ' + (i <= step ? 'text-brand' : 'text-muted')}>
                    {i + 1}. {s}
                  </span>
                ))}
              </div>
              <Progress value={((step + 1) / steps.length) * 100} label={`ขั้นที่ ${step + 1} จาก ${steps.length}`} />

              <Card>
                <CardContent className="space-y-5 pt-5">
                  {step === 0 && (
                    <>
                      <Field label="ชื่อธุรกิจ" required><Input placeholder="เช่น ครัวปรัชญา" /></Field>
                      <Field label="ประเภทธุรกิจ"><Input placeholder="ร้านอาหาร / คลินิก / โชว์รูม" /></Field>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <Field label="สิ่งที่อยากได้ตอนนี้" required hint="เลือกได้มากกว่าหนึ่งในเวอร์ชันจริง">
                        <Textarea rows={3} placeholder="อยากมี Virtual Tour และให้ลูกค้าจองคิวผ่าน LINE" />
                      </Field>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <Field label="LINE ID" required><Input placeholder="@yourbrand" /></Field>
                      <Field label="อีเมล"><Input placeholder="you@company.com" /></Field>
                    </>
                  )}
                  {step === 3 && (
                    <Alert variant="info" title="ตรวจสอบก่อนส่ง">
                      เราจะติดต่อกลับภายใน 1 วันทำการ และไม่ส่งข้อมูลของคุณให้บุคคลที่สาม
                    </Alert>
                  )}
                  <div className="flex justify-between gap-3">
                    <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                      ย้อนกลับ
                    </Button>
                    <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
                      {step === steps.length - 1 ? 'ส่งข้อมูล' : 'ถัดไป'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}
