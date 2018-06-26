import i18n       from 'meteor/universe:i18n'
import React      from 'react'
import {Row, Col} from 'reactstrap'
import ReferrerLinksContainer    from '../components/ReferrerLinksContainer'
import ReferrerListContainer     from '../components/ReferrerListContainer'
import SubscriptionFormContainer from '../components/SubscriptionFormContainer'
import SocialLink                from '../components/SocialLink'
import SocialShares              from '../components/SocialShares'
import TokenDistribution         from '../components/blockchain/TokenDistribution'
import GamingRow                 from '../components/home/GamingRow'
import GiftsBlock                from '../components/home/GiftsBlock'
import MeetingRow                from '../components/home/MeetingRow'
import JoinUsBanner              from '../components/home/JoinUsBanner'
import TeamBlock                 from '../components/home/TeamBlock'
import TwoTabsBlock              from '../components/home/TwoTabsBlock'
import Footer                    from '../layouts/Footer'
import Header                    from '../layouts/Header'
import Main                      from '../layouts/Main'


export default ({user, children, referrer}) => (
  <div>
    <Header />
    <Main isUserPage={isReferrer(user, referrer)}>
      {!hasAccount(user) &&
        <SubscriptionFormContainer />
      }
      <div className="banner_ready">
      {isReferrer(user, referrer) &&
        <ReferrerLinksContainer user={user} referrer={referrer} />
      }
      {hasAccount(user) &&
        <TokenDistribution {...{referrer, user}} />
      }
      {hasAccount(user) &&
        <SocialShares referrer={referrer}/>
      }
      {hasAccount(user) &&
        <ReferrerListContainer referrer={referrer} />
      }
      </div>
    </Main>
    <GamingRow />
    <MeetingRow />
    <JoinUsBanner scroll text="Home.buttons.joinUs" />
    <TwoTabsBlock />
    <GiftsBlock />
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
