import React from 'react'
import {TelegramShareButton} from 'react-share'

export default ({referrerUrl}) => (
  <TelegramShareButton
    url={referrerUrl}
    quote="enzym"
    className="network__share-button">
      <img src="/images/logo_telegram_share.png" />
  </TelegramShareButton>
)
