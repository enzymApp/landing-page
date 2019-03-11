import { Meteor }   from 'meteor/meteor'
import {Accounts}   from 'meteor/accounts-base'
import React        from 'react'
import { render }   from 'react-dom'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import smoothscroll from 'smoothscroll-polyfill'
import App          from '/src/App'
import locales from '/src/modules/intl/loadLocales'
// import discordWidget, {changeChannelLang} from '/src/tools/discordWidget'
import '../both'
import addReCaptcha  from './addReCaptcha'
import { guessBrowserLang } from '/src/modules/intl/helpers'

addLocaleData([...en, ...fr])
smoothscroll.polyfill()

console.log(guessBrowserLang(locales))

Meteor.startup(() => {
  const config = Meteor.settings.public
  const locale = guessBrowserLang(locales)
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
