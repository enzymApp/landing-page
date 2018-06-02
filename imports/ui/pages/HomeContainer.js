import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import Home from './Home'

export default HomeContainer = withTracker(({children}) => {
  const userId = Meteor.userId()
  return {
    userId,
    children
  }
})(Home)
