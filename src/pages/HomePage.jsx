import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import NumberFlow from '@number-flow/react'
import confetti from 'canvas-confetti'
import PublicLayout from '../components/layout/PublicLayout'
import { Reveal, prefersReducedMotion, IcoCheck, IcoArrow, IcoChevron, IcoVault, IcoZap, IcoShare, IcoKey, IcoGlobe, IcoCert, IcoUsers, IcoActivity, IcoServer, IcoShield, IcoPhone, IcoEye, IcoClipboard, IcoLock, IcoSearch, IcoCopy, IcoBuilding } from '../components/shared'

// ─── Canvas background ────────────────────────────────────────────────────────
function CipherGrid() {
  const ref = useRef(null)
  const lightRef = useRef(false)
  const mouseRef = useRef({ x: -9999, y: -9999 })

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
    const N = 70, LINK_DIST = 160, MOUSE_DIST = 220, SPEED = 0.38, INTERVAL = 1000 / 60
    let pts = [], running = true, last = 0
    const mkPt = () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * SPEED * 2, vy: (Math.random() - 0.5) * SPEED * 2, r: 1.2 + Math.random() * 1.4 })
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; pts = Array.from({ length: N }, mkPt) }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const onMouse = e => { const rect = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top } }
    const offMouse = () => { mouseRef.current = { x: -9999, y: -9999 } }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('mouseleave', offMouse)
    const LINK2 = LINK_DIST * LINK_DIST, MOUSE2 = MOUSE_DIST * MOUSE_DIST
    const tick = ts => {
      if (!running) return
      if (ts - last < INTERVAL) { requestAnimationFrame(tick); return }
      last = ts
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)
      const light = lightRef.current
      const [r, g, b] = light ? [8, 136, 163] : [47, 217, 244]
      const mx = mouseRef.current.x, my = mouseRef.current.y
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x += W; if (p.x > W) p.x -= W
        if (p.y < 0) p.y += H; if (p.y > H) p.y -= H
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d2 = dx * dx + dy * dy
          if (d2 < LINK2) { const d = Math.sqrt(d2); const a = (1 - d / LINK_DIST) * (light ? 0.14 : 0.22); ctx.beginPath(); ctx.strokeStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`; ctx.lineWidth = 0.8; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke() }
        }
        const mdx = pts[i].x - mx, mdy = pts[i].y - my, md2 = mdx * mdx + mdy * mdy
        if (md2 < MOUSE2) { const md = Math.sqrt(md2); const a = (1 - md / MOUSE_DIST) * (light ? 0.55 : 0.5); ctx.beginPath(); ctx.strokeStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`; ctx.lineWidth = 1; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mx, my); ctx.stroke() }
      }
      const dotA = light ? 0.18 : 0.65; ctx.fillStyle = `rgba(${r},${g},${b},${dotA})`
      for (let i = 0; i < pts.length; i++) { ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2); ctx.fill() }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    return () => { running = false; ro.disconnect(); window.removeEventListener('mousemove', onMouse); window.removeEventListener('mouseleave', offMouse) }
  }, [])

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

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
            <span style={{ fontSize: 10, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.02em' }}>app.dencu.online</span>
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
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 62, background: 'var(--bg)' }}>
      <CipherGrid />
      <div style={{ position: 'absolute', top: '15%', left: '20%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(47,217,244,0.03) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div className="hero-grid" style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '4rem max(1.5rem, calc((100% - 1200px) / 2))', display: 'grid', gridTemplateColumns: '55% 45%', gap: '3rem', alignItems: 'center', width: '100%' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid rgba(47,217,244,0.2)', background: 'rgba(47,217,244,0.05)', marginBottom: '2rem', animation: 'fade-up 0.6s ease both 0.05s' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2fd9f4', animation: 'glow-pulse 2s ease-in-out infinite', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#2fd9f4', letterSpacing: '0.1em' }}>GESTIONNAIRE DE MOTS DE PASSE · SÉNÉGAL</span>
          </div>
          <HeroTypewriter />
          <p style={{ fontSize: 18, color: 'var(--text3)', fontStyle: 'italic', fontWeight: 300, marginBottom: '1.5rem', animation: 'fade-up 0.7s ease both 0.25s', fontFamily: "'Inter', sans-serif" }}>
            Garde ton secret.
          </p>
          <p style={{ fontSize: 16, color: 'var(--text2)', fontFamily: "'Inter', sans-serif", lineHeight: 1.8, maxWidth: 500, marginBottom: '2.5rem', animation: 'fade-up 0.7s ease both 0.35s', fontWeight: 400 }}>
            Le command center de vos identifiants, secrets et certificats. Chiffrement AES-256, zéro connaissance, fait pour l'Afrique.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animation: 'fade-up 0.7s ease both 0.45s' }}>
            <a href="https://app.dencu.online/register" className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 13, background: '#2fd9f4', color: '#07111f', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 28px rgba(47,217,244,0.32)' }}>
              Commencer gratuitement <IcoArrow />
            </a>
            <a href="https://app.dencu.online" className="btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 26px', borderRadius: 13, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              Voir la démo
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
    { icon: '🔒', label: 'AES-256', sub: 'Chiffrement' },
    { icon: '👁️', label: 'Zéro connaissance', sub: 'Aucun accès serveur' },
    { icon: '📱', label: '2FA TOTP', sub: 'Authentification forte' },
    { icon: '🧩', label: 'Extension Chrome', sub: 'Autofill intégré' },
    { icon: '🌍', label: 'Africa-first', sub: 'Paiement FCFA' },
  ]
  return (
    <div style={{ background: 'var(--bg2)', borderTop: '1px solid rgba(47,217,244,0.07)', borderBottom: '1px solid rgba(47,217,244,0.07)', padding: '1.1rem 0', overflow: 'hidden' }}>
      <div className="proof-bar" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 max(1.5rem, calc((100% - 1200px) / 2))', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
        {badges.map(({ icon, label, sub }, i) => (
          <Reveal key={label} delay={i * 80} y={16}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, flex: '1 1 auto', justifyContent: 'center' }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: '#2fd9f4', lineHeight: 1.2 }}>{label}</div>
                <div style={{ fontSize: 11, color: 'var(--text5)', fontFamily: "'Inter', sans-serif" }}>{sub}</div>
              </div>
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
              <Link to={link} className="card-hover" style={{ display: 'block', padding: '1.75rem', borderRadius: 16, border: '1px solid rgba(47,217,244,0.08)', background: 'var(--bg-card)', backdropFilter: 'blur(14px)', textDecoration: 'none' }}>
                <div style={{ color: 'rgba(47,217,244,0.55)', marginBottom: '1rem' }}><Icon size={22} /></div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.5rem' }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65, margin: '0 0 1rem' }}>{desc}</p>
                <span style={{ fontSize: 12, color: '#2fd9f4', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>En savoir plus <IcoArrow size={11} /></span>
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
    { n: '01', title: 'Créez votre coffre', desc: 'Inscription en 2 minutes. Votre coffre chiffré est prêt instantanément — sans carte bancaire.', accent: '#2fd9f4' },
    { n: '02', title: 'Importez ou générez', desc: 'Importez depuis Chrome, Bitwarden, 1Password ou KeePass. Ou générez de nouveaux mots de passe forts directement.', accent: '#8b5cf6' },
    { n: '03', title: 'Accédez partout', desc: "Via le web sur app.dencu.online, l'extension Chrome pour le remplissage automatique, ou la PWA installable sur mobile.", accent: '#22c55e' },
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
              <div style={{ padding: '2rem', borderRadius: 18, border: '1px solid rgba(47,217,244,0.08)', background: 'var(--bg-card)', backdropFilter: 'blur(14px)', position: 'relative', textAlign: 'center' }}>
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
  { Icon: IcoShield,    title: 'Chiffrement AES-256',        desc: 'Chaque entrée chiffrée individuellement. Rotation des clés sans interruption de service.' },
  { Icon: IcoPhone,     title: '2FA TOTP',                   desc: 'Compatible Google Authenticator et Authy. Le secret TOTP est lui-même chiffré au repos.' },
  { Icon: IcoEye,       title: 'Zéro connaissance serveur',  desc: 'Même en cas d\'accès physique au serveur, vos données restent illisibles sans vos clés.' },
  { Icon: IcoClipboard, title: 'Audit complet',              desc: 'Chaque action tracée. Export vers Splunk, Elastic via webhook ou Syslog RFC 5424.' },
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
              <div className="card-hover" style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid rgba(47,217,244,0.1)', background: 'var(--bg-card)', backdropFilter: 'blur(14px)', display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(47,217,244,0.08)', border: '1px solid rgba(47,217,244,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2fd9f4', flexShrink: 0 }}><s.Icon /></div>
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
                <IcoBuilding size={13} style={{ color: '#8b5cf6' }} />
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#8b5cf6', letterSpacing: '0.1em' }}>ENTERPRISE</span>
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.15 }}>
                Pensé pour vos équipes.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text3)', lineHeight: 1.8, marginBottom: '2rem' }}>
                DencPass Enterprise donne à vos équipes IT une visibilité totale sur les accès — avec les outils qu'elles utilisent déjà : LDAP, SIEM, webhooks.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/business" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: '#8b5cf6', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 24px rgba(139,92,246,0.3)' }}>
                  Découvrir Enterprise <IcoArrow />
                </Link>
                <a href="mailto:mouhamadoumoustapha.dione@dencu.online" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 12, border: '1px solid rgba(139,92,246,0.25)', color: 'var(--text3)', fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Demander un devis
                </a>
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

