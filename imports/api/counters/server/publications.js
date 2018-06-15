import {Meteor}     from 'meteor/meteor'
import {Counters} from '../Counters'

Meteor.publish('users.count', function() {
  return Counters.getCollectionCount(Meteor.users)
})
