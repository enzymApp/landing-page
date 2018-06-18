import {withTracker} from 'meteor/react-meteor-data'

import withLoading   from '../helpers/withLoading'
import ReferrerLinks from './ReferrerLinks'


export default withTracker(({referrer, user}) => {
  return {
    loading: !referrer,
    referrer,
    user,
  }
})(withLoading(ReferrerLinks))
