import React  from 'react'
import {Link} from 'react-router-dom'

export default ({referrer}) => {
  const referrerUrl = referrer.getUrl()
  return (
    <div>
      Vous êtes inscrit avec l'adresse <Link to={referrerUrl}>{referrerUrl}</Link>
    </div>
  )
}
