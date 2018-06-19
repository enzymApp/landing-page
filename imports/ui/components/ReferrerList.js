import React from 'react'
import {Table} from 'reactstrap'
import SetUsername from './SetUsername'
import T from './Translator'


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
            <th><T>Referrer.table.rank</T></th>
            <th><T>Referrer.table.username</T></th>
            <th><T>Referrer.table.points</T></th>
          </tr>
        </thead>
        <tbody>
          {list.map(({_id, userId, username, rank, referralCount}) => (
            <tr key={_id} className={_id === centerId ? "centered-user" : ""} id={_id}>
              <td>{rank}</td>
              <td>
                {username || _id === centerId && <SetUsername /> || <T>Referrer.username</T>}
              </td>
              <td>{referralCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    <span className="know_more_gifts">
      <T>
        Referrer.giftsLink.before
        <a role="button" tabIndex="0" onClick={this.scrollToGifts}><T>Referrer.giftsLink.text</T></a>
        Referrer.giftsLink.after
      </T>
    </span>
    </div>
    )
  }
  centerListOn(id) {
    if(!id) return
    const elm = document.getElementById(id)
    if(!elm) return
    elm.scrollIntoView({block: 'center'})
  }
  scrollToGifts() {
    document.getElementsByClassName('recompenses')[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
