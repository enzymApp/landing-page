import React from 'react'
import {TelegramShareButton, TelegramIcon} from 'react-share'

export default (() => (
	<TelegramShareButton
    url='https://www.enzym.io'
    quote='enzym'
    className="network__share-button">
	  <TelegramIcon
	    size={48}
	    round/>
	</TelegramShareButton>
))
