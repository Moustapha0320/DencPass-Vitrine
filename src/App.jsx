import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from './i18n'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function LanguageSync() {
  const { pathname } = useLocation()
  useEffect(() => {
    const isEn = pathname === '/en' || pathname.startsWith('/en/')
    const target = isEn ? 'en' : 'fr'
    if (i18n.language !== target) i18n.changeLanguage(target)
  }, [pathname])
  return null
}

import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import SecurityPage from './pages/SecurityPage'
import DownloadPage from './pages/DownloadPage'
import BusinessPage from './pages/BusinessPage'
import FeaturesPage from './pages/FeaturesPage'
import ContactPage from './pages/ContactPage'
import ChangelogPage from './pages/ChangelogPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import StatusPage from './pages/StatusPage'
import PublicLayout from './components/layout/PublicLayout'
import { Reveal } from './components/shared'

function NotFoundPage() {
  const { t } = useTranslation('common')
  return (
    <PublicLayout>
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1.5rem' }}>
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>{t('notFound.eyebrow')}</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1rem' }}>{t('notFound.title')}</h1>
          <p style={{ fontSize: 16, color: 'var(--text3)', marginBottom: '2rem', maxWidth: 400 }}>{t('notFound.desc')}</p>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: '#2fd9f4', color: '#07111f', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
            {t('notFound.cta')}
          </Link>
        </Reveal>
      </div>
    </PublicLayout>
  )
}

// Every route below is listed ONCE; the /en mirror is generated from this
// single source of truth so a new French route can never be added without
// its English twin.
const ROUTES = [
  { path: '/',          Component: HomePage },
  { path: '/pricing',   Component: PricingPage },
  { path: '/security',  Component: SecurityPage },
  { path: '/download',  Component: DownloadPage },
  { path: '/business',  Component: BusinessPage },
  { path: '/features',  Component: FeaturesPage },
  { path: '/contact',   Component: ContactPage },
  { path: '/changelog', Component: ChangelogPage },
  { path: '/blog',      Component: BlogPage },
  { path: '/blog/:slug', Component: BlogPostPage },
  { path: '/status',    Component: StatusPage },
]

function enPathFor(frPath) {
  return frPath === '/' ? '/en' : `/en${frPath}`
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageSync />
      <Routes>
        {ROUTES.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        {ROUTES.map(({ path, Component }) => (
          <Route key={enPathFor(path)} path={enPathFor(path)} element={<Component />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
