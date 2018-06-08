import i18n       from 'meteor/universe:i18n'
import React      from 'react'
import {Row, Col} from 'reactstrap'


i18n.addTranslations('fr', 'home.meet.title', 'Rencontrez')
i18n.addTranslations('en', 'home.meet.title', 'Meet')
const T = i18n.createComponent()

export default () => (
  <Row>
    <Col xs="6">
      <img src="/images/photo_rencontre.jpg" />
    </Col>
    <Col xs="6">
      <h4><T>home.meet.title</T></h4>
      <p>blabla</p>
    </Col>
  </Row>
)
