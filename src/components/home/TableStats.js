import React      from 'react'
import { FormattedMessage as T } from 'react-intl'
import ReferrerList     from '../ReferrerList'


const TableStats = () => (
  <div className="tableStats">
    <div className="container">
      <h2><T id="home.contesttitle" /></h2>
      <ReferrerList />
    </div>
  </div>
)

export default TableStats
