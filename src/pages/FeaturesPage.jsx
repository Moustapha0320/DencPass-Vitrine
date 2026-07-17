import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import {
  Reveal,
  IcoShield, IcoKey, IcoZap, IcoShare, IcoVault, IcoGlobe,
  IcoCert, IcoUsers, IcoPhone, IcoEye, IcoClipboard, IcoLock,
  IcoSearch, IcoCopy, IcoCheck, IcoArrow, IcoCode,
} from '../components/shared'

const FEATURES = [
  {
    Icon: IcoVault,
    accent: '#2fd9f4',
    title: 'Coffre-fort chiffré',
    desc: 'Organisez tous vos mots de passe, notes secrètes et clés API dans des dossiers hiérarchisés. Recherche instantanée parmi toutes vos entrées.',
    tags: ['Dossiers & sous-dossiers', 'Tags & filtres', 'Recherche fulltext', 'Corbeille sécurisée'],
  },
  {
    Icon: IcoKey,
    accent: '#8b5cf6',
    title: 'Générateur de mots de passe',
    desc: 'Créez des mots de passe forts sur mesure : longueur, complexité, caractères spéciaux, mots mémorables, votre choix.',
    tags: ['Longueur jusqu\'à 128 caractères', 'Règles configurables', 'Mots de passe mémorables', 'Historique de génération'],
  },
  {
    Icon: IcoShare,
    accent: '#f59e0b',
    title: 'Partage sécurisé',
    desc: 'Partagez des secrets avec des collègues ou des clients via des liens chiffrés à durée limitée, sans jamais exposer le mot de passe en clair.',
    tags: ['Liens temporaires', 'Expiration configurable', 'Révocation instantanée', 'Journal des accès'],
  },
  {
    Icon: IcoPhone,
    accent: '#22c55e',
    title: 'Double authentification (2FA)',
    desc: 'Sécurisez votre compte avec une authentification TOTP compatible avec tous les authenticateurs du marché.',
    tags: ['Google Authenticator', 'Authy / 1Password', 'Codes à 6 chiffres', 'Rotation 30 secondes'],
  },
  {
    Icon: IcoCode,
    accent: '#2fd9f4',
    title: 'Extension Chrome',
    desc: 'Remplissage automatique des formulaires web, détection des pages de connexion et génération à la volée depuis le navigateur.',
    tags: ['Remplissage auto', 'Détection de domaine', 'Générer & enregistrer', 'Mode hors-ligne'],
  },
  {
    Icon: IcoZap,
    accent: '#f59e0b',
    title: 'Passphrase africaine',
    desc: 'Générez des phrases de passe mémorables construites à partir de mots en Wolof, Swahili, Bambara, Hausa et d\'autres langues du continent.',
    tags: ['Wolof · Swahili · Bambara', 'Hausa · Yoruba · Zulu', 'Facile à retenir', 'Séparateur personnalisable'],
  },
  {
    Icon: IcoShield,
    accent: '#ef4444',
    title: 'Détection HIBP',
    desc: 'Vérification automatique de vos mots de passe contre la base Have I Been Pwned (700M+ fuites), sans jamais envoyer votre mot de passe.',
    tags: ['700M+ mots de passe vérifiés', 'Hachage k-anonymat', 'Alertes en temps réel', 'Rapport de sécurité'],
  },
  {
    Icon: IcoUsers,
    accent: '#f59e0b',
    title: 'Gestion d\'équipes',
    desc: 'Coffres partagés, rôles et permissions granulaires, onboarding en un clic, pensé pour les équipes africaines de toutes tailles.',
    tags: ['Coffres partagés', 'Rôles Admin/Membre/Invité', 'Onboarding rapide', 'Logs d\'audit'],
  },
  {
    Icon: IcoGlobe,
    accent: '#2fd9f4',
    title: 'Africa-first',
    desc: 'Interface en français et en langues locales. Paiement en FCFA, Orange Money et Wave. Infrastructure hébergée pour la conformité locale.',
    tags: ['Interface en français', 'Paiement FCFA / Wave', 'Conformité RGPD & APDP', 'Support local'],
  },
]

const COMPARE = [
  { label: 'Chiffrement AES-256-GCM',       dp: true,  others: true  },
  { label: 'Zéro connaissance',              dp: true,  others: true  },
  { label: '2FA TOTP',                       dp: true,  others: true  },
  { label: 'Extension navigateur',           dp: true,  others: true  },
  { label: 'Passphrase en langues africaines', dp: true,  others: false },
  { label: 'Paiement en FCFA / Wave',        dp: true,  others: false },
  { label: 'Interface en français',          dp: true,  others: false },
  { label: 'Hébergement conforme Africa',    dp: true,  others: false },
  { label: 'Support équipes africaines',     dp: true,  others: false },
  { label: 'Plan gratuit illimité (1 user)', dp: true,  others: false },
]

