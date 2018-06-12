import React  from 'react'
import {Link} from 'react-router-dom'

export default ({referrer}) => {
  const referrerUrl = referrer.getUrl()
  return (
    <div className="referral_text">
      <p>Vous êtes inscrit avec l'adresse xxx@xxx.com.
        <br/>
        <span>
          Partagez votre intérêt avec le lien ci-dessous ou sur les réseaux sociaux, et gagnez des cadeaux !
        </span>
      </p>
      <b><Link to={referrerUrl}>{referrerUrl}</Link></b>
    </div>
  )
}
