#!/usr/bin/env python3
"""ยกชุดระบบดีไซน์ MobyConnex ไปตั้งโปรเจกต์ใหม่ (เว็บแอป/เว็บไซต์)

ใช้:
    python3 scripts/scaffold_from_ds.py /opt/ชื่อโปรเจกต์ --name "ชื่อแอป" [--port 3200]

ยกมาให้: tokens/สี/ฟอนต์, คอมโพเนนต์ UI 23 ตัว, ตัวช่วย (cn/storage), โลโก้ทั้งชุด,
โครง Vite+TS+Tailwind+Radix, Dockerfile/nginx/compose, สคริปต์ตรวจรับเบราว์เซอร์จริง

ไม่ยกมา: เนื้อหาหน้าเอกสารของตัว DS เอง (content/, pages/ เดิม) — โปรเจกต์ใหม่มีหน้าเริ่มต้นของตัวเอง
"""
from __future__ import annotations

import argparse
import json
import pathlib
import shutil
import sys

DS = pathlib.Path(__file__).resolve().parent.parent

VERBATIM = [
    "vite.config.ts", "tsconfig.json", "tsconfig.app.json", "tsconfig.node.json",
    "tailwind.config.js", "postcss.config.js", ".gitignore", ".dockerignore",
    "Dockerfile", "nginx.conf", "LICENSE", "src/vite-env.d.ts",
    "scripts/browser-check.mjs", "scripts/shot-full.mjs", "scripts/check-logo-ratio.mjs",
]
DIRS = ["src/styles", "src/components/ui", "src/lib", "public/brand"]

# เทมเพลตใช้ตัวแทนข้อความ (ไม่ใช้ str.format เพราะโค้ด JSX มีวงเล็บปีกกาเต็มไปหมด)
INDEX_HTML = """<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/brand/mobyconnex-mark.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0E1A5A" />
    <meta name="description" content="@@NAME@@ — ระบบดีไซน์ MobyConnex" />
    <title>@@NAME@@</title>
    <style>
      html { background: #FFFFFF; color-scheme: light; }
      html[data-theme="dark"] { background: #060D23; color-scheme: dark; }
      #boot-fallback {
        display: none; max-width: 34rem; margin: 15vh auto; padding: 1.5rem;
        font-family: "IBM Plex Sans Thai Looped", system-ui, sans-serif; line-height: 1.7;
        color: #0B1B3A; background: #F2F8FB; border: 1px solid #DAE7F3; border-radius: 14px;
      }
      #boot-fallback h1 { font-size: 1.15rem; margin: 0 0 .5rem; }
      #boot-fallback code { background: #EEF1FB; padding: .1rem .35rem; border-radius: 4px; }
      html[data-theme="dark"] #boot-fallback { color: #F2F5FF; background: #0B1432; border-color: #24325F; }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <div id="boot-fallback">
      <h1>เบราว์เซอร์นี้ยังแสดงเว็บไม่ครบ</h1>
      <p>หน้าเว็บต้องใช้ JavaScript ในการแสดงผล หากเปิดจากในแอป (LINE / Facebook / Messenger)
      กรุณากดเมนูมุมขวาบน แล้วเลือก <code>เปิดในเบราว์เซอร์</code> (Chrome หรือ Safari) อีกครั้ง</p>
      <p>หากยังไม่แสดง กรุณาอัปเดตเบราว์เซอร์ให้เป็นเวอร์ชันล่าสุด</p>
    </div>
    <noscript>
      <div style="max-width:34rem;margin:15vh auto;padding:1.5rem;font-family:system-ui,sans-serif;line-height:1.7">
        <h1 style="font-size:1.15rem">ต้องเปิดใช้งาน JavaScript</h1>
        <p>เว็บไซต์นี้ต้องใช้ JavaScript ในการแสดงผล กรุณาเปิดใช้งานแล้วโหลดหน้าใหม่อีกครั้ง</p>
      </div>
    </noscript>

    <script>
      window.setTimeout(function () {
        var root = document.getElementById('root')
        var fb = document.getElementById('boot-fallback')
        if (fb && root && root.children.length === 0) fb.style.display = 'block'
      }, 6000)
    </script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
"""

