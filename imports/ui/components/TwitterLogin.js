import {Accounts}    from 'meteor/accounts-base'
import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React         from 'react'

export default withTracker(() => (
  {loading: !Accounts.loginServicesConfigured()}
))
(({loading}) => {
  if(loading) return null
  return (
    <button onClick={oauthCall}>
      Twitter
    </button>
  )
})

function oauthCall() {
  Meteor.loginWithTwitter(
    {requestPermissions: ['email']},
    (err) => {
      err && console.error(err)
    }
  )
}