import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React         from 'react'
import {Counters} from '/imports/api/counters/Counters'
import T          from './Translator'

const UsersCount = ({count}) => {
  if(!count) return null
  return (
    <span><T count={count}>Common.usersCount</T></span>
  )
}

export default withTracker(() => {
  Meteor.subscribe('users.count')
  return {
    count: (Counters.getCollectionCount(Meteor.users).fetch()[0] || {}).value
  }
})(UsersCount)
