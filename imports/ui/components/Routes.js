import React                 from 'react'
import {Route,
        Switch,
        Redirect}            from 'react-router'
import {BrowserRouter}       from 'react-router-dom'
import createBrowserHistory  from 'history/createBrowserHistory'
import {withEmailValidation} from 'meteor/enzymapp:accounts-passwordless'

import HomeContainer        from '/imports/ui/pages/HomeContainer'
import Privacy            from '/imports/ui/pages/Privacy'
import TermsAndConditions from '/imports/ui/pages/TermsAndConditions'
import Logout             from './Logout'

const Loading = () => (
  <HomeContainer>Validation en cours</HomeContainer>
)

const ValidationComponent = withEmailValidation({
    SuccessComponent: () => <Redirect to="/" />,
    FailureComponent: () => <div>Failure!</div>,
    routerPropsToCode: ({match: {params: {token}}}) => token,
    Loading,
  })

export default () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact name="homeWithReferrer" path="/referrer/:referrerToken" component={HomeContainer}/>
        <Route exact name="homeWithUsername" path="/page/:username"          component={HomeContainer}/>
        <Route exact name="validation"       path="/validation/:token"       component={ValidationComponent} />
        <Route exact name="logout"           path="/logout"                  component={Logout}/>
        <Route name="home" path="/" component={HomeContainer}/>
      </Switch>
      <Switch>
        <Route name="privacy" path="/privacy" component={Privacy} />
        <Route name="terms"   path="/terms"   component={TermsAndConditions} />
      </Switch>
    </div>
  </BrowserRouter>
);
