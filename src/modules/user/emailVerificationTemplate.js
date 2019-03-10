import t from '/src/modules/intl/server/loadServerLocales'

export default {
  subject: (code, profile = {}) => console.log(profile.lang) || t(profile.lang)('emails.emailVerification.subject'),
  text: (user, code, profile={}, getUrlFromCode) => (
    t(profile.lang)('emails.emailVerification.text', { url: getUrlFromCode(code) })
  )
}
