import {Accounts}    from 'meteor/accounts-base'
import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React         from 'react'

const LOGIN_SOCIAL_NETWORKS = ['Facebook', 'Google', 'Twitter']

export default withTracker(({name, referrerToken}) => ({
  loading: !Accounts.loginServicesConfigured(),
  name,
  referrerToken,
}))
(({loading, name, referrerToken}) => {
  if(loading) return null
  const classForLoginBtn = `loginBtn loginBtn--${name}`;
  return (
    <button className={classForLoginBtn} onClick={oauthCall(name, referrerToken)}>
      Login with {name}
    </button>
  )
})

const oauthCall = (name, referrerToken) => () => {
  const fun = Meteor[`loginWith${name}`]
  if(LOGIN_SOCIAL_NETWORKS.indexOf(name) < 0) return
  if(!fun) return
  fun(
    {requestPermissions: ['email']},
    (err) => {
      err && console.error(err)
      if(referrerToken) {
        Meteor.users.update(
          Meteor.userId(),
          {$set: {'profile.referrerToken': referrerToken}}
        )
      }
    }
  )
}
