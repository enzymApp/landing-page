import React from 'react'
import {Row, Col} from 'reactstrap'
import T              from '../components/Translator'

export default function Main({children, isUserPage}) {
  return (
    <div className="background_img_top">
      <Row id="main">
        <Col xs="12">
          <div className={`outer-div ${isUserPage && "active-black"}`}>
            <div className="mid-div">
              <div className="center-div">
                <div id="logo_enzym_shadow">
                  <a href="/">
                    <img src="/images/logo_enzym_intro_shadow.png" align="center" />
                  </a>
                </div>
                {children}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