export default function FeaturesPage() {
  useEffect(() => { document.title = 'Fonctionnalités | DencPass' }, [])

  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{ paddingTop: '7rem', paddingBottom: '5rem', textAlign: 'center' }} className="section-pad">
        <Reveal>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Fonctionnalités
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem,5vw,3.8rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1.25rem', lineHeight: 1.12 }}>
            Tout ce qu'il faut.<br />Rien de superflu.
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text3)', maxWidth: 560, margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
            DencPass combine sécurité militaire et expérience fluide, avec des fonctionnalités conçues pour les utilisateurs et les équipes d'Afrique.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://app.dencpass.com/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, background: '#2fd9f4', color: '#07111f', fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 2px 24px rgba(47,217,244,0.3)' }}>
              Essayer gratuitement
            </a>
            <Link to="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 12, border: '1px solid rgba(47,217,244,0.25)', color: 'var(--text)', fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", background: 'transparent' }} className="btn-ghost">
              Télécharger l'app
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Features grid */}
      <section style={{ paddingBottom: '5rem' }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {FEATURES.map(({ Icon, accent, title, desc, tags }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="card-hover" style={{ borderRadius: 18, border: '1px solid var(--border)', background: 'var(--bg-card)', padding: '1.75rem', height: '100%', boxSizing: 'border-box' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${accent}18`, border: `1px solid ${accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: accent }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: 'var(--text)', margin: '0 0 0.6rem', letterSpacing: '-0.02em' }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.6, margin: '0 0 1.25rem' }}>{desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {tags.map(t => (
                      <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--text2)' }}>
                        <span style={{ color: accent, flexShrink: 0 }}><IcoCheck size={13} /></span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section style={{ paddingTop: '4rem', paddingBottom: '5rem', background: 'var(--bg-alt)' }} className="section-pad">
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#2fd9f4', letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '0.75rem' }}>Pourquoi DencPass</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', letterSpacing: '-0.04em', color: 'var(--text)', margin: '0 0 0.75rem', textAlign: 'center' }}>
              Fait pour l'Afrique, dès le départ.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text3)', textAlign: 'center', margin: '0 0 2.5rem' }}>
              Les gestionnaires globaux ne supportent pas FCFA, Wave ni Orange Money, et ignorent les contraintes de conformité locales.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ borderRadius: 18, border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg-card)' }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ padding: '1rem 1.5rem', fontSize: 12, color: 'var(--text3)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}>FONCTIONNALITÉ</div>
                <div style={{ padding: '1rem', textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, color: '#2fd9f4', background: 'rgba(47,217,244,0.07)', borderLeft: '1px solid rgba(47,217,244,0.12)', borderRight: '1px solid rgba(47,217,244,0.12)' }}>DencPass</div>
                <div style={{ padding: '1rem', textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--text3)' }}>Autres</div>
              </div>
              {COMPARE.map(({ label, dp, others }, i) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px', borderBottom: i < COMPARE.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ padding: '0.9rem 1.5rem', fontSize: 14, color: 'var(--text2)' }}>{label}</div>
                  <div style={{ padding: '0.9rem', textAlign: 'center', color: dp ? '#22c55e' : '#ef4444', background: 'rgba(47,217,244,0.04)', borderLeft: '1px solid rgba(47,217,244,0.1)', borderRight: '1px solid rgba(47,217,244,0.1)' }}>
                    {dp ? <IcoCheck size={16} /> : '✗'}
                  </div>
                  <div style={{ padding: '0.9rem', textAlign: 'center', color: others ? '#22c55e' : 'var(--text3)', fontSize: others ? 'inherit' : 13 }}>
                    {others ? <IcoCheck size={16} /> : 'Rarement'}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '6rem max(1.5rem, calc((100% - 1200px) / 2))', textAlign: 'center' }} className="section-pad">
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(47,217,244,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.07) 0%, transparent 55%)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(47,217,244,0.3), rgba(139,92,246,0.3), transparent)', zIndex: 2 }} />
        <div style={{ position: 'relative', zIndex: 3, maxWidth: 620, margin: '0 auto' }}>
          <Reveal>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.04em', color: 'var(--sand)', margin: '0 0 1rem', lineHeight: 1.1 }}>
              Prêt à sécuriser vos accès ?
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text3)', margin: '0 0 2.25rem', lineHeight: 1.7 }}>
              Gratuit pour un usage personnel. Aucune carte bancaire requise.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://app.dencpass.com/register" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px', borderRadius: 13, background: '#2fd9f4', color: '#07111f', fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 4px 28px rgba(47,217,244,0.32)' }}>
                Créer mon coffre gratuit <IcoArrow size={16} />
              </a>
              <Link to="/pricing" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 28px', borderRadius: 13, border: '1px solid rgba(47,217,244,0.25)', color: 'var(--text2)', fontSize: 15, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
                Voir les tarifs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicLayout>
  )
}
