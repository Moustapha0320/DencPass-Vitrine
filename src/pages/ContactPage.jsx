import { useState } from 'react';
import PublicLayout from '../components/layout/PublicLayout';
import { Reveal, IcoArrow, IcoCheck, IcoMail, IcoBuilding, IcoGlobe, IcoCheckCircle } from '../components/shared';

const API_URL = 'https://app.dencpass.com/api/public/contact/';

const SUJET_OPTIONS = [
  { value: '',                    label: 'Choisir un sujet...' },
  { value: 'question-generale',   label: 'Question générale' },
  { value: 'demonstration',       label: 'Démonstration produit' },
  { value: 'devis-enterprise',    label: 'Devis Enterprise' },
  { value: 'support-technique',   label: 'Support technique' },
  { value: 'autre',               label: 'Autre' },
];

const channels = [
  {
    Icon: IcoMail,
    title: 'Support & ventes',
    detail: 'support@dencpass.com',
    href: 'mailto:support@dencpass.com',
  },
  {
    Icon: IcoBuilding,
    title: 'Enterprise',
    detail: 'enterprise@dencpass.com',
    href: 'mailto:enterprise@dencpass.com',
  },
  {
    Icon: IcoGlobe,
    title: 'Bureau',
    detail: 'Dakar · Sénégal',
    href: null,
  },
];

const fieldBase = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '11px 14px',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'var(--bg-alt)',
  color: 'var(--text)',
  fontSize: '0.875rem',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: 'var(--text2)',
  marginBottom: 6,
  fontFamily: "'Space Grotesk', sans-serif",
};

function Field({ label, required, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}</label>
      {children}
    </div>
  );
}

function focusIn(e)  { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-014)'; }
function focusOut(e) { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }

export default function ContactPage() {
  const [form, setForm]   = useState({ nom: '', email: '', organisation: '', sujet: '', message: '' });
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const firstName = form.nom.trim().split(' ')[0] || 'vous';

  function set(key) {
    return e => setForm(f => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom:          form.nom,
          email:        form.email,
          organisation: form.organisation,
          message:      form.sujet ? `[${form.sujet}] ${form.message}` : form.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.detail || 'Une erreur est survenue. Réessayez plus tard.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Impossible de joindre le serveur. Réessayez plus tard.');
    }
  }

  return (
    <PublicLayout>
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section style={{
        padding: 'clamp(5rem,12vw,8rem) max(1.25rem, calc((100vw - 900px)/2)) clamp(3rem,5vw,4rem)',
        background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)',
        textAlign: 'center',
      }}>
        <Reveal>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '1.25rem' }}>
            Contact
          </span>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.25rem)', color: 'var(--text-head)', lineHeight: 1.15, marginBottom: '1.1rem' }}>
            Parlons de vos besoins.
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text2)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Équipe basée à Dakar, nous répondons sous 24h ouvrées.
          </p>
        </Reveal>
      </section>

      {/* ── Content ── */}
      <section style={{ padding: 'clamp(1.5rem,4vw,2.5rem) max(1.25rem, calc((100vw - 1100px)/2)) clamp(3rem,7vw,5rem)' }}>
        <Reveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(240px,28%,320px) 1fr',
            gap: 'clamp(1.5rem,4vw,2.5rem)',
            alignItems: 'start',
          }}>

            {/* Left : channel cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {channels.map(({ Icon, title, detail, href }) => (
                <div key={title} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: '1.1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-head)', marginBottom: 2 }}>{title}</p>
                    {href ? (
                      <a href={href} style={{ fontSize: '0.82rem', color: 'var(--accent)', textDecoration: 'none' }}>{detail}</a>
                    ) : (
                      <p style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>{detail}</p>
                    )}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '0.5rem', padding: '1rem 1.25rem', background: 'var(--accent-004)', border: '1px solid var(--accent-014)', borderRadius: 14 }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                  Vos informations ne sont utilisées que pour vous répondre. Elles ne sont jamais partagées.
                </p>
              </div>
            </div>

            {/* Right : form */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, padding: 'clamp(1.75rem,4vw,2.5rem)' }}>

              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--green)' }}>
                    <IcoCheckCircle size={28} />
                  </div>
                  <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-head)', marginBottom: '0.75rem' }}>
                    Merci, {firstName} !
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '2rem' }}>
                    Nous avons bien reçu votre message. Nous vous répondrons à <strong>{form.email}</strong> sous 24h ouvrées.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ nom: '', email: '', organisation: '', sujet: '', message: '' }); }}
                    style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)', padding: '0.65rem 1.5rem', borderRadius: 10, cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="Nom complet" required>
                      <input style={fieldBase} type="text" required value={form.nom} onChange={set('nom')}
                        placeholder="Prénom et Nom" onFocus={focusIn} onBlur={focusOut} />
                    </Field>
                    <Field label="Email" required>
                      <input style={fieldBase} type="email" required value={form.email} onChange={set('email')}
                        placeholder="vous@entreprise.com" onFocus={focusIn} onBlur={focusOut} />
                    </Field>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="Organisation">
                      <input style={fieldBase} type="text" value={form.organisation} onChange={set('organisation')}
                        placeholder="Nom de l'entreprise" onFocus={focusIn} onBlur={focusOut} />
                    </Field>
                    <Field label="Sujet">
                      <select style={{ ...fieldBase, cursor: 'pointer' }} value={form.sujet} onChange={set('sujet')} onFocus={focusIn} onBlur={focusOut}>
                        {SUJET_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label="Message" required>
                    <textarea
                      style={{ ...fieldBase, minHeight: 140, resize: 'vertical' }}
                      required
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Décrivez votre besoin ou votre question..."
                      onFocus={focusIn}
                      onBlur={focusOut}
                    />
                  </Field>

                  {status === 'error' && (
                    <p style={{ fontSize: '0.82rem', color: '#ef4444', padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', margin: 0 }}>
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary"
                    style={{
                      alignSelf: 'flex-start',
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '0.8rem 1.75rem', borderRadius: 10,
                      background: 'var(--accent)', color: '#07111f', border: 'none',
                      fontSize: '0.9rem', cursor: status === 'loading' ? 'wait' : 'pointer',
                      opacity: status === 'loading' ? 0.7 : 1,
                    }}
                  >
                    {status === 'loading' ? 'Envoi en cours…' : <><span>Envoyer le message</span><IcoArrow size={16} /></>}
                  </button>

                </form>
              )}
            </div>
          </div>
        </Reveal>
      </section>

    </main>
    </PublicLayout>
  );
}
