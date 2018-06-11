import React from 'react'
import SocialLink              from '../components/SocialLink'


export default ({children}) => {

  return (
    <div className="background_img_top">
      <div id="logo_enzym_shadow">
        <img src="/images/logo_enzym_intro_shadow.png" align="center" />
      </div>

      <div className="social_links" align="right">
        <SocialLink name="facebook" />
        <SocialLink name="twitter" />
        <SocialLink name="telegram" />
      </div>
      {children}
    </div>
  )
}
