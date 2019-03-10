import IntlMessageFormat from 'intl-messageformat'
import { guessLang, buildLocales } from '../helpers'

const localeData = {
  en: {
    emails: require('../en/emails.yml').default,
  },
  fr: {
    emails: require('../fr/emails.yml').default,
  }
}

const locales = buildLocales(localeData)

export default requestedLang => (msgCode, formatOptions) => {
  const lang = guessLang(locales, requestedLang)
  return new IntlMessageFormat(locales[lang][msgCode]).format(formatOptions)
}
