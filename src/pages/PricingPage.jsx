import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NumberFlow from '@number-flow/react'
import confetti from 'canvas-confetti'
import PublicLayout from '../components/layout/PublicLayout'
import { Reveal, IcoCheck, IcoX, IcoArrow, IcoChevron } from '../components/shared'

const PLANS = [
  {
    name: 'Gratuit', tag: 'COMMUNITY', price: 0, yearlyPrice: 0,
    desc: 'Pour démarrer sans engagement.',
    cta: 'Créer un compte gratuit', ctaHref: 'https://app.dencu.online/register',
    features: [
      { label: 'Mots de passe illimités',     ok: true },
      { label: '150 générations / mois',      ok: true },
      { label: '5 partages actifs',           ok: true },
      { label: '5 secrets dans le coffre',    ok: true },
      { label: '5 certificats SSL/TLS',       ok: true },
      { label: 'Extension Chrome',            ok: true },
      { label: '2FA TOTP',                    ok: true },
      { label: 'Passphrase africaine',        ok: false },
      { label: 'Partages illimités',          ok: false },
      { label: 'Secrets illimités',           ok: false },
      { label: 'Équipes & groupes',           ok: false },
      { label: 'Active Directory (LDAP)',     ok: false },
      { label: 'SIEM / Syslog',              ok: false },
    ],
  },
  {
    name: 'Pro', tag: 'POPULAIRE', price: 2000, yearlyPrice: 1600,
    desc: 'Pour les professionnels qui ne comptent pas.',
    cta: 'Passer en Pro', ctaHref: 'https://app.dencu.online/register',
    isPopular: true,
    features: [
      { label: 'Mots de passe illimités',     ok: true },
      { label: 'Générateur illimité',         ok: true },
      { label: 'Partages illimités',          ok: true },
      { label: 'Secrets illimités',           ok: true },
      { label: 'Certificats illimités',       ok: true },
      { label: 'Extension Chrome',            ok: true },
      { label: '2FA TOTP',                    ok: true },
      { label: 'Passphrase africaine',        ok: true },
      { label: 'Support prioritaire',         ok: true },
      { label: 'Équipes & groupes',           ok: false },
      { label: 'Active Directory (LDAP)',     ok: false },
      { label: 'SIEM / Syslog',              ok: false },
    ],
  },
  {
    name: 'Enterprise', tag: 'ORGANISATIONS', price: null, yearlyPrice: null,
    desc: 'Pour les équipes et organisations.',
    cta: 'Nous contacter', ctaHref: 'mailto:mouhamadoumoustapha.dione@dencu.online',
    features: [
      { label: 'Tout du plan Pro',            ok: true },
      { label: 'Équipes & groupes',           ok: true },
      { label: 'Active Directory (LDAP)',     ok: true },
      { label: 'Audit organisation',          ok: true },
      { label: 'SIEM / Syslog',              ok: true },
      { label: 'Déploiement On-Premise',      ok: true },
      { label: 'Licence + support dédié',    ok: true },
      { label: 'SLA personnalisé',            ok: true },
      { label: 'Période de grâce 7 jours',   ok: true },
    ],
  },
]

const EDITIONS = [
  {
    tag: 'COMMUNITY', sub: 'Pour les particuliers',
    desc: 'Gérez vos mots de passe personnels, secrets et certificats. Gratuit avec des limites raisonnables, illimité en mode Pro.',
    items: ['Mots de passe illimités', 'Générateur (150/mois en gratuit)', 'Coffre secrets (5 en gratuit)', 'Certificats (5 en gratuit)', 'Extension Chrome incluse', 'Pro à 2 000 FCFA/mois'],
  },
  {
    tag: 'ENTERPRISE SAAS', sub: 'Pour les organisations',
    desc: 'Gestion centralisée pour vos équipes. Licence managée par DencPass avec support dédié et suivi d\'activité complet.',
    items: ["Tout de l'édition Community", 'Équipes & groupes', "Audit d'activité", 'Période de grâce 7 jours', 'Licence managée', 'Support dédié'],
    cta: 'Demander un devis',
  },
  {
    tag: 'ENTERPRISE ON-PREMISE', sub: 'Déployé sur votre infrastructure',
    desc: 'Installez DencPass sur vos propres serveurs. Vos données restent sur site, sous votre contrôle total.',
    items: ["Tout de l'édition SaaS", 'Données 100% sur site', 'Intégration LDAP / AD', 'Docker ou bare metal', 'Licence annuelle sur devis', 'Maintenance incluse'],
    cta: 'Demander un devis',
  },
]

