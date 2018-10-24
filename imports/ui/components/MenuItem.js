import React    from 'react'
import {Meteor} from 'meteor/meteor'
import i18n     from 'meteor/universe:i18n'

export default ({href, name, ...props}) => (
  <a href={href} className="hide-link" {...props}>{name}</a>
)
