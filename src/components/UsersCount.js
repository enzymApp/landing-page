import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React         from 'react'
import { FormattedMessage as T } from 'react-intl'
import {Counters}  from '/src/api/counters/Counters'
import {Referrers} from '/src/api/referrers/Referrers'

const UsersCount = ({ count }) => {
  if(!count) return null
  return (
    <span className="user-count">
      <T id="common.usersCount" values={{ count }} />
    </span>
  )
}

export default withTracker(() => {
  Meteor.subscribe('referrers.count')
  return {
    count: (Counters.getCollectionCount(Referrers).fetch()[0] || {}).value
  }
})(UsersCount)
