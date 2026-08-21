# DencPass — Contexte de design (site vitrine)

> Document généré pour briefer un outil/équipe de design sur une refonte UX/UI. Rédigé à partir d'une analyse complète du code source au 2026-07-22. Objectif : comprendre en 5 minutes ce qu'on a entre les mains, ce qu'on peut casser, et ce qu'on ne peut pas.

---

## 0. Résumé exécutif

**DencPass** est un gestionnaire de mots de passe et de secrets numériques (coffre chiffré, 2FA, partage sécurisé, certificats) positionné **"Africa-first"** : tarifs en FCFA, paiement Wave/Orange Money, interface en français, générateur de passphrases dans des langues africaines (wolof, swahili, bambara...). Il cible deux publics : les particuliers (offres Gratuit/Pro) et les organisations (offre Enterprise SaaS ou On-Premise, avec LDAP/SIEM/audit). Le site vitrine actuel (celui-ci) est une landing marketing en React/Vite, séparée de l'application produit réelle (`app.dencpass.com`).

Design actuel : esthétique sombre "SaaS tech" cohérente sur le papier (cyan `#2fd9f4` + violet `#8b5cf6`, typographies Space Grotesk/Inter/JetBrains Mono, mode clair/sombre géré proprement) mais **entièrement construite en styles inline, sans design system centralisé.**

**Les 3 plus gros points faibles UX/techniques identifiés :**

1. **Aucun design token réel.** Les couleurs, tailles, rayons de bordure sont répétés en dur (hex codes, `rgba(...)`) dans des centaines d'objets de style inline plutôt que dans un fichier de tokens. Une refonte doit changer chaque occurrence à la main plutôt qu'une seule source de vérité.
2. **Composants dupliqués, pas partagés.** L'accordéon FAQ existe en 3 copies quasi-identiques (Home, Pricing, Security). Les cartes/boutons partagent une classe CSS minimale mais chaque instance redéfinit sa taille/couleur en inline. Le risque de dérive visuelle est réel.
3. **Deux systèmes d'animation canvas/WebGL concurrents, dont un mort.** `DotField` (canvas 2D, grille de points qui réagit au curseur) est utilisé sur la hero. `Lightfall` (shader WebGL "warp speed" via la lib `ogl`) est entièrement codé et fonctionnel mais **n'est importé nulle part** — c'est soit une piste de design abandonnée, soit une alternative prête à l'emploi jamais branchée.

---

## 1. Stack technique

| Élément | Valeur |
|---|---|
| Framework | **React 19.2.7** (pas de Next.js — SPA pure) |
| Build tool | **Vite 5.4.21** (`vite`, `vite build`, `vite preview`) |
| Routing | **react-router-dom v7.18** (`BrowserRouter`, routes déclaratives) |
| Styles | **Aucune librairie CSS.** 100% inline styles (`style={{...}}`) + variables CSS (`--bg`, `--text`, etc.) pour le theming + une poignée de classes utilitaires globales dans `index.html`/`index.css` (hover, animations keyframes, media queries responsive) |
| Composants UI | **Aucune librairie tierce** (pas de MUI, shadcn, Chakra, Radix...). Tout est écrit à la main. Set d'icônes SVG custom dans `shared.jsx` (~35 icônes, `strokeWidth: 1.75`, `2.0` pour check/close) |
| Libs additionnelles | `@number-flow/react` (compteurs animés), `canvas-confetti` (confetti au toggle annuel/mensuel), `ogl` (micro-lib WebGL, utilisée uniquement par le composant mort `Lightfall`) |
| Theming | Clair/Sombre/Système via attribut `data-theme` sur `<html>` + variables CSS, persisté en `localStorage`, hook custom `useTheme.js` |
| Polices | Google Fonts : **Space Grotesk** (titres/display, poids 400–800), **Inter** (corps de texte, 300–600), **JetBrains Mono** (labels "eyebrow", badges, accents techniques) |
| Déploiement | Vercel (rewrite SPA dans `vercel.json`), repo GitHub `Moustapha0320/DencPass-Vitrine` |
| App produit liée | `app.dencpass.com` (login/register/API contact) — **hors scope de ce repo**, seulement liée par des `<a href>` |

