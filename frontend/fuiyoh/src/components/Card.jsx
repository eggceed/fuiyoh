import React from 'react'
import '../styles/Card.css'
import defaultImg from '../assets/default.png'
import { Link } from 'react-router-dom'


const Card = ({ menu_id, menu_name, menu_url, ingredient }) => {

    const routeName = `/${menu_id}`

    return (
        <Link to={routeName} className='card'>
            < img src={menu_url ?? defaultImg} width='220'/>
            <div className='card-text'>
                <h1 className='title'>{menu_name}</h1>
                <div className='information'>
                    <p>{ingredient + ''}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card