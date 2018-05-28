import {Meteor}   from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'

Meteor.startup(() => {
  // code to run on server at startup
  Accounts.passwordless.config = {
    ...Accounts.passwordless.config,
    codeType:  'url',
    emailFrom: 'no-reply@enzym.io'
  }
  Accounts.passwordless.emailTemplates = {
    ...Accounts.passwordless.emailTemplates,
  }
});
