import React  from 'react'

export default ({referrer, user}) => {
  const referrerUrl = referrer.getUrl()
  const email = user.email()
  return (
    <div className="referral_text">
      <p>
        {email && <span>Tu es inscrit avec l'adresse {email.address}.</span>}
        <br/>
        <span className="share_text">
          Partage ton intérêt avec le lien ci-dessous ou sur les réseaux sociaux, et gagne des cadeaux !
        </span>
      </p>
      <b><a href={referrerUrl}>{referrerUrl}</a></b>
    </div>
  )
}
