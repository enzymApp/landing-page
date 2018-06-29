import {Meteor} from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

import {Referrers} from '../Referrers'

Meteor.publishComposite('referrers.one', function(username) {
  const userId = this.userId
  if(!userId && !username) return this.ready()
  const selector = username ? {username} : userId
  return {
    find() {
      const fields = {
        _id: 1,
        username: 1,
        authMean: 1
      }
      if(selector === this.userId) {
        fields.registered_emails = 1
        fields.profile = 1
      }
      return Meteor.users.find(selector, {fields})
    },
    children: [{
      find(user) {
        const fields = Referrers.publicFields
        if(user._id === this.userId) {
          fields.referrerId = 1
          fields.ethAddress = 1
        }
        const cursor = Referrers.find(
          {userId: user._id},
          {fields}
        )
        if(cursor.count() === 0 && !username) {
          //Meteor.defer(() => Referrers.createReferrer(userId))
          return Referrers.find(
            {},
            {fields: Referrers.publicFields, sort: Referrers.defaultSort, limit: 1}
          )
        }
        return cursor
      }
    }]
  }
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
