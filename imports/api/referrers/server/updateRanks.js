import {Meteor}  from 'meteor/meteor'

import {Referrers} from '../Referrers'

export default function updateRanks(Referrers, fromZyms) {
  console.log("updateRanks", fromZyms)
  if(fromZyms === undefined) {
    fromZyms = getMaxZyms(Referrers)
  }
  console.log("fromZyms", fromZyms)
  let rank = 1 + getPreviousRank(Referrers, fromZyms)
  console.log("rank", rank)
  Referrers.find(
    {zyms: {$lte: fromZyms}},
    {sort: Referrers.rankBaseSort, fields: {_id: 1, rank: 1, zyms: 1, createdAt: 1}}
  ).forEach(ref => {
    if(ref.rank != rank) {
      console.log(ref.rank, rank)
      Referrers.update(ref._id, {$set: {rank}})
    }
    rank++
  })
}

function getMaxZyms(Referrers) {
  return (Referrers.findOne({}, {sort: {zyms: -1}}) || {}).zyms || 1
}
function getPreviousRank(Referrers, zyms) {
  return (
    Referrers.findOne({
      zyms: {$gt: zyms},
    }, {
      sort: {rank: -1}
    }) || {}
  ).rank || 0
}
