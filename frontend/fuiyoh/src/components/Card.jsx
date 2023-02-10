import React from 'react'
import '../styles/Card.css'
import defaultImg from '../assets/default.png'
import { Link } from 'react-router-dom'


const Card = ({ id, menu_name, menu_url, ingredient }) => {

    // const routeName = `/${id}`

    return (
        <div className='card'>
            < img src={menu_url ?? defaultImg} width='220'/>
            <div className='card-text'>
                <h1 className='title'>{menu_name}</h1>
                <div className='information'>
                    <p>{ingredient + ''}</p>
                </div>
            </div>
        </div>
    )
}

export default Card