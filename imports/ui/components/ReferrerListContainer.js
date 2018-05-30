import React from 'react'

import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'

import {Referrers} from '/imports/api/referrer/Referrers'
import withLoading  from '../helpers/withLoading'
import ReferrerList from './ReferrerList'


const MIN_COUNT = 20

export default withTracker(() => {
  Meteor.subscribe('referrers.one')
  const referrer = Referrers.findOne({userId: Meteor.userId}, Referrers.publicFields)
  let list = []
  console.log(referrer)
  if(referrer && referrer.rank) {
    const minRank = Math.max(1, referrer.rank - 1)
    const maxRank = referrer.rank + 1
    //console.log(minRank, maxRank)
    Meteor.subscribe('referrers.list', MIN_COUNT, minRank, maxRank)
    const curs = Referrers.paginatedListCentered(MIN_COUNT, minRank, maxRank)
    list = curs.fetch()
  }
  return {
    list,
    referrer,
    loading: list.length === 0
  }
})(withLoading(ReferrerList))
