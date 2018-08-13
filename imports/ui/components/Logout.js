import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React         from 'react'
import {Redirect}    from 'react-router'
import Loading from './Loading'

export default withTracker(() => {
  return {
    userId: Meteor.userId()
  }
})(
  class Logout extends React.Component {
    componentDidMount() {
      Meteor.logout()
    }
    render() {
      const { userId } = this.props
      if(userId) return <Loading />
      return <Redirect to="/" />
    }
  }
)
