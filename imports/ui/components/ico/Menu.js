import React    from 'react'
import {Meteor} from 'meteor/meteor'
import i18n     from 'meteor/universe:i18n'

export default ({link, name}) => (
  <a href={link} className="hide-link">{name}</a>
)
