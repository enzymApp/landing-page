import React from 'react'
import Routes              from '/imports/ui/components/Routes'
import IsLoggedInContainer from '/imports/ui/components/IsLoggedInContainer'

export default ({userId}) => {
  console.log("userId", userId)
  return (
    <div>
      <Routes />
      <IsLoggedInContainer />
    </div>
  )
}
