import React from 'react'
import {TelegramShareButton} from 'react-share'

export default (() => (
	<TelegramShareButton
    url='https://www.enzym.io'
    quote='enzym'
    className="network__share-button">
	  <img src='/images/logo_telegram_share.png' />
	</TelegramShareButton>
))
