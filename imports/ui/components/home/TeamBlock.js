import React      from 'react'
import {Row, Col} from 'reactstrap'


export default ({text}) => (
  <div>
    <h2>{'L\'équipe'}</h2>
    <Row>
      <Col xs="4">
        photo1
      </Col>
      <Col xs="4">
        photo2
      </Col>
      <Col xs="4">
        photo3
      </Col>
    </Row>
  </div>
)
