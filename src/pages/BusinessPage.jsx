import PublicLayout from '../components/layout/PublicLayout';
import { Reveal, IcoArrow, IcoUsers, IcoKey, IcoLayers, IcoActivity, IcoClipboard, IcoShield, IcoCloud, IcoServer, IcoLink2, IcoBuilding } from '../components/shared';

const capabilities = [
  { Icon: IcoUsers,     title: 'Multi-organisations',    desc: 'Gérez plusieurs entités depuis un tableau de bord unifié.' },
  { Icon: IcoKey,       title: 'Rôles & permissions',   desc: 'Définissez des droits granulaires par utilisateur et par coffre.' },
  { Icon: IcoLayers,    title: 'Active Directory',       desc: 'Synchronisation LDAP/AD : On-Premise uniquement.', tag: 'On-Premise' },
  { Icon: IcoActivity,  title: 'SIEM / Syslog',          desc: 'Exportez tous les événements vers votre infrastructure de supervision.' },
  { Icon: IcoClipboard, title: 'Journalisation',         desc: 'Chaque accès, modification ou export est horodaté et signé.' },
  { Icon: IcoShield,    title: 'Conformité',             desc: 'Piste d\'audit complète pour ISO 27001, SOC 2 et réglementations locales.' },
];

const deployments = [
  {
    label: 'SAAS MANAGÉ',
    Icon: IcoCloud,
    title: 'Enterprise Cloud',
    desc: 'Hébergé, maintenu et sécurisé par nos équipes. Démarrez en quelques minutes, sans infrastructure.',
    features: ['Tout Pro inclus', 'Équipes & groupes', 'SIEM / Syslog', 'Audit complet', 'Support dédié'],
    cta: { label: 'Nous contacter', href: '/contact' },
    accent: 'var(--accent)',
    accentBg: 'var(--accent-014)',
  },
  {
    label: 'SUR VOTRE INFRA',
    Icon: IcoServer,
    title: 'Enterprise On-Premise',
    desc: 'Déploiement Docker ou bare-metal dans votre datacenter. Contrôle total de vos données.',
    features: ['100% sur site', 'Docker / bare-metal', 'LDAP / Active Directory', 'Licence annuelle', 'Maintenance incluse'],
    cta: { label: 'Demander un devis', href: '/contact' },
    accent: 'var(--purple)',
    accentBg: 'var(--purple-014)',
  },
];

const integrations = [
  {
    Icon: IcoLayers,
    title: 'Active Directory & LDAP',
    desc: 'Synchronisation bidirectionnelle des utilisateurs et des groupes. Provisioning automatique.',
    tag: 'On-Premise uniquement',
    tagColor: 'var(--purple)',
    tagBg: 'var(--purple-014)',
  },
  {
    Icon: IcoActivity,
    title: 'SIEM & Syslog',
    desc: 'Envoi des événements d\'audit en temps réel via syslog RFC 5424 vers votre SIEM.',
    tag: null,
  },
  {
    Icon: IcoLink2,
    title: 'Webhooks',
    desc: 'Déclenchez des actions dans vos outils internes à chaque connexion, modification ou alerte.',
    tag: null,
  },
  {
    Icon: IcoClipboard,
    title: 'Splunk / Elastic / Wazuh',
    desc: 'Connecteurs natifs pour les principales plateformes d\'observabilité et de détection.',
    tag: null,
  },
];

