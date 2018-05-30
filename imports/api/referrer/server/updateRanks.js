import {Meteor}  from 'meteor/meteor'
import {Tracker} from 'meteor/tracker'

import {Referrers} from '../Referrers'


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
    sort: Referrers.defaultSort,
    fields: {_id: 1, rank: 1, referralCount: 1},
    //disableOplog: true,
    //pollingIntervalMs: 10000,
  }
)
.observe({
  added({_id, rank}) {
    if(rank) return
    //console.log("added", _id)
    Referrers.update(
      {_id},
      {$set: {
        rank: (Referrers.findOne({referralCount: 0}) || {rank: 1}).rank
      }}
    )
  },
  movedTo({_id, rank, referralCount}, fromIndex, toIndex) {
    console.log("movedTo", _id, rank, referralCount, "-", fromIndex, toIndex)
    //if(!referralCount) return
    const theOneBefore = Referrers.findOne({
      referralCount: {$gte: referralCount},
      _id:           {$ne:  _id},
    }, {
      sort: {rank: -1},
    })
    console.log(theOneBefore)
    const futureRank = (
      !theOneBefore ?
      1 :
      (
        theOneBefore.referralCount > referralCount ?
        theOneBefore.rank + 1 :
        theOneBefore.rank
      )
    )
    console.log(futureRank, rank)
    //Referrers.update(_id, {$set: {rank: futureRank}})
    if(futureRank != rank) {
      // if(!Referrers.findOne({rank})) {
      //   Referrers.update({rank: {$gt: rank}}, {$inc: {rank: -1}})
      // }
    } else {
      // Referrers.update({referralCount: {$lt: referralCount}}, {$inc: {rank: 1}})
    }
    updateRanks(Referrers, referralCount, futureRank)
  }
})

function updateRanks(Referrers, referralCount, rank) {
  if(referralCount === undefined) {
    referralCount = (Referrers.findOne({}, {sort: {referralCount: -1}}) || {}).referralCount || 0
  }
  if(!rank) {
    rank = (Referrers.findOne({referralCount}, {sort: {rank: 1}}) || {}).rank || 1
  }
  console.log("updateRanks", referralCount, rank)
  let r = rank
  let c = referralCount
  Referrers.find(
    {referralCount: {$lte: referralCount}},
    {sort: Referrers.defaultSort, fields: {_id: 1, referralCount: 1}}
  ).forEach(ref => {
    if(ref.referralCount < c) {
      r++
      c = ref.referralCount
    }
    console.log(ref._id, c, r)
    if(ref.rank != r) {
      Referrers.update(ref._id, {$set: {rank: r}})
    }
  })
}
