import React                 from 'react'
import {Router,
        Route,
        Switch,
        Redirect}            from 'react-router'
import createBrowserHistory  from 'history/createBrowserHistory'
import {withEmailValidation} from 'meteor/enzymapp:accounts-passwordless'

import HomeContainer from '/imports/ui/pages/HomeContainer'


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
      <Route exact name="homeWithUsername" path="/page/:username" component={HomeContainer}/>
      <Route exact name="validation" path="/validation/:token" component={ValidationComponent} />
    </Switch>
  </Router>
);
