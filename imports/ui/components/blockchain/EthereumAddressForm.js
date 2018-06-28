import React from 'react'
import web3  from 'web3'
import setEthAddress from '/imports/api/referrers/methods/setEthAddress'
import Button from '../Button'
import T      from '../Translator'


export default class EthereumAddressForm extends React.Component {
  static getDerivedStateFromProps(props, {ethAddress, submitted}) {
    if(submitted || ethAddress) return
    console.log(this)
    const res = EthereumAddressForm.getFromMetaMask()
    console.log(res)
    return res
  }
  static getFromMetaMask = () => {
    const web3 = window.web3
    //const isMist = typeof window.mist !== 'undefined'
    let ethAddress
    try {
      if(web3 && web3.eth) {
        ethAddress = web3.eth.accounts[0] || ''
      }
    } catch(e) {
      //MetaMask/Mist temporary network error could throw exception
    }
    const hasMetaMask = web3 && web3.currentProvider && web3.currentProvider.isMetaMask
    return {
      ethAddress,
      hasMetaMask,
      metaMaskLoggedOut: hasMetaMask && !ethAddress,
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      ethAddress: '',
      submitted:  false,
    }
  }
  render() {    
    const {ethAddress, metaMaskLoggedOut, submitted} = this.state
    console.log(metaMaskLoggedOut)
    if(submitted) {
      return (
        <div><T>Blockchain.addressSaved</T></div>
      )
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label><T>Blockchain.ethAddress</T></label>
          <input
            size="42" type="text" value={ethAddress}
            onChange={e => this.updateAddress(e.target.value)}
          />
          <Button type="submit"><T>Common.submit</T></Button>
        </div>
        {metaMaskLoggedOut &&
          <div>
            <T>Blockchain.metaMaskLoggedOut</T>
            <Button onClick={this.reload}><T>Blockchain.reload</T></Button>
          </div>
        }
      </form>
    )
  }
  updateAddress = (ethAddress) => this.setState({ethAddress})
  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.ethAddress)
    this.setState({submitted: true})
    setEthAddress.call({
      ethAddress: this.state.ethAddress,
      referrerId: this.props.referrerId,
    })
  }
  reload = () => {
    this.props.reload()
  }
}