import {Meteor}  from 'meteor/meteor'

import {Referrers} from '../Referrers'

  export default function updateRanks(Referrers, referralCount, rank) {
    console.log("updateRanks", referralCount, rank)
    if(referralCount === undefined) {
      referralCount = (Referrers.findOne({}, {sort: {referralCount: -1}}) || {}).referralCount || 0
      rank = 1
    }
    console.log("referralCount", referralCount)
    if(!rank) {
      rank = (Referrers.findOne({referralCount}, {sort: {rank: 1}}) || {}).rank || 1
    }
    console.log("rank", rank)
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
      if(ref.rank != r) {
        Referrers.update(ref._id, {$set: {rank: r}})
      }
    })
  }
