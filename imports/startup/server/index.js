import {Meteor}   from 'meteor/meteor'
import {Email}    from 'meteor/email'

import '/imports/api/counters/server/publications'
import '/imports/api/referrers/server/publications'
import '/imports/api/referrers/server/updateRanks'
import {onUserCreate,
        onUserChange}         from '/imports/api/users/server/userHooks'
import saveReferrer           from '/imports/api/referrers/server/saveReferrer'
import {Counters}             from '/imports/api/counters/Counters'
import {Referrers}            from '/imports/api/referrers/Referrers'
import welcomeEmailTemplate   from '/imports/api/users/welcomeEmailTemplate'
import prototypeDdpConnection from './prototypeDdpConnection'
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