// ─── Pricing teaser ───────────────────────────────────────────────────────────
function PricingTeaser() {
  const plans = [
    {
      name: 'Gratuit', tag: 'COMMUNITY', price: 0,
      desc: 'Pour démarrer sans engagement.',
      features: ['Mots de passe illimités', '150 générations / mois', '5 partages actifs', 'Extension Chrome', '2FA TOTP'],
      cta: 'Créer un compte', ctaHref: 'https://app.dencu.online/register',
    },
    {
      name: 'Pro', tag: 'POPULAIRE', price: 2000,
      desc: 'Pour les professionnels qui ne comptent pas.',
      features: ['Tout du plan Gratuit', 'Générateur illimité', 'Partages illimités', 'Secrets illimités', 'Passphrase africaine'],
      cta: 'Passer en Pro', ctaHref: 'https://app.dencu.online/register',
      isPopular: true,
    },
  ]
  return (
    <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
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
              <div className="price-card" style={{ padding: '2rem', borderRadius: 20, border: p.isPopular ? '1px solid rgba(47,217,244,0.45)' : '1px solid rgba(47,217,244,0.1)', background: 'var(--bg-card)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden', boxShadow: p.isPopular ? '0 24px 64px rgba(47,217,244,0.1)' : 'none' }}>
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
  { q: 'Comment mes données sont-elles chiffrées ?', a: 'Chaque mot de passe, secret et certificat est chiffré individuellement avec AES avant stockage. DencPass applique un contrôle HMAC sur chaque donnée. Même nos équipes ne peuvent pas lire vos secrets — zéro accès en clair.' },
  { q: 'Puis-je migrer depuis Bitwarden, 1Password ou KeePass ?', a: 'Oui. DencPass accepte l\'import CSV depuis Chrome, Bitwarden, LastPass, KeePass et KeePassXC directement depuis l\'interface. La migration prend moins de 2 minutes.' },
  { q: 'L\'extension Chrome est-elle incluse dans tous les plans ?', a: 'Oui, l\'extension Chrome est disponible dans tous les plans. Elle détecte automatiquement les champs de connexion et propose le remplissage en un clic.' },
  { q: 'Comment fonctionne le paiement Enterprise ?', a: 'Pour les éditions Enterprise, nous établissons un devis personnalisé selon le nombre de sièges et la durée. Paiement en FCFA, par virement ou mobile money (Wave, Orange Money).' },
  { q: 'Que se passe-t-il si j\'oublie mon mot de passe principal ?', a: 'Cliquez sur "Mot de passe oublié ?" depuis la page de connexion. Vous recevrez un lien de réinitialisation valable 1 heure.' },
]

function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
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
              <div style={{ borderRadius: 14, border: `1px solid ${open === i ? 'rgba(47,217,244,0.22)' : 'rgba(47,217,244,0.07)'}`, background: open === i ? 'rgba(47,217,244,0.04)' : 'var(--bg-card)', overflow: 'hidden', transition: 'border-color 0.2s, background 0.2s' }}>
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
    <section style={{ padding: '5rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
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
      <FeaturesTeaser />
      <HowItWorksSection />
      <SecuritySection />
      <EnterpriseSection />
      <PricingTeaser />
      <FAQSection />
      <CTABanner />
    </PublicLayout>
  )
}
