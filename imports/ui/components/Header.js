import React      from 'react'
import {Row, Col} from 'reactstrap'


export default ({text}) => (
  <Row id="header">
    <Col xs="8">
      <div id="logo_top">
        <img src="/images/logo_enzym_small_white.png" />
      </div>
    </Col>
    <Col xs="4" align="right">
      <a href="#"><img src="/images/picto_french.png" /></a>
      <a href="#"><img src="/images/picto_english.png" /></a>
    </Col>
  </Row>
)
