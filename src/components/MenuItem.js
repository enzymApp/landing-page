import React    from 'react'

const MenuItem = ({ href, name, ...props}) => (
  <a href={href} className="hide-link" {...props}>{name}</a>
)

export default MenuItem
