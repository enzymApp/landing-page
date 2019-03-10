import {Meteor} from 'meteor/meteor'
import React    from 'react'
import { compose, withHandlers } from 'recompose'
import saveLanguage        from '/src/modules/user/saveLanguage'
// import {changeChannelLang} from '/src/tools/discordWidget'
import withAppState from '../withAppState'


const LanguageFlag = ({ imgSrc, langCode, setLocale }) => (
  <a className="language-flag__ico" onClick={() => setLocale(langCode)}>
    <img src={imgSrc} />
  </a>
)

export default compose(
  withAppState,
  withHandlers({
    setLocale: ({ setSession }) => locale => {
      setSession({ locale })
      // changeChannelLang(locale)
      if(Meteor.userId()) saveLanguage(Meteor.userId(), locale)
    },
  })
)(LanguageFlag)
