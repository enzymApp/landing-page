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
    type:         Array,
    defaultValue: [],
  },
  'referrals.$': {
    type: String,
  },
  referralCount:  {
    type:       SimpleSchema.Integer,
    optional:   true,
    autoValue() {
      this.unset()
      //if(!this.field('referrals').isSet) return
      return this.field('referrals').length
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
      return {$max: rank}
    }
  }
})

Referrers.attachSchema(Referrers.schema)

Referrers.defaultSort = {referralCount: 1}

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
  Referrers.insert({userId})
}

Referrers.helpers({
  getUrl() {
    //.replace(/^https?:\/\//, '').replace(/\/$/, '')
    const baseUrl = Meteor.absoluteUrl()
    console.log(baseUrl)
    return `${baseUrl}?referrer=${this.token}`
  }
})
