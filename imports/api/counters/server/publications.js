import {Meteor}     from 'meteor/meteor'
import {Referrers} from '/imports/api/referrers/Referrers'
import {Counters}  from '../Counters'

Meteor.publish('referrers.count', function() {
  return Counters.getCollectionCount(Referrers)
})
