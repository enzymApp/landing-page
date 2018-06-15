import i18n       from 'meteor/universe:i18n'
import React      from 'react'
import {Row, Col} from 'reactstrap'


i18n.addTranslations('fr', 'home.meet.title', 'Rencontrez')
i18n.addTranslations('en', 'home.meet.title', 'Meet')
const T = i18n.createComponent()

export default () => (
  <Row className="meeting_row row_blocks">
    <Col xs="6">
      <img src="/images/photo_rencontre.jpg" />
    </Col>
    <Col xs="6">
      <div className="rencontrez text_blocks">
        <h4><T>home.meet.title</T></h4>
        <p>
          {`Qui n’a jamais été pris d’une soudaine envie de rencontrer de nouvelles personnes ? L'ADN d'Enzym c'est une promesse, celle de réunir ses utilisateurs en leur proposant de vivre des rencontres immédiatement en bas de chez eux.`}
        </p>
        <p>
          {`Que ce soit pour une heure, un jour ou pour la vie ; pour rigoler, philosopher ou plus si affinités, Enzym offre l’opportunité de faire des rencontres naturelles et spontanées dans un cadre convivial. Encadrée par le jeu, la notoriété d’un joueur évolue au gré des rencontres, assure sa progression et oriente ses rencontres futures pour qu'elles restent toujours propices au plaisir et à la découverte de l'autre.`}
        </p>
        <p>
          {`Prêt à vivre une nouvelle aventure ?`}
        </p>
      </div>
    </Col>
  </Row>
)
