import {Meteor}   from 'meteor/meteor'
import {Email}    from 'meteor/email'

import '/imports/api/counters/server/publications'
import '/imports/api/referrers/methods'
import '/imports/api/referrers/server/publications'
import '/imports/api/referrers/server/updateRanks'
import {onUserCreate,
        onUserChange}         from '/imports/api/users/server/userHooks'
import saveReferrer           from '/imports/api/referrers/server/saveReferrer'
import {Referrers}            from '/imports/api/referrers/Referrers'
import welcomeEmailTemplate   from '/imports/api/users/welcomeEmailTemplate'
import prototypeDdpConnection from './prototypeDdpConnection'
import {Counters}           from '/imports/api/counters/Counters'
import initRanks            from '/imports/api/referrers/server/initRanks'
import web3, {connectWeb3}  from '/imports/blockchain/web3'

import './login-config'
import './passwordless-config'

Counters.init(Referrers)

Meteor.startup(async () => {

  connectWeb3({
    gasPrice:       web3.utils.toWei(String(Meteor.settings.web3.gasPrice), 'gwei'),
    privateKey:     Meteor.settings.web3.privateKey,
    rpcUrl:         Meteor.settings.web3.provider,
    smartContracts: Meteor.settings.smartContracts,
  })
  initRanks()
  prototypeDdpConnection(Meteor.settings.prototypeDdp)

  onUserChange('saveReferrerIfWasReferred', saveReferrer)
  onUserCreate('saveReferrerIfWasReferred', saveReferrer)
  onUserCreate('createRefferer', (_id, user) => {
    if(user.profile && user.profile.technical) return

    const referrer = Referrers.createReferrer({
      userId:  _id,
      profile: user.profile,
    })
    if(user.email() && user.email().address) {
      sendWelcomeEmail(referrer, user.email().address, user.profile)
    }
  })
  onUserCreate('updateCounter', () => Counters.upsertCollectionCount(Referrers))
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
