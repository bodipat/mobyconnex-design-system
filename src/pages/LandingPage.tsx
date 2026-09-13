import { Link } from 'react-router-dom'
import {
  ArrowRight, Bot, CalendarCheck, Check, Globe2, Headset, MapPin, MessageSquare,
  Search, Sparkles, Star, TrendingUp, Workflow,
} from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const SERVICES = [
  {
    icon: <MapPin className="h-5 w-5" />,
    tag: 'Virtual Visibility Sprint',
    title: 'ให้ลูกค้าหาเจอ และเห็นร้านก่อนตัดสินใจ',
    desc: 'ถ่ายภาพ 360° ขึ้น Google Maps / Street View พร้อมหน้าเว็บที่ตอบคำถามลูกค้าได้ครบ จบใน 3 สัปดาห์',
    items: ['Virtual Tour 360° และ hotspot แนะนำ', 'Google Business Profile + แผนที่', 'หน้าเว็บพร้อมปุ่มโทร/LINE', 'สอนดูสถิติและแก้ไขเองได้'],
    chip: 'chip-teal',
    topline: 'topline-teal',
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    tag: 'Growth Operations',
    title: 'ดูแลการเติบโตออนไลน์แบบรายเดือน',
    desc: 'เหมือนมีทีมดิจิทัลประจำ ไม่ต้องจ้างหลายเจ้า — ดูแลเว็บ คอนเทนต์ SEO และดูแคมเปญโฆษณาให้',
    items: ['ดูแลหน้าเว็บและความเร็ว', 'คอนเทนต์ SEO ภาษาไทย/อังกฤษ', 'ดูแลและรายงานแคมเปญโฆษณา', 'ประชุมสรุปผลรายเดือน'],
    chip: 'chip-lime',
    topline: 'topline-lime',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    tag: 'AI Workflow Sprint',
    title: 'เอา AI มาทำงานซ้ำ ๆ แทนทีมคุณ',
    desc: 'เราวิเคราะห์งานที่กินเวลาที่สุด แล้วติดตั้งระบบ AI บนเซิร์ฟเวอร์ของคุณเอง พร้อมสอนทีมให้ใช้ได้จริง',
    items: ['วิเคราะห์งานซ้ำซ้อนและจุดคอขวด', 'AI agent / ระบบอัตโนมัติบน VPS ของคุณ', 'เทมเพลตตอบลูกค้าและ SOP', 'อบรมทีม + ติดตามผล 30 วัน'],
    chip: 'chip-navy',
    topline: 'topline-navy',
  },
]

const STEPS = [
  { n: '01', t: 'คุยโจทย์ 30 นาที', d: 'ประเมินว่าลูกค้าค้นหาคุณด้วยคำอะไร และคู่แข่งทำอะไรอยู่', i: <Search className="h-5 w-5" />, chip: 'chip-teal' },
  { n: '02', t: 'ใบเสนอราคา 1 วันทำการ', d: 'ระบุขอบเขต สิ่งที่รวม/ไม่รวม และกำหนดส่งงานชัดเจน', i: <CalendarCheck className="h-5 w-5" />, chip: 'chip-lime' },
  { n: '03', t: 'ลงมือทำ + รายงาน', d: 'อัปเดตความคืบหน้าที่คุณเห็นได้ ไม่ต้องรอถาม', i: <Workflow className="h-5 w-5" />, chip: 'chip-sun' },
  { n: '04', t: 'สอนและส่งมอบ', d: 'ทีมคุณแก้ไขเองได้ พร้อมคู่มือและวิดีโอสั้น', i: <Headset className="h-5 w-5" />, chip: 'chip-navy' },
]

