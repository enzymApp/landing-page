import i18n       from 'meteor/universe:i18n'

 Meteor.settings.public.tawk.apiKey
const langToTawkWidget = {
  fr: 'default',
  en: '1cg1cva5q',
}

export default (window, document, config) => {
  const API_KEY = config.apiKey
  const lang = i18n.getLocale().split('-')[0]
  const s1 = document.createElement("script")
  if(s1.lang === lang) return
  const widgetId = langToTawkWidget[lang]
  s1.async = true
  s1.src = `https://embed.tawk.to/${API_KEY}/${widgetId}`
  s1.charset = 'UTF-8'
  s1.setAttribute('crossorigin','*')
  s1.setAttribute('lang', lang)
  const parent = document.getElementsByTagName('head')[0]
  parent.appendChild(s1)
}
