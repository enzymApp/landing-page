import React from 'react'
import {FacebookShareButton, FacebookIcon} from 'react-share'

export default (() => (
	<FacebookShareButton
    url='https://www.enzym.io'
    quote='enzym'
    className="network__share-button">
	  <FacebookIcon
	    size={32}
	    round/>
  </FacebookShareButton>
))