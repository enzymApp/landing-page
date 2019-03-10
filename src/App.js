import React from 'react'
import { IntlProvider } from 'react-intl'
import { compose, withState, withProps } from 'recompose'
import locales from './modules/intl/loadLocales'
import updateAppState from './updateAppState'
import Routes from './Routes'
import './index.css'

const App = ({ locale, messages }) => (
  <IntlProvider {...{ locale, messages }}>
    <Routes />
  </IntlProvider>
)


export default compose(
  withState('session', 'setSession', ({ locale }) => ({ locale: locale || 'en' })),
  updateAppState,
  withProps(({ session: { locale } }) => ({
    messages: locales[locale]
  }))
)(App)
