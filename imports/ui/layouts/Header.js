import React      from 'react'
import {Row, Col} from 'reactstrap'

import LanguageFlag from '../components/LanguageFlag'
import UsersCount   from '../components/UsersCount'
import Menu from '../components/Menu'

const LANGS = [
  {langCode: 'fr', imgSrc: '/images/picto_french.png'},
  {langCode: 'en', imgSrc: '/images/picto_english.png'},
]

const LINKS = [
  {link: '/lieux.pdf', name: 'Les lieux'},
  {link: '/concept.pdf', name: 'Le concept'},
  {link: '/partenaires.pdf', name: 'Nos partenaires'},
  {link: '/pro.pdf', name: 'Nos offres pro'},
  {link: '/contact', name: 'Contact'},

]

export default class Header extends React.Component {
  constructor(){
    super();
    this.state ={
      status:false
    }
  }

  toggleStatus(){
    this.setState({
      status:!this.state.status
    });
    console.log('toggle button handler: '+ this.state.status);
  }

  render() {
    return (
      <Row id="header">
        <Col xs="6" md="3">
          <div id="logo_top">
            <span class="hamburger" onClick={()=>this.toggleStatus()}><img src="/images/hamburger.png"/></span>
            <img src="/images/logo_enzym_small_white.png" />
          </div>
        </Col>
        <Col xs="6" md="9" className="right-side">
          {LINKS.map(({link, name}) => (
            <Menu {...{link, name}} key={link}></Menu>
          ))}
          {LANGS.map(({langCode, imgSrc}) => (
            <LanguageFlag {...{langCode, imgSrc}} key={langCode} />
          ))}
          <UsersCount />
        </Col>
        {this.state.status ?
          <Col xs="12" className="menu-mobile">
            {LINKS.map(({link, name}) => (
              <Menu {...{link, name}} key={name}></Menu>
            ))}
          </Col>
          :
        null}

      </Row>
    )
  }
}
