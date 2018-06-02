import React  from 'react'
import {Link} from 'react-router-dom'

export default ({referrer}) => {
  const referrerUrl = referrer.getUrl()
  return (
    <div>
      URL de parrainage : <Link to={referrerUrl}>{referrerUrl}</Link>
    </div>
  )
}
