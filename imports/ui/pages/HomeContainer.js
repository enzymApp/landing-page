import {Accounts}    from 'meteor/accounts-base'
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
  const referrer = user && Referrers.findOne(
    {userId: user._id},
    {fields: Referrers.publicFields}
  )
  const emailLoginAttempt = Accounts.getPasswordlessLoginAttemptSelector()
  return {
    children,
    emailLoginAttempt,
    loading: !handler.ready(),
    referrer,
    user,
  }
})(withLoading(Home)))
