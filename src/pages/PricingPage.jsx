import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import PublicLayout from '../components/layout/PublicLayout';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Reveal, IcoCheck, IcoX, IcoArrow, IcoChevron } from '../components/shared';
import { localizedPath } from '../utils/localizedPath';

/* ── Data ─────────────────────────────────────────── */
const groups = (t) => [
  {
    id: 'individuel',
    dot: 'var(--accent)',
    label: t('pricing:groups.individual.label'),
    sub: t('pricing:groups.individual.sub'),
    borderColor: 'var(--border2)',
    borderTop: 'var(--accent)',
    plans: [
      {
        tag: t('pricing:plans.free.tag'),
        tagColor: 'var(--accent)',
        tagBg: 'var(--accent-014)',
        badge: null,
        title: t('pricing:plans.free.title'),
        priceKey: 'free',
        desc: t('pricing:plans.free.desc'),
        cta: { label: t('pricing:plans.free.cta'), href: 'https://app.dencpass.com', external: true, style: 'outline' },
        accent: 'var(--accent)',
        features: [
          { label: t('pricing:plans.free.f1'), ok: true },
          { label: t('pricing:plans.free.f2'), ok: true },
          { label: t('pricing:plans.free.f3'), ok: true },
          { label: t('pricing:plans.free.f4'), ok: true },
          { label: t('pricing:plans.free.f5'), ok: true },
          { label: t('pricing:plans.free.f6'), ok: true },
          { label: t('pricing:plans.free.f7'), ok: false },
          { label: t('pricing:plans.free.f8'), ok: false },
        ],
      },
      {
        tag: t('pricing:plans.pro.tag'),
        tagColor: 'var(--accent)',
        tagBg: 'var(--accent-014)',
        badge: t('pricing:plans.pro.badge'),
        title: t('pricing:plans.pro.title'),
        priceKey: 'pro',
        desc: t('pricing:plans.pro.desc'),
        cta: { label: t('pricing:plans.pro.cta'), href: 'https://app.dencpass.com', external: true, style: 'accent' },
        accent: 'var(--accent)',
        features: [
          { label: t('pricing:plans.pro.f1'), ok: true },
          { label: t('pricing:plans.pro.f2'), ok: true },
          { label: t('pricing:plans.pro.f3'), ok: true },
          { label: t('pricing:plans.pro.f4'), ok: true },
          { label: t('pricing:plans.pro.f5'), ok: true },
          { label: t('pricing:plans.pro.f6'), ok: true },
          { label: t('pricing:plans.pro.f7'), ok: false },
        ],
      },
    ],
  },
  {
    id: 'enterprise',
    dot: 'var(--purple)',
    label: t('pricing:groups.enterprise.label'),
    sub: t('pricing:groups.enterprise.sub'),
    borderColor: 'var(--purple-025)',
    borderTop: 'var(--purple)',
    plans: [
      {
        tag: t('pricing:plans.cloud.tag'),
        tagColor: 'var(--purple)',
        tagBg: 'var(--purple-06)',
        badge: null,
        title: t('pricing:plans.cloud.title'),
        priceKey: 'cloud',
        desc: t('pricing:plans.cloud.desc'),
        cta: { label: t('pricing:plans.cloud.cta'), href: '/contact', external: false, style: 'purple' },
        accent: 'var(--purple)',
        features: [
          { label: t('pricing:plans.cloud.f1'), ok: true },
          { label: t('pricing:plans.cloud.f2'), ok: true },
          { label: t('pricing:plans.cloud.f3'), ok: true },
          { label: t('pricing:plans.cloud.f4'), ok: true },
          { label: t('pricing:plans.cloud.f5'), ok: true },
        ],
      },
      {
        tag: t('pricing:plans.onprem.tag'),
        tagColor: 'var(--purple)',
        tagBg: 'var(--purple-06)',
        badge: null,
        title: t('pricing:plans.onprem.title'),
        priceKey: 'onprem',
        desc: t('pricing:plans.onprem.desc'),
        cta: { label: t('pricing:plans.onprem.cta'), href: '/contact', external: false, style: 'purple' },
        accent: 'var(--purple)',
        features: [
          { label: t('pricing:plans.onprem.f1'), ok: true },
          { label: t('pricing:plans.onprem.f2'), ok: true },
          { label: t('pricing:plans.onprem.f3'), ok: true },
          { label: t('pricing:plans.onprem.f4'), ok: true },
          { label: t('pricing:plans.onprem.f5'), ok: true },
          { label: t('pricing:plans.onprem.f6'), ok: true },
        ],
      },
    ],
  },
];

