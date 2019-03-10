import {Accounts}    from 'meteor/accounts-base'
import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import {withRouter}  from 'react-router'
import React         from 'react'
import {Referrers}               from '/src/api/referrers/Referrers'
import ReferrerLinks    from '/src/components/ReferrerLinks'
import ReferrerList     from '/src/components/ReferrerList'
import SubscriptionForm from '/src/components/SubscriptionForm'
import SocialShares              from '/src/components/SocialShares'
import withLoading               from '../helpers/withLoading'
import TopConnected              from '../layouts/TopConnected'
import TopDisconnected           from '../layouts/TopDisconnected'
import Base                      from './Base'

const Home = ({ emailLoginAttempt, user, referrer }) => {
  const TopComponent = isReferrer(user, referrer) ? TopConnected : TopDisconnected
  return (
    <Base>
      <TopComponent isUserPage>
        {!hasAccount(user) &&
          <SubscriptionForm {...{emailLoginAttempt}} />
        }
        <div className="banner_ready">
          {isReferrer(user, referrer) &&
            <ReferrerLinks user={user} referrer={referrer} />
          }
          {hasAccount(user) &&
            <SocialShares referrer={referrer} />
          }
          {hasAccount(user) && (
            <div>
              <ReferrerList referrer={referrer} />
            </div>
          )}
        </div>
      </TopComponent>
    </Base>
  )
}

function hasAccount(user) {
  return !!user
}

function isReferrer(user, referrer) {
  return user && referrer && referrer.userId === user._id
}

export default withRouter(
  withTracker(({children, match}) => {
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
  })(
    withLoading(Home)
  )
)
