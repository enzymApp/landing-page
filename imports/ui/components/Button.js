import React from 'react'

export default ({children, onClick}) => (
  <button className="purple_buttons" onClick={onClick}>
    {children}
  </button>
)