**Il n'existe pas de design system packagé (pas de Storybook, pas de fichier de tokens Figma-sync, pas de bibliothèque de composants exportée).** Tout le "système" vit de façon implicite dans les habitudes de code répétées à travers les pages.

---

## 2. Structure des pages et routes

Toutes les pages sont enveloppées dans `<PublicLayout>` (nav + footer + modales légales communes). Routing défini dans [App.jsx](src/App.jsx).

| Route | Fichier | Rôle | Composants/sections principaux |
|---|---|---|---|
| `/` | [HomePage.jsx](src/pages/HomePage.jsx) (655 lignes) | Landing principale | `HeroSection` (+ `DotField` animé, `ProductMockup`, `HeroTypewriter`), `TrustBand`, `StatsRow` (compteurs `NumberFlow`), `FeaturesTeaser`, `HowItWorksSection`, `SecuritySection`, `EnterpriseSection`, `TestimonialsSection`, `PricingTeaser`, `FAQSection`, `CTABanner` |
| `/features` | [FeaturesPage.jsx](src/pages/FeaturesPage.jsx) | Détail des fonctionnalités produit | Grille de 9 cartes fonctionnalités, tableau comparatif "DencPass vs Autres", CTA final |
| `/security` | [SecurityPage.jsx](src/pages/SecurityPage.jsx) | Page technique sécurité (confiance) | Schéma "4 étapes" du chiffrement, 4 cartes piliers sécurité, bloc infrastructure (4 stats), bloc bug bounty, `FAQAccordion` |
| `/pricing` | [PricingPage.jsx](src/pages/PricingPage.jsx) | Tarifs | Toggle mensuel/annuel (avec confetti), 3 cartes plans (Gratuit/Pro/Enterprise), 3 cartes "éditions" (Community/SaaS/On-Premise), `FAQAccordion` |
| `/business` | [BusinessPage.jsx](src/pages/BusinessPage.jsx) | Page B2B/Enterprise | Hero violet dédié, 6 cartes fonctionnalités Enterprise, 3 cartes "par taille d'équipe", bloc sécurité entreprise, CTA contact |
| `/download` | [DownloadPage.jsx](src/pages/DownloadPage.jsx) | Téléchargements | Carte "Extension Chrome", carte "PWA installable" (logique `beforeinstallprompt` réelle), guide d'installation manuel par OS (tabs Windows/macOS/Linux) |
| `/contact` | [ContactPage.jsx](src/pages/ContactPage.jsx) | Formulaire de contact | Formulaire (nom, email, organisation, taille équipe, message) posté vers l'API réelle, aside avec 3 cartes info |
| `*` (catch-all) | `NotFoundPage` (inline dans `App.jsx`) | 404 | Simple message centré + CTA retour accueil |

**Composants partagés transverses** (utilisés sur toutes les pages via `PublicLayout`) :
- `NavBar` — logo, 6 liens, CTA "Essayer gratuitement", menu hamburger mobile
- `Footer` — 4 colonnes (branding, Produit, Entreprise, Ressources), sélecteur de thème, liens légaux
- `LegalModal` — modale CGU / Politique de confidentialité (contenu textuel en dur dans le composant)

---

## 3. Design system actuel

### 3.1 Palette de couleurs

Définie en variables CSS dans [index.css](src/index.css), avec un jeu complet pour le mode sombre (`:root` / `[data-theme="dark"]`) et un jeu pour le mode clair (`[data-theme="light"]`).

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--bg` | `#07111f` | `#ffffff` | Fond de page |
| `--bg2` | `#0d1a2e` | `#f7f8fa` | Fond section alternée |
| `--bg3` | `#111f35` | `#eef0f3` | Fond tertiaire (sélecteurs) |
| `--bg-alt` | `#0a1628` | `#f4f5f7` | Fond section alternée (bis) |
| `--bg-card` | `#0d1a2e` | `#ffffff` | Fond des cartes |
| `--bg-nav` | `rgba(7,17,31,0.92)` | `rgba(255,255,255,0.96)` | Fond nav au scroll |
| `--bg-footer` | `#030c18` | `#f0f2f5` | Fond footer |
| `--accent` | `#2fd9f4` (cyan) | `#0a9bb8` (cyan foncé) | Couleur de marque principale |
| `--purple` | `#8b5cf6` | `#7c3aed` | Couleur "Enterprise/B2B" |
| `--amber` | `#f59e0b` | `#d97706` | Accent tertiaire (warning/highlight) |
| `--green` | `#22c55e` | `#16a34a` | Succès / validation |
| `--sand` | `#f0e4c4` | `#0d1117` | Couleur des grands titres (h1/h2) |
| `--text` / `--text-head` / `--text2` … `--text5` | `#e8edf5` → `#2d5570` | `#0d1117` → `#6b7280` | Échelle de gris à 6 paliers pour le texte |
| `--border` / `--border2` / `--border3` | `rgba(47,217,244,0.09 / 0.18 / 0.28)` | `rgba(0,0,0,0.07 / 0.12 / 0.20)` | Bordures, 3 intensités |

