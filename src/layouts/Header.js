import React      from 'react'
import {Row, Col} from 'reactstrap'
import { injectIntl } from 'react-intl'
import { compose, withState, withProps } from 'recompose'

import LanguageFlag from '../components/LanguageFlag'
import MenuItem     from '../components/MenuItem'
import UsersCount   from '../components/UsersCount'

const renderMenu = (translatedLinks) => {
  return translatedLinks.map((link) => (
    <MenuItem {...link} key={link.name} />
  ))
}

const Header = ({ langs, menuItems, menuOpen, toggleMenu }) => (
  <Row id="header">
    <Col xs="6" md="3">
      <div id="logo_top">
        <span className="hamburger" onClick={toggleMenu}><img src="/images/hamburger.png"/></span>
        <img src="/images/logo_enzym_small_white.png" />
      </div>
    </Col>
    <Col xs="6" md="9" className="right-side">
      {renderMenu(menuItems)}
      {langs.map(({langCode, imgSrc}) => (
        <LanguageFlag {...{langCode, imgSrc}} key={langCode} />
      ))}
      <UsersCount />
    </Col>
    {menuOpen && (
      <Col xs="12" className="menu-mobile">
        {renderMenu(menuItems)}
      </Col>
    )}
  </Row>
)

export default compose(
  injectIntl,
  withState('menuOpen', 'setMenuOpen', false),
  withProps(({ setMenuOpen, intl: { formatMessage: t } }) => ({
    toggleMenu: () => setMenuOpen(menuOpen => !menuOpen),
    langs: [
      {langCode: 'fr', imgSrc: '/images/picto_french.png'},
      {langCode: 'en', imgSrc: '/images/picto_english.png'},
    ],
    menuItems: [
      {name: t({ id: 'common.menu.places' }),  href: '#events'},
      {name: t({ id: 'common.menu.concept' }), target: '_blank', href: t({ id: 'common.menuUrls.concept' })},
      {name: t({ id: 'common.menu.pros' }),    target: '_blank', href: t({ id: 'common.menuUrls.pros' })},
      {name: t({ id: 'common.menu.contact' }), href: 'mailto:yannick@enzym.io'},
    ]
  }))
)(Header)
