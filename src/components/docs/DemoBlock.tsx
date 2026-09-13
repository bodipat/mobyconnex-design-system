import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CodeBlock } from './CodeBlock'
import { cn } from '@/lib/cn'

export function DemoBlock({ title, description, children, code, filename, className, plain }: {
  title?: string; description?: string; children: React.ReactNode; code?: string; filename?: string; className?: string; plain?: boolean
}) {
  const [tab, setTab] = React.useState('preview')
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {title && <p className="font-heading text-sm font-semibold text-fg">{title}</p>}
      {description && <p className="text-sm text-muted">{description}</p>}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="preview">ตัวอย่าง</TabsTrigger>
          {code && <TabsTrigger value="code">โค้ด</TabsTrigger>}
        </TabsList>
        <TabsContent value="preview">
          <div className={cn('rounded-lg border border-line p-5', plain ? 'bg-surface' : 'grid-lines bg-surface-2')}>
            {children}
          </div>
        </TabsContent>
        {code && (
          <TabsContent value="code">
            <CodeBlock code={code} filename={filename} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
