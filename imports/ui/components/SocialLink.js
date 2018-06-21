import React from 'react'
import i18n  from 'meteor/universe:i18n'

const t = i18n.createTranslator('SocialNetwork')

export default ({name}) => {
  const socialNetworks = {
    twitter: {
      classs: "twitter_icon",
      url:    t('twitter')
    },
    facebook: {
      classs: "facebook_icon",
      url:    t('facebook')
    },
    telegram: {
      classs: "telegram_icon",
      url:    t('telegram')
    }
  }
  const {classs, url} = socialNetworks[name] || {}
  return (
      <a className={classs} href={url} target="_blank" key={url}>
    </a>
  )
}
