import React from 'react'
import {Table} from 'reactstrap'

export default class ReferrerList extends React.Component {
  componentDidUpdate(prevProps) {
    const {referrer} = prevProps
    document.getElementById(referrer.userId)
    .scrollIntoView({block: 'center'})
  }
  render() {
    const {list, referrer} = this.props
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
          {list.map(({userId, username, rank, referralCount}) => (
            <tr key={userId} style={trStyle} id={userId}>
              <td>{rank}</td>
              <td>
                {userId === referrer.userId &&
                  <b>{username || userId}</b> ||
                  username || userId
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
