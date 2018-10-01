import React    from 'react'
import {Meteor} from 'meteor/meteor'
import i18n     from 'meteor/universe:i18n'
import saveLanguage        from '/imports/api/users/saveLanguage'
import {changeChannelLang} from '/imports/tools/discordWidget'


export default ({imgSrc, langCode}) => (
  <a onClick={changeLanguage(langCode)}><img src={imgSrc} /></a>
)

const changeLanguage = (langCode) => () => {
  i18n.setLocale(langCode)
  changeChannelLang()
  Meteor.userId() && saveLanguage(Meteor.userId(), langCode)
}
