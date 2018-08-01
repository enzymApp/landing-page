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
      <Table striped responsive>
        <thead>
          <tr>
            <th><T>Referrer.table.rank</T></th>
            <th><T>Referrer.table.username</T></th>
            <th><T>Referrer.table.points</T></th>
          </tr>
        </thead>
        <tbody>
          {list.map(({_id, userId, username, rank, zyms}) => (
            <tr key={_id} className={_id === centerId ? "centered-user" : ""} id={_id}>
              <td>{rank}</td>
              <td>
                {username || _id === centerId && <SetUsername /> || <T>Referrer.username</T>}
              </td>
              <td>{zyms - 1}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    )
  }
  centerListOn(id) {
    if(!id) return
    const elm = document.getElementById(id)
    if(!elm) return
    elm.scrollIntoView({block: 'center'})
  }
}
