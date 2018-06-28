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
  ethAddress: {type: String, optional: true, regEx: /0x[0-9a-z]{40}/i},
  referralCount:  {
    type:         SimpleSchema.Integer,
    optional:     true,
    autoValue() {
      this.unset()
      //FIXME: can't decrease count to 0, will stop to 1
      if(!this.field('referrals').isSet) return
      return this.field('referrals').value.length
    }
  },
  tokens: {
    type:         SimpleSchema.Integer,
    optional:     true,
    autoValue() {
      if(this.isSet) return
      if(!this.field('referralCount').isSet) return
      return this.field('referralCount').value + 1
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
  referralCount: 1,
  userId:        1,
  tokens:        1,
}

Referrers.allFields = {
  ...Referrers.publicFields,
  ethAddress: 1,
}

Referrers.deny({
  insert: () => true,
  //update: () => true,
  remove: () => true,
})

Referrers.createReferrer = ({userId, profile: {city, region, country, geoloc}}) => {
  const _id = Referrers.insert({
    userId, referrals: [], city, region, country, geoloc
  })
  return Referrers.findOne(_id)
}

Referrers.helpers({
  getUrl() {
    const baseUrl = Meteor.absoluteUrl().replace(/\/$/, '')
    return `${baseUrl}/referrer/${this.token}`
  },
})
