import Web3             from 'web3'
import ProviderEngine   from 'web3-provider-engine'
import CacheSubprovider from 'web3-provider-engine/subproviders/cache'
import NonceSubprovider from 'web3-provider-engine/subproviders/nonce-tracker'
import RpcSubprovider   from 'web3-provider-engine/subproviders/rpc'
import * as abis from './abi'

require('events').EventEmitter.prototype._maxListeners = 100

//emitter.setMaxListeners(1000)

const engine = new ProviderEngine()
const web3 = new Web3(engine)

export default web3
export let gasPrice
let smartContracts

export function connectWeb3({_rpcUrl, _gasPrice, _privateKey, _smartContracts}) {
  gasPrice = _gasPrice
  smartContracts = _smartContracts
  const account = web3.eth.accounts.privateKeyToAccount('0x' + _privateKey)
  web3.eth.defaultAccount = account.address

  engine.addProvider(new CacheSubprovider())
  engine.addProvider(new NonceSubprovider())
  engine.addProvider(new RpcSubprovider({
    rpcUrl: _rpcUrl
  }))
  /*engine.on('block', function(block){
    console.log('================================')
    console.log('BLOCK CHANGED:')
    console.log(block)
    console.log('================================')
  })*/
  engine.on('error', function(err){
    console.error(err.stack)
  })
  engine.start()

}

export function disconnectWeb3() {
  engine.stop()
}


export function getContract(name) {
  const abi = abis[name]
  const address = smartContracts[name]
  if(!abi || !address) throw new Error('CONTRACT_NOT_FOUND')

  return new web3.eth.Contract(abi, address, {from: web3.eth.defaultAccount, gasPrice})
}
