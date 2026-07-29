import { useState, useEffect, useCallback } from 'react'
import PublicLayout from '../components/layout/PublicLayout'
import { Reveal } from '../components/shared'

const APP_BASE = 'https://app.dencpass.com'

// Composants à surveiller : fetch no-cors vers chaque URL.
// Résolu = serveur joignable, rejeté (NetworkError) = hors ligne.
const CHECKS = [
  {
    id: 'app',
    label: 'Application web',
    desc: 'Interface principale',
    url: APP_BASE,
  },
  {
    id: 'api',
    label: 'API',
    desc: 'Endpoints métier',
    url: `${APP_BASE}/api/auth/password-policy/`,
  },
  {
    id: 'auth',
    label: 'Authentification',
    desc: 'Connexion et 2FA',
    url: `${APP_BASE}/api/auth/token/`,
  },
  {
    id: 'extension',
    label: 'Extension Chrome',
    desc: 'Synchronisation navigateur',
    url: `${APP_BASE}/api/admin/extension/info/`,
  },
]

// Incidents récents : à mettre à jour manuellement en cas d'incident
// { date, title, status: 'resolved' | 'monitoring' | 'identified' }
const INCIDENTS = []

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function pingUrl(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try {
    await fetch(url, { mode: 'no-cors', signal: controller.signal })
    clearTimeout(timer)
    return 'up'
  } catch {
    clearTimeout(timer)
    return 'down'
  }
}

function StatusDot({ status }) {
  const colors = {
    up:       'var(--green)',
    down:     '#ef4444',
    checking: 'var(--amber)',
  }
  const color = colors[status] ?? colors.checking
  return (
    <span style={{
      display: 'inline-block',
      width: 10, height: 10,
      borderRadius: '50%',
      background: color,
      boxShadow: status === 'up' ? `0 0 6px ${color}` : 'none',
      flexShrink: 0,
      animation: status === 'checking' ? 'pulse-dot 1.2s ease-in-out infinite' : 'none',
    }} />
  )
}

function StatusLabel({ status }) {
  const map = { up: 'Opérationnel', down: 'Hors ligne', checking: 'Vérification...' }
  const color = { up: 'var(--green)', down: '#ef4444', checking: 'var(--amber)' }
  return (
    <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: color[status] ?? color.checking, fontWeight: 600 }}>
      {map[status] ?? 'Vérification...'}
    </span>
  )
}