const PRICING_FAQS = [
  { q: 'Puis-je changer de plan à tout moment ?', a: 'Oui. Vous pouvez passer à Pro à tout moment depuis votre espace. La facturation est au mois, sans engagement annuel. Pour revenir au plan gratuit, aucune action nécessaire — votre plan Pro expire naturellement à la fin de la période payée.' },
  { q: 'Y a-t-il un essai gratuit pour le plan Pro ?', a: 'Le plan Gratuit (Community) est permanent et déjà très complet. Plutôt qu\'un essai Pro limité dans le temps, nous préférons que vous utilisiez le plan gratuit sans limite de durée, puis passiez à Pro quand vous avez besoin des fonctionnalités avancées.' },
  { q: 'Comment fonctionne le paiement en FCFA ?', a: 'Paiement par virement bancaire ou mobile money (Wave, Orange Money). Pour les plans Enterprise, nous émettons un devis en FCFA avec les modalités adaptées à votre organisation.' },
  { q: 'Que se passe-t-il à l\'expiration d\'une licence Enterprise ?', a: 'Un délai de grâce de 7 jours s\'applique automatiquement. Pendant cette période, les fonctionnalités Enterprise restent actives. Passé ce délai, l\'organisation passe au plan Community jusqu\'à renouvellement.' },
  { q: 'Le déploiement On-Premise est-il possible pour les PME ?', a: 'Oui. L\'Enterprise On-Premise s\'installe via Docker ou bare metal sur votre propre infrastructure. Il n\'y a pas de minimum de sièges fixe — contactez-nous pour un devis adapté à votre taille.' },
]

