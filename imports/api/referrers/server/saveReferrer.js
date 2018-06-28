import web3, {getContract, gasPrice} from '/imports/blockchain/web3'
import {Referrers} from '../Referrers'


export default function(_id, {profile}) {
  if(!profile) return
  const {referrerToken} = profile || {}
  if(!referrerToken) {
    console.log("no referrerToken")
    return
  }
  //console.log(referrerToken)
  const referrer = Referrers.findOne(
    {referrals: {$elemMatch: {$eq: _id}}}
  )
  //console.log(referrer)
  if(!referrer) {
    const futureReferrer = Referrers.findOne(
      {token: referrerToken},
      {fields: {_id: 1, referrals: 1}
    })
    Referrers.update(
      futureReferrer._id,
      {$set: {referrals: [...futureReferrer.referrals, _id]}}
    )
    
    const contract = getContract('referring')
    const referrerTokenHex = web3.toHex(referrerToken)
    const amount = web3.toWei(1, 'ether')
    const res = contract.transferOrIncrease(referrerTokenHex, amount, {
      gas: 60000,
      gasPrice
    })
    console.log(referrerTokenHex)
    console.log(contract.referrers(referrerTokenHex))
    console.log(contract.referrerAmounts(referrerTokenHex).toString())
  }
}
