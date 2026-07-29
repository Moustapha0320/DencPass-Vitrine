import { Link, useParams } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import { Reveal, IcoArrow } from '../components/shared'
import { ARTICLES, ARTICLE_CATEGORY_STYLES } from '../data/blog'

function CategoryBadge({ category }) {
  const s = ARTICLE_CATEGORY_STYLES[category] ?? { color: 'var(--text3)', bg: 'var(--bg3)' }
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 100,
      fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: '0.06em',
      color: s.color, background: s.bg, border: `1px solid ${s.color}33`, whiteSpace: 'nowrap',
    }}>
      {category}
    </span>
  )
}

// ─── Content block renderer ────────────────────────────────────────────────────
function ContentBlock({ block }) {
  const isPlaceholder = block.type === 'placeholder' ||
    (typeof block.text === 'string' && block.text.startsWith('[PLACEHOLDER'))

  const placeholderStyle = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    color: 'var(--amber)',
    background: 'rgba(245,158,11,0.07)',
    border: '1px dashed rgba(245,158,11,0.35)',
    borderRadius: 8,
    padding: '0.75rem 1rem',
    lineHeight: 1.65,
  }

  switch (block.type) {
    case 'intro':
      return isPlaceholder
        ? <p style={placeholderStyle}>{block.text}</p>
        : <p style={{ fontSize: 17, color: 'var(--text2)', lineHeight: 1.8, fontWeight: 400, borderLeft: '2px solid var(--accent)', paddingLeft: '1.25rem', marginBottom: '2rem' }}>{block.text}</p>

    case 'h2':
      return <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(1.15rem,2.5vw,1.35rem)', color: 'var(--text)', letterSpacing: '-0.025em', margin: '2.25rem 0 0.75rem', lineHeight: 1.3 }}>{block.text}</h2>

    case 'h3':
      return <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1rem', color: 'var(--text2)', margin: '1.5rem 0 0.5rem', lineHeight: 1.4 }}>{block.text}</h3>

    case 'p':
      return isPlaceholder
        ? <p style={{ ...placeholderStyle, marginBottom: '1rem' }}>{block.text}</p>
        : <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.85, marginBottom: '1rem' }}>{block.text}</p>

    case 'ul':
      return (
        <ul style={{ paddingLeft: '1.25rem', margin: '0.5rem 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {block.items.map((item, i) => {
            const ph = item.startsWith('[PLACEHOLDER')
            return (
              <li key={i} style={{
                fontSize: ph ? 12 : 15,
                color: ph ? 'var(--amber)' : 'var(--text2)',
                lineHeight: 1.7,
                fontFamily: ph ? "'JetBrains Mono', monospace" : 'inherit',
              }}>
                {item}
              </li>
            )
          })}
        </ul>
      )

    case 'ol':
      return (
        <ol style={{ paddingLeft: '1.25rem', margin: '0.5rem 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.7 }}>{item}</li>
          ))}
        </ol>
      )

    case 'callout':
      return (
        <div style={{
          background: isPlaceholder ? 'rgba(245,158,11,0.05)' : 'var(--accent-004)',
          border: `1px solid ${isPlaceholder ? 'rgba(245,158,11,0.3)' : 'var(--border2)'}`,
          borderRadius: 12,
          padding: '1rem 1.25rem',
          margin: '1.5rem 0',
          fontSize: isPlaceholder ? 12 : 14,
          color: isPlaceholder ? 'var(--amber)' : 'var(--text2)',
          fontFamily: isPlaceholder ? "'JetBrains Mono', monospace" : 'inherit',
          lineHeight: 1.75,
        }}>
          {block.text}
        </div>
      )

    default:
      return null
  }
}

// ─── 404 within the blog layout ───────────────────────────────────────────────
function ArticleNotFound() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1.5rem' }}>
      <Reveal>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text4)', letterSpacing: '0.12em', marginBottom: '1rem' }}>404 · ARTICLE INTROUVABLE</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1rem' }}>Cet article n'existe pas.</h1>
        <p style={{ fontSize: 15, color: 'var(--text3)', marginBottom: '2rem' }}>Il a peut-être été déplacé ou n'a pas encore été publié.</p>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 10, background: 'var(--accent)', color: '#07111f', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", textDecoration: 'none' }}>
          Tous les articles
        </Link>
      </Reveal>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const { slug } = useParams()
  const article = ARTICLES.find(a => a.slug === slug)

  if (!article) {
    return <PublicLayout><ArticleNotFound /></PublicLayout>
  }

  const accentColor = ARTICLE_CATEGORY_STYLES[article.category]?.color ?? 'var(--accent)'

  return (
    <PublicLayout>
      <article style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ── Hero ── */}
        <header style={{
          position: 'relative', overflow: 'hidden',
          padding: '5.5rem max(1.5rem, calc((100% - 760px) / 2)) 3rem',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${accentColor}15 0%, transparent 60%)`, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Reveal>
              {/* Back link */}
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text4)', fontFamily: "'Inter', sans-serif", marginBottom: '1.75rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text4)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                Blog
              </Link>

              <CategoryBadge category={article.category} />

              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '1rem 0 1.25rem', lineHeight: 1.1 }}>
                {article.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text5)' }}>{article.date}</span>
                <span style={{ color: 'var(--border2)' }}>·</span>
                <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text5)' }}>{article.readTime} de lecture</span>
              </div>
            </Reveal>
          </div>
        </header>

        {/* ── Divider ── */}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 max(1.5rem, 0px)', borderTop: '1px solid var(--border)' }} />

        {/* ── Article body ── */}
        <Reveal>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem max(1.5rem, 0px) 7rem' }}>
            {article.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}

            {/* ── Back + CTA ── */}
            <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--text3)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                Tous les articles
              </Link>
              <a href="https://app.dencpass.com/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: 'var(--accent)', color: '#07111f', fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", textDecoration: 'none' }}>
                Essayer DencPass gratuitement <IcoArrow size={13} />
              </a>
            </div>
          </div>
        </Reveal>

      </article>
    </PublicLayout>
  )
}
