import React from 'react'
import {Row, Col} from 'reactstrap'
import T              from '../components/Translator'

const Team = [
  {identity: <T>Ico.team.yannick.identity</T>, work: <T>Ico.team.yannick.work</T>, yellow: <T>Ico.team.yannick.yellow</T>, para: <T>Ico.team.yannick.para</T>, img: '/images/yannick.png', linkedin: 'https://www.linkedin.com/in/barnel-yannick/'},
  {identity: <T>Ico.team.sylvain.identity</T>, work: <T>Ico.team.sylvain.work</T>, yellow: <T>Ico.team.sylvain.yellow</T>, para: <T>Ico.team.sylvain.para</T>, img: '/images/sylvain.png', linkedin: 'https://www.linkedin.com/in/duchesnesylvain/'},
  {identity: <T>Ico.team.jeremy.identity</T>, work: <T>Ico.team.jeremy.work</T>, para: <T>Ico.team.jeremy.para</T>, img: '/images/jeremy.png', linkedin: 'https://www.linkedin.com/in/jeremycolemanscpo/'},
  {identity: <T>Ico.team.alfred.identity</T>, work: <T>Ico.team.alfred.work</T>, para: <T>Ico.team.alfred.para</T>, img: '/images/alfred.png', linkedin: 'https://www.linkedin.com/in/alfred-gautier-036147152/'},
  {identity: <T>Ico.team.theophile.identity</T>, work: <T>Ico.team.theophile.work</T>, para: <T>Ico.team.theophile.para</T>, img: '/images/theophile.png', linkedin: 'https://www.linkedin.com/in/theophilebatoz/'},
  {identity: <T>Ico.team.bertrand.identity</T>, work: <T>Ico.team.bertrand.work</T>, para: <T>Ico.team.bertrand.para</T>, img: '/images/bertrand.png', linkedin: 'https://www.linkedin.com/in/bertrand-hello-world/'},
  {identity: <T>Ico.team.sophea.identity</T>, work: <T>Ico.team.sophea.work</T>, para: <T>Ico.team.sophea.para</T>, img: '/images/sophea.png', linkedin: 'https://www.linkedin.com/in/sopheasok/'},
  {identity: <T>Ico.team.octave.identity</T>, work: <T>Ico.team.octave.work</T>, para: <T>Ico.team.octave.para</T>, img: '/images/octave.png', linkedin: 'https://www.linkedin.com/in/octave-rolland-a64b41167/'},
  {identity: <T>Ico.team.pauline.identity</T>, work: <T>Ico.team.pauline.work</T>, para: <T>Ico.team.pauline.para</T>, img: '/images/pauline.png', linkedin: 'https://www.linkedin.com/in/pauline-rochette-624ba210b/'},
  {identity: <T>Ico.team.kevin.identity</T>, work: <T>Ico.team.kevin.work</T>, para: <T>Ico.team.kevin.para</T>, img: '/images/kevin.png', linkedin: 'https://www.linkedin.com/in/ke-fu/'},
  {identity: <T>Ico.team.guillaume.identity</T>, work: <T>Ico.team.guillaume.work</T>, para: <T>Ico.team.guillaume.para</T>, img: '/images/guillaume.png', linkedin: 'https://www.linkedin.com/in/glarochette/'},
  {identity: <T>Ico.team.fred.identity</T>, work: <T>Ico.team.fred.work</T>, para: <T>Ico.team.fred.para</T>, img: '/images/frederic.png', linkedin: 'https://www.linkedin.com/in/glarochette/'}

]

const Advisor = [
  {identity: <T>Ico.advisors.eric.identity</T>, work: <T>Ico.advisors.eric.work</T>, img: '/images/eric.png', linkedin: 'https://www.linkedin.com/in/eric-burgel-a4313b5/'},
  {identity: <T>Ico.advisors.manon.identity</T>, work: <T>Ico.advisors.manon.work</T>, img: '/images/manon.png', linkedin: 'https://www.linkedin.com/in/eric-burgel-a4313b5/'},
  {identity: <T>Ico.advisors.remi.identity</T>, work: <T>Ico.advisors.remi.work</T>, img: '/images/remi.png', linkedin: 'https://www.linkedin.com/in/r%C3%A9mi-burgel-1999ab149/'},
]

export default ({children, isUserPage}) => {
  return (
    <div className="background-img-team-ico">
      <div id="team-ico">
        <div class="title"><h2>THE TEAM</h2></div>
        <Row>
          {Team.map(({identity, work, yellow, para, img, linkedin}) => (
            <Col xs="12" sm="6" md="6">

              <div key={identity} class="profil">
                <div class="visual">
                  <img src={img} className="img-profil" />
                </div>
                <div class="content">
                  <h2>{identity}</h2>
                  <h3>{work}</h3>
                  <p className="yellow">{yellow}</p>
                  <p className="para">{para}</p>
                </div>
                <div class="linkedin-ico">
                  <a href={linkedin} target="_blank"><img src="/images/linkedin-ico.png" /></a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div id="advisors-ico">
        <div class="title"><h2>OUR ADVISORS</h2></div>
        <Row>
          <div class="content-one">
            <h2><T>Ico.advisors.title</T></h2>
            <h3><T>Ico.advisors.subtitle</T></h3>
            <p className="para"><T>Ico.advisors.para1</T></p>
            <p className="para"><T>Ico.advisors.para2</T></p>
            <p className="para"><T>Ico.advisors.para3</T></p>
          </div>
          {Advisor.map(({identity, work, img, linkedin}) => (
            <Col xs="12" sm="4" md="4">
              <div key={identity} class="profil">
                <div class="visual">
                  <img src={img} className="img-profil" /><br/>
                </div>
                <div class="content">
                  <h2>{identity}</h2>
                  <h3>{work}</h3>
                </div>
                <div class="linkedin-ico">
                  <a href={linkedin} target="_blank"><img src="/images/linkedin-ico.png" /></a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div id="financial-ico">
        <div class="profil">
          <div class="visual">
            <img src="/images/nicolas.png" className="img-profil" />
          </div>
          <div class="content">
            <h2><T>Ico.advisors.nicolas.identity</T></h2>
            <h3><T>Ico.advisors.nicolas.work</T></h3>
            <p className="para"><T>Ico.advisors.nicolas.para</T></p>
          </div>
          <div class="linkedin-ico">
            <a href='https://www.google.fr' target="_blank"><img src="/images/linkedin-ico.png" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}
