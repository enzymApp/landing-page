import React from 'react'
import Button from '../Button'


export default ({scroll, openChat, text}) => (
  <div className="joinus_banner">
    <Button onClick={onClick(scroll, openChat)}>{text}</Button>
  </div>
)

const onClick = (scroll, openChat) => () => {
  if(scroll) {
    window.scrollTo(0, 0)
  }
  if(openChat) {
    window.Tawk_API.maximize()
  }
}
