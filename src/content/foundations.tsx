import { PageHeader } from '@/components/docs/PageHeader'
import { Section } from '@/components/docs/Section'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function LogoDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'รากฐาน' }, { label: 'โลโก้และแบรนด์' }]}
        title="โลโก้และแบรนด์"
        description="MobyConnex สื่อสารผ่านโครงข่ายจุด–เส้น (Connection Network) สื่อถึงการเชื่อมต่อระบบของลูกค้าเข้ากับงานดิจิทัล สีหลักคือกรมท่า + เขียวสด และมีไล่สี teal → เขียว ในเวิร์ดมาร์ค"
      />
      <div className="flex flex-col gap-10">
        <Section title="โลโก้ที่ใช้ได้" description="เลือกไฟล์ตามพื้นหลัง — ห้ามเปลี่ยนสีหรือสัดส่วน">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { src: '/brand/mobyconnex-horizontal.png', label: 'แนวนอน — พื้นสว่าง', note: 'ใช้เป็นค่าเริ่มต้นในเว็บ/เอกสาร' },
              { src: '/brand/mobyconnex-on-navy.png', label: 'แนวนอน — พื้นกรมท่า', note: 'ใช้บนพื้นเข้ม/สไลด์' },
              { src: '/brand/mobyconnex-footer.png', label: 'แนวนอน — ฝังพื้นกรมท่า (ทึบ)', note: 'ใช้เมื่อพื้นหลังสีคงที่ ไม่มีรอยกล่อง' },
              { src: '/brand/mobyconnex-on-green.png', label: 'แนวนอน — พื้นเขียว', note: 'ใช้ในงานโปรโมชัน' },
              { src: '/brand/mobyconnex-vertical.png', label: 'แนวตั้ง — พื้นสว่าง', note: 'ใช้เมื่อพื้นที่แคบ' },
            ].map((l) => (
              <Card key={l.label}>
                <CardContent className="flex flex-col gap-3 pt-5">
                  <div className="grid h-32 place-items-center rounded border border-line bg-[#F2F8FB]">
                    <img src={l.src} alt={l.label} className="max-h-24 w-auto" />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-medium">{l.label}</p>
                    <p className="text-xs text-muted">{l.note}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <CodeBlock
            lang="html"
            filename="การใช้งาน"
            code={`<img src="/brand/mobyconnex-horizontal.png" alt="MobyConnex" class="h-8 w-auto" />

<!-- พื้นเข้ม -->
<img src="/brand/mobyconnex-on-navy.png" alt="MobyConnex" />`}
          />
        </Section>

        <Section title="ระยะปลอดภัย (Clear space)" description="เว้นรอบโลโก้อย่างน้อยเท่าความสูงของตัวอักษร M">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-5">
                <div className="relative grid h-40 place-items-center rounded border-2 border-dashed border-accent bg-accent-soft">
                  <img src="/brand/mobyconnex-horizontal.png" alt="ระยะปลอดภัย" className="max-h-16 w-auto" />
                </div>
                <p className="mt-3 text-sm text-muted">ระยะขั้นต่ำ 1M รอบด้าน — ไม่วางข้อความหรือเส้นอื่นในพื้นที่นี้</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-2 pt-5">
                <p className="font-heading text-sm font-semibold">ข้อห้าม</p>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-fg-soft">
                  <li>ห้ามยืด/บีบ/หมุนโลโก้</li>
                  <li>ห้ามเปลี่ยนสีหรือใส่เงา</li>
                  <li>ห้ามวางบนภาพพื้นหลังที่ลายตาโดยไม่มีการ์ดรอง</li>
                  <li>ห้ามแยกมาร์คออกจากเวิร์ดมาร์คแล้ววางคนละมุม</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>
      </div>
    </>
  )
}

