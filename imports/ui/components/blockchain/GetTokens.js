import React  from 'react'
import {Link} from 'react-router-dom'
import Button              from '../Button'
import T, {translate}      from '../Translator'
import EthereumAddressForm from './EthereumAddressForm'

export default class GetTokens extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReferrer:      props.isReferrer,
      itsMe:           false,
      showForm:        false,
      forceReloadForm: 0,
    }
  }
  render() {
    const {authMean, referrerId} = this.props
    const {isReferrer, itsMe, showForm, forceReloadForm} = this.state
    if(showForm) {
      return (
        <EthereumAddressForm
          {...{referrerId}}
          reload={this.reloadForm}
          forceReload={forceReloadForm}
        />
      )
    }
    if(isReferrer) {
      return (
        <div>
          <Button onClick={this.showForm}><T>Blockchain.getMyTokens</T></Button>
        </div>
      )
    }
    if(itsMe) {
      const via = translate(`Blockchain.via_${authMean}`)
      return (
        <div>
          <T via={via}>Blockchain.sessionExpired</T>
          {' '}
          <Link to="/logout"><T>Blockchain.homePageLink</T></Link>
        </div>
      )
    }
    return (
      <div>
        <Button onClick={this.itsMe}><T>Blockchain.itsMe</T></Button>
      </div>
    )
  }
  itsMe = () => {
    this.setState({itsMe: true})
  }
  showForm = () => {
    this.setState({showForm: true})
  }
  reloadForm = () => {
    console.log("reload")
    this.setState({forceReloadForm: this.state.forceReloadForm + 1})
  }
}
