import {Accounts} from 'meteor/accounts-base'
import {HTTP}     from 'meteor/http'

Accounts.passwordless.config = {
  ...Accounts.passwordless.config,
  codeType:            'url',
  emailFrom:           Meteor.settings.emailFrom,
  validationRoutePath: '/validation',
  tokenLifeTime:       15 * 60,
}
Accounts.passwordless.emailTemplates = {
  ...Accounts.passwordless.emailTemplates,
}
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
