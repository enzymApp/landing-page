import React      from 'react'
import {Row, Col} from 'reactstrap'
import {Link}     from 'react-router-dom'
import { FormattedMessage as T } from 'react-intl'

const Footer = ({text}) => (
  <Row className="footer">
    <Col xs="10">
      <Row className="footer_links">
        <Col xs="6">
          <Link to="/privacy"><T id="common.footer.privacy" /></Link>
        </Col>
        <Col xs="6">
          <Link to="/terms"><T id="common.footer.terms" /></Link>
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

export default Footer
