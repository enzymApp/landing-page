import React  from 'react'
import {Link} from 'react-router-dom'

export default ({referrer, user}) => {
  const referrerUrl = referrer.getUrl()
  const email = user.email()
  return (
    <div className="referral_text">
      <p>
        {email && <span>Vous êtes inscrit avec l'adresse {email.address}.</span>}
        <br/>
        <span>
          Partagez votre intérêt avec le lien ci-dessous ou sur les réseaux sociaux, et gagnez des cadeaux !
        </span>
      </p>
      <b><Link to={referrerUrl}>{referrerUrl}</Link></b>
    </div>
  )
}