const faqs = (t) => [
  { q: t('pricing:faq.q1'), a: t('pricing:faq.a1') },
  { q: t('pricing:faq.q2'), a: t('pricing:faq.a2') },
  { q: t('pricing:faq.q3'), a: t('pricing:faq.a3') },
  { q: t('pricing:faq.q4'), a: t('pricing:faq.a4') },
];

/* ── Subcomponents ────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.1rem 0', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.95rem',
          color: 'var(--text-head)', textAlign: 'left', gap: 16,
        }}
      >
        {q}
        <span style={{ color: 'var(--accent)', flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <IcoChevron size={18} />
        </span>
      </button>
      {open && <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.7, paddingBottom: '1.1rem' }}>{a}</p>}
    </div>
  );
}

function PlanCard({ plan, annual, accentOverride, locale, lang, onRequestLabel, perMonthLabel, billedAnnuallyLabel }) {
  const { tag, tagColor, tagBg, badge, title, priceKey, desc, cta, accent, features } = plan;

  const prices = { free: [0, 0], pro: [2000, 1600], cloud: null, onprem: null };
  const priceArr = prices[priceKey];
  const price = priceArr ? (annual ? priceArr[1] : priceArr[0]) : null;

  const btnStyle = {
    display: 'block', width: '100%', textAlign: 'center',
    padding: '0.7rem 1rem', borderRadius: 10,
    fontSize: '0.875rem', fontWeight: 700,
    fontFamily: 'Space Grotesk, sans-serif',
    cursor: 'pointer', border: 'none',
    transition: 'opacity 0.2s',
  };

  const styles = {
    accent: { background: 'var(--accent)', color: '#07111f' },
    purple: { background: 'var(--purple)', color: '#fff' },
    outline: { background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)' },
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid ${accentOverride === 'var(--purple)' ? 'var(--purple-025)' : 'var(--border2)'}`,
      borderRadius: 16,
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.9rem',
      position: 'relative',
    }}>
      {/* Badge flottant */}
      {badge && (
        <div style={{
          position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--accent)', color: '#07111f',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.64rem', fontWeight: 800,
          letterSpacing: '0.1em', padding: '3px 12px', borderRadius: 20,
          whiteSpace: 'nowrap',
        }}>
          {badge}
        </div>
      )}

      {/* Tag */}
      <span style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.64rem', fontWeight: 700,
        letterSpacing: '0.1em', color: tagColor, background: tagBg,
        padding: '3px 8px', borderRadius: 6, alignSelf: 'flex-start',
        textTransform: 'uppercase',
      }}>
        {tag}
      </span>

      {/* Title */}
      <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-head)', margin: 0 }}>
        {title}
      </h3>

      {/* Price */}
      {price !== null ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'var(--text-head)', lineHeight: 1 }}>
              {price.toLocaleString(locale)}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>{perMonthLabel}</span>
          </div>
          {annual && priceKey === 'pro' && (
            <p style={{ fontSize: '0.72rem', color: 'var(--text4)', marginTop: 2 }}>{billedAnnuallyLabel}</p>
          )}
        </div>
      ) : (
        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: accentOverride || accent, margin: 0 }}>
          {onRequestLabel}
        </p>
      )}

      {/* Desc */}
      <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.55, margin: 0 }}>{desc}</p>

      {/* CTA */}
      {cta.external ? (
        <a href={cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ ...btnStyle, ...styles[cta.style] }}>
          {cta.label}
        </a>
      ) : (
        <Link to={localizedPath(cta.href, lang)} className="btn-primary" style={{ ...btnStyle, ...styles[cta.style] }}>
          {cta.label}
        </Link>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)' }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {features.map(({ label, ok }) => (
          <li key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: ok ? 'var(--text2)' : 'var(--text4)' }}>
            <span style={{ color: ok ? accentOverride || accent : 'var(--text4)', flexShrink: 0, marginTop: 1 }}>
              {ok ? <IcoCheck size={14} /> : <IcoX size={14} />}
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────── */
export default function PricingPage() {
  const { t, i18n } = useTranslation('pricing');
  useDocumentTitle(t('pricing:meta.title'), t('pricing:meta.description'), '/pricing');

  const [annual, setAnnual] = useState(false);
  const toggleRef = useRef(null);

  const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR';
  const groupsList = groups(t);
  const faqsList = faqs(t);
  const onRequestLabel = t('pricing:onRequest');
  const perMonthLabel = t('pricing:perMonth');
  const billedAnnuallyLabel = t('pricing:billedAnnually');

  function handleToggle(toAnnual) {
    setAnnual(toAnnual);
    if (toAnnual && toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      confetti({
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
        spread: 60, startVelocity: 22, particleCount: 60, scalar: 0.8,
        colors: ['#2fd9f4', '#8b5cf6', '#f0e4c4', '#22c55e'],
      });
    }
  }

  return (
    <PublicLayout>
      <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ── Hero ── */}
        <section style={{
          padding: 'clamp(5rem,12vw,8rem) max(1.25rem, calc((100vw - 900px)/2)) clamp(2rem,4vw,3rem)',
          background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(47,217,244,0.07) 0%, transparent 70%)',
          textAlign: 'center',
        }}>
          <Reveal>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '1.25rem' }}>
              {t('pricing:hero.eyebrow')}
            </span>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.25rem)', color: 'var(--text-head)', lineHeight: 1.15, marginBottom: '1rem' }}>
              {t('pricing:hero.title')}
            </h1>
            <p style={{ fontSize: '1.0625rem', color: 'var(--text2)', maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.7 }}>
              {t('pricing:hero.subtitle')}
            </p>

            {/* Toggle mensuel / annuel */}
            <div ref={toggleRef} style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 30, padding: '4px' }}>
              <button onClick={() => handleToggle(false)} style={{
                padding: '0.45rem 1.1rem', borderRadius: 24, border: 'none', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
                background: !annual ? 'var(--accent)' : 'transparent',
                color: !annual ? '#07111f' : 'var(--text3)', transition: 'all 0.2s',
              }}>
                {t('pricing:hero.monthly')}
              </button>
              <button onClick={() => handleToggle(true)} style={{
                padding: '0.45rem 1.1rem', borderRadius: 24, border: 'none', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
                background: annual ? 'var(--accent)' : 'transparent',
                color: annual ? '#07111f' : 'var(--text3)', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {t('pricing:hero.annual')}
                <span style={{ fontSize: '0.68rem', background: 'rgba(34,197,94,0.15)', color: 'var(--green)', padding: '2px 7px', borderRadius: 20, fontWeight: 700 }}>
                  {t('pricing:hero.annualDiscount')}
                </span>
              </button>
            </div>
          </Reveal>
        </section>

        {/* ── Grille des plans ── */}
        <section style={{ padding: '1.5rem max(1.25rem, calc((100vw - 1160px)/2)) clamp(2.5rem,6vw,4rem)' }}>
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {groupsList.map(group => (
                <div key={group.id} style={{
                  background: group.id === 'enterprise' ? 'rgba(139,92,246,0.04)' : 'transparent',
                  border: `1px solid ${group.borderColor}`,
                  borderTop: `3px solid ${group.borderTop}`,
                  borderRadius: 20,
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}>
                  {/* En-tête groupe */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: '0.4rem' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: group.dot, flexShrink: 0, display: 'inline-block' }} />
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', color: group.dot, textTransform: 'uppercase' }}>
                        {group.label}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text2)' }}>{group.sub}</p>
                  </div>

                  {/* Plans 2 colonnes */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                    {group.plans.map(plan => (
                      <PlanCard
                        key={plan.title}
                        plan={plan}
                        annual={annual}
                        accentOverride={group.dot}
                        locale={locale}
                        lang={i18n.language}
                        onRequestLabel={onRequestLabel}
                        perMonthLabel={perMonthLabel}
                        billedAnnuallyLabel={billedAnnuallyLabel}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text3)' }}>
              {t('pricing:footnote')}
            </p>
          </Reveal>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: 'clamp(2.5rem,6vw,4rem) max(1.25rem, calc((100vw - 760px)/2))' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.3rem,3vw,1.75rem)', color: 'var(--text-head)', marginBottom: '1.75rem', textAlign: 'center' }}>
              {t('pricing:faq.title')}
            </h2>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 18, padding: '0 1.75rem' }}>
              {faqsList.map(faq => <FaqItem key={faq.q} {...faq} />)}
            </div>
          </Reveal>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: 'clamp(3rem,7vw,4.5rem) max(1.25rem, calc((100vw - 1100px)/2))', textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem,3.5vw,2.25rem)', color: 'var(--text-head)', marginBottom: '1rem' }}>
              {t('pricing:cta.title')}
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text2)', maxWidth: 460, margin: '0 auto 2rem', lineHeight: 1.7 }}>
              {t('pricing:cta.subtitle')}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={localizedPath('/contact', i18n.language)} className="btn-primary" style={{
                background: 'var(--accent)', color: '#07111f', border: 'none',
                padding: '0.85rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                {t('pricing:cta.ctaPrimary')} <IcoArrow size={16} />
              </Link>
              <a href="https://app.dencpass.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{
                background: 'transparent', color: 'var(--text)',
                border: '1px solid var(--border2)',
                padding: '0.85rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
              }}>
                {t('pricing:cta.ctaSecondary')}
              </a>
            </div>
          </Reveal>
        </section>

      </main>
    </PublicLayout>
  );
}
