import {Meteor}   from 'meteor/meteor'
import {Email}    from 'meteor/email'

import '/imports/api/counters/server/publications'
import '/imports/api/referrers/methods'
import '/imports/api/referrers/server/publications'

import {Counters}         from '/imports/api/counters/Counters'
import {Referrers}        from '/imports/api/referrers/Referrers'
import initRanks          from '/imports/api/referrers/server/initRanks'
import saveReferrer       from '/imports/api/referrers/server/saveReferrer'
import {onUserCreate,
        onUserChange}     from '/imports/api/users/server/userHooks'
import web3, {connectWeb3}   from '/imports/blockchain/web3'

import welcomeEmailTemplate from './welcomeEmailTemplate'
import prototypeDdpConnection from './prototypeDdpConnection'

import './login-config'
import './passwordless-config'

Meteor.startup(async () => {
  prototypeDdpConnection(Meteor.settings.prototypeDdp)

  Counters.init(Referrers)

  connectWeb3({
    _gasPrice:       web3.utils.toWei(String(Meteor.settings.web3.gasPrice), 'gwei'),
    _privateKey:     Meteor.settings.web3.privateKey,
    _rpcUrl:         Meteor.settings.web3.provider,
    _smartContracts: Meteor.settings.smartContracts,
  })
  initRanks()

  onUserChange('saveReferrerIfWasReferred', saveReferrer)
  onUserCreate('saveReferrerIfWasReferred', saveReferrer)
  onUserCreate('createRefferer', (_id, user) => {
    if(user.profile && user.profile.technical) return

    const referrer = Referrers.createReferrer({
      userId:  _id,
      profile: user.profile,
    })
    sendWelcomeEmail(referrer, user.email().address)
  })
  onUserCreate('updateCounter', () => Counters.upsertCollectionCount(Referrers))
})



function sendWelcomeEmail(referrer, email) {
  const url = referrer.getUrl()
  Email.send({
    to:      email,
    from:    Meteor.settings.emailFrom,
    subject: welcomeEmailTemplate.subject(),
    text:    welcomeEmailTemplate.text(url),
  })
}
