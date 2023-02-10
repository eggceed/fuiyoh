import React from 'react'
import '../styles/Button.css'

const Button = ({type, name, onClick}) => {
  return (
    <button className='btn' type={type} onClick={onClick}>{name}</button>
  )
}

export default Button