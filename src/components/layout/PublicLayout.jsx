import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { IcoArrow, IcoSun, IcoMoon, IcoMonitor, IcoMenu, IcoClose, IcoLock } from '../shared'

// ─── Legal content ────────────────────────────────────────────────────────────
const LEGAL = {
  cgu: {
    title: "Conditions d'utilisation",
    sections: [
      { h: "1. Objet", p: "Les présentes conditions régissent l'utilisation de DencPass, gestionnaire de mots de passe et de secrets numériques, accessible sur app.dencu.online. En créant un compte, vous acceptez ces conditions dans leur intégralité." },
      { h: "2. Accès au service", p: "Denc est accessible aux particuliers (édition Community / Pro) et aux organisations (édition Enterprise SaaS). L'accès Enterprise SaaS est conditionné à la possession d'une licence valide délivrée par DencPass." },
      { h: "3. Responsabilités", p: "Vous êtes responsable de la confidentialité de vos identifiants, de l'exactitude des données saisies, et de la sécurité de votre appareil. DencPass ne peut être tenu responsable d'une compromission liée à la négligence de l'utilisateur." },
      { h: "4. Données chiffrées", p: "Vos mots de passe, secrets et certificats sont chiffrés avant d'être stockés. DencPass ne dispose d'aucun accès en clair à vos données sensibles." },
      { h: "5. Résiliation", p: "Vous pouvez supprimer votre compte à tout moment depuis les Paramètres → Zone de danger. Pour les organisations, la résiliation intervient à l'expiration de la licence, après une période de grâce de 7 jours." },
      { h: "6. Modifications", p: "DencPass se réserve le droit de modifier ces conditions. Les utilisateurs seront notifiés par email au moins 15 jours avant toute modification substantielle." },
      { h: "7. Contact", p: "mouhamadoumoustapha.dione@dencu.online" },
    ]
  },
  privacy: {
    title: "Politique de confidentialité",
    sections: [
      { h: "1. Données collectées", p: "DencPass collecte : adresse email, nom d'utilisateur, métadonnées de connexion (date, IP), et les données chiffrées que vous stockez. Aucune donnée sensible n'est lisible par nos équipes." },
      { h: "2. Finalité", p: "Vos données sont utilisées exclusivement pour fournir le service DencPass : authentification, stockage sécurisé, notifications d'expiration de certificats et de licences." },
      { h: "3. Durée de conservation", p: "Les données sont supprimées immédiatement à la fermeture du compte. Les logs de sécurité sont conservés jusqu'à rotation manuelle par l'administrateur." },
      { h: "4. Partage", p: "DencPass ne vend, ne loue et ne partage aucune donnée personnelle avec des tiers à des fins commerciales." },
      { h: "5. Vos droits", p: "Droit d'accès, rectification, suppression et portabilité. Pour exercer ces droits : mouhamadoumoustapha.dione@dencu.online" },
      { h: "6. Sécurité", p: "Chiffrement multi-clés, authentification 2FA, journalisation des accès, contrôle d'accès strict aux serveurs." },
      { h: "7. Contact", p: "mouhamadoumoustapha.dione@dencu.online · +221 XX XXX XX XX" },
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
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg2)', border: '1px solid rgba(47,217,244,0.18)', borderRadius: 20, maxWidth: 620, width: '100%', maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(47,217,244,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text)' }}>{doc.title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text4)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '4px 8px', borderRadius: 6 }}>✕</button>
        </div>
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {doc.sections.map(s => (
            <div key={s.h}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#2fd9f4', marginBottom: '0.3rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}>{s.h}</p>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75 }}>{s.p}</p>
            </div>
          ))}
          <p style={{ fontSize: 11, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", marginTop: '0.5rem' }}>Dernière mise à jour : juin 2026</p>
        </div>
      </div>
    </div>
  )
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Fonctionnalités', to: '/features' },
  { label: 'Sécurité',        to: '/security' },
  { label: 'Entreprises',     to: '/business' },
  { label: 'Tarifs',          to: '/pricing' },
]

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 62,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 max(1.5rem, calc((100% - 1200px) / 2))',
        background: scrolled ? 'var(--bg-nav)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border2)' : '1px solid transparent',
        transition: 'background 0.35s, border-color 0.35s, backdrop-filter 0.35s',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid var(--border2)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/dencpass-logo.png" alt="DencPass" style={{ width: 24, height: 24, objectFit: 'contain' }} />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: '-0.04em', color: 'var(--text)' }}>
            Denc<span style={{ color: '#2fd9f4' }}>Pass</span>
          </span>
        </Link>

        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          {NAV_ITEMS.map(({ label, to }) => (
            <Link key={to} to={to} className="nav-link" style={{
              fontSize: 14,
              color: location.pathname === to ? '#2fd9f4' : 'var(--text3)',
              fontFamily: "'Inter', sans-serif", fontWeight: 500,
            }}>
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="https://app.dencu.online"
            className="nav-link"
            style={{ fontSize: 13, color: 'var(--text3)', fontFamily: "'Inter', sans-serif", fontWeight: 500, padding: '8px 4px' }}>
            Connexion
          </a>
          <a href="https://app.dencu.online/register" className="btn-primary"
            style={{ padding: '9px 18px', borderRadius: 10, background: '#2fd9f4', color: '#07111f', fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 2px 16px rgba(47,217,244,0.25)' }}>
            Essayer gratuitement
          </a>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', padding: 4 }}
          >
            <IcoMenu />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(7,17,31,0.97)', backdropFilter: 'blur(24px)', display: 'flex', flexDirection: 'column', padding: '1.25rem max(1.5rem, calc((100% - 1200px) / 2))' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 62 }}>
            <Link to="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid rgba(47,217,244,0.22)', background: 'rgba(47,217,244,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src="/dencpass-logo.png" alt="DencPass" style={{ width: 24, height: 24, objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: '-0.04em', color: 'var(--text)' }}>
                Denc<span style={{ color: '#2fd9f4' }}>Pass</span>
              </span>
            </Link>
            <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', padding: 4 }}>
              <IcoClose />
            </button>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem' }}>
            {NAV_ITEMS.map(({ label, to }) => (
              <Link key={to} to={to} onClick={() => setMobileOpen(false)} style={{
                display: 'block', padding: '1rem 0', fontSize: 22, fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em',
                color: location.pathname === to ? '#2fd9f4' : 'var(--text)',
                borderBottom: '1px solid rgba(47,217,244,0.06)',
              }}>
                {label}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: '2rem' }}>
            <a href="https://app.dencu.online"
              style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: 12, border: '1px solid rgba(47,217,244,0.2)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              Connexion
            </a>
            <a href="https://app.dencu.online/register" className="btn-primary"
              style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: 12, background: '#2fd9f4', color: '#07111f', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
              Essayer gratuitement
            </a>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ setLegalModal }) {
  const { theme, setTheme } = useTheme()
  const themes = [
    { v: 'light',  Icon: IcoSun,     l: 'Clair' },
    { v: 'dark',   Icon: IcoMoon,    l: 'Sombre' },
    { v: 'system', Icon: IcoMonitor, l: 'Système' },
  ]
  const linkStyle = { display: 'block', fontSize: 13, color: 'var(--text5)', marginBottom: '0.55rem', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'Inter', sans-serif", textAlign: 'left' }
  const hover = { onMouseEnter: e => e.target.style.color = 'var(--accent)', onMouseLeave: e => e.target.style.color = 'var(--text5)' }

  const cols = [
    {
      title: 'Produit',
      links: [
        { label: 'Fonctionnalités', to: '/features' },
        { label: 'Sécurité',        to: '/security' },
        { label: 'Tarifs',          to: '/pricing' },
        { label: 'Téléchargements', to: '/download' },
        { label: 'Connexion',       href: 'https://app.dencu.online' },
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'Entreprises',     to: '/business' },
        { label: 'À propos',        to: '/about' },
        { label: 'Contact',         href: 'mailto:mouhamadoumoustapha.dione@dencu.online' },
      ]
    },
    {
      title: 'Ressources',
      links: [
        { label: 'Blog',           to: '/blog' },
        { label: 'Changelog',      to: '/changelog' },
        { label: 'Statut du service', href: '#' },
      ]
    },
    {
      title: 'Légal',
      links: [
        { label: 'Confidentialité',    modal: 'privacy' },
        { label: "Conditions d'utilisation", modal: 'cgu' },
      ]
    },
  ]

  return (
    <footer style={{ background: 'var(--bg-footer)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem max(1.5rem, calc((100% - 1200px) / 2)) 2rem' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid var(--border2)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src="/dencpass-logo.png" alt="DencPass" style={{ width: 28, height: 28, objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-0.04em', color: 'var(--text)' }}>
                Denc<span style={{ color: '#2fd9f4' }}>Pass</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text5)', lineHeight: 1.75, maxWidth: 260, marginBottom: '1.25rem' }}>
              Gestionnaire de mots de passe et secrets numériques pour les professionnels et organisations d'Afrique.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <a href="mailto:mouhamadoumoustapha.dione@dencu.online" style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.2s' }} {...hover}>
                mouhamadoumoustapha.dione@dencu.online
              </a>
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '1rem' }}>{col.title.toUpperCase()}</p>
              {col.links.map(l => (
                l.modal
                  ? <button key={l.label} onClick={() => setLegalModal(l.modal)} style={linkStyle} {...hover}>{l.label}</button>
                  : l.to
                    ? <Link key={l.label} to={l.to} style={linkStyle} {...hover}>{l.label}</Link>
                    : <a key={l.label} href={l.href} style={linkStyle} {...hover}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: 12, color: 'var(--text4)', fontFamily: "'JetBrains Mono', monospace" }}>
            © 2026 DencPass · Sénégal · <em>Samm sa sirru</em>
          </p>
          <div style={{ display: 'flex', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 9, padding: 3, gap: 2 }}>
            {themes.map(({ v, Icon, l }) => (
              <button key={v} onClick={() => setTheme(v)} title={l}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', background: theme === v ? 'rgba(47,217,244,0.12)' : 'none', color: theme === v ? '#2fd9f4' : 'var(--text5)' }}>
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
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <NavBar />
      <main>{children}</main>
      <Footer setLegalModal={setLegalModal} />
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </div>
  )
}
