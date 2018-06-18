import React      from 'react'
import {Row, Col} from 'reactstrap'
import T from '../Translator'

export default ({text}) => (
  <div className="recompenses">
    <h2>{'Récompenses'}</h2>
    <Row>
      <Col xs="4">
        <div className="outer-div"><div className="mid-div"><div className="center-div">
        <img src="/images/picto_coin.png" />
        </div></div></div>
      </Col>
      <Col xs="8">
        <p><span><T>Home.gifts.coin</T></span></p>
      </Col>
    </Row>
    <Row>
      <Col xs="8">
        <p><span><T>Home.gifts.chest</T></span></p>
      </Col>
      <Col xs="4">
        <div className="outer-div"><div className="mid-div"><div className="center-div">
          <img src="/images/picto_chest.png" />
        </div></div></div>
      </Col>
    </Row>
    <Row>
      <Col xs="4">
        <div className="outer-div"><div className="mid-div"><div className="center-div">
          <img src="/images/picto_crown.png" />
        </div></div></div>
      </Col>
      <Col xs="8">
        <p><span><T>Home.gifts.crown</T></span></p>
      </Col>
    </Row>
  </div>
)
