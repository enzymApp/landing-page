import {Meteor}   from 'meteor/meteor'

import '/imports/api/referrer/server/publications'
import '/imports/api/referrer/server/saveReferrer'
import '/imports/api/referrer/server/updateRanks'

import './passwordless-config'
import './login-config'

Meteor.startup(() => {
  // code to run on server at startup

})
