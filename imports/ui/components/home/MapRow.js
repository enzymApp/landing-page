import React      from 'react'
import {Row, Col} from 'reactstrap'
import T   from '../Translator'
import Map from './Map'


export default function MapRow() {
  return (
    <Row className="row_blocks">
      <Col xs="6">
        <Map />
      </Col>
      <Col xs="6">
        <a name="events"> </a>
        <div className="rencontrez text_blocks">
          <h4><T>Home.events.title</T></h4>
          <div className="events">
            <p><T>Home.events.event1.text</T><i><T>Home.events.event1.time</T></i></p>
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
                allowFullScreen>
              </iframe>
            </div>
          </div>
          <div className="link-channel">
            <a href="https://www.youtube.com/channel/UChypzko_OZt_Ic6Ke7bNtew"><T>Home.events.youtube</T></a>
          </div>
        </div>
      </Col>
    </Row>
  )
}
