import { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import NumberFlow from '@number-flow/react'
import confetti from 'canvas-confetti'
import PublicLayout from '../components/layout/PublicLayout'
import DotField from '../components/DotField'
import ProductPreview from '../components/ProductPreview'
import { useTheme } from '../hooks/useTheme'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { Reveal, prefersReducedMotion, IcoCheck, IcoX, IcoArrow, IcoChevron, IcoVault, IcoZap, IcoShare, IcoKey, IcoGlobe, IcoCert, IcoUsers, IcoActivity, IcoServer, IcoShield, IcoPhone, IcoEye, IcoClipboard, IcoLock, IcoCopy, IcoBuilding, IcoCode, IcoStar, IcoSmartphone } from '../components/shared'
import { localizedPath } from '../utils/localizedPath'

// ─── Hero typewriter ──────────────────────────────────────────────────────────
function HeroTypewriter({ text }) {
  const [typed, setTyped] = useState(prefersReducedMotion ? text : '')
  const [showCaret, setShowCaret] = useState(!prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return
    let i = 0
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setTyped(text.slice(0, i))
        if (i >= text.length) { clearInterval(iv); setTimeout(() => setShowCaret(false), 1400) }
      }, 45)
      return () => clearInterval(iv)
    }, 320)
    return () => clearTimeout(t)
  }, [])

  const h1Style = { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem, 5.2vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.1rem', maxWidth: 640, position: 'relative' }

  if (prefersReducedMotion) {
    return <h1 style={h1Style}>{text}</h1>
  }

  return (
    <h1 style={h1Style}>
      {/* Layout reserve : sets the H1 height so no layout shift during animation */}
      <span aria-hidden="true" style={{ visibility: 'hidden', display: 'block' }}>{text}</span>
      {/* Animated overlay */}
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {typed}
        {showCaret && <span style={{ display: 'inline-block', width: '0.055em', height: '0.86em', background: 'var(--accent)', borderRadius: 1, marginLeft: '0.05em', verticalAlign: '-0.05em', animation: 'caret-blink 1.05s step-end infinite' }} />}
      </span>
      {/* Screen-reader text */}
      <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>{text}</span>
    </h1>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { t, i18n } = useTranslation('home')
  const { theme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', padding: '4.5rem max(1.25rem, calc((100vw - 1200px) / 2)) 3.5rem' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 22% 30%, var(--accent-014) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, var(--purple-06) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <DotField
        gradientFrom={isDark ? 'rgba(47,217,244,0.30)' : 'rgba(10,139,166,0.32)'}
        gradientTo={isDark ? 'rgba(139,92,246,0.22)' : 'rgba(109,63,212,0.20)'}
        glowColor={isDark ? 'rgba(47,217,244,0.16)' : 'rgba(10,139,166,0.18)'}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.7, maskImage: 'radial-gradient(ellipse at 45% 45%, #000 25%, transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse at 45% 45%, #000 25%, transparent 78%)' }}
        aria-hidden="true"
      />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: '2.5rem', alignItems: 'center' }} className="hero-grid">
        <div>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid var(--border2)', background: 'var(--accent-004)', marginBottom: '1.6rem', animation: 'fade-up 0.6s ease both 0.05s' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'glow-pulse 2s ease-in-out infinite', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{t('home:hero.badge')}</span>
          </div>

          {/* H1 typewriter */}
          <div style={{ animation: 'fade-up 0.6s ease both 0.1s' }}>
            <HeroTypewriter text={t('home:hero.typewriter')} />
          </div>

          {/* Slogan */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.4rem', flexWrap: 'wrap', animation: 'fade-up 0.7s ease both 0.2s' }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)', fontStyle: 'italic', color: 'var(--accent)', letterSpacing: '-0.02em' }}>{t('home:hero.slogan')}</span>
          </div>

          {/* Sous-titre */}
          <p style={{ fontSize: 16.5, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 520, marginBottom: '2.2rem', animation: 'fade-up 0.7s ease both 0.3s' }}>
            {t('home:hero.subtitle')}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', animation: 'fade-up 0.7s ease both 0.4s' }}>
            <a href="https://app.dencpass.com/register" className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 13, background: 'var(--accent)', color: 'var(--bg)', fontSize: 15, boxShadow: '0 4px 28px var(--accent-014)' }}>
              {t('home:hero.ctaPrimary')} <IcoArrow />
            </a>
            <Link to={localizedPath('/features', i18n.language)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 26px', borderRadius: 13, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t('home:hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        <div className="hero-mockup" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ProductPreview />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to bottom, transparent, var(--bg))', pointerEvents: 'none' }} />
      <style>{`
        @keyframes caret-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes fade-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow-pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @media (max-width:1000px) { .hero-grid{grid-template-columns:1fr!important} .hero-mockup{justify-content:center;margin-top:2.5rem} }
        @media (max-width:640px) { .hero-mockup{display:none!important} }
      `}</style>
    </section>
  )
}

