// Blog articles data.
// Add new articles at the TOP of this array (newest first).
export const ARTICLES = [
  {
    slug: 'proteger-acces-organisation',
    title: 'Comment protéger les accès de votre organisation en 2026',
    excerpt: 'Les violations de données coûtent en moyenne 4,4 millions de dollars aux entreprises. Pourtant, 80 % des incidents impliquent des identifiants compromis. Voici les pratiques concrètes à mettre en place dès maintenant.',
    category: 'Guide',
    date: '2026-07-29',
    readTime: '7 min',
    content: [
      {
        type: 'intro',
        text: "En 2026, une entreprise ouest-africaine sur deux utilise déjà plus de dix outils numériques différents pour gérer ses opérations : messagerie, comptabilité, CRM, banque en ligne, réseaux sociaux professionnels. Chaque outil est une porte d'entrée potentielle si son accès n'est pas correctement protégé. Les violations de données coûtent en moyenne 4,4 millions de dollars aux entreprises touchées, et dans 80 % des cas, la cause est un identifiant compromis, réutilisé ou mal protégé. La bonne nouvelle, c'est qu'il ne faut ni gros budget ni équipe dédiée pour corriger l'essentiel : quatre réflexes suffisent à réduire drastiquement le risque.",
      },
      {
        type: 'h2',
        text: "1. Inventorier tous les accès de l'organisation",
      },
      {
        type: 'p',
        text: "Avant de sécuriser quoi que ce soit, il faut savoir ce qui existe. La plupart des organisations sous-estiment le nombre de comptes actifs : outils SaaS souscrits par un employé sans validation IT, accès serveurs créés pour un projet ponctuel jamais révoqués, comptes partagés dont personne ne connaît plus la liste des détenteurs. Ces comptes fantômes sont particulièrement dangereux car ils échappent à toute surveillance et restent actifs bien après avoir cessé d'être utiles. Un inventaire complet, même réalisé simplement dans un tableau au départ, est le point de départ incontournable de toute démarche de sécurisation.",
      },
      {
        type: 'h2',
        text: "2. Imposer l'authentification à deux facteurs (2FA)",
      },
      {
        type: 'p',
        text: "Le 2FA basé sur une application TOTP (code à usage unique généré toutes les 30 secondes) est nettement plus sûr que le SMS, qui reste vulnérable au détournement de carte SIM et à l'interception. Selon plusieurs études sur la sécurité des comptes, l'activation d'un 2FA applicatif bloque plus de 99 % des tentatives de piratage automatisées, même lorsque le mot de passe a fuité. Un gestionnaire comme DencPass permet de générer et de stocker ces codes TOTP directement à côté des mots de passe correspondants, chiffrés avec la même rigueur, ce qui évite de jongler entre plusieurs applications et simplifie l'adoption par les équipes.",
      },
      {
        type: 'ul',
        items: [
          'Bloque la quasi-totalité des connexions frauduleuses, même avec un mot de passe volé',
          'Ne dépend pas du réseau mobile, donc fonctionne même en cas de mauvaise couverture',
          'Centralise codes et mots de passe au même endroit, pour une adoption plus simple par les équipes',
        ],
      },
      {
        type: 'h2',
        text: '3. Gérer les départs et les rotations de postes',
      },
      {
        type: 'p',
        text: "Un employé qui quitte l'entreprise conserve trop souvent ses accès actifs pendant des semaines, parfois des mois, faute de procédure claire. C'est l'une des failles les plus fréquentes et les plus évitables : chaque compte oublié est une porte laissée entrouverte. Un gestionnaire d'accès centralisé avec journal d'audit permet de voir en un coup d'oeil qui a accès à quoi, et de révoquer immédiatement les droits d'une personne le jour de son départ, sans devoir courir après chaque service pour couper les accès un par un.",
      },
      {
        type: 'h2',
        text: '4. Auditer régulièrement la santé des mots de passe',
      },
      {
        type: 'p',
        text: "Un mot de passe créé il y a trois ans, réutilisé sur plusieurs comptes ou apparu dans une fuite de données publique (via des bases comme Have I Been Pwned) reste un risque actif tant que personne ne le détecte. Un score de sécurité qui évalue automatiquement la robustesse, la réutilisation et l'exposition des mots de passe de l'organisation permet de transformer une démarche réactive, où l'on découvre le problème après l'incident, en démarche proactive, où l'on corrige avant que le problème ne survienne.",
      },
      {
        type: 'callout',
        text: "Checklist trimestrielle à vérifier : 1) La liste des comptes actifs est-elle à jour ? 2) Le 2FA est-il activé sur tous les accès sensibles ? 3) Les accès des personnes parties ont-ils bien été révoqués ? 4) Le score de sécurité des mots de passe s'est-il amélioré ou dégradé ? 5) Les mots de passe partagés ont-ils été changés depuis la dernière revue ?",
      },
      {
        type: 'h2',
        text: 'Conclusion',
      },
      {
        type: 'p',
        text: "Inventorier ses accès, activer le 2FA, encadrer les départs et auditer régulièrement la santé des mots de passe : ces quatre réflexes suffisent à éliminer la grande majorité des risques liés aux identifiants en entreprise. Aucun ne demande une transformation lourde, seulement un outil adapté et un peu de rigueur. Si vous voulez mettre en place ces pratiques sans complexité technique, DencPass Enterprise a été pensé pour ça : vous pouvez tester la plateforme dès aujourd'hui ou contacter notre équipe à Dakar pour une démonstration.",
      },
    ],
  },
  {
    slug: 'securite-numerique-afrique',
    title: 'Sécurité numérique en Afrique : un enjeu croissant, des outils inadaptés',
    excerpt: "Le continent africain est la région du monde où la digitalisation progresse le plus vite. Mais les outils de cybersécurité disponibles restent pensés pour d'autres réalités. DencPass est né de ce constat.",
    category: 'Produit',
    date: '2026-07-29',
    readTime: '5 min',
    content: [
      {
        type: 'intro',
        text: "En Afrique de l'Ouest, le mobile money est devenu en une décennie un pilier de l'économie quotidienne : on y paie ses factures, on y reçoit son salaire, on y gère la trésorerie d'une petite entreprise. Dans plusieurs pays de la région, sa contribution au PIB dépasse aujourd'hui les 5 %. Mais cette révolution numérique s'est construite avec des outils de sécurité pensés ailleurs, pour d'autres usages, d'autres monnaies, d'autres langues. DencPass est né de ce décalage.",
      },
      {
        type: 'h2',
        text: 'Un écosystème numérique en pleine expansion',
      },
      {
        type: 'p',
        text: "Selon les derniers rapports de la GSMA, l'Afrique subsaharienne reste la région la plus dynamique au monde en matière de mobile money, avec plus d'un milliard de comptes enregistrés et des centaines de milliards de dollars transitant chaque année par ces plateformes en Afrique de l'Ouest seule. Cette croissance ne se limite pas au paiement mobile : la fintech, la santé numérique et l'administration en ligne suivent le même mouvement, portées par une génération d'entrepreneurs qui digitalisent leurs opérations plus vite que les infrastructures de sécurité ne suivent. Chaque nouveau service en ligne est un nouveau compte à protéger, et un nouveau mot de passe à retenir.",
      },
      {
        type: 'h2',
        text: "Les outils existants ne sont pas conçus pour l'Afrique",
      },
      {
        type: 'p',
        text: "La grande majorité des gestionnaires de mots de passe disponibles aujourd'hui ont été conçus pour des marchés nord américains ou européens, et cela se sent à chaque étape. L'abonnement se paie en dollars ou en euros par carte bancaire internationale, ce qui exclut d'office une partie des professionnels qui opèrent au quotidien avec Wave ou Orange Money. L'interface, le support client et la documentation restent presque exclusivement en anglais, avec des équipes basées à des fuseaux horaires qui rendent toute urgence technique difficile à résoudre le jour même. Et aucun de ces outils ne se préoccupe des cadres de protection des données propres à chaque pays, comme l'APDP au Sénégal.",
      },
      {
        type: 'ul',
        items: [
          'Paiement limité aux cartes bancaires internationales en USD ou EUR, inadapté à une majorité de PME ouest africaines',
          'Interface et support uniquement en anglais, alors que le français reste la langue de travail de nombreuses organisations',
          'Support client basé en Europe ou aux États-Unis, avec des délais de réponse incompatibles avec un incident de sécurité urgent',
          "Aucune prise en compte des réglementations locales sur la protection des données, comme l'APDP au Sénégal",
        ],
      },
      {
        type: 'h2',
        text: 'Ce que DencPass fait différemment',
      },
      {
        type: 'p',
        text: "DencPass a été construit à partir de ces frictions, pas malgré elles. Le paiement se fait en FCFA, directement via Wave ou Orange Money, sans carte bancaire internationale ni conversion de devise. L'interface est entièrement en français, et il est possible de créer sa phrase secrète principale en s'appuyant sur des mots issus du wolof, du bambara, du swahili ou du yoruba, pour une mémorisation plus naturelle et plus personnelle. Le support est basé à Dakar, aux mêmes heures de travail que ses utilisateurs, capable de répondre à un incident de sécurité sans décalage horaire. Le chiffrement AES-256-GCM reste au niveau des standards internationaux les plus exigeants ; ce qui change, c'est que l'outil a été pensé pour les réalités concrètes de ceux qui l'utilisent.",
      },
      {
        type: 'h2',
        text: 'Conclusion',
      },
      {
        type: 'p',
        text: "La sécurité numérique n'est pas un luxe réservé aux entreprises occidentales, c'est un besoin aussi réel à Dakar, Abidjan ou Cotonou qu'à Paris ou New York. DencPass est un outil conçu ici, pour les réalités d'ici : la monnaie, la langue, le fuseau horaire et le cadre légal de ceux qui l'utilisent chaque jour. Créez votre compte gratuit dès aujourd'hui et voyez la différence par vous même.",
      },
    ],
  },
  {
    slug: 'pourquoi-gestionnaire-mots-de-passe',
    title: 'Pourquoi tout le monde devrait utiliser un gestionnaire de mots de passe',
    excerpt: "On utilise en moyenne 100 comptes en ligne. Retenir 100 mots de passe uniques et robustes est impossible pour un cerveau humain. Voici pourquoi déléguer cette tâche à un outil dédié n'est pas une option, c'est une nécessité.",
    category: 'Sécurité',
    date: '2026-05-XX',
    readTime: '4 min',
    content: [
      {
        type: 'intro',
        text: "La plupart d'entre nous gérons aujourd'hui plus de cent comptes en ligne : messagerie, réseaux sociaux, banque, e-commerce, mobile money. Retenir cent mots de passe uniques et vraiment robustes dépasse les capacités de la mémoire humaine, et ce n'est pas un défaut de discipline, c'est simplement une limite biologique. Le résultat, presque tout le monde réutilise les mêmes mots de passe ou les simplifie pour pouvoir s'en souvenir. La bonne nouvelle, c'est qu'il existe un outil conçu précisément pour résoudre ce problème à votre place.",
      },
      {
        type: 'h2',
        text: "Le vrai coût d'un mot de passe faible",
      },
      {
        type: 'p',
        text: "La grande majorité des violations de comptes en ligne ne résultent pas d'un piratage sophistiqué, mais d'un mot de passe faible, réutilisé sur plusieurs sites, ou déjà exposé lors d'une fuite de données ailleurs sur internet. Un mot de passe court de huit caractères, même avec des chiffres et des majuscules, peut être deviné par un ordinateur moderne en quelques heures seulement. Le scénario le plus fréquent est simple : un site que vous utilisez peu subit une fuite, et si vous réutilisiez ce même mot de passe pour votre messagerie ou votre compte bancaire, ces comptes deviennent immédiatement vulnérables, même si eux n'ont jamais été piratés directement.",
      },
      {
        type: 'h2',
        text: 'Ce que fait un gestionnaire à votre place',
      },
      {
        type: 'ul',
        items: [
          "Il génère pour chaque site un mot de passe long, aléatoire et impossible à deviner, sans que vous ayez à l'inventer",
          "Il retient tout à votre place : vous n'avez plus qu'un seul mot de passe principal à mémoriser",
          'Il remplit automatiquement vos identifiants sur le bon site, ce qui vous protège aussi des faux sites de phishing',
          "Il vous alerte si l'un de vos mots de passe apparaît dans une fuite de données connue, pour que vous puissiez le changer avant qu'il ne soit exploité",
        ],
      },
      {
        type: 'h2',
        text: '« Mais je ne fais confiance à personne pour stocker mes mots de passe »',
      },
      {
        type: 'p',
        text: "C'est une réserve légitime, et la réponse tient dans la façon dont le chiffrement fonctionne. Avec l'architecture zero-knowledge de DencPass, vos mots de passe sont chiffrés et déchiffrés directement sur votre appareil, avant même d'être envoyés vers nos serveurs. Concrètement, cela veut dire que même notre équipe ne peut pas voir vos mots de passe en clair, puisque nous ne détenons jamais la clé qui permettrait de les déchiffrer. Comparé au post-it collé sur l'écran, au fichier tableur non protégé ou à la mémoire faillible, un gestionnaire zero-knowledge reste, de loin, l'option la plus sûre.",
      },
      {
        type: 'callout',
        text: "À retenir : architecture zero-knowledge. Vos mots de passe sont chiffrés en AES-256-GCM directement sur votre appareil, avant tout envoi. La clé de chiffrement ne quitte jamais votre appareil et personne chez DencPass ne peut consulter vos mots de passe en clair. Un audit de sécurité indépendant vérifie régulièrement la solidité de ce système.",
      },
      {
        type: 'h2',
        text: 'Par où commencer',
      },
      {
        type: 'p',
        text: "Commencer prend moins de dix minutes. D'abord, créez votre compte DencPass et choisissez un mot de passe principal fort, c'est le seul que vous aurez encore à retenir. Ensuite, importez vos mots de passe existants depuis votre navigateur ou un fichier CSV, DencPass s'occupe du reste. Enfin, activez la double authentification sur votre compte pour une couche de protection supplémentaire. L'inscription est gratuite, alors autant commencer dès aujourd'hui plutôt que d'attendre le prochain incident.",
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
