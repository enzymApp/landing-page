import {Meteor}  from 'meteor/meteor'

const funList = {}

Meteor.setTimeout(() => {
  Meteor.users.find(
    {},
    {
      //disableOplog: true,
      //pollingIntervalMs: 10000,
    }
  )
  .observeChanges({
    added(_id, user) {
      Object.keys(funList)
      .map(name => {
        funList[name](_id, user)
      })
    }
  })
}, 3000)



export function onUserCreate(name, fun) {
  funList[name] = fun
}
