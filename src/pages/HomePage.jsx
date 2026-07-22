import { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import { Link } from 'react-router-dom'
import NumberFlow from '@number-flow/react'
import confetti from 'canvas-confetti'
import PublicLayout from '../components/layout/PublicLayout'
import DotField from '../components/DotField'
import { useTheme } from '../hooks/useTheme'
import { Reveal, prefersReducedMotion, IcoCheck, IcoArrow, IcoChevron, IcoVault, IcoZap, IcoShare, IcoKey, IcoGlobe, IcoCert, IcoUsers, IcoActivity, IcoServer, IcoShield, IcoPhone, IcoEye, IcoClipboard, IcoLock, IcoSearch, IcoCopy, IcoBuilding, IcoCode, IcoStar } from '../components/shared'

// ─── Hero typewriter ──────────────────────────────────────────────────────────
function HeroTypewriter() {
  const LINE1 = 'Samm', LINE2 = 'sa sirru.', SPEED = 72
  const [l1, setL1] = useState(prefersReducedMotion ? LINE1 : '')
  const [l2, setL2] = useState(prefersReducedMotion ? LINE2 : '')
  const [phase, setPhase] = useState(prefersReducedMotion ? 2 : 0)
  const [showCursor, setCursor] = useState(!prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return
    let i = 0
    const t1 = setTimeout(() => {
      const iv1 = setInterval(() => {
        i++; setL1(LINE1.slice(0, i))
        if (i >= LINE1.length) {
          clearInterval(iv1); setPhase(1); let j = 0
          setTimeout(() => {
            const iv2 = setInterval(() => {
              j++; setL2(LINE2.slice(0, j))
              if (j >= LINE2.length) { clearInterval(iv2); setPhase(2); setTimeout(() => setCursor(false), 1000) }
            }, SPEED)
          }, 180)
        }
      }, SPEED)
    }, 320)
    return () => clearTimeout(t1)
  }, [])

  const cursor = showCursor ? <span style={{ display: 'inline-block', width: 3, height: '0.78em', background: '#2fd9f4', marginLeft: 4, verticalAlign: 'text-bottom', borderRadius: 1, animation: 'glow-pulse 0.65s ease-in-out infinite' }} /> : null
  const span = { display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(3.2rem, 6.5vw, 5.5rem)', color: 'var(--sand)' }
  return (
    <h1 style={{ lineHeight: 1.0, letterSpacing: '-0.045em', marginBottom: '0.75rem' }}>
      <span style={span}>{l1}{phase === 0 ? cursor : null}</span>
      <span style={span}>{l2}{phase >= 1 ? cursor : null}</span>
    </h1>
  )
}

// ─── Product mockup ───────────────────────────────────────────────────────────
function ProductMockup() {
  const entries = [
    { initials: 'BQ', name: 'Banque en ligne',  user: 'john.doe@gmail.com', score: 98 },
    { initials: 'RH', name: 'Portail RH',        user: 'pathe.diallo',       score: 84 },
    { initials: 'AW', name: 'AWS Production',    user: 'toto@acmecorp.io',   score: 100 },
  ]
  const scoreGradient = s => s >= 90 ? 'linear-gradient(90deg,rgba(47,217,244,0.5),#2fd9f4)' : 'linear-gradient(90deg,rgba(47,217,244,0.3),rgba(47,217,244,0.8))'
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
      <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(ellipse at 50% 50%, rgba(47,217,244,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', background: '#080f1c', border: '1px solid rgba(47,217,244,0.16)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 48px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(47,217,244,0.05)', animation: 'mockup-float 7s ease-in-out infinite' }}>
        <div style={{ padding: '11px 14px', borderBottom: '1px solid rgba(47,217,244,0.07)', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.75 }} />)}
          </div>
          <div style={{ flex: 1, background: 'rgba(47,217,244,0.04)', border: '1px solid rgba(47,217,244,0.09)', borderRadius: 6, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 5, marginLeft: 6 }}>
            <span style={{ color: 'rgba(47,217,244,0.5)', display: 'flex' }}><IcoLock size={9} /></span>
            <span style={{ fontSize: 10, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.02em' }}>app.dencpass.com</span>
          </div>
        </div>
        <div style={{ padding: '0 14px', borderBottom: '1px solid rgba(47,217,244,0.07)', display: 'flex', background: 'rgba(255,255,255,0.01)' }}>
          {['Coffre', 'Générateur', 'Partage'].map((t, i) => (
            <div key={t} style={{ padding: '8px 14px', fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#2fd9f4' : 'var(--text5)', borderBottom: i === 0 ? '2px solid #2fd9f4' : '2px solid transparent' }}>{t}</div>
          ))}
        </div>
        <div style={{ padding: '10px 14px 8px' }}>
          <div style={{ background: 'rgba(47,217,244,0.03)', border: '1px solid rgba(47,217,244,0.09)', borderRadius: 8, padding: '7px 11px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--text5)', display: 'flex', opacity: 0.6 }}><IcoSearch /></span>
            <span style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'Inter', sans-serif", opacity: 0.5 }}>Rechercher dans le coffre...</span>
          </div>
        </div>
        <div>
          {entries.map((e, i) => (
            <div key={i} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 11, background: i === 0 ? 'rgba(47,217,244,0.035)' : 'transparent', borderLeft: i === 0 ? '2px solid rgba(47,217,244,0.55)' : '2px solid transparent', borderBottom: i < entries.length - 1 ? '1px solid rgba(47,217,244,0.05)' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(47,217,244,0.07)', border: '1px solid rgba(47,217,244,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(47,217,244,0.85)', fontFamily: "'Space Grotesk', sans-serif" }}>{e.initials}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-head)', marginBottom: 2, fontFamily: "'Inter', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", marginBottom: 5, opacity: 0.7 }}>{e.user}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ flex: 1, height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.05)' }}>
                    <div style={{ width: `${e.score}%`, height: '100%', borderRadius: 1, background: scoreGradient(e.score) }} />
                  </div>
                  <span style={{ fontSize: 9, color: 'rgba(47,217,244,0.7)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{e.score}</span>
                </div>
              </div>
              <button style={{ background: 'rgba(47,217,244,0.06)', border: '1px solid rgba(47,217,244,0.12)', borderRadius: 7, padding: '6px 8px', color: 'rgba(47,217,244,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <IcoCopy />
              </button>
            </div>
          ))}
        </div>
        <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(47,217,244,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.015)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2fd9f4', display: 'block', boxShadow: '0 0 6px rgba(47,217,244,0.7)' }} />
            <span style={{ fontSize: 10, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", opacity: 0.6 }}>3 entrées · chiffrées</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 52, height: 2.5, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
              <div style={{ width: '94%', height: '100%', borderRadius: 2, background: 'linear-gradient(90deg,rgba(47,217,244,0.4),#2fd9f4)' }} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#2fd9f4', fontFamily: "'JetBrains Mono', monospace" }}>94/100</span>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: -16, left: -20, background: '#080f1c', border: '1px solid rgba(47,217,244,0.2)', borderRadius: 12, padding: '9px 13px', display: 'flex', alignItems: 'center', gap: 9, boxShadow: '0 12px 40px rgba(0,0,0,0.6)', animation: 'mockup-float 7s ease-in-out infinite 1.5s' }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(47,217,244,0.08)', border: '1px solid rgba(47,217,244,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2fd9f4' }}><IcoPhone size={13} /></div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: 1 }}>2FA activé</div>
          <div style={{ fontSize: 9, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", opacity: 0.55 }}>Google Auth</div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 52, right: -20, background: '#080f1c', border: '1px solid rgba(47,217,244,0.2)', borderRadius: 10, padding: '8px 13px', boxShadow: '0 12px 40px rgba(0,0,0,0.6)', animation: 'mockup-float 7s ease-in-out infinite 3s' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#2fd9f4', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em', marginBottom: 2 }}>AES-256</div>
        <div style={{ fontSize: 9, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", opacity: 0.5 }}>chiffré · HMAC</div>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { theme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 62, background: 'var(--bg)' }}>
      <DotField
        dotRadius={1}
        dotSpacing={24}
        bulgeStrength={28}
        glowRadius={90}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={110}
        cursorForce={0.08}
        bulgeOnly
        gradientFrom={isDark ? 'rgba(47, 217, 244, 0.32)' : 'rgba(10, 155, 184, 0.40)'}
        gradientTo={isDark ? 'rgba(139, 92, 246, 0.20)' : 'rgba(124, 58, 237, 0.28)'}
        glowColor={isDark ? 'rgba(47, 217, 244, 0.10)' : 'rgba(10, 155, 184, 0.15)'}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      />
      <div className="hero-grid" style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '4rem max(1.5rem, calc((100% - 1200px) / 2))', display: 'grid', gridTemplateColumns: '55% 45%', gap: '3rem', alignItems: 'center', width: '100%' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid rgba(47,217,244,0.2)', background: 'rgba(47,217,244,0.05)', marginBottom: '2rem', animation: 'fade-up 0.6s ease both 0.05s', maxWidth: '100%', overflow: 'hidden' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2fd9f4', animation: 'glow-pulse 2s ease-in-out infinite', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#2fd9f4', letterSpacing: '0.1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>GESTIONNAIRE DE MOTS DE PASSE · SÉNÉGAL</span>
          </div>
          <HeroTypewriter />
          <p style={{ fontSize: 18, color: 'var(--text3)', fontStyle: 'italic', fontWeight: 300, marginBottom: '1.5rem', animation: 'fade-up 0.7s ease both 0.25s', fontFamily: "'Inter', sans-serif" }}>
            Garde ton secret.
          </p>
          <p style={{ fontSize: 16, color: 'var(--text2)', fontFamily: "'Inter', sans-serif", lineHeight: 1.8, maxWidth: 500, marginBottom: '2.5rem', animation: 'fade-up 0.7s ease both 0.35s', fontWeight: 400 }}>
            Le command center de vos identifiants, secrets et certificats. Chiffrement AES-256, zéro connaissance, fait pour l'Afrique.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animation: 'fade-up 0.7s ease both 0.45s' }}>
            <a href="https://app.dencpass.com/register" className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 13, background: '#2fd9f4', color: '#07111f', fontSize: 15, boxShadow: '0 4px 28px rgba(47,217,244,0.32)' }}>
              Commencer gratuitement <IcoArrow />
            </a>
          </div>
        </div>
        <div className="hero-mockup" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '1rem' }}>
          <ProductMockup />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to bottom, transparent, var(--bg))', pointerEvents: 'none' }} />
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
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.9rem 0', overflow: 'auto' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 max(1.5rem, calc((100% - 1200px) / 2))', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 'max-content' }}>
        {badges.map(({ Icon, label }, i) => (
          <Fragment key={label}>
            {i > 0 && <span style={{ width: 1, height: 13, background: 'var(--border2)', flexShrink: 0, margin: '0 1.75rem' }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--accent)', display: 'flex', flexShrink: 0 }}><Icon size={13} /></span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: 'var(--text3)', letterSpacing: '0.01em' }}>{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

// ─── Stats row ────────────────────────────────────────────────────────────────
const STATS = [
  { value: 700,   suffix: 'M+',   locales: 'fr-FR', label: 'Fuites HIBP indexées' },
  { value: 128,   suffix: ' car.', locales: 'fr-FR', label: 'Longueur max du générateur' },
  { value: null,  text: 'Zéro',   label: 'Accès serveur aux données' },
  { value: null,  text: 'AES-256-GCM', label: 'Chiffrement bout en bout' },
]

function StatsRow() {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.75rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
        {STATS.map(({ value, suffix, locales, format, text, label }, i) => (
          <Reveal key={label} delay={i * 80}>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.75rem,3vw,2.4rem)', color: 'var(--sand)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '0.35rem', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
                {text ? text : (
                  <NumberFlow
                    value={triggered ? value : 0}
                    locales={locales}
                    format={format}
                    suffix={suffix}
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, letterSpacing: '-0.04em' }}
                  />
                )}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text3)', fontFamily: "'Inter', sans-serif", lineHeight: 1.4 }}>{label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

// ─── Features teaser (4 main) ─────────────────────────────────────────────────
const MAIN_FEATURES = [
  { Icon: IcoVault,   title: 'Coffre chiffré',     desc: 'Mots de passe, identifiants et notes sécurisées avec historique des modifications.', link: '/features' },
  { Icon: IcoShare,   title: 'Partage sécurisé',   desc: 'Liens temporaires avec limite de vues, expiration et révocation à tout moment.',      link: '/features' },
  { Icon: IcoActivity,title: 'Audit de sécurité',  desc: 'Chaque action tracée. Intégration Splunk, Elastic, Wazuh via webhook ou Syslog.',     link: '/features' },
  { Icon: IcoUsers,   title: 'Équipes & groupes',  desc: 'Gestion centralisée des accès avec rôles, permissions et audit par organisation.',     link: '/business' },
]

function FeaturesTeaser() {
  return (
    <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: '3.5rem', maxWidth: 560 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>FONCTIONNALITÉS</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>
              Tout ce dont vous avez besoin.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text3)', lineHeight: 1.75 }}>
              De la gestion quotidienne à la sécurité enterprise avec SIEM et Active Directory.
            </p>
          </div>
        </Reveal>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {MAIN_FEATURES.map(({ Icon, title, desc, link }, i) => (
            <Reveal key={title} delay={(i % 2) * 90}>
              <Link to={link} className="card card-hover" style={{ display: 'block', padding: '1.75rem', borderRadius: 16, textDecoration: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(47,217,244,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1.25rem', flexShrink: 0 }}><Icon size={20} /></div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.5rem' }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65, margin: '0 0 1.25rem' }}>{desc}</p>
                <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>En savoir plus <IcoArrow size={11} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div style={{ textAlign: 'center' }}>
            <Link to="/features" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 11, border: '1px solid rgba(47,217,244,0.2)', color: 'var(--text2)', fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              Voir toutes les fonctionnalités <IcoArrow />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Comment ça marche ────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    { n: '01', title: 'Créez votre coffre', desc: 'Inscription en 2 minutes. Votre coffre chiffré est prêt instantanément, sans carte bancaire.', accent: '#2fd9f4' },
    { n: '02', title: 'Importez ou générez', desc: 'Importez depuis Chrome, Bitwarden, 1Password ou KeePass. Ou générez de nouveaux mots de passe forts directement.', accent: '#8b5cf6' },
    { n: '03', title: 'Accédez partout', desc: "Via le web sur app.dencpass.com ou l'extension Chrome pour le remplissage automatique directement dans votre navigateur.", accent: '#22c55e' },
  ]
  return (
    <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>COMMENT ÇA MARCHE</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>
              Opérationnel en 3 étapes.
            </h2>
          </div>
        </Reveal>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', position: 'relative' }}>
          {/* Connector line */}
          <div style={{ position: 'absolute', top: 40, left: 'calc(16.66% + 1rem)', right: 'calc(16.66% + 1rem)', height: 1, background: 'linear-gradient(90deg, rgba(47,217,244,0.2), rgba(139,92,246,0.2), rgba(34,197,94,0.2))', pointerEvents: 'none' }} className="steps-line" />
          {steps.map(({ n, title, desc, accent }, i) => (
            <Reveal key={n} delay={i * 120}>
              <div className="card" style={{ padding: '2rem', borderRadius: 18, position: 'relative', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `${accent}14`, border: `1px solid ${accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', position: 'relative', zIndex: 1 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color: accent }}>{n}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.6rem' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Security condensed ───────────────────────────────────────────────────────
const SECURITY_CARDS = [
  { Icon: IcoShield,    accent: '#2fd9f4', title: 'Chiffrement AES-256',        desc: 'Chaque entrée chiffrée individuellement. Rotation des clés sans interruption de service.' },
  { Icon: IcoPhone,     accent: '#8b5cf6', title: '2FA TOTP',                   desc: 'Compatible Google Authenticator et Authy. Le secret TOTP est lui-même chiffré au repos.' },
  { Icon: IcoEye,       accent: '#22c55e', title: 'Zéro connaissance serveur',  desc: 'Même en cas d\'accès physique au serveur, vos données restent illisibles sans vos clés.' },
  { Icon: IcoClipboard, accent: '#f59e0b', title: 'Audit complet',              desc: 'Chaque action tracée. Export vers Splunk, Elastic via webhook ou Syslog RFC 5424.' },
]

function SecuritySection() {
  return (
    <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>SÉCURITÉ</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Aucun compromis.</h2>
            </div>
            <Link to="/security" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(47,217,244,0.2)', color: 'var(--text3)', fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap' }}>
              Architecture de sécurité complète <IcoArrow size={12} />
            </Link>
          </div>
        </Reveal>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {SECURITY_CARDS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 100}>
              <div className="card card-hover" style={{ padding: '1.75rem', borderRadius: 16, display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.accent}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.accent, flexShrink: 0 }}><s.Icon size={20} /></div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.4rem' }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Enterprise CTA ───────────────────────────────────────────────────────────
function EnterpriseSection() {
  const items = ['Gestion multi-organisations', 'Active Directory (LDAP)', 'SIEM / Syslog RFC 5424', 'Journalisation complète des accès', 'Rôles & permissions par groupe', 'Déploiement On-Premise disponible']
  return (
    <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
          <Reveal>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid rgba(139,92,246,0.25)', background: 'rgba(139,92,246,0.07)', marginBottom: '1.5rem' }}>
                <span style={{ color: '#8b5cf6', display: 'flex' }}><IcoBuilding size={13} /></span>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#8b5cf6', letterSpacing: '0.1em' }}>ENTERPRISE</span>
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.15 }}>
                Pensé pour vos équipes.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text3)', lineHeight: 1.8, marginBottom: '2rem' }}>
                DencPass Enterprise donne à vos équipes IT une visibilité totale sur les accès, avec les outils qu'elles utilisent déjà : LDAP, SIEM, webhooks.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/business" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: '#8b5cf6', color: '#fff', fontSize: 14, boxShadow: '0 4px 24px rgba(139,92,246,0.3)' }}>
                  Découvrir Enterprise <IcoArrow />
                </Link>
                <Link to="/contact" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 12, border: '1px solid rgba(139,92,246,0.25)', color: 'var(--text3)', fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Demander un devis
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {items.map((item, i) => (
                <div key={item} style={{ padding: '1rem', borderRadius: 12, border: '1px solid rgba(139,92,246,0.12)', background: 'rgba(139,92,246,0.04)', display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <span style={{ color: '#8b5cf6', flexShrink: 0, marginTop: 1 }}><IcoCheck size={13} /></span>
                  <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "On a migré toute notre équipe IT en 20 minutes. L'intégration Syslog avec notre SIEM était opérationnelle le jour même.",
    name: 'Mamadou Diallo',
    role: 'Responsable Sécurité SI',
    company: 'FinServ Dakar',
    initial: 'MD',
    accent: '#2fd9f4',
  },
  {
    quote: "Le seul gestionnaire qui fonctionne vraiment en Afrique, paiement en FCFA, Wave Money, et l'interface reste disponible même avec une connexion instable.",
    name: 'Awa Konaré',
    role: 'Fondatrice & CTO',
    company: 'Kolibri Tech, Abidjan',
    initial: 'AK',
    accent: '#8b5cf6',
  },
  {
    quote: "Plus jamais de mots de passe partagés sur WhatsApp. Les liens à expiration ont transformé nos revues de sécurité client.",
    name: 'Ibrahima Ndiaye',
    role: 'Directeur Informatique',
    company: 'Cabinet Ndiaye & Associés',
    initial: 'IN',
    accent: '#22c55e',
  },
]

function TestimonialsSection() {
  return (
    <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>TÉMOIGNAGES</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>
              Ce qu'ils disent.
            </h2>
          </div>
        </Reveal>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
          {TESTIMONIALS.map(({ quote, name, role, company, initial, accent }, i) => (
            <Reveal key={name} delay={i * 90}>
              <div className="card card-hover" style={{ padding: '2rem', borderRadius: 18, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#f59e0b' }}><IcoStar size={13} /></span>)}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, margin: 0, flex: 1, fontStyle: 'italic' }}>
                  "{quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, paddingTop: '1.1rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: `${accent}18`, border: `1px solid ${accent}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: accent }}>{initial}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.3 }}>{name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text4)', fontFamily: "'Inter', sans-serif" }}>{role} · {company}</div>
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

// ─── Pricing teaser ───────────────────────────────────────────────────────────
function PricingTeaser() {
  const plans = [
    {
      name: 'Gratuit', tag: 'COMMUNITY', price: 0,
      desc: 'Pour démarrer sans engagement.',
      features: ['Mots de passe illimités', '150 générations / mois', '5 partages actifs', 'Extension Chrome', '2FA TOTP'],
      cta: 'Créer un compte', ctaHref: 'https://app.dencpass.com/register',
    },
    {
      name: 'Pro', tag: 'POPULAIRE', price: 2000,
      desc: 'Pour les professionnels qui ne comptent pas.',
      features: ['Tout du plan Gratuit', 'Générateur illimité', 'Partages illimités', 'Secrets illimités', 'Passphrase africaine'],
      cta: 'Passer en Pro', ctaHref: 'https://app.dencpass.com/register',
      isPopular: true,
    },
  ]
  return (
    <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>TARIFS</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>
              Simple. Transparent. En FCFA.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text3)' }}>Pas de conversion, pas de frais cachés.</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: 720, margin: '0 auto 2.5rem' }} className="grid-2">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className="price-card" style={{ padding: '2rem', borderRadius: 20, border: p.isPopular ? '1px solid var(--border3)' : '1px solid var(--border)', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden', boxShadow: p.isPopular ? '0 24px 64px rgba(47,217,244,0.08)' : 'none' }}>
                {p.isPopular && <div style={{ position: 'absolute', top: 0, right: 20, background: '#2fd9f4', color: '#07111f', fontSize: 9, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '0 0 8px 8px' }}>POPULAIRE</div>}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: p.isPopular ? 'linear-gradient(90deg,#2fd9f4,rgba(47,217,244,0.2))' : 'linear-gradient(90deg,rgba(47,217,244,0.2),transparent)', pointerEvents: 'none' }} />
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#2fd9f4', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>{p.tag}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: '0.75rem' }}>{p.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: '0.25rem' }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 32, color: 'var(--text)', letterSpacing: '-0.04em' }}>{p.price === 0 ? '0' : p.price.toLocaleString('fr-FR')}</span>
                  {p.price > 0 && <span style={{ fontSize: 12, color: 'var(--text4)' }}>FCFA / mois</span>}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: '1.25rem' }}>{p.desc}</p>
                <a href={p.ctaHref} style={{ display: 'block', textAlign: 'center', padding: '11px 0', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: '1.25rem', ...(p.isPopular ? { background: '#2fd9f4', color: '#07111f', boxShadow: '0 4px 20px rgba(47,217,244,0.28)' } : { background: 'transparent', border: '1px solid rgba(47,217,244,0.2)', color: 'var(--text3)' }) }}>
                  {p.cta}
                </a>
                <div style={{ borderTop: '1px solid rgba(47,217,244,0.1)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                      <span style={{ color: '#2fd9f4', flexShrink: 0, opacity: p.isPopular ? 1 : 0.65 }}><IcoCheck /></span>{f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div style={{ textAlign: 'center' }}>
            <Link to="/pricing" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 11, border: '1px solid rgba(47,217,244,0.2)', color: 'var(--text2)', fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
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
  { q: 'Comment mes données sont-elles chiffrées ?', a: 'Chaque mot de passe, secret et certificat est chiffré individuellement avec AES avant stockage. DencPass applique un contrôle HMAC sur chaque donnée. Même nos équipes ne peuvent pas lire vos secrets, zéro accès en clair.' },
  { q: 'Puis-je migrer depuis Bitwarden, 1Password ou KeePass ?', a: 'Oui. DencPass accepte l\'import CSV depuis Chrome, Bitwarden, LastPass, KeePass et KeePassXC directement depuis l\'interface. La migration prend moins de 2 minutes.' },
  { q: 'L\'extension Chrome est-elle incluse dans tous les plans ?', a: 'Oui, l\'extension Chrome est disponible dans tous les plans. Elle détecte automatiquement les champs de connexion et propose le remplissage en un clic.' },
  { q: 'Comment fonctionne le paiement Enterprise ?', a: 'Pour les éditions Enterprise, nous établissons un devis personnalisé selon le nombre de sièges et la durée. Paiement en FCFA, par virement ou mobile money (Wave, Orange Money).' },
  { q: 'Que se passe-t-il si j\'oublie mon mot de passe principal ?', a: 'Cliquez sur "Mot de passe oublié ?" depuis la page de connexion. Vous recevrez un lien de réinitialisation valable 1 heure.' },
]

function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>FAQ</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Questions fréquentes</h2>
          </div>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ borderRadius: 14, border: `1px solid ${open === i ? 'var(--border3)' : 'var(--border)'}`, background: open === i ? 'rgba(47,217,244,0.03)' : 'var(--bg-card)', overflow: 'hidden', transition: 'border-color 0.2s, background 0.2s' }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.15rem 1.4rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: '#2fd9f4', flexShrink: 0, transition: 'transform 0.22s', transform: open === i ? 'rotate(180deg)' : 'none', display: 'flex' }}><IcoChevron /></span>
                </button>
                {open === i && (
                  <div style={{ padding: '0 1.4rem 1.25rem' }}>
                    <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
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
    <section style={{ position: 'relative', overflow: 'hidden', padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))' }} className="section-pad">
      <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 50%, rgba(47,217,244,0.09) 0%, transparent 55%), radial-gradient(ellipse at 75% 50%, rgba(139,92,246,0.09) 0%, transparent 55%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(47,217,244,0.3), rgba(139,92,246,0.3), transparent)', zIndex: 2 }} />
      <div style={{ position: 'relative', zIndex: 3, maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Commencer maintenant</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '-0.05em', color: 'var(--sand)', margin: '0 0 1.25rem', lineHeight: 1.08 }}>
            Vos accès.<br /><span className="gradient-text">Blindés.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text3)', maxWidth: 480, margin: '0 auto 2.75rem', lineHeight: 1.7 }}>
            Créez votre coffre en moins de 2 minutes.<br />Gratuit, sans carte bancaire.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.dencpass.com/register" className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '16px 36px', borderRadius: 14, background: '#2fd9f4', color: '#07111f', fontSize: 16, boxShadow: '0 4px 32px rgba(47,217,244,0.32)' }}>
              Commencer gratuitement <IcoArrow size={17} />
            </a>
            <Link to="/contact" className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '16px 28px', borderRadius: 14, border: '1px solid rgba(47,217,244,0.25)', color: 'var(--text2)', fontSize: 16, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
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
      <SecuritySection />
      <EnterpriseSection />
      <TestimonialsSection />
      <PricingTeaser />
      <FAQSection />
      <CTABanner />
    </PublicLayout>
  )
}
