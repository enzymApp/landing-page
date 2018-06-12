import React                 from 'react'
import {Router,
        Route,
        Switch,
        Redirect}            from 'react-router'
import createBrowserHistory  from 'history/createBrowserHistory'
import {withEmailValidation} from 'meteor/enzymapp:accounts-passwordless'

import HomeContainer      from '/imports/ui/pages/HomeContainer'
import Privacy            from '/imports/ui/pages/Privacy'
import TermsAndConditions from '/imports/ui/pages/TermsAndConditions'
import Logout             from './Logout'

const browserHistory = createBrowserHistory();

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
  <Router history={browserHistory}>
    <Switch>
      <Route exact name="home"             path="/"                        component={HomeContainer}/>
      <Route exact name="homeWithReferrer" path="/referrer/:referrerToken" component={HomeContainer}/>
      <Route exact name="homeWithUsername" path="/page/:username"          component={HomeContainer}/>
      <Route exact name="logout"           path="/logout"                  component={Logout}/>
      <Route exact name="validation"       path="/validation/:token"       component={ValidationComponent} />
      <Route exact name="privacy"          path="/privacy"                 component={Privacy} />
      <Route exact name="terms"            path="/terms"                   component={TermsAndConditions} />
    </Switch>
  </Router>
);
