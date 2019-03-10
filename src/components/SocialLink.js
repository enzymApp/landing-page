import React from 'react'
import { injectIntl } from 'react-intl'
import { compose, withProps, withState } from 'recompose'

const socialNetworks = {
  twitter: {
    className:   "twitter_icon",
    nameImg:  "twitterImg",
    src:      "/images/twitter.png",
    srcHover: "/images/twitterbis.png",
  },
  facebook: {
    className:   "facebook_icon",
    nameImg:  "facebookImg",
    src:      "/images/facebook.png",
    srcHover: "/images/facebookbis.png",
  },
  telegram: {
    className:   "telegram_icon",
    nameImg:  "telegramImg",
    src:      "/images/telegram.png",
    srcHover: "/images/telegrambis.png",
  }
}

const SocialLink = ({ className, name, imageSrc, nameImg, url, setHover }) => (
  <a
    className={className} href={url} target="_blank" rel="noopener noreferrer"
    onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}
  >
    <img name={nameImg} src={imageSrc} alt={name} />
  </a>
)

export default compose(
  injectIntl,
  withState('hover', 'setHover', false),
  withProps(({ name, hover, intl: { formatMessage: t } }) => ({
    ...socialNetworks[name],
    url: t({ id: `socialNetwork.${name}` }),
    imageSrc: socialNetworks[name][hover ? 'srcHover' : 'src'],
  })),
)(SocialLink)
