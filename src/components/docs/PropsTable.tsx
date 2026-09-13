import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export type Prop = { name: string; type: string; def?: string; desc: string }

export function PropsTable({ rows }: { rows: Prop[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>พร็อพ</TableHead>
          <TableHead>ชนิด</TableHead>
          <TableHead>ค่าเริ่มต้น</TableHead>
          <TableHead>คำอธิบาย</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.name}>
            <TableCell><code className="text-xs text-brand">{r.name}</code></TableCell>
            <TableCell><code className="text-xs text-fg-soft">{r.type}</code></TableCell>
            <TableCell><code className="text-xs text-muted">{r.def ?? '—'}</code></TableCell>
            <TableCell>{r.desc}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
