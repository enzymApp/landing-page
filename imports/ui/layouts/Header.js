import i18n       from 'meteor/universe:i18n'
import React      from 'react'
import {Row, Col} from 'reactstrap'

import LanguageFlag from '../components/LanguageFlag'
import MenuItem     from '../components/MenuItem'
import UsersCount   from '../components/UsersCount'

const LANGS = [
  {langCode: 'fr', imgSrc: '/images/picto_french.png'},
  {langCode: 'en', imgSrc: '/images/picto_english.png'},
]
const FILES_URL = 'https://s3-eu-west-1.amazonaws.com/files.enzym.io/'

export default class Header extends React.Component {
  state = { status: false }
  toggleStatus(){
    this.setState({ status: !this.state.status })
    console.log('toggle button handler: '+ this.state.status)
  }
  render() {
    const translatedLinks = [
      {name: 'Common.menu.places',  href: '#events'},
      {name: 'Common.menu.concept',  target: '_blank', href: 'Common.menuUrls.concept'},
      {name: 'Common.menu.partners', target: '_blank', href: 'Common.menuUrls.partners'},
      // {href: '/pro.pdf',         name: 'Nos offres pro'},
      {name: 'Common.menu.contact',    href: 'mailto:yannick@enzym.io'},
    ]
    return (
      <Row id="header">
        <Col xs="6" md="3">
          <div id="logo_top">
            <span className="hamburger" onClick={()=>this.toggleStatus()}><img src="/images/hamburger.png"/></span>
            <img src="/images/logo_enzym_small_white.png" />
          </div>
        </Col>
        <Col xs="6" md="9" className="right-side">
          {this.renderMenu(translatedLinks)}
          {LANGS.map(({langCode, imgSrc}) => (
            <LanguageFlag {...{langCode, imgSrc}} key={langCode} />
          ))}
          <UsersCount />
        </Col>
        {this.state.status && (
          <Col xs="12" className="menu-mobile">
            {this.renderMenu(translatedLinks)}
          </Col>
        )}
      </Row>
    )
  }
  renderMenu = (translatedLinks) => {
    return translatedLinks.map((link) => (
      <MenuItem {...link} key={link.name} />
    ))
  }
}
