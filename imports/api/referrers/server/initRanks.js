import {Meteor}  from 'meteor/meteor'
import {Referrers} from '../Referrers'
import updateRanks from './updateRanks'


export default () => {
  updateRanks(Referrers)

  Referrers.find(
    {},
    {
      sort:   Referrers.rankBaseSort,
      fields: {_id: 1, zyms: 1, createdAt: 1},
      //disableOplog: true,
      //pollingIntervalMs: 10000,
    }
  )
  .observeChanges({
    changed(_id, {zyms}) {
      if(typeof zyms === 'undefined') return
      const referrer = Referrers.findOne(_id, {fields: {zyms: 1}})
      if(zyms > referrer.zyms) {
        updateRanks(Referrers, zyms)
      } else {
        updateRanks(Referrers, referrer.zyms)
      }
    }
  })
}
