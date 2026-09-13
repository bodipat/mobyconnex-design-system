import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/site/AppShell'
import { DocsPage } from '@/pages/DocsPage'
import { HomePage } from '@/pages/HomePage'
import { ShowcasePage } from '@/pages/ShowcasePage'
import { LandingPage } from '@/pages/LandingPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/design-system" element={<HomePage />} />
        <Route path="/showcase" element={<ShowcasePage />} />
        <Route path="/docs/:slug" element={<DocsPage />} />
        <Route path="/docs" element={<Navigate to="/design-system" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
