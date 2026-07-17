import { useState, useEffect } from 'react'
import PublicLayout from '../components/layout/PublicLayout'
import { Reveal, IcoArrow, IcoShield, IcoCheck } from '../components/shared'

const NB_OPTIONS = [
  { value: '1-10',   label: '1 – 10 utilisateurs' },
  { value: '10-50',  label: '10 – 50 utilisateurs' },
  { value: '50-200', label: '50 – 200 utilisateurs' },
  { value: '200+',   label: '200+ utilisateurs' },
]

const API_URL = 'https://app.dencpass.com/api/public/contact/'

export default function ContactPage() {
  useEffect(() => { document.title = 'Contact | DencPass' }, [])

  const [form, setForm] = useState({ nom: '', email: '', organisation: '', nb_utilisateurs: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function set(key) {
    return e => setForm(f => ({ ...f, [key]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.detail || 'Une erreur est survenue.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Impossible de joindre le serveur. Réessayez plus tard.')
    }
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '12px 14px', borderRadius: 10,
    border: '1px solid var(--border)',
    background: 'var(--bg)', color: 'var(--text)',
    fontSize: 14, fontFamily: "'Inter', sans-serif",
    outline: 'none', transition: 'border-color 0.2s',
  }
  const labelStyle = {
    display: 'block', fontSize: 13, fontWeight: 600,
    color: 'var(--text2)', marginBottom: 6,
    fontFamily: "'Space Grotesk', sans-serif",
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ paddingTop: '7rem', paddingBottom: '4rem', textAlign: 'center' }} className="section-pad">
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8b5cf6', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Contact
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.25rem', lineHeight: 1.1 }}>
            Parlons de votre projet.
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text3)', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
            Démo, devis ou simple question, nous répondons sous 48h.
          </p>
        </Reveal>
      </section>

      {/* Form + aside */}
      <section style={{ paddingBottom: '7rem' }} className="section-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }} className="hero-grid">

          {/* Form */}
          <Reveal>
            <div style={{ padding: '2.5rem', borderRadius: 20, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#22c55e' }}>
                    <IcoCheck size={24} />
                  </div>
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: 'var(--text)', margin: '0 0 0.75rem' }}>Message envoyé !</h2>
                  <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.6 }}>Nous vous répondrons sous 48h à l'adresse <strong style={{ color: 'var(--text2)' }}>{form.email}</strong>.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text)', margin: '0 0 0.25rem' }}>Envoyer un message</h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
                    <div>
                      <label style={labelStyle}>Nom complet <span style={{ color: '#ef4444' }}>*</span></label>
                      <input
                        style={inputStyle} type="text" required
                        placeholder="Moustapha Diallo"
                        value={form.nom} onChange={set('nom')}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email <span style={{ color: '#ef4444' }}>*</span></label>
                      <input
                        style={inputStyle} type="email" required
                        placeholder="vous@entreprise.com"
                        value={form.email} onChange={set('email')}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-2">
                    <div>
                      <label style={labelStyle}>Organisation</label>
                      <input
                        style={inputStyle} type="text"
                        placeholder="Nom de l'entreprise"
                        value={form.organisation} onChange={set('organisation')}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Taille de l'équipe</label>
                      <select
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        value={form.nb_utilisateurs} onChange={set('nb_utilisateurs')}
                        onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      >
                        <option value="">Sélectionner...</option>
                        {NB_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Message <span style={{ color: '#ef4444' }}>*</span></label>
                    <textarea
                      style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }}
                      required
                      placeholder="Décrivez votre besoin, votre contexte, vos questions..."
                      value={form.message} onChange={set('message')}
                      onFocus={e => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>

                  {status === 'error' && (
                    <p style={{ fontSize: 13, color: '#ef4444', margin: 0, padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, background: '#8b5cf6', color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer', boxShadow: '0 4px 24px rgba(139,92,246,0.3)', opacity: status === 'loading' ? 0.7 : 1 }}
                  >
                    {status === 'loading' ? 'Envoi...' : <><span>Envoyer le message</span><IcoArrow /></>}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Aside */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Reveal delay={100}>
              <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#8b5cf6', letterSpacing: '0.12em', marginBottom: '1rem' }}>RÉPONSE RAPIDE</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'Réponse sous 48h ouvrées',
                    'Démo personnalisée disponible',
                    'Devis adapté à votre équipe',
                    'Accompagnement à l\'onboarding',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text2)' }}>
                      <span style={{ color: '#8b5cf6', flexShrink: 0 }}><IcoCheck size={14} /></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid rgba(47,217,244,0.12)', background: 'rgba(47,217,244,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
                  <IcoShield size={16} style={{ color: '#2fd9f4' }} />
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#2fd9f4', letterSpacing: '0.12em', margin: 0 }}>SÉCURITÉ</p>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65, margin: 0 }}>
                  Vos informations de contact ne sont utilisées que pour vous répondre. Elles ne sont jamais partagées ni revendues.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text4)', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>EMAIL DIRECT</p>
                <a href="mailto:support@dencpass.com" style={{ fontSize: 13, color: '#2fd9f4', wordBreak: 'break-all' }}>
                  support@dencpass.com
                </a>
              </div>
            </Reveal>
          </div>

        </div>
      </section>
    </PublicLayout>
  )
}
