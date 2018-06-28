import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import {withRouter}  from 'react-router'

import {Referrers}   from '/imports/api/referrers/Referrers'
import withLoading   from '../helpers/withLoading'
import Home          from './Home'


export default HomeContainer = withRouter(withTracker(({children, match}) => {
  const username = match.params.username
  const handler = Meteor.subscribe('referrers.one', username)
  const user = !username ? Meteor.user() : Meteor.users.findOne({username})
  const referrerFields = (user && user._id === Meteor.userId() ?
    Referrers.allFields :
    Referrers.publicFields
  )
  const referrer = user && Referrers.findOne(
    {userId: user._id},
    {fields: referrerFields}
  )
  return {
    user,
    children,
    referrer,
    loading: !handler.ready(),
  }
})(withLoading(Home)))
