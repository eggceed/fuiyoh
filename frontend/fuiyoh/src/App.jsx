import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import NavBar from './components/NavBar'
import {
  Route,
  Routes,
} from "react-router-dom";


function App() {

  return (
    <div className="App">
    <NavBar/>
      {/* <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/:id' element={<Menu/>}/>
      </Routes> */}
      <Home/>
      {/* <Menu/> */}
      {/* <BigCard/> */}

    </div>
  )
}

export default App
