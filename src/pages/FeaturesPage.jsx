import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PublicLayout from '../components/layout/PublicLayout'
import useDocumentTitle from '../hooks/useDocumentTitle'
import {
  Reveal, IcoCheck, IcoArrow, IcoBuilding,
  IcoVault, IcoKey, IcoCode, IcoFolder, IcoRefresh, IcoActivity,
  IcoShare, IcoLink2, IcoUsers, IcoBell,
  IcoShield, IcoLock, IcoFingerprint, IcoPhone,
  IcoCoins, IcoZap, IcoServer,
} from '../components/shared'

// ─── Data ─────────────────────────────────────────────────────────────────────
const featureGroups = (t) => [
  {
    kicker: t('features:groups.daily.kicker'),
    Icon: IcoVault,
    title: t('features:groups.daily.title'),
    items: [
      { Icon: IcoVault, accent: 'var(--accent)', title: t('features:groups.daily.vault.title'), desc: t('features:groups.daily.vault.desc') },
      { Icon: IcoKey, accent: 'var(--accent)', title: t('features:groups.daily.generator.title'), desc: t('features:groups.daily.generator.desc') },
      { Icon: IcoCode, accent: 'var(--accent)', title: t('features:groups.daily.extensions.title'), desc: t('features:groups.daily.extensions.desc') },
      { Icon: IcoFolder, accent: 'var(--accent)', title: t('features:groups.daily.secrets.title'), desc: t('features:groups.daily.secrets.desc') },
      { Icon: IcoRefresh, accent: 'var(--accent)', title: t('features:groups.daily.import.title'), desc: t('features:groups.daily.import.desc') },
      { Icon: IcoActivity, accent: 'var(--accent)', title: t('features:groups.daily.score.title'), desc: t('features:groups.daily.score.desc') },
    ],
  },
  {
    kicker: t('features:groups.sharing.kicker'),
    Icon: IcoShare,
    title: t('features:groups.sharing.title'),
    items: [
      { Icon: IcoLink2, accent: 'var(--green)', title: t('features:groups.sharing.links.title'), desc: t('features:groups.sharing.links.desc') },
      { Icon: IcoUsers, accent: 'var(--green)', title: t('features:groups.sharing.teams.title'), desc: t('features:groups.sharing.teams.desc') },
      { Icon: IcoBell, accent: 'var(--green)', title: t('features:groups.sharing.notifications.title'), desc: t('features:groups.sharing.notifications.desc') },
    ],
  },
  {
    kicker: t('features:groups.security.kicker'),
    Icon: IcoShield,
    title: t('features:groups.security.title'),
    items: [
      { Icon: IcoLock, accent: 'var(--purple)', title: t('features:groups.security.aes.title'), desc: t('features:groups.security.aes.desc') },
      { Icon: IcoFingerprint, accent: 'var(--purple)', title: t('features:groups.security.zeroKnowledge.title'), desc: t('features:groups.security.zeroKnowledge.desc') },
      { Icon: IcoPhone, accent: 'var(--purple)', title: t('features:groups.security.totp.title'), desc: t('features:groups.security.totp.desc') },
    ],
  },
]

const advantages = (t) => [
  {
    Icon: IcoCoins,
    kicker: t('features:why.advFcfa.kicker'),
    title: t('features:why.advFcfa.title'),
    desc: t('features:why.advFcfa.desc'),
    points: t('features:why.advFcfa.points', { returnObjects: true }),
  },
  {
    Icon: IcoZap,
    kicker: t('features:why.advPassphrase.kicker'),
    title: t('features:why.advPassphrase.title'),
    desc: t('features:why.advPassphrase.desc'),
    points: t('features:why.advPassphrase.points', { returnObjects: true }),
  },
  {
    Icon: IcoServer,
    kicker: t('features:why.advHosting.kicker'),
    title: t('features:why.advHosting.title'),
    desc: t('features:why.advHosting.desc'),
    points: t('features:why.advHosting.points', { returnObjects: true }),
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FeaturesPage() {
  const { t } = useTranslation('features')
  useDocumentTitle(t('features:meta.title'), t('features:meta.description'), '/features')

  const featureGroupsList = featureGroups(t)
  const advantagesList = advantages(t)
  const parity = t('features:why.parity', { returnObjects: true })
  const roadmap = [{ label: t('features:why.roadmapItem'), tag: t('features:why.roadmapTag') }]
  const enterpriseItems = t('features:enterprise.items', { returnObjects: true })

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
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.1em' }}>{t('features:hero.eyebrow')}</span>
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,4.6vw,3.4rem)', lineHeight: 1.08, letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.1rem' }}>
                {t('features:hero.title')}
              </h1>
              <p style={{ fontSize: 16.5, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 620, margin: '0 auto' }}>
                {t('features:hero.subtitle')}
              </p>
            </Reveal>
          </div>
          <style>{`@keyframes glow-pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }`}</style>
        </section>

        {/* ── Feature groups ── */}
        <section style={{ padding: '2rem max(1.25rem, calc((100% - 1200px) / 2)) 5rem', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {featureGroupsList.map(({ kicker, Icon, title, items }) => (
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
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>{t('features:why.kicker')}</p>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.8rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>{t('features:why.title')}</h2>
                <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7 }}>{t('features:why.subtitle')}</p>
              </div>
            </Reveal>

            {/* 3 advantage cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {advantagesList.map(({ Icon, kicker, title, desc, points }, i) => (
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
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>{t('features:why.parityTitle')}</h3>
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
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>{t('features:why.roadmapTitle')}</h3>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.5, margin: '0 0 1rem' }}>{t('features:why.roadmapSubtitle')}</p>
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
                  <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--purple)', letterSpacing: '0.1em' }}>{t('features:enterprise.badge')}</span>
                </div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.7rem,3.4vw,2.4rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.15 }}>
                  {t('features:enterprise.title')}
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  {t('features:enterprise.desc')}
                </p>
                <Link to="/business" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: 'var(--purple)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 24px var(--purple-025)' }}>
                  {t('features:enterprise.cta')} <IcoArrow size={15} />
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
                {t('features:cta.title')}
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text2)', margin: '0 auto 2rem', maxWidth: 440, lineHeight: 1.7 }}>
                {t('features:cta.subtitle')}
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://app.dencpass.com/register" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 32px', borderRadius: 14, background: 'var(--accent)', color: 'var(--bg)', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 32px var(--accent-014)' }}>
                  {t('features:cta.ctaPrimary')} <IcoArrow />
                </a>
                <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 26px', borderRadius: 14, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t('features:cta.ctaSecondary')}
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
