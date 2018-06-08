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


Accounts.passwordless.handleClientIpAddress = (profile, clientIpAddress) => {
  const token = Meteor.settings.ipinfoToken
  if(clientIpAddress === '127.0.0.1') return profile
  const {data} = HTTP.call('GET', `https://ipinfo.io/${clientIpAddress}?token=${token}`)
  const {ip, bogon, city, region, country, loc, org} = data
  if(bogon) {
    console.error(ip, city, region, country, loc, org)
    return
  }
  return {...profile, city, region, country, geoloc: loc}
}

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
