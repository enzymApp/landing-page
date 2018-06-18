import React from 'react'
import FacebookShare             from '/imports/ui/components/FacebookShare'
import TelegramShare             from '/imports/ui/components/TelegramShare'
import TwitterShare              from '/imports/ui/components/TwitterShare'

export default () => {
  return (
      <div className="social_shares">
        <FacebookShare />
        <TwitterShare />
        <TelegramShare />
      </div>
  )
}
