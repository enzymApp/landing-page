import React from 'react'

const Button = ({children, onClick, type}) => (
  <button className="purple_buttons" {...{type, onClick}}>
{children}
  </button>
)

Button.defaultProps = {
  type: 'button',
}

export default Button