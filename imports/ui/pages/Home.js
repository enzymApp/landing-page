import React         from 'react'
import { Jumbotron } from 'reactstrap'
import AfterSignupForm           from '/imports/ui/components/AfterSignupForm'
import ReferrerLinksContainer    from '/imports/ui/components/ReferrerLinksContainer'
import ReferrerListContainer     from '/imports/ui/components/ReferrerListContainer'
import SubscriptionFormContainer from '/imports/ui/components/SubscriptionFormContainer'
import TwitterLink               from '/imports/ui/components/TwitterLink'
import FacebookLink              from '/imports/ui/components/FacebookLink'
import TelegramLink             from '/imports/ui/components/TelegramLink'

export default ({user, children, referrer}) => (
  <div>
    <Jumbotron>
      <h1 align="center">Enzym</h1>
      <h4 align="center">Un réseau social local pour sortir et rencontrer de nouvelles personnes</h4>
      <p>
        Nous sommes en train de concevoir un nouveau réseau social qui ...
      </p>
      <br />
      <h6 align="right"><TwitterLink /></h6>
      <h6 align="right"><FacebookLink /></h6>
      <h6 align="right"><TelegramLink /></h6>
      {!children && !hasAccount(user) &&
        <SubscriptionFormContainer />
      }
      {!children && hasAccount(user) && !signupFinished(user) &&
        <AfterSignupForm />
      }
      {children}
      {signupFinished(user)  &&
        <ReferrerListContainer referrer={referrer} />
      }
    </Jumbotron>
    {isReferrer(user) &&
      <ReferrerLinksContainer referrer={referrer} />
    }
  </div>
)

function hasAccount(user) {
  return !!user
}

function signupFinished(user) {
  return user && user.profile && user.profile.contest !== undefined
}

function isReferrer(user) {
  return user && user.profile && user.profile.contest
}
