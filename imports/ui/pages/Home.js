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
import Header         from '../components/Header'
import Footer         from '../components/Footer'

const homeStyle = {
  width: "100%",
}

export default ({user, children, referrer}) => (
  <div style={homeStyle}>
    <Header />
    <div className="background_img_top">
      <div id="logo_enzym_shadow">
        <img src="/images/logo_enzym_intro_shadow.png" align="center" />
      </div>
      <h3 id="accroche" align="center">Rencontre et affronte tes voisins</h3>
      {!children && !hasAccount(user) &&
        <SubscriptionFormContainer />
      }
      {!children && hasAccount(user) && !signupFinished(user) &&
        <AfterSignupForm />
      }
      {children}
      {isReferrer(user) &&
        <ReferrerLinksContainer referrer={referrer} />
      }
      {signupFinished(user)  &&
        <ReferrerListContainer referrer={referrer} />
      }
    </div>
    <MeetingRow />
    <GamingRow />
    <JoinUsBanner text="Rejoignez-nous" />
    <TwoTabsBlock />
    <GiftsBlock />
    <TeamBlock />
    <JoinUsBanner text="Envie de contribuer au projet" />
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
