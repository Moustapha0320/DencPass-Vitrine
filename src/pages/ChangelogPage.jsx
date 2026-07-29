import PublicLayout from '../components/layout/PublicLayout'
import { Reveal } from '../components/shared'
import { CHANGELOG, CATEGORY_STYLES } from '../data/changelog'

function CategoryBadge({ category }) {
  const s = CATEGORY_STYLES[category] ?? { color: 'var(--text3)', bg: 'var(--bg3)' }
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 100,
      fontSize: 11,
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 600,
      letterSpacing: '0.06em',
      color: s.color,
      background: s.bg,
      border: `1px solid ${s.color}33`,
      whiteSpace: 'nowrap',
    }}>
      {category}
    </span>
  )
}

export default function ChangelogPage() {
  return (
    <PublicLayout>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ── Hero ── */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          padding: '6rem max(1.5rem, calc((100% - 800px) / 2)) 3rem',
          background: 'var(--bg)',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 0%, var(--purple-014) 0%, transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid var(--border2)', background: 'var(--purple-06)', marginBottom: '1.4rem' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--purple)', letterSpacing: '0.1em' }}>HISTORIQUE DES VERSIONS</span>
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.08 }}>
                Ce qui change.
              </h1>
              <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 480, margin: 0 }}>
                Chaque mise à jour, correctif et amélioration, dans l'ordre chronologique inverse.
                Les dates marquées <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--text4)', fontSize: 13 }}>XX</span> seront complétées avant publication.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section style={{ padding: '2rem max(1.5rem, calc((100% - 800px) / 2)) 6rem' }}>
          <div style={{ position: 'relative' }}>

            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 8,
              bottom: 0,
              width: 1,
              background: 'linear-gradient(to bottom, var(--border3), var(--border), transparent)',
              pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {CHANGELOG.map((entry, i) => (
                <Reveal key={entry.id} delay={i * 60}>
                  <div style={{ display: 'flex', gap: '2rem', paddingLeft: '2rem', paddingBottom: '2.5rem', position: 'relative' }}>

                    {/* Dot on the line */}
                    <div style={{
                      position: 'absolute',
                      left: -5,
                      top: 8,
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      background: CATEGORY_STYLES[entry.category]?.color ?? 'var(--border3)',
                      border: '2px solid var(--bg)',
                      boxShadow: `0 0 0 3px ${(CATEGORY_STYLES[entry.category]?.bg ?? 'transparent')}`,
                      flexShrink: 0,
                    }} />

                    {/* Left meta column */}
                    <div style={{ width: 120, flexShrink: 0, paddingTop: 2 }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text5)', marginBottom: 6, letterSpacing: '0.04em' }}>
                        {entry.date}
                      </p>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text4)', fontWeight: 600 }}>
                        {entry.version}
                      </p>
                    </div>

                    {/* Right content */}
                    <div style={{
                      flex: 1,
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 14,
                      padding: '1.25rem 1.5rem',
                      transition: 'border-color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                        <CategoryBadge category={entry.category} />
                      </div>
                      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text)', letterSpacing: '-0.02em', margin: '0 0 0.55rem', lineHeight: 1.3 }}>
                        {entry.title}
                      </h2>
                      <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.75, margin: 0 }}>
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA bottom ── */}
        <section style={{ padding: '0 max(1.5rem, calc((100% - 800px) / 2)) 6rem' }}>
          <Reveal>
            <div style={{ textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
              <p style={{ fontSize: 14, color: 'var(--text4)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '1rem', letterSpacing: '0.04em' }}>
                Vous avez une suggestion ou un bug à signaler ?
              </p>
              <a href="mailto:support@dencpass.com"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 10, border: '1px solid var(--border2)', background: 'transparent', color: 'var(--text2)', fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, transition: 'border-color 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text2)' }}
              >
                Contacter l'équipe
              </a>
            </div>
          </Reveal>
        </section>

        <style>{`
          @media (max-width: 600px) {
            .cl-meta { display: none !important; }
          }
        `}</style>
      </div>
    </PublicLayout>
  )
}
