import { useState } from 'react'
import { toast } from 'sonner'
import {
  Bell, CalendarClock, Ellipsis, Inbox, LogOut, Settings, Trash2, TrendingUp, UserRound,
} from 'lucide-react'
import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { DemoBlock } from '@/components/docs/DemoBlock'
import { PropsTable } from '@/components/docs/PropsTable'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert } from '@/components/ui/alert'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EmptyState } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip } from '@/components/ui/tooltip'

export function AlertDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'กล่องแจ้งเตือน' }]}
        title="กล่องแจ้งเตือน (Alert)"
        description="ใช้กับข้อความที่ต้องอยู่บนหน้าจอถาวรจนกว่าผู้ใช้จะแก้ไข (เช่น ข้อมูลไม่ครบ) — ถ้าเป็นข้อความชั่วคราวให้ใช้ Toast"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Alert } from '@/components/ui/alert'

<Alert variant="info" title="ขั้นตอนถัดไป">แนบรูปหน้าร้าน 3 รูปเพื่อให้เราประเมินมุมถ่าย</Alert>
<Alert variant="success" title="บันทึกแล้ว">ข้อมูลลูกค้าถูกบันทึกเมื่อ 14:32 น.</Alert>
<Alert variant="warning" title="ข้อมูลยังไม่ครบ">ต้องระบุเบอร์โทรศัพท์ก่อนส่งใบเสนอราคา</Alert>
<Alert variant="danger" title="ชำระเงินไม่สำเร็จ">บัตรถูกปฏิเสธ กรุณาเปลี่ยนวิธีชำระ</Alert>`}
          >
            <div className="flex flex-col gap-3">
              <Alert variant="info" title="ขั้นตอนถัดไป">แนบรูปหน้าร้าน 3 รูปเพื่อให้เราประเมินมุมถ่าย</Alert>
              <Alert variant="success" title="บันทึกแล้ว">ข้อมูลลูกค้าถูกบันทึกเมื่อ 14:32 น.</Alert>
              <Alert variant="warning" title="ข้อมูลยังไม่ครบ">ต้องระบุเบอร์โทรศัพท์ก่อนส่งใบเสนอราคา</Alert>
              <Alert variant="danger" title="ชำระเงินไม่สำเร็จ">บัตรถูกปฏิเสธ กรุณาเปลี่ยนวิธีชำระ</Alert>
            </div>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function DialogDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'โมดัล' }]}
        title="โมดัล (Dialog)"
        description="ใช้เมื่อผู้ใช้ต้องตัดสินใจก่อนกลับไปทำงานต่อ — ปุ่มซ้ายคือทางออก ปุ่มขวาคือการกระทำหลัก และต้องปิดด้วย Esc ได้เสมอ"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog>
  <DialogTrigger asChild><Button>เพิ่มลูกค้าใหม่</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>เพิ่มลูกค้าใหม่</DialogTitle>
      <DialogDescription>กรอกข้อมูลเท่าที่มี ตอนนี้สามารถเว้นว่างได้</DialogDescription>
    </DialogHeader>
    <Field label="ชื่อบริษัท" required><Input placeholder="เช่น สยามพรีเมียมฟู้ด" /></Field>
    <DialogFooter>
      <DialogClose asChild><Button variant="ghost">ยกเลิก</Button></DialogClose>
      <Button>บันทึก</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          >
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild><Button>เพิ่มลูกค้าใหม่</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>เพิ่มลูกค้าใหม่</DialogTitle>
                    <DialogDescription>กรอกข้อมูลเท่าที่มี ตอนนี้สามารถเว้นว่างได้</DialogDescription>
                  </DialogHeader>
                  <Field label="ชื่อบริษัท" required><Input placeholder="เช่น สยามพรีเมียมฟู้ด" /></Field>
                  <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">ยกเลิก</Button></DialogClose>
                    <Button>บันทึก</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild><Button variant="danger">ยืนยันการลบ</Button></DialogTrigger>
                <DialogContent size="sm">
                  <DialogHeader>
                    <DialogTitle>ลบโปรเจกต์ถาวร?</DialogTitle>
                    <DialogDescription>การลบไม่สามารถเรียกคืนได้ รวมถึงไฟล์ Virtual Tour ที่เผยแพร่แล้ว</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">ยกเลิก</Button></DialogClose>
                    <Button variant="danger">ลบถาวร</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </DemoBlock>
        </Section>
        <Section title="พร็อพ">
          <PropsTable
            rows={[
              { name: 'size', type: "'sm' | 'md' | 'lg'", def: "'md'", desc: 'ความกว้างสูงสุด 28rem / 36rem / 48rem' },
            ]}
          />
        </Section>
        <Section title="การเข้าถึง">
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-soft">
            <li>ต้องมี DialogTitle เสมอ (อ่านออกเสียงโดยโปรแกรมอ่านหน้าจอ)</li>
            <li>โฟกัสต้องถูกดักไว้ในโมดัล และกลับไปที่ปุ่มเดิมเมื่อปิด</li>
            <li>ปุ่มอันตรายต้องไม่ใช่ปุ่มที่โฟกัสเริ่มต้น</li>
          </ul>
        </Section>
      </div>
    </>
  )
}

export function TabsDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'แท็บ' }]}
        title="แท็บ (Tabs)"
        description="ใช้สลับมุมมองของข้อมูลชุดเดียวกัน — ถ้าเนื้อหาต่างกันจริง ๆ ให้ใช้เมนูข้างหรือหน้าแยก"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
    <TabsTrigger value="tour">Virtual Tour</TabsTrigger>
    <TabsTrigger value="docs">เอกสาร</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="tour">…</TabsContent>
  <TabsContent value="docs">…</TabsContent>
</Tabs>`}
          >
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
                <TabsTrigger value="tour">Virtual Tour</TabsTrigger>
                <TabsTrigger value="docs">เอกสาร</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card><CardContent className="pt-5 text-sm text-fg-soft">ยอดผู้เข้าชม 1,204 ครั้งใน 30 วัน · อัตราการกดจอง 4.2%</CardContent></Card>
              </TabsContent>
              <TabsContent value="tour">
                <Card><CardContent className="pt-5 text-sm text-fg-soft">เผยแพร่แล้ว 2 จุด · อยู่ในคิวถ่าย 1 จุด</CardContent></Card>
              </TabsContent>
              <TabsContent value="docs">
                <Card><CardContent className="pt-5 text-sm text-fg-soft">ใบเสนอราคา QT-2026-014 · สัญญาให้บริการ · ใบเสร็จ 2 ฉบับ</CardContent></Card>
              </TabsContent>
            </Tabs>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function TooltipDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'ทูลทิป' }]}
        title="ทูลทิป (Tooltip)"
        description="ใช้ให้คำอธิบายสั้นกับไอคอนหรือคำย่อ — ห้ามใส่ข้อมูลจำเป็นลงในทูลทิปอย่างเดียว เพราะมือถือไม่มี hover"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Tooltip } from '@/components/ui/tooltip'

