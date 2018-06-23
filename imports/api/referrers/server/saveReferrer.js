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
  }
}
