import React from 'react'
import {Table} from 'reactstrap'
import SetUsername from './SetUsername'

export default class ReferrerList extends React.Component {
  componentDidUpdate(nextProps) {
    const {centerId} = nextProps
    this.centerListOn(centerId)
  }
  componentDidMount() {
    const {centerId} = this.props
    this.centerListOn(centerId)
  }
  render() {
    const {list, centerId} = this.props

    return (
    <div>
      <Table striped responsive>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {list.map(({_id, userId, username, rank, referralCount}) => (
            <tr key={_id} className={_id === centerId ? "centered-user" : ""} id={_id}>
              <td>{rank}</td>
              <td>
                {username || _id === centerId && <SetUsername /> || 'pseudo'}
              </td>
              <td>{referralCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    <span className="know_more_gifts">En savoir plus sur le <a role="button" tabIndex="0" onClick={onClick()}>programme de récompenses</a></span>
    </div>
    )
  }
  centerListOn(id) {
    if(!id) return
    document.getElementById(id)
    .scrollIntoView({block: 'center'})
  }
}

const onClick = () => {
document.getElementsByClassName('recompenses')[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
}
