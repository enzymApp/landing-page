import {Meteor}     from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'


const Schemas = {};

Schemas.UserProfile = new SimpleSchema({
  referrerToken: {
    type:     String,
    optional: true,
  },
  contest: {
    type: Boolean,
    optional: true,
  },
  city: {
    type: String,
    optional: true
  },
  region: {
    type: String,
    optional: true
  },
  country: {
    type: Date,
    optional: true
  },
  geoloc: {
    type: String,
    optional: true
  },
  lang : {
    type: String,
    optional: true
  },
});

Schemas.User = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    optional: true
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  registered_emails: {
    type: Array,
    optional: true
  },
  'registered_emails.$': {
    type: Object,
    blackbox: true
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Schemas.UserProfile,
    optional: true,
    defaultValue: {},
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
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
  // Add `roles` to your schema if you use the meteor-roles package.
  // Option 1: Object type
  // If you specify that type as Object, you must also specify the
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // Example:
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
  // You can't mix and match adding with and without a group since
  // you will fail validation in some cases.
  // roles: {
  //     type: Object,
  //     optional: true,
  //     blackbox: true
  // },
  // Option 2: [String] type
  // If you are sure you will never need to use role groups, then
  // you can specify [String] as the type
  // roles: {
  //     type: Array,
  //     optional: true
  // },
  // 'roles.$': {
  //     type: String
  // },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  }
});

Meteor.users.attachSchema(Schemas.User);



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
