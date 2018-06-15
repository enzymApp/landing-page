import React      from 'react'
import {Row, Col} from 'reactstrap'
import {Link}     from 'react-router-dom'


export default ({text}) => (
  <Row className="footer">
    <Col xs="10">
      <Row className="footer_links">
        <Col xs="6">
          <Link to="/privacy">Privacy</Link>
        </Col>
        <Col xs="6">
          <Link to="/terms">Mentions légales</Link>
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
