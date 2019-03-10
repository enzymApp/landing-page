import React      from 'react'
import {Row, Col} from 'reactstrap'
import { FormattedMessage as T } from 'react-intl'

const GiftsBlock = ({ text }) => (
  <div className="recompenses">
    <h2><T id="home.gifts.title" /></h2>
    <Row className="container">
      <Col xs="4">
        <div className="outer-div">
          <div className="mid-div">
            <div className="center-div">
              <img src="/images/picto_coin.png" />
            </div>
          </div>
        </div>
      </Col>
      <Col xs="8">
        <p><span><T id="home.gifts.coin" /></span></p>
      </Col>
    </Row>
    <Row className="container">
      <Col xs="8">
        <p><span><T id="home.gifts.chest" /></span></p>
      </Col>
      <Col xs="4">
        <div className="outer-div">
          <div className="mid-div">
            <div className="center-div">
              <img src="/images/picto_chest.png" />
            </div>
          </div>
        </div>
      </Col>
    </Row>
    <Row className="container">
      <Col xs="4">
        <div className="outer-div">
          <div className="mid-div">
            <div className="center-div">
              <img src="/images/picto_crown.png" />
            </div>
          </div>
        </div>
      </Col>
      <Col xs="8">
        <p><span><T id="home.gifts.crown" /></span></p>
      </Col>
    </Row>
  </div>
)

export default GiftsBlock
