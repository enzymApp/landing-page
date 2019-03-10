import React from 'react'
import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'


const IsLoggedIn = ({userId}) => {
  if(!userId) return null
  return (
    <div>
      {userId}
      <button onClick={() => Meteor.logout()}>logout</button>
    </div>
  )
}

export default withTracker(() => {
  const userId = Meteor.userId()
  return {
    userId
  }
})(IsLoggedIn)
