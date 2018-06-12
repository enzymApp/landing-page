import React from 'react'
import {TwitterShareButton} from 'react-share'

export default (() => (
	<TwitterShareButton
    url='https://www.enzym.io'
    quote='enzym'
    className="network__share-button">
	  <img src='images/logo_twitter_share.png' />
  </TwitterShareButton>
))