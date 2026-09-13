import { Link } from 'react-router-dom'
import { ArrowRight, Boxes, Compass, LayoutTemplate, Palette } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { componentDocs, foundationDocs, guidelineDocs, patternDocs } from '@/content/registry'

const GROUPS = [
  { title: 'รากฐาน', desc: 'สี ตัวอักษร ระยะห่าง มุมโค้ง เงา และโลโก้', icon: <Palette className="h-5 w-5" />, docs: foundationDocs, to: '/docs/logo' },
  { title: 'คอมโพเนนต์', desc: 'คอมโพเนนต์ที่ใช้งานจริง พร้อมเดโมและโค้ดคัดลอกได้', icon: <Boxes className="h-5 w-5" />, docs: componentDocs, to: '/docs/button' },
  { title: 'แพตเทิร์น', desc: 'หน้าจอธุรกิจ: ใบเสนอราคา แดชบอร์ด LINE จองคิว', icon: <LayoutTemplate className="h-5 w-5" />, docs: patternDocs, to: '/docs/pattern-quote' },
  { title: 'แนวทาง', desc: 'โทนภาษา การเข้าถึง และเกณฑ์ตรวจงาน', icon: <Compass className="h-5 w-5" />, docs: guidelineDocs, to: '/docs/voice' },
]

export function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-10">
      <header className="flex flex-col gap-4">
        <Badge variant="soft" className="w-fit">ระบบดีไซน์กลางของ MobyConnex</Badge>
        <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-tight">
          ทุกหน้าจอของ MobyConnex เริ่มจาก<span className="text-brand">มาตรฐานชุดเดียวกัน</span>
        </h1>
        <p className="max-w-3xl text-lg text-fg-soft">
          สี ตัวอักษร คอมโพเนนต์ และแพตเทิร์นงานธุรกิจ รวมไว้ที่นี่ เพื่อให้งานลูกค้าและผลิตภัณฑ์ภายในเร่งงานได้เร็ว
          และคุณภาพไม่แกว่งตามคนทำ
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild><Link to="/docs/overview">เริ่มอ่านภาพรวม <ArrowRight className="h-4 w-4" /></Link></Button>
          <Button variant="outline" asChild><Link to="/docs/colors">ดูจานสีแบรนด์</Link></Button>
          <Button variant="ghost" asChild><Link to="/">ไปหน้าเว็บบริการ</Link></Button>
        </div>
        <div className="flex flex-wrap gap-6 pt-2 text-sm text-muted">
          <span><strong className="font-heading text-fg">{foundationDocs.length}</strong> หมวดรากฐาน</span>
          <span><strong className="font-heading text-fg">{componentDocs.length}</strong> คอมโพเนนต์</span>
          <span><strong className="font-heading text-fg">{patternDocs.length}</strong> แพตเทิร์นงานจริง</span>
          <span><strong className="font-heading text-fg">{guidelineDocs.length}</strong> แนวทาง</span>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {GROUPS.map((g) => (
          <Card key={g.title} interactive>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft text-brand">{g.icon}</span>
                <Badge>{g.docs.length} รายการ</Badge>
              </div>
              <CardTitle className="pt-2">{g.title}</CardTitle>
              <CardDescription>{g.desc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {g.docs.slice(0, 4).map((d) => (
                <Link key={d.slug} to={`/docs/${d.slug}`} className="flex items-center justify-between rounded px-2 py-1.5 text-sm text-fg-soft transition hover:bg-surface-2 hover:text-brand">
                  <span>{d.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                </Link>
              ))}
              <Link to={g.to} className="mt-1 inline-flex items-center gap-1 px-2 text-sm font-medium text-brand hover:underline">
                ดูทั้งหมด <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border border-line">
        <div className="h-1.5 bg-brand-gradient" />
        <div className="grid gap-6 p-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-2xl font-semibold">เริ่มใช้กับโปรเจกต์ใหม่</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-fg-soft">
              <li>คัดลอก <code>src/components/ui</code> และ <code>src/styles/tokens.css</code> ไปยังโปรเจกต์ใหม่</li>
              <li>ตั้งค่า Tailwind ให้มีสีที่อ้าง CSS variable (ดู <code>tailwind.config.js</code>)</li>
              <li>ใช้ฟอนต์ Kanit (หัวข้อ) + IBM Plex Sans Thai Looped (เนื้อความ)</li>
              <li>ตรวจ checklist ในหัวข้อ “การเข้าถึง” ก่อนส่งงานลูกค้าทุกครั้ง</li>
            </ol>
          </div>
          <div className="rounded-lg border border-line bg-surface-2 p-5">
            <p className="font-heading text-sm font-medium">หมายเหตุการทำงาน</p>
            <ul className="mt-3 space-y-2 text-sm text-fg-soft">
              <li>ปรับสีหรือฟอนต์แบรนด์ให้ลูกค้าได้ที่ไฟล์เดียว แล้วทุกคอมโพเนนต์เปลี่ยนตาม</li>
              <li>ถ้าลูกค้ามี brand guideline อยู่แล้ว ให้แมปค่ามาที่ token ของระบบนี้ ไม่สร้างชุดใหม่</li>
              <li>คอมโพเนนต์ใหม่ที่ใช้ซ้ำได้ ให้เพิ่มเข้าหน้านี้พร้อมเดโมและพร็อพ</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
