import React      from 'react'
import {Row, Col} from 'reactstrap'
import T from '../Translator'


export default function MapRow() {
  return (
    <Row className="row_blocks">
      <Col xs="6">
        <div className="map-container">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44994.32062218341!2d5.680437272709334!3d45.18416017286712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478af48bd689be6f%3A0x618c10cd6e995398!2sGrenoble!5e0!3m2!1sfr!2sfr!4v1539684541777" width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
        </div>
      </Col>
      <Col xs="6">
        <a name="events"> </a>
        <div className="rencontrez text_blocks">
          <h4><T>Home.map.title</T></h4>
          <div className="events">
            <p>Aux copain d'abord : <i>tous les jeudis 18-20h</i></p>
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
