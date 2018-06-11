import i18n       from 'meteor/universe:i18n'
import React      from 'react'
import {Row, Col} from 'reactstrap'
import AfterSignupForm           from '/imports/ui/components/AfterSignupForm'
import ReferrerLinksContainer    from '/imports/ui/components/ReferrerLinksContainer'
import ReferrerListContainer     from '/imports/ui/components/ReferrerListContainer'
import SubscriptionFormContainer from '/imports/ui/components/SubscriptionFormContainer'
import GamingRow      from '../components/home/GamingRow'
import MeetingRow     from '../components/home/MeetingRow'
import JoinUsBanner   from '../components/home/JoinUsBanner'
import TwoTabsBlock   from '../components/home/TwoTabsBlock'
import GiftsBlock     from '../components/home/GiftsBlock'
import TeamBlock      from '../components/home/TeamBlock'
import Modal          from '../components/Modal'
import Footer         from '../layouts/Footer'
import Header         from '../layouts/Header'
import Main           from '../layouts/Main'


export default ({user, children, referrer}) => (
  <div>
    <Header />
    <Main>
      {!hasAccount(user) &&
        <SubscriptionFormContainer />
      }
      {hasAccount(user) && !signupFinished(user) &&
        <AfterSignupForm />
      }
      {isReferrer(user) &&
        <ReferrerLinksContainer referrer={referrer} />
      }
      {signupFinished(user)  &&
        <ReferrerListContainer referrer={referrer} />
      }
    </Main>
    <GamingRow />
    <MeetingRow />
    <JoinUsBanner scroll text="Rejoignez-nous" />
    <TwoTabsBlock />
    <GiftsBlock />
    <TeamBlock />
    <JoinUsBanner openChat text="Envie de contribuer au projet" />
    <Footer />
  </div>
)

function hasAccount(user) {
  return !!user
}

function signupFinished(user) {
  return user && user.profile && user.profile.contest !== undefined
}

function isReferrer(user) {
  return user && user.profile && user.profile.contest
}
