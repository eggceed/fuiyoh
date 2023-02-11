import React from 'react'
import Card from './Card'
import defaultImg from '../assets/default.png'
import '../styles/BigCard.css'



const BigCard = ({ menuPass }) => {
    console.log(menuPass)
    
    

  return (
    <div className='card'>
        < img src={menuPass.menu_url ?? defaultImg} width='220'/>
            <div className='card-text'>
                <h1 className='indredient'>วัตถุดิบ</h1>
                <div className='information'>
                    {menuPass.ingredient && menuPass.ingredient.map(i => <li>{i}</li>)}
                    {console.log(menuPass.ingredient)}
                    {}
                </div>
            </div>
        </div>
  )
}

export default BigCard