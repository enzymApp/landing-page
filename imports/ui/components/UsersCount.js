import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React         from 'react'
import {Counters}  from '/imports/api/counters/Counters'
import {Referrers} from '/imports/api/referrers/Referrers'
import T          from './Translator'

const UsersCount = ({count}) => {
  if(!count) return null
  return (
    <span className="user-count"><T count={count}>Common.usersCount</T></span>
  )
}

export default withTracker(() => {
  Meteor.subscribe('referrers.count')
  return {
    count: (Counters.getCollectionCount(Referrers).fetch()[0] || {}).value
  }
})(UsersCount)
