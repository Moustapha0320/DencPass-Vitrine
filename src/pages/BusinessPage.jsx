import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import { Reveal, IcoArrow, IcoCheck, IcoUsers, IcoActivity, IcoServer, IcoShield, IcoKey, IcoClipboard, IcoBuilding, IcoGlobe } from '../components/shared'

const B2B_FEATURES = [
  {
    Icon: IcoUsers,
    title: 'Organisations multi-tenant',
    desc: 'Plusieurs organisations sur la même instance. Isolation totale des données entre entités, idéal pour les groupes et filiales.',
  },
  {
    Icon: IcoShield,
    title: 'Groupes & permissions',
    desc: 'Définissez des rôles (admin, membre, lecteur) et des groupes. Les entrées du coffre héritent des permissions de leur groupe.',
  },
  {
    Icon: IcoActivity,
    title: 'SIEM & Activity log',
    desc: 'Chaque action tracée en temps réel. Export vers Splunk, Elastic, Wazuh via webhook HTTP ou Syslog RFC 5424.',
  },
  {
    Icon: IcoClipboard,
    title: 'Audit d\'activité centralisé',
    desc: 'Vue globale sur l\'ensemble des accès : qui a ouvert quoi, quand, depuis quelle IP. Logs structurés JSON horodatés.',
  },
  {
    Icon: IcoServer,
    title: 'Active Directory (LDAP)',
    desc: 'Authentification native via votre AD/LDAP existant. Synchronisation des utilisateurs et groupes depuis votre annuaire.',
  },
  {
    Icon: IcoKey,
    title: 'Coffre des secrets API',
    desc: 'Tokens SSH, clés API, credentials base de données, partagés entre équipes avec journal d\'accès complet par entrée.',
  },
]

const TIERS = [
  {
    label: 'Startup (< 10 personnes)',
    plan: 'Community / Pro',
    desc: 'Comptes individuels Pro pour chaque membre. Partages via liens temporaires. Pas besoin d\'Enterprise pour commencer.',
    price: '2 000 FCFA / membre / mois',
    cta: { label: 'Commencer en Pro', href: 'https://app.dencpass.com/register' },
  },
  {
    label: 'PME (10–200 personnes)',
    plan: 'Enterprise SaaS',
    desc: 'Gestion centralisée, équipes et groupes, audit d\'activité. Hébergé et maintenu par DencPass, rien à gérer côté infrastructure.',
    price: 'Sur devis, paiement FCFA',
    cta: { label: 'Demander un devis', to: '/contact' },
    highlight: true,
  },
  {
    label: 'Grande entreprise / Gouvernement',
    plan: 'Enterprise On-Premise',
    desc: 'Déployé sur votre infrastructure (Docker ou bare metal). Données sur vos serveurs, intégration AD, SIEM et conformité totale.',
    price: 'Licence annuelle sur devis',
    cta: { label: 'Contacter notre équipe', to: '/contact' },
  },
]

