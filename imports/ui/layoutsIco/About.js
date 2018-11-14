import React from 'react'
import {Row, Col} from 'reactstrap'
import T              from '../components/Translator'

export default ({children, isUserPage}) => {
  return (
    <div className="background-radient-about-ico">
      <Row id="about-ico">
        <Col xs="12" sm="6" md="6">
          <img src="/images/application-enzym.png" className="logo-transparent"/>
          <div class="para">
            <p><T>Ico.about.para1</T></p>
            <p><T>Ico.about.para2</T></p>
            <p><T>Ico.about.para3</T></p>
            <p><T>Ico.about.para4</T></p>
          </div>
        </Col>
        <Col xs="12" sm="6" md="6">
        <div id="mockup">
          <img src="/images/application-enzym.png"/>
        </div>
        </Col>
      </Row>
    </div>
  )
}
