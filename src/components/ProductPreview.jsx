/**
 * ProductPreview — aperçu du produit pour le hero de la page d'accueil.
 *
 * ⚠️ COPIE ADAPTÉE, PAS UN IMPORT RÉEL.
 * denc-vitrine et le web app (DencPass/frontend) sont deux dépôts séparés :
 * ce composant reproduit manuellement la structure JSX/CSS de
 * `frontend/src/components/layout/Layout.jsx` (sidebar) et
 * `frontend/src/pages/PasswordListPage.jsx` (liste) avec des données de
 * démonstration statiques, sur le même principe que
 * `extension/src/services/crypto.js` (copie adaptée du crypto.js du web app).
 *
 * Si le design du vrai dashboard change, ce fichier doit être mis à jour
 * manuellement — rien ici n'est branché sur le vrai code du web app.
 */

const NAV_ITEMS = [
  { label: 'Tableau de bord', active: false, d: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
  { label: 'Mots de passe', active: true, d: null },
  { label: 'Catégories', active: false, d: 'M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82ZM7 7h.01' },
  { label: 'Générateur', active: false, d: 'M13 2 3 14h9l-1 8 10-12h-9l1-8Z' },
  { label: 'Coffre des secrets', active: false, d: 'M3 3h18v18H3zM12 9v6M9 12h6' },
]

const DEMO_ENTRIES = [
  { id: 1, title: 'Banque Sénégal', category: 'Finance', user: 'jean.diop@gmail.com', url: 'banquesenegal.sn', expiry: { label: '12j', tone: 'ok' }, color: '#ec4899' },
  { id: 2, title: 'AWS Production', category: 'DevOps', user: 'devops@dencpass.com', url: 'console.aws.amazon.com', expiry: { label: '—', tone: 'none' }, color: '#8b5cf6' },
  { id: 3, title: 'GitHub', category: 'Développement', user: 'dev@dencpass.com', url: 'github.com', expiry: { label: '—', tone: 'none' }, color: 'var(--dpp-accent)' },
  { id: 4, title: 'Gmail Pro', category: 'Email', user: 'contact@dencpass.com', url: 'mail.google.com', expiry: { label: 'Expiré', tone: 'exp' }, color: '#f59e0b' },
]

// Mark officiel — copie exacte de frontend/src/components/DencPassMark.jsx
// (dégradé cyan monochrome uniquement, pas de violet dans le logo)
function LogoMark() {
  return (
    <svg className="dpp-mark" viewBox="0 0 100 108" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="dpp-logo-grad" x1="18" y1="14" x2="95" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: 'var(--dpp-logo-a)' }} />
          <stop offset="1" style={{ stopColor: 'var(--dpp-logo-b)' }} />
        </linearGradient>
        <mask id="dpp-logo-mask">
          <rect x="0" y="0" width="120" height="120" fill="#fff" />
          <path d="M67,54 A11,11 0 1 1 45,54 A11,11 0 1 1 67,54 Z" fill="#000" />
          <path d="M56,54 L49,88 H63 Z" fill="#000" />
        </mask>
      </defs>
      <path d="M26,14 H52 C78,14 95,34 95,60 C95,86 78,106 52,106 H26 C21.6,106 18,102.4 18,98 V22 C18,17.6 21.6,14 26,14 Z" fill="url(#dpp-logo-grad)" mask="url(#dpp-logo-mask)" />
    </svg>
  )
}

function NavIcon({ d }) {
  if (!d) {
    // icône "Mots de passe" (clé) : tracé multi-part, gérée à part
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3" />
      </svg>
    )
  }
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

function SidebarPreview() {
  return (
    <aside className="dpp-sidebar">
      <div className="dpp-sb-logo">
        <LogoMark />
        <span className="dpp-brand"><span className="dpp-brand-d">Denc</span><span className="dpp-brand-p">Pass</span></span>
      </div>
      <nav className="dpp-nav">
        {NAV_ITEMS.map(item => (
          <div key={item.label} className={`dpp-ni${item.active ? ' active' : ''}`}>
            <span className="dpp-ni-ico"><NavIcon d={item.d} /></span>
            {item.label}
          </div>
        ))}
      </nav>
      <div className="dpp-sb-user">
        <div className="dpp-avatar">JD</div>
        <div>
          <div className="dpp-u-name">Jean Diop</div>
          <div className="dpp-u-role">User</div>
        </div>
      </div>
    </aside>
  )
}

