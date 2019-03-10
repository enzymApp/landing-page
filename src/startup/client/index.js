import { Meteor }   from 'meteor/meteor'
import {Accounts}   from 'meteor/accounts-base'
import React        from 'react'
import { render }   from 'react-dom'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import smoothscroll from 'smoothscroll-polyfill'
import App          from '/src/App'
// import discordWidget, {changeChannelLang} from '/src/tools/discordWidget'
import '../both'
import addReCaptcha  from './addReCaptcha'

addLocaleData([...en, ...fr])
smoothscroll.polyfill()

console.log(getLang())

Meteor.startup(() => {
  const config = Meteor.settings.public
  const locale = getLang()
  render(<App locale={locale} />, document.getElementById('app'))
  // if(config.discord)   discordWidget(window, document, { locale })
  if(config.recaptcha) addReCaptcha(window, document, config.recaptcha)
  // Accounts.onLogin(() => {
  //   const user = Meteor.user()
  //   if(user && user.profile && user.profile.lang) {
  //     i18n.setLocale(user.profile.lang)
  //     changeChannelLang(user.profile.lang)
  //   }
  // })
})

function getLang () {
  return (
    navigator.languages && navigator.languages[0] ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.userLanguage ||
    'en-US'
  )
}
