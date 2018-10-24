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
import TeamBlock      from '../components/home/TeamBlock'
import TableStats     from '../components/home/TableStats'
import Footer         from '../layouts/Footer'
import Header         from '../layouts/Header'


export default function Base({children}) {
  return (
    <div>
      <a name="top"> </a>
      <Header />
      {children}
      <MapRow />
      <GamingRow />
      <MeetingRow />
      <JoinUsBanner scroll="#top" text="Home.buttons.joinUs" />
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
}
