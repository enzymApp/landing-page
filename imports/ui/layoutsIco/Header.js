import React      from 'react'
import {Row, Col} from 'reactstrap'

import LanguageFlag from '../components/ico/LanguageFlag'
import Menu from '../components/ico/Menu'

const LANGS = [
  {langCode: 'fr', imgSrc: '/images/picto_french.png'},
  {langCode: 'en', imgSrc: '/images/picto_english.png'},
]

const LINKS = [
  {link: '/ico#about-ico', name: 'About Enzym'},
  {link: '/ico#whitepaper', name: 'Whitepaper'},
  {link: '/ico#team-ico', name: 'Team'},

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
            <img src="/images/logo_enzym_small_white.png" />
            <div className="left-side">
                <Menu></Menu>
            </div>
          </div>
        </Col>
        <Col xs="6" md="4" className="right-side">
          {LANGS.map(({langCode, imgSrc}) => (
            <LanguageFlag {...{langCode, imgSrc}} key={langCode} />
          ))}
        </Col>
      </Row>
    )
  }
}
