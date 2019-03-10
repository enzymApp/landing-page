import {Meteor}  from 'meteor/meteor'
import {Tracker} from 'meteor/tracker'
import updateRanks from '/src/api/referrers/server/updateRanks'
import {Referrers} from '/src/api/referrers/Referrers'


Meteor.startup(() => {
  const result = Referrers.update(
    {referralCount: {$exists: false}},
    {$set: {referrals: []}},
    {multi: true},
  )
  console.log("updated", result)

  updateRanks(Referrers)

  Referrers.find(
    {},
    {
      sort:   Referrers.rankBaseSort,
      fields: {_id: 1, rank: 1, referralCount: 1, createdAt: 1},
      //disableOplog: true,
      //pollingIntervalMs: 10000,
    }
  )
  .observeChanges({
    changed(_id, {referralCount}) {
      if(typeof referralCount === 'undefined') return
      const referrer = Referrers.findOne(_id, {fields: {referralCount: 1}})
      if(referralCount > referrer.referralCount) {
        updateRanks(Referrers, referralCount)
      } else {
        updateRanks(Referrers, referrer.referralCount)
      }
    }
  })
})
