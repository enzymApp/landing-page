import React from 'react'

const socialNetworks = {
  twitter: {
    classs: "twitter_icon",
    url:    "https://twitter.com/Enzym_dapp"
  },
  facebook: {
    classs: "facebook_icon",
    url:    "https://www.facebook.com/Enzym-187654731876815"
  },
  telegram: {
    classs: "telegram_icon",
    url:    "https://t.me/enzym_app"
  }
}

export default ({name}) => {
  const {classs, url} = socialNetworks[name] || {}
  return (
      <a className={classs} href={url} target="_blank" key={url}>
    </a>
  )
}
