import React from 'react'
import FacebookShare             from '/imports/ui/components/FacebookShare'
import TwitterShare              from '/imports/ui/components/TwitterShare'
import SocialLinks               from '../components/SocialLinks'

i18n.addTranslations('en-US', 'teaser', 'Meet and face your neighbors')
i18n.addTranslations('fr', 'teaser', 'Rencontre et affronte tes voisins')
const T = i18n.createComponent()


export default ({children}) => {

  return (
    <div className="background_img_top">
      <div id="logo_enzym_shadow">
        <img src="/images/logo_enzym_intro_shadow.png" align="center" />
      </div>
      <h3 id="accroche" align="center">
        <T>teaser</T>
      </h3>
      <div className="social_links" align="right">
        <SocialLinks />
      </div>
      {children}
      <FacebookShare />
      <TwitterShare />
    </div>
  )
}
