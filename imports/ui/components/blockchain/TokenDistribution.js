import {Meteor} from 'meteor/meteor'
import React    from 'react'
import DistributedTokens from './DistributedTokens'
import GetTokens         from './GetTokens'

export default ({referrer, user}) => (
  <div>
    <DistributedTokens
      hasAddress={!!referrer.ethAddress}
      tokens={referrer.tokens}
    />
    {!referrer.ethAddress &&
      <GetTokens
        referrerId={referrer._id}
        isReferrer={referrer.userId === Meteor.userId()}
        authMean={user.authMean}
      />
    }
  </div>
)