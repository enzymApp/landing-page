import React from 'react'
import FacebookShare             from '/imports/ui/components/FacebookShare'
import TwitterShare              from '/imports/ui/components/TwitterShare'
import TelegramShare              from '/imports/ui/components/TelegramShare'

export default () => {
  return (
      <div className="social_shares">
        <FacebookShare />
        <TwitterShare />
        <TelegramShare />
      </div>
  )
}
