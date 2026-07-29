import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { IcoSun, IcoMoon, IcoMenu, IcoClose } from '../shared'

// ─── Legal content ────────────────────────────────────────────────────────────
const LEGAL = {
  cgu: {
    title: "Conditions d'utilisation",
    sections: [
      { h: "1. Objet", p: "Les présentes conditions régissent l'utilisation de DencPass, gestionnaire de mots de passe et de secrets numériques, accessible sur app.dencpass.com. En créant un compte, vous acceptez ces conditions dans leur intégralité." },
      { h: "2. Accès au service", p: "Denc est accessible aux particuliers (édition Community / Pro) et aux organisations (édition Enterprise SaaS). L'accès Enterprise SaaS est conditionné à la possession d'une licence valide délivrée par DencPass." },
      { h: "3. Responsabilités", p: "Vous êtes responsable de la confidentialité de vos identifiants, de l'exactitude des données saisies, et de la sécurité de votre appareil. DencPass ne peut être tenu responsable d'une compromission liée à la négligence de l'utilisateur." },
      { h: "4. Données chiffrées", p: "Vos mots de passe, secrets et certificats sont chiffrés avant d'être stockés. DencPass ne dispose d'aucun accès en clair à vos données sensibles." },
      { h: "5. Résiliation", p: "Vous pouvez supprimer votre compte à tout moment depuis les Paramètres → Zone de danger. Pour les organisations, la résiliation intervient à l'expiration de la licence, après une période de grâce de 7 jours." },
      { h: "6. Modifications", p: "DencPass se réserve le droit de modifier ces conditions. Les utilisateurs seront notifiés par email au moins 15 jours avant toute modification substantielle." },
      { h: "7. Contact", p: "support@dencpass.com" },
    ]
  },
  privacy: {
    title: "Politique de confidentialité",
    sections: [
      { h: "1. Données collectées", p: "DencPass collecte : adresse email, nom d'utilisateur, métadonnées de connexion (date, IP), et les données chiffrées que vous stockez. Aucune donnée sensible n'est lisible par nos équipes." },
      { h: "2. Finalité", p: "Vos données sont utilisées exclusivement pour fournir le service DencPass : authentification, stockage sécurisé, notifications d'expiration de certificats et de licences." },
      { h: "3. Durée de conservation", p: "Les données sont supprimées immédiatement à la fermeture du compte. Les logs de sécurité sont conservés jusqu'à rotation manuelle par l'administrateur." },
      { h: "4. Partage", p: "DencPass ne vend, ne loue et ne partage aucune donnée personnelle avec des tiers à des fins commerciales." },
      { h: "5. Vos droits", p: "Droit d'accès, rectification, suppression et portabilité. Pour exercer ces droits : support@dencpass.com" },
      { h: "6. Sécurité", p: "Chiffrement multi-clés, authentification 2FA, journalisation des accès, contrôle d'accès strict aux serveurs." },
      { h: "7. Contact", p: "support@dencpass.com" },
    ]
  }
}

