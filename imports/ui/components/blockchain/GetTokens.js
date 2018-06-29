import React  from 'react'
import {Link} from 'react-router-dom'
import Button              from '../Button'
import T, {translate}      from '../Translator'
import EthereumAddressForm from './EthereumAddressForm'

export default class GetTokens extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReferrer: props.isReferrer,
      itsMe:    false,
      showForm: false,
    }
  }
  render() {
    const {authMean} = this.props
    const {isReferrer, itsMe, showForm} = this.state
    const authMeanText = (() => {})
    if(showForm) {
      return (
        <EthereumAddressForm />
      )
    }
    if(isReferrer) {
      return (
        <Button onClick={this.showForm}><T>Blockchain.getMyTokens</T></Button>
      )
    }
    if(itsMe) {
      const via = translate(`Blockchain.via_${authMean}`)
      return (
        <div>
          <T via={via}>Blockchain.sessionExpired</T>
          {' '}
          <Link to="/"><T>Blockchain.homePageLink</T></Link>
        </div>
      )
    }
    return (
      <Button onClick={this.itsMe}><T>Blockchain.itsMe</T></Button>
    )
  }
  itsMe = () => {
    this.setState({itsMe: true})
  }
  showForm = () => {
    this.setState({showForm: true})
  }
}