import {Meteor} from 'meteor/meteor'

Meteor.users.helpers({
  email() {
    return this.registered_emails && this.registered_emails[0]
  }
})