<Tooltip content="ยอดเข้าชมเพิ่มขึ้น 18% เทียบสัปดาห์ก่อน">
  <Button variant="secondary" size="sm"><TrendingUp className="h-4 w-4" /> แนวโน้ม</Button>
</Tooltip>`}
          >
            <div className="flex flex-wrap gap-3">
              <Tooltip content="ยอดเข้าชมเพิ่มขึ้น 18% เทียบสัปดาห์ก่อน">
                <Button variant="secondary" size="sm"><TrendingUp className="h-4 w-4" /> แนวโน้ม</Button>
              </Tooltip>
              <Tooltip content="ปิดใช้งานเพราะยังไม่ผูกบัญชี LINE OA">
                <Button variant="ghost" size="sm" disabled>ส่งแจ้งเตือน</Button>
              </Tooltip>
            </div>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function DropdownDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'เมนูย่อย' }]}
        title="เมนูย่อย (Dropdown Menu)"
        description="ใช้กับการกระทำรองของรายการนั้น (แก้ไข / ทำสำเนา / ลบ) — การกระทำหลักควรเป็นปุ่มที่มองเห็นได้"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="ตัวเลือกเพิ่มเติม"><Ellipsis /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem><UserRound /> ดูโปรไฟล์</DropdownMenuItem>
    <DropdownMenuItem><Settings /> ตั้งค่า</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive><Trash2 /> ลบโปรเจกต์</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm"><Ellipsis className="h-4 w-4" /> ตัวเลือกเพิ่มเติม</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem><UserRound className="h-4 w-4" /> ดูโปรไฟล์</DropdownMenuItem>
                <DropdownMenuItem><Settings className="h-4 w-4" /> ตั้งค่า</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive><Trash2 className="h-4 w-4" /> ลบโปรเจกต์</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function AccordionDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'แถบพับเก็บ' }]}
        title="แถบพับเก็บ (Accordion)"
        description="ใช้กับ FAQ หรือรายละเอียดเพิ่มเติมที่ไม่ต้องเห็นพร้อมกัน — บนมือถือช่วยลดการเลื่อนหน้าอย่างมาก"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="1">
    <AccordionTrigger>ใช้เวลาทำ Virtual Tour นานเท่าไร</AccordionTrigger>
    <AccordionContent>ถ่าย 2-3 ชั่วโมงต่อจุด และขึ้นระบบภายใน 3 วันทำการ</AccordionContent>
  </AccordionItem>
  ...
</Accordion>`}
          >
            <Accordion type="single" collapsible className="rounded-lg border border-line bg-surface px-5">
              <AccordionItem value="1">
                <AccordionTrigger>ใช้เวลาทำ Virtual Tour นานเท่าไร</AccordionTrigger>
                <AccordionContent>ถ่าย 2-3 ชั่วโมงต่อจุด และขึ้นระบบภายใน 3 วันทำการ</AccordionContent>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionTrigger>ต้องเตรียมอะไรก่อนถ่าย</AccordionTrigger>
                <AccordionContent>เก็บของที่ไม่ต้องการให้ติดภาพ เปิดไฟทุกดวง และแจ้งจุดที่อยากเน้นเป็นพิเศษ</AccordionContent>
              </AccordionItem>
              <AccordionItem value="3">
                <AccordionTrigger>แก้ไขภายหลังได้ไหม</AccordionTrigger>
                <AccordionContent>ปรับ hotspot และข้อความได้ตลอด ไม่มีค่าใช้จ่ายเพิ่มในรอบ 3 เดือนแรก</AccordionContent>
              </AccordionItem>
            </Accordion>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function TableDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'ตาราง' }]}
        title="ตาราง (Table)"
        description="ใช้กับข้อมูลเชิงเปรียบเทียบที่มีคอลัมน์ชัดเจน — ถ้ามีเกิน 6 คอลัมน์บนมือถือ ให้เปลี่ยนเป็นการ์ดต่อรายการ"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>ลูกค้า</TableHead>
      <TableHead>แพ็กเกจ</TableHead>
      <TableHead>สถานะ</TableHead>
      <TableHead className="text-right">มูลค่า</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>สยามพรีเมียมฟู้ด</TableCell>
      <TableCell>Virtual Visibility Sprint</TableCell>
      <TableCell><Badge variant="success" className="w-fit">ชำระแล้ว</Badge></TableCell>
      <TableCell className="text-right">48,150</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>แพ็กเกจ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">มูลค่า (บาท)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { c: 'สยามพรีเมียมฟู้ด', p: 'Virtual Visibility Sprint', s: 'success', st: 'ชำระแล้ว', v: '48,150' },
                  { c: 'ครัวปรัชญา', p: 'Growth Operations', s: 'warning', st: 'รอชำระ', v: '26,750' },
                  { c: 'Coach Kate', p: 'AI Workflow Sprint', s: 'info', st: 'กำลังทำ', v: '64,200' },
                ].map((r) => (
                  <TableRow key={r.c}>
                    <TableCell className="font-medium text-fg">{r.c}</TableCell>
                    <TableCell>{r.p}</TableCell>
                    <TableCell><Badge variant={r.s as any}>{r.st}</Badge></TableCell>
                    <TableCell className="text-right tabular-nums">{r.v}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DemoBlock>
        </Section>
        <Section title="แนวปฏิบัติ">
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-soft">
            <li>ตัวเลขให้ชิดขวาและใช้ <code>tabular-nums</code> เพื่อให้หลักตรงกัน</li>
            <li>หัวตารางเป็นตัวพิมพ์ใหญ่เล็ก (uppercase) ขนาด 12px ตาม TableHead</li>
            <li>ถ้ามีการเรียงลำดับ ให้แสดงลูกศรในหัวคอลัมน์ที่เรียงอยู่</li>
          </ul>
        </Section>
      </div>
    </>
  )
}

