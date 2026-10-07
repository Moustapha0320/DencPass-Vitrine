import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../hooks/useTheme'
import { IcoSun, IcoMoon, IcoMenu, IcoClose } from '../shared'
import { localizedPath } from '../../utils/localizedPath'

// ─── Legal Modal ──────────────────────────────────────────────────────────────
function LegalModal({ type, onClose }) {
  const { t } = useTranslation('common')
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])
  if (!type) return null
  const isCgu = type === 'cgu'
  const title = t(isCgu ? 'legal.cguTitle' : 'legal.privacyTitle')
  const sections = [1, 2, 3, 4, 5, 6, 7].map(n => ({
    h: t(`legal.${isCgu ? 'cgu' : 'privacy'}${n}h`),
    p: t(`legal.${isCgu ? 'cgu' : 'privacy'}${n}p`),
  }))
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 20, maxWidth: 620, width: '100%', maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text)' }}>{title}</h2>
          <button onClick={onClose} aria-label={t('legal.close')} style={{ background: 'none', border: 'none', color: 'var(--text4)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '4px 8px', borderRadius: 6 }}>✕</button>
        </div>
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {sections.map(s => (
            <div key={s.h}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginBottom: '0.3rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>{s.h}</p>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75 }}>{s.p}</p>
            </div>
          ))}
          <p style={{ fontSize: 11, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", marginTop: '0.5rem' }}>{t('legal.lastUpdated')}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Logo Mark ────────────────────────────────────────────────────────────────
function LogoMark({ height = 26, bg = 'var(--bg)', gradId = 'dp-g' }) {
  const w = Math.round(height * 100 / 108)
  return (
    <svg viewBox="0 0 100 108" width={w} height={height} xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" style={{ filter: 'drop-shadow(0 0 5px var(--accent-014))', flexShrink: 0 }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--logo-a)" />
          <stop offset="100%" stopColor="var(--logo-b)" />
        </linearGradient>
      </defs>
      <path d="M26,14 H52 C78,14 95,34 95,60 C95,86 78,106 52,106 H26 C21.6,106 18,102.4 18,98 V22 C18,17.6 21.6,14 26,14 Z" fill={`url(#${gradId})`} />
      <g fill={bg}>
        <circle cx="56" cy="54" r="11" />
        <path d="M56,54 L49,88 H63 Z" />
      </g>
    </svg>
  )
}

// ─── Language Switch ──────────────────────────────────────────────────────────
function LangSwitch() {
  const { t } = useTranslation('common')
  const location = useLocation()
  const navigate = useNavigate()
  const isEn = location.pathname === '/en' || location.pathname.startsWith('/en/')
  function switchTo(lang) {
    if (lang === 'en' && !isEn) {
      navigate(location.pathname === '/' ? '/en' : `/en${location.pathname}`)
    } else if (lang === 'fr' && isEn) {
      navigate(location.pathname === '/en' ? '/' : location.pathname.slice(3))
    }
  }
  return (
    <div style={{ display: 'flex', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 9, padding: 3, gap: 2 }}>
      <button onClick={() => switchTo('fr')} style={{ display: 'flex', alignItems: 'center', padding: '5px 11px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, transition: 'all 0.2s', background: !isEn ? 'var(--accent-014)' : 'none', color: !isEn ? 'var(--accent)' : 'var(--text5)' }}>{t('footer.langFr')}</button>
      <button onClick={() => switchTo('en')} style={{ display: 'flex', alignItems: 'center', padding: '5px 11px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, transition: 'all 0.2s', background: isEn ? 'var(--accent-014)' : 'none', color: isEn ? 'var(--accent)' : 'var(--text5)' }}>{t('footer.langEn')}</button>
    </div>
  )
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
const NAV_PATHS = [
  { key: 'features', to: '/features' },
  { key: 'security',  to: '/security' },
  { key: 'business',  to: '/business' },
  { key: 'pricing',   to: '/pricing'  },
  { key: 'download',  to: '/download' },
  { key: 'contact',   to: '/contact'  },
]

const THEME_OPTS = [
  { v: 'dark',  Icon: IcoMoon, key: 'themeDark' },
  { v: 'light', Icon: IcoSun,  key: 'themeLight' },
]

function NavBar() {
  const { t, i18n } = useTranslation('common')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 62,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 max(1.5rem, calc((100% - 1200px) / 2))',
        background: scrolled ? 'var(--bg-nav)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
      }}>

        <Link to={localizedPath('/', i18n.language)} aria-label={t('nav.home')} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <LogoMark height={26} bg="var(--bg)" gradId="nav-dp-g" />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: '-0.05em', color: 'var(--text)' }}>
            Denc<span style={{ color: 'var(--accent)' }}>Pass</span>
          </span>
        </Link>

        <div className="nav-links">
          {NAV_PATHS.map(({ key, to }) => {
            const active = location.pathname === to || location.pathname === localizedPath(to, i18n.language)
            const isBusiness = to === '/business'
            const activeColor = isBusiness ? 'var(--purple)' : 'var(--accent)'
            return (
              <Link key={to} to={localizedPath(to, i18n.language)} className={isBusiness ? 'nav-link nav-link-business' : 'nav-link'} style={{
                fontSize: 14,
                color: active ? activeColor : 'var(--text3)',
                fontFamily: "'Inter', sans-serif", fontWeight: 500,
              }}>
                {t(`nav.${key}`)}
              </Link>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="nav-cta-group">
            <LangSwitch />
            <a href="https://app.dencpass.com" className="nav-login"
              style={{ fontSize: 13, color: 'var(--text3)', fontFamily: "'Inter', sans-serif", fontWeight: 500, padding: '8px 18px', borderRadius: 100, border: '1px solid var(--border2)', background: 'transparent' }}>
              {t('nav.login')}
            </a>
            <a href="https://app.dencpass.com/register" className="btn-primary"
              style={{ padding: '9px 18px', borderRadius: 10, background: 'var(--accent)', color: '#07111f', fontSize: 13, boxShadow: '0 2px 16px var(--accent-014)', whiteSpace: 'nowrap' }}>
              {t('nav.cta')}
            </a>
          </div>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={t('nav.openMenu')}
            aria-expanded={mobileOpen}
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 9, color: 'var(--text3)', cursor: 'pointer', padding: 8 }}
          >
            <IcoMenu />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'var(--bg)', display: 'flex', flexDirection: 'column', padding: '0 max(1.5rem, calc((100% - 1200px) / 2))' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 62 }}>
            <Link to={localizedPath('/', i18n.language)} onClick={() => setMobileOpen(false)} aria-label={t('nav.home')} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <LogoMark height={26} bg="var(--bg)" gradId="mob-dp-g" />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: '-0.05em', color: 'var(--text)' }}>
                Denc<span style={{ color: 'var(--accent)' }}>Pass</span>
              </span>
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label={t('nav.closeMenu')}
              style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', padding: 4 }}>
              <IcoClose />
            </button>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem' }}>
            {NAV_PATHS.map(({ key, to }) => {
              const active = location.pathname === to || location.pathname === localizedPath(to, i18n.language)
              const activeColor = to === '/business' ? 'var(--purple)' : 'var(--accent)'
              return (
                <Link key={to} to={localizedPath(to, i18n.language)} onClick={() => setMobileOpen(false)} style={{
                  display: 'block', padding: '1rem 0', fontSize: 22, fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em',
                  color: active ? activeColor : 'var(--text)',
                  borderBottom: '1px solid var(--border)',
                }}>
                  {t(`nav.${key}`)}
                </Link>
              )
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: '2rem' }}>
            <LangSwitch />
            <a href="https://app.dencpass.com"
              style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: 12, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t('nav.login')}
            </a>
            <a href="https://app.dencpass.com/register" className="btn-primary"
              style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: 12, background: 'var(--accent)', color: '#07111f', fontSize: 15, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t('nav.cta')}
            </a>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const FOOTER_COLS = [
  {
    titleKey: 'colProduct',
    links: [
      { key: 'Features',  to: '/features' },
      { key: 'Security',  to: '/security' },
      { key: 'Pricing',   to: '/pricing' },
      { key: 'Downloads', to: '/download' },
      { key: 'Login',     href: 'https://app.dencpass.com' },
    ]
  },
  {
    titleKey: 'colBusiness',
    links: [
      { key: 'Business', to: '/business' },
      { key: 'Contact',  to: '/contact' },
    ]
  },
  {
    titleKey: 'colResources',
    links: [
      { key: 'Blog',      to: '/blog' },
      { key: 'Changelog', to: '/changelog' },
      { key: 'Status',    to: '/status' },
    ]
  },
]

function Footer({ setLegalModal, theme, setTheme }) {
  const { t, i18n } = useTranslation('common')
  const linkStyle = {
    display: 'block', fontSize: 13, color: 'var(--text5)', marginBottom: '0.55rem',
    transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer',
    padding: 0, fontFamily: "'Inter', sans-serif", textAlign: 'left',
  }
  const hov = {
    onMouseEnter: e => e.currentTarget.style.color = 'var(--accent)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text5)',
  }

  return (
    <footer style={{ background: 'var(--bg-footer)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <div className="footer-grid">
          <div>
            <Link to={localizedPath('/', i18n.language)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <LogoMark height={32} bg="var(--bg-footer)" gradId="ft-dp-g" />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-0.05em', color: 'var(--text)' }}>
                Denc<span style={{ color: 'var(--accent)' }}>Pass</span>
              </span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--text5)', lineHeight: 1.75, maxWidth: 260, marginBottom: '1.25rem' }}>
              {t('footer.tagline')}
            </p>
            <a href="mailto:support@dencpass.com"
              style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text5)'}>
              support@dencpass.com
            </a>
          </div>

          {FOOTER_COLS.map(col => (
            <div key={col.titleKey}>
              <p style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '1rem', textTransform: 'uppercase' }}>{t(`footer.${col.titleKey}`)}</p>
              {col.links.map(l => (
                l.modal
                  ? <button key={l.key} onClick={() => setLegalModal(l.modal)} style={linkStyle} {...hov}>{t(`footer.link${l.key}`)}</button>
                  : l.to
                    ? <Link key={l.key} to={localizedPath(l.to, i18n.language)} style={linkStyle} {...hov}>{t(`footer.link${l.key}`)}</Link>
                    : <a key={l.key} href={l.href} style={linkStyle} {...hov}>{t(`footer.link${l.key}`)}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <p style={{ fontSize: 12, color: 'var(--text4)', fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>
              {t('footer.copyright')} · <em>{t('footer.slogan')}</em>
            </p>
            <span style={{ fontSize: 12, color: 'var(--border2)' }}>·</span>
            <button onClick={() => setLegalModal('privacy')} style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'Inter', sans-serif", background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }} {...hov}>{t('footer.privacy')}</button>
            <button onClick={() => setLegalModal('cgu')} style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'Inter', sans-serif", background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }} {...hov}>{t('footer.terms')}</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <LangSwitch />
            <div style={{ display: 'flex', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 9, padding: 3, gap: 2 }}>
              {THEME_OPTS.map(({ v, Icon, key }) => {
                const label = t(`footer.${key}`)
                return (
                  <button key={v} onClick={() => setTheme(v)} title={label}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', background: theme === v ? 'var(--accent-014)' : 'none', color: theme === v ? 'var(--accent)' : 'var(--text5)' }}>
                    <Icon /> {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── PublicLayout ─────────────────────────────────────────────────────────────
export default function PublicLayout({ children }) {
  const [legalModal, setLegalModal] = useState(null)
  const { theme, setTheme } = useTheme()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <NavBar />
      <main>{children}</main>
      <Footer setLegalModal={setLegalModal} theme={theme} setTheme={setTheme} />
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </div>
  )
}
