import React from 'react'
import Web3  from 'web3'
import setEthAddress from '/imports/api/referrers/methods/setEthAddress'
import Button from '../Button'
import T      from '../Translator'


export default class EthereumAddressForm extends React.Component {
  state = {
    account:    '',
    submitted:  false,
  }
  componentDidMount() {
    this.accountInterval = setInterval(this.getFromInjectedWeb3, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.accountInterval)
  }
  render() {
    const {account, metaMaskLoggedOut, submitted} = this.state
    console.log(metaMaskLoggedOut)
    if(submitted) {
      return (
        <div><T>Blockchain.addressSaved</T></div>
      )
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label><T>Blockchain.account</T></label>
          <input
            size="42" type="text" value={account}
            onChange={e => this.updateAddress(e.target.value)}
          />
          <Button type="submit"><T>Common.submit</T></Button>
        </div>
        {metaMaskLoggedOut &&
          <div>
            <T>Blockchain.metaMaskLoggedOut</T>
          </div>
        }
      </form>
    )
  }
  getFromInjectedWeb3 = async () => {
    if(window.web3 && window.web3.currentProvider) {
      this.web3 = new Web3(window.web3.currentProvider)
      try {
        //const isMist = typeof window.mist !== 'undefined'
        const account = (await this.web3.eth.getAccounts())[0] || ''
        const metaMaskLoggedOut = this.web3.currentProvider.isMetaMask && !account
        if (account !== this.state.account) {
          this.setState({account, metaMaskLoggedOut})
        } else if(metaMaskLoggedOut !== this.state.metaMaskLoggedOut) {
          this.setState({metaMaskLoggedOut})
        }
      } catch(e) {
        console.log(e)
        //MetaMask/Mist temporary network error could throw exception
      }
    }
  }
  updateAddress = (account) => this.setState({account})
  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.account)
    this.setState({submitted: true})
    setEthAddress.call({
      account: this.state.account,
      referrerId: this.props.referrerId,
    })
  }
}
