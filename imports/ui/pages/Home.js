import i18n       from 'meteor/universe:i18n'
import React      from 'react'
import {Row, Col} from 'reactstrap'
import AfterSignupForm           from '/imports/ui/components/AfterSignupForm'
import ReferrerLinksContainer    from '/imports/ui/components/ReferrerLinksContainer'
import ReferrerListContainer     from '/imports/ui/components/ReferrerListContainer'
import SubscriptionFormContainer from '/imports/ui/components/SubscriptionFormContainer'
import TwitterLink               from '/imports/ui/components/TwitterLink'
import FacebookLink              from '/imports/ui/components/FacebookLink'
import TelegramLink              from '/imports/ui/components/TelegramLink'
import FacebookShare             from '/imports/ui/components/FacebookShare'
import TwitterShare              from '/imports/ui/components/TwitterShare'

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

i18n.addTranslations('en-US', 'teaser', 'Meet and face your neighbors')
i18n.addTranslations('fr', 'teaser', 'Rencontre et affronte tes voisins')

const T = i18n.createComponent()

export default ({user, children, referrer}) => (
  <div style={homeStyle}>
    <Header />
    <div className="background_img_top">
      <div id="logo_enzym_shadow">
        <img src="/images/logo_enzym_intro_shadow.png" align="center" />
      </div>
      <h3 id="accroche" align="center">
        <T>teaser</T>
      </h3>
      <div align="right">
        <TwitterLink />
        <FacebookLink />
        <TelegramLink />
      </div>
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
      <FacebookShare />
      <TwitterShare />
    </div>
    <MeetingRow />
    <GamingRow />
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
