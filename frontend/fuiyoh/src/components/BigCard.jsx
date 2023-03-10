import React from 'react'
import defaultImg from '../assets/default.png'
import '../styles/BigCard.css'


const BigCard = ({ menuPass }) => {
    // console.log(menuPass)
    
  return (
    <div className='bigcard'>
        < img src={menuPass.menu_url ?? defaultImg} width='300'/>
            <div className='card-text'>
                <h1 className='indredient'>วัตถุดิบ</h1>
                <div className='information'>
                    {menuPass.ingredient && menuPass.ingredient.map((e,i) => <li key={i}>{e}</li>)}
                    {/* {console.log(menuPass.ingredient)} */}
                </div>
            </div>
        </div>
  )
}

export default BigCard