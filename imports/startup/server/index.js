import {Meteor}   from 'meteor/meteor'

import '/imports/api/counters/server/publications'
import '/imports/api/referrers/server/publications'
import '/imports/api/referrers/server/updateRanks'
import {onUserCreate} from '/imports/api/users/server/newUserHook'
import saveReferrer   from '/imports/api/referrers/server/saveReferrer'
import {Counters}     from '/imports/api/counters/Counters'
//import './fixtures'
import './initRanks'
import './login-config'
import './passwordless-config'

onUserCreate('saveRefferer', saveReferrer)
onUserCreate('updateCounter', () => Counters.upsertCollectionCount(Meteor.users))
