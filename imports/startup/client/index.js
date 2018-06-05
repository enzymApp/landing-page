import React      from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppContainer from '/imports/ui/layouts/AppContainer'
import addTawkChat from './addTawkChat'


Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('app'))
  addTawkChat()
});
