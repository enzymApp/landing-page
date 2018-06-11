import React      from 'react'
import {Row, Col} from 'reactstrap'

import LanguageFlag from '../components/LanguageFlag'

const LANGS = [
  {langCode: 'fr', imgSrc: '/images/picto_french.png'},
  {langCode: 'en', imgSrc: '/images/picto_english.png'},
]

export default () => (
  <Row id="header">
    <Col xs="8">
      <div id="logo_top">
        <img src="/images/logo_enzym_small_white.png" />
      </div>
    </Col>
    <Col xs="4" align="right">
      {LANGS.map(({langCode, imgSrc}) => (
        <LanguageFlag {...{langCode, imgSrc}} key={langCode} />
      ))}
    </Col>
  </Row>
)
