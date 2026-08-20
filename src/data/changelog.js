// Changelog entries : most recent first.
export const CHANGELOG = [
  {
    id: 'v1-4-0',
    version: 'v1.4.0',
    date: '2026-08-16',
    category: 'Nouveau',
    title: 'Extensions Edge et Firefox disponibles',
    description: "L'extension DencPass, jusque-là réservée à Chrome, est désormais aussi disponible sur Microsoft Edge et Firefox. Même remplissage automatique des identifiants, et détection des nouveaux mots de passe saisis avec proposition d'enregistrement dans le coffre.",
  },
  {
    id: 'v1-3-0',
    version: 'v1.3.0',
    date: '2026-07-29',
    category: 'Nouveau',
    title: 'Import CSV chiffré côté navigateur',
    description: "L'import de mots de passe depuis un fichier CSV s'effectue désormais entièrement dans le navigateur : chaque entrée est chiffrée avant d'être envoyée au serveur. Aucun mot de passe ne transite en clair. Compatible avec les exports 1Password, Bitwarden et LastPass.",
  },
  {
    id: 'v1-2-1',
    version: 'v1.2.1',
    date: '2026-07-28',
    category: 'Corrigé',
    title: 'Correction du flux 2FA post-connexion',
    description: "Un bug critique empêchait la clé de chiffrement d'être correctement initialisée après validation du code 2FA, rendant le coffre inaccessible jusqu'à reconnexion manuelle. Ce correctif résout complètement le problème pour 100 % des utilisateurs concernés.",
  },
  {
    id: 'v1-2-0',
    version: 'v1.2.0',
    date: '2026-06-10',
    category: 'Sécurité',
    title: 'Vérification HIBP renforcée',
    description: "La détection de fuites via Have I Been Pwned utilise désormais le protocole k-anonymat strict : seuls les 5 premiers caractères du hash SHA-1 sont transmis au service externe. Vos mots de passe ne quittent jamais votre appareil en clair, même pour la vérification.",
  },
  {
    id: 'v1-1-0',
    version: 'v1.1.0',
    date: '2026-05-05',
    category: 'Nouveau',
    title: 'Extension Chrome disponible',
    description: "L'extension DencPass pour Chrome est désormais disponible. Elle permet le remplissage automatique des identifiants sur les sites web directement depuis le navigateur, sans copier-coller. L'extension communique avec votre coffre chiffré via une connexion locale sécurisée.",
  },
  {
    id: 'v1-0-2',
    version: 'v1.0.2',
    date: '2026-04-08',
    category: 'Design',
    title: 'Refonte de l\'interface du tableau de bord',
    description: "Le tableau de bord principal a été repensé pour une meilleure lisibilité : score de sécurité mis en avant, accès rapide aux mots de passe récents, et widget d'alertes HIBP directement visible. Le mode sombre et le mode clair bénéficient tous deux des nouvelles couleurs.",
  },
  {
    id: 'v1-0-0',
    version: 'v1.0.0',
    date: '2026-03-01',
    category: 'Nouveau',
    title: 'Lancement de DencPass',
    description: "Première version publique de DencPass : gestionnaire de mots de passe et secrets numériques conçu pour les professionnels et organisations d'Afrique. Coffre chiffré AES-256-GCM, générateur de mots de passe, passphrase en langues africaines, 2FA TOTP et paiement en FCFA.",
  },
]

export const CATEGORY_STYLES = {
  Nouveau:   { color: 'var(--accent)',  bg: 'var(--accent-014)'  },
  Sécurité:  { color: 'var(--purple)',  bg: 'var(--purple-014)'  },
  Corrigé:   { color: 'var(--amber)',   bg: 'rgba(245,158,11,0.12)' },
  Design:    { color: 'var(--green)',   bg: 'rgba(34,197,94,0.10)'  },
}
