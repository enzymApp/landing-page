import React from 'react'
import i18n  from 'meteor/universe:i18n'
import saveLanguage from '/imports/api/users/saveLanguage';


export default ({imgSrc, langCode}) => (
  <a onClick={changeLanguage(langCode)}><img src={imgSrc} /></a>
)

const changeLanguage = (langCode) => () => {
  i18n.setLocale(langCode)
  saveLanguage(Meteor.userId(), langCode)
}