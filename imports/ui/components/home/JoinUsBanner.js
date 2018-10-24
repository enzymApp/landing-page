import React from 'react'
import Button from '../Button'
import T      from '../Translator'

export default ({scroll, openChat, text}) => (
  <div className="joinus_banner">
    <a href={scroll}><Button onClick={onClick(openChat)}><T>{text}</T></Button></a>
  </div>
)

const onClick = (openChat) => () => {
  if(openChat) {
    window.Tawk_API.maximize()
  }
}
