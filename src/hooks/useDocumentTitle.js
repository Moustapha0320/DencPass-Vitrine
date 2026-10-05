import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SITE_URL = 'https://dencpass.com'

function upsertMeta(attr, value, content) {
  let el = document.querySelector(`meta[${attr}="${value}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, value)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, hreflang, href) {
  let el = document.querySelector(`link[rel="${rel}"][hreflang="${hreflang}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets <title>, meta description, <html lang>, and hreflang alternate links
 * for the current page. Call once per page component, after useTranslation().
 *
 * @param {string} title - already-translated page title (e.g. t('pricing:meta.title'))
 * @param {string} description - already-translated meta description
 * @param {string} alternatePath - French path with no /en prefix, e.g. '/pricing' or '/' or '/blog/some-slug'
 */
export default function useDocumentTitle(title, description, alternatePath) {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.title = title
    upsertMeta('name', 'description', description)
    document.documentElement.lang = i18n.language

    const frPath = alternatePath === '/' ? '/' : alternatePath
    const enPath = alternatePath === '/' ? '/en' : `/en${alternatePath}`
    upsertLink('alternate', 'fr', `${SITE_URL}${frPath}`)
    upsertLink('alternate', 'en', `${SITE_URL}${enPath}`)
  }, [title, description, alternatePath, i18n.language])
}
