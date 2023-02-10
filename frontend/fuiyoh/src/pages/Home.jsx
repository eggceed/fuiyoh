import React from 'react'
import Card from '../components/Card'
import TestData from '../assets/test.json'
import '../styles/Home.css'
import Buttton from '../components/Button'

const Home = () => {
    // const [menu, setMenu] = useState([])
    
    // useEffect(() => {
    //     
    // })


    console.log(TestData.init_menu)   
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