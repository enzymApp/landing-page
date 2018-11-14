import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'

import {Referrers}   from '/imports/api/referrers/Referrers'
import withLoading   from '../helpers/withLoading'
import ReferrerList  from './ReferrerList'


const MIN_COUNT = 1000

export default withTracker(({referrer}) => {
  let list = []
  const minRank = referrer && referrer.rank ? Math.max(1, referrer.rank - 1) : 1
  const maxRank = referrer && referrer.rank ? referrer.rank + 1 : 1000
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
  return {
    loading: list.length < 2,
    list,
    centerId: referrer && referrer._id,
  }
})(withLoading(ReferrerList))
