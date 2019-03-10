import {Meteor}               from 'meteor/meteor'
import {ServiceConfiguration} from 'meteor/service-configuration'
//import 'meteor/splendido:accounts-meld'
import saveLocation from '/src/modules/user/saveLocation'


const {google, facebook, twitter} = Meteor.settings.oauth
const loginStyle = 'popup'

Accounts.onCreateUser((options, user) => {
  console.log(user)
  console.log(options)
  const services = user.services || {}
  const {facebook, google, twitter} = services
  const socialNetwork = facebook || google || twitter
  options.profile = options.profile || {}
  return {
    ...user,
    profile: socialNetwork ? {} : options.profile
  }
})


Accounts.onLogin(({type, allowed, user, connection}) => {
  console.log("onLogin", type, allowed, user, connection)
  saveLocation(user, connection)
})

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle,
      clientId:   google.clientId,
      secret:     google.secret
    }
  }
)

ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  {
    $set: {
      loginStyle,
      appId:   facebook.appId,
      secret:  facebook.secret
    }
  }
)

ServiceConfiguration.configurations.upsert(
  { service: 'twitter' },
  {
    $set: {
      loginStyle,
      consumerKey: twitter.consumerKey,
      secret:      twitter.secret
    }
  }
)
