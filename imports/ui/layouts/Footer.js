import React      from 'react'
import {Row, Col} from 'reactstrap'
import {Link}     from 'react-router-dom'
import T from '../components/Translator'

export default ({text}) => (
  <Row className="footer">
    <Col xs="10">
      <Row className="footer_links">
        <Col xs="6">
          <Link to="/privacy"><T>Common.footer.privacy</T></Link>
        </Col>
        <Col xs="6">
          <Link to="/terms"><T>Common.footer.terms</T></Link>
        </Col>
      </Row>
    </Col>
    <Col xs="2">
      <div className="logo_enzym_footer">
        <img src="/images/logo_enzym_z.png" />
      </div>
    </Col>
  </Row>
)