function PasswordRowPreview({ entry }) {
  return (
    <div className={`dpp-row${entry.id === 1 ? ' hi' : ''}`}>
      <div className="dpp-e-main">
        <div className="dpp-e-ico" style={{ background: `color-mix(in srgb, ${entry.color} 18%, transparent)`, color: entry.color }}>
          {entry.title.charAt(0)}
        </div>
        <div className="dpp-e-text">
          <div className="dpp-e-name">{entry.title}</div>
          <div className="dpp-e-cat">{entry.category}</div>
        </div>
      </div>
      <div className="dpp-c-user">{entry.user}</div>
      <div className="dpp-c-pass">••••••••</div>
      <div className={`dpp-c-exp ${entry.expiry.tone}`}>{entry.expiry.label}</div>
      <div className="dpp-c-acts">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
      </div>
    </div>
  )
}

function PasswordListPreview() {
  return (
    <main className="dpp-main">
      <div className="dpp-topbar">
        <div>
          <div className="dpp-title">Mots de passe</div>
          <div className="dpp-subtitle"><strong>{DEMO_ENTRIES.length}</strong> accès sécurisés</div>
        </div>
        <div className="dpp-add-btn">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Ajouter
        </div>
      </div>
      <div className="dpp-search-row">
        <div className="dpp-search-box">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          Rechercher…
        </div>
      </div>
      <div className="dpp-col-head">
        <span>Titre</span><span>Identifiant</span><span>Mot de passe</span><span>Exp.</span><span></span>
      </div>
      <div className="dpp-rows">
        {DEMO_ENTRIES.map(entry => <PasswordRowPreview key={entry.id} entry={entry} />)}
      </div>
      <div className="dpp-footer">
        <span>{DEMO_ENTRIES.length} entrées · AES-256-GCM</span>
        <span className="dpp-footer-status"><span className="dpp-dot" />Synchronisé</span>
      </div>
    </main>
  )
}

