import {Meteor}   from 'meteor/meteor'
import {Email}    from 'meteor/email'

import '/imports/api/counters/server/publications'
import '/imports/api/referrers/server/publications'
import '/imports/api/referrers/server/updateRanks'
import {onUserCreate} from '/imports/api/users/server/newUserHook'
import saveReferrer   from '/imports/api/referrers/server/saveReferrer'
import {Counters}     from '/imports/api/counters/Counters'
import {Referrers}    from '/imports/api/referrers/Referrers'
import welcomeEmailTemplate from './welcomeEmailTemplate'
//import './fixtures'
import './initRanks'
import './login-config'
import './passwordless-config'

onUserCreate('saveRefferer', saveReferrer)
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
