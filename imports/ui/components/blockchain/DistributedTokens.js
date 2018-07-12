import React from 'react'
import T from '../Translator'

export default ({hasAddress, zyms}) => {
  if(hasAddress) {
    return (
      <T zyms={zyms}>Blockchain.nbOfTokensDistributed</T>
    )
  }
  return (
    <T zyms={zyms}>Blockchain.nbOfTokensWaiting</T>
  )
}