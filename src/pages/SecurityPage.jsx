import { Link } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import {
  Reveal, IcoArrow,
  IcoLock, IcoFingerprint, IcoPhone, IcoRefresh, IcoClipboard, IcoShield,
  IcoSmartphone, IcoUpload, IcoDatabase, IcoEye,
} from '../components/shared'

// ─── Data ─────────────────────────────────────────────────────────────────────
const flow = [
  { step: '01', Icon: IcoSmartphone, title: 'Sur votre appareil',  desc: 'La saisie est chiffrée localement avec votre clé, dérivée de votre mot de passe principal.' },
  { step: '02', Icon: IcoUpload,     title: 'En transit',          desc: 'Seuls des blocs déjà chiffrés circulent, protégés par TLS de bout en bout.' },
  { step: '03', Icon: IcoDatabase,   title: 'Au repos',            desc: 'Nos serveurs stockent des données illisibles, chaque entrée chiffrée séparément.' },
  { step: '04', Icon: IcoEye,        title: 'À la lecture',        desc: 'Le déchiffrement n\'a lieu que sur votre appareil, jamais côté serveur.' },
]

const pillars = [
  { Icon: IcoLock,        accent: 'var(--accent)', title: 'AES-256-GCM par entrée', desc: 'Chaque mot de passe, secret et certificat est chiffré individuellement, avec un contrôle d\'intégrité HMAC.' },
  { Icon: IcoFingerprint, accent: 'var(--purple)', title: 'Zéro connaissance',      desc: 'Votre clé ne quitte jamais votre appareil. Même en cas d\'accès physique au serveur, vos données restent illisibles.' },
  { Icon: IcoPhone,       accent: 'var(--green)',  title: '2FA TOTP',               desc: 'Compatible Google Authenticator et Authy. Le secret TOTP est lui-même chiffré au repos.' },
  { Icon: IcoRefresh,     accent: 'var(--accent)', title: 'Rotation des clés',      desc: 'Les clés peuvent être renouvelées sans interruption de service ni ré-authentification manuelle.' },
  { Icon: IcoClipboard,   accent: 'var(--amber)',  title: 'Audit complet',          desc: 'Chaque action est tracée et exportable vers Splunk, Elastic ou Wazuh via webhook ou Syslog RFC 5424.' },
  { Icon: IcoShield,      accent: 'var(--purple)', title: 'Détection de fuites',    desc: 'Comparaison avec 700 M+ de fuites (HIBP) par k-anonymat — votre mot de passe ne quitte jamais l\'appareil en clair.' },
]

const specs = [
  { label: 'Algorithme de chiffrement', value: 'AES-256-GCM' },
  { label: 'Intégrité',                 value: 'HMAC par entrée' },
  { label: 'Dérivation de clé',         value: 'depuis mot de passe principal' },
  { label: 'Transport',                 value: 'TLS 1.3' },
  { label: 'Double authentification',   value: 'TOTP (RFC 6238)' },
  { label: 'Détection de fuites',       value: 'HIBP · k-anonymat' },
  { label: 'Journalisation',            value: 'Syslog RFC 5424 · webhook' },
  { label: 'Modèle',                    value: 'Zero-knowledge' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SecurityPage() {
  return (
    <PublicLayout>
      <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', padding: '4.5rem max(1.25rem, calc((100% - 1200px) / 2)) 3rem' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, var(--accent-014) 0%, transparent 55%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid var(--border2)', background: 'var(--accent-004)', marginBottom: '1.6rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'glow-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.1em' }}>ARCHITECTURE DE SÉCURITÉ</span>
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,4.6vw,3.4rem)', lineHeight: 1.08, letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.1rem' }}>
                Zéro connaissance. Aucun compromis.
              </h1>
              <p style={{ fontSize: 16.5, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 600, margin: '0 auto' }}>
                Vos données sont chiffrées sur votre appareil, avant de nous parvenir. Nos serveurs stockent des blocs illisibles — nous ne pouvons pas lire vos secrets, même si nous le voulions.
              </p>
            </Reveal>
          </div>
          <style>{`@keyframes glow-pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }`}</style>
        </section>

        {/* ── Flux zéro-connaissance ── */}
        <section style={{ padding: '2rem max(1.25rem, calc((100% - 1200px) / 2)) 4rem', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Reveal>
              <div style={{ border: '1px solid var(--border)', borderRadius: 22, background: 'var(--bg-card)', padding: '2.5rem' }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.14em', margin: '0 0 1.5rem', textAlign: 'center' }}>LE PARCOURS D'UN SECRET</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }} className="flow-grid">
                  {flow.map(({ step, Icon, title, desc }) => (
                    <div key={step} style={{ padding: '1.25rem', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg2)', textAlign: 'center' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', margin: '0 auto 0.9rem' }}>
                        <Icon size={20} />
                      </div>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', margin: '0 0 0.35rem' }}>{step}</p>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.4rem' }}>{title}</h3>
                      <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55, margin: 0 }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Piliers ── */}
        <section style={{ padding: '2rem max(1.25rem, calc((100% - 1200px) / 2)) 5rem', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {pillars.map(({ Icon, accent, title, desc }, i) => (
              <Reveal key={title} delay={(i % 3) * 80}>
                <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', gap: '1.1rem', alignItems: 'flex-start', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.4rem' }}>{title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Specs ── */}
        <section style={{ padding: '5rem max(1.25rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>SOUS LE CAPOT</p>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.6rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>Spécifications techniques</h2>
              </div>
              <div style={{ border: '1px solid var(--border)', borderRadius: 18, background: 'var(--bg-card)', overflow: 'hidden' }}>
                {specs.map(({ label, value }, i) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.1rem 1.5rem', borderBottom: i < specs.length - 1 ? '1px solid var(--border)' : 'none', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, color: 'var(--text2)' }}>{label}</span>
                    <span style={{ fontSize: 13, color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem max(1.25rem, calc((100% - 1200px) / 2))', background: 'var(--bg)', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, var(--accent-014) 0%, transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
            <Reveal>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4.4vw,3rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.1rem', lineHeight: 1.1 }}>
                Une sécurité que vous pouvez auditer.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text2)', margin: '0 auto 2rem', maxWidth: 440, lineHeight: 1.7 }}>
                Créez votre coffre chiffré gratuitement, ou parlez à notre équipe de vos exigences de conformité.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://app.dencpass.com/register" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 32px', borderRadius: 14, background: 'var(--accent)', color: 'var(--bg)', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 32px var(--accent-014)' }}>
                  Commencer gratuitement <IcoArrow />
                </a>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 26px', borderRadius: 14, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Contacter l'équipe
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <style>{`
          @media (max-width:760px) { .flow-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </main>
    </PublicLayout>
  )
}
