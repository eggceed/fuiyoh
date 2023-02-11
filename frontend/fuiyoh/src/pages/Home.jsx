import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import '../styles/Home.css'
import Buttton from '../components/Button'

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
            {TestData.init_menu.map(m => <Card {...m} />)}
        </div> 
        <Buttton name="+"/>
    </div>
    
  )
}

export default Home