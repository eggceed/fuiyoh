import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import NavBar from './components/NavBar'
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import Menu from './pages/Menu';
import BigCard from './components/BigCard';


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
