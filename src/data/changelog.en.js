// Changelog entries : most recent first.
export const CHANGELOG = [
  {
    id: 'v1-4-0',
    version: 'v1.4.0',
    date: '2026-08-16',
    category: 'new',
    title: 'Edge and Firefox extensions available',
    description: "The DencPass extension, previously Chrome-only, is now also available on Microsoft Edge and Firefox. Same autofill for credentials, and detection of newly entered passwords with a prompt to save them to the vault.",
  },
  {
    id: 'v1-3-0',
    version: 'v1.3.0',
    date: '2026-07-29',
    category: 'new',
    title: 'Browser-side encrypted CSV import',
    description: "Importing passwords from a CSV file now happens entirely in the browser: every entry is encrypted before being sent to the server. No password ever travels in clear text. Compatible with 1Password, Bitwarden and LastPass exports.",
  },
  {
    id: 'v1-2-1',
    version: 'v1.2.1',
    date: '2026-07-28',
    category: 'fixed',
    title: 'Fixed the post-login 2FA flow',
    description: "A critical bug prevented the encryption key from being correctly initialized after 2FA code validation, making the vault inaccessible until a manual reconnection. This fix fully resolves the issue for 100% of affected users.",
  },
  {
    id: 'v1-2-0',
    version: 'v1.2.0',
    date: '2026-06-10',
    category: 'security',
    title: 'Stronger HIBP verification',
    description: "Breach detection via Have I Been Pwned now uses strict k-anonymity: only the first 5 characters of the SHA-1 hash are sent to the external service. Your passwords never leave your device in clear text, even for verification.",
  },
  {
    id: 'v1-1-0',
    version: 'v1.1.0',
    date: '2026-05-05',
    category: 'new',
    title: 'Chrome extension available',
    description: "The DencPass extension for Chrome is now available. It autofills credentials on websites directly from your browser, no copy-paste needed. The extension talks to your encrypted vault over a secure local connection.",
  },
  {
    id: 'v1-0-2',
    version: 'v1.0.2',
    date: '2026-04-08',
    category: 'design',
    title: 'Dashboard interface redesign',
    description: "The main dashboard was redesigned for better readability: security score front and center, quick access to recent passwords, and an HIBP alert widget directly visible. Both dark and light mode get the new colors.",
  },
  {
    id: 'v1-0-0',
    version: 'v1.0.0',
    date: '2026-03-01',
    category: 'new',
    title: 'DencPass launches',
    description: "First public release of DencPass: a password and digital secrets manager built for professionals and organizations in Africa. AES-256-GCM encrypted vault, password generator, African-language passphrases, 2FA TOTP and FCFA payment.",
  },
]

export const CATEGORY_STYLES = {
  new:      { color: 'var(--accent)',  bg: 'var(--accent-014)'  },
  security: { color: 'var(--purple)',  bg: 'var(--purple-014)'  },
  fixed:    { color: 'var(--amber)',   bg: 'rgba(245,158,11,0.12)' },
  design:   { color: 'var(--green)',   bg: 'rgba(34,197,94,0.10)'  },
}
