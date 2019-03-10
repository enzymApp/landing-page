import {Meteor}    from 'meteor/meteor'
import {Random}    from 'meteor/random'
import {Referrers} from '/src/api/referrers/Referrers'

const LOCATIONS = [
  {city: 'Lyon',     geoloc: '45.7578,4.8351'},
  {city: 'Grenoble', geoloc: '45.1841,5.7154'},
  {city: 'Paris',    geoloc: '48.8589,2.3469'},
  {city: 'Nantes',   geoloc: '47.2383,-1.5603'},
  {city: 'Bordeaux', geoloc: '44.8635,-0.5862'},
  {city: 'New York', geoloc: '40.6971,-73.9796'},
  {city: 'Moscou',   geoloc: '55.7251,37.6290'},
  {city: 'Madrid',   geoloc: '40.4781,-3.7034'},
  {city: 'Montréal', geoloc: '45.5576,-73.7232'},
  {city: 'Londres',  geoloc: '51.5076,-0.1276'},
  {city: 'Montréal', geoloc: '45.5576,-73.7232'},
  {city: 'Mumbai',   geoloc: '19.0822,72.8780'},
]

Meteor.startup(() => {
  const count = Referrers.find().count()
  const missingCount = Math.max(0, 100 - count)
  if(missingCount) {
    const data = []
    for(let i = 0 ; i < missingCount ; i++) {
      const location = Random.choice(LOCATIONS)
      const nb = Math.floor(Math.random() * 100000)
      const userId = Meteor.users.insert({
        username: `username${nb}`,
        emails: [],
        createdAt: Date.now(),
        profile: {
          newsletter: Math.random() > 0.5,
          ...location,
        }
      })
      Referrers.insert({
        referrals: addReferrals(Math.floor(Math.random() * 10)),
        userId,
        ...location,
      })
    }
  }
})

function addReferrals(n) {
  return Array(n).fill().map(() => 'fezoijfoiezf')
}
