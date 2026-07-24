import { useState, useEffect } from 'react'
import PublicLayout from '../components/layout/PublicLayout'
import { Reveal, IcoArrow, IcoGlobe, IcoDownload, IcoCheck } from '../components/shared'

// PWA install hook (no npm needed, pure browser API)
function usePWAInstall() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }
    const handler = e => { e.preventDefault(); setInstallPrompt(e) }
    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => { setIsInstalled(true); setInstallPrompt(null) })
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') { setInstallPrompt(null); setIsInstalled(true) }
  }

  return { canInstall: !!installPrompt && !isInstalled, isInstalled, install }
}

export default function DownloadPage() {
  const { canInstall, isInstalled, install } = usePWAInstall()

  useEffect(() => { document.title = 'Télécharger | DencPass' }, [])

  const manualSteps = {
    Windows: [
      'Ouvrez app.dencpass.com dans Chrome',
      'Cliquez sur le menu ⋮ (trois points en haut à droite)',
      'Sélectionnez "Installer DencPass..."',
      'Confirmez, l\'icône apparaît sur votre bureau',
    ],
    macOS: [
      'Ouvrez app.dencpass.com dans Chrome',
      'Cliquez sur le menu ⋮ → "Installer DencPass..."',
      'Confirmez, l\'icône apparaît dans votre Dock / Launchpad',
    ],
    Linux: [
      'Ouvrez app.dencpass.com dans Chrome',
      'Cliquez sur le menu ⋮ → "Installer DencPass..."',
      'Confirmez l\'installation',
    ],
  }

  const [activeOS, setActiveOS] = useState('Windows')

  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: '5rem', background: 'var(--bg)', textAlign: 'center', padding: '120px max(1.5rem, calc((100% - 1200px) / 2)) 5rem' }} className="section-pad">
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>TÉLÉCHARGEMENTS</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem,5.5vw,4rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.25rem', lineHeight: 1.05 }}>
            DencPass, partout.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text3)', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
            Extension Chrome pour l'autofill et application web installable sur desktop. Choisissez votre canal.
          </p>
        </Reveal>
      </section>

      {/* Download cards */}
      <section style={{ padding: '0 max(1.5rem, calc((100% - 1200px) / 2)) 7rem', background: 'var(--bg)' }} className="section-pad">
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Extension Chrome */}
            <Reveal>
              <div style={{ padding: '2.5rem', borderRadius: 20, border: '1px solid rgba(47,217,244,0.2)', background: 'var(--bg-card)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '2rem', alignItems: 'center' }} className="hero-grid">
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(47,217,244,0.08)', border: '1px solid rgba(47,217,244,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IcoGlobe size={28} style={{ color: '#2fd9f4' }} />
                </div>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(47,217,244,0.2)', background: 'rgba(47,217,244,0.06)', marginBottom: '0.75rem' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'glow-pulse 2s ease-in-out infinite' }} />
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: '#22c55e', letterSpacing: '0.08em' }}>DISPONIBLE</span>
                  </div>
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: 'var(--text-head)', margin: '0 0 0.5rem' }}>Extension Chrome</h2>
                  <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.7, margin: '0 0 1rem' }}>
                    Remplissage automatique sur tous vos sites de connexion. Détection proactive des champs de formulaire, génération en un clic.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['Autofill automatique', 'Génération en un clic', 'Détection proactive', 'Tous les plans inclus'].map(f => (
                      <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text3)', background: 'rgba(47,217,244,0.05)', border: '1px solid rgba(47,217,244,0.1)', borderRadius: 6, padding: '3px 10px' }}>
                        <IcoCheck size={11} style={{ color: '#2fd9f4' }} /> {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end', flexShrink: 0 }}>
                  <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 11, background: '#2fd9f4', color: '#07111f', fontSize: 14, whiteSpace: 'nowrap' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>
                    Chrome Web Store
                  </a>
                  <span style={{ fontSize: 11, color: 'var(--text5)', fontFamily: "'JetBrains Mono', monospace", textAlign: 'right' }}>Firefox · Edge, Bientôt</span>
                </div>
              </div>
            </Reveal>

            {/* Application web (PWA) */}
            <Reveal delay={100}>
              <div style={{ padding: '2.5rem', borderRadius: 20, border: canInstall ? '1px solid rgba(47,217,244,0.35)' : '1px solid rgba(47,217,244,0.15)', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden' }}>
                {canInstall && <div style={{ position: 'absolute', inset: 0, background: 'rgba(47,217,244,0.02)', pointerEvents: 'none' }} />}
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '2rem', alignItems: 'flex-start' }} className="hero-grid">
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(47,217,244,0.08)', border: '1px solid rgba(47,217,244,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    <img src="/dencpass-logo.png" alt="DencPass" style={{ width: 40, height: 40, objectFit: 'contain' }} />
                  </div>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.06)', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: '#8b5cf6', letterSpacing: '0.08em' }}>PWA · PROGRESSIVE WEB APP</span>
                    </div>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: 'var(--text-head)', margin: '0 0 0.5rem' }}>Application Web Installable</h2>
                    <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.7, margin: '0 0 0.5rem' }}>
                      Installez DencPass directement depuis Chrome, aucun exécutable, aucun téléchargement. L'app apparaît sur votre bureau en quelques secondes.
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--text4)', lineHeight: 1.65, margin: '0 0 1rem', fontStyle: 'italic' }}>
                      Pas d'application mobile native pour l'instant — la PWA s'installe aussi sur mobile (Android/iOS) et fonctionne hors-ligne.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['Fonctionne hors-ligne (cache)', 'Icône sur le bureau', 'Mise à jour automatique', 'Windows · macOS · Linux'].map(f => (
                        <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text3)', background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.12)', borderRadius: 6, padding: '3px 10px' }}>
                          <IcoCheck size={11} style={{ color: '#8b5cf6' }} /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    {isInstalled ? (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 11, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                        <IcoCheck size={16} /> Installée
                      </div>
                    ) : canInstall ? (
                      <button onClick={install}
                        className="btn-primary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 11, background: '#2fd9f4', color: '#07111f', fontSize: 14, whiteSpace: 'nowrap' }}>
                        <IcoDownload size={16} /> Installer l'app
                      </button>
                    ) : (
                      <a href="https://app.dencpass.com"
                        className="btn-ghost"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 11, border: '1px solid rgba(47,217,244,0.2)', color: 'var(--text2)', fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif', whiteSpace: 'nowrap'" }}>
                        Ouvrir l'app web <IcoArrow size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Manual installation guide */}
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(47,217,244,0.08)' }}>
                  <p style={{ fontSize: 13, color: 'var(--text4)', marginBottom: '1rem', fontFamily: "'Inter', sans-serif" }}>
                    Installation manuelle par OS :
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                    {Object.keys(manualSteps).map(os => (
                      <button key={os} onClick={() => setActiveOS(os)}
                        style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${activeOS === os ? 'rgba(47,217,244,0.4)' : 'rgba(47,217,244,0.1)'}`, background: activeOS === os ? 'rgba(47,217,244,0.08)' : 'transparent', color: activeOS === os ? '#2fd9f4' : 'var(--text5)', fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: 'pointer', transition: 'all 0.2s' }}>
                        {os}
                      </button>
                    ))}
                  </div>
                  <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {manualSteps[activeOS].map((step, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text3)', lineHeight: 1.6 }}>
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(47,217,244,0.1)', border: '1px solid rgba(47,217,244,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#2fd9f4', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem max(1.5rem, calc((100% - 1200px) / 2)) 6rem', background: 'var(--bg-alt)', textAlign: 'center' }} className="section-pad">
        <Reveal>
          <p style={{ fontSize: 15, color: 'var(--text3)', marginBottom: '1.25rem' }}>Pas encore de compte ?</p>
          <a href="https://app.dencpass.com/register" className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, background: '#2fd9f4', color: '#07111f', fontSize: 15, boxShadow: '0 4px 24px rgba(47,217,244,0.3)' }}>
            Créer un compte gratuit <IcoArrow />
          </a>
        </Reveal>
      </section>
    </PublicLayout>
  )
}
