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
          <Col xs="6" onClick={this.selectTab(1)}>Ethique</Col>
          <Col xs="6" onClick={this.selectTab(2)}>Innovant</Col>
        </Row>
        {visibleTab === 1 && (
          <Row>
            <Col xs="10">
              {`Le projet Enzym est un fabuleux challenge ! Nous avons l’ambition de proposer un Jeu gratuit provoquant des interactions humaines quasi instantanément tout en respectant notre communauté. Enzym n’utilisera pas vos données à des fins commerciales car elle ne veut pas les détenir (voir “innovant). Nous voulons créer, avec votre aide,  une application pouvant fonctionner sans réseaux internet en mettant en avant les établissements locaux. Nous sommes conscients que les mentalités ne sont pas encore prêtes pour adhérer brusquement  à ce changement de vision de cet usage d’internet, mais il y a tellement d’enjeux pour le futur que nous comptons sur vous pour colporter cette vision qui est la nôtre, qui est la votre.`}
            </Col>
            <Col xs="2">
              <img src="/images/picto_ethique.png" />
            </Col>
          </Row>
        )}
        {visibleTab === 2 && (
          <Row>
            <Col xs="2">
              <img src="/images/picto_innovant.png" />
            </Col>
            <Col xs="10">
              {`L’application Enzym sera la premier jeu donnant un prétexte à la rencontre entre le virtuel et le réel. Enzym sera décentralisée et fonctionnera avec une technologie Blockchain. La Data des profils et des actions seront décentralisées et chiffrées, de cette façon personne ne détiendra les données de la communauté. Le ZYM sera le carburant de la dapp (Token Ethereum) et assura par la qualité de ses transferts (QR-codes), la bonne existence des membres de la communauté. De plus des technologie de pointe comme IPFS, pour les contenus et les notifications locales, ainsi que le Bluetooth Low Energy seront utilisées.`}
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
