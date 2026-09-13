import { Link, useParams } from 'react-router-dom'
import { docBySlug } from '@/content/registry'
import { Button } from '@/components/ui/button'

export function DocsPage() {
  const { slug } = useParams<{ slug: string }>()
  const entry = slug ? docBySlug.get(slug) : undefined

  if (!entry) {
    return (
      <div className="flex flex-col items-start gap-4">
        <h1 className="font-heading text-3xl font-semibold">ไม่พบหน้านี้</h1>
        <p className="text-muted">ลิงก์อาจเปลี่ยนไปแล้ว ลองค้นหาด้วย ⌘K หรือกลับไปหน้าแรกของระบบดีไซน์</p>
        <Button asChild><Link to="/docs/overview">กลับไปภาพรวม</Link></Button>
      </div>
    )
  }

  const { Component } = entry
  return <Component />
}
