import i18n  from 'meteor/universe:i18n'

export default {
  subject: (profile={}) => {
    const t = i18n.createTranslator('Emails', profile.lang)
    return t('emailVerification.subject')
  },
  text: (user, code, profile={}, getUrlFromCode) => {
    const t = i18n.createTranslator('Emails', profile.lang)
    return t('emailVerification.text', {url: getUrlFromCode(code)})
  }
}
