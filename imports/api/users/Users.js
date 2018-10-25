import {Meteor}     from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

const UserProfile = new SimpleSchema({
  city:          { type: String,     optional: true },
  contest:       { type: Boolean,    optional: true },
  country:       { type: String,     optional: true },
  geoloc:        { type: String,     optional: true },
  lang:          { type: String,     optional: true },
  referrerToken: { type: String,     optional: true },
  region:        { type: String,     optional: true },
  technical:     { type: Boolean,    optional: true },
})

Meteor.users.schema = new SimpleSchema({
  username:          { type: String, optional: true },
  blockedUsers:      { type: Array,  defaultValue: [] },
  'blockedUsers.$':  { type: String, regEx: SimpleSchema.RegEx.Id },
  emails:            { type: Array,  defaultValue: [] },
  "emails.$": { type: Object },
  "emails.$.address": { type: String, regEx: SimpleSchema.RegEx.Email },
  "emails.$.verified": { type: Boolean },
  registered_emails: { type: Array, optional: true },
  'registered_emails.$': { type: Object, blackbox: true },
  createdAt:         { type: Date },
  profile:           { type: UserProfile, optional: true,  defaultValue: {} },
  services:          { type: Object,      optional: true,  blackbox: true },
  zyms:              { type: Number,      defaultValue: 0, min: 0 },
  roles:             { type: Array,       optional: true},
  'roles.$':         { type: String},
  authMean: {
    type: String,
    autoValue() {
      this.unset()
      if(!this.field('services').isSet) return
      const services = this.field('services').value
      if(!services)         return 'email'
      if(services.facebook) return 'facebook'
      if(services.google)   return 'google'
      if(services.twitter)  return 'twitter'
      return 'email'
    },
  },
  heartbeat: { type: Date, optional: true }
})

Meteor.users.attachSchema(Meteor.users.schema)


Meteor.users.getFromEmail = (address, options) => Meteor.users.find({
  $or: [
    {registered_emails: {$elemMatch: {address}}},
    {emails: {$elemMatch: {address}}},
    {'services.facebook.email': address},
    {'services.google.email': address},
    {'services.twitter.email': address},
  ]
}, options)

Meteor.users.helpers({
  email() {
    if(this.registered_emails)                return this.registered_emails[0]
    if(this.emails && this.emails.length > 0) return this.emails[0]
    if(!this.services) return
    if(this.services.facebook)                return {address: this.services.facebook.email}
    if(this.services.google)                  return {address: this.services.google.email}
    if(this.services.twitter)                 return {address: this.services.twitter.email}
  }
})
