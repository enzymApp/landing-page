import React      from 'react'
import T from '../Translator'
import ReferrerListContainer     from '/imports/ui/components/ReferrerListContainer'


export default () => (
  <div className="tableStats">
    <div className="container">
      <h2><T>Home.contesttitle</T></h2>
      <ReferrerListContainer />
    </div>
  </div>
)
