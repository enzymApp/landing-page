import React  from 'react'
import T from './Translator'

export default ({referrer, user}) => {
  const referrerUrl = referrer.getUrl()
  const email = user.email()
  return (
    <div className="referral_text">
      <p>
        {email && <span><T email={email.address}>Common.signup.loggedInWithEmail</T></span>}
        <br/>
        <span className="share_text">
          <T>Common.referrer.shareLink</T>
        </span>
      </p>
      <b><a href={referrerUrl}>{referrerUrl}</a></b>
    </div>
  )
}
