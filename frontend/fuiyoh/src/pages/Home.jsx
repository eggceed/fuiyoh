import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import '../styles/Home.css'
import Buttton from '../components/Button'
import { getMenu } from '../assets/services/menu'

const Home = () => {
    const [menu, setMenu] = useState([])
    // console.log(menu)

    useEffect(() => {
        getMenu().then(data => setMenu(data)).catch(err => console.log(err))
    })
    
    return (
    <div>
        <h1 className='home'>Menu</h1>
        <div className='menu_list'>
            {menu.map((m,i) => <Card {...m} key={i} />)}
        </div> 
        <Buttton name="+"/>
    </div>
    
  )
}

export default Home