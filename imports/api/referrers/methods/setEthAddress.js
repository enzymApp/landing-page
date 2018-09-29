import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {Meteor}          from 'meteor/meteor'
import SimpleSchema      from 'simpl-schema'

import {Referrers} from '../Referrers'

export default new ValidatedMethod({
  name: 'referrer.setEthAddress',
  validate: new SimpleSchema({
    ethAddress:    {type: String, regEx: /0x[0-9a-z]{40}/i},
    referrerId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    userId:     {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  }).validator(),
  async run({ ethAddress, referrerId, userId }) {
    const query = referrerId ? referrerId : {userId}
    const referrer = Referrers.findOne(query)
    const {username} = Meteor.settings.prototypeDdp
    const caller = Meteor.user()
    console.log("setEthAddress", ethAddress, referrer)
    if(!caller)                      throw new Meteor.Error('LOGIN_REQUIRED')
    if(caller.username !== username) throw new Meteor.Error('UNAUTHORIZED')
    if(!referrer)                    throw new Meteor.Error('NOT_FOUND')
    // if(Meteor.isServer) {
    //   import web3, {getContract, transactionQueue} from '/imports/blockchain/web3'
    //
    //   if(!web3.utils.isAddress(ethAddress))   throw new Meteor.Error('INVALID_ADDRESS')
    //   if(!web3.eth.net.isListening())      throw new Meteor.Error('NETWORK_ISSUE')
    //
    //   const contract = getContract('referring')
    //   const referrerTokenHex = web3.utils.toHex(referrer.token)
    //   await transactionQueue.add(() => {
    //     console.log("addReferrerAndTransfer", referrerTokenHex, ethAddress)
    //     return contract.methods.addReferrerAndTransfer(referrerTokenHex, ethAddress)
    //       .send({gas: 120000}, (err, res) => {
    //         err && console.log("error", err)
    //         console.log(res)
    //       })
    //   })
    // }
    Referrers.update(
      referrer._id,
      {$set: {ethAddress}}
    )
  }
})
