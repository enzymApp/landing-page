import {Meteor}  from 'meteor/meteor'

const funList = {}


Meteor.users.find(
  {
    createdAt: {$gt: new Date()}
  },
  {
    //disableOplog: true,
    //pollingIntervalMs: 10000,
  }
)
.observeChanges({
  added(_id) {
    const user = Meteor.users.findOne(_id)
    console.log(_id, user)
    Object.keys(funList)
    .map(name => {
      funList[name](_id, user)
    })
  }
})


export function onUserCreate(name, fun) {
  funList[name] = fun
}
