import React from 'react'

const socialNetworks = [
  {
    url: "https://twitter.com/https://twitter.com/Enzym_dapp",
    src: "/images/logo_twitter_close.png"
  },
  {
    url: "https://www.facebook.com/Enzym-187654731876815",
    src: "/images/logo_facebook.png"
  },
  {
    url: "https://t.me/enzym_app",
    src: "/images/logo_telegram_close.png"
  }
]

export default () => {
  return (
    socialNetworks.map(({url, src}) => (
      <a href={url} target="_blank" key={url}>
        <img src={src} />
      </a>
    ))
  )
}
