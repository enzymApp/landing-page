import {Accounts}    from 'meteor/accounts-base'
import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React         from 'react'

const LOGIN_SOCIAL_NETWORKS = ['Facebook', 'Google', 'Twitter']

export default withTracker(({name}) => ({
  loading: !Accounts.loginServicesConfigured(),
  name,
}))
(({loading, name}) => {
  if(loading) return null
  return (
    <button onClick={oauthCall(name)}>
      {name}
    </button>
  )
})

const oauthCall = (name) => () => {
  const fun = Meteor[`loginWith${name}`]
  if(LOGIN_SOCIAL_NETWORKS.indexOf(name) < 0) return
  if(!fun) return
  fun(
    {requestPermissions: ['email']},
    (err) => {
      err && console.error(err)
    }
  )
}
