import React from 'react'
import Routes              from '/imports/ui/components/Routes'
import IsLoggedInContainer from '/imports/ui/components/IsLoggedInContainer'
import './index.css'; 

export default () => {
  return (
    <div>
      <Routes />
      <IsLoggedInContainer />
    </div>
  )
}