function globalStatus(results) {
  const vals = Object.values(results)
  if (vals.length === 0 || vals.some(v => v === 'checking')) return 'checking'
  if (vals.every(v => v === 'up')) return 'up'
  return 'down'
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StatusPage() {
  const [results, setResults] = useState(() =>
    Object.fromEntries(CHECKS.map(c => [c.id, 'checking']))
  )
  const [lastCheck, setLastCheck] = useState(null)
  const [checking, setChecking] = useState(false)

  const runChecks = useCallback(async () => {
    setChecking(true)
    setResults(Object.fromEntries(CHECKS.map(c => [c.id, 'checking'])))
    const entries = await Promise.all(
      CHECKS.map(async c => [c.id, await pingUrl(c.url)])
    )
    setResults(Object.fromEntries(entries))
    setLastCheck(new Date())
    setChecking(false)
  }, [])

  useEffect(() => {
    runChecks()
    const interval = setInterval(runChecks, 60_000)
    return () => clearInterval(interval)
  }, [runChecks])

  const overall = globalStatus(results)

  const overallMeta = {
    up:       { label: 'Tous les systèmes sont opérationnels', color: 'var(--green)',  bg: 'rgba(34,197,94,0.08)',  border: 'rgba(34,197,94,0.25)'  },
    down:     { label: 'Incident en cours',                    color: '#ef4444',       bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.25)'  },
    checking: { label: 'Vérification en cours...',             color: 'var(--amber)',  bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
  }[overall]

  const incidentStatusLabel = {
    resolved:   { text: 'Résolu',    color: 'var(--green)'  },
    monitoring: { text: 'Surveillance', color: 'var(--amber)' },
    identified: { text: 'Identifié', color: '#ef4444'       },
  }

  return (
    <PublicLayout>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ── Hero ── */}
        <section style={{ padding: '6rem max(1.5rem, calc((100% - 760px) / 2)) 2.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, var(--accent-014) 0%, transparent 55%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid var(--border2)', background: 'var(--accent-004)', marginBottom: '1.4rem' }}>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.1em' }}>STATUT DU SERVICE</span>
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4.5vw,3.2rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 0.75rem', lineHeight: 1.08 }}>
                État de DencPass
              </h1>
              <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.7 }}>
                Disponibilité en temps réel. Mis à jour automatiquement toutes les 60 secondes.
              </p>
            </Reveal>
          </div>
        </section>

        <section style={{ padding: '0 max(1.5rem, calc((100% - 760px) / 2)) 6rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* ── Bandeau global ── */}
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.1rem 1.4rem', borderRadius: 14, background: overallMeta.bg, border: `1px solid ${overallMeta.border}`, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <StatusDot status={overall} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: overallMeta.color }}>
                  {overallMeta.label}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {lastCheck && (
                  <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text5)' }}>
                    Dernier contrôle : {lastCheck.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                )}
                <button
                  onClick={runChecks}
                  disabled={checking}
                  style={{ fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: 'var(--text3)', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: '5px 12px', cursor: checking ? 'default' : 'pointer', opacity: checking ? 0.5 : 1, transition: 'opacity 0.2s' }}
                >
                  {checking ? 'Vérification...' : 'Actualiser'}
                </button>
              </div>
            </div>
          </Reveal>

          {/* ── Composants ── */}
          <Reveal delay={80}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '1rem 1.4rem', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Composants</p>
              </div>
              {CHECKS.map((c, i) => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.4rem', borderBottom: i < CHECKS.length - 1 ? '1px solid var(--border)' : 'none', gap: '1rem' }}>
                  <div>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--text)', margin: '0 0 2px' }}>{c.label}</p>
                    <p style={{ fontSize: 12, color: 'var(--text5)', margin: 0 }}>{c.desc}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <StatusDot status={results[c.id]} />
                    <StatusLabel status={results[c.id]} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ── Incidents récents ── */}
          <Reveal delay={160}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ padding: '1rem 1.4rem', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Incidents récents</p>
              </div>
              {INCIDENTS.length === 0 ? (
                <div style={{ padding: '2rem 1.4rem', textAlign: 'center' }}>
                  <p style={{ fontSize: 13, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace" }}>Aucun incident enregistré.</p>
                </div>
              ) : INCIDENTS.map((inc, i) => {
                const s = incidentStatusLabel[inc.status] ?? incidentStatusLabel.identified
                return (
                  <div key={i} style={{ padding: '1rem 1.4rem', borderBottom: i < INCIDENTS.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--text)', margin: '0 0 3px' }}>{inc.title}</p>
                      <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text5)', margin: 0 }}>{inc.date}</p>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, color: s.color, background: `${s.color}18`, border: `1px solid ${s.color}33`, borderRadius: 100, padding: '3px 10px', whiteSpace: 'nowrap' }}>{s.text}</span>
                  </div>
                )
              })}
            </div>
          </Reveal>

          {/* ── Contact ── */}
          <Reveal delay={240}>
            <p style={{ fontSize: 13, color: 'var(--text5)', textAlign: 'center' }}>
              Un problème non détecté ?{' '}
              <a href="mailto:support@dencpass.com" style={{ color: 'var(--accent)', fontWeight: 600, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Contactez le support
              </a>
            </p>
          </Reveal>

        </section>

        <style>{`
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }
        `}</style>
      </div>
    </PublicLayout>
  )
}
