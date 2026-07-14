import { useState, useEffect } from 'react'
import PublicLayout from '../components/layout/PublicLayout'
import { Reveal, IcoArrow, IcoChevron, IcoCheck, IcoShield, IcoPhone, IcoEye, IcoServer, IcoActivity } from '../components/shared'

const PILLARS = [
  {
    Icon: IcoShield, accent: '#2fd9f4',
    title: 'Chiffrement AES-256-GCM',
    desc: 'Chaque entrée est chiffrée individuellement avant tout stockage. Les données en base de données sont illisibles sans les clés serveur.',
    details: [
      'Algorithme : AES-256-GCM (chiffrement authentifié)',
      'Nonce aléatoire unique par chiffrement',
      'Rotation des clés avec identifiant kid sans interruption',
      'Backups chiffrés au même standard',
    ],
  },
  {
    Icon: IcoPhone, accent: '#8b5cf6',
    title: 'Authentification 2FA TOTP',
    desc: 'Double authentification compatible avec tous les authenticateurs standard du marché.',
    details: [
      'Compatible Google Authenticator, Authy, 1Password',
      'Secret TOTP chiffré au repos côté serveur',
      'Codes à 6 chiffres, rotation toutes les 30 secondes',
      'Impossible de contourner sans accès physique au device',
    ],
  },
  {
    Icon: IcoEye, accent: '#22c55e',
    title: 'Protection contre les fuites',
    desc: 'Une fuite de base de données n\'expose aucun secret en clair, chaque entrée est chiffrée individuellement.',
    details: [
      'Chiffrement par entrée : une clé compromise n\'affecte pas les autres',
      'Identifiant kid par clé : rotation sans interruption de service',
      'Backups chiffrés au même standard AES-256-GCM',
      'Aucune donnée sensible stockée en clair',
    ],
  },
  {
    Icon: IcoActivity, accent: '#f59e0b',
    title: 'Audit & journalisation complète',
    desc: 'Chaque action est tracée dans des logs structurés, qui a accédé à quoi, quand, depuis où.',
    details: [
      'Logs structurés format JSON horodatés',
      'Export vers Splunk, Elastic via webhook HTTP',
      'Syslog RFC 5424 pour intégration SIEM',
      'Purge et rotation configurables par l\'admin',
    ],
  },
]

const INFRA = [
  { label: 'Hébergement', value: 'Cloud dédié', sub: 'Infrastructures conformes RGPD' },
  { label: 'Base de données', value: 'Chiffrée au repos', sub: 'Données + backups chiffrés' },
  { label: 'Transport', value: 'TLS 1.3', sub: 'HTTPS strict sur tous les endpoints' },
  { label: 'Backups', value: 'Quotidiens', sub: '3 derniers conservés, chiffrés AES-256-GCM' },
]

