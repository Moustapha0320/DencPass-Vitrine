import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import PublicLayout from '../components/layout/PublicLayout';
import { Reveal, IcoCheck, IcoX, IcoArrow, IcoChevron } from '../components/shared';

/* ── Data ─────────────────────────────────────────── */
const groups = [
  {
    id: 'individuel',
    dot: 'var(--accent)',
    label: 'USAGE INDIVIDUEL',
    sub: 'Pour vous, en solo ou en freelance.',
    borderColor: 'var(--border2)',
    borderTop: 'var(--accent)',
    plans: [
      {
        tag: 'COMMUNITY',
        tagColor: 'var(--accent)',
        tagBg: 'var(--accent-014)',
        badge: null,
        title: 'Gratuit',
        priceKey: 'free',
        desc: 'Pour démarrer sans engagement.',
        cta: { label: 'Créer un compte', href: 'https://app.dencpass.com', external: true, style: 'outline' },
        accent: 'var(--accent)',
        features: [
          { label: 'Mots de passe illimités',     ok: true  },
          { label: '50 générations / mois',        ok: true  },
          { label: 'Passphrase africaine',          ok: true  },
          { label: '5 partages · 5 secrets',        ok: true  },
          { label: 'Extension Chrome · 2FA',        ok: true  },
          { label: 'Vérification HIBP (1 fois)',     ok: true  },
          { label: 'Partages & secrets illimités',  ok: false },
        ],
      },
      {
        tag: 'POPULAIRE',
        tagColor: 'var(--accent)',
        tagBg: 'var(--accent-014)',
        badge: 'POPULAIRE',
        title: 'Pro',
        priceKey: 'pro',
        desc: "Pour les professionnels qui ne comptent pas.",
        cta: { label: 'Passer en Pro', href: 'https://app.dencpass.com', external: true, style: 'accent' },
        accent: 'var(--accent)',
        features: [
          { label: 'Tout du plan Gratuit',           ok: true },
          { label: 'Générateur illimité',             ok: true },
          { label: 'Partages illimités',              ok: true },
          { label: 'Secrets & certificats illimités', ok: true },
          { label: 'Analyses HIBP illimitées',        ok: true },
          { label: 'Support prioritaire',             ok: true },
        ],
      },
    ],
  },
  {
    id: 'enterprise',
    dot: 'var(--purple)',
    label: 'ORGANISATIONS · ENTERPRISE',
    sub: 'Pour les équipes et les déploiements internes.',
    borderColor: 'var(--purple-025)',
    borderTop: 'var(--purple)',
    plans: [
      {
        tag: 'SAAS MANAGÉ',
        tagColor: 'var(--purple)',
        tagBg: 'var(--purple-06)',
        badge: null,
        title: 'Enterprise Cloud',
        priceKey: 'cloud',
        desc: 'Licence managée par DencPass, gestion centralisée pour vos équipes.',
        cta: { label: 'Demander un devis', href: '/contact', external: false, style: 'purple' },
        accent: 'var(--purple)',
        features: [
          { label: 'Tout du plan Pro',    ok: true },
          { label: 'Équipes & groupes',   ok: true },
          { label: 'SIEM / Syslog',       ok: true },
          { label: 'Audit organisation',  ok: true },
          { label: 'Support dédié',       ok: true },
        ],
      },
      {
        tag: 'SUR VOTRE INFRA',
        tagColor: 'var(--purple)',
        tagBg: 'var(--purple-06)',
        badge: null,
        title: 'Enterprise On-Premise',
        priceKey: 'onprem',
        desc: 'Installez DencPass sur vos serveurs. Vos données restent sur site, sous votre contrôle.',
        cta: { label: 'Demander un devis', href: '/contact', external: false, style: 'purple' },
        accent: 'var(--purple)',
        features: [
          { label: "Tout de l'édition Cloud", ok: true },
          { label: 'Données 100% sur site',    ok: true },
          { label: 'Docker ou bare metal',     ok: true },
          { label: 'Intégration LDAP / AD',    ok: true },
          { label: 'Licence annuelle',          ok: true },
          { label: 'Maintenance incluse',       ok: true },
        ],
      },
    ],
  },
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

/* ── Subcomponents ────────────────────────────────── */
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

function PlanCard({ plan, annual, accentOverride }) {
  const { tag, tagColor, tagBg, badge, title, priceKey, desc, cta, accent, features } = plan;

  const prices = { free: [0, 0], pro: [2000, 1600], cloud: null, onprem: null };
  const priceArr = prices[priceKey];
  const price = priceArr ? (annual ? priceArr[1] : priceArr[0]) : null;

  const btnStyle = {
    display: 'block', width: '100%', textAlign: 'center',
    padding: '0.7rem 1rem', borderRadius: 10,
    fontSize: '0.875rem', fontWeight: 700,
    fontFamily: 'Space Grotesk, sans-serif',
    cursor: 'pointer', border: 'none',
    transition: 'opacity 0.2s',
  };

  const styles = {
    accent: { background: 'var(--accent)', color: '#07111f' },
    purple: { background: 'var(--purple)', color: '#fff' },
    outline: { background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)' },
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid ${accentOverride === 'var(--purple)' ? 'var(--purple-025)' : 'var(--border2)'}`,
      borderRadius: 16,
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.9rem',
      position: 'relative',
    }}>
      {/* Badge flottant */}
      {badge && (
        <div style={{
          position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--accent)', color: '#07111f',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.64rem', fontWeight: 800,
          letterSpacing: '0.1em', padding: '3px 12px', borderRadius: 20,
          whiteSpace: 'nowrap',
        }}>
          {badge}
        </div>
      )}

      {/* Tag */}
      <span style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.64rem', fontWeight: 700,
        letterSpacing: '0.1em', color: tagColor, background: tagBg,
        padding: '3px 8px', borderRadius: 6, alignSelf: 'flex-start',
        textTransform: 'uppercase',
      }}>
        {tag}
      </span>

      {/* Title */}
      <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-head)', margin: 0 }}>
        {title}
      </h3>

      {/* Price */}
      {price !== null ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'var(--text-head)', lineHeight: 1 }}>
              {price.toLocaleString('fr-FR')}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>FCFA / mois</span>
          </div>
          {annual && priceKey === 'pro' && (
            <p style={{ fontSize: '0.72rem', color: 'var(--text4)', marginTop: 2 }}>facturation annuelle</p>
          )}
        </div>
      ) : (
        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: accentOverride || accent, margin: 0 }}>
          Sur devis
        </p>
      )}

      {/* Desc */}
      <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.55, margin: 0 }}>{desc}</p>

      {/* CTA */}
      {cta.external ? (
        <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ ...btnStyle, ...styles[cta.style] }}>
          {cta.label}
        </a>
      ) : (
        <a href={cta.href} className="btn-primary" style={{ ...btnStyle, ...styles[cta.style] }}>
          {cta.label}
        </a>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)' }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {features.map(({ label, ok }) => (
          <li key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: ok ? 'var(--text2)' : 'var(--text4)' }}>
            <span style={{ color: ok ? accentOverride || accent : 'var(--text4)', flexShrink: 0, marginTop: 1 }}>
              {ok ? <IcoCheck size={14} /> : <IcoX size={14} />}
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────── */
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

          {/* Toggle mensuel / annuel */}
          <div ref={toggleRef} style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 30, padding: '4px' }}>
            <button onClick={() => handleToggle(false)} style={{
              padding: '0.45rem 1.1rem', borderRadius: 24, border: 'none', cursor: 'pointer',
              fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
              background: !annual ? 'var(--accent)' : 'transparent',
              color: !annual ? '#07111f' : 'var(--text3)', transition: 'all 0.2s',
            }}>
              Mensuel
            </button>
            <button onClick={() => handleToggle(true)} style={{
              padding: '0.45rem 1.1rem', borderRadius: 24, border: 'none', cursor: 'pointer',
              fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
              background: annual ? 'var(--accent)' : 'transparent',
              color: annual ? '#07111f' : 'var(--text3)', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              Annuel
              <span style={{ fontSize: '0.68rem', background: 'rgba(34,197,94,0.15)', color: 'var(--green)', padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>
                −20 %
              </span>
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── Grille des plans ── */}
      <section style={{ padding: '1.5rem max(1.25rem, calc((100vw - 1160px)/2)) clamp(2.5rem,6vw,4rem)' }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {groups.map(group => (
              <div key={group.id} style={{
                background: group.id === 'enterprise' ? 'rgba(139,92,246,0.04)' : 'transparent',
                border: `1px solid ${group.borderColor}`,
                borderTop: `3px solid ${group.borderTop}`,
                borderRadius: 20,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}>
                {/* En-tête groupe */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: '0.4rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: group.dot, flexShrink: 0, display: 'inline-block' }} />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: group.dot, textTransform: 'uppercase' }}>
                      {group.label}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text2)' }}>{group.sub}</p>
                </div>

                {/* Plans 2 colonnes */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                  {group.plans.map(plan => (
                    <PlanCard
                      key={plan.title}
                      plan={plan}
                      annual={annual}
                      accentOverride={group.dot}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text3)' }}>
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
