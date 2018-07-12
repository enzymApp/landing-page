import {Email}      from 'meteor/email'
import {Mongo}      from 'meteor/mongo'
import {Random}     from 'meteor/random'
import {Tracker}    from 'meteor/tracker'
import SimpleSchema from 'simpl-schema'

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
  account: {type: String, optional: true, regEx: /0x[0-9a-z]{40}/i},
  zyms:  {
    type:         SimpleSchema.Integer,
    optional:     true,
    autoValue() {
      if(this.isSet) return
      if(!this.field('referrals').isSet) return
      return 1 + this.field('referrals').value.length
    }
  },
  rank: {
    type:     SimpleSchema.Integer,
    optional: true,
  },
  city:    {type: String, optional: true},
  country: {type: String, optional: true},
  geoloc:  {type: String, optional: true},
  region:  {type: String, optional: true},

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
  createdAt: {
    type: Date,
    autoValue: function() {
      if(this.isInsert) return new Date()
      if(this.isUpsert) return {$setOnInsert: new Date()}
      this.unset()
    }
  },
})

Referrers.attachSchema(Referrers.schema)

Referrers.rankBaseSort = {zyms: -1, createdAt: 1}

Referrers.publicFields = {
  token:         1,
  rank:          1,
  userId:        1,
  zyms:          1,
}

Referrers.allFields = {
  ...Referrers.publicFields,
  account: 1,
}

Referrers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})

Referrers.createReferrer = ({userId, profile: {city, region, country, geoloc}}) => {
  const rank = 1 + ((Referrers.findOne({}, {sort: {rank: -1}}) || {}).rank || 0)
  const _id = Referrers.insert({
    userId, rank, referrals: [], city, region, country, geoloc
  })
  return Referrers.findOne(_id)
}

Referrers.helpers({
  getUrl() {
    const baseUrl = Meteor.absoluteUrl().replace(/\/$/, '')
    return `${baseUrl}/referrer/${this.token}`
  },
})
