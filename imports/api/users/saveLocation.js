
const token = Meteor.settings.ipinfoToken

export default function saveLocation(user, {clientAddress}) {
  if(clientAddress === '127.0.0.1') return
  if(user && user.profile && user.profile.city) return
  console.log("missing localization data", clientAddress)
  const {data} = HTTP.call('GET', `https://ipinfo.io/${clientAddress}?token=${token}`)
  const {ip, bogon, city, region, country, loc, org} = data
  if(bogon) {
    console.error(ip, city, region, country, loc, org)
    return
  }
  const profile = {
    ...user.profile,
    city,
    region,
    country,
    geoloc: loc,
  }
  Meteor.users.update(user._id, {$set: {profile}})
}