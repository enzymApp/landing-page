import React from 'react'
import T from '../Translator'

export default ({ethAddress, zyms}) => {
  if(ethAddress) return <T {...{ethAddress, zyms}}>Blockchain.nbOfTokensDistributed</T>
  return <T zyms={zyms}>Blockchain.nbOfTokensWaiting</T>
}
