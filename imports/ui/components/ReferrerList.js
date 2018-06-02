import React from 'react'
import {Table} from 'reactstrap'

export default ({list, referrer}) => {
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>Username</th>
          <th>Parrainés</th>
          <th>Rank</th>
          <th>Best rank</th>
        </tr>
      </thead>
      <tbody>
        {list.map(({userId, username, rank, bestRank, referralCount}) => (
          <tr key={userId}>
            <td>
              {userId === referrer.userId &&
                <b>{userId}</b> ||
                userId
              }
          </td>
            <td>{referralCount}</td>
            <td>{rank}</td>
            <td>{bestRank}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
