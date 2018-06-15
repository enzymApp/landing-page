import React      from 'react'
import {Row, Col} from 'reactstrap'

import LanguageFlag from '../components/LanguageFlag'
import UsersCount   from '../components/UsersCount'

const LANGS = [
  {langCode: 'fr', imgSrc: '/images/picto_french.png'},
  {langCode: 'en', imgSrc: '/images/picto_english.png'},
]

export default () => (
  <Row id="header">
    <Col xs="5">
      <div id="logo_top">
        <img src="/images/logo_enzym_small_white.png" />
      </div>
    </Col>
    <Col xs="7" className="right-side">
      {LANGS.map(({langCode, imgSrc}) => (
        <LanguageFlag {...{langCode, imgSrc}} key={langCode} />
      ))}
      <UsersCount />
    </Col>
  </Row>
)
