import React from 'react'
import {Row, Col} from 'reactstrap'
import T              from '../components/Translator'
import i18n           from 'meteor/universe:i18n'

export default ({children, isUserPage}) => {
  return (
    <div className="background_img_top">
      <Row id="main">
        <Col xs="12" sm="6" md="8" >
          <div id="visual">
            <h1><T>ABTesting.intro.big</T><br/><T>ABTesting.intro.big2</T></h1>
            <h3><T>ABTesting.intro.small</T></h3>
            <img src="/images/application-enzym.png" class="mockup"/>
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
}
