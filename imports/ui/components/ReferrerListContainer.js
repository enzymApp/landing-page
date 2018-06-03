import React from 'react'

import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'

import {Referrers} from '/imports/api/referrers/Referrers'
import withLoading  from '../helpers/withLoading'
import ReferrerList from './ReferrerList'


const MIN_COUNT = 40

export default withTracker(() => {
  Meteor.subscribe('referrers.one')
  const referrer = Referrers.findOne({userId: Meteor.userId}, Referrers.publicFields)
  let list = []
  if(referrer && referrer.rank) {
    const minRank = Math.max(1, referrer.rank - 1)
    const maxRank = referrer.rank + 1
    Meteor.subscribe('referrers.list', MIN_COUNT, minRank, maxRank)
    list = Referrers.paginatedListCentered(MIN_COUNT, minRank, maxRank)
      .map(referrer => {
        return {
          ...referrer,
          username: (referrer.userId &&
            Meteor.users.findOne(
              {_id: referrer.userId},
              {fields: {username: 1}}
            ) || {}
          ).username
        }
      })
  }
  return {
    list,
    referrer,
    loading: list.length < 2
  }
})(withLoading(ReferrerList))
