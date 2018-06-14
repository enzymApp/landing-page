import { Meteor } from 'meteor/meteor'

import React      from 'react'
import { render } from 'react-dom'
import i18n       from 'meteor/universe:i18n'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppContainer from '/imports/ui/layouts/AppContainer'
import addHotjar    from './addHotjar'
import addTawkChat  from './addTawkChat'
import addReCaptcha from './addReCaptcha'


console.log(getLang())
i18n.setLocale(getLang())

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('app'))
  addHotjar(window, document)
  addReCaptcha(window, document)
  addTawkChat(window, document)
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