function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
      {faqs.map((faq, i) => (
        <Reveal key={i} delay={i * 50}>
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
  )
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)
  const switchRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    document.title = 'Tarifs — DencPass'
    const mq = window.matchMedia('(min-width: 900px)')
    setIsDesktop(mq.matches)
    const h = e => setIsDesktop(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const handleToggle = val => {
    setYearly(val)
    if (val && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect()
      confetti({
        particleCount: 70, spread: 65,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
        colors: ['#2fd9f4', '#8b5cf6', '#f59e0b', '#22c55e'],
        ticks: 220, gravity: 1.2, decay: 0.94, startVelocity: 28, shapes: ['circle'],
      })
    }
  }

  const cardTransform = (p, i) => {
    if (!isDesktop) return 'none'
    if (p.isPopular) return 'translateY(-20px)'
    return i === 0 ? 'translateX(10px)' : 'translateX(-10px)'
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: '4rem', background: 'var(--bg)', textAlign: 'center', padding: '120px max(1.5rem, calc((100% - 1200px) / 2)) 4rem' }} className="section-pad">
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>TARIFS</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.5rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>
            Simple. Transparent. En FCFA.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text3)', maxWidth: 480, margin: '0 auto 2.5rem' }}>
            Pas de conversion, pas de frais cachés. Payez directement en francs CFA.
          </p>
          {/* Toggle mensuel / annuel */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: yearly ? 400 : 600, color: yearly ? 'var(--text4)' : 'var(--text)', transition: 'all 0.2s', fontFamily: "'Inter', sans-serif" }}>Mensuel</span>
            <button ref={switchRef} role="switch" aria-checked={yearly} onClick={() => handleToggle(!yearly)}
              style={{ width: 50, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', position: 'relative', background: yearly ? '#2fd9f4' : 'rgba(47,217,244,0.2)', transition: 'background 0.28s', flexShrink: 0 }}>
              <span style={{ position: 'absolute', top: 4, left: yearly ? 26 : 4, width: 20, height: 20, borderRadius: '50%', background: yearly ? '#07111f' : 'var(--text2)', transition: 'left 0.28s cubic-bezier(0.34,1.56,0.64,1)', display: 'block' }} />
            </button>
            <span style={{ fontSize: 14, fontWeight: yearly ? 600 : 400, color: yearly ? 'var(--text)' : 'var(--text4)', transition: 'all 0.2s', fontFamily: "'Inter', sans-serif" }}>
              Annuel <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 13 }}>−20%</span>
            </span>
          </div>
        </Reveal>
      </section>

      {/* Plans */}
      <section style={{ padding: '0 max(1.5rem, calc((100% - 1200px) / 2)) 7rem', background: 'var(--bg)' }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', alignItems: 'stretch', paddingTop: 28 }}>
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 100} style={{ height: '100%' }}>
                <div style={{ transform: cardTransform(p, i), transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)', height: '100%' }}>
                  <div className="price-card" style={{
                    position: 'relative', padding: '2.25rem', borderRadius: 20,
                    border: p.isPopular ? '1px solid rgba(47,217,244,0.45)' : '1px solid rgba(47,217,244,0.1)',
                    background: 'var(--bg-card)',
                    overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column',
                    boxShadow: p.isPopular ? '0 24px 64px rgba(47,217,244,0.1)' : 'none',
                  }}>
                    {p.isPopular && <div style={{ position: 'absolute', inset: 0, background: 'rgba(47,217,244,0.03)', pointerEvents: 'none' }} />}
                    {p.isPopular && <div style={{ position: 'absolute', top: -60, right: -60, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,217,244,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />}
                    {p.isPopular && <div style={{ position: 'absolute', top: 0, right: 20, background: '#2fd9f4', color: '#07111f', fontSize: 9, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '0 0 8px 8px', zIndex: 1 }}>POPULAIRE</div>}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: p.isPopular ? 'linear-gradient(90deg,#2fd9f4,rgba(47,217,244,0.2))' : 'linear-gradient(90deg,rgba(47,217,244,0.2),transparent)', pointerEvents: 'none' }} />

                    <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#2fd9f4', letterSpacing: '0.14em', marginBottom: '0.5rem', opacity: p.isPopular ? 1 : 0.7 }}>{p.tag}</p>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: '1rem' }}>{p.name}</p>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                        {p.price !== null ? (
                          <NumberFlow
                            value={yearly ? p.yearlyPrice : p.price}
                            format={{ useGrouping: true }}
                            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 36, color: 'var(--text)', letterSpacing: '-0.04em' }}
                          />
                        ) : (
                          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 26, color: 'var(--text)', letterSpacing: '-0.04em' }}>Sur devis</span>
                        )}
                        {p.price !== null && p.price > 0 && <span style={{ fontSize: 12, color: 'var(--text4)' }}>FCFA / mois</span>}
                      </div>

                      <div style={{ height: 18, marginBottom: '0.75rem' }}>
                        {yearly && p.price > 0 && (
                          <span style={{ fontSize: 11, color: '#22c55e', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>
                            Économisez {((p.price - p.yearlyPrice) * 12).toLocaleString('fr-FR')} FCFA/an
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{p.desc}</p>

                      <a href={p.ctaHref} style={{
                        display: 'block', textAlign: 'center', padding: '12px 0', borderRadius: 11,
                        fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
                        marginBottom: '1.5rem', transition: 'all 0.2s',
                        ...(p.isPopular
                          ? { background: '#2fd9f4', color: '#07111f', boxShadow: '0 4px 20px rgba(47,217,244,0.28)' }
                          : p.price === null
                            ? { background: 'rgba(47,217,244,0.06)', border: '1px solid rgba(47,217,244,0.25)', color: '#2fd9f4' }
                            : { background: 'transparent', border: '1px solid rgba(47,217,244,0.2)', color: 'var(--text3)' })
                      }}>
                        {p.cta}
                      </a>

                      <div style={{ borderTop: '1px solid rgba(47,217,244,0.1)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                        {p.features.map(f => (
                          <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: f.ok ? 'var(--text2)' : 'var(--text5)', opacity: f.ok ? 1 : 0.55 }}>
                            <span style={{ color: f.ok ? '#2fd9f4' : 'var(--text5)', flexShrink: 0, marginTop: 1 }}>
                              {f.ok ? <IcoCheck /> : <IcoX />}
                            </span>
                            {f.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editions */}
      <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>ÉDITIONS</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Une solution pour chaque besoin</h2>
            </div>
          </Reveal>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', alignItems: 'stretch' }}>
            {EDITIONS.map((ed, i) => (
              <Reveal key={ed.tag} delay={i * 120} style={{ height: '100%' }}>
                <div className="price-card" style={{ padding: '2.25rem', borderRadius: 20, border: '1px solid rgba(47,217,244,0.1)', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,rgba(47,217,244,0.35),transparent)', pointerEvents: 'none' }} />
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#2fd9f4', letterSpacing: '0.14em', marginBottom: '0.25rem', opacity: 0.8 }}>{ed.tag}</p>
                  <p style={{ fontSize: 12, color: 'var(--text4)', marginBottom: '1rem' }}>{ed.sub}</p>
                  <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{ed.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                    {ed.items.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'var(--text2)' }}>
                        <span style={{ color: 'rgba(47,217,244,0.6)', flexShrink: 0 }}><IcoCheck /></span>{f}
                      </li>
                    ))}
                  </ul>
                  {ed.cta && (
                    <a href="mailto:mouhamadoumoustapha.dione@dencu.online" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: '1.5rem', fontSize: 13, fontWeight: 600, color: '#2fd9f4' }}>
                      {ed.cta} <IcoArrow size={13} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ tarifaire */}
      <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>FAQ TARIFAIRE</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,2.5rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Questions sur les tarifs</h2>
            </div>
          </Reveal>
          <FAQAccordion faqs={PRICING_FAQS} />
          <Reveal delay={300}>
            <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', borderRadius: 16, border: '1px solid rgba(47,217,244,0.12)', background: 'rgba(47,217,244,0.03)' }}>
              <p style={{ fontSize: 15, color: 'var(--text3)', marginBottom: '1rem' }}>Une question sur les plans Enterprise ?</p>
              <a href="mailto:mouhamadoumoustapha.dione@dencu.online"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 10, background: '#2fd9f4', color: '#07111f', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                Contacter l'équipe <IcoArrow />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  )
}
