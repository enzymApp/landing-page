import React from 'react'


export default ({children}) => {

  return (
    <div className="background_img_top">
      <div class="outer-div"><div class="mid-div"><div class="center-div">
      <div id="logo_enzym_shadow">
        <img src="/images/logo_enzym_intro_shadow.png" align="center" />
      </div>
      {children}
    </div></div></div>

    </div>
  )
}