const SEC_FAQS = [
  { q: 'Que se passe-t-il si j\'oublie mon mot de passe principal ?', a: 'Un lien de réinitialisation est envoyé à votre adresse email, valable 1 heure. Après réinitialisation, toutes vos données restent intégralement accessibles, le chiffrement de vos secrets est indépendant de votre mot de passe de connexion.' },
  { q: 'Mes données sont-elles accessibles par les équipes DencPass ?', a: 'Non. Aucun membre de l\'équipe DencPass ne peut lire vos mots de passe, secrets ou certificats. Les seules données accessibles en interne sont les métadonnées de compte (email, date d\'inscription, logs de connexion).' },
  { q: 'Comment DencPass réagit en cas de fuite de données ?', a: 'En cas d\'incident, les utilisateurs concernés sont notifiés par email dans les 72 heures. Les données exposées étant chiffrées, une fuite de base de données n\'expose pas vos secrets en clair. Un rapport d\'incident est publié sous 30 jours.' },
  { q: 'L\'extension Chrome a-t-elle accès à tous les sites que je visite ?', a: 'L\'extension ne s\'active que sur les pages contenant des champs de formulaire identifiés comme des champs de connexion. Elle ne transmet aucune donnée de navigation à nos serveurs, le traitement de détection se fait localement dans le navigateur.' },
  { q: 'Comment signaler une vulnérabilité de sécurité ?', a: 'Contactez security@dencpass.com ou mouhamadoumoustapha.dione@dencu.online avec le détail de la vulnérabilité. Nous nous engageons à accuser réception sous 48 heures et à corriger les vulnérabilités critiques sous 72 heures.' },
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

export default function SecurityPage() {
  useEffect(() => { document.title = 'Sécurité | DencPass' }, [])

  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: '5rem', background: 'var(--bg)', textAlign: 'center', padding: '120px max(1.5rem, calc((100% - 1200px) / 2)) 5rem' }} className="section-pad">
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>SÉCURITÉ</p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem,5.5vw,4rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.25rem', lineHeight: 1.05 }}>
            Chiffrement militaire,<br />couche par couche.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text3)', maxWidth: 560, margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Vos données sont chiffrées avec AES-256-GCM avant d'être stockées. En cas de fuite de base de données, les données restent illisibles, le chiffrement est une garantie technique, pas une promesse marketing.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 100, border: '1px solid rgba(47,217,244,0.2)', background: 'rgba(47,217,244,0.05)' }}>
            <IcoShield size={16} style={{ color: '#2fd9f4' }} />
            <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: '#2fd9f4' }}>AES-256-GCM · Argon2id · TLS 1.3 · RGPD</span>
          </div>
        </Reveal>
      </section>

      {/* Zero-knowledge schema */}
      <section style={{ padding: '5rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>ARCHITECTURE</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>
                Comment vos données sont-elles protégées ?
              </h2>
            </div>
          </Reveal>
          {/* Schema steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { step: '1', title: 'Vous saisissez un mot de passe', detail: 'Sur app.dencu.online dans votre navigateur sécurisé (HTTPS strict).', color: '#2fd9f4', side: 'CLIENT' },
              { step: '2', title: 'Transmission chiffrée via TLS 1.3', detail: 'La donnée transite vers nos serveurs exclusivement via TLS 1.3, le protocole de transport le plus sûr actuellement disponible.', color: '#8b5cf6', side: 'RÉSEAU' },
              { step: '3', title: 'Chiffrement AES-256-GCM côté serveur', detail: 'Le serveur chiffre chaque entrée individuellement avec AES-256-GCM avant tout stockage.', color: '#22c55e', side: 'SERVEUR' },
              { step: '4', title: 'Stockage chiffré en base de données', detail: 'Seules des données chiffrées sont stockées. En cas de fuite de base de données, un attaquant ne récupère que des données illisibles sans les clés serveur.', color: '#f59e0b', side: 'STOCKAGE' },
            ].map(({ step, title, detail, color, side }) => (
              <Reveal key={step}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${color}14`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 16, color }}>{step}</span>
                    </div>
                    <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color, letterSpacing: '0.08em', opacity: 0.7 }}>{side}</span>
                  </div>
                  <div style={{ flex: 1, padding: '1rem 1.25rem', borderRadius: 14, border: `1px solid ${color}1a`, background: `${color}07` }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.4rem' }}>{title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7, margin: 0 }}>{detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Security pillars */}
      <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '3.5rem' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>MESURES TECHNIQUES</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Aucun compromis.</h2>
            </div>
          </Reveal>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {PILLARS.map(({ Icon, accent, title, desc, details }, i) => (
              <Reveal key={title} delay={(i % 2) * 100}>
                <div className="card-hover" style={{ padding: '2rem', borderRadius: 18, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${accent}12`, border: `1px solid ${accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, marginBottom: '1.25rem' }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.6rem' }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>{desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {details.map(d => (
                      <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text3)', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.6 }}>
                        <span style={{ color: accent, flexShrink: 0, marginTop: 2, display: 'flex' }}><IcoCheck size={11} /></span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section style={{ padding: '5rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '3rem' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>INFRASTRUCTURE</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Une infrastructure sécurisée de bout en bout.</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }} className="grid-2">
            {INFRA.map(({ label, value, sub }, i) => (
              <Reveal key={label} delay={i * 80}>
                <div style={{ padding: '1.5rem', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg-card)', textAlign: 'center' }}>
                  <p style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: '#2fd9f4', letterSpacing: '0.1em', marginBottom: '0.5rem', opacity: 0.7 }}>{label.toUpperCase()}</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text-head)', marginBottom: '0.3rem' }}>{value}</p>
                  <p style={{ fontSize: 12, color: 'var(--text5)' }}>{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div style={{ marginTop: '2rem', padding: '1.25rem 1.5rem', borderRadius: 12, border: '1px solid rgba(47,217,244,0.12)', background: 'rgba(47,217,244,0.04)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <IcoServer size={18} style={{ color: '#2fd9f4', flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: 'var(--text2)' }}>Conformité RGPD :</strong> Toutes les données personnelles sont traitées conformément au Règlement Général sur la Protection des Données. Droit d'accès, rectification et suppression sur demande à <a href="mailto:mouhamadoumoustapha.dione@dencu.online" style={{ color: '#2fd9f4' }}>mouhamadoumoustapha.dione@dencu.online</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bug bounty / contact sécurité */}
      <section style={{ padding: '5rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <div style={{ padding: '2.5rem', borderRadius: 20, border: '1px solid rgba(47,217,244,0.18)', background: 'linear-gradient(135deg, rgba(47,217,244,0.04) 0%, rgba(139,92,246,0.04) 100%)', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }} className="hero-grid">
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#2fd9f4', letterSpacing: '0.14em', marginBottom: '0.75rem' }}>DIVULGATION RESPONSABLE</p>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: 'var(--text-head)', margin: '0 0 0.75rem' }}>Vous avez trouvé une vulnérabilité ?</h3>
                <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.7, margin: 0 }}>
                  Contactez-nous en privé avant toute divulgation publique. Nous nous engageons à répondre sous 48 heures et à corriger les problèmes critiques sous 72 heures.
                </p>
              </div>
              <a href="mailto:mouhamadoumoustapha.dione@dencu.online"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 11, background: '#2fd9f4', color: '#07111f', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap' }}>
                Signaler <IcoArrow />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ sécurité */}
      <section style={{ padding: '5rem max(1.5rem, calc((100% - 1200px) / 2)) 7rem', background: 'var(--bg-alt)' }} className="section-pad">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.16em', marginBottom: '1rem' }}>FAQ SÉCURITÉ</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Questions techniques</h2>
            </div>
          </Reveal>
          <FAQAccordion faqs={SEC_FAQS} />
        </div>
      </section>
    </PublicLayout>
  )
}
