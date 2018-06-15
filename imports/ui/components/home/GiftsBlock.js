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
        <p><span>{`Si le projet Enzym te plait, tu peux nous rejoindre en indiquant ton email et tu recevras 1 ZYM tout de suite. Si tu trouves le projet inspirant, tu peux participer au concours de parrainage et recevoir 1 ZYM pour chaque filleule parrainé.`}</span></p>
      </Col>
    </Row>
    <Row>
      <Col xs="8">
        <p><span>{`En plus de recevoir des ZYM, tu recevras des cadeaux inédits en fonction de tes progrès dans le classement. Tu pourrais obtenir un accès anticipé au prototype d’Enzym ou des boosts pour te propulser au lancement de l’app.`}</span></p>
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
        <p><span>{`Différents statuts, en particulier le statut d’ambassadeur, sera proposé en priorité aux joueurs les mieux classés au concours de parrainage. Ces statuts offriront des avantages particulièrement intéressants pour la suite ! Alors… tu es prêt ?`}</span></p>
      </Col>
    </Row>
  </div>
)
