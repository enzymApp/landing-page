import React         from 'react'
import { Jumbotron } from 'reactstrap'
import SubscriptionFormContainer from '/imports/ui/components/SubscriptionFormContainer'
import ReferrerListContainer     from '/imports/ui/components/ReferrerListContainer'

export default ({userId, children}) => (
  <div>
    <Jumbotron>
      <h1 align="center">Enzym</h1>
      <h4 align="center">Un réseau social local pour sortir et rencontrer de nouvelles personnes</h4>
      <p>
        Nous sommes en train de concevoir un nouveau réseau social qui ...
      </p>
      <br />
      {!children && !userId &&
        <SubscriptionFormContainer />
      }
      {children}
      {userId &&
        <ReferrerListContainer />
      }
    </Jumbotron>
  </div>
)
