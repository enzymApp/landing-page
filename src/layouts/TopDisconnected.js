import React from 'react'
import {Row, Col} from 'reactstrap'
import { FormattedMessage as T } from 'react-intl'

const TopDisconnected = ({children}) => (
  <div className="background_img_top">
    <Row id="main">
      <Col xs="12" sm="6" md="8">
        <div id="visual">
          <h1>
            <T id="home.intro.big" />
            <br />
            <T id="home.intro.big2" />
          </h1>
          <h3><T id="home.intro.small" /></h3>
          <img src="/images/application-enzym.png" className="mockup" />
        </div>
      </Col>
      <Col xs="12" sm="6" md="4">
        <div id="block">
          {children}
        </div>
      </Col>
    </Row>
  </div>
)

export default TopDisconnected
