import {Meteor}  from 'meteor/meteor'
import {Tracker} from 'meteor/tracker'

import {Referrers} from '../Referrers'


Referrers.find(
  {},
  {
    sort: Referrers.defaultSort,
    fields: {_id: 1, rank: 1, referralCount: 1},
    //disableOplog: true,
    //pollingIntervalMs: 10000,
  }
)
.observe({
  added({_id, rank}) {
    if(rank) return
    console.log("added", _id)
    Referrers.update(
      {_id},
      {$set: {
        rank: (Referrers.findOne({referralCount: 0}) || {rank: 1}).rank
      }}
    )
  },
  movedTo({_id, rank, referralCount}, fromIndex, toIndex, before) {
    console.log("movedTo", _id, rank, referralCount, "-", fromIndex, toIndex, before)
    const theOneBefore = Referrers.findOne(before)
    const futureRank = (
      theOneBefore.referralCount > referralCount ?
      theOneBefore.rank + 1 :
      theOneBefore.rank
    )
    const hasOneWithOldRank = !!Referrers.findOne({rank})
    Referrers.update({_id}, {$set: {rank: futureRank}})
    if(!hasOneWithOldRank) {
      Referrers.update({rank: {$gt: rank}}, {$inc: {rank: -1}})
    }
  }
})
