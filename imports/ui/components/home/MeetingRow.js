import React      from 'react'
import {Row, Col} from 'reactstrap'
import T from '../Translator'


export default () => (
  <Row className="meeting_row row_blocks">
    <Col xs="6">
      <img src="/images/photo_rencontre.jpg" />
    </Col>
    <Col xs="6">
      <div className="rencontrez text_blocks">
        <h4><T>Home.meet.title</T></h4>
        <p><T>Home.meet.p1</T></p>
        <p><T>Home.meet.p2</T></p>
        <p><T>Home.meet.p3</T></p>
      </div>
    </Col>
  </Row>
)
