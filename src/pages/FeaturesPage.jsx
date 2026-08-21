import { Link } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import {
  Reveal, IcoCheck, IcoArrow, IcoBuilding,
  IcoVault, IcoKey, IcoCode, IcoFolder, IcoRefresh, IcoActivity,
  IcoShare, IcoLink2, IcoUsers, IcoBell,
  IcoShield, IcoLock, IcoFingerprint, IcoPhone,
  IcoCoins, IcoZap, IcoServer,
} from '../components/shared'

// ─── Data ─────────────────────────────────────────────────────────────────────
const featureGroups = [
  {
    kicker: 'AU QUOTIDIEN',
    Icon: IcoVault,
    title: 'Gérez vos accès sans effort',
    items: [
      { Icon: IcoVault,    accent: 'var(--accent)', title: 'Coffre chiffré',              desc: 'Mots de passe, identifiants et notes sécurisés, avec historique des modifications par entrée.' },
      { Icon: IcoKey,      accent: 'var(--accent)', title: 'Générateur jusqu\'à 128 car.', desc: 'Règles configurables : longueur, symboles, chiffres. Ou passphrase mémorable.' },
      { Icon: IcoCode,     accent: 'var(--accent)', title: 'Extensions navigateur',        desc: 'Remplissage et capture automatiques des identifiants Chrome, Edge et Firefox.' },
      { Icon: IcoFolder,   accent: 'var(--accent)', title: 'Secrets & certificats',        desc: 'Stockez clés d\'API, certificats et notes sécurisées à côté de vos mots de passe.' },
      { Icon: IcoRefresh,  accent: 'var(--accent)', title: 'Import en 2 minutes',          desc: 'CSV depuis Chrome, Bitwarden, LastPass, KeePass et KeePassXC.' },
      { Icon: IcoActivity, accent: 'var(--accent)', title: 'Score de sécurité',            desc: 'Détection des mots de passe faibles, réutilisés ou compromis via HIBP.' },
    ],
  },
  {
    kicker: 'PARTAGE & COLLABORATION',
    Icon: IcoShare,
    title: 'Partagez en toute sécurité',
    items: [
      { Icon: IcoLink2,  accent: 'var(--green)', title: 'Liens temporaires',    desc: 'Partage par lien avec limite de vues, expiration et révocation à tout moment.' },
      { Icon: IcoUsers,  accent: 'var(--green)', title: 'Équipes & groupes',    desc: 'Accès centralisés avec rôles et permissions par organisation.' },
      { Icon: IcoBell,   accent: 'var(--green)', title: 'Notifications d\'accès', desc: 'Soyez averti à chaque consultation ou modification d\'un secret partagé.' },
    ],
  },
  {
    kicker: 'SÉCURITÉ DE FOND',
    Icon: IcoShield,
    title: 'Une architecture zéro-connaissance',
    items: [
      { Icon: IcoLock,        accent: 'var(--purple)', title: 'AES-256-GCM par entrée', desc: 'Chaque élément chiffré individuellement avec contrôle HMAC, avant tout stockage.' },
      { Icon: IcoFingerprint, accent: 'var(--purple)', title: 'Zéro connaissance',       desc: 'Nos serveurs ne peuvent pas lire vos données. Même en cas d\'accès physique.' },
      { Icon: IcoPhone,       accent: 'var(--purple)', title: '2FA TOTP',                desc: 'Compatible Google Authenticator et Authy. Le secret TOTP est lui-même chiffré au repos.' },
    ],
  },
]

