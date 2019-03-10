import React from 'react'
import { FormattedMessage as T } from 'react-intl'
import Button from '../Button'

const JoinUsBanner = ({href, openChat, text}) => (
  <div className="joinus_banner">
    <a href={href}><Button onClick={onClick(openChat)}><T id={text} /></Button></a>
  </div>
)

const onClick = (openChat) => () => {
  if(openChat) {
    window.Tawk_API.maximize()
  }
}

export default JoinUsBanner