**⚠️ Point d'attention :** ces variables sont utilisées de façon incohérente. Beaucoup de composants utilisent les valeurs hex en dur (`#2fd9f4`, `#8b5cf6`, `#22c55e`, `#f59e0b`, `#ef4444`) directement dans le JSX plutôt que `var(--accent)` etc., en particulier pour tout ce qui est décoratif (halos, gradients, badges). Une refonte avec vrais tokens devra ratisser large.

**Couleurs sémantiques par contexte de page** (convention implicite, pas documentée) :
- **Cyan `#2fd9f4`** → produit grand public / sécurité / défaut
- **Violet `#8b5cf6`** → Enterprise / B2B (page Business, CTA "Découvrir Enterprise", contact form)
- **Vert `#22c55e`** → succès, disponibilité, économies (badge "-20%" annuel)
- **Ambre `#f59e0b`** → highlight secondaire (audit, badges "populaire" dans certains contextes)
- **Rouge `#ef4444`** → erreurs, croix "non inclus" dans les tableaux comparatifs

### 3.2 Typographies

| Famille | Rôle | Poids utilisés | Tailles observées |
|---|---|---|---|
| **Space Grotesk** | Titres, h1–h3, logo, CTA, prix | 400, 500, 600, 700, 800 | `clamp()` fluide pour les h1/h2 (ex. `clamp(2rem,4vw,3rem)`), 14–20px pour boutons/labels |
| **Inter** | Corps de texte, paragraphes, nav | 300, 400, 500, 600 | 12–18px |
| **JetBrains Mono** | Labels "eyebrow" (petits labels majuscules au-dessus des titres), badges, valeurs techniques (AES-256, prix FCFA, dates) | 400, 500, 700 | 9–13px, toujours avec `letter-spacing` élevé (0.08em–0.18em) |

Pas de fichier de config typographique centralisé — chaque composant redéclare `fontFamily: "'Space Grotesk', sans-serif"` en inline.

### 3.3 Espacements / grille

- Conteneur max : `maxWidth: 1200px`, centré, padding horizontal `max(1.5rem, calc((100% - 1200px) / 2))`
- Sections verticales : rythme de `5rem`–`7rem` de padding top/bottom, alternance de fond (`--bg` / `--bg-alt`) entre sections consécutives
- Grilles utilitaires (classes CSS globales dans `index.html`, adaptatives) : `.grid-2`, `.grid-3`, `.hero-grid`, `.footer-grid` — passent en 1 colonne sous 768px, en 2 sous 1024px selon les cas
- Rayons de bordure : pas de token unique, valeurs observées 6, 8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 100 (pills) — utilisés de façon peu systématique
- Breakpoints : `768px` (mobile), `1024px` (tablette/desktop hero), `900px` (spécifique au toggle de la page Pricing)

### 3.4 Composants réutilisables identifiés

