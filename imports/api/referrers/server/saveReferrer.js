import web3, {getContract, gasPrice} from '/imports/blockchain/web3'
import {Referrers} from '../Referrers'


export default async function(_id, {profile}) {
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

    const referrerTokenHex = web3.utils.toHex(referrerToken)
    const amount = web3.utils.toWei('1', 'ether')
    console.log(referrerTokenHex, amount)
    const contract = getContract('referring')
    contract.methods.transferOrIncrease(referrerTokenHex, amount)
      .send({gas: 100000}, (err, res) => {
        err && console.log("error", err)
        console.log(res)
      })

    console.log(referrerTokenHex)
    contract.methods.referrers(referrerTokenHex).call((err, res) => {
      err && console.log("error", err)
      console.log(res)
    })
    contract.methods.referrerAmounts(referrerTokenHex).call((err, res) => {
      err && console.log("error", err)
      console.log(res)
    })
  }
}
