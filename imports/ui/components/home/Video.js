import React      from 'react'
import {Row, Col} from 'reactstrap'
import T from '../Translator'


export default () => (
  <div className="video">
  <T _translateProps={['src']}>
  <iframe width="560" height="315" src="Home.video" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </T>
  </div>

)