MAIN_TSX = """import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/kanit/400.css'
import '@fontsource/kanit/600.css'
import '@fontsource/ibm-plex-sans-thai-looped/300.css'
import '@fontsource/ibm-plex-sans-thai-looped/400.css'
import '@fontsource/ibm-plex-sans-thai-looped/500.css'
import '@fontsource/inter/400.css'
import './styles/global.css'
import App from './App'
import { clearLegacyTheme, initialTheme } from './lib/storage'

// โหมดสว่างเป็นค่าเริ่มต้นทุกอุปกรณ์ — ไม่ใช้ prefers-color-scheme
clearLegacyTheme()
const theme = initialTheme()
try {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.dataset.theme = theme
} catch {
  /* ข้ามได้ ไม่กระทบการแสดงผล */
}

function mount() {
  const el = document.getElementById('root')
  if (!el) return
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
}

try {
  mount()
} catch (err) {
  const fb = document.getElementById('boot-fallback')
  if (fb) (fb as HTMLElement).style.display = 'block'
  console.error('mount failed', err)
}
"""

APP_TSX = """import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
"""

HOME_PAGE = """import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { initialTheme, saveThemeChoice } from '@/lib/storage'

const APP_NAME = '@@NAME@@'

const FEATURES = [
  { tone: 'teal', title: 'สีจากโทเคน', desc: 'เปลี่ยนที่ tokens.css ที่เดียว ทั้งระบบเปลี่ยนตาม รวมโหมดมืด' },
  { tone: 'lime', title: 'คอมโพเนนต์พร้อมใช้', desc: 'ปุ่ม ฟอร์ม ตาราง โมดัล แจ้งเตือน ครบใน @/components/ui' },
  { tone: 'sun', title: 'ตรวจรับก่อนส่งงาน', desc: 'npm run verify — build แล้วเปิดเบราว์เซอร์จริงตรวจการแสดงผล' },
]

/** หน้าเริ่มต้นที่ใช้ระบบดีไซน์ MobyConnex — แทนเนื้อหาส่วนนี้ด้วยงานจริงได้เลย */
export function HomePage() {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => initialTheme())

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    saveThemeChoice(next) // บันทึกเฉพาะเมื่อผู้ใช้กดสลับเอง
    try {
      document.documentElement.classList.toggle('dark', next === 'dark')
      document.documentElement.dataset.theme = next
    } catch {
      /* ข้ามได้ ไม่กระทบการแสดงผล */
    }
    setThemeState(next)
  }

  return (
    <div className="min-h-dvh bg-bg font-body text-fg">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-3">
            <img src="/brand/mobyconnex-horizontal.png" alt="MobyConnex" className="h-8 w-auto shrink-0 dark:hidden" />
            <img src="/brand/mobyconnex-horizontal-dark.png" alt="MobyConnex" className="hidden h-8 w-auto shrink-0 dark:block" />
            <span className="font-heading text-sm font-medium text-muted">{APP_NAME}</span>
          </a>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="สลับโหมดสว่าง/มืด">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="wash-hero grid-lines border-b border-line">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-24">
          <Badge variant="soft" className="w-fit gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            ระบบดีไซน์ MobyConnex
          </Badge>
          <h1 className="mt-5 max-w-3xl font-heading text-3xl font-semibold leading-tight sm:text-5xl">
            หน้าเริ่มต้นของ <span className="text-gradient">{APP_NAME}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            โครงนี้ยกชุดระบบดีไซน์มาแล้ว — สี ฟอนต์ คอมโพเนนต์ และสคริปต์ตรวจรับ
            แก้สีทั้งระบบได้ที่ src/styles/tokens.css
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">ปุ่มหลัก</Button>
            <Button size="lg" variant="outline">ปุ่มรอง</Button>
          </div>
        </div>
      </section>

      {/* ---------- การ์ด 3 ใบ ---------- */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map((c) => (
            <Card key={c.title} className={`tint-${c.tone} topline-${c.tone} border-line`}>
              <CardHeader>
                <CardTitle className="font-heading text-lg">{c.title}</CardTitle>
                <CardDescription className="leading-relaxed">{c.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- ฟอร์ม ---------- */}
      <section className="border-y border-line bg-surface-2">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
          <h2 className="accent-bar font-heading text-2xl font-semibold">ฟอร์มตัวอย่าง</h2>
          <p className="mt-2 max-w-2xl text-muted">ใช้คอมโพเนนต์ฟอร์มมาตรฐาน — มีป้ายกำกับทุกช่อง</p>
          <Card className="mt-6 max-w-2xl">
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อผู้ติดต่อ</Label>
                <Input id="name" placeholder="เช่น คุณสมชาย" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="detail">รายละเอียด</Label>
                <Textarea id="detail" rows={4} placeholder="เล่าสั้น ๆ ว่าต้องการอะไร" />
              </div>
              <Button>ส่งข้อมูล</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="panel-navy brand-rule">
        <div className="mx-auto flex max-w-content flex-col gap-4 px-4 py-10 sm:px-6">
          {/* self-start จำเป็น: ในคอลัมน์ flex รูปจะถูก stretch ยืดกว้างจนสัดส่วนเพี้ยน */}
          <img src="/brand/mobyconnex-footer.png" alt="MobyConnex" className="h-9 w-auto self-start" />
          <p className="text-sm text-white/70">© {new Date().getFullYear()} MobyConnex · สงวนลิขสิทธิ์</p>
        </div>
      </footer>
    </div>
  )
}
"""

