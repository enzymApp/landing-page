import React      from 'react'
import {Row, Col} from 'reactstrap'
import T from '../Translator'


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
          <Col className="titletab_ethique" xs="6" onClick={this.selectTab(1)} style={{boxShadow: (this.state.visibleTab == 2 ? "inset 0px 0px 83px -18px rgba(0,0,0,0.75)" : "none")}}>
            <T>Home.ethics.title</T>
          </Col>
          <Col className="titletab_innovant" xs="6" onClick={this.selectTab(2)} style={{boxShadow: (this.state.visibleTab == 1 ? "inset 0px 0px 83px -18px rgba(0,0,0,0.75)" : "none")}}>
            <T>Home.innov.title</T>
          </Col>
        </Row>
        {visibleTab === 1 && (
          <Row className="tab_ethique">
            <Col xs="8">
              <p><T>Home.ethics.p1</T></p>
              <p><T>Home.ethics.p2</T></p>
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
              <p><T>Home.innov.p1</T></p>
              <p><T>Home.innov.p2</T></p>
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
