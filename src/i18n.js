import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import commonFr from './locales/fr/common.json'
import commonEn from './locales/en/common.json'
import homeFr from './locales/fr/home.json'
import homeEn from './locales/en/home.json'
import featuresFr from './locales/fr/features.json'
import featuresEn from './locales/en/features.json'
import securityFr from './locales/fr/security.json'
import securityEn from './locales/en/security.json'
import pricingFr from './locales/fr/pricing.json'
import pricingEn from './locales/en/pricing.json'
import businessFr from './locales/fr/business.json'
import businessEn from './locales/en/business.json'
import downloadFr from './locales/fr/download.json'
import downloadEn from './locales/en/download.json'
import contactFr from './locales/fr/contact.json'
import contactEn from './locales/en/contact.json'
import changelogFr from './locales/fr/changelog.json'
import changelogEn from './locales/en/changelog.json'
import blogFr from './locales/fr/blog.json'
import blogEn from './locales/en/blog.json'
import statusFr from './locales/fr/status.json'
import statusEn from './locales/en/status.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        common: commonFr, home: homeFr, features: featuresFr, security: securityFr,
        pricing: pricingFr, business: businessFr, download: downloadFr, contact: contactFr,
        changelog: changelogFr, blog: blogFr, status: statusFr,
      },
      en: {
        common: commonEn, home: homeEn, features: featuresEn, security: securityEn,
        pricing: pricingEn, business: businessEn, download: downloadEn, contact: contactEn,
        changelog: changelogEn, blog: blogEn, status: statusEn,
      },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    ns: ['common', 'home', 'features', 'security', 'pricing', 'business', 'download', 'contact', 'changelog', 'blog', 'status'],
    defaultNS: 'common',
    detection: {
      // URL prefix wins first (App.jsx calls changeLanguage explicitly per route),
      // then a returning visitor's last choice — never the browser's Accept-Language.
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

export default i18n
