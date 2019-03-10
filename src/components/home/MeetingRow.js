import React      from 'react'
import {Row, Col} from 'reactstrap'
import { FormattedMessage as T } from 'react-intl'


const MeetingRow = () => (
  <Row className="meeting_row row_blocks">
    <Col xs="6">
      <img src="/images/photo_rencontre.jpg" />
    </Col>
    <Col xs="6">
      <div className="rencontrez text_blocks">
        <h4><T id="home.meet.title" /></h4>
        <p><T id="home.meet.p1" /></p>
        <p><T id="home.meet.p2" /></p>
        <p><T id="home.meet.p3" /></p>
      </div>
    </Col>
  </Row>
)

export default MeetingRow
