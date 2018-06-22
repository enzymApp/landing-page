import React from 'react'
import {TwitterShareButton} from 'react-share'

export default ({referrerUrl}) => {
	return(
		<TwitterShareButton
			url={referrerUrl}
	    quote='enzym'
	    className="network__share-button">
		  <img src='/images/logo_twitter_share.png' />
	  </TwitterShareButton>
	)
}