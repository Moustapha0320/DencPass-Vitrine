import PublicLayout from '../components/layout/PublicLayout';
import { Reveal, IcoSmartphone, IcoUpload, IcoDatabase, IcoEye, IcoLock, IcoFingerprint, IcoPhone, IcoRefresh, IcoClipboard, IcoShield, IcoArrow } from '../components/shared';

const steps = [
  {
    num: '01',
    title: 'Sur votre appareil',
    desc: "La saisie est chiffrée localement avec votre clé, dérivée de votre mot de passe principal.",
    Icon: IcoSmartphone,
  },
  {
    num: '02',
    title: 'En transit',
    desc: "Seuls des blocs déjà chiffrés circulent, protégés par TLS de bout en bout.",
    Icon: IcoUpload,
  },
  {
    num: '03',
    title: 'Au repos',
    desc: "Nos serveurs stockent des données illisibles, chaque entrée chiffrée séparément.",
    Icon: IcoDatabase,
  },
  {
    num: '04',
    title: 'À la lecture',
    desc: "Le déchiffrement n'a lieu que sur votre appareil, jamais côté serveur.",
    Icon: IcoEye,
  },
];

const pillars = [
  { Icon: IcoLock,        title: 'AES-256-GCM',         desc: "Chiffrement symétrique de référence, par entrée, avec vecteur d'initialisation unique." },
  { Icon: IcoFingerprint, title: 'Zéro connaissance',   desc: 'Vos secrets ne passent jamais en clair dans nos infrastructures. Même notre équipe ne peut pas les lire.' },
  { Icon: IcoPhone,       title: '2FA TOTP',             desc: 'Second facteur d\'authentification conforme RFC 6238, compatible Google Authenticator et Aegis.' },
  { Icon: IcoRefresh,     title: 'Rotation des clés',   desc: 'Les clés de chiffrement peuvent être rotées sans perte de données, à tout moment.' },
  { Icon: IcoClipboard,   title: 'Audit complet',        desc: 'Chaque action est tracée : connexions, modifications, partages — exportable au format syslog (RFC 5424).' },
  { Icon: IcoShield,      title: 'Détection de fuites',  desc: 'Vérification Have I Been Pwned par k-anonymat : vos mots de passe ne quittent jamais votre appareil.' },
];

const specs = [
  ['Chiffrement symétrique', 'AES-256-GCM'],
  ['Intégrité des messages',  'HMAC-SHA-256'],
  ['Dérivation de clé',       'Argon2id / PBKDF2 depuis mot de passe principal'],
  ['Transport',               'TLS 1.3 uniquement'],
  ['Second facteur',          'TOTP RFC 6238'],
  ['Vérification fuites',     'HIBP k-anonymat (5 premiers caractères SHA-1)'],
  ['Journalisation',          'Syslog RFC 5424 + webhook configurable'],
  ['Architecture',            'Zero-knowledge — serveurs aveugles'],
];

export default function SecurityPage() {
  return (
    <PublicLayout>
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section style={{
        padding: 'clamp(5rem,12vw,8rem) max(1.25rem, calc((100vw - 900px)/2)) clamp(3rem,6vw,5rem)',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(47,217,244,0.08) 0%, transparent 70%)',
        textAlign: 'center',
      }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <span style={{
              display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
              background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)',
              animation: 'dpPulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase' }}>
              Architecture de sécurité
            </span>
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.25rem)', color: 'var(--text-head)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Zéro connaissance.<br />Aucun compromis.
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.125rem)', color: 'var(--text2)', maxWidth: 560, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Vos données sont chiffrées sur votre appareil, avant de nous parvenir.
            Nos serveurs stockent des blocs illisibles — nous ne pouvons pas lire vos secrets, même si nous le voulions.
          </p>
        </Reveal>
      </section>

      {/* ── Flow ── */}
      <section style={{ padding: 'clamp(2.5rem,6vw,4rem) max(1.25rem, calc((100vw - 1100px)/2))' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Le parcours d'un secret
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 22,
            padding: 'clamp(1.5rem,4vw,2.5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {steps.map(({ num, title, desc, Icon }) => (
              <div key={num} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', opacity: 0.7 }}>{num}</span>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                    <Icon size={18} />
                  </div>
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-head)' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Pillars ── */}
      <section style={{ padding: 'clamp(2.5rem,6vw,4rem) max(1.25rem, calc((100vw - 1100px)/2))' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Piliers de sécurité
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {pillars.map(({ Icon, title, desc }) => (
              <div key={title} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '1.5rem',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1rem' }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text-head)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Specs ── */}
      <section style={{ padding: 'clamp(2.5rem,6vw,4rem) max(1.25rem, calc((100vw - 1100px)/2))' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Sous le capot
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
            {specs.map(([label, value], i) => (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < specs.length - 1 ? '1px solid var(--border)' : 'none',
                gap: '1rem',
                flexWrap: 'wrap',
              }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text2)' }}>{label}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: 'clamp(3rem,8vw,5rem) max(1.25rem, calc((100vw - 1100px)/2))',
        background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(47,217,244,0.07) 0%, transparent 70%)',
        textAlign: 'center',
      }}>
        <Reveal>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', color: 'var(--text-head)', marginBottom: '1rem' }}>
            Une sécurité que vous pouvez auditer.
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text2)', maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Des questions sur notre architecture ? Notre équipe est disponible pour une présentation technique détaillée.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn-primary" style={{
              background: 'var(--accent)', color: '#07111f', border: 'none',
              padding: '0.8rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Parler à l'équipe <IcoArrow size={16} />
            </a>
            <a href="https://app.dencpass.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
              background: 'transparent', color: 'var(--text)',
              border: '1px solid var(--border2)',
              padding: '0.8rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Essayer DencPass
            </a>
          </div>
        </Reveal>
      </section>

      <style>{`@keyframes dpPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.25)} }`}</style>
    </main>
    </PublicLayout>
  );
}
