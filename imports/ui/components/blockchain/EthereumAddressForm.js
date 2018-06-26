import React from 'react'
import Button from '../Button'
import T      from '../Translator'

export default class EthereumAddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address:   '',
      submitted: false
    }
  }
  render() {
    const {address, submitted} = this.state
    if(submitted) {
      return (
        <T>Blockchain.addressSaved</T>
      )
    }
    return (
      <form>
        <div>
          <label><T>Blockchain.ethAddress</T></label>
          <input type="text" value={address} />
        </div>
        <Button type="submit"><T>Common.submit</T></Button>
      </form>
    )
  }
}