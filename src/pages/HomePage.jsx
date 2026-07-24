import { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import { Link } from 'react-router-dom'
import NumberFlow from '@number-flow/react'
import confetti from 'canvas-confetti'
import PublicLayout from '../components/layout/PublicLayout'
import DotField from '../components/DotField'
import { useTheme } from '../hooks/useTheme'
import { Reveal, prefersReducedMotion, IcoCheck, IcoX, IcoArrow, IcoChevron, IcoVault, IcoZap, IcoShare, IcoKey, IcoGlobe, IcoCert, IcoUsers, IcoActivity, IcoServer, IcoShield, IcoPhone, IcoEye, IcoClipboard, IcoLock, IcoSearch, IcoCopy, IcoBuilding, IcoCode, IcoStar, IcoSmartphone } from '../components/shared'

// ─── Hero typewriter ──────────────────────────────────────────────────────────
const HERO_TEXT = 'Tous vos mots de passe et secrets, chiffrés de bout en bout.'

function HeroTypewriter() {
  const [typed, setTyped] = useState(prefersReducedMotion ? HERO_TEXT : '')
  const [showCaret, setShowCaret] = useState(!prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return
    let i = 0
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setTyped(HERO_TEXT.slice(0, i))
        if (i >= HERO_TEXT.length) { clearInterval(iv); setTimeout(() => setShowCaret(false), 1400) }
      }, 42)
      return () => clearInterval(iv)
    }, 320)
    return () => clearTimeout(t)
  }, [])

  return (
    <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.08, letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.1rem', maxWidth: 640 }}>
      {typed}
      {showCaret && <span style={{ display: 'inline-block', width: '0.055em', height: '0.82em', background: 'var(--accent)', borderRadius: 1, marginLeft: '0.05em', verticalAlign: '-0.05em', animation: 'caret-blink 1.05s step-end infinite' }} />}
    </h1>
  )
}

