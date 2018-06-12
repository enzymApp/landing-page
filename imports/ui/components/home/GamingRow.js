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
            {`Entre le virtuel et le réel, Enzym est avant tout un jeu gratuit qui fonctionne avec un carburant que le joueur gagne en acceptant des défis, en allant le chercher dans des endroits insolites ou en scannant un QR code sur un smartphone d’un autre joueur.`}
          </p>
          <p>
            {` Les joueurs peuvent lancer des défis à un autre joueur ou à un groupe de joueurs, cela peut être un parcours, une rencontre, ou un jeu ludique nécessitant la proximité, le terrain de jeu étant les établissements de monde entier. Es-tu un vrai joueur ?`}
          </p>
      </div>
    </Col>
  </Row>
)
