import { useEffect, useRef, useState, useCallback } from 'react'

// ── SVG Icons ──────────────────────────────────────────────────────────────────
const IconLock     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
const IconKey      = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
const IconShield   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IconZap      = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
const IconEye      = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const IconShare    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
const IconCert     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="12" cy="15" r="2"/><path d="m10.5 17.5-1 2.5 2.5-1 2.5 1-1-2.5"/></svg>
const IconUsers    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const IconGlobe    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
const IconCheck    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
const IconArrow    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

// ── Cipher Grid Background ─────────────────────────────────────────────────────
function CipherGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const chars = '0123456789ABCDEF'
    const cols = 40
    const rows = 20
    const cells = Array.from({ length: cols * rows }, () => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      opacity: Math.random(),
      speed: 0.002 + Math.random() * 0.004,
      phase: Math.random() * Math.PI * 2,
    }))

    let raf
    let t = 0
    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
      ctx.clearRect(0, 0, w, h)
      ctx.font = `${Math.floor(w / cols)}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      const cw = w / cols
      const ch = h / rows

      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      const maxOp   = isLight ? 0.18 : 0.07
      const color   = isLight ? '9,100,130' : '47,217,244'

      cells.forEach((cell, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const op = (Math.sin(t * cell.speed * 100 + cell.phase) + 1) / 2 * maxOp
        ctx.fillStyle = `rgba(${color},${op})`
        ctx.fillText(cell.char, col * cw + cw / 2, row * ch + ch * 0.75)
        if (Math.random() < 0.001) cell.char = chars[Math.floor(Math.random() * chars.length)]
      })
      t++
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

// ── Features data ──────────────────────────────────────────────────────────────
const FEATURES = [
  { Icon: IconKey,   title: 'Gestionnaire de mots de passe', desc: 'Centralisez tous vos accès dans un coffre chiffré. Organisez, recherchez, accédez instantanément.' },
  { Icon: IconLock,  title: 'Coffre des secrets', desc: 'Tokens API, clés SSH, variables d\'environnement. Chaque secret est chiffré avant d\'être stocké.' },
  { Icon: IconShield,title: 'Double authentification', desc: 'TOTP intégré. Chaque compte protégé par une deuxième couche infranchissable.' },
  { Icon: IconZap,   title: 'Générateur cryptographique', desc: 'Entropie maximale, longueur configurable, règles de complexité personnalisables.' },
  { Icon: IconEye,   title: 'Audit de sécurité', desc: 'Détection des mots de passe faibles, réutilisés ou compromis. Score de sécurité en temps réel.' },
  { Icon: IconShare, title: 'Partage sécurisé', desc: 'Transmettez des accès à vos équipes avec contrôle de durée, nombre de vues et révocation.' },
  { Icon: IconCert,  title: 'Certificats SSL/TLS', desc: 'Stockage et suivi de vos certificats. Alertes automatiques avant expiration.' },
  { Icon: IconGlobe, title: 'Extension navigateur', desc: 'Remplissage automatique dans Chrome. Vos mots de passe là où vous en avez besoin.' },
  { Icon: IconUsers, title: 'Gestion des équipes', desc: 'Groupes, rôles et permissions granulaires. Visibilité complète sur les accès de chaque membre.' },
]

// ── Main Component ─────────────────────────────────────────────────────────────
function useTheme() {
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('denc-theme')
    return saved || 'system'
  })

  const applyTheme = useCallback((t) => {
    const resolved = t === 'system' ? getSystemTheme() : t
    document.documentElement.setAttribute('data-theme', resolved)
  }, [])

  useEffect(() => {
    applyTheme(theme)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => { if (theme === 'system') applyTheme('system') }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme, applyTheme])

  const setTheme = (t) => {
    setThemeState(t)
    localStorage.setItem('denc-theme', t)
  }

  return { theme, setTheme }
}

const LEGAL = {
  cgu: {
    title: "Conditions d'utilisation",
    content: [
      { h: "1. Objet", p: "Les présentes conditions régissent l'utilisation de Denc, gestionnaire de mots de passe et de secrets numériques, accessible sur app.dencu.online. En créant un compte, vous acceptez ces conditions dans leur intégralité." },
      { h: "2. Accès au service", p: "Denc est accessible aux particuliers (édition Community / Pro) et aux organisations (édition Enterprise Cloud). L'accès Enterprise Cloud est conditionné à la possession d'une licence valide délivrée par Denc." },
      { h: "3. Responsabilités de l'utilisateur", p: "Vous êtes responsable de la confidentialité de vos identifiants, de l'exactitude des données saisies, et de la sécurité de votre appareil. Denc ne peut être tenu responsable d'une compromission liée à la négligence de l'utilisateur." },
      { h: "4. Données chiffrées", p: "Vos mots de passe, secrets et certificats sont chiffrés avant d'être stockés. Denc ne dispose d'aucun accès en clair à vos données sensibles." },
      { h: "5. Résiliation", p: "Vous pouvez supprimer votre compte à tout moment depuis les Paramètres → Zone de danger. Pour les organisations, la résiliation intervient à l'expiration de la licence, après la période de grâce de 7 jours." },
      { h: "6. Modifications", p: "Denc se réserve le droit de modifier ces conditions. Les utilisateurs seront notifiés par email au moins 15 jours avant toute modification substantielle." },
      { h: "7. Contact", p: "Pour toute question : mouhamadoumoustapha.dione@dencu.online" },
    ]
  },
  privacy: {
    title: "Politique de confidentialité",
    content: [
      { h: "1. Données collectées", p: "Denc collecte : adresse email, nom d'utilisateur, métadonnées de connexion (date, IP), et les données chiffrées que vous stockez (mots de passe, secrets, certificats). Aucune donnée sensible n'est lisible par nos équipes." },
      { h: "2. Finalité du traitement", p: "Vos données sont utilisées exclusivement pour fournir le service Denc : authentification, stockage sécurisé, notifications d'expiration de certificats et de licences." },
      { h: "3. Durée de conservation", p: "Les données sont supprimées immédiatement à la fermeture du compte. Les logs de sécurité (fichiers d'audit) sont conservés jusqu'à rotation manuelle par l'administrateur." },
      { h: "4. Partage des données", p: "Denc ne vend, ne loue et ne partage aucune donnée personnelle avec des tiers à des fins commerciales." },
      { h: "5. Vos droits", p: "Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits : mouhamadoumoustapha.dione@dencu.online" },
      { h: "6. Sécurité", p: "Nous mettons en œuvre des mesures techniques adaptées : chiffrement multi-clés, authentification 2FA, journalisation des accès, et contrôle d'accès strict aux serveurs." },
      { h: "7. Contact DPO", p: "mouhamadoumoustapha.dione@dencu.online · +221 XX XXX XX XX" },
    ]
  }
}

function LegalModal({ type, onClose }) {
  const doc = LEGAL[type]
  if (!doc) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', borderRadius: 20, maxWidth: 640, width: '100%', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{doc.title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: '4px 8px' }}>✕</button>
        </div>
        <div style={{ padding: '1.5rem 2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {doc.content.map(s => (
            <div key={s.h}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: '0.4rem', fontFamily: "'Space Grotesk', sans-serif" }}>{s.h}</p>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{s.p}</p>
            </div>
          ))}
          <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: '0.5rem', fontFamily: "'JetBrains Mono', monospace" }}>Dernière mise à jour : juin 2026</p>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [legalModal, setLegalModal] = useState(null)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 4rem', height: 64,
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0,
        background: 'rgba(3,13,18,0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border2)', background: 'rgba(47,217,244,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/denc-logo.png" alt="Denc" style={{ height: 26, width: 26, objectFit: 'contain' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.04em' }}>
            De<span style={{ color: 'var(--accent)' }}>nc</span>
          </span>
        </div>

        <div className="nav-links" style={{ display: 'flex', gap: '2.5rem', fontSize: 13, fontWeight: 500, color: 'var(--text2)' }}>
          {[['#fonctionnalites','Fonctionnalités'],['#editions','Éditions'],['#tarifs','Tarifs'],['#contact','Contact']].map(([href, label]) => (
            <a key={href} href={href} className="nav-link" style={{ color: 'var(--text2)' }}>{label}</a>
          ))}
        </div>

        <a href="https://app.dencu.online" className="btn-primary" style={{
          padding: '9px 20px', borderRadius: 8,
          background: 'var(--accent)', color: '#001a20',
          fontWeight: 700, fontSize: 13,
          letterSpacing: '-0.01em',
        }}>
          Se connecter
        </a>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '92vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 2rem',
      }}>
        {/* Cipher grid background */}
        <CipherGrid />

        {/* Radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(47,217,244,0.06) 0%, transparent 70%)',
        }} />

        {/* Horizontal scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(47,217,244,0.15), transparent)',
          animation: 'scan-line 8s linear infinite',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '5px 14px', borderRadius: 4,
            border: '1px solid var(--border2)',
            background: 'rgba(47,217,244,0.04)',
            fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--accent)', letterSpacing: '0.08em',
            marginBottom: '2.5rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', boxShadow: '0 0 8px var(--accent)' }} />
            GESTIONNAIRE DE SECRETS · PARTICULIERS ET ENTREPRISES
          </div>

          {/* Headline */}
          <h1 className="hero-h1" style={{
            fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginBottom: '1.75rem',
          }}>
            <span className="hero-word" style={{ display: 'block' }}>Vos données.</span>
            <span className="hero-word" style={{ display: 'block', color: 'var(--accent)', textShadow: '0 0 40px rgba(47,217,244,0.3)' }}>
              Votre contrôle.
            </span>
            <span className="hero-word" style={{ display: 'block' }}>Sans compromis.</span>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: 17, color: 'var(--text2)', lineHeight: 1.75,
            maxWidth: 520, margin: '0 auto 3rem',
            fontFamily: "'Inter', sans-serif", fontWeight: 400,
          }}>
            Denc chiffre vos mots de passe, secrets et certificats avant de les stocker.
            Conçu pour les particuliers et les entreprises d'Afrique de l'Ouest.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.dencu.online/register" className="btn-primary" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 10,
              background: 'linear-gradient(135deg, var(--accent) 0%, #1ab8d4 100%)',
              color: '#001a20', fontWeight: 700, fontSize: 15,
              letterSpacing: '-0.02em',
            }}>
              Commencer gratuitement <IconArrow />
            </a>
            <a href="#fonctionnalites" className="btn-ghost" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 10,
              border: '1px solid var(--border2)',
              color: 'var(--text2)', fontWeight: 600, fontSize: 15,
            }}>
              Voir les fonctionnalités
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, transparent, var(--bg))',
          pointerEvents: 'none',
        }} />
      </section>

      {/* ── Trust bar ── */}
      <section style={{
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        padding: '2rem 4rem',
        display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap',
        background: 'var(--bg2)',
      }}>
        {[
          { value: 'Chiffrement',  label: 'Vos données chiffrées avant stockage' },
          { value: 'Zero tiers',   label: 'Vos données ne sont jamais vendues' },
          { value: 'Multi-scope',  label: 'Clés distinctes par type de données' },
          { value: 'Audit complet',label: 'Journaux d\'accès consultables' },
        ].map(t => (
          <div key={t.value} style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: 'var(--accent)', fontWeight: 500, marginBottom: 4 }}>
              {t.value}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text3)', fontFamily: "'Inter', sans-serif" }}>{t.label}</p>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section id="fonctionnalites" className="section-pad" style={{ padding: '7rem 4rem', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '1rem' }}>FONCTIONNALITÉS</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Tout ce qu'il faut.<br />Rien de superflu.
            </h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text2)', maxWidth: 320, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            Des outils pensés pour sécuriser vos accès au quotidien, sans complexité inutile.
          </p>
        </div>

        {/* Bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'auto', gap: '1rem' }}>

          {/* Grande carte — Gestionnaire MDP */}
          <div className="feature-card" style={{
            gridColumn: 'span 3', padding: '2.5rem',
            borderRadius: 16, border: '1px solid var(--border)',
            background: 'linear-gradient(145deg, rgba(47,217,244,0.06) 0%, var(--bg2) 60%)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,217,244,0.08), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ width: 48, height: 48, borderRadius: 12, border: '1px solid rgba(47,217,244,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1.5rem', background: 'rgba(47,217,244,0.08)' }}>
              <IconKey />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Gestionnaire de mots de passe</h3>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, fontFamily: "'Inter', sans-serif", maxWidth: 360 }}>
              Centralisez tous vos accès dans un coffre sécurisé. Organisez par catégories, recherchez instantanément, accédez depuis n'importe quel appareil.
            </p>
          </div>

          {/* Grande carte — Coffre secrets */}
          <div className="feature-card" style={{
            gridColumn: 'span 3', padding: '2.5rem',
            borderRadius: 16, border: '1px solid var(--border)',
            background: 'linear-gradient(145deg, rgba(139,92,246,0.06) 0%, var(--bg2) 60%)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ width: 48, height: 48, borderRadius: 12, border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)', marginBottom: '1.5rem', background: 'rgba(139,92,246,0.08)' }}>
              <IconLock />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Coffre des secrets</h3>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, fontFamily: "'Inter', sans-serif", maxWidth: 360 }}>
              Tokens API, clés SSH, variables d'environnement. Chaque secret est chiffré individuellement et accessible uniquement à vous.
            </p>
          </div>

          {/* Petites cartes — ligne 2 */}
          {[
            { Icon: IconShield, title: 'Double authentification', desc: 'TOTP intégré sur chaque compte.', color: '#22c55e', bg: 'rgba(34,197,94,0.06)', border: 'rgba(34,197,94,0.2)' },
            { Icon: IconZap,    title: 'Générateur',              desc: 'Entropie maximale, règles configurables.', color: 'var(--accent)', bg: 'rgba(47,217,244,0.05)', border: 'rgba(47,217,244,0.15)' },
            { Icon: IconEye,    title: 'Audit de sécurité',       desc: 'Mots de passe faibles ou réutilisés.', color: '#f97316', bg: 'rgba(249,115,22,0.05)', border: 'rgba(249,115,22,0.2)' },
            { Icon: IconShare,  title: 'Partage sécurisé',        desc: 'Contrôle de durée et révocation.', color: '#a855f7', bg: 'rgba(168,85,247,0.05)', border: 'rgba(168,85,247,0.2)' },
            { Icon: IconCert,   title: 'Certificats SSL/TLS',     desc: 'Suivi et alertes avant expiration.', color: 'var(--accent)', bg: 'rgba(47,217,244,0.05)', border: 'rgba(47,217,244,0.15)' },
            { Icon: IconGlobe,  title: 'Extension navigateur',    desc: 'Remplissage automatique dans Chrome.', color: '#22c55e', bg: 'rgba(34,197,94,0.05)', border: 'rgba(34,197,94,0.15)' },
            { Icon: IconUsers,  title: 'Gestion des équipes',     desc: 'Groupes, rôles et permissions.', color: 'var(--purple)', bg: 'rgba(139,92,246,0.05)', border: 'rgba(139,92,246,0.2)' },
          ].map(({ Icon, title, desc, color, bg, border }) => (
            <div key={title} className="feature-card" style={{
              gridColumn: 'span 2', padding: '1.75rem',
              borderRadius: 14, border: `1px solid ${border}`,
              background: bg,
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: '1.25rem', background: `${color}10` }}>
                <Icon />
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ── Editions ── */}
      <section id="editions" className="section-pad" style={{ padding: '7rem 4rem', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              ÉDITIONS
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Une solution pour chaque besoin
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {/* Community */}
            <div className="edition-card" style={{
              padding: '2.5rem',
              borderRadius: 16,
              border: '1px solid rgba(47,217,244,0.2)',
              background: 'linear-gradient(145deg, rgba(47,217,244,0.04) 0%, transparent 60%)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(47,217,244,0.1)', border: '1px solid rgba(47,217,244,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}><IconLock /></div>
                <div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.1em' }}>COMMUNITY</p>
                  <p style={{ fontSize: 12, color: 'var(--text2)', fontFamily: "'Inter', sans-serif" }}>Pour les particuliers</p>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text2)', fontFamily: "'Inter', sans-serif", lineHeight: 1.7, marginBottom: '2rem' }}>
                Gérez vos mots de passe personnels, secrets et certificats. Gratuit avec des limites raisonnables, ou illimité en mode Pro.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Mots de passe illimités', 'Générateur cryptographique (150/mois)', 'Coffre des secrets (5 entrées)', 'Certificats SSL/TLS (5 max)', 'Extension navigateur Chrome', 'Mode Pro à 2 000 FCFA/mois'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontFamily: "'Inter', sans-serif", color: 'var(--text2)' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}><IconCheck /></span>{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise Cloud — maintenant colonne du milieu */}
            <div className="edition-card" style={{
              padding: '2.5rem',
              borderRadius: 16,
              border: '1px solid rgba(139,92,246,0.3)',
              background: 'linear-gradient(145deg, rgba(139,92,246,0.06) 0%, transparent 60%)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--purple), transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)' }}><IconUsers /></div>
                <div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--purple)', letterSpacing: '0.1em' }}>ENTERPRISE CLOUD</p>
                  <p style={{ fontSize: 12, color: 'var(--text2)', fontFamily: "'Inter', sans-serif" }}>Pour les organisations</p>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text2)', fontFamily: "'Inter', sans-serif", lineHeight: 1.7, marginBottom: '2rem' }}>
                Gestion centralisée des accès pour vos équipes. Licences managées par Denc avec support dédié et suivi des membres de votre organisation.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Tout de l\'édition Community', 'Gestion des équipes et groupes', 'Audit d\'activité de l\'organisation', 'Licence mensuelle managée par Denc', 'Période de grâce en cas d\'expiration', 'Support dédié'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontFamily: "'Inter', sans-serif", color: 'var(--text2)' }}>
                    <span style={{ color: 'var(--purple)', flexShrink: 0 }}><IconCheck /></span>{f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Enterprise On-Premise */}
            <div className="edition-card" style={{
              padding: '2.5rem',
              borderRadius: 16,
              border: '1px solid rgba(251,191,36,0.25)',
              background: 'linear-gradient(145deg, rgba(251,191,36,0.04) 0%, transparent 60%)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #f59e0b, transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}><IconShield /></div>
                <div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#f59e0b', letterSpacing: '0.1em' }}>ENTERPRISE ON-PREMISE</p>
                  <p style={{ fontSize: 12, color: 'var(--text2)', fontFamily: "'Inter', sans-serif" }}>Déployé chez vous</p>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text2)', fontFamily: "'Inter', sans-serif", lineHeight: 1.7, marginBottom: '2rem' }}>
                Installez Denc sur votre propre infrastructure. Vos données restent sur vos serveurs, sous votre contrôle total. Idéal pour les entreprises avec des exigences de conformité strictes.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {["Tout de l'édition Enterprise Cloud", 'Données 100% sur site (on-premise)', 'Intégration Active Directory (LDAP)', 'Déploiement Docker ou bare metal', 'Licence annuelle sur devis', 'Support et maintenance inclus'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontFamily: "'Inter', sans-serif", color: 'var(--text2)' }}>
                    <span style={{ color: '#f59e0b', flexShrink: 0 }}><IconCheck /></span>{f}
                  </li>
                ))}
              </ul>
              <a href="mailto:mouhamadoumoustapha.dione@dencu.online"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: '2rem', fontSize: 13, fontWeight: 600, color: '#f59e0b', fontFamily: "'Space Grotesk', sans-serif" }}>
                Nous contacter <IconArrow />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── Tarifs ── */}
      <section id="tarifs" className="section-pad" style={{ padding: '7rem 4rem', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '1rem' }}>TARIFS</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>Simple. Transparent. Sans surprise.</h2>
        </div>

        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: 760 }}>
          {[
            {
              plan: 'Gratuit', price: '0', unit: 'FCFA/mois', color: 'var(--text2)', accentColor: 'var(--accent)',
              features: ['Mots de passe illimités', '150 générations / mois', '5 partages actifs', '5 secrets max', '5 certificats max'],
            },
            {
              plan: 'Pro', price: '2 000', unit: 'FCFA/mois', color: 'var(--purple)', accentColor: 'var(--purple)', badge: 'POPULAIRE',
              features: ['Tout du plan Gratuit', 'Générateur illimité', 'Partages illimités', 'Secrets illimités', 'Certificats illimités'],
            },
          ].map(p => (
            <div key={p.plan} style={{
              padding: '2rem', borderRadius: 16,
              border: `1px solid ${p.color}40`,
              background: 'var(--bg2)',
              position: 'relative',
            }}>
              {p.badge && (
                <div style={{
                  position: 'absolute', top: -11, right: 20,
                  background: 'var(--purple)', color: '#fff',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  padding: '3px 10px', borderRadius: 4,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{p.badge}</div>
              )}
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: p.accentColor, letterSpacing: '0.1em', marginBottom: '1rem' }}>{p.plan.toUpperCase()}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: '1.5rem' }}>
                <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em' }}>{p.price}</span>
                <span style={{ fontSize: 13, color: 'var(--text2)', fontFamily: "'Inter', sans-serif" }}>{p.unit}</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontFamily: "'Inter', sans-serif", color: 'var(--text2)' }}>
                    <span style={{ color: p.accentColor, flexShrink: 0 }}><IconCheck /></span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '2.5rem', fontSize: 13, color: 'var(--text3)', fontFamily: "'Inter', sans-serif" }}>
          Licence Enterprise Cloud ?{' '}
          <a href="mailto:mouhamadoumoustapha.dione@dencu.online" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            Contactez-nous pour un devis
          </a>
        </p>
      </section>

      {/* ── CTA final ── */}
      <section id="contact" style={{
        padding: '7rem 4rem',
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>CONTACT</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Prêt à sécuriser vos accès ?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', fontFamily: "'Inter', sans-serif", lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Créez votre compte en 30 secondes ou contactez-nous pour une licence Enterprise adaptée à votre organisation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.dencu.online/register" className="btn-primary" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 10,
              background: 'linear-gradient(135deg, var(--accent) 0%, #1ab8d4 100%)',
              color: '#001a20', fontWeight: 700, fontSize: 15,
            }}>
              Créer un compte <IconArrow />
            </a>
            <a href="mailto:mouhamadoumoustapha.dione@dencu.online" className="btn-ghost" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 10,
              border: '1px solid var(--border2)',
              color: 'var(--text2)', fontWeight: 600, fontSize: 15,
            }}>
              Nous écrire
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', fontFamily: "'Inter', sans-serif" }}>

        {/* Colonnes */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 4rem 3rem', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', flexWrap: 'wrap' }}>

          {/* Colonne marque */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border2)', background: 'rgba(47,217,244,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src="/denc-logo.png" alt="Denc" style={{ height: 32, width: 32, objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em' }}>
                De<span style={{ color: 'var(--accent)' }}>nc</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 280 }}>
              Gestionnaire de mots de passe sécurisé pour les équipes et les professionnels. Vos accès, sous votre contrôle.
            </p>
            <a href="mailto:mouhamadoumoustapha.dione@dencu.online"
              style={{ fontSize: 12, color: 'var(--text3)', transition: 'color .2s', width: 'fit-content' }}
              onMouseEnter={e=>e.target.style.color='var(--accent)'}
              onMouseLeave={e=>e.target.style.color='var(--text3)'}>
              mouhamadoumoustapha.dione@dencu.online
            </a>
            <a href="tel:+221XXXXXXXXX"
              style={{ fontSize: 12, color: 'var(--text3)', transition: 'color .2s', width: 'fit-content' }}
              onMouseEnter={e=>e.target.style.color='var(--accent)'}
              onMouseLeave={e=>e.target.style.color='var(--text3)'}>
              +221 XX XXX XX XX
            </a>
          </div>

          {/* Colonne Produit */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '1rem', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>Produit</p>
            {[
              { label: 'Fonctionnalités', href: '#fonctionnalites' },
              { label: 'Tarifs',          href: '#tarifs' },
              { label: 'Se connecter',    href: 'https://app.dencu.online' },
            ].map(l => (
              <a key={l.label} href={l.href}
                style={{ display: 'block', fontSize: 13, color: 'var(--text2)', marginBottom: '0.65rem', transition: 'color .2s' }}
                onMouseEnter={e=>e.target.style.color='var(--accent)'}
                onMouseLeave={e=>e.target.style.color='var(--text2)'}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Colonne Éditions */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '1rem', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>Éditions</p>
            {[
              { label: 'Community',          href: '#editions' },
              { label: 'Enterprise Cloud',   href: '#editions' },
              { label: 'Enterprise On-Prem', href: '#editions' },
              { label: 'Comparer',           href: '#editions' },
            ].map(l => (
              <a key={l.label} href={l.href}
                style={{ display: 'block', fontSize: 13, color: 'var(--text2)', marginBottom: '0.65rem', transition: 'color .2s' }}
                onMouseEnter={e=>e.target.style.color='var(--accent)'}
                onMouseLeave={e=>e.target.style.color='var(--text2)'}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Colonne Légal */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text3)', marginBottom: '1rem', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>Légal</p>
            {[
              { label: "Conditions d'utilisation", modal: 'cgu' },
              { label: 'Politique de confidentialité', modal: 'privacy' },
              { label: 'Contact', href: 'mailto:mouhamadoumoustapha.dione@dencu.online' },
            ].map(l => (
              l.modal
                ? <button key={l.label} onClick={() => setLegalModal(l.modal)}
                    style={{ display: 'block', fontSize: 13, color: 'var(--text2)', marginBottom: '0.65rem', transition: 'color .2s', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'Inter', sans-serif", textAlign: 'left' }}
                    onMouseEnter={e=>e.target.style.color='var(--accent)'}
                    onMouseLeave={e=>e.target.style.color='var(--text2)'}>
                    {l.label}
                  </button>
                : <a key={l.label} href={l.href}
                    style={{ display: 'block', fontSize: 13, color: 'var(--text2)', marginBottom: '0.65rem', transition: 'color .2s' }}
                    onMouseEnter={e=>e.target.style.color='var(--accent)'}
                    onMouseLeave={e=>e.target.style.color='var(--text2)'}>
                    {l.label}
                  </a>
            ))}
          </div>
        </div>

        {/* Barre bas */}
        <div style={{ borderTop: '1px solid var(--border)', maxWidth: 1200, margin: '0 auto', padding: '1.25rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: 12, color: 'var(--text3)' }}>© 2026 Denc · Tous droits réservés</span>

          {/* Sélecteur de thème */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--bg3)', borderRadius: 10, padding: '3px', border: '1px solid var(--border)' }}>
            {[
              { key: 'light',  label: 'Clair',   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg> },
              { key: 'dark',   label: 'Sombre',  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> },
              { key: 'system', label: 'Système', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
            ].map(t => (
              <button key={t.key} onClick={() => setTheme(t.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '5px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12,
                  fontFamily: "'Inter', sans-serif",
                  background: theme === t.key ? 'var(--bg)' : 'transparent',
                  color: theme === t.key ? 'var(--accent)' : 'var(--text3)',
                  fontWeight: theme === t.key ? 600 : 400,
                  transition: 'all .15s',
                  boxShadow: theme === t.key ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}

    </div>
  )
}