// ─── Product mockup ───────────────────────────────────────────────────────────
function ProductMockup() {
  const entries = [
    { initials: 'BQ', name: 'Banque en ligne',  user: 'john.doe@gmail.com', score: 98 },
    { initials: 'AW', name: 'AWS Production',    user: 'toto@acmecorp.io',   score: 100 },
  ]
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
      <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(ellipse at 50% 50%, rgba(47,217,244,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-card)', animation: 'mockup-float 7s ease-in-out infinite' }}>
        <div style={{ padding: '11px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.75 }} />)}
          </div>
          <div style={{ flex: 1, background: 'var(--accent-004)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 5, marginLeft: 6 }}>
            <span style={{ color: 'var(--accent)', display: 'flex' }}><IcoLock size={9} /></span>
            <span style={{ fontSize: 10, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace" }}>app.dencpass.com</span>
          </div>
        </div>
        <div style={{ padding: '0 14px', borderBottom: '1px solid var(--border)', display: 'flex' }}>
          {['Coffre', 'Générateur', 'Partage'].map((t, i) => (
            <div key={t} style={{ padding: '8px 14px', fontSize: 11, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--accent)' : 'var(--text5)', borderBottom: i === 0 ? '2px solid var(--accent)' : '2px solid transparent' }}>{t}</div>
          ))}
        </div>
        <div style={{ padding: '10px 14px 8px' }}>
          <div style={{ background: 'var(--accent-004)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 11px', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text5)' }}>
            <IcoSearch size={14} /><span style={{ fontSize: 12, opacity: 0.6 }}>Rechercher dans le coffre…</span>
          </div>
        </div>
        <div style={{ padding: '0 14px 10px' }}>
          {entries.map((e, i) => (
            <div key={i} style={{ padding: '10px 4px', display: 'flex', alignItems: 'center', gap: 11, borderLeft: i === 0 ? '2px solid var(--accent)' : '2px solid transparent', background: i === 0 ? 'var(--accent-004)' : 'transparent', borderRadius: '0 8px 8px 0', paddingLeft: 11 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: i === 0 ? 'var(--accent-014)' : 'var(--accent-004)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? 'var(--accent)' : 'var(--text3)', fontFamily: "'Space Grotesk', sans-serif" }}>{e.initials}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-head)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{e.user}</div>
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace" }}>{e.score}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '9px 14px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace" }}>3 entrées · chiffrées</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace" }}>94/100</span>
        </div>
      </div>
      {/* Badge 2FA */}
      <div style={{ position: 'absolute', bottom: -16, left: -18, background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 12, padding: '9px 13px', display: 'flex', alignItems: 'center', gap: 9, boxShadow: 'var(--shadow-card)', animation: 'mockup-float 7s ease-in-out infinite 1.5s' }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}><IcoPhone size={13} /></div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', fontFamily: "'Space Grotesk', sans-serif" }}>2FA activé</div>
          <div style={{ fontSize: 9, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace" }}>Google Auth</div>
        </div>
      </div>
      {/* Badge AES */}
      <div style={{ position: 'absolute', top: 46, right: -18, background: 'var(--bg2)', border: '1px solid var(--purple-025)', borderRadius: 10, padding: '8px 13px', boxShadow: 'var(--shadow-card)', animation: 'mockup-float 7s ease-in-out infinite 3s' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>AES-256</div>
        <div style={{ fontSize: 9, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace" }}>chiffré · HMAC</div>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { theme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', padding: '4.5rem max(1.25rem, calc((100vw - 1200px) / 2)) 3.5rem' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 22% 30%, var(--accent-014) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, var(--purple-06) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <DotField
        gradientFrom={isDark ? 'rgba(47,217,244,0.30)' : 'rgba(10,139,166,0.32)'}
        gradientTo={isDark ? 'rgba(139,92,246,0.22)' : 'rgba(109,63,212,0.20)'}
        glowColor={isDark ? 'rgba(47,217,244,0.16)' : 'rgba(10,139,166,0.18)'}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.7, maskImage: 'radial-gradient(ellipse at 45% 45%, #000 25%, transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse at 45% 45%, #000 25%, transparent 78%)' }}
        aria-hidden="true"
      />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'center' }} className="hero-grid">
        <div>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid var(--border2)', background: 'var(--accent-004)', marginBottom: '1.6rem', animation: 'fade-up 0.6s ease both 0.05s' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'glow-pulse 2s ease-in-out infinite', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>GESTIONNAIRE DE MOTS DE PASSE · SÉNÉGAL</span>
          </div>

          {/* H1 typewriter */}
          <div style={{ animation: 'fade-up 0.6s ease both 0.1s' }}>
            <HeroTypewriter />
          </div>

          {/* « Samm sa sirru » ligne secondaire */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.4rem', flexWrap: 'wrap', animation: 'fade-up 0.7s ease both 0.2s' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)', fontStyle: 'italic', color: 'var(--accent)', letterSpacing: '-0.02em' }}>« Samm sa sirru »</span>
            <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text4)', letterSpacing: '0.04em', padding: '4px 10px', borderRadius: 100, border: '1px solid var(--border)', background: 'var(--bg2)' }}>wolof — « garde ton secret »</span>
          </div>

          {/* Sous-titre */}
          <p style={{ fontSize: 16.5, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 520, marginBottom: '2.2rem', animation: 'fade-up 0.7s ease both 0.3s' }}>
            Le coffre-fort de vos identifiants, secrets et certificats. Chiffrement AES-256-GCM, zéro connaissance serveur, paiement en FCFA — fait pour l'Afrique.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', animation: 'fade-up 0.7s ease both 0.4s' }}>
            <a href="https://app.dencpass.com/register" className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 13, background: 'var(--accent)', color: 'var(--bg)', fontSize: 15, boxShadow: '0 4px 28px var(--accent-014)' }}>
              Commencer gratuitement <IcoArrow />
            </a>
            <Link to="/fonctionnalites" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 26px', borderRadius: 13, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              Voir les fonctionnalités
            </Link>
          </div>
        </div>

        <div className="hero-mockup" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ProductMockup />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to bottom, transparent, var(--bg))', pointerEvents: 'none' }} />
      <style>{`
        @keyframes caret-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes mockup-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fade-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow-pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @media (max-width:1000px) { .hero-grid{grid-template-columns:1fr!important} .hero-mockup{display:none!important} }
      `}</style>
    </section>
  )
}

// ─── Trust band ───────────────────────────────────────────────────────────────
function TrustBand() {
  const badges = [
    { Icon: IcoLock,  label: 'AES-256-GCM' },
    { Icon: IcoEye,   label: 'Zéro connaissance' },
    { Icon: IcoPhone, label: '2FA TOTP' },
    { Icon: IcoCode,  label: 'Extension Chrome' },
    { Icon: IcoGlobe, label: 'Africa-first' },
  ]
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.9rem 0', overflowX: 'auto', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 max(1.5rem, calc((100% - 1200px) / 2))', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.75rem', minWidth: 'max-content' }}>
        {badges.map(({ Icon, label }, i) => (
          <Fragment key={label}>
            {i > 0 && <span style={{ width: 1, height: 13, background: 'var(--border2)', flexShrink: 0 }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--accent)', display: 'flex', flexShrink: 0 }}><Icon size={13} /></span>
              <span style={{ fontWeight: 500, fontSize: 13, color: 'var(--text3)', letterSpacing: '0.01em' }}>{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

// ─── Stats row — format cards avec contexte ───────────────────────────────────
const STATS = [
  { Icon: IcoShield, num: 700,   suffix: 'M+',    text: null,        unit: 'M+',    label: 'Fuites indexées (HIBP)',  context: 'Chaque mot de passe est comparé à 700 millions de fuites connues — sans jamais quitter votre appareil en clair.' },
  { Icon: IcoKey,    num: 128,   suffix: ' car.',  text: null,        unit: 'car.',  label: 'Générateur',              context: 'Longueur maximale d\'un mot de passe généré, avec règles configurables et passphrase mémorable.' },
  { Icon: IcoEye,    num: null,  suffix: '',       text: 'Zéro',      unit: '',      label: 'Accès serveur',           context: 'Nos serveurs ne peuvent pas lire vos données. Même en cas d\'accès physique, tout reste illisible.' },
  { Icon: IcoLock,   num: null,  suffix: '',       text: 'AES-256',   unit: 'GCM',  label: 'Chiffrement',             context: 'Chiffrement de bout en bout, chaque entrée chiffrée individuellement avec contrôle HMAC.' },
]

function StatsRow() {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '3.5rem max(1.5rem, calc((100% - 1200px) / 2))' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {STATS.map(({ Icon, num, suffix, text, unit, label, context }, i) => (
          <Reveal key={label} delay={i * 80}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'border-color 0.2s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: '0.2rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                  <Icon size={18} />
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  {text ? (
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '2rem', color: 'var(--sand)', letterSpacing: '-0.04em', lineHeight: 1 }}>{text}</span>
                  ) : (
                    <NumberFlow
                      value={triggered ? num : 0}
                      locales="fr-FR"
                      suffix={suffix}
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '2rem', color: 'var(--sand)', letterSpacing: '-0.04em', lineHeight: 1 }}
                    />
                  )}
                  {unit && <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent)' }}>{unit}</span>}
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: "'Space Grotesk', sans-serif" }}>{label}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.55 }}>{context}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

// ─── Features teaser ──────────────────────────────────────────────────────────
const MAIN_FEATURES = [
  { Icon: IcoVault,    title: 'Coffre chiffré',    desc: 'Mots de passe, identifiants et notes sécurisées avec historique des modifications.', link: '/fonctionnalites' },
  { Icon: IcoShare,    title: 'Partage sécurisé',  desc: 'Liens temporaires avec limite de vues, expiration et révocation à tout moment.',      link: '/fonctionnalites' },
  { Icon: IcoActivity, title: 'Audit de sécurité', desc: 'Chaque action tracée. Intégration Splunk, Elastic, Wazuh via webhook ou Syslog.',     link: '/fonctionnalites' },
  { Icon: IcoUsers,    title: 'Équipes & groupes', desc: 'Gestion centralisée des accès avec rôles, permissions et audit par organisation.',     link: '/entreprises' },
]

function FeaturesTeaser() {
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: '3rem', maxWidth: 560 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>FONCTIONNALITÉS</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>
              Tout ce dont vous avez besoin.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7 }}>De la gestion quotidienne à la sécurité enterprise avec SIEM et Active Directory.</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {MAIN_FEATURES.map(({ Icon, title, desc, link }, i) => (
            <Reveal key={title} delay={i * 80}>
              <Link to={link} style={{ display: 'block', padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1.25rem' }}><Icon size={20} /></div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.5rem' }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 1.1rem' }}>{desc}</p>
                <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>En savoir plus <IcoArrow size={11} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Comment ça marche ────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    { n: '01', accent: 'var(--accent)', title: 'Créez votre coffre',   desc: 'Inscription en 2 minutes. Votre coffre chiffré est prêt instantanément, sans carte bancaire.' },
    { n: '02', accent: 'var(--purple)', title: 'Importez ou générez',   desc: 'Depuis Chrome, Bitwarden, 1Password ou KeePass. Ou générez des mots de passe forts directement.' },
    { n: '03', accent: 'var(--green)',  title: 'Accédez partout',       desc: 'Via app.dencpass.com ou l\'extension Chrome pour le remplissage automatique dans votre navigateur.' },
  ]
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>COMMENT ÇA MARCHE</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Opérationnel en 3 étapes.</h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {steps.map(({ n, accent, title, desc }, i) => (
            <Reveal key={n} delay={i * 120}>
              <div style={{ padding: '2rem', borderRadius: 18, border: '1px solid var(--border)', background: 'var(--bg-card)', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--bg2)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color: accent }}>{n}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.6rem' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pourquoi DencPass ────────────────────────────────────────────────────────
const ADVANTAGES = [
  {
    Icon: IcoZap,
    kicker: 'FCFA · WAVE · ORANGE MONEY',
    title: 'Paiement en FCFA',
    desc: 'Payez directement en francs CFA par Wave ou Orange Money. Aucune conversion, aucune carte internationale, aucun frais caché.',
    points: ['Tarifs affichés en FCFA', 'Wave & Orange Money', 'Facturation locale'],
  },
  {
    Icon: IcoKey,
    kicker: 'WOLOF · BAMBARA · SWAHILI · YORUBA',
    title: 'Passphrase africaine',
    desc: 'Des phrases de passe mémorables construites depuis un lexique puisant dans plusieurs langues africaines. Fortes et faciles à retenir.',
    points: ['Lexique multilingue africain', 'Séparateur personnalisable', 'Facile à mémoriser'],
  },
  {
    Icon: IcoServer,
    kicker: "AFRIQUE DE L'OUEST",
    title: 'Hébergement & support local',
    desc: "Infrastructure et support pensés pour l'Afrique de l'Ouest francophone. Conformité locale et interface entièrement en français.",
    points: ['Support en français', 'Conformité RGPD & APDP', 'Latence pensée pour la région'],
  },
]

const PARITY = [
  'Architecture zéro-connaissance', 'AES-256-GCM par entrée',
  '2FA TOTP (Google Auth, Authy)', 'Générateur jusqu\'à 128 caractères',
  'Détection HIBP (k-anonymat)', 'Import CSV en 2 minutes',
]

const ROADMAP = [
  { label: 'Extension Firefox & Edge', tag: 'En développement' },
  { label: 'Interface multilingue au-delà du français', tag: 'Sur la feuille de route' },
]

function PourquoiSection() {
  return (
    <section style={{ padding: '6rem max(1.25rem, calc((100vw - 1080px) / 2))', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3.25rem', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>POURQUOI DENCPASS</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>Fait pour l'Afrique, dès le départ.</h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7 }}>Les gestionnaires globaux ne gèrent ni le FCFA, ni Wave, ni Orange Money — et ignorent les contraintes locales. Voici ce que nous faisons différemment.</p>
          </div>
        </Reveal>

        {/* 3 cards avantages */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {ADVANTAGES.map(({ Icon, kicker, title, desc, points }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div style={{ position: 'relative', padding: '2rem 1.75rem', borderRadius: 18, border: '1px solid var(--border2)', background: 'linear-gradient(180deg, var(--accent-004), transparent)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1.25rem' }}>
                  <Icon size={22} />
                </div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>{kicker}</p>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.7rem', letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 1.25rem' }}>{desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: '1.1rem', borderTop: '1px solid var(--border)' }}>
                  {points.map(pt => (
                    <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'var(--text2)' }}>
                      <span style={{ color: 'var(--accent)', display: 'flex', flexShrink: 0 }}><IcoCheck size={13} /></span>{pt}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Parity + Roadmap */}
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem' }} className="pourquoi-grid">
            {/* Parity */}
            <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1.1rem' }}>
                <span style={{ color: 'var(--green)', display: 'flex' }}><IcoCheck size={15} /></span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>Et tout ce qu'on attend d'un gestionnaire sérieux</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {PARITY.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>
                    <span style={{ color: 'var(--green)', display: 'flex', flexShrink: 0, marginTop: 2 }}><IcoCheck size={13} /></span>{p}
                  </div>
                ))}
              </div>
            </div>
            {/* Roadmap */}
            <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1.1rem' }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, background: 'var(--amber)', opacity: 0.9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg)', flexShrink: 0, fontSize: 12, fontWeight: 800 }}>!</span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>Ce qui arrive bientôt</h3>
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.5, margin: '0 0 1rem' }}>On préfère être honnêtes sur ce qui n'est pas encore là.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {ROADMAP.map(({ label, tag }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>{label}</span>
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--amber)', letterSpacing: '0.06em' }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <style>{`@media (max-width:720px) { .pourquoi-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  )
}

// ─── Security ─────────────────────────────────────────────────────────────────
const SECURITY_CARDS = [
  { Icon: IcoShield,    accent: 'var(--accent)', title: 'Chiffrement AES-256',       desc: 'Chaque entrée chiffrée individuellement. Rotation des clés sans interruption de service.' },
  { Icon: IcoPhone,     accent: 'var(--purple)', title: '2FA TOTP',                  desc: 'Compatible Google Authenticator et Authy. Le secret TOTP est lui-même chiffré au repos.' },
  { Icon: IcoEye,       accent: 'var(--green)',  title: 'Zéro connaissance',          desc: 'Même en cas d\'accès physique au serveur, vos données restent illisibles sans vos clés.' },
  { Icon: IcoClipboard, accent: 'var(--amber)',  title: 'Audit complet',              desc: 'Chaque action tracée. Export vers Splunk, Elastic via webhook ou Syslog RFC 5424.' },
]

function SecuritySection() {
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>SÉCURITÉ</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Aucun compromis.</h2>
            </div>
            <Link to="/securite" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap' }}>
              Architecture de sécurité complète <IcoArrow size={12} />
            </Link>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {SECURITY_CARDS.map(({ Icon, accent, title, desc }, i) => (
            <Reveal key={title} delay={(i % 2) * 100}>
              <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', gap: '1.1rem', alignItems: 'flex-start', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, flexShrink: 0 }}><Icon size={20} /></div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.4rem' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Transition band cyan→violet ──────────────────────────────────────────────
function TransitionBand() {
  return (
    <div style={{ position: 'relative', background: 'var(--bg-alt)', padding: '0 max(1.25rem, calc((100vw - 1200px) / 2))', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 4, background: 'linear-gradient(90deg, var(--accent) 0%, var(--purple) 100%)', borderRadius: 4, boxShadow: '0 0 24px var(--purple-025)' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '3.25rem 0 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px', borderRadius: 100, border: '1px solid var(--purple-025)', background: 'var(--purple-06)', marginBottom: '0.4rem' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          <IcoArrow size={16} style={{ color: 'var(--text4)' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--purple)', display: 'inline-block' }} />
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--purple)', letterSpacing: '0.14em', marginLeft: 4 }}>VOUS PASSEZ EN ZONE ENTERPRISE</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text3)', maxWidth: 520, margin: '1rem auto 0', lineHeight: 1.6 }}>
          À partir d'ici, le <strong style={{ color: 'var(--purple)' }}>violet</strong> signale les fonctionnalités pour les <strong style={{ color: 'var(--text2)' }}>équipes et organisations</strong>. Le <strong style={{ color: 'var(--accent)' }}>cyan</strong> reste votre usage individuel.
        </p>
      </div>
    </div>
  )
}

// ─── Enterprise ───────────────────────────────────────────────────────────────
function EnterpriseSection() {
  const items = [
    'Gestion multi-organisations', 'Active Directory (LDAP)',
    'SIEM / Syslog RFC 5424', 'Journalisation complète des accès',
    'Rôles & permissions par groupe', 'Déploiement On-Premise disponible',
  ]
  return (
    <section style={{ position: 'relative', padding: '4rem max(1.25rem, calc((100vw - 1200px) / 2)) 6rem', background: 'var(--bg-alt)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, var(--purple-06) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="ent-grid">
        <Reveal>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid var(--purple-025)', background: 'var(--purple-06)', marginBottom: '1.5rem' }}>
              <span style={{ color: 'var(--purple)', display: 'flex' }}><IcoBuilding size={13} /></span>
              <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--purple)', letterSpacing: '0.1em' }}>ENTERPRISE</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.15 }}>Pensé pour vos équipes.</h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, marginBottom: '2rem' }}>DencPass Enterprise donne à vos équipes IT une visibilité totale sur les accès, avec les outils qu'elles utilisent déjà : LDAP, SIEM, webhooks.</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/entreprises" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: 'var(--purple)', color: '#fff', fontSize: 14, boxShadow: '0 4px 24px var(--purple-025)' }}>
                Découvrir Enterprise <IcoArrow />
              </Link>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 12, border: '1px solid var(--purple-025)', color: 'var(--text2)', fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                Demander un devis
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {items.map(item => (
              <div key={item} style={{ padding: '1rem', borderRadius: 12, border: '1px solid var(--purple-014)', background: 'var(--purple-06)', display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <span style={{ color: 'var(--purple)', flexShrink: 0, marginTop: 1 }}><IcoCheck size={13} /></span>
                <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width:1000px) { .ent-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { quote: "On a migré toute notre équipe IT en 20 minutes. L'intégration Syslog avec notre SIEM était opérationnelle le jour même.", name: 'Mamadou Diallo', role: 'Responsable Sécurité SI', company: 'FinServ Dakar', initial: 'MD', accent: 'var(--accent)' },
  { quote: "Le seul gestionnaire qui fonctionne vraiment en Afrique, paiement en FCFA, Wave Money, et l'interface reste disponible même avec une connexion instable.", name: 'Awa Konaré', role: 'Fondatrice & CTO', company: 'Kolibri Tech, Abidjan', initial: 'AK', accent: 'var(--purple)' },
  { quote: "Plus jamais de mots de passe partagés sur WhatsApp. Les liens à expiration ont transformé nos revues de sécurité client.", name: 'Ibrahima Ndiaye', role: 'Directeur Informatique', company: 'Cabinet Ndiaye & Associés', initial: 'IN', accent: 'var(--green)' },
]

function TestimonialsSection() {
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>TÉMOIGNAGES</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Ce qu'ils disent.</h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {TESTIMONIALS.map(({ quote, name, role, company, initial, accent }, i) => (
            <Reveal key={name} delay={i * 90}>
              <div style={{ padding: '2rem', borderRadius: 18, border: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: 'var(--amber)' }}><IcoStar size={13} /></span>)}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, margin: 0, flex: 1, fontStyle: 'italic' }}>"{quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, paddingTop: '1.1rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: `color-mix(in srgb, ${accent} 18%, transparent)`, border: `1px solid color-mix(in srgb, ${accent} 28%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: accent }}>{initial}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif" }}>{name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text4)' }}>{role} · {company}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing teaser — aperçu 2 plans individuels ─────────────────────────────
function PricingTeaser() {
  const plans = [
    { name: 'Gratuit', tag: 'COMMUNITY', price: 0, desc: 'Pour démarrer sans engagement.', features: ['Mots de passe illimités', '50 générations / mois', '5 partages · 5 secrets', 'Extension Chrome · 2FA'], cta: 'Créer un compte', ctaHref: 'https://app.dencpass.com/register', popular: false },
    { name: 'Pro', tag: 'POPULAIRE', price: 2000, desc: 'Pour les professionnels qui ne comptent pas.', features: ['Tout du plan Gratuit', 'Générateur illimité', 'Partages & secrets illimités', 'Analyses HIBP illimitées', 'Support prioritaire'], cta: 'Passer en Pro', ctaHref: 'https://app.dencpass.com/register', popular: true },
  ]
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>TARIFS</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>Simple. Transparent. En FCFA.</h2>
            <p style={{ fontSize: 16, color: 'var(--text3)' }}>Pas de conversion, pas de frais cachés.</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: 720, margin: '0 auto 2.5rem' }} className="grid-2">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div style={{ padding: '2rem', borderRadius: 20, border: p.popular ? '1px solid var(--border3)' : '1px solid var(--border)', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden', boxShadow: p.popular ? '0 24px 64px rgba(47,217,244,0.08)' : 'none' }}>
                {p.popular && <div style={{ position: 'absolute', top: 0, right: 20, background: 'var(--accent)', color: 'var(--bg)', fontSize: 9, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '0 0 8px 8px' }}>POPULAIRE</div>}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: p.popular ? 'linear-gradient(90deg,var(--accent),rgba(47,217,244,0.2))' : 'linear-gradient(90deg,rgba(47,217,244,0.2),transparent)' }} />
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>{p.tag}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: '0.75rem' }}>{p.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: '0.25rem' }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 32, color: 'var(--text)', letterSpacing: '-0.04em' }}>{p.price === 0 ? '0' : p.price.toLocaleString('fr-FR')}</span>
                  {p.price > 0 && <span style={{ fontSize: 12, color: 'var(--text4)' }}>FCFA / mois</span>}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: '1.25rem' }}>{p.desc}</p>
                <a href={p.ctaHref} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '11px 0', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: '1.25rem', ...(p.popular ? { background: 'var(--accent)', color: 'var(--bg)', boxShadow: '0 4px 20px rgba(47,217,244,0.28)' } : { background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text3)' }) }}>
                  {p.cta}
                </a>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}><IcoCheck size={13} /></span>{f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div style={{ textAlign: 'center' }}>
            <Link to="/tarifs" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 11, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              Voir tous les plans et comparer <IcoArrow />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'Comment mes données sont-elles chiffrées ?', a: 'Chaque mot de passe, secret et certificat est chiffré individuellement en AES-256-GCM avant stockage, avec un contrôle HMAC par entrée. Même nos équipes ne peuvent pas lire vos secrets : zéro accès en clair.' },
  { q: 'Puis-je migrer depuis Bitwarden, 1Password ou KeePass ?', a: 'Oui. DencPass accepte l\'import CSV depuis Chrome, Bitwarden, LastPass, KeePass et KeePassXC directement depuis l\'interface. La migration prend moins de 2 minutes.' },
  { q: 'Comment fonctionne le paiement en FCFA ?', a: 'Paiement par virement bancaire ou mobile money (Wave, Orange Money). Pour les éditions Enterprise, nous émettons un devis en FCFA adapté à votre organisation.' },
  { q: 'Que se passe-t-il si j\'oublie mon mot de passe principal ?', a: 'Cliquez sur « Mot de passe oublié ? » depuis la page de connexion. Vous recevrez un lien de réinitialisation valable 1 heure.' },
]

function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>FAQ</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Questions fréquentes</h2>
          </div>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ borderRadius: 14, border: `1px solid ${open === i ? 'var(--border3)' : 'var(--border)'}`, background: open === i ? 'var(--accent-004)' : 'var(--bg-card)', overflow: 'hidden', transition: 'border-color 0.2s, background 0.2s' }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.15rem 1.4rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, transition: 'transform 0.22s', transform: open === i ? 'rotate(180deg)' : 'none', display: 'flex' }}><IcoChevron /></span>
                </button>
                {open === i && <div style={{ padding: '0 1.4rem 1.25rem' }}><p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.8, margin: 0 }}>{faq.a}</p></div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA final ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 50%, var(--accent-014) 0%, transparent 55%), radial-gradient(ellipse at 75% 50%, var(--purple-06) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--accent), var(--purple), transparent)' }} />
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Commencer maintenant</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', letterSpacing: '-0.05em', color: 'var(--sand)', margin: '0 0 1.25rem', lineHeight: 1.08 }}>
            Vos accès.<br /><span style={{ background: 'linear-gradient(135deg, var(--accent), var(--purple))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blindés.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>Créez votre coffre en moins de 2 minutes.<br />Gratuit, sans carte bancaire.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.dencpass.com/register" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '16px 36px', borderRadius: 14, background: 'var(--accent)', color: 'var(--bg)', fontSize: 16, boxShadow: '0 4px 32px var(--accent-014)' }}>
              Commencer gratuitement <IcoArrow size={17} />
            </a>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '16px 28px', borderRadius: 14, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 16, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              Contacter l'équipe
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <TrustBand />
      <StatsRow />
      <FeaturesTeaser />
      <HowItWorksSection />
      <PourquoiSection />
      <SecuritySection />
      <TransitionBand />
      <EnterpriseSection />
      <TestimonialsSection />
      <PricingTeaser />
      <FAQSection />
      <CTABanner />
    </PublicLayout>
  )
}
