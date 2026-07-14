import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import SecurityPage from './pages/SecurityPage'
import DownloadPage from './pages/DownloadPage'
import BusinessPage from './pages/BusinessPage'
import FeaturesPage from './pages/FeaturesPage'
import ContactPage from './pages/ContactPage'
import PublicLayout from './components/layout/PublicLayout'
import { Reveal } from './components/shared'

function NotFoundPage() {
  return (
    <PublicLayout>
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1.5rem' }}>
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>404</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1rem' }}>Page introuvable.</h1>
          <p style={{ fontSize: 16, color: 'var(--text3)', marginBottom: '2rem', maxWidth: 400 }}>Cette page n'existe pas ou a été déplacée.</p>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: '#2fd9f4', color: '#07111f', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
            Retour à l'accueil
          </Link>
        </Reveal>
      </div>
    </PublicLayout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/pricing"   element={<PricingPage />} />
        <Route path="/security"  element={<SecurityPage />} />
        <Route path="/download"  element={<DownloadPage />} />
        <Route path="/business"  element={<BusinessPage />} />
        <Route path="/features"  element={<FeaturesPage />} />
        <Route path="/contact"   element={<ContactPage />} />
        <Route path="/blog"      element={<NotFoundPage />} />
        <Route path="/changelog" element={<NotFoundPage />} />
        <Route path="/about"     element={<NotFoundPage />} />
        <Route path="*"          element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
