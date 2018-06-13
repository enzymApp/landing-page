import React from 'react'
import Button from '../Button'


export default ({scroll, openChat, text}) => (
  <div className="joinus_banner">
    <Button onClick={onClick(scroll, openChat)}>{text}</Button>
  </div>
)

const onClick = (scroll, openChat) => () => {
  if(scroll) {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  if(openChat) {
    window.Tawk_API.maximize()
  }
}
