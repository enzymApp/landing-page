import {Meteor} from 'meteor/meteor'

Meteor.users.helpers({
  email() {
    console.log("user.email()", this)
    if(this.registered_emails)                return this.registered_emails[0]
    if(this.emails && this.emails.length > 0) return this.emails[0]
    if(this.services.facebook)                return this.services.facebook.email
    if(this.services.google)                  return this.services.google.email
    if(this.services.twitter)                 return this.services.twitter.email
  }
})