// ─── Trust band ───────────────────────────────────────────────────────────────
function TrustBand() {
  const { t } = useTranslation('home')
  const badges = [
    { Icon: IcoLock, label: t('home:trust.aes') },
    { Icon: IcoEye, label: t('home:trust.zeroKnowledge') },
    { Icon: IcoPhone, label: t('home:trust.totp') },
    { Icon: IcoCode, label: t('home:trust.extensions') },
    { Icon: IcoGlobe, label: t('home:trust.africaFirst') },
  ]
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.9rem 0', overflowX: 'auto', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 max(1.5rem, calc((100% - 1200px) / 2))', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.75rem', minWidth: 'max-content' }}>
        {badges.map(({ Icon, label }, i) => (
          <Fragment key={label}>
            {i > 0 && <span style={{ width: 1, height: 13, background: 'var(--border2)', flexShrink: 0 }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--accent)', display: 'flex', flexShrink: 0 }}><Icon size={13} /></span>
              <span style={{ fontWeight: 500, fontSize: 13, color: 'var(--text3)', letterSpacing: '0.01em' }}>{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

// ─── Stats row : format cards avec contexte ───────────────────────────────────
const stats = (t) => [
  { Icon: IcoShield, num: 700, suffix: 'M+', text: null, unit: 'M+', label: t('home:stats.hibp.label'), context: t('home:stats.hibp.context') },
  { Icon: IcoKey, num: 128, suffix: ' car.', text: null, unit: 'car.', label: t('home:stats.generator.label'), context: t('home:stats.generator.context') },
  { Icon: IcoEye, num: null, suffix: '', text: t('home:stats.zeroAccess.text'), unit: '', label: t('home:stats.zeroAccess.label'), context: t('home:stats.zeroAccess.context') },
  { Icon: IcoLock, num: null, suffix: '', text: t('home:stats.encryption.text'), unit: t('home:stats.encryption.unit'), label: t('home:stats.encryption.label'), context: t('home:stats.encryption.context') },
]

function StatsRow() {
  const { t, i18n } = useTranslation('home')
  const STATS = stats(t)
  const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR'
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '3.5rem max(1.5rem, calc((100% - 1200px) / 2))' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {STATS.map(({ Icon, num, suffix, text, unit, label, context }, i) => (
          <Reveal key={label} delay={i * 80}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'border-color 0.2s, transform 0.2s', height: '100%' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: '0.2rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                  <Icon size={18} />
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  {text ? (
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '2rem', color: 'var(--sand)', letterSpacing: '-0.04em', lineHeight: 1 }}>{text}</span>
                  ) : (
                    <NumberFlow
                      value={triggered ? num : 0}
                      locales={locale}
                      suffix={suffix}
                      style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '2rem', color: 'var(--sand)', letterSpacing: '-0.04em', lineHeight: 1 }}
                    />
                  )}
                  {text && unit && <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent)' }}>{unit}</span>}
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: "'Space Grotesk', sans-serif" }}>{label}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.55 }}>{context}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

// ─── Features teaser ──────────────────────────────────────────────────────────
const mainFeatures = (t) => [
  { Icon: IcoVault, title: t('home:features.vault.title'), desc: t('home:features.vault.desc'), link: '/features' },
  { Icon: IcoShare, title: t('home:features.sharing.title'), desc: t('home:features.sharing.desc'), link: '/features' },
  { Icon: IcoActivity, title: t('home:features.audit.title'), desc: t('home:features.audit.desc'), link: '/features' },
  { Icon: IcoUsers, title: t('home:features.teams.title'), desc: t('home:features.teams.desc'), link: '/business' },
]

function FeaturesTeaser() {
  const { t, i18n } = useTranslation('home')
  const MAIN_FEATURES = mainFeatures(t)
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: '3rem', maxWidth: 560 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>{t('home:features.eyebrow')}</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>
              {t('home:features.title')}
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7 }}>{t('home:features.subtitle')}</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {MAIN_FEATURES.map(({ Icon, title, desc, link }, i) => (
            <Reveal key={title} delay={i * 80}>
              <Link to={localizedPath(link, i18n.language)} style={{ display: 'block', padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1.25rem' }}><Icon size={20} /></div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.5rem' }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 1.1rem' }}>{desc}</p>
                <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>{t('home:features.learnMore')} <IcoArrow size={11} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Comment ça marche ────────────────────────────────────────────────────────
function HowItWorksSection() {
  const { t } = useTranslation('home')
  const steps = [
    { n: '01', accent: 'var(--accent)', title: t('home:howItWorks.step1.title'), desc: t('home:howItWorks.step1.desc') },
    { n: '02', accent: 'var(--purple)', title: t('home:howItWorks.step2.title'), desc: t('home:howItWorks.step2.desc') },
    { n: '03', accent: 'var(--green)', title: t('home:howItWorks.step3.title'), desc: t('home:howItWorks.step3.desc') },
  ]
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>{t('home:howItWorks.eyebrow')}</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>{t('home:howItWorks.title')}</h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {steps.map(({ n, accent, title, desc }, i) => (
            <Reveal key={n} delay={i * 120}>
              <div style={{ padding: '2rem', borderRadius: 18, border: '1px solid var(--border)', background: 'var(--bg-card)', textAlign: 'center', height: '100%' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--bg2)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, color: accent }}>{n}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.6rem' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pourquoi DencPass ────────────────────────────────────────────────────────
const advantages = (t) => [
  {
    Icon: IcoZap,
    kicker: t('home:why.advFcfa.kicker'),
    title: t('home:why.advFcfa.title'),
    desc: t('home:why.advFcfa.desc'),
    points: t('home:why.advFcfa.points', { returnObjects: true }),
  },
  {
    Icon: IcoKey,
    kicker: t('home:why.advPassphrase.kicker'),
    title: t('home:why.advPassphrase.title'),
    desc: t('home:why.advPassphrase.desc'),
    points: t('home:why.advPassphrase.points', { returnObjects: true }),
  },
  {
    Icon: IcoServer,
    kicker: t('home:why.advHosting.kicker'),
    title: t('home:why.advHosting.title'),
    desc: t('home:why.advHosting.desc'),
    points: t('home:why.advHosting.points', { returnObjects: true }),
  },
]

const parity = (t) => t('home:why.parity', { returnObjects: true })

const roadmap = (t) => [
  { label: t('home:why.roadmapItem'), tag: t('home:why.roadmapTag') },
]

function PourquoiSection() {
  const { t } = useTranslation('home')
  const ADVANTAGES = advantages(t)
  const PARITY = parity(t)
  const ROADMAP = roadmap(t)
  return (
    <section style={{ padding: '6rem max(1.25rem, calc((100vw - 1080px) / 2))', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3.25rem', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>{t('home:why.eyebrow')}</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>{t('home:why.title')}</h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7 }}>{t('home:why.subtitle')}</p>
          </div>
        </Reveal>

        {/* 3 cards avantages */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {ADVANTAGES.map(({ Icon, kicker, title, desc, points }, i) => (
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
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.25rem' }} className="pourquoi-grid">
            {/* Parity */}
            <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1.1rem' }}>
                <span style={{ color: 'var(--green)', display: 'flex' }}><IcoCheck size={15} /></span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>{t('home:why.parityTitle')}</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {PARITY.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>
                    <span style={{ color: 'var(--green)', display: 'flex', flexShrink: 0, marginTop: 2 }}><IcoCheck size={13} /></span>{p}
                  </div>
                ))}
              </div>
            </div>
            {/* Roadmap */}
            <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: '1.1rem' }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, background: 'var(--amber)', opacity: 0.9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg)', flexShrink: 0, fontSize: 12, fontWeight: 800 }}>!</span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>{t('home:why.roadmapTitle')}</h3>
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.5, margin: '0 0 1rem' }}>{t('home:why.roadmapSubtitle')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {ROADMAP.map(({ label, tag }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.4 }}>{label}</span>
                    <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--amber)', letterSpacing: '0.06em' }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <style>{`@media (max-width:720px) { .pourquoi-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  )
}

// ─── Security ─────────────────────────────────────────────────────────────────
const securityCards = (t) => [
  { Icon: IcoShield, accent: 'var(--accent)', title: t('home:security.aes.title'), desc: t('home:security.aes.desc') },
  { Icon: IcoPhone, accent: 'var(--purple)', title: t('home:security.totp.title'), desc: t('home:security.totp.desc') },
  { Icon: IcoEye, accent: 'var(--green)', title: t('home:security.zeroKnowledge.title'), desc: t('home:security.zeroKnowledge.desc') },
  { Icon: IcoClipboard, accent: 'var(--amber)', title: t('home:security.audit.title'), desc: t('home:security.audit.desc') },
]

function SecuritySection() {
  const { t, i18n } = useTranslation('home')
  const SECURITY_CARDS = securityCards(t)
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>{t('home:security.eyebrow')}</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>{t('home:security.title')}</h2>
            </div>
            <Link to={localizedPath('/security', i18n.language)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", whiteSpace: 'nowrap' }}>
              {t('home:security.linkText')} <IcoArrow size={12} />
            </Link>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {SECURITY_CARDS.map(({ Icon, accent, title, desc }, i) => (
            <Reveal key={title} delay={(i % 2) * 100}>
              <div style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', gap: '1.1rem', alignItems: 'flex-start', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, flexShrink: 0 }}><Icon size={20} /></div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.4rem' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Transition band cyan→violet ──────────────────────────────────────────────
function TransitionBand() {
  const { t } = useTranslation('home')
  return (
    <div style={{ position: 'relative', background: 'var(--bg-alt)', padding: '0 max(1.25rem, calc((100vw - 1200px) / 2))', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 4, background: 'linear-gradient(90deg, var(--accent) 0%, var(--purple) 100%)', borderRadius: 4, boxShadow: '0 0 24px var(--purple-025)' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '3.25rem 0 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px', borderRadius: 100, border: '1px solid var(--purple-025)', background: 'var(--purple-06)', marginBottom: '0.4rem' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          <IcoArrow size={16} style={{ color: 'var(--text4)' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--purple)', display: 'inline-block' }} />
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--purple)', letterSpacing: '0.14em', marginLeft: 4 }}>{t('home:transitionBand.badge')}</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text3)', maxWidth: 520, margin: '1rem auto 0', lineHeight: 1.6 }}>
          {t('home:transitionBand.descBefore')}<strong style={{ color: 'var(--purple)' }}>{t('home:transitionBand.descPurple')}</strong>{t('home:transitionBand.descMid')}<strong style={{ color: 'var(--text2)' }}>{t('home:transitionBand.descTeams')}</strong>{t('home:transitionBand.descMid2')}<strong style={{ color: 'var(--accent)' }}>{t('home:transitionBand.descCyan')}</strong>{t('home:transitionBand.descAfter')}
        </p>
      </div>
    </div>
  )
}

// ─── Enterprise ───────────────────────────────────────────────────────────────
function EnterpriseSection() {
  const { t, i18n } = useTranslation('home')
  const items = t('home:enterprise.items', { returnObjects: true })
  return (
    <section style={{ position: 'relative', padding: '4rem max(1.25rem, calc((100vw - 1200px) / 2)) 6rem', background: 'var(--bg-alt)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%, var(--purple-06) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="ent-grid">
        <Reveal>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid var(--purple-025)', background: 'var(--purple-06)', marginBottom: '1.5rem' }}>
              <span style={{ color: 'var(--purple)', display: 'flex' }}><IcoBuilding size={13} /></span>
              <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--purple)', letterSpacing: '0.1em' }}>{t('home:enterprise.badge')}</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.15 }}>{t('home:enterprise.title')}</h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.8, marginBottom: '2rem' }}>{t('home:enterprise.desc')}</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to={localizedPath('/business', i18n.language)} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: 'var(--purple)', color: '#fff', fontSize: 14, boxShadow: '0 4px 24px var(--purple-025)' }}>
                {t('home:enterprise.ctaPrimary')} <IcoArrow />
              </Link>
              <Link to={localizedPath('/contact', i18n.language)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 12, border: '1px solid var(--purple-025)', color: 'var(--text2)', fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                {t('home:enterprise.ctaSecondary')}
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {items.map(item => (
              <div key={item} style={{ padding: '1rem', borderRadius: 12, border: '1px solid var(--purple-014)', background: 'var(--purple-06)', display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <span style={{ color: 'var(--purple)', flexShrink: 0, marginTop: 1 }}><IcoCheck size={13} /></span>
                <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@media (max-width:1000px) { .ent-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = (t) => [
  { quote: t('home:testimonials.t1.quote'), name: 'Mamadou Diallo', role: t('home:testimonials.t1.role'), company: 'FinServ Dakar', initial: 'MD', accent: 'var(--accent)' },
  { quote: t('home:testimonials.t2.quote'), name: 'Awa Konaré', role: t('home:testimonials.t2.role'), company: 'Kolibri Tech, Abidjan', initial: 'AK', accent: 'var(--purple)' },
  { quote: t('home:testimonials.t3.quote'), name: 'Ibrahima Ndiaye', role: t('home:testimonials.t3.role'), company: 'Cabinet Ndiaye & Associés', initial: 'IN', accent: 'var(--green)' },
]

function TestimonialsSection() {
  const { t } = useTranslation('home')
  const TESTIMONIALS = testimonials(t)
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>{t('home:testimonials.eyebrow')}</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>{t('home:testimonials.title')}</h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {TESTIMONIALS.map(({ quote, name, role, company, initial, accent }, i) => (
            <Reveal key={name} delay={i * 90}>
              <div style={{ padding: '2rem', borderRadius: 18, border: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ color: 'var(--amber)' }}><IcoStar size={13} /></span>)}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, margin: 0, flex: 1, fontStyle: 'italic' }}>"{quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, paddingTop: '1.1rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: `color-mix(in srgb, ${accent} 18%, transparent)`, border: `1px solid color-mix(in srgb, ${accent} 28%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: accent }}>{initial}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif" }}>{name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text4)' }}>{role} · {company}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing : grille 4 plans groupée (individuel + enterprise) ───────────────
function PricingTeaser() {
  const { t, i18n } = useTranslation('home')
  const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR'
  const [yearly, setYearly] = useState(false)
  const proMonthly = 2000, proYearly = 1600
  const proPrice = (yearly ? proYearly : proMonthly).toLocaleString(locale)

  const indivPlans = [
    {
      name: t('home:pricingTeaser.free.name'), tag: t('home:pricingTeaser.free.tag'), price: '0', popular: false,
      desc: t('home:pricingTeaser.free.desc'), cta: t('home:pricingTeaser.free.cta'),
      ctaHref: 'https://app.dencpass.com/register',
      features: [
        { ok: true, label: t('home:pricingTeaser.free.f1') },
        { ok: true, label: t('home:pricingTeaser.free.f2') },
        { ok: true, label: t('home:pricingTeaser.free.f3') },
        { ok: true, label: t('home:pricingTeaser.free.f4') },
        { ok: true, label: t('home:pricingTeaser.free.f5') },
        { ok: true, label: t('home:pricingTeaser.free.f6') },
      ],
    },
    {
      name: t('home:pricingTeaser.pro.name'), tag: t('home:pricingTeaser.pro.tag'), price: proPrice, popular: true,
      savings: yearly ? t('home:pricingTeaser.savings', { amount: ((proMonthly - proYearly) * 12).toLocaleString(locale) }) : '',
      desc: t('home:pricingTeaser.pro.desc'), cta: t('home:pricingTeaser.pro.cta'),
      ctaHref: 'https://app.dencpass.com/register',
      features: [
        { ok: true, label: t('home:pricingTeaser.pro.f1') },
        { ok: true, label: t('home:pricingTeaser.pro.f2') },
        { ok: true, label: t('home:pricingTeaser.pro.f3') },
        { ok: true, label: t('home:pricingTeaser.pro.f4') },
        { ok: true, label: t('home:pricingTeaser.pro.f5') },
        { ok: true, label: t('home:pricingTeaser.pro.f6') },
      ],
    },
  ]

  const orgPlans = [
    {
      name: t('home:pricingTeaser.cloud.name'), tag: t('home:pricingTeaser.cloud.tag'),
      desc: t('home:pricingTeaser.cloud.desc'),
      features: [t('home:pricingTeaser.cloud.f1'), t('home:pricingTeaser.cloud.f2'), t('home:pricingTeaser.cloud.f3'), t('home:pricingTeaser.cloud.f4'), t('home:pricingTeaser.cloud.f5'), t('home:pricingTeaser.cloud.f6')],
    },
    {
      name: t('home:pricingTeaser.onprem.name'), tag: t('home:pricingTeaser.onprem.tag'),
      desc: t('home:pricingTeaser.onprem.desc'),
      features: [t('home:pricingTeaser.onprem.f1'), t('home:pricingTeaser.onprem.f2'), t('home:pricingTeaser.onprem.f3'), t('home:pricingTeaser.onprem.f4'), t('home:pricingTeaser.onprem.f5'), t('home:pricingTeaser.onprem.f6')],
    },
  ]

  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>{t('home:pricingTeaser.eyebrow')}</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>{t('home:pricingTeaser.title')}</h2>
            <p style={{ fontSize: 16, color: 'var(--text2)', marginBottom: '1.75rem' }}>{t('home:pricingTeaser.subtitle')}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{t('home:pricingTeaser.monthly')}</span>
              <button onClick={() => setYearly(y => !y)} role="switch" aria-checked={yearly}
                style={{ width: 50, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', position: 'relative', background: yearly ? 'var(--accent)' : 'var(--accent-014)', transition: 'background 0.28s', flexShrink: 0 }}>
                <span style={{ position: 'absolute', top: 4, left: yearly ? 26 : 4, width: 20, height: 20, borderRadius: '50%', background: 'var(--bg)', transition: 'left 0.28s cubic-bezier(0.34,1.56,0.64,1)', display: 'block', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
              </button>
              <span style={{ fontSize: 14, color: 'var(--text2)' }}>{t('home:pricingTeaser.annual')} <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: 13 }}>−20%</span></span>
            </div>
          </div>
        </Reveal>

        <div className="hp-price-groups">
          {/* Groupe individuel : cyan */}
          <Reveal>
            <div style={{ border: '1px solid var(--border2)', borderRadius: 22, background: 'var(--bg-card)', padding: '1.5rem', position: 'relative', overflow: 'hidden', height: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--accent), var(--accent-014))' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.35rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.12em', margin: 0 }}>{t('home:pricingTeaser.indivLabel')}</p>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text3)', margin: '0 0 1.25rem' }}>{t('home:pricingTeaser.indivSub')}</p>
              <div className="hp-plan-pair">
                {indivPlans.map(p => (
                  <div key={p.name} style={{ position: 'relative', padding: '1.5rem 1.35rem', borderRadius: 16, border: p.popular ? '1px solid var(--border3)' : '1px solid var(--border)', background: 'var(--bg2)', display: 'flex', flexDirection: 'column' }}>
                    {p.popular && <div style={{ position: 'absolute', top: 0, right: 16, background: 'var(--accent)', color: 'var(--bg)', fontSize: 9, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', padding: '4px 9px', borderRadius: '0 0 7px 7px' }}>{p.tag}</div>}
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', margin: '0 0 0.35rem' }}>{p.tag}</p>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: 'var(--text)', margin: '0 0 0.6rem' }}>{p.name}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: '0.15rem' }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 30, color: 'var(--text)', letterSpacing: '-0.04em' }}>{p.price}</span>
                      <span style={{ fontSize: 11, color: 'var(--text4)' }}>{t('home:pricingTeaser.perMonth')}</span>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--green)', fontFamily: "'JetBrains Mono', monospace", margin: '0.1rem 0 0', minHeight: 16 }}>{p.savings || ''}</p>
                    <p style={{ fontSize: 12.5, color: 'var(--text3)', margin: '0.5rem 0 1.1rem', lineHeight: 1.5, minHeight: 34 }}>{p.desc}</p>
                    <a href={p.ctaHref} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '11px 0', borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: '1.1rem', background: 'var(--accent)', color: 'var(--bg)' }}>{p.cta}</a>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                      {p.features.map(f => (
                        <div key={f.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: f.ok ? 'var(--text2)' : 'var(--text5)', lineHeight: 1.4 }}>
                          <span style={{ flexShrink: 0, marginTop: 1, color: f.ok ? 'var(--accent)' : 'var(--text5)' }}>{f.ok ? <IcoCheck size={13} /> : <IcoX size={13} />}</span>{f.label}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Groupe organisations : violet */}
          <Reveal delay={80}>
            <div style={{ border: '1px solid var(--purple-025)', borderRadius: 22, background: 'var(--purple-06)', padding: '1.5rem', position: 'relative', overflow: 'hidden', height: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--purple), var(--purple-014))' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.35rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--purple)', display: 'inline-block' }} />
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--purple)', letterSpacing: '0.12em', margin: 0 }}>{t('home:pricingTeaser.orgLabel')}</p>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text3)', margin: '0 0 1.25rem' }}>{t('home:pricingTeaser.orgSub')}</p>
              <div className="hp-plan-pair">
                {orgPlans.map(p => (
                  <div key={p.name} style={{ padding: '1.5rem 1.35rem', borderRadius: 16, border: '1px solid var(--purple-014)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--purple)', letterSpacing: '0.12em', margin: '0 0 0.35rem' }}>{p.tag}</p>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text)', margin: '0 0 0.6rem', lineHeight: 1.2 }}>{p.name}</p>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--purple)', display: 'block', marginBottom: '0.15rem' }}>{t('home:pricingTeaser.onDemand')}</span>
                    <p style={{ fontSize: 12.5, color: 'var(--text3)', margin: '0.5rem 0 1.1rem', lineHeight: 1.5, minHeight: 52 }}>{p.desc}</p>
                    <Link to={localizedPath('/contact', i18n.language)} style={{ display: 'block', textAlign: 'center', padding: '11px 0', borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: '1.1rem', background: 'var(--purple)', color: '#fff' }}>{t('home:pricingTeaser.requestQuote')}</Link>
                    <div style={{ borderTop: '1px solid var(--purple-014)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                      {p.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.4 }}>
                          <span style={{ color: 'var(--purple)', flexShrink: 0, marginTop: 1 }}><IcoCheck size={13} /></span>{f}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text4)', marginTop: '2rem' }}>
            {t('home:pricingTeaser.footnote')}
          </p>
        </Reveal>
      </div>
      <style>{`
        .hp-price-groups { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
        .hp-plan-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 1000px) { .hp-price-groups { grid-template-columns: 1fr; } }
        @media (max-width: 480px) { .hp-plan-pair { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const { t } = useTranslation('home')
  const FAQS = [
    { q: t('home:faq.q1'), a: t('home:faq.a1') },
    { q: t('home:faq.q2'), a: t('home:faq.a2') },
    { q: t('home:faq.q3'), a: t('home:faq.a3') },
    { q: t('home:faq.q4'), a: t('home:faq.a4') },
  ]
  const [open, setOpen] = useState(null)
  return (
    <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: '1rem' }}>{t('home:faq.eyebrow')}</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,2.9rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>{t('home:faq.title')}</h2>
          </div>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ borderRadius: 14, border: `1px solid ${open === i ? 'var(--border3)' : 'var(--border)'}`, background: open === i ? 'var(--accent-004)' : 'var(--bg-card)', overflow: 'hidden', transition: 'border-color 0.2s, background 0.2s' }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.15rem 1.4rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, transition: 'transform 0.22s', transform: open === i ? 'rotate(180deg)' : 'none', display: 'flex' }}><IcoChevron /></span>
                </button>
                {open === i && <div style={{ padding: '0 1.4rem 1.25rem' }}><p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.8, margin: 0 }}>{faq.a}</p></div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA final ────────────────────────────────────────────────────────────────
function CTABanner() {
  const { t, i18n } = useTranslation('home')
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 50%, var(--accent-014) 0%, transparent 55%), radial-gradient(ellipse at 75% 50%, var(--purple-06) 0%, transparent 55%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--accent), var(--purple), transparent)' }} />
      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{t('home:ctaBanner.eyebrow')}</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', letterSpacing: '-0.05em', color: 'var(--sand)', margin: '0 0 1.25rem', lineHeight: 1.08 }}>
            {t('home:ctaBanner.titleLine1')}<br /><span style={{ background: 'linear-gradient(135deg, var(--accent), var(--purple))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('home:ctaBanner.titleLine2')}</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            {t('home:ctaBanner.subtitle').split('\n').map((line, i) => <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>)}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.dencpass.com/register" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '16px 36px', borderRadius: 14, background: 'var(--accent)', color: 'var(--bg)', fontSize: 16, boxShadow: '0 4px 32px var(--accent-014)' }}>
              {t('home:ctaBanner.ctaPrimary')} <IcoArrow size={17} />
            </a>
            <Link to={localizedPath('/contact', i18n.language)} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '16px 28px', borderRadius: 14, border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 16, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              {t('home:ctaBanner.ctaSecondary')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { t } = useTranslation('home')
  useDocumentTitle(t('home:meta.title'), t('home:meta.description'), '/')
  return (
    <PublicLayout>
      <HeroSection />
      <TrustBand />
      <StatsRow />
      <FeaturesTeaser />
      <HowItWorksSection />
      <PourquoiSection />
      <SecuritySection />
      <TransitionBand />
      <EnterpriseSection />
      <TestimonialsSection />
      <PricingTeaser />
      <FAQSection />
      <CTABanner />
    </PublicLayout>
  )
}
