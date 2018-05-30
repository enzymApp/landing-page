import React from 'react'

import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'

import {Referrers}   from '/imports/api/referrer/Referrers'
import withLoading   from '../helpers/withLoading'
import ReferrerLinks from './ReferrerLinks'


export default withTracker(() => {
  Meteor.subscribe('referrers.one')
  const referrer = Referrers.findOne({userId: Meteor.userId}, Referrers.publicFields)
  let list = []
  console.log(referrer)
  return {
    referrer,
    loading: !referrer,
  }
})(withLoading(ReferrerLinks))
