import {Meteor}  from 'meteor/meteor'

import {Referrers} from '../Referrers'

export default function updateRanks(Referrers, fromReferralCount) {
  console.log("updateRanks", fromReferralCount)
  if(fromReferralCount === undefined) {
    fromReferralCount = getMaxReferralCount(Referrers)
  }
  console.log("fromReferralCount", fromReferralCount)
  let rank = 1 + getPreviousRank(Referrers, fromReferralCount)
  console.log("rank", rank)
  let c = fromReferralCount
  Referrers.find(
    {referralCount: {$lte: fromReferralCount}},
    {sort: Referrers.rankBaseSort, fields: {_id: 1, rank: 1, referralCount: 1, createdAt: 1}}
  ).forEach(ref => {
    if(ref.rank != rank) {
      console.log(ref.rank, rank)
      Referrers.update(ref._id, {$set: {rank}})
    }
    rank++
  })
}

function getMaxReferralCount(Referrers) {
  return (Referrers.findOne({}, {sort: {referralCount: -1}}) || {}).referralCount || 0
}
function getPreviousRank(Referrers, referralCount) {
  return (
    Referrers.findOne({
      referralCount: {$gt: referralCount},
    }, {
      sort: {rank: -1}
    }) || {}
  ).rank || 0
}
