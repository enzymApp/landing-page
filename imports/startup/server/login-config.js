import {Meteor}               from 'meteor/meteor'
import {ServiceConfiguration} from 'meteor/service-configuration'
//import 'meteor/splendido:accounts-meld'
import {Referrers} from '/imports/api/referrers/Referrers'

const {google, facebook, twitter} = Meteor.settings.oauth
const loginStyle = 'popup'

Accounts.onCreateUser((options, user) => {
  console.log(user, options)
  const services = user.services || {}
  const {facebook, google, twitter} = services
  const socialNetwork = facebook || google || twitter
  const email = (
    socialNetwork ?
    {
      address:  socialNetwork.email,
      verified: socialNetwork.verified_email === undefined || socialNetwork.verified_email
    } :
    user.emails[0]
  )
  const referrer = Referrers.createReferrer({
    userId:  user._id,
    profile: options.profile
  })
  referrer.sendWelcomeEmail(user._id, email.address)
  return {
    ...user,
    //emails: [email],
    profile: socialNetwork ? {} : options.profile
  }
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
