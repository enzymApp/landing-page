import { Meteor }   from 'meteor/meteor'
import i18n         from 'meteor/universe:i18n'
import {Accounts}   from 'meteor/accounts-base'
import React        from 'react'
import { render }   from 'react-dom'
import smoothscroll from 'smoothscroll-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppContainer from '/imports/ui/layouts/AppContainer'
import addHotjar    from './addHotjar'
import addTawkChat  from './addTawkChat'
import addReCaptcha from './addReCaptcha'

smoothscroll.polyfill()

console.log(getLang())
i18n.setLocale(getLang())
i18n.setOptions({
  defaultLocale: 'fr',
  sameLocaleOnServerConnection: true,
})

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('app'))
  addHotjar(window, document)
  addReCaptcha(window, document)
  addTawkChat(window, document)
  Accounts.onLogin(() => {
    const user = Meteor.user()
    if(user && user.profile && user.profile.lang) {
      i18n.setLocale(user.profile.lang)
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