const CASES = [
  { name: 'SDesigns (Royal Botania Thailand)', work: 'เว็บไซต์ + Growth Operations', result: 'ดูแลต่อเนื่องรายเดือน', icon: <Globe2 className="h-4 w-4" />, chip: 'chip-teal' },
  { name: 'ครัวปรัชญา', work: 'Virtual Tour + LINE booking', result: 'ลูกค้าจองคิวเองได้ 24 ชม.', icon: <CalendarCheck className="h-4 w-4" />, chip: 'chip-lime' },
  { name: 'Coach Kate', work: 'เว็บไซต์ + AI Workflow', result: 'ลดเวลาตอบลูกค้าด้วยเทมเพลต AI', icon: <Headset className="h-4 w-4" />, chip: 'chip-sun' },
  { name: '3B Printing', work: 'AI Workflow Sprint', result: 'ระบบรับงานและแจ้งสถานะอัตโนมัติ', icon: <Workflow className="h-4 w-4" />, chip: 'chip-navy' },
]

export function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section className="wash-hero relative overflow-hidden rounded-2xl border border-line px-6 py-14 shadow-e1 sm:px-12">
        <div className="brand-rule absolute inset-x-0 top-0" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[var(--teal)] ring-1 ring-[var(--teal)]/25 backdrop-blur dark:bg-white/5">
              <Sparkles className="h-3.5 w-3.5" /> ที่ปรึกษา AI + ดิจิทัลสำหรับ SME ไทย
            </span>

            <h1 className="font-heading text-4xl font-semibold leading-tight sm:text-5xl">
              ให้ลูกค้าไทย<span className="text-gradient">หาเจอ</span> และ<span className="text-gradient">จอง</span>ธุรกิจคุณได้เอง
            </h1>

            <p className="max-w-xl text-lg text-fg-soft">
              MobyConnex เริ่มจากสิ่งที่เจ้าของร้านเห็นผลเร็วที่สุด — ให้ร้านคุณโผล่บน Google Maps พร้อมภาพ 360°
              แล้วต่อยอดด้วยเว็บที่ทำงานแทนคุณ และ AI ที่ลดงานซ้ำซ้อนของทีม
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#contact">ขอใบเสนอราคา <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="accent" asChild>
                <Link to="/design-system">ดูระบบดีไซน์ของเรา</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm">
              <span className="inline-flex items-center gap-1.5 font-medium text-[var(--teal)]">
                <Check className="h-4 w-4" /> เริ่มเห็นผลใน 3 สัปดาห์
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#3F7A1F] dark:text-[#A8E88A]">
                <Check className="h-4 w-4" /> ข้อมูลอยู่บนเซิร์ฟเวอร์ของคุณ
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-brand">
                <Check className="h-4 w-4" /> ดูแลต่อเนื่องโดยทีมเดิม
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface/90 p-6 shadow-e2 backdrop-blur">
            <p className="font-heading text-sm font-medium text-muted">สิ่งที่ลูกค้าถามบ่อยก่อนตัดสินใจ</p>
            <div className="mt-4 space-y-3">
              {[
                { q: 'ค่าใช้จ่ายเริ่มต้นเท่าไร และได้อะไรบ้าง', c: 'chip-teal' },
                { q: 'ถ้าลูกค้าไม่ค้นหาชื่อร้านบน Google ล่ะ', c: 'chip-lime' },
                { q: 'ข้อมูลของเราไปอยู่กับบริษัทอื่นหรือไม่', c: 'chip-navy' },
              ].map((x) => (
                <div key={x.q} className="flex items-start gap-3 rounded-lg border border-line bg-surface p-3 text-sm">
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${x.c}`}>
                    <MessageSquare className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-fg-soft">{x.q}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              ตอบทุกคำถามในใบเสนอราคา และคุยผ่าน LINE ได้ก่อนตัดสินใจ
            </p>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className="tint-lime -mx-4 mt-16 px-4 py-14 sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Badge variant="accent" className="w-fit">บริการของเรา</Badge>
            <h2 className="accent-bar font-heading text-3xl font-semibold">3 บริการที่เริ่มได้ตามลำดับความจำเป็น</h2>
            <p className="max-w-3xl text-fg-soft">
              เราไม่ขายทั้งชุดพร้อมกัน แต่ประเมินว่าตอนนี้ธุรกิจคุณขาดอะไรมากที่สุด — ส่วนใหญ่เริ่มจาก Virtual Visibility Sprint
              เพราะเห็นผลเร็วและต่อยอดได้ทันที
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Card key={s.tag} className={`flex flex-col ${s.topline} shadow-e2`}>
                <CardHeader>
                  <div className="flex items-center gap-2.5">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl ${s.chip}`}>{s.icon}</span>
                    <span className="font-heading text-xs font-semibold uppercase tracking-wide text-muted">{s.tag}</span>
                  </div>
                  <CardTitle className="pt-2">{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-2.5">
                  {s.items.map((i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-fg-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {i}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="tint-navy -mx-4 px-4 py-14 sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Badge variant="brand" className="w-fit">ขั้นตอนทำงาน</Badge>
            <h2 className="accent-bar font-heading text-3xl font-semibold">4 ขั้นตอน ไม่มีค่าใช้จ่ายแอบแฝง</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <Card key={s.n} className="bg-surface/90">
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between">
                    <span className={`grid h-9 w-9 place-items-center rounded-lg ${s.chip}`}>{s.i}</span>
                    <span className="font-heading text-3xl font-semibold text-brand/15">{s.n}</span>
                  </div>
                  <p className="mt-3 font-heading text-base font-medium">{s.t}</p>
                  <p className="mt-1 text-sm text-muted">{s.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CASES ============ */}
      <section className="py-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Badge variant="soft" className="w-fit">ตัวอย่างงาน</Badge>
            <h2 className="accent-bar font-heading text-3xl font-semibold">ธุรกิจที่เราดูแลอยู่</h2>
            <p className="max-w-3xl text-fg-soft">จากร้านอาหาร คลินิก ไปจนถึงแบรนด์สินค้าพรีเมียม — ทุกงานเริ่มจากการเข้าใจลูกค้าจริงของธุรกิจนั้น</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {CASES.map((c) => (
              <Card key={c.name} interactive>
                <CardContent className="flex items-start gap-4 pt-5">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${c.chip}`}>{c.icon}</span>
                  <div>
                    <p className="font-heading text-base font-medium">{c.name}</p>
                    <p className="text-sm text-muted">{c.work}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--teal)]">
                      <Check className="h-3.5 w-3.5" /> {c.result}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-line bg-[var(--sun-soft)] px-4 py-3 text-sm text-[#8A5200] dark:text-[#FBBF24]">
            <Star className="h-4 w-4 shrink-0" />
            ต้องการดูรายละเอียดเคสแบบเต็ม (ตัวเลขจริง) ทัก LINE มาได้ เราส่งเป็นไฟล์ให้
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="tint-teal -mx-4 px-4 py-14 sm:-mx-6 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-3">
            <Badge variant="info" className="w-fit">คำถามที่พบบ่อย</Badge>
            <h2 className="accent-bar font-heading text-3xl font-semibold">ตอบก่อนที่คุณจะถาม</h2>
            <p className="text-fg-soft">ถ้าไม่เจอคำตอบที่ต้องการ ทัก LINE มาคุยได้เลย ตอบภายในวันทำการ</p>
            <Button variant="outline" asChild className="mt-2 w-fit">
              <a href="#contact"><Bot className="h-4 w-4" /> คุยกับทีมงาน</a>
            </Button>
          </div>
          <Accordion type="single" collapsible className="rounded-xl border border-line bg-surface px-5 shadow-e1">
            {[
              { q: 'ต้องมีเว็บไซต์อยู่แล้วหรือไม่', a: 'ไม่จำเป็น เราทำหน้าเว็บให้พร้อมในแพ็กเกจแรก หรือถ้ามีเว็บอยู่แล้วจะปรับของเดิมให้ก็ได้ (ถ้าโครงเว็บเดิมไม่เป็นอุปสรรค)' },
              { q: 'Virtual Tour ต่างจากรูปถ่ายปกติอย่างไร', a: 'ลูกค้าเดินดูร้านได้ 360° จากมือถือ เห็นบรรยากาศและขนาดพื้นที่จริง ซึ่งช่วยลดคำถามซ้ำและเพิ่มความมั่นใจก่อนเดินทางมาถึงร้าน' },
              { q: 'ข้อมูลของเราถูกเก็บที่ไหน', a: 'ระบบที่เราติดตั้งให้ (เช่น AI agent หรือระบบจองคิว) รันบนเซิร์ฟเวอร์ของคุณเอง ข้อมูลลูกค้าไม่ถูกส่งออกไปยังบุคคลที่สาม และเราทำสัญญาการประมวลผลข้อมูล (DPA) ให้' },
              { q: 'ใช้เวลานานแค่ไหนและเริ่มได้เมื่อไร', a: 'Virtual Visibility Sprint ประมาณ 3 สัปดาห์ เริ่มได้ภายใน 1-2 สัปดาห์หลังยืนยันใบเสนอราคา ขึ้นกับคิวถ่ายภาพ' },
              { q: 'มีค่าดูแลรายเดือนบังคับไหม', a: 'ไม่บังคับ งานครั้งเดียวจบได้ แต่ถ้าต้องการให้ดูแลเว็บ/โฆษณาต่อเนื่อง มีแพ็กเกจ Growth Operations รายเดือน' },
            ].map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ============ CONTACT (พื้นกรมท่าให้ตัดกับโหมดสว่าง) ============ */}
      <section id="contact" className="-mx-4 mt-14 px-4 pb-4 sm:-mx-6 sm:px-6">
        <div className="panel-navy overflow-hidden rounded-2xl shadow-e3">
          <div className="brand-rule" />
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-4">
              <span className="w-fit rounded-full bg-[#7ED956]/15 px-3 py-1 text-xs font-medium text-[#A8E88A]">
                คุยโจทย์ฟรี 30 นาที
              </span>
              <h2 className="font-heading text-3xl font-semibold text-white">เริ่มจากคุยโจทย์ 30 นาที ไม่มีค่าใช้จ่าย</h2>
              <p className="text-white/75">
                เล่าให้เราฟังว่าตอนนี้ธุรกิจคุณเสียลูกค้าไปตรงไหน เราจะบอกตรง ๆ ว่าอะไรช่วยได้ อะไรยังไม่ควรลงทุน
                — ถ้าไม่ใช่เรื่องที่เราถนัด เราจะบอกและแนะนำคนที่เหมาะกว่า
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button size="lg" variant="accent" asChild>
                  <a href="https://lin.ee/" target="_blank" rel="noreferrer"><MessageSquare className="h-4 w-4" /> ทัก LINE</a>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <a href="mailto:hello@mobyconnex.com"><Headset className="h-4 w-4" /> ส่งอีเมล</a>
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-white/15 bg-white/5 p-5">
              <p className="font-heading text-sm font-medium text-white">สิ่งที่ควรเตรียมมา</p>
              {['ชื่อธุรกิจ + พื้นที่ให้บริการ', 'คำที่ลูกค้ามักใช้ค้นหาคุณ', 'เว็บ/เพจที่มีอยู่ตอนนี้', 'งบประมาณคร่าว ๆ ต่อเดือน'].map((x) => (
                <div key={x} className="flex items-center gap-2 text-sm text-white/80">
                  <Check className="h-4 w-4 shrink-0 text-[#7ED956]" /> {x}
                </div>
              ))}
              <p className="mt-2 text-xs text-white/55">ไม่ต้องเตรียมครบก็ได้ เราช่วยประเมินให้ได้ในบทสนทนา</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
