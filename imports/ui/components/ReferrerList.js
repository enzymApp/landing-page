import React from 'react'
import {Table} from 'reactstrap'

export default ({list}) => {

  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>Username</th>
          <th>Rank</th>
          <th>Best rank</th>
        </tr>
      </thead>
      <tbody>
        {list.map(({userId, username, rank, bestRank}) => (
          <tr key={userId}>
            <td>{userId}</td>
            <td>{rank}</td>
            <td>{bestRank}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
