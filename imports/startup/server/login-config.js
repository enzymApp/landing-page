import {Meteor}               from 'meteor/meteor'
import {ServiceConfiguration} from 'meteor/service-configuration'

const {google, facebook, twitter} = Meteor.settings.oauth
const loginStyle = 'popup'

Accounts.onCreateUser((options, user) => {
  console.log(user, options)
  const services = user.services || {}
  const google = services.google
  return {
    ...user,
    emails: [
      ...new Set(
        [
          ...(user.emails || []),
          services &&
            services.google &&
              services.google.email &&
                {
                  email:    services.google.email,
                  verified: services.google.verified_email
                }
        ].filter(e => !!e)
      )
    ],
    profile: options.profile || {}
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
/*
ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  {
    $set: {
      loginStyle,
      appId:   facebook.clientId,
      secret:  facebook.secret
    }
  }
)

ServiceConfiguration.configurations.upsert(
  { service: 'twitter' },
  {
    $set: {
      loginStyle,
      consumerKey: twitter.clientId,
      secret:      twitter.secret
    }
  }
)
*/
