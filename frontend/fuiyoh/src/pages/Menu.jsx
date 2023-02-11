import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {  getBigMenu, getMenu } from '../assets/services/menu'
import BigCard from '../components/BigCard'
import Seasoning from '../components/Seasoning'
import '../styles/Menu.css'

const Menu = () => {
    const [menu, setMenu] = useState({})
    const { id } = useParams()

    useEffect(() => {
        getBigMenu(id).then(data => setMenu(data)).catch(err => console.log(err))
    },[])


  return (
    <div className='container'>
        <h1 className='menu-title'>{menu.menu_name}</h1>
        <div className='menu-info'> 
        <BigCard menuPass={menu}/>
        <Seasoning menuPass={menu}/>
        </div>
    </div>
  )
}

export default Menu