// ─── Legal Modal ──────────────────────────────────────────────────────────────
function LegalModal({ type, onClose }) {
  const doc = LEGAL[type]
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])
  if (!doc) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 20, maxWidth: 620, width: '100%', maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text)' }}>{doc.title}</h2>
          <button onClick={onClose} aria-label="Fermer" style={{ background: 'none', border: 'none', color: 'var(--text4)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '4px 8px', borderRadius: 6 }}>✕</button>
        </div>
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {doc.sections.map(s => (
            <div key={s.h}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginBottom: '0.3rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>{s.h}</p>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75 }}>{s.p}</p>
            </div>
          ))}
          <p style={{ fontSize: 11, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", marginTop: '0.5rem' }}>Dernière mise à jour : juin 2026</p>
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

// ─── NavBar ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Fonctionnalités', to: '/features' },
  { label: 'Sécurité',        to: '/security' },
  { label: 'Entreprises',     to: '/business' },
  { label: 'Tarifs',          to: '/pricing' },
  { label: 'Contact',         to: '/contact' },
]

const THEME_OPTS = [
  { v: 'dark',  Icon: IcoMoon, l: 'Sombre' },
  { v: 'light', Icon: IcoSun,  l: 'Clair'  },
]

function NavBar({ theme, setTheme }) {
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

        <Link to="/" aria-label="DencPass : Accueil" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <LogoMark height={26} bg="var(--bg)" gradId="nav-dp-g" />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: '-0.05em', color: 'var(--text)' }}>
            Denc<span style={{ color: 'var(--accent)' }}>Pass</span>
          </span>
        </Link>

        <div className="nav-links">
          {NAV_ITEMS.map(({ label, to }) => (
            <Link key={to} to={to} className="nav-link" style={{
              fontSize: 14,
              color: location.pathname === to ? 'var(--accent)' : 'var(--text3)',
              fontFamily: "'Inter', sans-serif", fontWeight: 500,
            }}>
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="nav-theme-toggle" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 9, padding: 3, gap: 2 }}>
            {THEME_OPTS.map(({ v, Icon, l }) => (
              <button key={v} onClick={() => setTheme(v)} title={l}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '4px 10px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
                  background: theme === v ? 'var(--accent-014)' : 'transparent',
                  color: theme === v ? 'var(--accent)' : 'var(--text5)',
                }}>
                <Icon /> {l}
              </button>
            ))}
          </div>
          <div className="nav-cta-group">
            <a href="https://app.dencpass.com" className="nav-link"
              style={{ fontSize: 13, color: 'var(--text3)', fontFamily: "'Inter', sans-serif", fontWeight: 500, padding: '8px 4px' }}>
              Connexion
            </a>
            <a href="https://app.dencpass.com/register" className="btn-primary"
              style={{ padding: '9px 18px', borderRadius: 10, background: 'var(--accent)', color: '#07111f', fontSize: 13, boxShadow: '0 2px 16px var(--accent-014)', whiteSpace: 'nowrap' }}>
              Essayer gratuitement
            </a>
          </div>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Ouvrir le menu"
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
            <Link to="/" onClick={() => setMobileOpen(false)} aria-label="DencPass : Accueil" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <LogoMark height={26} bg="var(--bg)" gradId="mob-dp-g" />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: '-0.05em', color: 'var(--text)' }}>
                Denc<span style={{ color: 'var(--accent)' }}>Pass</span>
              </span>
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Fermer le menu"
              style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', padding: 4 }}>
              <IcoClose />
            </button>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem' }}>
            {NAV_ITEMS.map(({ label, to }) => (
              <Link key={to} to={to} onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '1rem 0', fontSize: 22, fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em',
                color: location.pathname === to ? 'var(--accent)' : 'var(--text)',
                borderBottom: '1px solid var(--border)',
              }}>
                {label}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: '2rem' }}>
            <a href="https://app.dencpass.com"
              style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: 12, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              Connexion
            </a>
            <a href="https://app.dencpass.com/register" className="btn-primary"
              style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: 12, background: 'var(--accent)', color: '#07111f', fontSize: 15, fontFamily: "'Space Grotesk', sans-serif" }}>
              Essayer gratuitement
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
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', to: '/features' },
      { label: 'Sécurité',        to: '/security' },
      { label: 'Tarifs',          to: '/pricing' },
      { label: 'Téléchargements', to: '/download' },
      { label: 'Connexion',       href: 'https://app.dencpass.com' },
    ]
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'Entreprises', to: '/business' },
      { label: 'Contact',     to: '/contact' },
    ]
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Blog',              to: '/blog' },
      { label: 'Changelog',         to: '/changelog' },
      { label: 'Statut du service', to: '/status' },
    ]
  },
]

function Footer({ setLegalModal, theme, setTheme }) {
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
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <LogoMark height={32} bg="var(--bg-footer)" gradId="ft-dp-g" />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-0.05em', color: 'var(--text)' }}>
                Denc<span style={{ color: 'var(--accent)' }}>Pass</span>
              </span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--text5)', lineHeight: 1.75, maxWidth: 260, marginBottom: '1.25rem' }}>
              Gestionnaire de mots de passe et secrets numériques pour les professionnels et organisations d'Afrique.
            </p>
            <a href="mailto:support@dencpass.com"
              style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text5)'}>
              support@dencpass.com
            </a>
          </div>

          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '1rem', textTransform: 'uppercase' }}>{col.title}</p>
              {col.links.map(l => (
                l.modal
                  ? <button key={l.label} onClick={() => setLegalModal(l.modal)} style={linkStyle} {...hov}>{l.label}</button>
                  : l.to
                    ? <Link key={l.label} to={l.to} style={linkStyle} {...hov}>{l.label}</Link>
                    : <a key={l.label} href={l.href} style={linkStyle} {...hov}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <p style={{ fontSize: 12, color: 'var(--text4)', fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>
              © 2026 DencPass · Sénégal · <em>Samm sa sirru</em>
            </p>
            <span style={{ fontSize: 12, color: 'var(--border2)' }}>·</span>
            <button onClick={() => setLegalModal('privacy')} style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'Inter', sans-serif", background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }} {...hov}>Confidentialité</button>
            <button onClick={() => setLegalModal('cgu')} style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'Inter', sans-serif", background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }} {...hov}>Conditions d'utilisation</button>
          </div>
          <div style={{ display: 'flex', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 9, padding: 3, gap: 2 }}>
            {THEME_OPTS.map(({ v, Icon, l }) => (
              <button key={v} onClick={() => setTheme(v)} title={l}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', background: theme === v ? 'var(--accent-014)' : 'none', color: theme === v ? 'var(--accent)' : 'var(--text5)' }}>
                <Icon /> {l}
              </button>
            ))}
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
      <NavBar theme={theme} setTheme={setTheme} />
      <main>{children}</main>
      <Footer setLegalModal={setLegalModal} theme={theme} setTheme={setTheme} />
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </div>
  )
}
