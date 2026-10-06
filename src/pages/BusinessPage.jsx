import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PublicLayout from '../components/layout/PublicLayout';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Reveal, IcoArrow, IcoUsers, IcoKey, IcoLayers, IcoActivity, IcoClipboard, IcoShield, IcoCloud, IcoServer, IcoLink2, IcoBuilding } from '../components/shared';
import { localizedPath } from '../utils/localizedPath';

const capabilities = (t) => [
  { Icon: IcoUsers, title: t('business:capabilities.multiOrg.title'), desc: t('business:capabilities.multiOrg.desc') },
  { Icon: IcoKey, title: t('business:capabilities.roles.title'), desc: t('business:capabilities.roles.desc') },
  { Icon: IcoLayers, title: t('business:capabilities.ad.title'), desc: t('business:capabilities.ad.desc'), tag: t('business:capabilities.ad.tag') },
  { Icon: IcoActivity, title: t('business:capabilities.siem.title'), desc: t('business:capabilities.siem.desc') },
  { Icon: IcoClipboard, title: t('business:capabilities.logging.title'), desc: t('business:capabilities.logging.desc') },
  { Icon: IcoShield, title: t('business:capabilities.compliance.title'), desc: t('business:capabilities.compliance.desc') },
];

const deployments = (t) => [
  {
    label: t('business:deployment.cloud.label'),
    Icon: IcoCloud,
    title: t('business:deployment.cloud.title'),
    desc: t('business:deployment.cloud.desc'),
    features: [t('business:deployment.cloud.f1'), t('business:deployment.cloud.f2'), t('business:deployment.cloud.f3'), t('business:deployment.cloud.f4'), t('business:deployment.cloud.f5')],
    cta: { label: t('business:deployment.cloud.cta'), href: '/contact' },
    accent: 'var(--accent)',
    accentBg: 'var(--accent-014)',
  },
  {
    label: t('business:deployment.onprem.label'),
    Icon: IcoServer,
    title: t('business:deployment.onprem.title'),
    desc: t('business:deployment.onprem.desc'),
    features: [t('business:deployment.onprem.f1'), t('business:deployment.onprem.f2'), t('business:deployment.onprem.f3'), t('business:deployment.onprem.f4'), t('business:deployment.onprem.f5')],
    cta: { label: t('business:deployment.onprem.cta'), href: '/contact' },
    accent: 'var(--purple)',
    accentBg: 'var(--purple-014)',
  },
];

const integrations = (t) => [
  {
    Icon: IcoLayers,
    title: t('business:integrations.ad.title'),
    desc: t('business:integrations.ad.desc'),
    tag: t('business:integrations.ad.tag'),
    tagColor: 'var(--purple)',
    tagBg: 'var(--purple-014)',
  },
  {
    Icon: IcoActivity,
    title: t('business:integrations.siem.title'),
    desc: t('business:integrations.siem.desc'),
    tag: null,
  },
  {
    Icon: IcoLink2,
    title: t('business:integrations.webhooks.title'),
    desc: t('business:integrations.webhooks.desc'),
    tag: null,
  },
  {
    Icon: IcoClipboard,
    title: t('business:integrations.connectors.title'),
    desc: t('business:integrations.connectors.desc'),
    tag: null,
  },
];

export default function BusinessPage() {
  const { t, i18n } = useTranslation('business');
  useDocumentTitle(t('business:meta.title'), t('business:meta.description'), '/business');

  const capabilitiesList = capabilities(t);
  const deploymentsList = deployments(t);
  const integrationsList = integrations(t);

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
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--purple)', textTransform: 'uppercase' }}>{t('business:hero.badge')}</span>
                </div>
                <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: 'var(--text-head)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                  {t('business:hero.title').split('<br/>').map((line, i) => <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>)}
                </h1>
                <p style={{ fontSize: '1.0625rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {t('business:hero.subtitle')}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to={localizedPath('/contact', i18n.language)} className="btn-primary" style={{
                    background: 'var(--purple)', color: '#fff', border: 'none',
                    padding: '0.8rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                    {t('business:hero.ctaPrimary')} <IcoArrow size={16} />
                  </Link>
                  <a href="https://app.dencpass.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
                    background: 'transparent', color: 'var(--text)',
                    border: '1px solid var(--border2)',
                    padding: '0.8rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
                  }}>
                    {t('business:hero.ctaSecondary')}
                  </a>
                </div>
              </div>

              {/* Right : capabilities 2x3 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {capabilitiesList.map(({ Icon, title, desc, tag }) => (
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
                {t('business:deployment.kicker')}
              </span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.5rem' }}>
              {deploymentsList.map(({ label, Icon, title, desc, features, cta, accent, accentBg }) => (
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
                    {t('business:deployment.onRequest')}
                  </div>
                  <Link to={localizedPath(cta.href, i18n.language)} className="btn-primary" style={{
                    background: accent, color: accent === 'var(--accent)' ? '#07111f' : '#fff',
                    border: 'none', padding: '0.75rem 1.5rem', borderRadius: 10, fontSize: '0.875rem',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                    {cta.label} <IcoArrow size={15} />
                  </Link>
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
                {t('business:integrations.kicker')}
              </span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '1rem' }}>
              {integrationsList.map(({ Icon, title, desc, tag, tagColor, tagBg }) => (
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
                {t('business:cta.title')}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text2)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.7 }}>
                {t('business:cta.subtitle')}
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to={localizedPath('/contact', i18n.language)} className="btn-primary" style={{
                  background: 'var(--purple)', color: '#fff', border: 'none',
                  padding: '0.85rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>
                  {t('business:cta.ctaPrimary')} <IcoArrow size={16} />
                </Link>
                <Link to={localizedPath('/pricing', i18n.language)} className="btn-primary" style={{
                  background: 'transparent', color: 'var(--text)',
                  border: '1px solid var(--border2)',
                  padding: '0.85rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
                }}>
                  {t('business:cta.ctaSecondary')}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

      </main>
    </PublicLayout>
  );
}
