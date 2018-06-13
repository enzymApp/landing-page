import React      from 'react'
import {Row, Col} from 'reactstrap'


export default ({text}) => (
  <div className="recompenses">
    <h2>{'Récompenses'}</h2>
    <Row>
      <Col xs="4">
        <div className="outer-div"><div className="mid-div"><div className="center-div">
        <img src="/images/picto_coin.png" />
        </div></div></div>
      </Col>
      <Col xs="8">
        <p><span>{`Si le projet Enzym te plait, tu peux nous rejoindre en nous transmettant ton mail. Tu recevras 1 ZYM. Si tu crois comme nous à la révolution Enzym, tu peux participer au concours de parrainage en recevant 1 ZYM pour chaque filleule parrainé.`}</span></p>
      </Col>
    </Row>
    <Row>
      <Col xs="8">
        <p><span>{`emoticons / looting ?`}</span></p>
      </Col>
      <Col xs="4">
        <div className="outer-div"><div className="mid-div"><div className="center-div">
        <img src="/images/picto_chest.png" />
        </div></div></div>
      </Col>
    </Row>
    <Row>
      <Col xs="4">
        <div className="outer-div"><div className="mid-div"><div className="center-div">
        <img src="/images/picto_crown.png" />
        </div></div></div>
      </Col>
      <Col xs="8">
        <p><span>{`Enzym cherchera  bientôt ses ambassadeurs pour coloniser les zones géographiques socialement pauvres. Le statut d’ambassadeur Enzym sera proposé en priorité aux joueurs les mieux classés au concours de parrainage. L’ambassadeur aura des avantages très intéressant pour la suite ;-) Alors..tu es prêt ?`}</span></p>
      </Col>
    </Row>
  </div>
)
