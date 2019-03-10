import React  from 'react'
import { FormattedMessage as T } from 'react-intl'
import { compose, withProps } from 'recompose'
import withLoading   from '../helpers/withLoading'

const ReferrerLinks = ({ referrer, user }) => {
  const referrerUrl = referrer.getUrl()
  const email = user.email()
  return (
    <div className="referral_text">
      <p>
        {email &&
          <span><T id="common.signup.loggedInWithEmail" values={{ email: email.address }} /></span>
        }
        <br />
        <span className="share_text">
          <T id="common.referrer.shareLink" />
        </span>
      </p>
      <b><a href={referrerUrl}>{referrerUrl}</a></b>
    </div>
  )
}

export default compose(
  withProps(({ referrer }) => ({
    loading: !referrer,
  })),
  withLoading,
)(ReferrerLinks)
