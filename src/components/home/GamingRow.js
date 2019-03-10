import React      from 'react'
import {Row, Col} from 'reactstrap'
import { FormattedMessage as T } from 'react-intl'


const GamingRow = () => (
  <Row className="gaming_row row_blocks">
    <Col xs="6">
      <img src="/images/photo_game.jpg" />
    </Col>
    <Col xs="6">
      <div className="jouez text_blocks">
        <h4><T id="home.gaming.title" /></h4>
        <p><T id="home.gaming.p1" /></p>
        <p><T id="home.gaming.p2" /></p>
        <p><T id="home.gaming.p3" /></p>
      </div>
    </Col>
  </Row>
)

export default GamingRow
