import React from 'react'
import Loading from '../components/Loading'

export default (Component) => ({loading, ...props}) => {
  console.log(loading, props)
  if(loading) return <Loading />
  return <Component {...props} />
}
