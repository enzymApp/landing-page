import t from '/src/modules/intl/server/loadServerLocales'

export default {
  subject: (profile={}) => t(profile.lang)('emails.welcome.subject'),
  text: (url, profile={}) => t(profile.lang)('emails.welcome.text', { url }),
}