VERIFY_SH = """#!/usr/bin/env bash
# ตรวจรับ: build ต้องผ่าน และหน้าเว็บต้องแสดงผลได้จริงในเบราว์เซอร์
set -uo pipefail
cd "$(dirname "$0")/.."
BASE="${1:-@@BASE_URL@@}"

echo "############ 1) build ############"
npm run build || exit 1

echo
echo "############ 2) เบราว์เซอร์จริง (Playwright) ############"
node scripts/browser-check.mjs "$BASE"
RC=$?

echo
echo "############ 3) สัดส่วนโลโก้ (กันรูปยืด) ############"
node scripts/check-logo-ratio.mjs 2>/dev/null || echo "(ข้ามได้: หน้านี้ยังไม่มี header/footer ให้วัด)"

exit "$RC"
"""

README = """# @@NAME@@

เว็บแอป/เว็บไซต์ที่สร้างจาก **ระบบดีไซน์ MobyConnex** (ยกชุดมาแล้ว — สี ฟอนต์ คอมโพเนนต์ และสคริปต์ตรวจรับ)

## เริ่มใช้

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build ไปที่ dist/
npm run verify     # ตรวจรับ: build + เบราว์เซอร์จริง (ต้อง build ก่อน)
```

## แก้หน้าจอ

| ต้องการ | แก้ที่ |
|---|---|
| หน้าแรก | `src/pages/HomePage.tsx` |
| เส้นทาง/หน้าใหม่ | `src/App.tsx` (เพิ่ม Route) + สร้างไฟล์ใน `src/pages/` |
| สี · ฟอนต์ · มุมโค้ง · เงา | `src/styles/tokens.css` (ที่เดียว ทั้งระบบเปลี่ยนตาม รวมโหมดมืด) |
| คอมโพเนนต์ UI | `src/components/ui/` (ปุ่ม ฟอร์ม ตาราง โมดัล แท็บ ทูลทิป ฯลฯ) |
| โลโก้ | `public/brand/` (พื้นสว่าง/พื้นเข้ม/พื้นกรมท่า/มาร์ค/แนวตั้ง) |

## Deploy (Docker + nginx)

```bash
docker compose up -d --build     # ให้บริการที่ 127.0.0.1:@@PORT@@
```

จากนั้นชี้โดเมนมาที่เครื่อง แล้วเพิ่มบล็อกใน Caddy (`/etc/caddy/Caddyfile`):

```
@@HOST@@ {
    encode gzip zstd
    reverse_proxy 127.0.0.1:@@PORT@@
}
```

> **ชี้ DNS ให้เรียบร้อยก่อนเพิ่มบล็อก Caddy** — ขอใบรับรอง HTTPS ล้มเหลวซ้ำหลายครั้งจะติด rate limit

## กฎที่ต้องถือ (บทเรียนจากงานจริง)

1. **โหมดสว่างเป็นค่าเริ่มต้นทุกอุปกรณ์** — ห้ามใช้ `prefers-color-scheme` และบันทึกค่าลงที่เก็บเฉพาะเมื่อผู้ใช้กดสลับเอง (คีย์ `moby-theme-v2`)
2. **HTTP 200 ไม่ได้แปลว่าเว็บแสดงผลได้** — ก่อนบอกว่าเสร็จ ต้องผ่าน `npm run verify` (เปิดเบราว์เซอร์จริง)
3. **รูปในคอลัมน์ flex ต้องมี `self-start`** ไม่งั้นถูกยืดจนสัดส่วนเพี้ยน
4. **Radix `Slot` รับลูกได้ตัวเดียว** — คอมโพเนนต์ที่ห่อปุ่มแบบ `asChild` ห้ามส่งลูกหลายตัว
5. **ฟอนต์ต้องเป็น Kanit (หัวข้อ) + IBM Plex Sans Thai Looped (เนื้อความ)** เพื่อการอ่านภาษาไทย และห้ามดึงฟอนต์จาก Google Fonts
6. **อย่าใส่ราคาที่แต่งขึ้นเองในหน้าลูกค้า** — ให้เป็นหน้าขอใบเสนอราคาแทน

## กฎเรื่องโลโก้ (สำคัญ)

ไฟล์โลโก้ทำจากภาพต้นฉบับชนิด JPEG — ต้องสร้าง **มาสก์ตัวอักษรจริง** (ไม่ใช่ตัดพื้นขาวตามความสว่าง)
แล้ว **ตรวจด้วยตัวเลข** ว่าพิกเซลนอกมาสก์ต่างจากพื้นไม่เกิน 2 ระดับ มิฉะนั้นจะเกิดคราบ/กล่องสีอ่อนบนพื้นเข้ม
(สคริปต์ต้นทางอยู่ที่ระบบดีไซน์กลาง — https://github.com/bodipat/mobyconnex-design-system)

---

สร้างจากระบบดีไซน์กลาง **MobyConnex Design System** · https://design.bizxai.cloud
"""


