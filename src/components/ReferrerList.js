import {Meteor}      from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import React from 'react'
import {Table} from 'reactstrap'
import { FormattedMessage as T } from 'react-intl'
import { compose, withProps, lifecycle } from 'recompose'
import {Referrers}   from '/src/api/referrers/Referrers'
import withLoading   from '../helpers/withLoading'
import SetUsername   from './SetUsername'

const ReferrerList = ({ list, centerId }) => (
  <Table striped responsive>
    <thead>
      <tr>
        <th><T id="referrer.table.rank" /></th>
        <th><T id="referrer.table.username" /></th>
        <th><T id="referrer.table.points" /></th>
      </tr>
    </thead>
    <tbody>
      {list.map(({_id, username, rank, referralCount}) => (
        <tr key={_id} className={_id === centerId ? "centered-user" : ""} id={_id}>
          <td>{rank}</td>
          <td>
            {username || _id === centerId && <SetUsername /> || <T id="referrer.username" />}
          </td>
          <td>{referralCount}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)

const centerListOn = (id) => {
  if(!id) return
  const elm = document.getElementById(id)
  if(!elm) return
  elm.scrollIntoView({block: 'center'})
}

const MIN_COUNT = 1000

export default compose(
  withTracker(({ referrer }) => {
    // const minRank = referrer && referrer.rank ? Math.max(1, referrer.rank - 1) : 1
    // const maxRank = referrer && referrer.rank ? referrer.rank + 1 : 1000
    const minRank = 1
    const maxRank = MIN_COUNT
    Meteor.subscribe('referrers.list', MIN_COUNT, minRank, maxRank)
    const list = Referrers.paginatedListCentered(MIN_COUNT, minRank, maxRank)
      .map(referrer => {
        return {
          ...referrer,
          username: (referrer.userId &&
            Meteor.users.findOne(
              {_id: referrer.userId},
              {fields: { username: 1 }}
            ) || {}
          ).username
        }
      })
    return {
      centerId: referrer && referrer._id,
      list,
      minRank,
      maxRank,
    }
  }),
  withProps(({ list }) => ({
    loading: list.length < 2,
  })),
  withLoading,
  lifecycle({
    componentDidMount() {
      const {centerId} = this.props
      centerListOn(centerId)
    }
  })
)(ReferrerList)
