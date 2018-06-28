import React from 'react'
import i18n  from 'meteor/universe:i18n'

const t = i18n.createTranslator('SocialNetwork')
const socialNetworks = {
  twitter: {
    classs: "twitter_icon",
    url:    t('twitter'),
    src: "/images/twitter.png",
    srcHover: "/images/twitterbis.png",
    nameImg: "twitterImg"
  },
  facebook: {
    classs: "facebook_icon",
    url:    t('facebook'),
    src: "/images/facebook.png",
    srcHover: "/images/facebookbis.png",
    nameImg: "facebookImg"


  },
  telegram: {
    classs: "telegram_icon",
    url:    t('telegram'),
    src: "/images/telegram.png",
    srcHover: "/images/telegrambis.png",
    nameImg: "telegramImg"

  }
}

  export default class SocialLink extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        imgSrc:  socialNetworks[this.props.name].src,
      }
    }

    render() {
      const {classs, url, nameImg} = socialNetworks[this.props.name] || {}
      return (
        <a className={classs} href={url} target="_blank" key={url} onMouseOver={this.handleHover} onMouseOut={this.handleOut}>
          <img name={nameImg} src={this.state.imgSrc} />
        </a>
      )
    }
    handleHover = () => {
      this.setState({imgSrc: socialNetworks[this.props.name].srcHover})
    }

    handleOut = () => {
      this.setState({imgSrc: socialNetworks[this.props.name].src})
    }

  }
