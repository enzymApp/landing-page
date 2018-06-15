import React      from 'react'
import {Row, Col} from 'reactstrap'


export default () => (
  <Row className="gaming_row row_blocks">
    <Col xs="6">
      <img src="/images/photo_game.jpg" />
    </Col>
    <Col xs="6">
      <div className="jouez text_blocks">
        <h4>Jouez</h4>
          <p>
            {`Enzym est un jeu gratuit qui invite à naviguer entre le réel et le virtuel. Le joueur accepte des défis qui le conduisent dans des endroits insolites et à rencontrer d’autres joueurs. Source de carburant, les défis remportés lui permettent de débloquer de nouvelles fonctionnalités dans le jeu et de continuer sa progression.`}
          </p>
          <p>
            {`Chaque défi est différent. Il peut se jouer à deux ou plus, avec des inconnus ou avec des amis, sur quelques heures ou plusieurs jours… L’expérience est renouvelée en permanence grâce à la personnalité des joueurs et à un terrain de jeu sans limite : le monde réel.`}
          </p>
          <p>
            {`Alors, prêt à jouer ?`}
          </p>
      </div>
    </Col>
  </Row>
)
