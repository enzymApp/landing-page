import Web3 from 'web3'


const web3 = new Web3(new Web3.providers.HttpProvider(
  Meteor.settings.web3.provider
))
web3.eth.defaultAccount = Meteor.settings.web3.defaultAccount

export default web3

export const gasPrice = web3.toWei(5, 'gwei')

export function getContract(name) {
  import abi from './abi/referring.json'
  const address = Meteor.settings.smartContracts[name]
  
  if(!abi || !address) throw Meteor.Error('CONTRACT_NOT_FOUND')
  
  return web3.eth.contract(abi).at(address)
}