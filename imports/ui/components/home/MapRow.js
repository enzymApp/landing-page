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
          <h4><T>Home.map.title</T></h4>
          <div className="events">
            <p>Aux copain d'abord (Grenoble) : <i>tous les jeudis 18-20h</i></p>
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
            <a href="https://www.youtube.com/channel/UChypzko_OZt_Ic6Ke7bNtew">Notre chaîne youtube</a>
          </div>
        </div>
      </Col>
    </Row>
  )
}
