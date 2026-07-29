// Blog articles data.
// Replace placeholder sections (marked with [PLACEHOLDER]) with real content before publishing.
// Add new articles at the TOP of this array (newest first).
export const ARTICLES = [
  {
    slug: 'proteger-acces-organisation',
    title: 'Comment protéger les accès de votre organisation en 2026',
    excerpt: 'Les violations de données coûtent en moyenne 4,4 millions de dollars aux entreprises. Pourtant, 80 % des incidents impliquent des identifiants compromis. Voici les pratiques concrètes à mettre en place dès maintenant.',
    category: 'Guide',
    date: '2026-07-XX',
    readTime: '7 min',
    content: [
      {
        type: 'intro',
        text: '[PLACEHOLDER — Rédigez une introduction de 3-4 phrases présentant le problème des accès non sécurisés en entreprise, avec une statistique ou un exemple concret récent pour ancrer le sujet.]',
      },
      {
        type: 'h2',
        text: '1. Inventorier tous les accès de l\'organisation',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Expliquez pourquoi la première étape est de cartographier tous les comptes existants : SaaS, serveurs, accès cloud, comptes partagés. Mentionnez les risques des comptes fantômes et des accès partagés non tracés.]',
      },
      {
        type: 'h2',
        text: '2. Imposer l\'authentification à deux facteurs (2FA)',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Détaillez pourquoi le 2FA TOTP est supérieur aux SMS pour les organisations. Incluez des chiffres sur la réduction du risque. Mentionnez DencPass comme vecteur de stockage sécurisé des secrets TOTP.]',
      },
      {
        type: 'ul',
        items: [
          '[PLACEHOLDER — avantage 2FA #1]',
          '[PLACEHOLDER — avantage 2FA #2]',
          '[PLACEHOLDER — avantage 2FA #3]',
        ],
      },
      {
        type: 'h2',
        text: '3. Gérer les départs et les rotations de postes',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Abordez la problématique des accès orphelins : un employé part, ses accès restent actifs des semaines. Expliquez comment un gestionnaire centralisé avec audit log résout ce problème.]',
      },
      {
        type: 'h2',
        text: '4. Auditer régulièrement la santé des mots de passe',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Présentez le concept de score de sécurité (mots de passe faibles, réutilisés, compromis via HIBP). Montrez comment un audit régulier permet d\'agir de façon proactive plutôt que réactive.]',
      },
      {
        type: 'callout',
        text: '[PLACEHOLDER — Insérez ici un encadré pratique : une checklist rapide des 5 points à vérifier chaque trimestre, ou un lien vers un guide complémentaire.]',
      },
      {
        type: 'h2',
        text: 'Conclusion',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Conclusion de 2-3 phrases. Résumez les 4 axes présentés et invitez le lecteur à tester DencPass Enterprise ou à contacter l\'équipe pour une démo.]',
      },
    ],
  },
  {
    slug: 'securite-numerique-afrique',
    title: 'Sécurité numérique en Afrique : un enjeu croissant, des outils inadaptés',
    excerpt: 'Le continent africain est la région du monde où la digitalisation progresse le plus vite. Mais les outils de cybersécurité disponibles restent pensés pour d\'autres réalités. DencPass est né de ce constat.',
    category: 'Produit',
    date: '2026-06-XX',
    readTime: '5 min',
    content: [
      {
        type: 'intro',
        text: '[PLACEHOLDER — Introduisez le paradoxe : croissance rapide de l\'usage numérique en Afrique de l\'Ouest (mobile money, e-commerce, administration en ligne) vs. outils de sécurité qui ne parlent ni la même langue, ni ne comprennent les mêmes modes de paiement.]',
      },
      {
        type: 'h2',
        text: 'Un écosystème numérique en pleine expansion',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Données sur la croissance du mobile et de l\'internet en Afrique subsaharienne. Mentionnez les secteurs les plus exposés : fintech, santé, e-gouvernement. Source possible : rapport GSMA ou CNUCED.]',
      },
      {
        type: 'h2',
        text: 'Les outils existants ne sont pas conçus pour l\'Afrique',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Expliquez les frictions concrètes : paiement en USD ou EUR uniquement, interface uniquement en anglais, support basé en Europe/US avec des fuseaux horaires incompatibles, absence de conformité locale (APDP Sénégal, CNIL pays par pays).]',
      },
      {
        type: 'ul',
        items: [
          '[PLACEHOLDER — friction #1 : paiement]',
          '[PLACEHOLDER — friction #2 : langue]',
          '[PLACEHOLDER — friction #3 : support]',
          '[PLACEHOLDER — friction #4 : conformité locale]',
        ],
      },
      {
        type: 'h2',
        text: 'Ce que DencPass fait différemment',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Présentez les différenciateurs clés de DencPass : paiement FCFA via Wave et Orange Money, passphrases en langues africaines (wolof, bambara, swahili…), interface en français, support basé à Dakar, hébergement Africa-compatible.]',
      },
      {
        type: 'h2',
        text: 'Conclusion',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Conclusion engageante. La sécurité numérique n\'est pas un luxe occidental. DencPass est un outil conçu ici, pour les réalités d\'ici. CTA vers la page d\'inscription.]',
      },
    ],
  },
  {
    slug: 'pourquoi-gestionnaire-mots-de-passe',
    title: 'Pourquoi tout le monde devrait utiliser un gestionnaire de mots de passe',
    excerpt: 'On utilise en moyenne 100 comptes en ligne. Retenir 100 mots de passe uniques et robustes est impossible pour un cerveau humain. Voici pourquoi déléguer cette tâche à un outil dédié n\'est pas une option, c\'est une nécessité.',
    category: 'Sécurité',
    date: '2026-05-XX',
    readTime: '4 min',
    content: [
      {
        type: 'intro',
        text: '[PLACEHOLDER — Commencez par le constat humain : la mémoire humaine est mauvaise pour les mots de passe robustes. On réutilise, on simplifie, on oublie. Ce n\'est pas un défaut de caractère, c\'est une limite biologique. La solution n\'est pas d\'essayer plus fort — c\'est d\'utiliser le bon outil.]',
      },
      {
        type: 'h2',
        text: 'Le vrai coût d\'un mot de passe faible',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Statistiques sur les violations : % des violations dues à des mots de passe compromis/réutilisés, temps moyen pour craquer un mot de passe à 8 caractères, exemples concrets de fuites notoires et leurs conséquences.]',
      },
      {
        type: 'h2',
        text: 'Ce qu\'un gestionnaire fait à votre place',
      },
      {
        type: 'ul',
        items: [
          '[PLACEHOLDER — avantage #1 : génération de mots de passe longs et aléatoires]',
          '[PLACEHOLDER — avantage #2 : un seul mot de passe à retenir (le mot de passe principal)]',
          '[PLACEHOLDER — avantage #3 : remplissage automatique, résistance au phishing]',
          '[PLACEHOLDER — avantage #4 : alerte si un mot de passe a été compromis (HIBP)]',
        ],
      },
      {
        type: 'h2',
        text: '« Mais je fais confiance à personne pour stocker mes mots de passe »',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Répondez à l\'objection légitime sur la confiance. Expliquez le chiffrement côté client : le gestionnaire ne voit jamais vos mots de passe en clair. Votre mot de passe principal ne quitte jamais votre appareil. Comparez avec le risque réel de l\'alternative (post-it, tableur, mémoire).]',
      },
      {
        type: 'callout',
        text: '[PLACEHOLDER — Encadré "À retenir" : 3 faits clés sur la sécurité des gestionnaires modernes. Ex: chiffrement AES-256, zéro connaissance, audits de sécurité tiers.]',
      },
      {
        type: 'h2',
        text: 'Par où commencer',
      },
      {
        type: 'p',
        text: '[PLACEHOLDER — Guide de démarrage en 3 étapes : créer son compte, importer ses mots de passe existants (CSV ou extension), activer le 2FA. Lien vers DencPass, gratuit pour commencer.]',
      },
    ],
  },
]

export const ARTICLE_CATEGORY_STYLES = {
  Sécurité:  { color: 'var(--purple)',  bg: 'var(--purple-014)'     },
  Produit:   { color: 'var(--accent)',  bg: 'var(--accent-014)'     },
  Guide:     { color: 'var(--green)',   bg: 'rgba(34,197,94,0.10)'  },
  Entreprise:{ color: 'var(--amber)',   bg: 'rgba(245,158,11,0.12)' },
}