| Composant/pattern | Où il vit | Statut |
|---|---|---|
| `.card` (CSS) | `index.html` — `border: 1px solid var(--border); background: var(--bg-card);` | Partagé, mais utilisé de façon incomplète (beaucoup de cartes avec bordures/couleurs conditionnelles restent 100% inline) |
| `.card-hover` (CSS) | `index.html` — effet hover (translateY + ombre) | Partagé |
| `.price-card` (CSS) | `index.html` — effet hover translateY | Partagé, utilisé pour les cartes de prix sur 3 pages |
| `.btn-primary` (CSS) | `index.html` — police, poids, `border:none`, `cursor:pointer`, hover translateY + ombre | Partagé pour le **comportement**, mais couleur/taille toujours redéfinies en inline par instance |
| `.btn-ghost` (CSS) | `index.html` — hover bordure/couleur | Partagé |
| `Reveal` (React) | [shared.jsx](src/components/shared.jsx) | Wrapper d'animation "fade-in au scroll" (IntersectionObserver), utilisé partout, respecte `prefers-reduced-motion` |
| `FAQAccordion` (React) | **Dupliqué 3×** : inline dans `HomePage.jsx` (nommé `FAQSection`), `PricingPage.jsx`, `SecurityPage.jsx` | ⚠️ Non partagé — 3 implémentations quasi-identiques |
| Icônes SVG | [shared.jsx](src/components/shared.jsx) | ~35 icônes custom, cohérentes (strokeWidth 1.75/2.0), pas de librairie externe |
| `NavBar` / `Footer` / `LegalModal` | [PublicLayout.jsx](src/components/layout/PublicLayout.jsx) | Partagés (un seul layout pour tout le site) |
| `DotField` | [DotField.jsx](src/components/DotField.jsx) | Canvas 2D interactif, utilisé uniquement sur la hero de la Home |
| `Lightfall` | [Lightfall.jsx](src/components/Lightfall.jsx) | **Composant mort** — shader WebGL complet, non importé nulle part |

---

## 4. Contenu réel du site

> Extrait page par page pour que le redesign parte du vrai contenu, pas d'un lorem ipsum.

### 4.1 Home (`/`)

- **Badge hero** : "GESTIONNAIRE DE MOTS DE PASSE · SÉNÉGAL"
- **H1 (typewriter animé)** : "Samm sa sirru." *(wolof, voir `HeroTypewriter`)*
- **Sous-titre italique** : "Garde ton secret."
- **Paragraphe hero** : "Le command center de vos identifiants, secrets et certificats. Chiffrement AES-256, zéro connaissance, fait pour l'Afrique."
- **CTA hero** : "Commencer gratuitement"
- **Trust band** : AES-256-GCM · Zéro connaissance · 2FA TOTP · Extension Chrome · Africa-first
- **Stats** : 700M+ (fuites HIBP indexées) · 128 car. (longueur max générateur) · "Zéro" (accès serveur aux données) · "AES-256-GCM" (chiffrement bout en bout)
- **Features teaser (4 cartes)** : Coffre chiffré / Partage sécurisé / Audit de sécurité / Équipes & groupes
- **"Comment ça marche" (3 étapes)** : Créez votre coffre → Importez ou générez → Accédez partout
- **Sécurité condensée (4 cartes)** : Chiffrement AES-256 / 2FA TOTP / Zéro connaissance serveur / Audit complet
- **Bloc Enterprise** : "Pensé pour vos équipes." + 6 items (multi-org, LDAP, SIEM, journalisation, rôles, on-premise)
- **Témoignages (3)** : Mamadou Diallo (FinServ Dakar), Awa Konaré (Kolibri Tech, Abidjan), Ibrahima Ndiaye (Cabinet Ndiaye & Associés) — *textes probablement fictifs/placeholder à valider*
- **Pricing teaser** : Gratuit (0 FCFA) vs Pro (2000 FCFA/mois, badge "POPULAIRE")
- **FAQ (5 questions)** : chiffrement, migration Bitwarden/1Password/KeePass, extension Chrome, paiement Enterprise, mot de passe oublié
- **CTA final** : "Vos accè Blindés" + "Créez votre coffre en moins de 2 minutes. Gratuit, sans carte bancaire."

### 4.2 Fonctionnalités (`/features`)

