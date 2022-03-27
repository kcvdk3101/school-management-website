import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationVN from '../public/locales/vi/translation.json'
import translationEN from '../public/locales/en/translation.json'

const resources = {
  en: {
    translation: translationEN,
  },
  vn: {
    translation: translationVN,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vn',

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
