import React from 'react'
import '../styles/Button.css'

const Button = ({type, name, onClick, disabled}) => {
  return (
    <button className='btn' type={type} onClick={onClick} disabled={disabled}>{name}</button>
  )
}

export default Button