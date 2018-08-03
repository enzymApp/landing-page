import { Meteor }   from 'meteor/meteor'
import i18n         from 'meteor/universe:i18n'
import {Accounts}   from 'meteor/accounts-base'
import React        from 'react'
import { render }   from 'react-dom'
import smoothscroll from 'smoothscroll-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppContainer from '/imports/ui/layouts/AppContainer'
import discordWidget, {changeChannelLang} from '/imports/tools/discordWidget'
import addReCaptcha  from './addReCaptcha'

smoothscroll.polyfill()

console.log(getLang())
i18n.setLocale(getLang())
i18n.setOptions({
  defaultLocale: 'fr',
  sameLocaleOnServerConnection: true,
})

Meteor.startup(() => {
  const config = Meteor.settings.public
  render(<AppContainer />, document.getElementById('app'))
  if(config.discord)   discordWidget(window, document)
  if(config.recaptcha) addReCaptcha(window, document, config.recaptcha)
  Accounts.onLogin(() => {
    const user = Meteor.user()
    if(user && user.profile && user.profile.lang) {
      i18n.setLocale(user.profile.lang)
      changeChannelLang()
    }
  })
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
