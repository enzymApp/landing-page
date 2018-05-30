import {Meteor}  from 'meteor/meteor'

import {Referrers} from '../Referrers'

Meteor.setTimeout(() => {
  Meteor.users.find(
    {},
    {
      //disableOplog: true,
      //pollingIntervalMs: 10000,
    }
  )
  .observeChanges({
    added(_id, {username, profile}) {
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
    },
  })
}, 3000)
