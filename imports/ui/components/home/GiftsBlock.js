import React      from 'react'
import {Row, Col} from 'reactstrap'


export default ({text}) => (
  <div>
    <h2>{'Récompenses'}</h2>
    <Row>
      <Col xs="2">
        <img src="/images/picto_coin.png" />
      </Col>
      <Col xs="10">
        blabla
      </Col>
    </Row>
    <Row>
      <Col xs="10">
        blabla
      </Col>
      <Col xs="2">
        <img src="/images/picto_chest.png" />
      </Col>
    </Row>
    <Row>
      <Col xs="2">
        <img src="/images/picto_crown.png" />
      </Col>
      <Col xs="10">
        blabla
      </Col>
    </Row>
  </div>
)
