import {ValidatedMethod} from 'meteor/mdg:validated-method'
import SimpleSchema      from 'simpl-schema'

import {Referrers} from '../Referrers'

export default new ValidatedMethod({
  name: 'referrer.setEthAddress',
  validate: new SimpleSchema({
    account: {type: String, regEx: /0x[0-9a-z]{40}/i},
    referrerId: {type: String, regEx: SimpleSchema.RegEx.Id},
  }).validator(),
  async run({ account, referrerId }) {
    const referrer = Referrers.findOne(referrerId)

    if(!referrer)                       throw new Meteor.Error('NOT_FOUND')
    if(this.userId !== referrer.userId) throw new Meteor.Error('NOT_AUTHORIZED')
    if(!!referrer.account)              throw new Meteor.Error('UPDATE_IS_DENIED')

    if(Meteor.isServer) {
      import web3, {getContract} from '/imports/blockchain/web3'
      if(!web3.utils.isAddress(account))   throw new Meteor.Error('INVALID_ADDRESS')
      if(!web3.eth.net.isListening())      throw new Meteor.Error('NETWORK_ISSUE')

      const contract = getContract('referring')
      const referrerTokenHex = web3.utils.toHex(referrer.token)
      const res = await contract.methods.addReferrerAndTransfer(referrerTokenHex, account)
        .send({gas: 120000}, (err, res) => {
          err && console.log("error", err)
          console.log(res)
        })

      Referrers.update(
        referrerId,
        {$set: {account}}
      )
    }
  }
})
