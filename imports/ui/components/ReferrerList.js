import React from 'react'
import {Table} from 'reactstrap'

export default ({list, referrer}) => {
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Parrainés</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {list.map(({userId, username, rank, referralCount}) => (
          <tr key={userId}>
            <td>{rank}</td>
            <td>
              {userId === referrer.userId &&
                <b>{username || userId}</b> ||
                username || userId
              }
            </td>
            <td>{referralCount}</td>
            <td>{referralCount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
