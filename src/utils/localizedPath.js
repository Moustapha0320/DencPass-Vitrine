// Prefixes an internal route path with the /en locale segment when needed.
// Mirrors the exact special-casing already established by `enPathFor` in
// src/App.jsx and `LangSwitch` in src/components/layout/PublicLayout.jsx:
// the French root '/' maps to '/en' (not '/en/'), everything else gets a
// plain '/en' prefix. French paths are returned unchanged.
export function localizedPath(path, lang) {
  if (lang !== 'en') return path
  return path === '/' ? '/en' : `/en${path}`
}
