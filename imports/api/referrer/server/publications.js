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
  if(cursor.count() === 0) {
    Meteor.defer(() => Referrers.createReferrer(userId))
  }
  //console.log(cursor.fetch()[0])
  return cursor
})

Meteor.publishComposite('referrers.list', function(minCount, minRank, maxRank) {
  return {
    find() {
      return Referrers.paginatedListCentered(minCount, minRank, maxRank)
    },
    children: [{
      find(referrer) {
        return Meteor.users.find(
          {_id: referrer.userId},
          {fields: {username: 1}}
        )
      }
    }]
  }
})
