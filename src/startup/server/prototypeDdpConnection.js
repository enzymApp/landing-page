import {Accounts} from 'meteor/accounts-base'
import {Meteor}   from 'meteor/meteor'

export default (settings) => {
  if(!settings) return
  const {username, password} = settings
  if(!Meteor.users.findOne({username})) {
    console.log(`create account for ${username}`)
    Accounts.createUser({username, password, profile: {technical: true}})
  }
}
