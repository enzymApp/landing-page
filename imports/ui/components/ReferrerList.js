import React from 'react'
import {Table} from 'reactstrap'

export default class ReferrerList extends React.Component {
  componentDidUpdate(prevProps) {
    const {centerId} = prevProps
    if(centerId) {
      document.getElementById(centerId)
      .scrollIntoView({block: 'center'})
    }
  }
  render() {
    const {list, centerId} = this.props
    const tbodyStyle = {
      display:   'block',
      maxHeight: '300px',
      overflowY: 'scroll',
      width:     '100%',
    }
    const trStyle = {
      display:     'table',
      width:       '100%',
      tableLayout: 'fixed',
    }
    return (
      <Table striped responsive>
        <thead>
          <tr style={trStyle}>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody style={tbodyStyle}>
          {list.map(({_id, userId, username, rank, referralCount}) => (
            <tr key={_id} style={trStyle} id={_id}>
              <td>{rank}</td>
              <td>
                {_id === centerId &&
                  <b>{username || 'pseudo'}</b> ||
                  username || _id
                }
              </td>
              <td>{referralCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}
