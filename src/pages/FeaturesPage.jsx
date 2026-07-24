import PublicLayout from '../components/layout/PublicLayout';
import { Reveal, IcoVault, IcoShare, IcoShield, IcoCheck, IcoArrow, IcoUsers, IcoBuilding } from '../components/shared';

const groups = [
  {
    kicker: 'Au quotidien',
    Icon: IcoVault,
    items: [
      { title: 'Coffre chiffré',            desc: 'Stockez mots de passe, notes secrètes et certificats dans un coffre AES-256-GCM.' },
      { title: 'Générateur fort',            desc: 'Générez des mots de passe jusqu\'à 128 caractères avec contrôle d\'entropie.' },
      { title: 'Extension Chrome',           desc: 'Remplissage automatique dans Chrome, Brave et tout navigateur Chromium.' },
      { title: 'Secrets & certificats',      desc: 'Stockez des clés API, tokens, certificats SSL et fichiers sensibles.' },
      { title: 'Import en 2 minutes',        desc: 'Migration depuis Bitwarden, 1Password ou LastPass via fichier CSV/JSON.' },
      { title: 'Score de sécurité',          desc: 'Analysez la robustesse de vos mots de passe et identifiez les doublons.' },
    ],
  },
  {
    kicker: 'Partage & collaboration',
    Icon: IcoShare,
    items: [
      { title: 'Liens temporaires',          desc: 'Partagez un secret via un lien à durée limitée, sans compte requis pour le destinataire.' },
      { title: 'Équipes & groupes',          desc: 'Organisez vos collaborateurs par équipe, attribuez des coffres partagés.' },
      { title: 'Notifications d\'accès',     desc: 'Soyez alerté à chaque accès ou modification sur vos entrées partagées.' },
    ],
  },
  {
    kicker: 'Sécurité de fond',
    Icon: IcoShield,
    items: [
      { title: 'AES-256-GCM par entrée',    desc: 'Chaque secret est chiffré individuellement avec son propre vecteur d\'initialisation.' },
      { title: 'Zéro connaissance',          desc: 'Le déchiffrement s\'effectue sur votre appareil. Nos serveurs ne voient que des blocs opaques.' },
      { title: '2FA TOTP',                   desc: 'Activez un second facteur TOTP (RFC 6238) pour chaque connexion.' },
    ],
  },
];

const advantages = [
  { title: 'Tarifs en FCFA',       desc: 'Aucune conversion, aucune surprise. Payez en Francs CFA avec des prix adaptés au marché ouest-africain.' },
  { title: 'Passphrase africaine', desc: "Générez des phrases mémorables à partir d'un dictionnaire wolof — plus de force, moins d'effort." },
  { title: 'Hébergement local',    desc: 'Vos données restent dans des centres de données proches de Dakar pour des performances optimales.' },
];

const parity = [
  ['Chiffrement AES-256-GCM',   true],
  ['Zéro connaissance',         true],
  ['Extension navigateur',      true],
  ['2FA TOTP inclus',           true],
  ['Tarifs en FCFA',            true],
  ['Support en français',       true],
];

const roadmap = [
  { title: 'Applications mobiles',   desc: 'iOS et Android — prévues feuille de route 2026.' },
  { title: 'Extension Firefox / Edge', desc: 'En développement, disponibles prochainement.' },
];