const COLORS = [
  { name: 'Navy (กรมท่า)', token: '--brand', hex: '#0E1A5A', use: 'ปุ่มหลัก หัวข้อ พื้นเข้ม', onDark: true },
  { name: 'Navy Deep', token: '--brand-strong', hex: '#091242', use: 'สถานะ hover ของปุ่มหลัก', onDark: true },
  { name: 'Lime (เขียวสด)', token: '--accent', hex: '#7ED956', use: 'ไฮไลต์ ป้ายกำกับ ปุ่มรอง', onDark: false },
  { name: 'Teal', token: '--teal', hex: '#18979E', use: 'กราฟ ข้อมูลเชิงบวก ไล่สี', onDark: true },
  { name: 'Surface', token: '--surface', hex: '#FFFFFF', use: 'การ์ด พื้นเนื้อหา', onDark: false },
  { name: 'Surface 2', token: '--surface-2', hex: '#F2F8FB', use: 'พื้นรอง พื้นตาราง', onDark: false },
  { name: 'Border', token: '--border', hex: '#DAE7F3', use: 'เส้นขอบ การแบ่งส่วน', onDark: false },
  { name: 'Text', token: '--fg', hex: '#0B1B3A', use: 'ตัวอักษรหลัก', onDark: true },
  { name: 'Muted', token: '--muted', hex: '#55668C', use: 'ข้อความรอง คำอธิบาย', onDark: true },
]

