import React          from 'react'
import SocialLink     from '/imports/ui/components/SocialLink'

import GamingRow      from '../components/home/GamingRow'
import MeetingRow     from '../components/home/MeetingRow'
import MapRow         from '../components/home/MapRow'
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
      <JoinUsBanner href="#top" text="Home.buttons.joinUs" />
      <TwoTabsBlock />
      <TableStats />
      <TeamBlock />
      <JoinUsBanner href="mailto:yannick@enzym.io" text="Home.buttons.contribute" />
      <Footer />
      <div className="social_links" align="right">
        <SocialLink name="facebook" />
        <SocialLink name="twitter" />
        <SocialLink name="telegram" />
      </div>
    </div>
  )
}
