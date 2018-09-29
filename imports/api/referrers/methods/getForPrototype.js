import {ValidatedMethod} from 'meteor/mdg:validated-method'
import {Meteor}          from 'meteor/meteor'
import SimpleSchema      from 'simpl-schema'
import {Referrers} from '../Referrers'

export default new ValidatedMethod({
  name: 'referrers.getForPrototype',
  validate: new SimpleSchema({
    email: {type: String, regEx: SimpleSchema.RegEx.Email},
  }).validator(),
    run({ email }) {
    const {username} = Meteor.settings.prototypeDdp
    console.log(this.userId, this.connection)
    const caller = Meteor.user()
    if(!caller)                      throw new Meteor.Error('LOGIN_REQUIRED')
    if(caller.username !== username) throw new Meteor.Error('UNAUTHORIZED')
    const user = Meteor.users.getFromEmail(email, {}).fetch()[0]
    if(!user) return
    const referrer = Referrers.findOne({userId: user._id})
    console.log(user)
    console.log(referrer)
    return {
      landingPageUserId: user._id,
      username:          user.username,
      ethAccount:        referrer.ethAccount,
      referringToken:    referrer.token,
    }
  }
})
