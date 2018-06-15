import React      from 'react'
import {Row, Col} from 'reactstrap'


export default class TwoTabsBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {visibleTab: 1}
  }
  render() {
    const {visibleTab} = this.state
    return (
      <div>
        <Row>
          <Col className="titletab_ethique" xs="6" onClick={this.selectTab(1)} style={{boxShadow: (this.state.visibleTab == 2 ? "inset 0px 0px 83px -18px rgba(0,0,0,0.75)" : "none")}}>Ethique</Col>
          <Col className="titletab_innovant" xs="6" onClick={this.selectTab(2)} style={{boxShadow: (this.state.visibleTab == 1 ? "inset 0px 0px 83px -18px rgba(0,0,0,0.75)" : "none")}}>Innovant</Col>
        </Row>
        {visibleTab === 1 && (
          <Row className="tab_ethique">
            <Col xs="8">
              <p>
                {`Le projet Enzym est un fabuleux challenge ! Nous avons l’ambition de proposer un Jeu gratuit favorisant des interactions humaines quasi instantanées tout en respectant notre communauté. Chez Enzym, nous tenons à ce que vos données restent les vôtres. Non seulement, nous n’y aurons techniquement pas accès (voir « innovant ») mais elles seront également chiffrées pour garantir leur sécurité.`}
              </p>
              <p>
                {`Nous sommes conscients que c’est un nouvel usage d’internet, mais l’enjeu est important et nous comptons sur vous pour diffuser cette vision qui est la nôtre, qui est la vôtre.`}
              </p>
            </Col>
            <Col xs="4">
              <img src="/images/picto_ethique.png" />
            </Col>
          </Row>
        )}
        {visibleTab === 2 && (
          <Row className="tab_innovant">
            <Col xs="4">
              <img src="/images/picto_innovant.png" />
            </Col>
            <Col xs="8">
              <p>
                {`Le projet Enzym est décentralisé, ce qui signifie que les données des utilisateurs ne sont pas stockées dans une base de données d’Enzym mais via la technologie d’échange Blockchain. La Data des profils et des actions étant décentralisée, personne ne détient les données de la communauté Enzym.`}
              </p>
              <p>
                {`Le ZYM est le carburant de la dapp (Token Ethereum) et assure par la qualité de ses transferts (QR-codes) l’existence réelle des membres de la communauté. De plus, des technologies de pointe comme IPFS, pour les contenus et les notifications locales, ainsi que le Bluetooth Low Energy, sont utilisés.`}
              </p>
            </Col>
          </Row>
        )}
      </div>
    )
  }
  selectTab = (idx) => () => {
    this.setState({visibleTab: idx})

  }
}