export default function BusinessPage() {
  return (
    <PublicLayout>
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero 2-col ── */}
      <section style={{
        padding: 'clamp(5rem,12vw,8rem) max(1.25rem, calc((100vw - 1200px)/2)) clamp(3rem,6vw,5rem)',
        background: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(139,92,246,0.10) 0%, transparent 65%)',
      }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'clamp(280px,48%,560px) 1fr', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--purple-014)', border: '1px solid var(--purple-025)', borderRadius: 20, padding: '4px 14px', marginBottom: '1.5rem' }}>
                <IcoBuilding size={13} style={{ color: 'var(--purple)' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--purple)', textTransform: 'uppercase' }}>Enterprise</span>
              </div>
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: 'var(--text-head)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                La gouvernance des accès,<br />pour vos équipes.
              </h1>
              <p style={{ fontSize: '1.0625rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Centralisez la gestion des mots de passe, des secrets et des permissions pour toute votre organisation : avec l'audit, la conformité et l'intégration à vos outils existants.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="/contact" className="btn-primary" style={{
                  background: 'var(--purple)', color: '#fff', border: 'none',
                  padding: '0.8rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  Contacter l'équipe <IcoArrow size={16} />
                </a>
                <a href="https://app.dencpass.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
                  background: 'transparent', color: 'var(--text)',
                  border: '1px solid var(--border2)',
                  padding: '0.8rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
                }}>
                  Essayer gratuitement
                </a>
              </div>
            </div>

            {/* Right : capabilities 2x3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {capabilities.map(({ Icon, title, desc, tag }) => (
                <div key={title} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--purple-014)',
                  borderRadius: 14,
                  padding: '1.1rem 1.25rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--purple)' }}><Icon size={16} /></span>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-head)' }}>{title}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.5 }}>{desc}</p>
                  {tag && (
                    <span style={{ display: 'inline-block', marginTop: 8, fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'var(--purple)', background: 'var(--purple-06)', padding: '2px 8px', borderRadius: 6 }}>
                      {tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Deployment ── */}
      <section style={{ padding: 'clamp(2.5rem,6vw,4rem) max(1.25rem, calc((100vw - 1100px)/2))' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Deux modes de déploiement
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.5rem' }}>
            {deployments.map(({ label, Icon, title, desc, features, cta, accent, accentBg }) => (
              <div key={title} style={{
                background: 'var(--bg-card)',
                border: `1px solid ${accent}33`,
                borderTop: `3px solid ${accent}`,
                borderRadius: 18,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                <div>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: accent, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>{label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
                      <Icon size={20} />
                    </div>
                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-head)' }}>{title}</h3>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>{desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--text2)' }}>
                      <span style={{ color: accent, flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-head)', marginTop: 4 }}>
                  Sur devis
                </div>
                <a href={cta.href} className="btn-primary" style={{
                  background: accent, color: accent === 'var(--accent)' ? '#07111f' : '#fff',
                  border: 'none', padding: '0.75rem 1.5rem', borderRadius: 10, fontSize: '0.875rem',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  {cta.label} <IcoArrow size={15} />
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Integrations ── */}
      <section style={{ padding: 'clamp(2.5rem,6vw,4rem) max(1.25rem, calc((100vw - 1100px)/2))' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Dans votre stack existante
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '1rem' }}>
            {integrations.map(({ Icon, title, desc, tag, tagColor, tagBg }) => (
              <div key={title} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1rem' }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-head)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: tag ? '0.75rem' : 0 }}>{desc}</p>
                {tag && (
                  <span style={{ fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: tagColor, background: tagBg, padding: '3px 8px', borderRadius: 6 }}>
                    {tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CTA purple ── */}
      <section style={{ padding: 'clamp(3rem,8vw,5rem) max(1.25rem, calc((100vw - 1100px)/2))' }}>
        <Reveal>
          <div style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(139,92,246,0.14) 0%, transparent 70%)',
            border: '1px solid var(--purple-025)',
            borderRadius: 24,
            padding: 'clamp(2.5rem,5vw,3.5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 2, background: 'var(--purple)', opacity: 0.5 }} />
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem,3.5vw,2.25rem)', color: 'var(--text-head)', marginBottom: '1rem' }}>
              Parlons de votre organisation.
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text2)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Notre équipe est disponible pour une démonstration, un audit de sécurité ou un chiffrage personnalisé.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-primary" style={{
                background: 'var(--purple)', color: '#fff', border: 'none',
                padding: '0.85rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                Prendre contact <IcoArrow size={16} />
              </a>
              <a href="/tarifs" className="btn-primary" style={{
                background: 'transparent', color: 'var(--text)',
                border: '1px solid var(--border2)',
                padding: '0.85rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
              }}>
                Voir les tarifs
              </a>
            </div>
          </div>
        </Reveal>
      </section>

    </main>
    </PublicLayout>
  );
}
