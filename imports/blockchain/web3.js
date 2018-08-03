import Web3           from 'web3'
import Queue          from 'promise-queue'
import * as abis from './abi'

require('events').EventEmitter.prototype._maxListeners = 100

const web3 = new Web3()

export default web3
export const transactionQueue = new Queue(1, Infinity)

const connection = {
  isConnected: false,
}
const config = {}

setInterval(() => {
  if(!connection.isConnected && connection.rpcUrl) {
    connectWeb3(connection)
  }
}, 500)

export function connectWeb3({privateKey, rpcUrl, gasPrice=config.gasPrice, smartContracts=config.smartContracts}) {
  config.gasPrice = gasPrice
  config.smartContracts = smartContracts
  connection.privateKey = privateKey
  web3.eth.accounts.wallet.add('0x' + privateKey)
  web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
  setProvider(web3, rpcUrl)
}

function setProvider(web3, rpcUrl) {
  const provider = new Web3.providers.WebsocketProvider(rpcUrl)
  provider.on('connect', async () => {
    console.log("connected to blockchain")
    connection.isConnected = true
    connection.rpcUrl = rpcUrl
    console.log("gasPrice", web3.utils.fromWei(await web3.eth.getGasPrice(), 'gwei'))
  })
  provider.on('error', e => console.error(e))
  provider.on('end', e => {
    console.error("disconnected", e.reason)
    connection.isConnected = false
  })
  web3.setProvider(provider)
}


export function disconnectWeb3() {
  console.log("finished")
  connection.rpcUrl = ''
}


export function getContract(name) {
  const abi = abis[name]
  const address = config.smartContracts[name]
  if(!abi || !address) throw new Error('CONTRACT_NOT_FOUND')

  return new web3.eth.Contract(abi, address, {
    from:     web3.eth.defaultAccount,
    gasPrice: config.gasPrice,
  })
}