export function ColorsDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'รากฐาน' }, { label: 'สี' }]}
        title="สี"
        description="ชุดสีแบรนด์ทั้งหมดประกาศเป็น CSS variable ใน src/styles/tokens.css — เปลี่ยนที่เดียวทั้งระบบ และมีชุดค่าสำหรับโหมดมืดแยกไว้แล้ว"
      />
      <div className="flex flex-col gap-10">
        <Section title="จานสีหลัก" description="คัดจากโลโก้จริงของ MobyConnex">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COLORS.map((c) => (
              <div key={c.token} className="token-swatch">
                <div className="h-20 w-full" style={{ background: `var(${c.token})` }} />
                <div className="flex flex-col gap-0.5 p-3">
                  <p className="font-heading text-sm font-medium">{c.name}</p>
                  <code className="text-xs text-muted">{c.token} · {c.hex}</code>
                  <p className="text-xs text-muted">{c.use}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="สีสถานะ" description="ใช้คู่กับพื้นอ่อนของตัวเองเสมอ เพื่อคงคอนทราสต์ผ่าน WCAG AA">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: 'Success', v: 'var(--success)', soft: 'var(--success-soft)', hex: '#15803D' },
              { n: 'Warning', v: 'var(--warning)', soft: 'var(--warning-soft)', hex: '#B45309' },
              { n: 'Danger', v: 'var(--danger)', soft: 'var(--danger-soft)', hex: '#B91C1C' },
              { n: 'Info', v: 'var(--info)', soft: 'var(--info-soft)', hex: '#0E7490' },
            ].map((s) => (
              <div key={s.n} className="token-swatch">
                <div className="flex h-16">
                  <div className="flex-1" style={{ background: s.v }} />
                  <div className="flex-1" style={{ background: s.soft }} />
                </div>
                <div className="p-3">
                  <p className="font-heading text-sm font-medium">{s.n}</p>
                  <code className="text-xs text-muted">{s.hex}</code>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="ไล่สีแบรนด์" description="ใช้กับ hero, หัวข้อใหญ่, กรอบการ์ดโปรโมชัน">
          <div className="h-24 rounded-lg bg-brand-gradient" />
          <CodeBlock
            lang="css"
            filename="tokens.css"
            code={`.brand-gradient {
  background-image: linear-gradient(100deg, #18979E 0%, #3EB686 28%, #7ED956 50%, #0E1A5A 78%);
}
.brand-gradient-soft {
  /* ใช้กับ hero ที่ต้องการอ่านง่ายบนพื้นสว่าง */
  background-image: linear-gradient(100deg, #E2F4F5 0%, #EAF9E1 60%, #EEF1FB 100%);
}`}
          />
        </Section>

        <Section title="โหมดมืด" description="ค่าทั้งหมดสลับอัตโนมัติเมื่อ element html มีคลาส dark — ปุ่มหลักจะกลายเป็นสีเขียวเพื่อให้เด่นบนพื้นกรม">
          <div className="rounded-lg border border-line bg-[#060D23] p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-[#7ED956] px-4 py-2 font-heading text-sm font-medium text-[#08210C]">ปุ่มหลัก (โหมดมืด)</span>
              <Badge variant="soft">Badge</Badge>
              <span className="text-sm text-[#9AA8CE]">ข้อความรอง</span>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}

export function TypographyDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'รากฐาน' }, { label: 'ตัวอักษร' }]}
        title="ตัวอักษร"
        description="ใช้ Kanit สำหรับหัวข้อ (ทรงเรขาคณิต อ่านชัดบนหน้าจอ) และ IBM Plex Sans Thai Looped สำหรับเนื้อความ (อ่านสบายตาในภาษาไทย) — มี Inter รองรับอักษรละตินในตัวเลขและโค้ด"
      />
      <div className="flex flex-col gap-10">
        <Section title="ลำดับชั้น" description="ขนาดที่แนะนำสำหรับเว็บแอปและหน้าเว็บไซต์">
          <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-6">
            <div className="flex items-baseline gap-4 border-b border-line pb-3">
              <span className="w-28 shrink-0 text-xs text-muted">Display / 48</span>
              <span className="font-heading text-5xl font-semibold">เชื่อมธุรกิจคุณ</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-line pb-3">
              <span className="w-28 shrink-0 text-xs text-muted">H1 / 36</span>
              <span className="font-heading text-4xl font-semibold">ระบบดีไซน์ MobyConnex</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-line pb-3">
              <span className="w-28 shrink-0 text-xs text-muted">H2 / 30</span>
              <span className="font-heading text-3xl font-semibold">บริการของเรา</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-line pb-3">
              <span className="w-28 shrink-0 text-xs text-muted">H3 / 20</span>
              <span className="font-heading text-xl font-semibold">Virtual Tour 360°</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-line pb-3">
              <span className="w-28 shrink-0 text-xs text-muted">Body / 16</span>
              <span className="text-base">เนื้อความทั่วไป — ความสูงบรรทัด 1.7 เพื่อให้อ่านภาษาไทยได้สบาย</span>
            </div>
            <div className="flex items-baseline gap-4 border-b border-line pb-3">
              <span className="w-28 shrink-0 text-xs text-muted">Small / 14</span>
              <span className="text-sm text-fg-soft">คำอธิบายประกอบ ป้ายกำกับฟอร์ม</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-28 shrink-0 text-xs text-muted">Caption / 12</span>
              <span className="text-xs text-muted">หมายเหตุ ดิสเคลมเมอร์</span>
            </div>
          </div>
        </Section>

        <Section title="หลักการเขียน" description="อ่านออกง่ายสำหรับทั้งลูกค้าองค์กรและเจ้าของร้านรายย่อย">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card><CardContent className="space-y-2 pt-5">
              <Badge variant="success">ควรทำ</Badge>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-fg-soft">
                <li>ใช้สรรพพจน์ “คุณ” กับผู้อ่าน และ “เรา” กับ MobyConnex</li>
                <li>ประโยคสั้น ไม่เกิน 2 บรรทัดต่อประโยค</li>
                <li>คำอังกฤษเฉพาะคำที่คนไทยใช้จริง (Dashboard, LINE, Virtual Tour)</li>
              </ul>
            </CardContent></Card>
            <Card><CardContent className="space-y-2 pt-5">
              <Badge variant="danger">ไม่ควรทำ</Badge>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-fg-soft">
                <li>ใช้คำแปลตรงตัวที่คนไทยไม่พูด เช่น “ผลักดันผลลัพธ์ปลายทาง”</li>
                <li>ใส่ ALL CAPS ในภาษาไทย</li>
                <li>ใช้อิโมจิในหน้าแอปองค์กร (ใช้ใน LINE ได้)</li>
              </ul>
            </CardContent></Card>
          </div>
        </Section>
      </div>
    </>
  )
}

