import {Accounts} from 'meteor/accounts-base'
import {Meteor}   from 'meteor/meteor'

export default ({username, password}) => {
  if(!Meteor.users.findOne({username})) {
    console.log(`create account for ${username}`)
    Accounts.createUser({username, password})
  }
}
