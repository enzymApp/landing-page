import React      from 'react'
import {Row, Col} from 'reactstrap'
import T from '../Translator'


export default () => (
  <Row className="gaming_row row_blocks">
    <Col xs="6">
      <img src="/images/photo_game.jpg" />
    </Col>
    <Col xs="6">
      <div className="jouez text_blocks">
        <h4><T>Home.gaming.title</T></h4>
        <p><T>Home.gaming.p1</T></p>
        <p><T>Home.gaming.p2</T></p>
        <p><T>Home.gaming.p3</T></p>
      </div>
    </Col>
  </Row>
)
