import {ValidatedMethod} from 'meteor/mdg:validated-method'
import SimpleSchema      from 'simpl-schema'

import {Referrers} from '../Referrers'

export default new ValidatedMethod({
  name: 'referrer.setEthAddress',
  validate: new SimpleSchema({
    ethAddress: {type: String, regEx: /0x[0-9a-z]{40}/i},
    referrerId: {type: String, regEx: SimpleSchema.RegEx.Id},
  }).validator(),
  run({ ethAddress, referrerId }) {
    const referrer = Referrers.findOne(referrerId)
    
    if(!referrer)                       throw new Meteor.Error('NOT_FOUND')
    if(this.userId !== referrer.userId) throw new Meteor.Error('NOT_AUTHORIZED')
    if(!!referrer.ethAddress)           throw new Meteor.Error('UPDATE_IS_DENIED')
    
    if(Meteor.isServer) {
      import web3, {getContract, gasPrice} from '/imports/blockchain/web3'
      if(!web3.isAddress(ethAddress))   throw new Meteor.Error('INVALID_ADDRESS')
      if(!web3.isConnected())           throw new Meteor.Error('NETWORK_ISSUE')

      const contract = getContract('referring')
      const referrerToken = web3.toHex(referrer.token)
      const res = contract.addReferrerAndTransfer(
        referrerToken, ethAddress,
        {gasPrice, gas: 120000}
      )
      console.log(referrerToken)
      console.log(contract.referrers(referrerToken))
      console.log(contract.referrerAmounts(referrerToken).toString())

      Referrers.update(
        referrerId,
        {$set: {ethAddress}}
      )
    }
  }
})

