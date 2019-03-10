import React from 'react'
import {FacebookShareButton} from 'react-share'

export default ({referrerUrl}) => (
  <FacebookShareButton
    url={referrerUrl}
    quote="enzym"
    className="network__share-button">
      <img src="/images/logo_facebook_share.png" />
  </FacebookShareButton>
)
