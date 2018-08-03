import i18n  from 'meteor/universe:i18n'

export default {
  subject: (profile={}) => {
    const t = i18n.createTranslator('Emails', profile.lang || 'fr')
    return t('welcome.subject')
  },
  text: (url, profile={}) => {
    const t = i18n.createTranslator('Emails', profile.lang || 'fr')
    return t('welcome.text', {url})
  }
}
