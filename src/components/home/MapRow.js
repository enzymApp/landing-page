import React      from 'react'
import {Row, Col} from 'reactstrap'
import { FormattedMessage as T } from 'react-intl'
import Map from './Map'


const MapRow = () => (
  <Row className="row_blocks">
    <Col xs="6">
      <Map />
    </Col>
    <Col xs="6">
      <a name="events" />
      <div className="rencontrez text_blocks">
        <h4><T id="home.events.title" /></h4>
        <div className="events">
          <p><T id="home.events.event1.text" /><i><T id="home.events.event1.time" /></i></p>
          <p><T id="home.events.event2.text" /><i><T id="home.events.event2.time" /></i></p>
        </div>
        <div className="videoContainer">
          <div className="videoWrapper">
            <iframe
              title="Real-life test of Enzym"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/CUIr7w3d2Gs"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        <div className="link-channel">
          <a href="https://www.youtube.com/channel/UChypzko_OZt_Ic6Ke7bNtew"><T id="home.events.youtube" /></a>
        </div>
      </div>
    </Col>
  </Row>
)

export default MapRow