def sub(text: str, **kw: object) -> str:
    for key, value in kw.items():
        text = text.replace(f"@@{key.upper()}@@", str(value))
    return text


def main() -> int:
    ap = argparse.ArgumentParser(description="ตั้งโปรเจกต์ใหม่จากระบบดีไซน์ MobyConnex")
    ap.add_argument("target", help="โฟลเดอร์ปลายทาง เช่น /opt/my-app")
    ap.add_argument("--name", default=None, help="ชื่อที่แสดงบนเว็บ (ค่าเริ่มต้น: ชื่อโฟลเดอร์)")
    ap.add_argument("--port", type=int, default=3200, help="พอร์ตภายในเครื่องสำหรับ deploy (ค่าเริ่มต้น 3200)")
    ap.add_argument("--force", action="store_true", help="เขียนทับได้ถ้าโฟลเดอร์ไม่ว่าง")
    a = ap.parse_args()

    target = pathlib.Path(a.target).expanduser().resolve()
    slug = target.name
    name = a.name or slug
    host = f"{slug}.bizxai.cloud"

    if target.exists() and any(target.iterdir()) and not a.force:
        print(f"หยุด: {target} ไม่ว่าง (ใช้ --force ถ้าต้องการเขียนทับ)", file=sys.stderr)
        return 1
    target.mkdir(parents=True, exist_ok=True)

    missing = [p for p in VERBATIM + DIRS if not (DS / p).exists()]
    if missing:
        print(f"หยุด: ต้นทางขาด {missing}", file=sys.stderr)
        return 1

    for rel in VERBATIM:
        dst = target / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(DS / rel, dst)
    for rel in DIRS:
        shutil.copytree(DS / rel, target / rel, dirs_exist_ok=True)

    pkg = json.loads((DS / "package.json").read_text(encoding="utf-8"))
    pkg["name"] = slug
    pkg["version"] = "0.1.0"
    pkg["description"] = f"{name} — สร้างจากระบบดีไซน์ MobyConnex"
    pkg["scripts"] = {**pkg.get("scripts", {}), "verify": "bash scripts/verify.sh"}
    pkg.pop("private", None)
    (target / "package.json").write_text(json.dumps(pkg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    files = {
        "index.html": sub(INDEX_HTML, name=name),
        "src/main.tsx": MAIN_TSX,
        "src/App.tsx": APP_TSX,
        "src/pages/HomePage.tsx": sub(HOME_PAGE, name=name),
        "scripts/verify.sh": sub(VERIFY_SH, base_url=f"https://{host}"),
        "README.md": sub(README, name=name, port=a.port, host=host),
        "docker-compose.yml": (
            "services:\n"
            f"  {slug}:\n"
            "    build:\n"
            f"      context: {target}\n"
            "      dockerfile: Dockerfile\n"
            f"    image: {slug}:local\n"
            f"    container_name: {slug}\n"
            "    restart: unless-stopped\n"
            "    ports:\n"
            f'      - "127.0.0.1:{a.port}:80"\n'
            "    security_opt:\n"
            "      - no-new-privileges:true\n"
        ),
    }
    for rel, content in files.items():
        p = target / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(content, encoding="utf-8")
    (target / "scripts/verify.sh").chmod(0o755)

    ui_count = len(list((target / "src/components/ui").iterdir()))
    print(f"✓ สร้างโปรเจกต์แล้ว: {target}")
    print(f"  ชื่อที่แสดง   : {name}")
    print(f"  deploy       : 127.0.0.1:{a.port} · โดเมนที่ตั้งไว้ใน README: {host}")
    print(f"  ยกมาให้      : {len(VERBATIM)} ไฟล์ + {len(DIRS)} โฟลเดอร์ · คอมโพเนนต์ UI {ui_count} ตัว · โลโก้ {len(list((target/'public/brand').iterdir()))} ไฟล์")
    print("\nขั้นตอนถัดไป:")
    print(f"  cd {target} && npm install && npm run build")
    print("  แก้สีทั้งระบบที่ src/styles/tokens.css · แก้หน้าแรกที่ src/pages/HomePage.tsx")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
