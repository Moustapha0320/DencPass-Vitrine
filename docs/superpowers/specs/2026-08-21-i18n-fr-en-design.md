# Internationalisation FR/EN — Site vitrine Denc-Vitrine

**Date** : 2026-08-21
**Statut** : Approuvé, prêt pour le plan d'implémentation

## Contexte

Le site vitrine (`Denc-Vitrine`, React 19 + Vite + react-router-dom v7) est
entièrement en français, texte en dur dans le JSX de chaque page. Aucune
infrastructure i18n n'existe. L'app web DencPass (dépôt séparé) devra devenir
multilingue elle aussi à terme, mais ce chantier se limite au site vitrine —
il servira de modèle si l'app est traitée ensuite.

Périmètre actuel du site (`src/App.jsx`) :

| Route            | Composant              |
|-------------------|-------------------------|
| `/`               | `HomePage`              |
| `/pricing`        | `PricingPage`           |
| `/security`       | `SecurityPage`          |
| `/download`       | `DownloadPage`          |
| `/business`       | `BusinessPage`          |
| `/features`       | `FeaturesPage`          |
| `/contact`        | `ContactPage`           |
| `/changelog`      | `ChangelogPage`         |
| `/blog`           | `BlogPage`              |
| `/blog/:slug`     | `BlogPostPage`          |
| `/status`         | `StatusPage`            |
| `*`               | `NotFoundPage`          |

Plus le layout partagé `PublicLayout.jsx` (navbar, footer, modales légales
CGU/confidentialité) et deux fichiers de données : `src/data/blog.js`
(3 articles) et `src/data/changelog.js`.

## Objectif

Rendre tout le site consultable en français (par défaut) et en anglais, avec
une URL dédiée par langue, sans dupliquer les composants de page.

## Décisions

1. **Librairie** : `react-i18next` + `i18next`. Standard, gère
   l'interpolation et le fallback, évite de réinventer cette logique.
2. **Routage** : chaque route existante garde son chemin français tel quel
   et obtient un miroir préfixé `/en/...` (`/en`, `/en/pricing`,
   `/en/features`, `/en/blog/:slug`, etc.) qui rend le **même** composant.
   Pas de redirection automatique basée sur la langue du navigateur au
   premier chargement — `/` reste français par défaut. Le composant de page
   ne change jamais entre les deux langues, seul le texte affiché change via
   `t()`.
3. **Traductions de page** : un namespace JSON par page —
   `src/locales/fr/<page>.json` et `src/locales/en/<page>.json` (ex.
   `home.json`, `pricing.json`, `security.json`, `download.json`,
   `business.json`, `features.json`, `contact.json`, `changelog.json`,
   `blog.json`, `status.json`, `notfound.json`) — plus un namespace
   `common.json` pour le layout partagé (navbar, footer, modales légales).
   Chaque chaîne de texte en dur dans le JSX de la page est remplacée par
   `t('clé')`.
4. **Blog & changelog** : ces deux fichiers sont déjà pilotés par des
   tableaux de données JS, pas du JSX. Ils deviennent `blog.fr.js` /
   `blog.en.js` et `changelog.fr.js` / `changelog.en.js`, exportant des
   tableaux parallèles indexés par le même `slug`/`id`. `BlogPage`,
   `BlogPostPage` et `ChangelogPage` importent le tableau correspondant à la
   langue active. Pas d'imbrication `{fr, en}` par champ — deux fichiers
   séparés sont plus simples à éditer et moins sujets à erreur.
5. **Sélecteur de langue** : un toggle FR/EN dans la navbar (à
   l'emplacement libéré par l'ancien sélecteur de thème du haut, retiré lors
   d'un précédent chantier — voir commit `86d98a3`) et une entrée
   équivalente dans le footer, à côté du sélecteur de thème existant. Le
   clic change uniquement le préfixe `/en` de l'URL courante en préservant
   le reste du chemin (et le slug de blog post le cas échéant).
6. **Persistance** : la langue choisie est mémorisée en `localStorage` (via
   le plugin `i18next-browser-languagedetector`, configuré pour lire d'abord
   le préfixe d'URL, puis le `localStorage`, sans détection de la langue du
   navigateur pour le choix initial — cohérent avec la décision "pas de
   redirection automatique").
7. **SEO** :
   - `<html lang="fr">` / `<html lang="en">` synchronisé à chaque
     changement de langue (effet réagissant à `i18n.language`).
   - Balises `<link rel="alternate" hreflang="...">` entre les deux
     versions de chaque page.
   - `<title>` et meta description traduits par page : ajout d'un petit
     hook `useDocumentTitle(titleKey, descKey)` (n'existe pas encore —
     aujourd'hui seul `index.html` a un `<title>` statique).

## Hors périmètre (pour ce chantier)

- L'app web DencPass (`DencPass/frontend`) et l'extension navigateur — non
  traitées ici, chantier séparé si demandé plus tard.
- Détection automatique de la langue du navigateur au premier chargement.
- Une 3ᵉ langue — l'architecture (namespaces + fichiers par langue) la
  supporterait sans refonte, mais rien n'est fait pour elle maintenant.

## Ampleur

~3280 lignes de contenu actuellement en dur, réparties sur 9 pages + le
layout partagé + 3 articles de blog + le changelog. C'est un chantier
mécanique mais volumineux — le plan d'implémentation le découpe page par
page (unités indépendantes, bien adaptées à une exécution par sous-agents
en parallèle une fois le plan écrit).

## Traduction du contenu

Toutes les traductions anglaises sont rédigées maintenant (adaptation, pas
mot-à-mot) en même temps que l'extraction des clés — pas de texte
provisoire à combler plus tard.

## Précision routage — page 404

La route `*` (catch-all, `NotFoundPage`) reste unique dans `App.jsx` : elle
matche déjà tout chemin non reconnu, y compris sous `/en/...`, sans avoir
besoin d'un miroir `/en/*` explicite. Son propre texte ("Page introuvable.",
"Retour à l'accueil") passe par `common.json` ou un `notfound.json` dédié,
et choisit fr/en selon le préfixe d'URL au moment du rendu comme les autres
pages.
