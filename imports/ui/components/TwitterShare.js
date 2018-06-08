import React from 'react'
import {TwitterShareButton, TwitterIcon} from 'react-share'

export default (() => (
	<TwitterShareButton
    url='https://www.enzym.io'
    quote='enzym'
    className="network__share-button">
	  <TwitterIcon
	    size={32}
	    round/>
  </TwitterShareButton>
))