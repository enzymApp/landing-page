import i18n       from 'meteor/universe:i18n'
import React      from 'react'
import {Row, Col} from 'reactstrap'


i18n.addTranslations('fr', 'home.meet.title', 'Rencontrez')
i18n.addTranslations('en', 'home.meet.title', 'Meet')
const T = i18n.createComponent()

export default () => (
  <Row>
    <Col xs="6">
      <img src="/images/photo_rencontre.jpg" />
    </Col>
    <Col xs="6">
      <div className="rencontrez text_blocks">
        <h4><T>home.meet.title</T></h4>
        <p>
          {`Rencontrer de nouvelles personnes n’est pas aisé. Que ce soit en soirée, dans des lieux publics ou sur les réseaux sociaux et apps de rencontre, il n’est pas évident de franchir les barrières de la timidité ou de faire confiance rapidement.`}
        </p>
        <p>
          {`Enzym sera un jeu mobile qui te proposera des défis qui seront un prétexte à interagir physiquement avec d’autres joueurs en temps réel dans le même établissement. Tu pourras noter l’expérience et la concrétiser en demandant en ami les joueurs réellement rencontrés. Es-tu prêt à vivre l’expérience, comme nous ?`}
        </p>
      </div>
    </Col>
  </Row>
)
