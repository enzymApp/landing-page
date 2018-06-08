import React         from 'react'
import { Jumbotron } from 'reactstrap'
import AfterSignupForm           from '/imports/ui/components/AfterSignupForm'
import ReferrerLinksContainer    from '/imports/ui/components/ReferrerLinksContainer'
import ReferrerListContainer     from '/imports/ui/components/ReferrerListContainer'
import SubscriptionFormContainer from '/imports/ui/components/SubscriptionFormContainer'
import TwitterLink               from '/imports/ui/components/TwitterLink'

export default ({user, children, referrer}) => (
  <div>
    <Jumbotron>
      <h1 align="center">Enzym</h1>
      <h4 align="center">Un réseau social local pour sortir et rencontrer de nouvelles personnes</h4>
      <p>
        Nous sommes en train de concevoir un nouveau réseau social qui ...
      </p>
      <br />
      {!children && !user &&
        <SubscriptionFormContainer />
      }
      {!children && user && !user.username &&
        <AfterSignupForm />
      }
      {children}
      {user && user.username  &&
        <ReferrerListContainer referrer={referrer} />
      }
      <TwitterLink />
    </Jumbotron>
    {user && user.username &&
      <ReferrerLinksContainer referrer={referrer} />
    }
  </div>
)
