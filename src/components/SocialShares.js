import React from 'react'
import FacebookShare             from '/src/components/FacebookShare'
import TelegramShare             from '/src/components/TelegramShare'
import TwitterShare              from '/src/components/TwitterShare'

export default ({referrer}) => {
  const referrerUrl = referrer.getUrl()
  return (
    <div className="social_shares">
      <FacebookShare referrerUrl={referrerUrl} />
      <TwitterShare referrerUrl={referrerUrl} />
      <TelegramShare referrerUrl={referrerUrl} />
    </div>
  )
}
