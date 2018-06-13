import React from 'react'
import {Table} from 'reactstrap'

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
    <div>
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
    <span className="know_more_gifts">En savoir plus sur le <a href="javascript:;" onClick={onClick()}>programme de récompenses</a></span>
    </div>
    )
  }
  centerListOn(id) {
    if(!id) return
    document.getElementById(id)
    .scrollIntoView({block: 'center'})
  }
}

const onClick = () => () => {
document.getElementsByClassName('recompenses')[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
}
