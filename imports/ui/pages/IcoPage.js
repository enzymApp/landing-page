import React          from 'react'

import Header         from '../layoutsIco/Header'
import SocialLink     from '/imports/ui/components/ico/SocialLink'
import Main           from '../layoutsIco/Main'

export default function IcoPage({children}) {
  return (
    <div>
      <Header />
      <Main />
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
