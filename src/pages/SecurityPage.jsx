import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PublicLayout from '../components/layout/PublicLayout'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { localizedPath } from '../utils/localizedPath'
import {
  Reveal, IcoArrow,
  IcoLock, IcoFingerprint, IcoPhone, IcoRefresh, IcoClipboard, IcoShield,
  IcoSmartphone, IcoUpload, IcoDatabase, IcoEye,
} from '../components/shared'

// ─── Data ─────────────────────────────────────────────────────────────────────
const flow = (t) => [
  { step: '01', Icon: IcoSmartphone, title: t('security:flow.step1.title'), desc: t('security:flow.step1.desc') },
  { step: '02', Icon: IcoUpload, title: t('security:flow.step2.title'), desc: t('security:flow.step2.desc') },
  { step: '03', Icon: IcoDatabase, title: t('security:flow.step3.title'), desc: t('security:flow.step3.desc') },
  { step: '04', Icon: IcoEye, title: t('security:flow.step4.title'), desc: t('security:flow.step4.desc') },
]

const pillars = (t) => [
  { Icon: IcoLock, accent: 'var(--accent)', title: t('security:pillars.aes.title'), desc: t('security:pillars.aes.desc') },
  { Icon: IcoFingerprint, accent: 'var(--purple)', title: t('security:pillars.zeroKnowledge.title'), desc: t('security:pillars.zeroKnowledge.desc') },
  { Icon: IcoPhone, accent: 'var(--green)', title: t('security:pillars.totp.title'), desc: t('security:pillars.totp.desc') },
  { Icon: IcoRefresh, accent: 'var(--accent)', title: t('security:pillars.rotation.title'), desc: t('security:pillars.rotation.desc') },
  { Icon: IcoClipboard, accent: 'var(--amber)', title: t('security:pillars.audit.title'), desc: t('security:pillars.audit.desc') },
  { Icon: IcoShield, accent: 'var(--purple)', title: t('security:pillars.leaks.title'), desc: t('security:pillars.leaks.desc') },
]

const specs = (t) => [
  { label: t('security:specs.encryption.label'), value: t('security:specs.encryption.value') },
  { label: t('security:specs.integrity.label'), value: t('security:specs.integrity.value') },
  { label: t('security:specs.keyDerivation.label'), value: t('security:specs.keyDerivation.value') },
  { label: t('security:specs.transport.label'), value: t('security:specs.transport.value') },
  { label: t('security:specs.twoFa.label'), value: t('security:specs.twoFa.value') },
  { label: t('security:specs.leakDetection.label'), value: t('security:specs.leakDetection.value') },
  { label: t('security:specs.logging.label'), value: t('security:specs.logging.value') },
  { label: t('security:specs.model.label'), value: t('security:specs.model.value') },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SecurityPage() {
  const { t, i18n } = useTranslation('security')
  useDocumentTitle(t('security:meta.title'), t('security:meta.description'), '/security')

  const flowList = flow(t)
  const pillarsList = pillars(t)
  const specsList = specs(t)

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
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.1em' }}>{t('security:hero.eyebrow')}</span>
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,4.6vw,3.4rem)', lineHeight: 1.08, letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.1rem' }}>
                {t('security:hero.title')}
              </h1>
              <p style={{ fontSize: 16.5, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 600, margin: '0 auto' }}>
                {t('security:hero.subtitle')}
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
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.14em', margin: '0 0 1.5rem', textAlign: 'center' }}>{t('security:flow.title')}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }} className="flow-grid">
                  {flowList.map(({ step, Icon, title, desc }) => (
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
          <div className="pillars-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {pillarsList.map(({ Icon, accent, title, desc }, i) => (
              <Reveal key={title} delay={(i % 3) * 80}>
                <div style={{ height: '100%', boxSizing: 'border-box', padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '1.1rem', transition: 'border-color 0.2s' }}
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
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>{t('security:specs.kicker')}</p>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.6rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>{t('security:specs.title')}</h2>
              </div>
              <div style={{ border: '1px solid var(--border)', borderRadius: 18, background: 'var(--bg-card)', overflow: 'hidden' }}>
                {specsList.map(({ label, value }, i) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.1rem 1.5rem', borderBottom: i < specsList.length - 1 ? '1px solid var(--border)' : 'none', flexWrap: 'wrap' }}>
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
                {t('security:cta.title')}
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text2)', margin: '0 auto 2rem', maxWidth: 440, lineHeight: 1.7 }}>
                {t('security:cta.subtitle')}
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://app.dencpass.com/register" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 32px', borderRadius: 14, background: 'var(--accent)', color: 'var(--bg)', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 32px var(--accent-014)' }}>
                  {t('security:cta.ctaPrimary')} <IcoArrow />
                </a>
                <Link to={localizedPath('/contact', i18n.language)} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '15px 26px', borderRadius: 14, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t('security:cta.ctaSecondary')}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <style>{`
          @media (max-width:760px) { .flow-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width:900px) { .pillars-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width:560px) { .pillars-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </main>
    </PublicLayout>
  )
}
