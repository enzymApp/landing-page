import React from 'react'
import {Row, Col} from 'reactstrap'
import T              from '../components/Translator'

export default function Main({children}) {
  return (
    <div className="background_img_top">
      <Row id="main">
        <Col xs="12" sm="6" md="8">
          <div id="visual">
            <h1>
              <T>Home.intro.big</T><br/><T>Home.intro.big2</T>
            </h1>
            <h3><T>Home.intro.small</T></h3>
            <img src="/images/application-enzym.png" className="mockup"/>
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