- **H1** : "Tout ce qu'il faut. Rien de superflu."
- **9 fonctionnalités détaillées** (icône + titre + description + 4 tags chacune) :
  1. Coffre-fort chiffré
  2. Générateur de mots de passe (jusqu'à 128 caractères)
  3. Partage sécurisé (liens temporaires)
  4. Double authentification (2FA TOTP)
  5. Extension Chrome
  6. Passphrase africaine (wolof, swahili, bambara, hausa, yoruba, zulu)
  7. Détection HIBP (700M+ mots de passe vérifiés, k-anonymat)
  8. Gestion d'équipes
  9. Africa-first (FCFA, Wave, Orange Money, conformité RGPD & APDP)
- **Tableau comparatif** "DencPass vs Autres" sur 10 critères, où DencPass coche tout et les concurrents "génériques" ne couvrent que les 4 critères de sécurité de base (pas les critères Afrique)

### 4.3 Sécurité (`/security`)

- **H1** : "Chiffrement militaire, couche par couche."
- **Badge** : "AES-256-GCM · Argon2id · TLS 1.3 · RGPD"
- **Schéma 4 étapes** : Saisie client → Transmission TLS 1.3 → Chiffrement AES-256-GCM côté serveur → Stockage chiffré en base
- **4 piliers sécurité** détaillés (chacun avec 4 sous-points techniques) : Chiffrement AES-256-GCM, 2FA TOTP, Protection contre les fuites, Audit & journalisation
- **Infrastructure (4 stats)** : Hébergement cloud dédié / Base de données chiffrée au repos / Transport TLS 1.3 / Backups quotidiens
- **Bloc bug bounty** : "Vous avez trouvé une vulnérabilité ?" → contact `support@dencpass.com`, réponse sous 48h, correctif critique sous 72h
- **FAQ (5 questions)** : mot de passe oublié, accès équipe DencPass aux données, procédure en cas de fuite, portée de l'extension Chrome, signalement de vulnérabilité

### 4.4 Tarifs (`/pricing`)

- **H1** : "Simple. Transparent. En FCFA."
- **Toggle mensuel/annuel** avec confetti et badge "−20%"
- **3 plans** :
  - **Gratuit** (0 FCFA) — 13 features listées, dont mots de passe illimités, 50 générations/mois, 5 partages, 5 secrets, 5 certificats
  - **Pro** (2000 FCFA/mois, 1600 en annuel) — tout illimité + passphrase africaine + support prioritaire
  - **Enterprise** (sur devis) — LDAP, audit organisation, SIEM, on-premise, support dédié
- **3 éditions** (reformulation B2B) : Community (particuliers), Enterprise SaaS (managé), Enterprise On-Premise (infra client)
- **FAQ tarifaire (5 questions)** : changement de plan, essai gratuit, paiement FCFA, expiration licence Enterprise (grâce 7 jours), On-Premise pour PME

### 4.5 Entreprises (`/business`)

- **Badge** : "ENTERPRISE · POUR LES ÉQUIPES"
- **H1** : "Gestion centralisée. Contrôle total."
- **6 fonctionnalités B2B** : Organisations multi-tenant, Groupes & permissions, SIEM & Activity log, Audit d'activité centralisé, Active Directory (LDAP), Coffre des secrets API
- **3 tiers par taille** : Startup (<10, Community/Pro, 2000 FCFA/membre) · PME (10–200, Enterprise SaaS, sur devis, mis en avant "RECOMMANDÉ") · Grande entreprise/Gouvernement (Enterprise On-Premise, licence annuelle)
- **Bloc sécurité entreprise** : 6 items (chiffrement, zero-knowledge, logs d'audit, RBAC, on-premise, RGPD)

### 4.6 Téléchargements (`/download`)

- **H1** : "DencPass, partout."
- **Carte Extension Chrome** : "Remplissage automatique sur tous vos sites de connexion..." + CTA "Chrome Web Store" (statut "DISPONIBLE", Firefox/Edge "Bientôt")
- **Carte PWA** : "Installez DencPass directement depuis Chrome..." + logique d'installation réelle (`beforeinstallprompt`) + guide manuel par OS (Windows/macOS/Linux, 3–4 étapes chacun)

### 4.7 Contact (`/contact`)

- **H1** : "Parlons de votre projet."
- **Sous-titre** : "Démo, devis ou simple question, nous répondons sous 48h."
- **Formulaire** : Nom complet*, Email*, Organisation, Taille de l'équipe (select), Message* → POST vers `https://app.dencpass.com/api/public/contact/`
- **Aside** : "Réponse rapide" (4 promesses), bloc sécurité ("vos infos ne sont jamais partagées"), email direct `support@dencpass.com`

### 4.8 Footer / Legal (toutes pages)

- Tagline : "*Samm sa sirru*" (wolof) répétée dans le copyright : "© 2026 DencPass · Sénégal · *Samm sa sirru*"
- CGU et Politique de confidentialité : texte complet en français dans `PublicLayout.jsx` (7 sections chacune), contact légal `support@dencpass.com`

---

## 5. Fonctionnalités clés à représenter visuellement

Fonctionnalités mises en avant dans le code, à traduire visuellement dans le redesign (par ordre de récurrence/poids marketing) :

1. **Chiffrement AES-256-GCM & zero-knowledge** — le message central du site, répété sur presque toutes les pages. Actuellement représenté par : icônes bouclier/cadenas, badge "chiffré · HMAC" dans le mockup produit, schéma en 4 étapes sur `/security`.
2. **2FA TOTP** — compatible Google Authenticator/Authy, mis en scène par une icône téléphone + badge flottant "2FA activé · Google Auth" dans le mockup hero.
3. **Extension Chrome (autofill)** — page dédiée dans `/download`, icône navigateur, très mise en avant comme canal d'accès principal.
4. **Application Web installable (PWA)** — alternative à l'extension, logique d'installation native fonctionnelle.
5. **Partage sécurisé à expiration** — liens temporaires, révocables, journal des accès.
6. **Passphrase africaine** — différenciateur culturel fort (wolof/swahili/bambara/hausa/yoruba/zulu), actuellement juste une carte texte parmi d'autres ; pourrait mériter un traitement visuel plus distinctif dans une refonte (c'est l'élément le plus unique du produit).
7. **Détection HIBP (700M+ fuites)** — repris dans les stats de la hero et dans une carte fonctionnalité dédiée.
8. **Gestion d'équipes / multi-organisation / RBAC** — cœur de l'offre Enterprise, représenté par icônes utilisateurs/bâtiment, couleur violette dédiée.
9. **Intégrations Enterprise (LDAP/AD, SIEM Splunk/Elastic/Wazuh, Syslog RFC 5424, webhooks)** — technique, orienté IT/RSSI, actuellement listé en texte brut sans schéma visuel type "architecture d'intégration".
10. **Déploiement On-Premise** — argument de souveraineté des données, mentionné mais pas illustré (pas de schéma cloud vs on-premise).
11. **Positionnement "Africa-first"** — FCFA, Wave Money, Orange Money, français, conformité locale — c'est un axe de différenciation marketing majeur mais qui n'a aujourd'hui aucune identité visuelle propre (pas de motif, pas d'illustration, juste des mentions textuelles et le tagline wolof).

---

## 6. Contraintes techniques pour le redesign

### 🔴 Coûteux / risqué à changer en profondeur

| Élément | Pourquoi c'est risqué |
|---|---|
| **`DotField.jsx`** (hero Home) | Simulation physique (répulsion des points au curseur, easing, gestion `devicePixelRatio`, resize debounce) étroitement couplée à la taille du conteneur. Gère déjà `prefers-reduced-motion` correctement. Un redesign visuel de la hero doit soit réutiliser ce composant tel quel (juste changer les props de couleur/intensité), soit le remplacer entièrement — le modifier "à moitié" est risqué. |
| **`PricingPage.jsx` — toggle annuel/mensuel** | Combine confetti (position calculée depuis `getBoundingClientRect`), animation de prix `NumberFlow`, et une transformation CSS conditionnelle au `matchMedia('(min-width: 900px)')` pour décaler les cartes verticalement en desktop. Logique JS non triviale mêlée au style. |
| **`DownloadPage.jsx` — bloc PWA** | Utilise les vraies APIs navigateur `beforeinstallprompt` / `appinstalled` / `matchMedia('(display-mode: standalone)')`. Les 3 états visuels (installable / installée / non supporté) sont pilotés par le navigateur, pas par du contenu statique — un redesign doit préserver ces 3 branches conditionnelles. |
| **`ContactPage.jsx` — formulaire** | `fetch()` réel vers `https://app.dencpass.com/api/public/contact/` avec un payload précis (`nom`, `email`, `organisation`, `nb_utilisateurs`, `message`). Renommer/retirer des champs casse l'intégration backend. |
| **`FAQAccordion`** | Dupliqué 3× (Home/Pricing/Security) avec état `open` local à chaque instance. Un redesign qui touche à l'interaction FAQ doit répercuter le changement dans les 3 fichiers séparément (ou en profiter pour enfin le factoriser en composant partagé). |
| **`PublicLayout.jsx` (NavBar/Footer/LegalModal)** | Partagé par **toutes** les pages — un changement ici a un effet global immédiat. Faible risque technique (pas de logique métier complexe) mais **fort risque de régression visuelle en cascade** si mal testé. |

### 🟢 Librement redesignable, sans risque

- **Tout le contenu purement présentationnel** des pages Home/Features/Security/Business/Pricing en dehors des blocs listés ci-dessus : `TrustBand`, `StatsRow`, `FeaturesTeaser`, `HowItWorksSection`, `SecuritySection`, `EnterpriseSection`, `TestimonialsSection`, les grilles de cartes fonctionnalités, les tableaux comparatifs. Ce sont des tableaux de données JS (`const FEATURES = [...]`) mappés en JSX — changer le layout/style ne touche à aucune logique.
- **L'intégralité du système de styles inline** peut être remplacée (Tailwind, CSS Modules, styled-components, design tokens...) sans casser de logique métier : aucun composant n'a de comportement conditionné par une valeur de style.
- **Le contenu texte** (titres, descriptions, FAQ) est trivialement modifiable — tout est en constantes JS en tête de fichier, pas de texte codé en dur au milieu du JSX (sauf le formulaire de contact et les modales légales).
- **Le thème clair/sombre** (`useTheme.js` + attribut `data-theme` + variables CSS) est un mécanisme propre et isolé — on peut changer toutes les valeurs de couleur sans toucher à la logique de bascule.
- **`Lightfall.jsx`** — composant mort, zéro risque à supprimer, modifier ou au contraire l'activer comme nouvelle option de fond animé (il est complet et fonctionnel, juste jamais branché).
- **Set d'icônes `shared.jsx`** — remplaçable intégralement par une librairie d'icônes (Lucide, Phosphor...) sans effort de migration particulier, le composant `Reveal` (animation scroll) fonctionnera avec n'importe quel enfant.

### ⚠️ Défaut de code existant à corriger (indépendant du redesign)

- [DownloadPage.jsx:150](src/pages/DownloadPage.jsx#L150) contient une chaîne de style malformée (guillemets mal fermés dans `fontFamily`) qui fait que la propriété `whiteSpace: 'nowrap'` du bouton "Ouvrir l'app web" ne s'applique jamais réellement. À corriger lors du prochain passage sur ce fichier, indépendamment du redesign visuel.
- Le logo `public/dencpass-logo.png` pèse **1.7 Mo** — largement surdimensionné pour un usage favicon/nav (24–40px d'affichage). À ré-exporter en SVG ou PNG optimisé lors de la refonte des assets.

---

## 7. Assets existants

| Asset | Chemin | Usage actuel |
|---|---|---|
| Logo DencPass | `public/dencpass-logo.png` (1.7 Mo, format PNG) | Favicon, apple-touch-icon, logo nav (24px), logo footer (28px), icône dans les mockups produit (40px) |
| Icônes | Aucun fichier — SVG inline générés par les composants `Ico*` dans [shared.jsx](src/components/shared.jsx) | ~35 icônes (Check, X, Arrow, Chevron, Sun/Moon/Monitor, Menu/Close, Vault, Zap, Share, Key, Globe, Cert, Users, Activity, Server, Shield, Phone, Eye, Clipboard, Lock, Search, Copy, Download, Building, Code, Smartphone, CheckCircle, Star, Info) |
| Polices | Google Fonts (chargées via `<link>` dans `index.html`, pas de fichiers locaux) | Space Grotesk, Inter, JetBrains Mono |
| Images produit | **Aucune capture d'écran réelle du produit** — le "mockup" visible sur la hero (`ProductMockup` dans `HomePage.jsx`) est entièrement recréé en JSX/CSS (faux coffre avec 3 fausses entrées), pas une vraie capture de l'app | — |

**Point notable pour le designer :** il n'existe aujourd'hui **aucune vraie capture d'écran de l'application DencPass** (`app.dencpass.com`) dans ce repo vitrine. Toute l'illustration produit sur la home est un mockup fictif recréé en code. Si la refonte veut montrer le vrai produit, il faudra aller chercher des captures dans le repo de l'app (`DencuPass/frontend`, mentionné comme répertoire de travail additionnel).
