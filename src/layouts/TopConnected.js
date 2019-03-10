import React from 'react'
import {Row, Col} from 'reactstrap'

export default function Main({children, isUserPage}) {
  return (
    <div className="background_img_top">
      <Row id="main">
        <Col xs="12">
          <div id="logo_enzym_shadow">
            <a href="/">
              <img src="/images/logo_enzym_intro_shadow.png" align="center" />
            </a>
          </div>
          {children}
        </Col>
      </Row>
    </div>
  )
}