export function SpacingDoc() {
  const steps = [4, 8, 12, 16, 24, 32, 48, 64]
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'รากฐาน' }, { label: 'ระยะห่าง' }]}
        title="ระยะห่าง"
        description="ระบบระยะ 4px — ทุกช่องว่างในผลิตภัณฑ์ต้องมาจากสเกลนี้ เพื่อให้จังหวะการวางของทุกหน้าใกล้เคียงกัน"
      />
      <Section title="สเกลระยะ" description="ชื่อตัวแปรพร้อมตัวอย่างความกว้างจริง">
        <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              <code className="w-28 shrink-0 text-xs text-muted">--space-{i + 1} = {s}px</code>
              <div className="h-4 rounded bg-brand" style={{ width: s * 3 }} />
            </div>
          ))}
        </div>
      </Section>
      <Section title="การใช้งานที่แนะนำ" description="ค่าระยะที่ใช้บ่อยในหน้าระบบ" className="mt-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: 'ในคอมโพเนนต์', d: 'ช่องว่างในปุ่ม/การ์ด ใช้ 8–16px (space-2, space-3, space-4)' },
            { t: 'ระหว่างบล็อก', d: 'ระหว่างการ์ด/ฟิลด์ ใช้ 24px (space-5)' },
            { t: 'ระหว่างส่วน', d: 'ระหว่าง section ในหน้า ใช้ 48–64px (space-7, space-8)' },
          ].map((x) => (
            <Card key={x.t}><CardContent className="pt-5">
              <p className="font-heading text-sm font-medium">{x.t}</p>
              <p className="mt-1 text-sm text-muted">{x.d}</p>
            </CardContent></Card>
          ))}
        </div>
      </Section>
    </>
  )
}

export function RadiusShadowDoc() {
  return (
    <>
      <PageHeader
        status="stable"
        crumbs={[{ label: 'MobyConnex', to: '/' }, { label: 'รากฐาน' }, { label: 'มุมโค้งและเงา' }]}
        title="มุมโค้งและเงา"
        description="มุมโค้งสื่อความนุ่มนวลแบบเป็นมิตร ส่วนเงาใช้แสดงลำดับชั้น (elevation) เท่านั้น ไม่ใช้ตกแต่ง"
      />
      <div className="flex flex-col gap-10">
        <Section title="มุมโค้ง">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { n: 'sm · 6px', v: 'var(--radius-sm)', u: 'ป้าย, ปุ่มเล็ก' },
              { n: 'DEFAULT · 10px', v: 'var(--radius)', u: 'ปุ่ม, ช่องกรอก' },
              { n: 'lg · 14px', v: 'var(--radius-lg)', u: 'การ์ด, กล่องเดโม' },
              { n: 'xl · 20px', v: 'var(--radius-xl)', u: 'โมดัล, แผงใหญ่' },
              { n: '2xl · 28px', v: 'var(--radius-2xl)', u: 'hero, การ์ดโปรโมชัน' },
            ].map((r) => (
              <div key={r.n} className="flex flex-col gap-2">
                <div className="h-24 border border-line bg-surface-2" style={{ borderRadius: r.v }} />
                <code className="text-xs text-muted">{r.n}</code>
                <span className="text-xs text-muted">{r.u}</span>
              </div>
            ))}
          </div>
        </Section>
        <Section title="เงา">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { n: 'e1 — วางบนพื้น', v: 'var(--shadow-1)', u: 'การ์ดปกติ, อินพุต' },
              { n: 'e2 — ลอยขึ้น', v: 'var(--shadow-2)', u: 'การ์ด hover, ป๊อปโอเวอร์' },
              { n: 'e3 — ลอยสูงสุด', v: 'var(--shadow-3)', u: 'โมดัล, ดรอปดาวน์' },
            ].map((s) => (
              <div key={s.n} className="flex flex-col gap-3 rounded-lg border border-line bg-surface-2 p-6">
                <div className="h-20 rounded-lg bg-surface" style={{ boxShadow: s.v }} />
                <code className="text-xs text-muted">{s.n}</code>
                <span className="text-xs text-muted">{s.u}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