const advantages = [
  {
    Icon: IcoCoins,
    kicker: 'FCFA · WAVE · ORANGE MONEY',
    title: 'Paiement en FCFA',
    desc: 'Payez directement en francs CFA par Wave ou Orange Money. Aucune conversion, aucune carte internationale, aucun frais caché.',
    points: ['Sans conversion de devise', 'Sans carte bancaire internationale', 'Facturation locale, zéro frais caché'],
  },
  {
    Icon: IcoZap,
    kicker: 'WOLOF · BAMBARA · SWAHILI · YORUBA',
    title: 'Passphrase africaine',
    desc: 'Des phrases de passe mémorables puisant dans un lexique de plusieurs langues africaines. Fortes et faciles à retenir.',
    points: ['Lexique multilingue africain', 'Séparateur personnalisable', 'Aussi forte qu\'un mot de passe aléatoire'],
  },
  {
    Icon: IcoServer,
    kicker: "AFRIQUE DE L'OUEST",
    title: 'Hébergement & support local',
    desc: "Infrastructure et support pensés pour l'Afrique de l'Ouest francophone. Conformité locale et interface en français.",
    points: ['Support en français', 'Conformité APDP (Sénégal)', 'Serveurs proches de vos utilisateurs'],
  },
]

const parity = [
  'Architecture zéro-connaissance', 'AES-256-GCM par entrée',
  '2FA TOTP (Google Auth, Authy)', 'Générateur jusqu\'à 128 caractères',
  'Détection HIBP (k-anonymat)', 'Import CSV en 2 minutes',
]

const roadmap = [
  { label: 'Applications mobiles natives', tag: 'Sur la feuille de route' },
]