export function AvatarDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'รูปโปรไฟล์' }]}
        title="รูปโปรไฟล์ (Avatar)"
        description="ใช้แสดงตัวตนของลูกค้า/ทีม — ถ้าไม่มีรูป จะถอยไปใช้อักษรย่อบนพื้นสีแบรนด์อ่อนเสมอ"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Avatar } from '@/components/ui/avatar'

<Avatar src="/customers/siam.png" alt="สยามพรีเมียมฟู้ด" size="lg" />
<Avatar fallback="กป" />
<Avatar fallback="BK" size="sm" />`}
          >
            <div className="flex items-center gap-5">
              <Avatar fallback="SP" size="lg" />
              <Avatar fallback="กป" />
              <Avatar fallback="BK" size="sm" />
              <div className="flex items-center gap-3 rounded-full border border-line bg-surface py-1 pl-1 pr-4">
                <Avatar fallback="ปท" size="sm" />
                <div className="leading-tight">
                  <p className="font-heading text-sm font-medium">ปรีชา ทองดี</p>
                  <p className="text-xs text-muted">ผู้ดูแลระบบ</p>
                </div>
              </div>
            </div>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function ProgressDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'แถบความคืบหน้า' }]}
        title="แถบความคืบหน้า (Progress)"
        description="ใช้กับงานที่รู้เปอร์เซ็นต์แน่นอน (อัปโหลด ถ่ายทำ ส่งใบเสนอราคา) — ถ้าไม่รู้ความคืบหน้า ให้ใช้ Skeleton แทน"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Progress } from '@/components/ui/progress'

<Progress value={68} label="ถ่ายภาพและขึ้นระบบ" />`}
          >
            <div className="flex max-w-md flex-col gap-5">
              <Progress value={100} label="รับข้อมูลลูกค้า" />
              <Progress value={68} label="ถ่ายภาพและขึ้นระบบ" />
              <Progress value={25} label="ตรวจทานและเผยแพร่" />
            </div>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function SkeletonDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'โครงร่างรอโหลด' }]}
        title="โครงร่างรอโหลด (Skeleton)"
        description="ใช้แทนพื้นที่ที่กำลังโหลด โดยโครงร่างควรมีขนาดใกล้เคียงเนื้อหาจริง เพื่อลดการกระตุกเมื่อข้อมูลมา"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Skeleton } from '@/components/ui/skeleton'

