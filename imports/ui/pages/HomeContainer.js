import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import Home from './Home'

export default HomeContainer = withTracker(({children}) => {
  const user = Meteor.user()
  return {
    user,
    children
  }
})(Home)
