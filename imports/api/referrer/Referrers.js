import SimpleSchema from 'simpl-schema'
import {Mongo}   from 'meteor/mongo'
import {Tracker} from 'meteor/tracker'
import {Random}  from 'meteor/random'

import addPaginatedListCentered from './paginatedListCentered'

//SimpleSchema.extendOptions(['allowInsert', 'denyInsert'])

export const Referrers = new Mongo.Collection('referrers')
addPaginatedListCentered(Referrers)

Referrers.schema = new SimpleSchema({
  userId:    {type: String, regEx: SimpleSchema.RegEx.Id},
  token:     {
    type: String,
    autoValue() {
      this.unset()
      if(!this.isInsert) return
      return Random.hexString(20)
    },
  },
  referrals: {
    type: Array,
  },
  'referrals.$': {
    type: String,
  },
  referralCount:  {
    type:         SimpleSchema.Integer,
    optional:     true,
    autoValue() {
      this.unset()
      //FIXME: can't decrease count to 0, will stop to 1
      if(!this.field('referrals').isSet) return
      console.log("referrals", this.field('referrals').value)
      return this.field('referrals').value.length
    }
  },
  rank: {
    type:     SimpleSchema.Integer,
    optional: true,
  },
  bestRank: {
    type:       SimpleSchema.Integer,
    optional:   true,
    autoValue() {
      this.unset()
      const rank = this.field('rank').value
      if(!rank) return
      if(!this.isUpdate) return rank
      return {$min: rank}
    }
  },
  city:    {type: String, optional: true},
  region:  {type: String, optional: true},
  country: {type: String, optional: true},
  geoloc:  {type: String, optional: true},
})

Referrers.attachSchema(Referrers.schema)

Referrers.defaultSort = {referralCount: -1, rank: 1, bestRank: 1}

Referrers.publicFields = {
  token:         1,
  rank:          1,
  bestRank:      1,
  referralCount: 1,
  userId:        1,
}

Referrers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})


Referrers.createReferrer = (userId) => {
  const user = Meteor.users.findOne(userId)
  const {profile: {city, region, country, geoloc}} = user

  Referrers.insert({
    userId, referrals: [], city, region, country, geoloc
  })
}

Referrers.helpers({
  getUrl() {
    const baseUrl = Meteor.absoluteUrl().replace(/\/$/, '')
    return `${baseUrl}/referrer/${this.token}`
  }
})
