import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React         from 'react'

import {Referrers}   from '/imports/api/referrers/Referrers'
import withLoading   from '../helpers/withLoading'
import ReferrerLinks from './ReferrerLinks'


export default withTracker(({referrer}) => {
  return {
    referrer,
    loading: !referrer,
  }
})(withLoading(ReferrerLinks))
