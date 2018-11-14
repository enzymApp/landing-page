import React          from 'react'

import Header         from '../layoutsIco/Header'
import SocialLink     from '/imports/ui/components/ico/SocialLink'
import Main           from '../layoutsIco/Main'
import Video          from '../layoutsIco/Video'
import About          from '../layoutsIco/About'
import Team          from '../layoutsIco/Team'


export default function IcoPage({children}) {
  return (
    <div>
      <Header />
      <Main />
      <Video />
      <About />
      <Team />
      <div className="social_links_ico" align="right">
        <SocialLink name="facebook" />
        <SocialLink name="twitter" />
        <SocialLink name="telegram" />
        <SocialLink name="github" />
        <SocialLink name="bitcoin" />
      </div>
    </div>
  )
}
