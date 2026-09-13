import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Layers, Palette, ShieldCheck, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function ShowcasePage() {
  return (
    <div className="flex flex-col gap-14 pb-10">
      <header className="flex flex-col gap-4">
        <Badge variant="soft" className="w-fit gap-1.5"><Sparkles className="h-3.5 w-3.5" /> ผลงานและมาตรฐานงานของเรา</Badge>
        <h1 className="font-heading text-4xl font-semibold">ทุกงานออกจากมาตรฐานเดียวกัน</h1>
        <p className="max-w-3xl text-lg text-fg-soft">
          ลูกค้าของเรามักถามว่า “งานจะออกมาแบบไหน” — หน้านี้รวมมาตรฐานที่เราใช้กับทุกโปรเจกต์
          เพื่อให้คุณเห็นภาพก่อนตัดสินใจ และเห็นว่าเราไม่ได้เริ่มจากศูนย์ทุกครั้ง
        </p>
      </header>

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          { i: <Palette className="h-5 w-5" />, t: 'ดีไซน์ตามแบรนด์คุณ', d: 'เริ่มจากสี ฟอนต์ และโทนเสียงของธุรกิจคุณ ไม่ยัดเทมเพลตสำเร็จรูป' },
          { i: <Layers className="h-5 w-5" />, t: 'โครงสร้างที่ต่อยอดได้', d: 'เพิ่มหน้าหรือระบบใหม่ภายหลังได้โดยไม่ต้องรื้อทั้งเว็บ' },
          { i: <ShieldCheck className="h-5 w-5" />, t: 'ข้อมูลอยู่กับคุณ', d: 'ระบบที่ติดตั้งรันบนเซิร์ฟเวอร์คุณ พร้อมสัญญาประมวลผลข้อมูล (DPA)' },
        ].map((c) => (
          <Card key={c.t}>
            <CardContent className="space-y-3 pt-5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft text-brand">{c.i}</span>
              <p className="font-heading text-base font-medium">{c.t}</p>
              <p className="text-sm text-muted">{c.d}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-semibold">ตัวอย่างขอบเขตงานที่ส่งมอบ</h2>
          <p className="text-fg-soft">ตารางนี้คือสิ่งที่ลูกค้าได้รับจริงในแต่ละแพ็กเกจ — ใช้ประกอบการตัดสินใจ</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>หัวข้อ</TableHead>
              <TableHead>Virtual Visibility Sprint</TableHead>
              <TableHead>Growth Operations</TableHead>
              <TableHead>AI Workflow Sprint</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ['Virtual Tour 360°', '1-3 จุด', 'เพิ่มจุดได้ตามต้องการ', '—'],
              ['หน้าเว็บ', 'หน้าเว็บพร้อมใช้งาน', 'ดูแลและเพิ่มเนื้อหา', '—'],
              ['Google Business Profile', 'ตั้งค่า + ตรวจความถูกต้อง', 'ดูแลต่อเนื่อง', '—'],
              ['คอนเทนต์ SEO', 'โครงหลัก 5 หน้า', '4 ชิ้น/เดือน', 'คู่มือและเทมเพลต'],
              ['ระบบอัตโนมัติ / AI', '—', 'ตามความต้องการ', 'ติดตั้งบน VPS ของคุณ'],
              ['การสอนทีม', '1 ชั่วโมง', 'ประชุมรายเดือน', 'อบรม 2 ครั้ง + ติดตาม 30 วัน'],
              ['รายงานผล', 'สรุปหลังส่งมอบ', 'รายงานรายเดือน', 'รายงานผลก่อน-หลัง'],
            ].map((r) => (
              <TableRow key={r[0]}>
                <TableCell className="font-medium text-fg">{r[0]}</TableCell>
                <TableCell>{r[1]}</TableCell>
                <TableCell>{r[2]}</TableCell>
                <TableCell>{r[3]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>เกณฑ์ที่เราตรวจก่อนส่งงานทุกครั้ง</CardTitle>
            <CardDescription>ลูกค้าไม่ต้องเจอปัญหาที่เราตรวจเองได้</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {[
              'เปิดบนมือถือรุ่นเล็กแล้วอ่านออก กดถูกปุ่ม',
              'ความเร็วหน้าแรกต่ำกว่า 3 วินาทีบน 4G',
              'ปุ่มโทร/LINE/แผนที่ ทำงานจริงทุกหน้า',
              'ฟอร์มส่งข้อมูลเข้าระบบ และมีอีเมลแจ้งทีม',
              'ข้อความทุกหน้าไม่มีคำที่ทำให้เข้าใจผิด',
              'ส่งมอบคู่มือแก้ไข + วิดีโอสั้นให้ทีมลูกค้า',
            ].map((x) => (
              <div key={x} className="flex items-start gap-2 text-sm text-fg-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {x}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>อยากเห็นมาตรฐานงานแบบละเอียด?</CardTitle>
            <CardDescription>ระบบดีไซน์ของเราเปิดให้ดูได้ ว่าสี ฟอนต์ และคอมโพเนนต์ทุกตัวถูกกำหนดอย่างไร</CardDescription>
          </CardHeader>
          <CardContent className="mt-auto space-y-4">
            <Button asChild className="w-full">
              <Link to="/design-system">เปิดระบบดีไซน์ MobyConnex <ArrowUpRight className="h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a href="/#contact">ขอใบเสนอราคา</a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
