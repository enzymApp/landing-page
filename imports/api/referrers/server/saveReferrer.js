import {Referrers} from '../Referrers'

export default function(_id, {username, profile}) {
  //console.log("added", _id, username)
  const {referrerToken} = profile || {}
  //console.log(referrerToken)
  if(!referrerToken) return
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
  }
}