<div className="flex items-center gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="flex-1 space-y-2">
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-3 w-64" />
  </div>
</div>`}
          >
            <div className="flex flex-col gap-4">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-64" />
                  </div>
                  <Skeleton className="h-8 w-20 rounded" />
                </div>
              ))}
            </div>
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function BreadcrumbDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'เส้นทางนำทาง' }]}
        title="เส้นทางนำทาง (Breadcrumb)"
        description="ใช้กับหน้าย่อยที่ลึกกว่า 2 ชั้น เพื่อให้ผู้ใช้รู้ว่าอยู่ตรงไหนและย้อนกลับได้"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { Breadcrumb } from '@/components/ui/breadcrumb'

<Breadcrumb items={[
  { label: 'ลูกค้า', to: '/customers' },
  { label: 'สยามพรีเมียมฟู้ด', to: '/customers/siam' },
  { label: 'ใบเสนอราคา QT-2026-014' },
]} />`}
          >
            <Breadcrumb
              items={[
                { label: 'ลูกค้า', to: '/' },
                { label: 'สยามพรีเมียมฟู้ด', to: '/' },
                { label: 'ใบเสนอราคา QT-2026-014' },
              ]}
            />
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function EmptyStateDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'พื้นที่ว่าง' }]}
        title="พื้นที่ว่าง (Empty State)"
        description="ทุกหน้าจอที่ยังไม่มีข้อมูลต้องบอก 3 อย่าง: เกิดอะไรขึ้น ทำไมยังว่าง และทำอะไรต่อได้"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'

