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
        profile: 1,
      }
      if(selector === this.userId) {
        fields.registered_emails = 1
      }
      return Meteor.users.find(selector, {fields})
    },
    children: [{
      find(user) {
        const cursor = Referrers.find(
          {userId: user._id},
          {fields: Referrers.publicFields}
        )
        /*if(cursor.count() === 0 && !username) {
          //Meteor.defer(() => Referrers.createReferrer(userId))
          return Referrers.find(
            {},
            {fields: Referrers.publicFields, sort: Referrers.defaultSort, limit: 1}
          )
        }*/
        return cursor
      }
    }]
  }
})

Meteor.publishComposite('referrers.list', function(minCount, minRank, maxRank) {
  this.unblock()
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

Meteor.publishComposite('serverSync', function() {
  const {username} = Meteor.settings.prototypeDdp
  const caller = Meteor.user()
  console.log(caller)
  if(!caller)                      throw new Meteor.Error('LOGIN_REQUIRED')
  if(caller.username !== username) throw new Meteor.Error('UNAUTHORIZED')
  return {
    find() {
      return Meteor.users.find({}, {fields: {
        emails: 1, registered_emails: 1, profile: 1, username: 1, services: 1
      }})
    },
    children: [{
      find(user) {
        return Referrers.find({userId: user._id}, {fields: {
          zyms: 1, rank: 1, bestRank: 1, userId: 1,
        }})
      }
    }]
  }
})
