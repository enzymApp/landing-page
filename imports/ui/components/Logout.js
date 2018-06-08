import {Meteor}   from 'meteor/meteor'
import React      from 'react'
import {Redirect} from 'react-router'

export default () => {
  Meteor.logout()
  return <Redirect to="/" />
}
