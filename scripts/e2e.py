#!/usr/bin/env python3
"""E2E verification — MobyConnex Design System
ตรวจผ่าน hostname สาธารณะจริง (HTTPS) ว่าเพจหลัก ไฟล์ build และ route ทั้งหมดทำงาน
รัน: python3 scripts/e2e.py [base_url]
"""
import re
import sys
import urllib.request
import urllib.error

BASE = sys.argv[1] if len(sys.argv) > 1 else "https://design.bizxai.cloud"

results = []


def fetch(path, want_status=200):
    url = BASE + path
    req = urllib.request.Request(url, headers={"User-Agent": "moby-design-e2e/1.0", "Accept-Encoding": "identity"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read()
            return r.status, dict(r.headers), body
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), e.read()


def check(name, cond, detail=""):
    results.append((name, bool(cond), detail))


# 1. หน้าแรก (index.html ของ SPA)
st, hd, body = fetch("/")
text = body.decode("utf-8", "replace")
check("GET /", st == 200 and b'id="root"' in body, f"status={st} bytes={len(body)}")
check("หน้าแรกเป็น HTML ภาษาไทย", 'lang="th"' in text and "MobyConnex" in text, "")
check("ใช้โลโก้แบรนด์เป็น favicon", "/brand/mobyconnex-mark.png" in text, "")

# 2. route ของ SPA ทุกหน้าต้องเสิร์ฟ app shell (200)
routes = [
    "/design-system", "/showcase",
    "/docs/overview", "/docs/logo", "/docs/colors", "/docs/typography", "/docs/spacing", "/docs/radius-shadow",
    "/docs/button", "/docs/badge", "/docs/card", "/docs/input", "/docs/textarea", "/docs/select",
    "/docs/checkbox", "/docs/radio", "/docs/switch", "/docs/alert", "/docs/dialog", "/docs/tabs",
    "/docs/tooltip", "/docs/dropdown-menu", "/docs/accordion", "/docs/table", "/docs/avatar",
    "/docs/progress", "/docs/skeleton", "/docs/breadcrumb", "/docs/empty-state", "/docs/toast",
    "/docs/pattern-quote", "/docs/pattern-dashboard", "/docs/pattern-line", "/docs/pattern-booking",
    "/docs/pattern-pricing", "/docs/pattern-onboarding",
    "/docs/voice", "/docs/a11y",
]
bad = []
for r in routes:
    st, _, b = fetch(r)
    if st != 200 or b'id="root"' not in b:
        bad.append(f"{r}={st}")
check(f"route ของ SPA {len(routes)} เส้นทาง", not bad, "; ".join(bad))

# 3. JS bundle มีเนื้อหาไทยของทุกหมวด (พิสูจน์ว่าเนื้อหาถูก build เข้าไปจริง)
st, _, home = fetch("/")
m = re.search(rb'/assets/index-[A-Za-z0-9_-]+\.js', home)
check("พบ JS bundle ในหน้าแรก", bool(m), "ไม่พบ /assets/index-*.js")
if m:
    js_path = m.group(0).decode()
    st, hd, js = fetch(js_path)
    jstext = js.decode("utf-8", "replace")
    check("โหลด JS bundle", st == 200 and len(js) > 100_000, f"status={st} bytes={len(js)}")
    must = ["ปุ่ม (Button)", "สี", "ตัวอักษร", "กล่องข้อความ LINE", "แพ็กเกจ", "โทนภาษา",
            "การเข้าถึง", "Virtual Visibility Sprint", "Growth Operations", "AI Workflow Sprint",
            "ปุ่ม", "ตาราง", "ทูลทิป", "โมดัล"]
    missing = [s for s in must if s not in jstext]
    check("เนื้อหาไทยครบใน bundle", not missing, "ขาด: " + ", ".join(missing))
    check("มีโหมดมืดใน CSS/JS", "--brand" in jstext or "dark" in jstext, "")
else:
    js_path = None

# 4. CSS bundle
st, _, home2 = fetch("/")
mcss = re.search(rb'/assets/index-[A-Za-z0-9_-]+\.css', home2)
if mcss:
    st, _, css = fetch(mcss.group(0).decode())
    csstext = css.decode("utf-8", "replace")
    check("โหลด CSS bundle", st == 200 and len(css) > 10_000, f"status={st} bytes={len(css)}")
    check("CSS มีโทเคนแบรนด์", "--brand:" in csstext and "#0F1D64" in csstext.upper(), "")
    check("CSS ฝังฟอนต์ไทย (Kanit/IBM Plex)", "@font-face" in csstext and "kanit" in csstext.lower(), "")

# 5. ไฟล์แบรนด์
brands = ["/brand/mobyconnex-horizontal.png", "/brand/mobyconnex-vertical.png",
          "/brand/mobyconnex-mark.png", "/brand/mobyconnex-on-navy.png", "/brand/mobyconnex-on-green.png"]
bad_brand = []
for b in brands:
    st, hd, data = fetch(b)
    if st != 200 or not data.startswith(b"\x89PNG"):
        bad_brand.append(f"{b}={st}")
check(f"ไฟล์โลโก้ {len(brands)} ไฟล์", not bad_brand, "; ".join(bad_brand))

# 6. cache + compression
st, hd, _ = fetch(js_path) if js_path else (0, {}, b"")
cc = hd.get("Cache-Control", "")
check("แคชไฟล์ asset แบบ immutable", "immutable" in cc, f"Cache-Control={cc!r}")
# ขอแบบ gzip โดยเฉพาะเพื่อตรวจว่าบีบอัดจริง
try:
    req_gz = urllib.request.Request(BASE + (js_path or "/"),
                                    headers={"User-Agent": "moby-design-e2e/1.0", "Accept-Encoding": "gzip"})
    with urllib.request.urlopen(req_gz, timeout=30) as r:
        enc = r.headers.get("Content-Encoding", "")
except Exception as e:  # noqa: BLE001
    enc = f"error:{e}"
check("บีบอัด asset", enc in ("gzip", "br", "zstd"), f"Content-Encoding={enc!r}")
st, hd, _ = fetch("/")
cc2 = hd.get("Cache-Control", "")
check("index.html ไม่ถูกแคชค้าง", "no-cache" in cc2 or cc2 == "", f"Cache-Control={cc2!r}")

# 7. 404 → SPA fallback (ไม่ใช่หน้า error ของ nginx)
st, _, b = fetch("/path-that-does-not-exist")
check("route ไม่รู้จัก → SPA fallback", st == 200 and b'id="root"' in b, f"status={st}")

# 8. รองรับเบราว์เซอร์/WebView เก่า (สาเหตุหน้าขาวใน in-app browser)
st, _, home3 = fetch("/")
h3 = home3.decode("utf-8", "replace")
check("index.html มี <script nomodule> (legacy)", "nomodule" in h3, "")
check("index.html มีข้อความแนะนำเมื่อ JS ไม่ทำงาน", "boot-fallback" in h3, "")
legacy_ok = False
legacy_detail = "ไม่พบไฟล์ legacy"
m_legacy = re.search(r'src="(/assets/index-legacy-[^"]+\.js)"', h3)
if m_legacy:
    st_l, _, body_l = fetch(m_legacy.group(1))
    legacy_ok = st_l == 200 and len(body_l) > 50_000
    legacy_detail = f"status={st_l} bytes={len(body_l)}"
check("โหลด legacy bundle ได้", legacy_ok, legacy_detail)
poly_ok = False
poly_detail = "ไม่พบ polyfills-legacy"
m_poly = re.search(r'src="(/assets/polyfills-legacy-[^"]+\.js)"', h3)
if m_poly:
    st_p, _, body_p = fetch(m_poly.group(1))
    poly_ok = st_p == 200 and len(body_p) > 1_000
    poly_detail = f"status={st_p} bytes={len(body_p)}"
check("โหลด polyfills สำหรับเบราว์เซอร์เก่าได้", poly_ok, poly_detail)

# 9. ทางเข้าสำรองผ่าน IP (ไม่พึ่ง DNS/TLS)
try:
    import urllib.request as _u
    with _u.urlopen(_u.Request("http://72.60.194.90/", headers={"User-Agent": "moby-design-e2e/1.0"}), timeout=20) as r:
        ip_ok = r.status == 200 and b'id="root"' in r.read()
except Exception:  # noqa: BLE001
    ip_ok = False
check("ทางเข้าสำรองผ่าน IP ตรง ทำงาน", ip_ok, "http://72.60.194.90/")

# ---- สรุป ----
passed = sum(1 for _, ok, _ in results if ok)
print(f"\n=== MobyConnex Design System e2e — {BASE} ===")
for name, ok, detail in results:
    print(f"  {'✅' if ok else '❌'} {name}" + (f"  ({detail})" if detail and not ok else ""))
print(f"\nผลรวม: {passed}/{len(results)} ผ่าน")
sys.exit(0 if passed == len(results) else 1)
