import {Meteor}   from 'meteor/meteor'
import {Email}    from 'meteor/email'

import '/imports/api/counters/server/publications'
import '/imports/api/referrers/server/publications'
import '/imports/api/referrers/server/updateRanks'
import {onUserCreate,
        onUserChange} from '/imports/api/users/server/userHooks'
import saveReferrer   from '/imports/api/referrers/server/saveReferrer'
import {Counters}     from '/imports/api/counters/Counters'
import {Referrers}    from '/imports/api/referrers/Referrers'
import '/imports/api/referrers/methods'
import welcomeEmailTemplate from './welcomeEmailTemplate'
//import './fixtures'
import './initRanks'
import './login-config'
import './passwordless-config'
import prototypeDdpConnection from './prototypeDdpConnection'

prototypeDdpConnection(Meteor.settings.prototypeDdp)

Counters.init(Meteor.users)

onUserChange('saveReferrer', saveReferrer)
onUserCreate('saveReferrer', saveReferrer)
onUserCreate('createRefferer', (_id, user) => {
  const referrer = Referrers.createReferrer({
    userId:  _id,
    profile: user.profile,
  })
  sendWelcomeEmail(referrer, user.email().address)
})
onUserCreate('updateCounter', () => Counters.upsertCollectionCount(Meteor.users))


function sendWelcomeEmail(referrer, email) {
  const url = referrer.getUrl()
  Email.send({
    to:      email,
    from:    Meteor.settings.emailFrom,
    subject: welcomeEmailTemplate.subject(),
    text:    welcomeEmailTemplate.text(url),
  })
}
