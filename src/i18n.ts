import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './assets/locales/en/translation.json'
import translationVN from './assets/locales/vi/translation.json'

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
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  // react: {
  //   useSuspense: false,
  // },
})

export default i18n
