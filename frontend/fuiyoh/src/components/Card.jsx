import React from 'react'
import '../styles/Card.css'
import defaultImg from '../assets/default.png'
import { Link } from 'react-router-dom'


const Card = ({ id, name, image, ingredients, seasoning }) => {

    const routeName = `/${id}`

    return (
        <div className='card'>
            < img src={image ?? defaultImg} width='220'/>
            <div className='card-text'>
                <h1 className='title'>Name{name}</h1>
                <div className='information'>
                    <p>ingredients1, in2{ingredients}</p>
                    <p>ss1, ss2{seasoning}</p>
                </div>
            </div>
        </div>
    )
}

export default Card