export default function FeaturesPage() {
  return (
    <PublicLayout>
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section style={{
        padding: 'clamp(5rem,12vw,8rem) max(1.25rem, calc((100vw - 900px)/2)) clamp(3rem,6vw,5rem)',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(47,217,244,0.07) 0%, transparent 70%)',
        textAlign: 'center',
      }}>
        <Reveal>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase' }}>
              Fonctionnalités
            </span>
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.25rem)', color: 'var(--text-head)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Tout ce qu'il faut pour<br />protéger vos accès.
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.0625rem)', color: 'var(--text2)', maxWidth: 540, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Un coffre-fort chiffré de bout en bout, un générateur robuste, une extension navigateur — le tout conçu pour votre usage quotidien.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.dencpass.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
              background: 'var(--accent)', color: '#07111f', border: 'none',
              padding: '0.8rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Essayer gratuitement <IcoArrow size={16} />
            </a>
            <a href="/tarifs" className="btn-primary" style={{
              background: 'transparent', color: 'var(--text)',
              border: '1px solid var(--border2)',
              padding: '0.8rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
            }}>
              Voir les tarifs
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── Feature groups ── */}
      <section style={{ padding: 'clamp(2.5rem,6vw,4rem) max(1.25rem, calc((100vw - 1100px)/2))', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {groups.map(({ kicker, Icon, items }) => (
          <Reveal key={kicker}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 22,
              overflow: 'hidden',
            }}>
              <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Icon size={18} />
                </div>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text-head)' }}>{kicker}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 0 }}>
                {items.map(({ title, desc }, i) => (
                  <div key={title} style={{
                    padding: '1.25rem 1.75rem',
                    borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: i < items.length - 3 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }}><IcoCheck size={15} /></span>
                      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-head)' }}>{title}</span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text2)', lineHeight: 1.6, paddingLeft: 25 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── Pourquoi DencPass ── */}
      <section style={{ padding: 'clamp(2.5rem,6vw,4rem) max(1.25rem, calc((100vw - 1100px)/2))' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Pourquoi DencPass
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {advantages.map(({ title, desc }) => (
              <div key={title} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-head)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {parity.map(([label, included]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.75rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12 }}>
                <span style={{ color: included ? 'var(--green)' : 'var(--text3)', flexShrink: 0 }}><IcoCheck size={16} /></span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text2)' }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.18)', borderRadius: 16, padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '1rem' }}>
            {roadmap.map(({ title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--amber)', background: 'rgba(245,158,11,0.12)', padding: '2px 8px', borderRadius: 6, marginTop: 2, whiteSpace: 'nowrap' }}>BIENTÔT</span>
                <div>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-head)' }}>{title}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginTop: 2 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Enterprise strip ── */}
      <section style={{ padding: 'clamp(2.5rem,5vw,3.5rem) max(1.25rem, calc((100vw - 1100px)/2))' }}>
        <Reveal>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.10) 0%, rgba(47,217,244,0.06) 100%)',
            border: '1px solid var(--purple-014)',
            borderRadius: 20,
            padding: 'clamp(2rem,4vw,2.75rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--purple-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)', flexShrink: 0 }}>
                <IcoBuilding size={24} />
              </div>
              <div>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-head)' }}>Vous avez une équipe ?</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text2)', marginTop: 2 }}>Multi-organisations, SIEM, audit, Active Directory — tout pour les entreprises.</p>
              </div>
            </div>
            <a href="/entreprises" className="btn-primary" style={{
              background: 'var(--purple)', color: '#fff', border: 'none',
              padding: '0.75rem 1.5rem', borderRadius: 10, fontSize: '0.9rem',
              display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
            }}>
              Voir l'offre Enterprise <IcoArrow size={16} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: 'clamp(3rem,8vw,5rem) max(1.25rem, calc((100vw - 1100px)/2))',
        textAlign: 'center',
      }}>
        <Reveal>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', color: 'var(--text-head)', marginBottom: '1rem' }}>
            Prêt à sécuriser vos accès ?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text2)', maxWidth: 460, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Commencez gratuitement. Aucune carte bancaire requise.
          </p>
          <a href="https://app.dencpass.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
            background: 'var(--accent)', color: '#07111f', border: 'none',
            padding: '0.9rem 2rem', borderRadius: 10, fontSize: '0.95rem',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            Créer un compte gratuit <IcoArrow size={16} />
          </a>
        </Reveal>
      </section>

    </main>
    </PublicLayout>
  );
}
