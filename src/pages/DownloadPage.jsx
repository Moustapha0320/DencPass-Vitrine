import PublicLayout from '../components/layout/PublicLayout';
import { Reveal, IcoGlobe, IcoCode, IcoSmartphone, IcoArrow } from '../components/shared';

const available = [
  {
    Icon: IcoGlobe,
    title: 'Application web',
    desc: 'Accédez à votre coffre depuis n\'importe quel navigateur moderne. Aucune installation requise.',
    tag: 'Disponible',
    tagColor: 'var(--green)',
    tagBg: 'rgba(34,197,94,0.10)',
    cta: { label: 'Ouvrir l\'app', href: 'https://app.dencpass.com', external: true },
    accentBg: 'var(--accent-014)',
    accentColor: 'var(--accent)',
  },
  {
    Icon: IcoCode,
    title: 'Extension Chrome',
    desc: 'Remplissage automatique dans Chrome, Brave et tout navigateur Chromium. Installez en un clic.',
    tag: 'Disponible',
    tagColor: 'var(--green)',
    tagBg: 'rgba(34,197,94,0.10)',
    cta: { label: 'Installer l\'extension', href: 'https://chromewebstore.google.com/detail/dencpass/bcemgedgiblobnnpehlmbfnhejhlpnkb', external: true },
    accentBg: 'var(--accent-014)',
    accentColor: 'var(--accent)',
  },
];

const upcoming = [
  {
    title: 'Extension Firefox',
    desc: 'Compatible Firefox et Firefox ESR.',
    status: 'En développement',
  },
  {
    title: 'Extension Edge',
    desc: 'Compatible Microsoft Edge (Chromium).',
    status: 'En développement',
  },
  {
    title: 'Application Android',
    desc: 'Coffre natif avec remplissage automatique.',
    status: 'Feuille de route',
  },
  {
    title: 'Application iOS',
    desc: 'Coffre natif avec intégration iCloud Keychain.',
    status: 'Feuille de route',
  },
];

export default function DownloadPage() {
  return (
    <PublicLayout>
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section style={{
        padding: 'clamp(5rem,12vw,8rem) max(1.25rem, calc((100vw - 900px)/2)) clamp(3rem,6vw,5rem)',
        background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(47,217,244,0.07) 0%, transparent 70%)',
        textAlign: 'center',
      }}>
        <Reveal>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '1.25rem' }}>
            Téléchargements
          </span>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.25rem)', color: 'var(--text-head)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            DencPass, partout où<br />vous travaillez.
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.0625rem)', color: 'var(--text2)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Disponible dès maintenant sur le web et Chrome. Applications mobiles et autres extensions en cours de développement.
          </p>
        </Reveal>
      </section>

      {/* ── Available ── */}
      <section style={{ padding: 'clamp(2rem,5vw,3.5rem) max(1.25rem, calc((100vw - 1100px)/2))' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.75rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--green)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Disponible maintenant
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.5rem' }}>
            {available.map(({ Icon, title, desc, tag, tagColor, tagBg, cta, accentBg, accentColor }) => (
              <div key={title} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor }}>
                    <Icon size={24} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: tagColor, background: tagBg, padding: '3px 10px', borderRadius: 20 }}>
                    {tag}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-head)', marginBottom: '0.5rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>{desc}</p>
                </div>
                <a
                  href={cta.href}
                  {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="btn-primary"
                  style={{
                    background: 'var(--accent)', color: '#07111f', border: 'none',
                    padding: '0.75rem 1.25rem', borderRadius: 10, fontSize: '0.875rem',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, marginTop: 'auto',
                  }}
                >
                  {cta.label} <IcoArrow size={15} />
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Upcoming ── */}
      <section style={{ padding: 'clamp(2rem,5vw,3.5rem) max(1.25rem, calc((100vw - 1100px)/2))' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.75rem' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--amber)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Prochainement
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
            {upcoming.map(({ title, desc, status }, i) => (
              <div key={title} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                borderBottom: i < upcoming.length - 1 ? '1px solid var(--border)' : 'none',
                gap: '1rem', flexWrap: 'wrap',
              }}>
                <div>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-head)' }}>{title}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: 2 }}>{desc}</p>
                </div>
                <span style={{
                  fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600,
                  color: 'var(--amber)', background: 'rgba(245,158,11,0.10)',
                  padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap',
                }}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(3rem,7vw,4.5rem) max(1.25rem, calc((100vw - 1100px)/2))', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontSize: '1rem', color: 'var(--text2)', marginBottom: '1.25rem' }}>
            Vous voulez être prévenu à la sortie des prochaines versions ?
          </p>
          <a href="/contact" className="btn-primary" style={{
            background: 'var(--accent)', color: '#07111f', border: 'none',
            padding: '0.85rem 1.75rem', borderRadius: 10, fontSize: '0.9rem',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            Écrivez-nous <IcoArrow size={16} />
          </a>
        </Reveal>
      </section>

    </main>
    </PublicLayout>
  );
}
