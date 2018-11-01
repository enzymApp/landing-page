import React    from 'react'
import T from './Translator'

export default ({href, name, ...props}) => (
  <a href={href} className="hide-link" {...props}><T>{name}</T></a>
)
