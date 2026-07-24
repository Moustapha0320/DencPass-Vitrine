import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import PublicLayout from '../components/layout/PublicLayout';
import { Reveal, IcoCheck, IcoX, IcoArrow, IcoChevron, IcoCloud, IcoServer } from '../components/shared';

const freeFeatures = [
  { label: 'Mots de passe illimités',   ok: true  },
  { label: '50 générations / mois',     ok: true  },
  { label: 'Passphrase africaine',       ok: true  },
  { label: '5 partages actifs',          ok: true  },
  { label: '5 secrets dans le coffre',   ok: true  },
  { label: '5 certificats SSL/TLS',      ok: true  },
  { label: 'Extension Chrome',           ok: true  },
  { label: '2FA TOTP',                   ok: true  },
  { label: 'Partages illimités',         ok: false },
  { label: 'Secrets illimités',          ok: false },
  { label: 'Équipes & groupes',          ok: false },
  { label: 'Active Directory (LDAP)',    ok: false },
  { label: 'SIEM / Syslog',             ok: false },
];
const proFeatures = [
  { label: 'Mots de passe illimités',   ok: true },
  { label: 'Générateur illimité',        ok: true },
  { label: 'Partages illimités',         ok: true },
  { label: 'Secrets illimités',          ok: true },
  { label: 'Certificats illimités',      ok: true },
  { label: 'Extension Chrome',           ok: true },
  { label: '2FA TOTP',                   ok: true },
  { label: 'Passphrase africaine',       ok: true },
  { label: 'Support prioritaire',        ok: true },
  { label: 'Équipes & groupes',          ok: false },
  { label: 'Active Directory (LDAP)',    ok: false },
  { label: 'SIEM / Syslog',             ok: false },
];

const cloudFeatures = [
  'Tout le plan Pro',
  'Équipes & groupes',
  'SIEM / Syslog',
  'Audit complet',
  'Support dédié',
];
const onPremFeatures = [
  'Tout le plan Pro',
  '100% sur votre infra',
  'Docker / bare-metal',
  'LDAP / Active Directory',
  'Licence annuelle + maintenance',
];

