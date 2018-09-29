import {Meteor} from 'meteor/meteor'

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
        const fields = (user && user._id === this.userId ?
          Referrers.allFields :
          Referrers.publicFields
        )
        const cursor = Referrers.find(
          {userId: user._id},
          {fields}
        )
        /*if(cursor.count() === 0 && !username) {
          return Referrers.find(
            {},
            {fields, sort: Referrers.defaultSort, limit: 1}
          )
        }*/
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
          zyms: 1, rank: 1, bestRank: 1, userId: 1, ethAccount: 1,
        }})
      }
    }]
  }
})
