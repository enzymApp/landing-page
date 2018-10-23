import {Accounts}    from 'meteor/accounts-base'
import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import {withRouter}  from 'react-router'
import React         from 'react'
import {Referrers}               from '/imports/api/referrers/Referrers'
import ReferrerLinksContainer    from '/imports/ui/components/ReferrerLinksContainer'
import ReferrerListContainer     from '/imports/ui/components/ReferrerListContainer'
import SubscriptionFormContainer from '/imports/ui/components/SubscriptionFormContainer'
import SocialShares              from '/imports/ui/components/SocialShares'
import T                         from '/imports/ui/components/Translator'
import withLoading               from '../helpers/withLoading'
import TopConnected              from '../layouts/TopConnected'
import TopDisconnected           from '../layouts/TopDisconnected'
import Base                      from './Base'

class Home extends React.Component {
  render() {
    const {emailLoginAttempt, user, children, referrer} = this.props
    const TopComponent = isReferrer(user, referrer) ? TopConnected : TopDisconnected
    return (
      <Base>
        <TopComponent>
          {!hasAccount(user) &&
            <SubscriptionFormContainer {...{emailLoginAttempt}} />
          }
          <div className="banner_ready">
            {isReferrer(user, referrer) &&
              <ReferrerLinksContainer user={user} referrer={referrer} />
            }
            {hasAccount(user) &&
              <SocialShares referrer={referrer} />
            }
            {hasAccount(user) && (
              <div>
                <ReferrerListContainer referrer={referrer} />
                <span className="know_more_gifts">
                  <T>
                    Referrer.giftsLink.before
                    <a role="button" tabIndex="0" onClick={this.scrollToGifts}><T>Referrer.giftsLink.text</T></a>
                    Referrer.giftsLink.after
                  </T>
                </span>
              </div>
            )}
          </div>
        </TopComponent>
      </Base>
    )
  }
  scrollToGifts() {
    document.getElementsByClassName('recompenses')[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
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