const faqs = [
  {
    q: 'Puis-je payer en FCFA ?',
    a: 'Oui. Tous nos tarifs sont libellés en Francs CFA (XOF). Aucune conversion ni frais de change — ce que vous voyez est ce que vous payez.',
  },
  {
    q: 'Quelle est la différence entre Enterprise Cloud et On-Premise ?',
    a: 'Enterprise Cloud est hébergé et maintenu par nos équipes — vous démarrez immédiatement. Enterprise On-Premise se déploie dans votre datacenter (Docker ou bare-metal) pour un contrôle total de vos données.',
  },
  {
    q: 'Puis-je changer de plan à tout moment ?',
    a: 'Oui, vous pouvez passer au plan supérieur quand vous le souhaitez. Le changement prend effet immédiatement avec facturation au prorata.',
  },
  {
    q: 'Y a-t-il une réduction pour le plan annuel ?',
    a: 'Oui — le plan Pro annuel revient à 1 600 FCFA/mois, soit 20 % de réduction par rapport à la facturation mensuelle.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.1rem 0', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.95rem',
          color: 'var(--text-head)', textAlign: 'left', gap: 16,
        }}
      >
        {q}
        <span style={{ color: 'var(--accent)', flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <IcoChevron size={18} />
        </span>
      </button>
      {open && <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.7, paddingBottom: '1.1rem' }}>{a}</p>}
    </div>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const toggleRef = useRef(null);

  function handleToggle(toAnnual) {
    setAnnual(toAnnual);
    if (toAnnual && toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      confetti({
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
        spread: 60, startVelocity: 22, particleCount: 60, scalar: 0.8,
        colors: ['#2fd9f4', '#8b5cf6', '#f0e4c4', '#22c55e'],
      });
    }
  }

  const proMonthly = 2000;
  const proAnnual  = 1600;

  return (
    <PublicLayout>
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section style={{
        padding: 'clamp(5rem,12vw,8rem) max(1.25rem, calc((100vw - 900px)/2)) clamp(2rem,4vw,3rem)',
        background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(47,217,244,0.07) 0%, transparent 70%)',
        textAlign: 'center',
      }}>
        <Reveal>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '1.25rem' }}>
            Tarifs
          </span>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.25rem)', color: 'var(--text-head)', lineHeight: 1.15, marginBottom: '1rem' }}>
            Simple. Transparent. En FCFA.
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text2)', maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Choisissez le plan adapté à votre usage. Pas de frais cachés, pas de conversion.
          </p>

          {/* Toggle */}
          <div ref={toggleRef} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 30, padding: '4px' }}>
            <button
              onClick={() => handleToggle(false)}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: 24, border: 'none', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
                background: !annual ? 'var(--accent)' : 'transparent',
                color: !annual ? '#07111f' : 'var(--text3)',
                transition: 'all 0.2s',
              }}
            >
              Mensuel
            </button>
            <button
              onClick={() => handleToggle(true)}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: 24, border: 'none', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
                background: annual ? 'var(--accent)' : 'transparent',
                color: annual ? '#07111f' : 'var(--text3)',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              Annuel
              <span style={{ fontSize: '0.7rem', background: 'rgba(34,197,94,0.15)', color: 'var(--green)', padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>
                −20 %
              </span>
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── Pricing groups ── */}
      <section style={{ padding: '1.5rem max(1.25rem, calc((100vw - 1100px)/2)) clamp(2.5rem,6vw,4rem)' }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))', gap: '1.5rem', alignItems: 'stretch' }}>

            {/* Group 1: Individuel */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border2)',
              borderTop: '3px solid var(--accent)',
              borderRadius: 20,
              padding: '1.75rem',
            }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase' }}>
                  Usage individuel
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Gratuit */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-head)' }}>Gratuit</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: 'var(--text-head)' }}>0</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text3)' }}>FCFA/mois</span>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {freeFeatures.map(({ label, ok }) => (
                      <li key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: ok ? 'var(--text2)' : 'var(--text4)' }}>
                        <span style={{ color: ok ? 'var(--green)' : 'var(--text4)', flexShrink: 0 }}>
                          {ok ? <IcoCheck size={14} /> : <IcoX size={14} />}
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                  <a href="https://app.dencpass.com" target="_blank" rel="noopener noreferrer" style={{
                    display: 'block', textAlign: 'center', padding: '0.65rem', borderRadius: 9,
                    background: 'transparent', border: '1px solid var(--border2)',
                    fontSize: '0.82rem', fontWeight: 600, color: 'var(--text2)',
                    fontFamily: 'Space Grotesk, sans-serif', marginTop: 'auto',
                  }}>
                    Commencer
                  </a>
                </div>

                {/* Pro */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-head)' }}>Pro</h3>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, background: 'var(--accent)', color: '#07111f', padding: '2px 8px', borderRadius: 20, letterSpacing: '0.05em' }}>
                      POPULAIRE
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: 'var(--text-head)' }}>
                      {annual ? proAnnual.toLocaleString('fr-FR') : proMonthly.toLocaleString('fr-FR')}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text3)' }}>FCFA/mois</span>
                  </div>
                  {annual && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>facturation annuelle</span>
                  )}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {proFeatures.map(({ label }) => (
                      <li key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--text2)' }}>
                        <span style={{ color: 'var(--green)', flexShrink: 0 }}><IcoCheck size={14} /></span>
                        {label}
                      </li>
                    ))}
                  </ul>
                  <a href="https://app.dencpass.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
                    display: 'block', textAlign: 'center', padding: '0.65rem', borderRadius: 9,
                    background: 'var(--accent)', border: 'none',
                    fontSize: '0.82rem', fontWeight: 700, color: '#07111f',
                    fontFamily: 'Space Grotesk, sans-serif', marginTop: 'auto',
                  }}>
                    S'abonner
                  </a>
                </div>
              </div>
            </div>

            {/* Group 2: Enterprise */}
            <div style={{
              background: 'rgba(139,92,246,0.06)',
              border: '1px solid var(--purple-025)',
              borderTop: '3px solid var(--purple)',
              borderRadius: 20,
              padding: '1.75rem',
            }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--purple)', textTransform: 'uppercase' }}>
                  Organisations · Enterprise
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Enterprise Cloud */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--purple)' }}><IcoCloud size={16} /></span>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1rem', color: 'var(--text-head)' }}>Enterprise Cloud</h3>
                  </div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-head)' }}>
                    Sur devis
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {cloudFeatures.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--text2)' }}>
                        <span style={{ color: 'var(--purple)', flexShrink: 0 }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className="btn-primary" style={{
                    display: 'block', textAlign: 'center', padding: '0.65rem', borderRadius: 9,
                    background: 'var(--purple)', border: 'none',
                    fontSize: '0.82rem', fontWeight: 700, color: '#fff',
                    fontFamily: 'Space Grotesk, sans-serif', marginTop: 'auto',
                  }}>
                    Nous contacter
                  </a>
                </div>

                {/* Enterprise On-Premise */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--purple)' }}><IcoServer size={16} /></span>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1rem', color: 'var(--text-head)' }}>On-Premise</h3>
                  </div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-head)' }}>
                    Sur devis
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {onPremFeatures.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--text2)' }}>
                        <span style={{ color: 'var(--purple)', flexShrink: 0 }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact" className="btn-primary" style={{
                    display: 'block', textAlign: 'center', padding: '0.65rem', borderRadius: 9,
                    background: 'var(--purple)', border: 'none',
                    fontSize: '0.82rem', fontWeight: 700, color: '#fff',
                    fontFamily: 'Space Grotesk, sans-serif', marginTop: 'auto',
                  }}>
                    Demander un devis
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--text3)' }}>
            Tous les plans incluent le chiffrement AES-256-GCM et la vérification HIBP k-anonymat.
          </p>
        </Reveal>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: 'clamp(2.5rem,6vw,4rem) max(1.25rem, calc((100vw - 760px)/2))' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.3rem,3vw,1.75rem)', color: 'var(--text-head)', marginBottom: '1.75rem', textAlign: 'center' }}>
            Questions fréquentes
          </h2>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 18, padding: '0 1.75rem' }}>
            {faqs.map(faq => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(3rem,7vw,4.5rem) max(1.25rem, calc((100vw - 1100px)/2))', textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem,3.5vw,2.25rem)', color: 'var(--text-head)', marginBottom: '1rem' }}>
            Vous avez des besoins spécifiques ?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text2)', maxWidth: 460, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Notre équipe est disponible pour un chiffrage personnalisé et une démonstration.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn-primary" style={{
              background: 'var(--accent)', color: '#07111f', border: 'none',
              padding: '0.85rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Contacter l'équipe <IcoArrow size={16} />
            </a>
            <a href="https://app.dencpass.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
              background: 'transparent', color: 'var(--text)',
              border: '1px solid var(--border2)',
              padding: '0.85rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
            }}>
              Essayer gratuitement
            </a>
          </div>
        </Reveal>
      </section>

    </main>
    </PublicLayout>
  );
}
