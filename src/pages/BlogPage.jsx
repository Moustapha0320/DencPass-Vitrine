import { Link } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import { Reveal, IcoArrow } from '../components/shared'
import { ARTICLES, ARTICLE_CATEGORY_STYLES } from '../data/blog'

function CategoryBadge({ category }) {
  const s = ARTICLE_CATEGORY_STYLES[category] ?? { color: 'var(--text3)', bg: 'var(--bg3)' }
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

function ArticleCard({ article, delay }) {
  return (
    <Reveal delay={delay} style={{ height: '100%' }}>
      <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <article style={{
          height: '100%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '1.6rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
          cursor: 'pointer',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(47,217,244,0.28)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(47,217,244,0.07)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <CategoryBadge category={article.category} />
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text5)' }}>
              {article.readTime} de lecture
            </span>
          </div>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.3, margin: 0 }}>
            {article.title}
          </h2>

          <p style={{ fontSize: 13.5, color: 'var(--text3)', lineHeight: 1.7, margin: 0, flex: 1 }}>
            {article.excerpt}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
            <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text5)' }}>
              {article.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--accent)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              Lire <IcoArrow size={13} />
            </span>
          </div>
        </article>
      </Link>
    </Reveal>
  )
}

export default function BlogPage() {
  return (
    <PublicLayout>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ── Hero ── */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          padding: '6rem max(1.5rem, calc((100% - 1100px) / 2)) 3.5rem',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, var(--accent-014) 0%, transparent 55%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid var(--border2)', background: 'var(--accent-004)', marginBottom: '1.4rem' }}>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', letterSpacing: '0.1em' }}>BLOG</span>
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.08 }}>
                Ressources & perspectives.
              </h1>
              <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>
                Sécurité numérique, pratiques professionnelles, et les coulisses de DencPass — pour les équipes qui prennent leurs données au sérieux.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Articles grid ── */}
        <section style={{ padding: '1rem max(1.5rem, calc((100% - 1100px) / 2)) 7rem' }}>
          {ARTICLES.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text4)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
              Aucun article pour l'instant — revenez bientôt.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: '1.25rem',
            }}>
              {ARTICLES.map((article, i) => (
                <ArticleCard key={article.slug} article={article} delay={i * 80} />
              ))}
            </div>
          )}
        </section>

      </div>
    </PublicLayout>
  )
}
