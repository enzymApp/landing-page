import {Meteor} from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

import {Referrers} from '../Referrers'

Meteor.publish('referrers.one', function() {
  const userId = this.userId
  if(!userId) return this.ready()
  const cursor = Referrers.find(
    {userId},
    {fields: Referrers.publicFields}
  )
  console.log("does referrer exists")
  if(cursor.count() === 0) {
    console.log("no. create referrer")
    Meteor.defer(() => Referrers.createReferrer(userId))
  }
  //console.log(cursor.fetch()[0])
  return cursor
})

Meteor.publish('referrers.list', function(minCount, minRank, maxRank) {
  return Referrers.paginatedListCentered(minCount, minRank, maxRank)
})
