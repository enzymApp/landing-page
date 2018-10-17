import i18n       from 'meteor/universe:i18n'
import React      from 'react'
import {Row, Col} from 'reactstrap'
import ReferrerLinksContainer    from '/imports/ui/components/ReferrerLinksContainer'
import ReferrerListContainer     from '/imports/ui/components/ReferrerListContainer'
import SubscriptionFormContainer from '/imports/ui/components/SubscriptionFormContainer'
import SocialLink                from '/imports/ui/components/SocialLink'
import SocialShares              from '/imports/ui/components/SocialShares'
import T                         from '/imports/ui/components/Translator'


import GamingRow      from '../components/home/GamingRow'
import MeetingRow     from '../components/home/MeetingRow'
import MapRow     from '../components/home/MapRow'
import JoinUsBanner   from '../components/home/JoinUsBanner'
import TwoTabsBlock   from '../components/home/TwoTabsBlock'
import GiftsBlock     from '../components/home/GiftsBlock'
import TeamBlock      from '../components/home/TeamBlock'
import Video          from '../components/home/Video'
import TableStats     from '../components/home/TableStats'
import Modal          from '../components/Modal'
import Footer         from '../layouts/Footer'
import Header         from '../layouts/Header'
import Main           from '../layouts/Main'


export default ({emailLoginAttempt, user, children, referrer}) => (
  <div>
    <Header />
    <Main isUserPage={isReferrer(user, referrer)}>
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
      {hasAccount(user) &&
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
      }
      </div>
    </Main>
    <MapRow />
    <GamingRow />
    <MeetingRow />
    <JoinUsBanner scroll text="Home.buttons.joinUs" />
    <TwoTabsBlock />
    <TableStats />
    <TeamBlock />
    <JoinUsBanner openChat text="Home.buttons.contribute" />
    <Footer />
    <div className="social_links" align="right">
      <SocialLink name="facebook" />
      <SocialLink name="twitter" />
      <SocialLink name="telegram" />
    </div>
  </div>
)

function hasAccount(user) {
  return !!user
}

function signupFinished(user) {
  return user && user.profile && user.profile.contest !== undefined
}

function isReferrer(user, referrer) {
  return user && referrer && referrer.userId === user._id
}
