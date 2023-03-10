import React from 'react'
import '../styles/Card.css'
import defaultImg from '../assets/default.png'
import { Link } from 'react-router-dom'


const Card = ({ menu_id, menu_name, menu_url, ingredient }) => {

    const routeName = `/${menu_id}`

    return (
        <Link to={routeName} className='card'>
            <div className='property'>
                <div className='menu-image'>
                    <img src={menu_url ?? defaultImg} />
                </div>
            <div className='card-text'>
                <h5 className='title'>{menu_name}</h5>
                <div className='information'>
                    <p>{ingredient + ''}</p>
                </div> 
            </div>
            
            </div>
        </Link>
    )
}

export default Card