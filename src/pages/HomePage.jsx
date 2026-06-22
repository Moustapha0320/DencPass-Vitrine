import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Legal content ─────────────────────────────────────────────────────────────
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

// ─── Legal Modal ───────────────────────────────────────────────────────────────
function LegalModal({ type, onClose }) {
  const doc = LEGAL[type]
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])
  if (!doc) return null
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
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

// ─── useTheme ──────────────────────────────────────────────────────────────────
function resolveTheme(t) {
  return t === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : t
}

function useTheme() {
  const [theme, setThemeState] = useState(() => localStorage.getItem('denc-theme') || 'dark')

  const applyTheme = useCallback(t => {
    document.documentElement.setAttribute('data-theme', resolveTheme(t))
  }, [])

  const setTheme = useCallback(t => {
    setThemeState(t)
    localStorage.setItem('denc-theme', t)
    applyTheme(t)
  }, [applyTheme])

  // Apply on mount
  useEffect(() => { applyTheme(theme) }, [])

  // When system mode is active, track OS preference changes live
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme, applyTheme])

  return { theme, setTheme }
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
const Ico = ({ d, size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
const IcoCheck   = ({ size=15 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
const IcoArrow   = ({ size=15 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const IcoChevron = ({ size=16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
const IcoSun     = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
const IcoMoon    = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
const IcoMonitor = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>

// Feature & security icons
const IcoVault    = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="3"/><path d="M12 9V7M12 17v-2M9 12H7M17 12h-2"/></svg>
const IcoZap      = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
const IcoShare    = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
const IcoKey      = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="15" r="5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/></svg>
const IcoGlobe    = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
const IcoCert     = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
const IcoUsers    = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const IcoActivity = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
const IcoServer   = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
const IcoShield   = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IcoPhone    = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
const IcoEye      = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const IcoClipboard= ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
const IcoLock     = ({ size=20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
const IcoSearch   = ({ size=14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IcoCopy     = ({ size=11 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>

const FEATURES = [
  { Icon: IcoVault,    title: 'Coffre chiffré',       desc: 'Mots de passe, identifiants et notes sécurisées avec historique des modifications.', color: '#2fd9f4' },
  { Icon: IcoZap,      title: 'Générateur',            desc: 'Mots de passe aléatoires et passphrases avec mots à sonorités africaines.', color: '#8b5cf6' },
  { Icon: IcoShare,    title: 'Partage sécurisé',      desc: 'Liens temporaires avec limite de vues, expiration et révocation à tout moment.', color: '#2fd9f4' },
  { Icon: IcoKey,      title: 'Coffre des secrets',    desc: 'Clés API, tokens SSH, credentials de bases de données — avec journal d\'accès complet.', color: '#f59e0b' },
  { Icon: IcoGlobe,    title: 'Extension Chrome',      desc: 'Remplissage automatique et détection proactive sur tous les sites de connexion.', color: '#22c55e' },
  { Icon: IcoCert,     title: 'Certificats SSL/TLS',   desc: 'Suivi d\'expiration avec alertes automatiques avant renouvellement.', color: '#8b5cf6' },
  { Icon: IcoUsers,    title: 'Équipes & groupes',     desc: 'Partagez des entrées avec des équipes, gérez les rôles et permissions par groupe.', color: '#2fd9f4' },
  { Icon: IcoActivity, title: 'Audit & SIEM',          desc: 'Chaque action tracée. Intégration Splunk, Elastic, Wazuh via webhook ou Syslog.', color: '#f59e0b' },
  { Icon: IcoServer,   title: 'Active Directory',      desc: 'Authentification LDAP native et synchronisation des utilisateurs depuis votre AD.', color: '#8b5cf6' },
]

const SECURITY = [
  { Icon: IcoShield,    title: 'Chiffrement Fernet AES',      desc: 'Chaque entrée est chiffrée individuellement avant stockage. Rotation des clés depuis l\'interface admin sans interruption de service.' },
  { Icon: IcoPhone,     title: 'Authentification 2FA TOTP',   desc: 'Double authentification compatible Google Authenticator et Authy. Le secret TOTP est lui-même chiffré au repos.' },
  { Icon: IcoEye,       title: 'Zéro connaissance serveur',   desc: 'Même en cas d\'accès physique au serveur, vos données restent illisibles sans vos clés de chiffrement personnelles.' },
  { Icon: IcoClipboard, title: 'Audit complet',               desc: 'Chaque action tracée dans des logs structurés. Export vers votre SIEM via webhook (Splunk, Elastic) ou Syslog RFC 5424.' },
]

const FAQS = [
  { q: 'Comment mes données sont-elles chiffrées ?', a: 'Chaque mot de passe, secret et certificat est chiffré individuellement avec AES avant d\'être stocké. DencPass applique également un contrôle d\'intégrité HMAC sur chaque donnée. Même nos équipes ne peuvent pas lire tes secrets — zéro accès en clair.' },
  { q: 'Puis-je migrer depuis Bitwarden, 1Password ou KeePass ?', a: 'Oui. DencPass accepte l\'import CSV depuis Chrome, Bitwarden, LastPass, KeePass et KeePassXC directement depuis l\'interface. La migration prend moins de 2 minutes.' },
  { q: 'L\'extension Chrome est-elle incluse dans tous les plans ?', a: 'Oui, l\'extension Chrome est disponible dans tous les plans (Gratuit, Pro, Enterprise). Elle détecte automatiquement les champs de connexion et propose le remplissage en un clic.' },
  { q: 'Quelle différence entre SaaS et On-Premise ?', a: 'Enterprise SaaS est hébergé et maintenu par DencPass — rien à gérer de votre côté. Enterprise On-Premise s\'installe sur votre infrastructure (Docker ou bare metal) : vos données ne quittent jamais vos serveurs.' },
  { q: 'Comment fonctionne le paiement Enterprise ?', a: 'Pour les éditions Enterprise, nous établissons un devis personnalisé selon le nombre de sièges et la durée. Paiement en FCFA, par virement ou mobile money (Wave, Orange Money).' },
  { q: 'Que se passe-t-il si j\'oublie mon mot de passe principal ?', a: 'Cliquez sur "Mot de passe oublié ?" depuis la page de connexion. Vous recevrez un lien de réinitialisation valable 1 heure. Un administrateur peut également effectuer le reset depuis le panneau d\'administration.' },
]

// ─── Net background ────────────────────────────────────────────────────────────
function CipherGrid() {
  const ref       = useRef(null)
  const lightRef  = useRef(false)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const check = () => { lightRef.current = document.documentElement.getAttribute('data-theme') === 'light' }
    check()
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')

    const N          = 70
    const LINK_DIST  = 160
    const MOUSE_DIST = 220
    const SPEED      = 0.38
    const INTERVAL   = 1000 / 60

    let pts = [], running = true, last = 0

    const mkPt = () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      r:  1.2 + Math.random() * 1.4,
    })

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      pts = Array.from({ length: N }, mkPt)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMouse = e => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const offMouse = () => { mouseRef.current = { x: -9999, y: -9999 } }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('mouseleave', offMouse)

    const LINK2  = LINK_DIST  * LINK_DIST
    const MOUSE2 = MOUSE_DIST * MOUSE_DIST

    const tick = (ts) => {
      if (!running) return
      if (ts - last < INTERVAL) { requestAnimationFrame(tick); return }
      last = ts

      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      const light     = lightRef.current
      const [r, g, b] = light ? [8, 136, 163] : [47, 217, 244]
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Move + wrap
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x += W; if (p.x > W) p.x -= W
        if (p.y < 0) p.y += H; if (p.y > H) p.y -= H
      }

      // Particle → particle lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK2) {
            const d = Math.sqrt(d2)
            const a = (1 - d / LINK_DIST) * (light ? 0.3 : 0.22)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`
            ctx.lineWidth = 0.8
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }

        // Particle → mouse lines
        const mdx = pts[i].x - mx
        const mdy = pts[i].y - my
        const md2 = mdx * mdx + mdy * mdy
        if (md2 < MOUSE2) {
          const md = Math.sqrt(md2)
          const a  = (1 - md / MOUSE_DIST) * (light ? 0.55 : 0.5)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`
          ctx.lineWidth = 1
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }

      // Dots
      const dotA = light ? 0.55 : 0.65
      ctx.fillStyle = `rgba(${r},${g},${b},${dotA})`
      for (let i = 0; i < pts.length; i++) {
        ctx.beginPath()
        ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    return () => {
      running = false
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('mouseleave', offMouse)
    }
  }, [])

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

// ─── Entry icon for mockup ─────────────────────────────────────────────────────
function EntryInitial({ label, color }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: 9, background: `${color}14`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
    </div>
  )
}

// ─── Product Mockup ────────────────────────────────────────────────────────────
function ProductMockup() {
  const entries = [
    { initials: 'BQ', initColor: '#2fd9f4', name: 'Banque en ligne',  user: 'john.doe@gmail.com',  score: 98,  scoreColor: '#2fd9f4' },
    { initials: 'RH', initColor: '#8b5cf6', name: 'Portail RH',       user: 'pathe.diallo',         score: 84,  scoreColor: '#8b5cf6' },
    { initials: 'AW', initColor: '#22c55e', name: 'AWS Production',   user: 'toto@acmecorp.io',     score: 100, scoreColor: '#22c55e' },
  ]
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
      <div style={{ position: 'absolute', inset: '-30px', background: 'radial-gradient(ellipse at 50% 50%, rgba(47,217,244,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', background: 'var(--bg2)', border: '1px solid rgba(47,217,244,0.18)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(47,217,244,0.06)', animation: 'mockup-float 7s ease-in-out infinite' }}>

        {/* Window chrome */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(47,217,244,0.09)', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-overlay)' }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.8 }} />)}
          </div>
          <div style={{ flex: 1, background: 'rgba(47,217,244,0.05)', border: '1px solid rgba(47,217,244,0.1)', borderRadius: 6, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 5, marginLeft: 8 }}>
            <span style={{ color: '#22c55e', display: 'flex' }}><IcoLock size={9} /></span>
            <span style={{ fontSize: 10, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace" }}>app.dencu.online</span>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(47,217,244,0.06)' }}>
          <div style={{ background: 'rgba(47,217,244,0.04)', border: '1px solid rgba(47,217,244,0.1)', borderRadius: 8, padding: '7px 11px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--text5)', display: 'flex' }}><IcoSearch /></span>
            <span style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'Inter', sans-serif" }}>Rechercher dans le coffre...</span>
          </div>
        </div>

        {/* Entries */}
        <div style={{ padding: '4px 0' }}>
          {entries.map((e, i) => (
            <div key={i} style={{ padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 11, background: i === 0 ? 'rgba(47,217,244,0.04)' : 'transparent', borderLeft: i === 0 ? '2px solid rgba(47,217,244,0.6)' : '2px solid transparent', transition: 'background 0.2s' }}>
              <EntryInitial label={e.initials} color={e.initColor} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-head)', marginBottom: 2, fontFamily: "'Inter', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace" }}>{e.user}</div>
                <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ flex: 1, height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.06)' }}>
                    <div style={{ width: `${e.score}%`, height: '100%', borderRadius: 1, background: e.scoreColor }} />
                  </div>
                  <span style={{ fontSize: 9, color: e.scoreColor, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{e.score}</span>
                </div>
              </div>
              <button style={{ background: 'rgba(47,217,244,0.07)', border: '1px solid rgba(47,217,244,0.14)', borderRadius: 6, padding: '5px 8px', color: '#2fd9f4', cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <IcoCopy />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '9px 14px', borderTop: '1px solid rgba(47,217,244,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-overlay)' }}>
          <span style={{ fontSize: 10, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace" }}>Score global</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 56, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }}>
              <div style={{ width: '94%', height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #2fd9f4, #8b5cf6)' }} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#2fd9f4', fontFamily: "'JetBrains Mono', monospace" }}>94/100</span>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div style={{ position: 'absolute', bottom: -18, left: -24, background: 'var(--bg2)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 12, padding: '9px 13px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', animation: 'mockup-float 7s ease-in-out infinite 1.5s' }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
          <IcoPhone size={13} />
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', fontFamily: "'Space Grotesk', sans-serif" }}>2FA activé</div>
          <div style={{ fontSize: 9, color: '#4a4a80', fontFamily: "'JetBrains Mono', monospace" }}>Google Auth</div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 48, right: -22, background: 'var(--bg2)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 10, padding: '7px 12px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', animation: 'mockup-float 7s ease-in-out infinite 3s' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', fontFamily: "'JetBrains Mono', monospace" }}>Chiffre</div>
        <div style={{ fontSize: 9, color: '#1a4a2e', fontFamily: "'JetBrains Mono', monospace" }}>AES-256</div>
      </div>
    </div>
  )
}

// ─── NavBar ────────────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 62,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 max(1.5rem, calc((100% - 1200px) / 2))',
      background: scrolled ? 'var(--bg-nav)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px) saturate(1.5)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(47,217,244,0.07)' : 'none',
      transition: 'background 0.35s, border-color 0.35s, backdrop-filter 0.35s',
    }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid rgba(47,217,244,0.22)', background: 'rgba(47,217,244,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img src="/dencpass-logo.png" alt="DencPass" style={{ width: 24, height: 24, objectFit: 'contain' }} />
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 19, letterSpacing: '-0.04em', color: 'var(--text)' }}>
          Denc<span style={{ color: '#2fd9f4' }}>Pass</span>
        </span>
      </a>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
        {[['#features','Fonctionnalités'],['#pricing','Tarifs'],['#editions','Éditions'],['#faq','FAQ']].map(([href, label]) => (
          <a key={href} href={href} className="nav-link" style={{ fontSize: 14, color: 'var(--text3)', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{label}</a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <a href="https://app.dencu.online" style={{ fontSize: 13, color: 'var(--text3)', fontFamily: "'Inter', sans-serif", fontWeight: 500, padding: '8px 4px', transition: 'color 0.2s' }}
          onMouseEnter={e=>e.target.style.color='var(--accent)'} onMouseLeave={e=>e.target.style.color='var(--text3)'}>
          Connexion
        </a>
        <a href="https://app.dencu.online/register" className="btn-primary"
          style={{ padding: '9px 18px', borderRadius: 10, background: '#2fd9f4', color: '#07111f', fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 2px 16px rgba(47,217,244,0.25)' }}>
          Commencer — Gratuit
        </a>
      </div>
    </nav>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 62, background: 'var(--bg)' }}>
      <CipherGrid />
      <div style={{ position: 'absolute', top: '15%', left: '20%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(47,217,244,0.035) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div className="hero-grid" style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '4rem max(1.5rem, calc((100% - 1200px) / 2))', display: 'grid', gridTemplateColumns: '55% 45%', gap: '3rem', alignItems: 'center', width: '100%' }}>

        {/* Text */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid rgba(47,217,244,0.2)', background: 'rgba(47,217,244,0.05)', marginBottom: '2rem', animation: 'fade-up 0.6s ease both 0.05s' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2fd9f4', animation: 'glow-pulse 2s ease-in-out infinite', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#2fd9f4', letterSpacing: '0.1em' }}>GESTIONNAIRE DE MOTS DE PASSE · SÉNÉGAL</span>
          </div>

          <h1 style={{ lineHeight: 1.0, letterSpacing: '-0.045em', marginBottom: '0.75rem' }}>
            <span className="hero-line" style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(3.2rem, 6.5vw, 5.5rem)', color: 'var(--sand)' }}>Samm</span>
            <span className="hero-line" style={{ display: 'block', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(3.2rem, 6.5vw, 5.5rem)', color: 'var(--sand)' }}>sa sirru.</span>
          </h1>

          <p style={{ fontSize: 18, color: 'var(--text3)', fontStyle: 'italic', fontWeight: 300, marginBottom: '1.5rem', animation: 'fade-up 0.7s ease both 0.25s', fontFamily: "'Inter', sans-serif" }}>
            Garde ton secret.
          </p>

          <p style={{ fontSize: 16, color: 'var(--text2)', fontFamily: "'Inter', sans-serif", lineHeight: 1.8, maxWidth: 500, marginBottom: '2.5rem', animation: 'fade-up 0.7s ease both 0.35s', fontWeight: 400 }}>
            Sécurisez vos mots de passe, secrets et certificats avec un chiffrement de niveau militaire. Pour les professionnels et organisations d'Afrique.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animation: 'fade-up 0.7s ease both 0.45s' }}>
            <a href="https://app.dencu.online/register" className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 13, background: '#2fd9f4', color: '#07111f', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 28px rgba(47,217,244,0.32)' }}>
              Commencer gratuitement <IcoArrow />
            </a>
            <a href="#pricing" className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 26px', borderRadius: 13, border: '1px solid rgba(47,217,244,0.22)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              Voir les tarifs
            </a>
          </div>
        </div>

        {/* Mockup */}
        <div className="hero-mockup" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '1rem' }}>
          <ProductMockup />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, background: 'linear-gradient(to bottom, transparent, var(--bg))', pointerEvents: 'none' }} />
    </section>
  )
}

// ─── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const items = [
    { v: 'AES-256',    l: 'Chiffrement' },
    { v: '2FA',        l: 'Double authentification' },
    { v: '28+',        l: 'Fonctionnalités' },
    { v: '0 FCFA',     l: 'Pour commencer' },
    { v: 'Zéro',       l: 'Connaissance serveur' },
  ]
  return (
    <div style={{ background: 'var(--bg2)', borderTop: '1px solid rgba(47,217,244,0.07)', borderBottom: '1px solid rgba(47,217,244,0.07)', padding: '1.1rem 0' }}>
      <div className="proof-bar" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 max(1.5rem, calc((100% - 1200px) / 2))', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
        {items.map(({ v, l }) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 9, flex: '1 1 auto', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 17, color: '#2fd9f4' }}>{v}</span>
            <span style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'Inter', sans-serif" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Pricing ───────────────────────────────────────────────────────────────────
function PricingSection() {
  const plans = [
    {
      name: 'Gratuit', tag: 'COMMUNITY',
      price: '0', suffix: 'FCFA / mois',
      desc: 'Pour démarrer sans engagement.',
      color: '#2fd9f4', border: 'rgba(47,217,244,0.18)', bg: 'rgba(47,217,244,0.03)',
      features: ['Mots de passe illimités', '150 générations / mois', '5 partages actifs', '5 secrets dans le coffre', '5 certificats SSL/TLS', 'Extension Chrome', '2FA TOTP'],
      cta: 'Créer un compte gratuit', ctaHref: 'https://app.dencu.online/register',
      ctaStyle: { background: 'rgba(47,217,244,0.08)', border: '1px solid rgba(47,217,244,0.25)', color: '#2fd9f4' },
    },
    {
      name: 'Pro', tag: 'POPULAIRE',
      price: '2 000', suffix: 'FCFA / mois',
      desc: 'Pour les professionnels qui ne comptent pas.',
      color: '#8b5cf6', border: 'rgba(139,92,246,0.35)', bg: 'rgba(139,92,246,0.06)',
      badge: true,
      features: ["Tout du plan Gratuit", 'Générateur illimité', 'Partages illimités', 'Secrets illimités', 'Certificats illimités', 'Passphrase africaine', 'Support prioritaire'],
      cta: 'Passer en Pro', ctaHref: 'https://app.dencu.online/register',
      ctaStyle: { background: '#8b5cf6', color: '#fff', boxShadow: '0 4px 24px rgba(139,92,246,0.35)' },
    },
    {
      name: 'Enterprise', tag: 'ORGANISATIONS',
      price: 'Sur devis', suffix: '',
      desc: 'Pour les équipes et les organisations.',
      color: '#f59e0b', border: 'rgba(245,158,11,0.22)', bg: 'rgba(245,158,11,0.03)',
      features: ["Tout du plan Pro", 'Équipes & groupes', 'Active Directory (LDAP)', 'Audit organisation', 'SIEM / Syslog', 'Déploiement on-premise', 'Licence + support dédiés'],
      cta: 'Nous contacter', ctaHref: 'mailto:mouhamadoumoustapha.dione@dencu.online',
      ctaStyle: { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' },
    },
  ]

  return (
    <section id="pricing" style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>TARIFS</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>
            Simple. Transparent. En FCFA.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text3)', maxWidth: 440, margin: '0 auto' }}>
            Pas de conversion, pas de frais cachés. Payez directement en francs CFA.
          </p>
        </div>

        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {plans.map(p => (
            <div key={p.name} className="price-card" style={{ position: 'relative', padding: '2.25rem', borderRadius: 20, border: `1px solid ${p.border}`, background: p.bg, overflow: 'hidden' }}>
              {p.badge && <div style={{ position: 'absolute', top: 0, right: 20, background: '#8b5cf6', color: '#fff', fontSize: 9, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '0 0 8px 8px' }}>POPULAIRE</div>}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: p.color, letterSpacing: '0.14em', marginBottom: '0.6rem' }}>{p.tag}</p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: '0.5rem' }}>{p.name}</p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '1rem 0 0.5rem' }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: p.price === 'Sur devis' ? 26 : 34, color: 'var(--text)', letterSpacing: '-0.04em' }}>{p.price}</span>
                {p.suffix && <span style={{ fontSize: 12, color: 'var(--text4)' }}>{p.suffix}</span>}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65, marginBottom: '1.75rem' }}>{p.desc}</p>

              <a href={p.ctaHref} style={{ display: 'block', textAlign: 'center', padding: '12px 0', borderRadius: 11, fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: '1.75rem', transition: 'all 0.2s', ...p.ctaStyle }}>
                {p.cta}
              </a>

              <div style={{ borderTop: `1px solid ${p.border}`, paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: 'var(--text2)' }}>
                    <span style={{ color: p.color, flexShrink: 0, marginTop: 1 }}><IcoCheck /></span>{f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features ──────────────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem', maxWidth: 560 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>FONCTIONNALITÉS</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>
            Tout ce dont vous avez besoin.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text3)', lineHeight: 1.75 }}>
            De la gestion quotidienne des accès à la sécurité enterprise avec SIEM et Active Directory.
          </p>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.1rem' }}>
          {FEATURES.map(({ Icon, title, desc, color }) => (
            <div key={title} className="card-hover" style={{ padding: '1.6rem', borderRadius: 16, border: '1px solid rgba(47,217,244,0.07)', background: 'var(--bg-card)', cursor: 'default' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}12`, border: `1px solid ${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: '1.1rem' }}><Icon /></div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.45rem' }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Editions ─────────────────────────────────────────────────────────────────
function EditionsSection() {
  const editions = [
    {
      tag: 'COMMUNITY', sub: 'Pour les particuliers', color: '#2fd9f4',
      border: 'rgba(47,217,244,0.18)', bg: 'rgba(47,217,244,0.03)',
      desc: 'Gérez vos mots de passe personnels, secrets et certificats. Gratuit avec des limites raisonnables, illimité en mode Pro.',
      items: ['Mots de passe illimités', 'Générateur (150/mois)', 'Coffre secrets (5)', 'Certificats (5 max)', 'Extension Chrome', 'Pro à 2 000 FCFA/mois'],
    },
    {
      tag: 'ENTERPRISE SAAS', sub: 'Pour les organisations', color: '#8b5cf6',
      border: 'rgba(139,92,246,0.28)', bg: 'rgba(139,92,246,0.05)',
      desc: 'Gestion centralisée pour vos équipes. Licence managée par DencPass avec support dédié et suivi d\'activité complet.',
      items: ["Tout de l'édition Community", 'Équipes & groupes', "Audit d'activité", 'Période de grâce 7 jours', 'Licence managée', 'Support dédié'],
    },
    {
      tag: 'ENTERPRISE ON-PREMISE', sub: 'Déployé sur votre infrastructure', color: '#f59e0b',
      border: 'rgba(245,158,11,0.22)', bg: 'rgba(245,158,11,0.03)',
      desc: 'Installez DencPass sur vos propres serveurs. Vos données restent sur site, sous votre contrôle total.',
      items: ["Tout de l'édition SaaS", 'Données 100% sur site', 'Intégration LDAP / AD', 'Docker ou bare metal', 'Licence annuelle sur devis', 'Maintenance incluse'],
      cta: 'Demander un devis',
    },
  ]
  return (
    <section id="editions" style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>ÉDITIONS</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Une solution pour chaque besoin</h2>
        </div>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {editions.map(ed => (
            <div key={ed.tag} className="price-card" style={{ padding: '2.25rem', borderRadius: 20, border: `1px solid ${ed.border}`, background: ed.bg, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${ed.color}, transparent)` }} />
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: ed.color, letterSpacing: '0.14em', marginBottom: '0.25rem' }}>{ed.tag}</p>
              <p style={{ fontSize: 12, color: 'var(--text4)', marginBottom: '1rem' }}>{ed.sub}</p>
              <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{ed.desc}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {ed.items.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'var(--text2)' }}>
                    <span style={{ color: ed.color, flexShrink: 0 }}><IcoCheck /></span>{f}
                  </li>
                ))}
              </ul>
              {ed.cta && (
                <a href="mailto:mouhamadoumoustapha.dione@dencu.online" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: '1.5rem', fontSize: 13, fontWeight: 600, color: ed.color }}>
                  {ed.cta} <IcoArrow size={13} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Security ──────────────────────────────────────────────────────────────────
function SecuritySection() {
  return (
    <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>SÉCURITÉ</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Aucun compromis</h2>
        </div>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {SECURITY.map(s => (
            <div key={s.title} className="card-hover" style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid rgba(47,217,244,0.09)', background: 'var(--bg-card)', display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(47,217,244,0.08)', border: '1px solid rgba(47,217,244,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2fd9f4', flexShrink: 0 }}><s.Icon /></div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.45rem' }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>FAQ</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Questions fréquentes</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderRadius: 14, border: `1px solid ${open===i ? 'rgba(47,217,244,0.22)' : 'rgba(47,217,244,0.07)'}`, background: open===i ? 'rgba(47,217,244,0.04)' : 'var(--bg-card)', overflow: 'hidden', transition: 'border-color 0.2s, background 0.2s' }}>
              <button onClick={() => setOpen(open===i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.15rem 1.4rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ color: '#2fd9f4', flexShrink: 0, transition: 'transform 0.22s', transform: open===i ? 'rotate(180deg)' : 'none', display: 'flex' }}><IcoChevron /></span>
              </button>
              {open===i && (
                <div style={{ padding: '0 1.4rem 1.25rem' }}>
                  <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section style={{ padding: '5rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ borderRadius: 24, border: '1px solid rgba(47,217,244,0.18)', background: 'linear-gradient(135deg, rgba(47,217,244,0.05) 0%, rgba(139,92,246,0.05) 100%)', padding: 'clamp(3rem,6vw,5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(47,217,244,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem', position: 'relative' }}>COMMENCER MAINTENANT</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1, position: 'relative' }}>
            Prêt à sécuriser vos accès ?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text3)', maxWidth: 440, margin: '0 auto 2.5rem', position: 'relative' }}>
            Créez votre compte en moins de 2 minutes. Gratuit, sans carte bancaire.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <a href="https://app.dencu.online/register" className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 13, background: '#2fd9f4', color: '#07111f', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 28px rgba(47,217,244,0.3)' }}>
              Commencer gratuitement <IcoArrow />
            </a>
            <a href="mailto:mouhamadoumoustapha.dione@dencu.online" className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 26px', borderRadius: 13, border: '1px solid rgba(47,217,244,0.22)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              Contacter l'équipe
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer({ theme, setTheme, setLegalModal }) {
  const navCols = [
    { title: 'Produit', links: [
      { l: 'Fonctionnalités', h: '#features' },
      { l: 'Tarifs', h: '#pricing' },
      { l: 'Éditions', h: '#editions' },
      { l: 'FAQ', h: '#faq' },
      { l: 'Se connecter', h: 'https://app.dencu.online' },
    ]},
    { title: 'Éditions', links: [
      { l: 'Community', h: '#editions' },
      { l: 'Enterprise SaaS', h: '#editions' },
      { l: 'Enterprise On-Premise', h: '#editions' },
    ]},
    { title: 'Légal', links: [
      { l: "Conditions d'utilisation", modal: 'cgu' },
      { l: 'Politique de confidentialité', modal: 'privacy' },
      { l: 'Contact', h: 'mailto:mouhamadoumoustapha.dione@dencu.online' },
    ]},
  ]
  const themes = [
    { v: 'light', Icon: IcoSun, l: 'Clair' },
    { v: 'dark',  Icon: IcoMoon, l: 'Sombre' },
    { v: 'system',Icon: IcoMonitor, l: 'Système' },
  ]
  const linkStyle = { display: 'block', fontSize: 13, color: 'var(--text5)', marginBottom: '0.55rem', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'Inter', sans-serif", textAlign: 'left' }
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid rgba(47,217,244,0.07)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem max(1.5rem, calc((100% - 1200px) / 2)) 2rem' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid rgba(47,217,244,0.18)', background: 'rgba(47,217,244,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
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
              <a href="mailto:mouhamadoumoustapha.dione@dencu.online" style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='var(--accent)'} onMouseLeave={e=>e.target.style.color='var(--text5)'}>
                mouhamadoumoustapha.dione@dencu.online
              </a>
              <a href="tel:+221XXXXXXXXX" style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", transition: 'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='var(--accent)'} onMouseLeave={e=>e.target.style.color='var(--text5)'}>
                +221 XX XXX XX XX
              </a>
            </div>
          </div>

          {navCols.map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: '#2fd9f4', letterSpacing: '0.12em', marginBottom: '1rem' }}>{col.title.toUpperCase()}</p>
              {col.links.map(l => (
                l.modal
                  ? <button key={l.l} onClick={() => setLegalModal(l.modal)} style={linkStyle}
                      onMouseEnter={e=>e.target.style.color='var(--accent)'} onMouseLeave={e=>e.target.style.color='var(--text5)'}>{l.l}</button>
                  : <a key={l.l} href={l.h} style={linkStyle}
                      onMouseEnter={e=>e.target.style.color='var(--accent)'} onMouseLeave={e=>e.target.style.color='var(--text5)'}>{l.l}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(47,217,244,0.07)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: 12, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace" }}>
            © 2026 DencPass · Sénégal · <em>Samm sa sirru</em>
          </p>
          <div style={{ display: 'flex', background: 'rgba(47,217,244,0.04)', border: '1px solid rgba(47,217,244,0.09)', borderRadius: 9, padding: 3, gap: 2 }}>
            {themes.map(({ v, Icon, l }) => (
              <button key={v} onClick={() => setTheme(v)} title={l}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', background: theme===v ? 'rgba(47,217,244,0.12)' : 'none', color: theme===v ? '#2fd9f4' : 'var(--text5)' }}>
                <Icon /> {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [legalModal, setLegalModal] = useState(null)
  return (
    <div style={{ background: 'var(--bg)' }}>
      <NavBar />
      <HeroSection />
      <StatsBar />
      <PricingSection />
      <FeaturesSection />
      <EditionsSection />
      <SecuritySection />
      <FAQSection />
      <CTABanner />
      <Footer theme={theme} setTheme={setTheme} setLegalModal={setLegalModal} />
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </div>
  )
}
