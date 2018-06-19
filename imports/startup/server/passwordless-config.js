import {Accounts} from 'meteor/accounts-base'
import {HTTP}     from 'meteor/http'

import emailVerificationTemplate from './emailVerificationTemplate'

const RECAPTCHA_SECRET = Meteor.settings.recaptchaSecret
const RECAPTCHA_MIN_HUMAN_SCORE = 0.5

Accounts.passwordless.config = {
  ...Accounts.passwordless.config,
  codeType:            'url',
  emailFrom:           Meteor.settings.emailFrom,
  validationRoutePath: '/validation',
  tokenLifeTime:       15 * 60,
}
Accounts.passwordless.emailTemplates.sendVerificationUrl = emailVerificationTemplate

Accounts.passwordless.onSendVerificationCode = (
  selector, username, profile, options, connection
) => {
  const {data} = HTTP.post('https://www.google.com/recaptcha/api/siteverify', {
    params: {
      secret:   RECAPTCHA_SECRET,
      response: options.recaptchaToken,
      remoteip: connection.clientAddress
    }
  })
  if(data.score < RECAPTCHA_MIN_HUMAN_SCORE) {
    return {locked: true}
  }
}
