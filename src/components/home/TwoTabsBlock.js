import React      from 'react'
import {Row, Col} from 'reactstrap'
import { FormattedMessage as T } from 'react-intl'


class TwoTabsBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {visibleTab: 1}
  }
  render() {
    const {visibleTab} = this.state
    return (
      <div>
        <Row>
          <Col className="titletab_ethique" xs="6" onClick={this.selectTab(1)} style={{boxShadow: (visibleTab == 2 ? "inset 0px 0px 83px -18px rgba(0,0,0,0.75)" : "none")}}>
            <T id="home.ethics.title" />
          </Col>
          <Col className="titletab_innovant" xs="6" onClick={this.selectTab(2)} style={{boxShadow: (visibleTab == 1 ? "inset 0px 0px 83px -18px rgba(0,0,0,0.75)" : "none")}}>
            <T id="home.innov.title" />
          </Col>
        </Row>
        {visibleTab === 1 && (
          <div className="tab_ethique">
            <Row className="container">
              <Col xs="12" sm="8">
                <p><T id="home.ethics.p1" /></p>
                <p><T id="home.ethics.p2" /></p>
              </Col>
              <Col xs="12" sm="4">
                <img src="/images/picto_ethique.png" />
              </Col>
            </Row>
          </div>
        )}
        {visibleTab === 2 && (
          <div className="tab_innovant">
            <Row className="container">
              <Col xs="12" sm="4">
                <img src="/images/picto_innovant.png" />
              </Col>
              <Col xs="12" sm="8">
                <p><T id="home.innov.p1" /></p>
                <p><T id="home.innov.p2" /></p>
              </Col>
            </Row>
          </div>
        )}
      </div>
    )
  }
  selectTab = (idx) => () => {
    this.setState({visibleTab: idx})

  }
}

export default TwoTabsBlock
