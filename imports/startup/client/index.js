import React      from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
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
});