export default function ProductPreview() {
  return (
    <div className="dpp-wrapper">
      <style>{`
        .dpp-wrapper {
          --dpp-bg:          #0a0a0c;
          --dpp-sidebar-1:   #07080e;
          --dpp-sidebar-2:   #09101f;
          --dpp-card:        #0f172a;
          --dpp-border:      rgba(255,255,255,0.10);
          --dpp-border-hi:   rgba(255,255,255,0.15);
          --dpp-text:        #e5e1e4;
          --dpp-text-faint:  #6b7280;
          --dpp-text-dim:    #4b5563;
          --dpp-accent:      #2fd9f4;
          --dpp-accent-08:   rgba(47,217,244,0.08);
          --dpp-accent-10:   rgba(47,217,244,0.10);
          --dpp-accent-18:   rgba(47,217,244,0.18);
          --dpp-warning:     #f59e0b;
          --dpp-error:       #ef4444;
          --dpp-success:     #22c55e;
          --dpp-logo-a:      #4fe3f8;
          --dpp-logo-b:      #159dc4;
          position: relative;
          width: 100%;
          max-width: 640px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        }
        [data-theme="light"] .dpp-wrapper {
          --dpp-bg:          #f0f4f8;
          --dpp-sidebar-1:   #fafbff;
          --dpp-sidebar-2:   #f3f6fc;
          --dpp-card:        #ffffff;
          --dpp-border:      rgba(0,0,0,0.09);
          --dpp-border-hi:   rgba(0,0,0,0.14);
          --dpp-text:        #0c1a2e;
          --dpp-text-faint:  #6b8099;
          --dpp-text-dim:    #9bb0c7;
          --dpp-accent:      #0891b2;
          --dpp-accent-08:   rgba(8,145,178,0.07);
          --dpp-accent-10:   rgba(8,145,178,0.10);
          --dpp-accent-18:   rgba(8,145,178,0.16);
          --dpp-warning:     #b45309;
          --dpp-error:       #dc2626;
          --dpp-success:     #16a34a;
          --dpp-logo-a:      #0a8ba6;
          --dpp-logo-b:      #075f73;
        }

        .dpp-frame {
          background: var(--dpp-bg);
          border: 1px solid var(--dpp-border-hi);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 28px 70px rgba(0,0,0,0.45);
          animation: dpp-float 7s ease-in-out infinite;
        }
        [data-theme="light"] .dpp-frame { box-shadow: 0 28px 60px rgba(15,35,60,0.16); }
        @keyframes dpp-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @media (prefers-reduced-motion: reduce) { .dpp-frame { animation: none; } }

        .dpp-chrome {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px; border-bottom: 1px solid var(--dpp-border);
          background: var(--dpp-sidebar-1);
        }
        .dpp-tl { display: flex; gap: 4px; flex-shrink: 0; }
        .dpp-tl span { width: 7px; height: 7px; border-radius: 50%; display: block; }
        .dpp-addr {
          flex: 1; background: var(--dpp-accent-08); border: 1px solid var(--dpp-border);
          border-radius: 5px; padding: 2px 8px; display: flex; align-items: center; gap: 5px;
          font-family: ui-monospace, 'SF Mono', monospace; font-size: 9px; color: var(--dpp-text-faint);
        }
        .dpp-addr svg { color: var(--dpp-accent); flex-shrink: 0; }

        .dpp-body { display: flex; height: 340px; overflow: hidden; }

        .dpp-sidebar {
          width: 132px; flex-shrink: 0;
          background: linear-gradient(180deg, var(--dpp-sidebar-1) 0%, var(--dpp-sidebar-2) 100%);
          border-right: 1px solid var(--dpp-accent-08);
          display: flex; flex-direction: column; overflow: hidden;
        }
        .dpp-sb-logo { padding: 10px 10px 9px; border-bottom: 1px solid var(--dpp-border); display: flex; align-items: center; gap: 7px; flex-shrink: 0; }
        .dpp-mark { width: 19px; height: auto; flex-shrink: 0; filter: drop-shadow(0 0 4px var(--dpp-accent-18)); }
        .dpp-brand { font-size: 11.5px; font-weight: 800; letter-spacing: -0.04em; white-space: nowrap; }
        .dpp-brand-d { color: var(--dpp-text); }
        .dpp-brand-p { color: var(--dpp-accent); }

        .dpp-nav { flex: 1; padding: 6px 6px; display: flex; flex-direction: column; gap: 1px; }
        .dpp-ni {
          display: flex; align-items: center; gap: 7px;
          padding: 6px 8px; border-radius: 8px;
          font-size: 10px; font-weight: 500; color: var(--dpp-text-faint);
          border: 1px solid transparent; position: relative; white-space: nowrap;
        }
        .dpp-ni.active { background: var(--dpp-accent-10); color: var(--dpp-accent); font-weight: 600; border-color: var(--dpp-accent-18); }
        .dpp-ni.active::before {
          content: ''; position: absolute; left: -6px; top: 22%; bottom: 22%; width: 3px;
          background: var(--dpp-accent); border-radius: 2px;
        }
        .dpp-ni-ico { width: 13px; height: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

        .dpp-sb-user { border-top: 1px solid var(--dpp-border); padding: 7px 9px 8px; flex-shrink: 0; display: flex; align-items: center; gap: 7px; }
        .dpp-avatar {
          width: 22px; height: 22px; border-radius: 6px; background: var(--dpp-accent-10);
          border: 1px solid var(--dpp-accent-18); display: flex; align-items: center; justify-content: center;
          font-size: 8.5px; font-weight: 800; color: var(--dpp-accent); flex-shrink: 0;
        }
        .dpp-u-name { font-size: 9.5px; font-weight: 700; color: var(--dpp-text); }
        .dpp-u-role { font-family: ui-monospace, 'SF Mono', monospace; font-size: 7px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dpp-text-dim); }

        .dpp-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: var(--dpp-bg); min-width: 0; }
        .dpp-topbar { padding: 10px 12px 7px; display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; flex-shrink: 0; }
        .dpp-title { font-size: 12px; font-weight: 800; color: var(--dpp-text); letter-spacing: -0.02em; }
        .dpp-subtitle { font-size: 8.5px; color: var(--dpp-text-dim); margin-top: 1px; }
        .dpp-subtitle strong { color: var(--dpp-accent); }
        .dpp-add-btn { display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; background: var(--dpp-accent); color: var(--dpp-bg); font-size: 9px; font-weight: 700; flex-shrink: 0; }

        .dpp-search-row { padding: 0 12px 6px; flex-shrink: 0; }
        .dpp-search-box { background: var(--dpp-card); border: 1px solid var(--dpp-border); border-radius: 7px; padding: 4px 8px; display: flex; align-items: center; gap: 5px; font-size: 9px; color: var(--dpp-text-dim); }

        .dpp-col-head, .dpp-row {
          display: grid; grid-template-columns: 2fr 1.6fr 1.3fr 0.8fr 30px; gap: 6px; align-items: center;
        }
        .dpp-col-head { padding: 4px 12px; border-top: 1px solid var(--dpp-border); border-bottom: 1px solid var(--dpp-border); flex-shrink: 0; }
        .dpp-col-head span { font-family: ui-monospace, 'SF Mono', monospace; font-size: 7px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dpp-text-dim); }

        .dpp-rows { flex: 1; padding: 6px 8px; display: flex; flex-direction: column; gap: 4px; overflow: hidden; }
        .dpp-row { padding: 6px 8px; border-radius: 10px; background: var(--dpp-card); border: 1px solid var(--dpp-border); }
        .dpp-row.hi { border-color: var(--dpp-accent); box-shadow: inset 0 0 10px var(--dpp-accent-08); }

        .dpp-e-main { display: flex; align-items: center; gap: 6px; min-width: 0; }
        .dpp-e-ico { width: 22px; height: 22px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 9px; font-weight: 700; }
        .dpp-e-text { min-width: 0; }
        .dpp-e-name { font-size: 9.5px; font-weight: 700; color: var(--dpp-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .dpp-e-cat { font-size: 6.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--dpp-text-dim); }

        .dpp-c-user { font-family: ui-monospace, 'SF Mono', monospace; font-size: 8px; color: var(--dpp-text-faint); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .dpp-c-pass { font-family: ui-monospace, 'SF Mono', monospace; font-size: 10px; color: var(--dpp-accent); letter-spacing: 2px; }
        .dpp-c-exp { font-family: ui-monospace, 'SF Mono', monospace; font-size: 8px; font-weight: 700; white-space: nowrap; }
        .dpp-c-exp.ok { color: var(--dpp-accent); }
        .dpp-c-exp.exp { color: var(--dpp-error); }
        .dpp-c-exp.none { color: var(--dpp-text-dim); }
        .dpp-c-acts { display: flex; color: var(--dpp-text-dim); }

        .dpp-footer { padding: 6px 12px; border-top: 1px solid var(--dpp-border); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
        .dpp-footer span:first-child { font-family: ui-monospace, 'SF Mono', monospace; font-size: 7.5px; color: var(--dpp-text-dim); }
        .dpp-footer-status { display: flex; align-items: center; gap: 4px; font-family: ui-monospace, 'SF Mono', monospace; font-size: 7.5px; font-weight: 700; color: var(--dpp-success); }
        .dpp-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--dpp-success); }

        .dpp-badge {
          position: absolute; background: var(--dpp-card); border-radius: 11px; z-index: 2;
          box-shadow: 0 8px 24px rgba(0,0,0,0.35), 0 0 0 1px var(--dpp-border);
          animation: dpp-float 7s ease-in-out infinite;
        }
        [data-theme="light"] .dpp-badge { box-shadow: 0 8px 24px rgba(15,35,60,0.14), 0 0 0 1px var(--dpp-border); }
        .dpp-badge-aes { top: 40px; right: -14px; padding: 7px 11px; border: 1px solid var(--dpp-accent-18); animation-delay: 3s; }
        .dpp-badge-aes .t { font-family: ui-monospace, 'SF Mono', monospace; font-size: 9.5px; font-weight: 700; color: var(--dpp-accent); }
        .dpp-badge-aes .s { font-family: ui-monospace, 'SF Mono', monospace; font-size: 7.5px; color: var(--dpp-text-dim); margin-top: 1px; }
        .dpp-badge-2fa { bottom: -36px; left: -14px; padding: 7px 10px; display: flex; align-items: center; gap: 7px; border: 1px solid var(--dpp-border-hi); animation-delay: 1.5s; }
        .dpp-badge-2fa-ico { width: 22px; height: 22px; border-radius: 7px; background: var(--dpp-accent-10); border: 1px solid var(--dpp-accent-18); display: flex; align-items: center; justify-content: center; color: var(--dpp-accent); flex-shrink: 0; }
        .dpp-badge-2fa .t { font-size: 9px; font-weight: 700; color: var(--dpp-text); }
        .dpp-badge-2fa .s { font-family: ui-monospace, 'SF Mono', monospace; font-size: 7.5px; color: var(--dpp-text-dim); }
      `}</style>

      <div className="dpp-badge dpp-badge-aes">
        <div className="t">AES-256-GCM</div>
        <div className="s">chiffré côté client</div>
      </div>
      <div className="dpp-badge dpp-badge-2fa">
        <div className="dpp-badge-2fa-ico">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
        </div>
        <div>
          <div className="t">2FA activé</div>
          <div className="s">TOTP</div>
        </div>
      </div>

      <div className="dpp-frame">
        <div className="dpp-chrome">
          <div className="dpp-tl">
            <span style={{ background: '#ff5f57' }} /><span style={{ background: '#febc2e' }} /><span style={{ background: '#28c840' }} />
          </div>
          <div className="dpp-addr">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            app.dencpass.com/passwords
          </div>
        </div>
        <div className="dpp-body">
          <SidebarPreview />
          <PasswordListPreview />
        </div>
      </div>
    </div>
  )
}
