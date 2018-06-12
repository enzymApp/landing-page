import React from 'react'


export default ({children}) => {

  return (
    <div className="background_img_top">
      <div className="outer-div"><div className="mid-div"><div className="center-div">
      <div id="logo_enzym_shadow">
        <img src="/images/logo_enzym_intro_shadow.png" align="center" />
      </div>
      {children}
    </div></div></div>

    </div>
  )
}
