import {Meteor}   from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import '/imports/api/referrer/server/publications'
import '/imports/api/referrer/server/updateRanks'

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
