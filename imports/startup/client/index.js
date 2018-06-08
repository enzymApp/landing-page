import { Meteor } from 'meteor/meteor'
import i18n       from 'meteor/universe:i18n'
import React      from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppContainer from '/imports/ui/layouts/AppContainer'
import addHotjar    from './addHotjar'
import addTawkChat  from './addTawkChat'
import addReCaptcha from './addReCaptcha'


Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('app'))
  addHotjar(window, document)
  addReCaptcha(window, document)
  addTawkChat(window, document)
  console.log(getLang())
  i18n.setLocale(getLang())
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