<EmptyState
  icon={<Inbox />}
  title="ยังไม่มีข้อความจากลูกค้า"
  description="เมื่อลูกค้าทักผ่าน LINE หรือฟอร์มเว็บ ข้อความจะปรากฏที่นี่"
  action={<Button>เชื่อมต่อ LINE OA</Button>}
/>`}
          >
            <EmptyState
              icon={<Inbox />}
              title="ยังไม่มีข้อความจากลูกค้า"
              description="เมื่อลูกค้าทักผ่าน LINE หรือฟอร์มเว็บ ข้อความจะปรากฏที่นี่"
              action={<Button>เชื่อมต่อ LINE OA</Button>}
            />
          </DemoBlock>
        </Section>
      </div>
    </>
  )
}

export function ToastDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'คอมโพเนนต์' }, { label: 'แจ้งเตือนชั่วคราว' }]}
        title="แจ้งเตือนชั่วคราว (Toast)"
        description="ใช้ยืนยันผลของการกระทำที่เพิ่งเกิดขึ้น (บันทึก/ส่ง/ลบ) แล้วหายเองใน 4 วินาที — ไม่ใช้แจ้งข้อผิดพลาดที่ต้องแก้ในฟอร์ม"
      />
      <div className="flex flex-col gap-10">
        <Section title="ตัวอย่าง">
          <DemoBlock
            code={`import { toast } from 'sonner'

toast.success('บันทึกข้อมูลลูกค้าแล้ว')
toast.error('ส่งใบเสนอราคาไม่สำเร็จ กรุณาลองใหม่')
toast('กำลังซิงก์ข้อมูลกับ LINE OA…')

toast.promise(saveCustomer(), {
  loading: 'กำลังบันทึก…',
  success: 'บันทึกเรียบร้อย',
  error: 'บันทึกไม่สำเร็จ',
})`}
          >
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success('บันทึกข้อมูลลูกค้าแล้ว')}>แจ้งสำเร็จ</Button>
              <Button variant="danger" onClick={() => toast.error('ส่งใบเสนอราคาไม่สำเร็จ กรุณาลองใหม่')}>แจ้งข้อผิดพลาด</Button>
              <Button
                variant="secondary"
                onClick={() =>
                  toast.promise(new Promise((r) => setTimeout(r, 1600)), {
                    loading: 'กำลังซิงก์ข้อมูลกับ LINE OA…',
                    success: 'ซิงก์ข้อมูลเรียบร้อย',
                    error: 'ซิงก์ไม่สำเร็จ',
                  })
                }
              >
                กำลังดำเนินการ
              </Button>
            </div>
          </DemoBlock>
        </Section>
        <Section title="หลักการ">
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-soft">
            <li>ข้อความต้องบอกผลลัพธ์ ไม่ใช่แค่ “สำเร็จ” — เช่น “ส่งใบเสนอราคาถึงคุณสมชายแล้ว”</li>
            <li>ข้อผิดพลาดที่ผู้ใช้ต้องแก้ ให้แสดงในฟอร์ม ไม่ใช่ toast</li>
            <li>ไม่ซ้อน toast เกิน 3 อันพร้อมกัน</li>
          </ul>
        </Section>
      </div>
    </>
  )
}
