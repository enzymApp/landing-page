import {Meteor}   from 'meteor/meteor'
import {Email}    from 'meteor/email'

import '/src/api/counters/server/publications'
import '/src/api/referrers/server/publications'
import '/src/api/referrers/server/updateRanks'
import {onUserCreate,
        onUserChange}         from '/src/modules/user/server/userHooks'
import saveReferrer           from '/src/api/referrers/server/saveReferrer'
import {Counters}             from '/src/api/counters/Counters'
import {Referrers}            from '/src/api/referrers/Referrers'
import welcomeEmailTemplate   from '/src/modules/user/welcomeEmailTemplate'
import prototypeDdpConnection from './prototypeDdpConnection'
import '../both'
//import './fixtures'
import './initRanks'
import './login-config'
import './passwordless-config'

prototypeDdpConnection(Meteor.settings.prototypeDdp)
Counters.init(Referrers)

onUserChange('saveReferrer', saveReferrer)
onUserCreate('saveReferrer', saveReferrer)
onUserCreate('createRefferer', (_id, user) => {
  const referrer = Referrers.createReferrer({
    userId:  _id,
    profile: user.profile,
  })
  if(user.email() && user.email().address) {
    sendWelcomeEmail(referrer, user.email().address, user.profile)
  }
})

function sendWelcomeEmail(referrer, email, profile) {
  const url = referrer.getUrl()
  Email.send({
    to:      email,
    from:    Meteor.settings.emailFrom,
    subject: welcomeEmailTemplate.subject(profile),
    text:    welcomeEmailTemplate.text(url, profile),
  })
}
