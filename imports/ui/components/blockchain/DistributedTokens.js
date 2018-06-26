import React from 'react'
import T from '../Translator'

export default ({hasAddress, tokens}) => {
  if(hasAddress) {
    return (
      <T tokens={tokens}>Blockchain.nbOfTokensDistributed</T>
    )
  }
  return (
    <T tokens={tokens}>Blockchain.nbOfTokensWaiting</T>
  )
}