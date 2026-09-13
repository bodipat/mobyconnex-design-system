#!/bin/bash
# ตรวจระบบทั้งหมดก่อนบอกผู้ใช้ว่า "เสร็จ" — HTTP + เบราว์เซอร์จริง
# ใช้: bash /opt/moby-design/scripts/verify-all.sh [base_url]
set -u
BASE="${1:-https://design.bizxai.cloud}"
cd /opt/moby-design

echo "############ 1) HTTP / ไฟล์ / เนื้อหา ############"
python3 scripts/e2e.py "$BASE"
HTTP_RC=$?

echo
echo "############ 2) เบราว์เซอร์จริง (mount + error + ภาพหน้าจอ) ############"
node scripts/browser-check.mjs "$BASE"
BROWSER_RC=$?

echo
echo "############ 3) สัดส่วนโลโก้ (กันภาพยืด/บิด) ############"
node scripts/check-logo-ratio.mjs
RATIO_RC=$?

echo
if [ "$HTTP_RC" -eq 0 ] && [ "$BROWSER_RC" -eq 0 ] && [ "$RATIO_RC" -eq 0 ]; then
  echo "✅ ผ่านทั้งหมด (HTTP + เบราว์เซอร์)"
  exit 0
else
  echo "❌ มีส่วนที่ไม่ผ่าน — HTTP rc=$HTTP_RC · browser rc=$BROWSER_RC · logo rc=$RATIO_RC"
  echo "   อย่ารายงานว่าเสร็จ จนกว่าจะผ่านทั้งสองส่วน"
  exit 1
fi
