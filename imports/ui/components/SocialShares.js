import React from 'react'
import FacebookShare             from '/imports/ui/components/FacebookShare'
import TelegramShare             from '/imports/ui/components/TelegramShare'
import TwitterShare              from '/imports/ui/components/TwitterShare'

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