export default function BusinessPage() {
  useEffect(() => { document.title = 'Entreprises | DencPass' }, [])

  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ paddingTop: 62, minHeight: '70vh', display: 'flex', alignItems: 'center', background: 'var(--bg)', position: 'relative', overflow: 'hidden', padding: '120px max(1.5rem, calc((100% - 1200px) / 2)) 5rem' }} className="section-pad">
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 13px', borderRadius: 100, border: '1px solid rgba(139,92,246,0.25)', background: 'rgba(139,92,246,0.07)', marginBottom: '1.75rem', animation: 'fade-up 0.6s ease both 0.05s' }}>
              <IcoBuilding size={13} style={{ color: '#8b5cf6' }} />
              <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#8b5cf6', letterSpacing: '0.1em' }}>ENTERPRISE · POUR LES ÉQUIPES</span>
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem,5.5vw,4rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.25rem', lineHeight: 1.05, maxWidth: 700 }}>
              Gestion centralisée.<br />Contrôle total.
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text3)', maxWidth: 560, marginBottom: '2.5rem', lineHeight: 1.8, fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
              DencPass Enterprise donne à vos équipes IT une visibilité totale sur les accès, avec les outils qu'elles utilisent déjà : LDAP, SIEM, webhooks. Déployé en SaaS ou sur votre infrastructure.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animation: 'fade-up 0.7s ease both 0.35s' }}>
              <Link to="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 13, background: '#8b5cf6', color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 28px rgba(139,92,246,0.35)' }}>
                Demander une démo <IcoArrow />
              </Link>
              <Link to="/pricing" className="btn-ghost"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 26px', borderRadius: 13, border: '1px solid rgba(139,92,246,0.3)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                Voir les tarifs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* B2B Features */}
      <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '3.5rem' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8b5cf6', letterSpacing: '0.16em', marginBottom: '1rem' }}>FONCTIONNALITÉS ENTERPRISE</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>
                Tout ce que l'IT attend.
              </h2>
            </div>
          </Reveal>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {B2B_FEATURES.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={(i % 3) * 90}>
                <div className="card-hover" style={{ padding: '1.75rem', borderRadius: 16, border: '1px solid rgba(139,92,246,0.12)', background: 'var(--bg-card)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', marginBottom: '1rem' }}><Icon /></div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-head)', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.45rem' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers by company size */}
      <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)' }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8b5cf6', letterSpacing: '0.16em', marginBottom: '1rem' }}>PAR TAILLE D'ÉQUIPE</p>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: 0, lineHeight: 1.1 }}>
                Adapté à votre structure.
              </h2>
            </div>
          </Reveal>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
            {TIERS.map((tier, i) => (
              <Reveal key={tier.label} delay={i * 100}>
                <div className="price-card" style={{ padding: '2.25rem', borderRadius: 20, border: tier.highlight ? '1px solid rgba(139,92,246,0.45)' : '1px solid rgba(139,92,246,0.12)', background: 'var(--bg-card)', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: tier.highlight ? '0 24px 64px rgba(139,92,246,0.1)' : 'none', boxSizing: 'border-box' }}>
                  {tier.highlight && <div style={{ position: 'absolute', top: 0, right: 20, background: '#8b5cf6', color: '#fff', fontSize: 9, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', padding: '4px 10px', borderRadius: '0 0 8px 8px' }}>RECOMMANDÉ</div>}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: tier.highlight ? 'linear-gradient(90deg,#8b5cf6,rgba(139,92,246,0.2))' : 'linear-gradient(90deg,rgba(139,92,246,0.3),transparent)', pointerEvents: 'none' }} />
                  <p style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: '#8b5cf6', letterSpacing: '0.1em', marginBottom: '0.5rem', opacity: 0.8 }}>{tier.label.toUpperCase()}</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: '0.75rem' }}>{tier.plan}</p>
                  <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.7, flex: 1, marginBottom: '1.5rem' }}>{tier.desc}</p>
                  <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', marginBottom: '1.25rem' }}>
                    <p style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: '#8b5cf6', margin: 0 }}>{tier.price}</p>
                  </div>
                  {tier.cta.to
                    ? <Link to={tier.cta.to}
                        style={{ display: 'block', textAlign: 'center', padding: '12px 0', borderRadius: 11, fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.2s', ...(tier.highlight ? { background: '#8b5cf6', color: '#fff', boxShadow: '0 4px 20px rgba(139,92,246,0.3)' } : { background: 'transparent', border: '1px solid rgba(139,92,246,0.25)', color: '#8b5cf6' }) }}>
                        {tier.cta.label}
                      </Link>
                    : <a href={tier.cta.href}
                        style={{ display: 'block', textAlign: 'center', padding: '12px 0', borderRadius: 11, fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.2s', ...(tier.highlight ? { background: '#8b5cf6', color: '#fff', boxShadow: '0 4px 20px rgba(139,92,246,0.3)' } : { background: 'transparent', border: '1px solid rgba(139,92,246,0.25)', color: '#8b5cf6' }) }}>
                        {tier.cta.label}
                      </a>
                  }
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Security for enterprise */}
      <section style={{ padding: '7rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg-alt)' }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
            <Reveal>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8b5cf6', letterSpacing: '0.16em', marginBottom: '1rem' }}>SÉCURITÉ ENTREPRISE</p>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1.25rem', lineHeight: 1.15 }}>
                  Conformité et contrôle.
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text3)', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                  DencPass Enterprise est conçu pour répondre aux exigences des équipes sécurité les plus strictes : traçabilité totale, chiffrement AES-256-GCM, intégrations SIEM.
                </p>
                <Link to="/security" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#2fd9f4' }}>
                  Architecture de sécurité complète <IcoArrow size={13} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Chiffrement AES-256-GCM', sub: 'Chaque entrée chiffrée individuellement' },
                  { label: 'Chiffrement géré par infrastructure', sub: 'Clés protégées et accès audité côté serveur' },
                  { label: 'Logs d\'audit complets', sub: 'Export JSON, Syslog, webhook SIEM' },
                  { label: 'Contrôle d\'accès RBAC', sub: 'Rôles et permissions granulaires' },
                  { label: 'On-Premise disponible', sub: 'Données sur vos serveurs, sous votre contrôle' },
                  { label: 'RGPD & conformité', sub: 'Hébergement UE, DPA disponible' },
                ].map(({ label, sub }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.9rem 1.1rem', borderRadius: 12, border: '1px solid rgba(139,92,246,0.1)', background: 'var(--bg-card)' }}>
                    <span style={{ color: '#8b5cf6', flexShrink: 0 }}><IcoCheck size={14} /></span>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text2)', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>{label}</p>
                      <p style={{ fontSize: 12, color: 'var(--text5)', margin: 0 }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', background: 'var(--bg)', textAlign: 'center' }} className="section-pad">
        <Reveal>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '3rem', borderRadius: 24, border: '1px solid rgba(139,92,246,0.2)', background: 'linear-gradient(135deg, rgba(139,92,246,0.05) 0%, rgba(47,217,244,0.03) 100%)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#8b5cf6', letterSpacing: '0.16em', marginBottom: '1rem', position: 'relative' }}>DÉMARRER</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', letterSpacing: '-0.035em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1, position: 'relative' }}>
              Prêt à protéger votre organisation ?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text3)', marginBottom: '2rem', position: 'relative' }}>
              Contactez-nous pour une démo personnalisée et un devis adapté à votre équipe.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link to="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: '#8b5cf6', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 24px rgba(139,92,246,0.3)' }}>
                Demander une démo <IcoArrow />
              </Link>
              <Link to="/pricing"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 12, border: '1px solid rgba(139,92,246,0.3)', color: 'var(--text3)', fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                Voir les tarifs
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PublicLayout>
  )
}
