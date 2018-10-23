import React      from 'react'
import {Row, Col} from 'reactstrap'

import LanguageFlag from '../components/ico/LanguageFlag'
import Menu from '../components/ico/Menu'

const LANGS = [
  {langCode: 'fr', imgSrc: '/images/picto_french.png'},
  {langCode: 'en', imgSrc: '/images/picto_english.png'},
]

const LINKS = [
  {link: '/#about', name: 'About Enzym'},
  {link: '/#whitepaper', name: 'Whitepaper'},
  {link: '/#team', name: 'Team'},
  {link: '/bounty', name: 'Bounty Z'}

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
      <Row id="header-ico">
        <Col xs="6" md="8">
          <div id="logo_top">
            <span className="hamburger" onClick={()=>this.toggleStatus()}><img src="/images/hamburger.png"/></span>
            <img src="/images/logo_enzym_small_white.png" />
            <div className="left-side">
              {LINKS.map(({link, name}) => (
                <Menu {...{link, name}} key={link}></Menu>
              ))}
            </div>
          </div>
        </Col>
        <Col xs="6" md="4" className="right-side">
          {LANGS.map(({langCode, imgSrc}) => (
            <LanguageFlag {...{langCode, imgSrc}} key={langCode} />
          ))}
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