const enterpriseItems = [
  'Gestion multi-organisations', 'Active Directory (LDAP)',
  'SIEM / Syslog RFC 5424', 'Journalisation complète des accès',
  'Rôles & permissions par groupe', 'Déploiement On-Premise disponible',
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FeaturesPage() {
  return (
    <PublicLayout>
      <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', padding: '4.5rem max(1.25rem, calc((100% - 1200px) / 2)) 3rem' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, var(--accent-014) 0%, transparent 55%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid var(--border2)', background: 'var(--accent-004)', marginBottom: '1.6rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'glow-pulse 2s ease-in-out infinite', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.1em' }}>FONCTIONNALITÉS</span>
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,4.6vw,3.4rem)', lineHeight: 1.08, letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.1rem' }}>
                Tout ce qu'il faut pour protéger vos accès.
              </h1>
              <p style={{ fontSize: 16.5, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 620, margin: '0 auto' }}>
                De la gestion quotidienne de vos mots de passe au déploiement enterprise avec SIEM et Active Directory : sans jamais rogner sur la sécurité, ni oublier l'Afrique.
              </p>
            </Reveal>
          </div>
          <style>{`@keyframes glow-pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }`}</style>
        </section>

        {/* ── Feature groups ── */}
        <section style={{ padding: '2rem max(1.25rem, calc((100% - 1200px) / 2)) 5rem', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {featureGroups.map(({ kicker, Icon, title, items }) => (
              <Reveal key={kicker}>
                <div style={{ border: '1px solid var(--border)', borderRadius: 22, background: 'var(--bg-card)', padding: '2.5rem' }}>
                  {/* Group header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.75rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.14em', margin: '0 0 0.2rem' }}>{kicker}</p>
                      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem,2.6vw,1.9rem)', letterSpacing: '-0.03em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>{title}</h2>
                    </div>
                  </div>
                  {/* Items grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    {items.map(({ Icon: ItemIcon, accent, title: itemTitle, desc }) => (
                      <div key={itemTitle} style={{ padding: '1.5rem', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg2)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, marginBottom: '1rem', flexShrink: 0 }}>
                          <ItemIcon size={18} />
                        </div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.45rem' }}>{itemTitle}</h3>
                        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Pourquoi / nos vrais points forts ── */}
        <section style={{ padding: '5rem max(1.25rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>DENCPASS VS LES AUTRES</p>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.8rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>Nos vrais points forts.</h2>
                <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7 }}>On ne prétend pas battre les géants sur tout. Voici précisément là où DencPass fait la différence pour l'Afrique de l'Ouest.</p>
              </div>
            </Reveal>

            {/* 3 advantage cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {advantages.map(({ Icon, kicker, title, desc, points }, i) => (
                <Reveal key={title} delay={i * 80}>
                  <div style={{ position: 'relative', padding: '2rem 1.75rem', borderRadius: 18, border: '1px solid var(--border2)', background: 'linear-gradient(180deg, var(--accent-004), transparent)', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1.25rem' }}>
                      <Icon size={22} />
                    </div>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>{kicker}</p>
                    <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.7rem', letterSpacing: '-0.02em' }}>{title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 1.25rem' }}>{desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: '1.1rem', borderTop: '1px solid var(--border)' }}>
                      {points.map(pt => (
                        <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'var(--text2)' }}>
                          <span style={{ color: 'var(--accent)', display: 'flex', flexShrink: 0 }}><IcoCheck size={13} /></span>{pt}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Parity + Roadmap */}
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="feat-parity-grid">
                {/* Parity */}
                <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1.1rem' }}>
                    <span style={{ color: 'var(--green)', display: 'flex' }}><IcoCheck size={15} /></span>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>La parité avec les gestionnaires sérieux</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                    {parity.map(p => (
                      <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>
                        <span style={{ color: 'var(--green)', display: 'flex', flexShrink: 0, marginTop: 2 }}><IcoCheck size={13} /></span>{p}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Roadmap */}
                <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1.1rem' }}>
                    <span style={{ width: 20, height: 20, borderRadius: 6, background: 'var(--amber)', opacity: 0.9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg)', flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="12" y1="8" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    </span>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>Ce qui arrive bientôt</h3>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.5, margin: '0 0 1rem' }}>On préfère être honnêtes sur ce qui n'est pas encore là.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {roadmap.map(({ label, tag }) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>{label}</span>
                        <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--amber)', letterSpacing: '0.06em' }}>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Transition band cyan→violet ── */}
        <div style={{ position: 'relative', background: 'var(--bg-alt)', padding: '0 max(1.25rem, calc((100% - 1200px) / 2))', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', height: 4, background: 'linear-gradient(90deg, var(--accent) 0%, var(--purple) 100%)', borderRadius: 4, boxShadow: '0 0 24px var(--purple-025)' }} />
        </div>

        {/* ── Enterprise section ── */}
        <section style={{ position: 'relative', padding: '4rem max(1.25rem, calc((100% - 1200px) / 2)) 5rem', background: 'var(--bg-alt)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, var(--purple-06) 0%, transparent 55%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }} className="ent-grid">
            <Reveal>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid var(--purple-025)', background: 'var(--purple-06)', marginBottom: '1.5rem', color: 'var(--purple)' }}>
                  <IcoBuilding size={13} />
                  <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--purple)', letterSpacing: '0.1em' }}>ENTERPRISE</span>
                </div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.7rem,3.4vw,2.4rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.15 }}>
                  Les fonctionnalités pour vos équipes.
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Le violet signale l'univers Organisations : gouvernance des accès, intégrations et déploiement On-Premise pour vos équipes IT.
                </p>
                <Link to="/business" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: 'var(--purple)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 24px var(--purple-025)' }}>
                  Voir les offres Enterprise <IcoArrow size={15} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {enterpriseItems.map(label => (
                  <div key={label} style={{ padding: '1rem', borderRadius: 12, border: '1px solid var(--purple-014)', background: 'var(--purple-06)', display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                    <span style={{ color: 'var(--purple)', flexShrink: 0, marginTop: 1, display: 'flex' }}><IcoCheck size={13} /></span>
                    <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{label}</span>
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
                Prêt à sécuriser vos accès ?
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text2)', margin: '0 auto 2rem', maxWidth: 440, lineHeight: 1.7 }}>
                Gratuit, sans carte bancaire. Coffre chiffré prêt en 2 minutes.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://app.dencpass.com/register" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 32px', borderRadius: 14, background: 'var(--accent)', color: 'var(--bg)', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 32px var(--accent-014)' }}>
                  Commencer gratuitement <IcoArrow />
                </a>
                <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 26px', borderRadius: 14, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                  Voir les tarifs
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <style>{`
          @media (max-width:720px) {
            .feat-parity-grid { grid-template-columns: 1fr !important; }
            .ent-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </main>
    </PublicLayout>
  )
}
