import React from 'react'
import i18n  from 'meteor/universe:i18n'


export default ({imgSrc, langCode}) => (
  <a onClick={() => i18n.setLocale(langCode)}><img src={imgSrc} /></a>
)
