import { buildLocales } from './helpers'

const localeData = {
  en: {
    abTesting:     require('./en/abTesting.yml').default,
    common:        require('./en/common.yml').default,
    emails:        require('./en/emails.yml').default,
    home:          require('./en/home.yml').default,
    referrer:      require('./en/referrer.yml').default,
    socialNetwork: require('./en/socialNetwork.yml').default,
    terms:         require('./en/terms.yml').default,
  },
  fr: {
    abTesting:     require('./fr/abTesting.yml').default,
    common:        require('./fr/common.yml').default,
    emails:        require('./fr/emails.yml').default,
    home:          require('./fr/home.yml').default,
    referrer:      require('./fr/referrer.yml').default,
    socialNetwork: require('./fr/socialNetwork.yml').default,
    terms:         require('./fr/terms.yml').default,
  }
}

const locales = buildLocales(localeData)

export default locales
