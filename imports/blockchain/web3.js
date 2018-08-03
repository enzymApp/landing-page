import Web3             from 'web3'
import * as abis from './abi'

require('events').EventEmitter.prototype._maxListeners = 100

const web3 = new Web3()

export default web3
let gasPrice
let smartContracts
let lastNonce
let provider

export function connectWeb3({_rpcUrl, _gasPrice, _privateKey, _smartContracts}) {
  gasPrice = _gasPrice
  smartContracts = _smartContracts
  web3.eth.accounts.wallet.add('0x' + _privateKey)
  web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
  setProvider(web3, _rpcUrl)
}

function setProvider(web3, _rpcUrl) {
  provider = new Web3.providers.WebsocketProvider(_rpcUrl)

  //listen for disconnects
  provider.on('error', e => console.error(e))
  provider.on('end', e => {
    console.error("disconnected", e.reason)
    provider = new Web3.providers.WebsocketProvider(_rpcUrl)
    web3.setProvider(provider)
  })
  web3.setProvider(provider)
}

export async function getNonce() {
  if(!lastNonce) {
    lastNonce = await web3.eth.getTransactionCount(web3.eth.accounts.wallet[0].address)
  }
  return lastNonce + 1
}

export async function saveNonce(value) {
  lastNonce = value
}

export function disconnectWeb3() {
  console.log("finished")
}


export function getContract(name) {
  const abi = abis[name]
  const address = smartContracts[name]
  if(!abi || !address) throw new Error('CONTRACT_NOT_FOUND')

  return new web3.eth.Contract(abi, address, {from: web3.eth.defaultAccount, gasPrice})
}
