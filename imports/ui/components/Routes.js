import React                     from 'react'
import { Router, Route, Switch, Redirect } from 'react-router'
import createBrowserHistory      from 'history/createBrowserHistory'
import {withEmailValidation} from 'meteor/enzym:accounts-passwordless'

// route components
import HomeContainer from '/imports/ui/pages/HomeContainer'
//import NotFoundPage from '../../ui/pages/NotFoundPage.js';

const browserHistory = createBrowserHistory();

export default () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact name="home" path="/" component={HomeContainer}/>
      <Route exact name="validation" path="/validation/:token" component={withEmailValidation({
          SuccessComponent: () => <Redirect to="/" />,
          FailureComponent: () => <div>Failure!</div>,
          routerPropsToCode: ({match: {params: {token}}}) => token,
          Loading,
        })} />
    </Switch>
  </Router>
);

const Loading = () => (
  <HomeContainer>Validation en cours</HomeContainer>
)
