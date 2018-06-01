import {Meteor}   from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import {HTTP}     from 'meteor/http'
import '/imports/api/referrer/server/publications'
import '/imports/api/referrer/server/saveReferrer'
import '/imports/api/referrer/server/updateRanks'

Meteor.startup(() => {
  // code to run on server at startup
  Accounts.passwordless.config = {
    ...Accounts.passwordless.config,
    codeType:            'url',
    emailFrom:           'no-reply@enzym.io',
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
})
