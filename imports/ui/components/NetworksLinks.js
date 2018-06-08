import React from 'react'

export default () => {
	const networks = [twitter ={url: "https://twitter.com/https://twitter.com/Enzym_dapp",
														  src: "/images/logo_twitter_close.png"},
										facebook={url: "https://www.facebook.com/Enzym-187654731876815",
															src: "/images/logo_facebook.png"},
										telegram={url: "https://t.me/enzym_app",
															src: "/images/logo_telegram_close.png"}]
	return (
		networks.map(({url, src}) => (
	    <a href={url} target="_blank">
	      <img src={src} />
	    </a>
  	))
	)
}
